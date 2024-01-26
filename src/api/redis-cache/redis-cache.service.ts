import { Inject, Injectable } from '@nestjs/common';
import { CacheModule, CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisCacheService {
    constructor(
        @Inject(CACHE_MANAGER)
        private cache: Cache
    ) { }
    async get(key: string): Promise<any> {
        return await this.cache.get(key);
    }

    async set(key: string, value: any, ex: number = 0) {

        await this.cache.set(key, value, ex);

    }

    async reset() {
        await this.cache.reset();
    }

    async del(key: string) {
        await this.cache.del(key);
    }
}