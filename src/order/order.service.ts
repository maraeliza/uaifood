import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Order } from './entities/order.entity';
import { PageableDto } from '../pagination/pageable.dto';
import { BaseService } from 'src/common/base.service';

@Injectable()
export class OrderService extends BaseService<Order, PrismaService['order']> {
  constructor(prisma: PrismaService) {
    super(prisma, prisma.order);
  }

  async findAllOrders(
    pageable: PageableDto,
    filters?: { clientId?: number; status?: string; paymentMethod?: string },
  ) {
    const where = {
      clientId: filters?.clientId ?? undefined,
      status: filters?.status
        ? { contains: filters.status, mode: 'insensitive' }
        : undefined,
      paymentMethod: filters?.paymentMethod
        ? { equals: filters.paymentMethod }
        : undefined,
    };

    return this.findAll(pageable, where);
  }
}
