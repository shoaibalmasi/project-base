// export default {
//     dataBase: 
//         {
//             dialect: 'postgres',
//             host: 'localhost',
//             port: 5432,
//             username: 'postgres',
//             password: 'shoaib382',
//             database: 'project-base',
//              autoLoadModels: true,
//             // sync: {alter: true},
//             sync: { force: true }
            
//           }
    
// }


import { Sequelize } from 'sequelize-typescript';
import * as db from '../src/models/index';
console.log({aaa:__dirname})
 const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
            dialect: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'shoaib382',
            database: 'project-base',
            models: [__dirname + './src/models']
      });
    //   sequelize.addModels();
      await sequelize.sync();
      return sequelize;
    },
  },
];

export default databaseProviders