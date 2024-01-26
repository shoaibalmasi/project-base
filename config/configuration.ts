export default {

    PORT : 8001,
    HOST : 'localhost',
    BaseUrl: "",
    
    database :{
        //postgre
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgre',
        password: 'shoaib',
        database: 'baseDb',
        autoLoadModels: true,
        logging: false,
        // sync: {alter: true},
    },
    
    //redis
    REDIS_HOST : 'localhost',
    REDIS_PORT : 6379,
    CACHE_TTL : 600000000,
    // MAX_ITEM_IN_CACHE : 1000
    
    minioConfig:{

        //minio
            endPoint: '37.32.8.13',
            port: 9000,
            useSSL: false,
            accessKey: 'yadakazki',
            secretKey: 'Y@ddak@zki1401',
    },

    zarinPal_test:{
        merchant_id: '1344b5d4-0048-11e8-94db-005056a205be',
        callback_url: 'http://yadakazki.ir/api/v1/transaction/verify',
        request_api: 'https://sandbox.zarinpal.com/pg/v4/payment/request.json',
        verify_api: 'https://sandbox.zarinpal.com/pg/v4/payment/verify.json'
        
    },

    frontend : {
        distDirectory: ""
    }
    
  }
