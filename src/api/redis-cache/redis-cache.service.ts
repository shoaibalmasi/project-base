import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisCacheService {
  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {
    console.log('redis connected');
  }

  async get(key: string): Promise<any> {
    return await this.cache.get(key);
  }

  async set(key: string, value: string, ex?: string) {
    let options = {};
    if (ex) options = { ttl: ex };
    await this.cache.set(key, value, options);
  }

  async del(key: string) {
    await this.cache.del(key);
  }
}
