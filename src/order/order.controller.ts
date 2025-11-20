import {
  Query,
  Get,
  Controller,
  HttpCode,
  HttpStatus,
  Req,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PageableDto, PageDto } from '../pagination/pageable.dto';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { BaseController } from '../common/base.controller';
import { Order } from './entities/order.entity';
import { User } from 'generated/prisma';

export interface RequestWithUser extends Request {
  user: User;
}

class FindAllOrdersDto extends PageableDto {
  constructor(partial: Partial<FindAllOrdersDto>) {
    super();
    Object.assign(this, partial);
  }
  clientId?: number;
  status?: string;
  paymentMethod?: string;
}

@ApiTags('Orders')
@Controller('orders')
export class OrderController extends BaseController<
  Order,
  CreateOrderDto,
  UpdateOrderDto
> {
  constructor(private readonly orderService: OrderService) {
    super(orderService, 'Order');
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Lista todos os pedidos de forma paginada',
    type: PageDto,
  })
  async findPagered(@Query() query: FindAllOrdersDto) {
    const { page, limit, ...filters } = query;
    return this.orderService.findAllOrders({ page, limit }, filters);
  }
  @Get('/my')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Retorna todos os pedidos do usuário logado',
    type: [Order],
  })
  async findMyOrders(@Query('userId', ParseIntPipe) userId: number = 1) {
    return this.orderService.findAllOrders(
      { page: 1, limit: 1000 },
      { clientId: userId },
    );
  }

}
