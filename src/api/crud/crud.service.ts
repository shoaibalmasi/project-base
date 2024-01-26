import { HttpException, Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';
import * as fs2 from 'fs';
import * as path from 'path';
import sequelize from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Responser } from 'src/common/utils/responser';
import * as db from '../../models/index';
import { UtilsService } from 'src/api/utils/utils.service';

@Injectable()
export class CrudService {
  constructor(
    private utilsService: UtilsService, // private sequelize : typeof Sequelize
  ) {}

  async createModule(data: { serviceName: string }): Promise<string> {
    let { serviceName } = data;

    //  console.log({models});

    // TODO//check model
    // console.log({ __dirname });

    let moduleText: any = await fs.readFile(
      path.join(__dirname, '../../../../src/api/crud/module.txt'),
      'utf8',
    );

    let controllerText: any = await fs.readFile(
      path.join(__dirname, '../../../../src/api/crud/controller.txt'),
      'utf8',
    );
    let serviceText: any = await fs.readFile(
      path.join(__dirname, '../../../../src/api/crud/service.txt'),
      'utf8',
    );
    let dtoText: any = await fs.readFile(
      path.join(__dirname, '../../../../src/api/crud/dto.txt'),
      'utf8',
    );

    let result = await this.fileMaker({
      item: serviceName,
      moduleText,
      controllerText,
      serviceText,
      dtoText,
    });

    if(result.statusCode) throw new HttpException(result.msg, result.statusCode) 

    return 'service created';
  }

  async fileMaker({
    item,
    moduleText,
    controllerText,
    serviceText,
    dtoText,
  }): Promise<any> {
    try {

      let checkDir = fs2.existsSync(path.join(__dirname, `../../../../src/api/${item}`));
      console.log({checkDir});
      if(checkDir) return {statusCode: 400, msg: 'این سرویس از قبل وجود دارد'}
      
      await fs.mkdir(path.join(__dirname, `../../../../src/api/${item}`));

      let modelIndex: any = await fs.readFile(
        path.join(__dirname, '../../../../src/models/index.ts'),
        'utf8',
      );

      console.log({ modelIndex });

      if (modelIndex.search(`./${item}.model`) == -1) {
        console.log('here');

        await fs.appendFile(
          path.join(__dirname, `../../../../src/models/index.ts`),
          `\r\nexport { ${
            item[0].toUpperCase() + item.slice(1)
          } } from './${item}.model';`,
        );
      }

      moduleText = moduleText.replaceAll('temp', item);
      moduleText = moduleText.replaceAll(
        'Temp',
        item[0].toUpperCase() + item.slice(1),
      );
      await fs.writeFile(
        path.join(__dirname, `../../../../src/api/${item}/${item}.module.ts`),
        moduleText,
      );

      controllerText = controllerText.replaceAll('temp', item);
      controllerText = controllerText.replaceAll(
        'Temp',
        item[0].toUpperCase() + item.slice(1),
      );
      await fs.writeFile(
        path.join(
          __dirname,
          `../../../../src/api/${item}/${item}.controller.ts`,
        ),
        controllerText,
      );

      serviceText = serviceText.replaceAll('temp', item);
      serviceText = serviceText.replaceAll(
        'Temp',
        item[0].toUpperCase() + item.slice(1),
      );
      await fs.writeFile(
        path.join(__dirname, `../../../../src/api/${item}/${item}.service.ts`),
        serviceText,
      );

      dtoText = dtoText.replaceAll('temp', item);
      dtoText = dtoText.replaceAll(
        'Temp',
        item[0].toUpperCase() + item.slice(1),
      );
      await fs.writeFile(
        path.join(__dirname, `../../../../src/dto/${item}.dto.ts`),
        dtoText,
      );

      return item + ' created!!!';
    } catch (error) {
      console.log(error);
      
      return error;
    }
  }

  async dtoMaker(data): Promise<void> {
    let { model } = data;
    console.log({model},"======================================");
    

    let checkDto2 = fs2.existsSync(
      path.join(__dirname, '../../../../src/api/crud/dto2.txt'),
    );
    if (!checkDto2) {
      console.log('dto2.txt not found !!!!!!!!!!!!!!!!!!! ');
      return;
    }

    let checkDtoExist = fs2.readFileSync(
      path.join(
        __dirname,
        `../../../../src/dto/${model.getTableName()}.dto.ts`,
      ),
      'utf8',
    );
    let dto2Text: any = await fs.readFile(
      path.join(__dirname, '../../../../src/api/crud/dto2.txt'),
      'utf8',
    );
    // console.log({checkDtoExist});

    if (checkDtoExist && checkDtoExist.search('firstDto') == -1) return;

    let createProperties = '';
    let listProperties = '';
    let updateProperties = '';
    let modelAttr = model.rawAttributes;

    for (const key in modelAttr) {
      let comment = modelAttr[key].comment;
      let attrType = this.utilsService.convertSequelizeTypeToJsType(
        modelAttr[key].type.constructor.name,
      );
      let isRequired = modelAttr[key].allowNull
        ? "allow(null,'')"
        : 'required()';

      let swaggerRequire = modelAttr[key].allowNull ? ', required: false ' : ''

      if (!['id', 'createdAt', 'updatedAt', 'deletedAt'].includes(key)) {
        listProperties += `
        \n@ApiProperty({ description:'${comment}', required: false })
        \n@JoiSchema(Joi.${
          attrType == 'Date' ? 'date' : attrType
        }().allow(null,''))
         ${key} : ${attrType}\n`;

        createProperties += `
        \n@ApiProperty({ description:'${comment}'})
        \n@JoiSchema(Joi.${
          attrType == 'Date' ? 'date' : attrType
        }().${isRequired})
        ${key} : ${attrType}\n`;
      }
    }

    updateProperties = listProperties;
    dto2Text = dto2Text
      .replace('%createProperties%', createProperties)
      .replace('%listProperties%', listProperties)
      .replace('%updateProperties%', updateProperties)
      .replaceAll('temp', model.getTableName())
      .replaceAll(
        'Temp',
        model.getTableName()[0].toUpperCase() + model.getTableName().slice(1),
      );

    await fs.writeFile(
      path.join(
        __dirname,
        `../../../../src/dto/${model.getTableName()}.dto.ts`,
      ),
      dto2Text,
    );
  }
}
