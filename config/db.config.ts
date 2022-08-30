export default {
    dataBase: 
        {
            dialect: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'shoaib382',
            database: 'projectBase',
            autoLoadModels: true,
          
             sync: {alter: true},
            
          }
    
}