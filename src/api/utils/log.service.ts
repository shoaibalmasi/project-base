import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { saveLogDto } from 'src/dto/log.dto';
import { Log } from 'src/models';

@Injectable()
export class LogService {

    constructor(
        @InjectModel(Log)
        private logModel: typeof Log,
    ){}

     saveLog(data : saveLogDto){
        
        try {
            data.path = data.path.replace('/api/v1/','')
            data.duration = Math.trunc(data.duration)
           
            
             this.logModel.create(data as any)
            return
            
        } catch (error) {
            console.log(error);
            return error
            
        }


    }
}
