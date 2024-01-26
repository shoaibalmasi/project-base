import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {
  createNetworkDto,
  updateNetworkDto,
  networkInfoDto,
  networkListDto,
} from 'src/dto/network.dto';
import { Network } from 'src/models/network.model';
import * as _ from 'lodash';
import { Responser } from 'src/common/utils/responser';
import { UtilsService } from 'src/api/utils/utils.service';
import configuration from 'config/configuration';
import { File } from 'src/models';

@Injectable()
export class NetworkService {
  constructor(
    @InjectModel(Network)
    private networkModel: typeof Network,
    @InjectModel(File)
    private fileModel: typeof File,

    private utilsService: UtilsService,
  ) {}

  async getNetworkList(data: networkListDto): Promise<{
    rows: Network[];
    count: number;
  }> {
    let getListQuery = await this.utilsService.getListQueryCreator({
      data,
      model: this.networkModel,
    });

    const { where, order, limit, offset } = getListQuery;

    let list = await this.networkModel.findAndCountAll({
      where,
      attributes: ['id', 'pid', 'name', 'level'],
      raw: true,
      order,
      limit,
      offset,
    });

    list.rows = list.rows.map((item) => {
      if(item.fileName){
        item['filePath'] = `${configuration.BaseUrl}/api/v1/file/network/${item.fileName}`;
        item.fileName = `${configuration.BaseUrl}/api/v1/file/network/${item.fileName}`    

      }
      return item;
    });

    return list;
  }

  async addNetwork(data: createNetworkDto): Promise<insertInterface> {
    let dataObj = this.utilsService.omitNull(data);

    let parent = null;
    let parents = [];
    let parentsName = [];
    if (dataObj.pid) {
      parent = await this.networkModel.findOne({
        where: { id: dataObj.pid },
        raw: true,
      });

      if (!parent) throw new BadRequestException('مرجع یافت نشد');
      if (parent.parents?.length) parents.push(...parent.parents);
      if (parent.parentsName?.length) parentsName.push(...parent.parentsName);
    }

    let finalObj: any = {
      name: dataObj.name,
      pid: parent ? parent.id : null,
      parents: parent ? [...parents, parent.id] : null,
      parentsName: parent ? [...parentsName, parent.name] : null,
      level: parent ? parent.level + 1 : 1,
    };
    // console.log({finalObj});

    if (dataObj.fileName) {
      let fileExist = await this.fileModel.findOne({
        where: {
          name: dataObj.fileName,
          bucket: 'network',
        },
        raw: true,
      });
      if (!fileExist)
        throw new NotFoundException('نام فایل ارسال شده نامعتبر است');
      finalObj.fileName = dataObj.fileName;
    }

    let network = await this.networkModel.create(finalObj);
    return { id: network.id };
  }

  async networkInfo(id: number): Promise<Network> {
    let network = await this.networkModel.findByPk(id, { raw: true });
    if (!network) throw new NotFoundException(' یافت نشد');

    return network;
  }

  async updateNetwork(data: updateNetworkDto): Promise<number> {
    const { id, name, pid } = data;

    let network = await this.networkModel.findByPk(id, { raw: true });
    if (!network) throw new NotFoundException('شناسه معتبر نیست');

    let dataObj = this.utilsService.omitNull(data);
    let parent = null;
    let parents = [];
    let parentsName = [];
    if (dataObj.pid) {
      parent = await this.networkModel.findOne({
        where: { id: dataObj.pid },
        raw: true,
      });

      if (!parent) throw new BadRequestException('مرجع یافت نشد');
      if (parent.parents?.length) parents.push(...parent.parents);
      if (parent.parentsName?.length) parentsName.push(...parent.parentsName);

      if (dataObj.fileName) {
        let fileExist = await this.fileModel.findOne({
          where: {
            name: dataObj.fileName,
            bucket: 'network',
          },
          raw: true,
        });
        if (!fileExist)
          throw new NotFoundException('نام فایل ارسال شده نامعتبر است');
      }

      dataObj = {
        ...dataObj,
        parents: [...parents, parent.id],
        parentsName: [...parentsName, parent.name],
        level: parent.level + 1,
      };
    }

    let result = await this.networkModel.update(dataObj, {
      where: { id },
      individualHooks: true,
    });
    if (!result[0]) throw new NotFoundException('شبکه یافت نشد');

    return result[0];
  }

  async deleteNetwork(id: number): Promise<any> {
    let children = await this.networkModel.count({ where: { pid: id } });
    if (children)
      throw new NotAcceptableException(
        `این  شبکه دارای ${children} زیر مجموعه است`,
      );

    let result = await this.networkModel.destroy({
      where: { id },
    });

    if (!result) throw new NotFoundException(' شبکه با این شناسه یافت نشد');
    return result;
  }
}
