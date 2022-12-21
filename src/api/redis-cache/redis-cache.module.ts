import { CacheModule, Module } from '@nestjs/common';
import { RedisCacheService } from './redis-cache.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';
import jwtConfig from 'config/jwtConfig';

@Module({
    imports: [
        CacheModule.registerAsync({
            useFactory: async () => ({
                store: redisStore,
                 host: 'localhost',
                 port: 6379,
            })
        })
    ],
    providers: [RedisCacheService],
    exports: [RedisCacheService]
})
export class RedisCacheModule {}