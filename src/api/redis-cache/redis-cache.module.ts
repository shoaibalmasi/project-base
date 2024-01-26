import { Global, Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisCacheService } from './redis-cache.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';
import { UtilsService } from 'src/api/utils/utils.service';

@Global()
@Module({
    imports: [
        CacheModule.register({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async () => ({
                store: redisStore,
                 host: process.env.REDIS_HOST,
                 port: +process.env.REDIS_PORT,
                 ttl: +process.env.CACHE_TTL
                //  max: process.env.MAX_ITEM_IN_CACHE
            })
        })
    ],
    providers: [RedisCacheService, UtilsService],
    exports: [RedisCacheService]
})
export class RedisCacheModule {}