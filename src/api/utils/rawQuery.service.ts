import { Injectable } from "@nestjs/common";
import { Sequelize } from "sequelize-typescript";



@Injectable()
export class RawQueryservice {

    constructor(
        private seq: Sequelize,
    ){}
    
    async updateSubFactorCartsPrices({factor, hasActiveFestival =null}): Promise<void> {

        await this.seq.query(`
        update cart
        set 
            price = 
                  case
                     when
                       product."festivalId" is not null
                       and product."festivalId" in (
                           select id from festival 
                           where
                             "deletedAt" is null 
                             and status = true
                             and "verifyStatus" = 2
                             and "storeId" = ${factor.storeId}
                             and "startDate" <= now()
                             and "endDate" >= now()
                          )
                       then product."displayPrice" * (select (100 - cast("offPercentage" as float))/100 from festival where id = product."festivalId") 
  
                     when 
                        product."price3MinCount" is not null 
                        and product."price3" is not null 
                        and product."price3MinCount" <= cart.count
                        then product."price3"

                     when 
                        product."price2MinCount" is not null 
                        and product."price2" is not null 
                        and product."price2MinCount" <= cart.count
                        then product."price2"
  
                     else product.price 
                  end,
            
            "finalPrice" = 
                      case 
                        when
                            product."festivalId" is not null
                            and product."festivalId" in (
                                select id from festival 
                                where
                                  "deletedAt" is null 
                                  and status = true
                                  and "verifyStatus" = 2
                                  and "storeId" = ${factor.storeId}
                                  and "startDate" <= now()
                                  and "endDate" >= now()
                                )
                            then cart.count * product."displayPrice" * (select (100 - cast("offPercentage" as float))/100 from festival where id = product."festivalId")
  
                      when 
                        product."price3MinCount" is not null 
                        and product."price3" is not null 
                        and product."price3MinCount" <= cart.count
                        then cart.count * product."price3MinCount"

                      when 
                        product."price2MinCount" is not null 
                        and product."price2" is not null 
                        and product."price2MinCount" <= cart.count
                        then cart.count * product."price2MinCount"
  
                     else cart.count * product.price 
                  end,
  
            "festivalId" = 
                            case
                              when
                              product."festivalId" is not null
                              and product."festivalId" in (
                                  select id from festival 
                                  where
                                    "deletedAt" is null 
                                    and status = true
                                    and "verifyStatus" = 2
                                    and "storeId" = ${factor.storeId}
                                    and "startDate" <= now()
                                    and "endDate" >= now()
                                  )
                              then product."festivalId"
                              else null
                            end,
            "displayPrice" = product."displayPrice",
            "finalDisplayPrice" = cart.count * product."displayPrice"
  
        from product
        where 
         cart."factorId" = ${factor.id} 
         and cart."productId" = product.id
         and cart."deletedAt" is null
      `);
    }

    async updateSubFactorPrice({factor, vatPrice, offPrice}): Promise<void>{
        await this.seq.query(
            `
            with fc as (
              select sum("finalPrice") as sum, sum("finalDisplayPrice") as "displaySum" from cart
              where "factorId" = ${factor.id} and cart."deletedAt" is null
            )
            update factor
            set 
             "sumDisplayPrice" = 
                        case when fc."displaySum" is not null then fc."displaySum"
                        else 0 end,
             "sumPrice" = 
                        case when fc.sum is not null then fc.sum
                        else 0 end,
             "payPrice" = (case when fc.sum is not null then fc.sum
              else 0 end)
            
            from fc
            where id = ${factor.id} and factor."deletedAt" is null
            `,
          );
    }
}