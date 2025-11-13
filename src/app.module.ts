import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { CategoryModule } from './category/category.module';
import { AddressModule } from './address/address.module';
import { OrderModule } from './order/order.module';
import { OrderitemModule } from './orderitem/orderitem.module';
import { ItemModule } from './item/item.module';

@Module({
  imports: [UserModule, PrismaModule, CategoryModule, AddressModule, OrderModule, OrderitemModule, ItemModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
