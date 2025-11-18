import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
  IsEnum,
} from 'class-validator';
import { PaymentMethod } from 'generated/prisma';

export class CreateOrderDto {
  @ApiProperty({
    description: 'ID do cliente que realizou o pedido',
    example: 1,
  })
  @IsInt({ message: 'O ID do cliente deve ser um número inteiro.' })
  @IsNotEmpty({ message: 'O ID do cliente é obrigatório.' })
  clientId: number = 0;

  @ApiProperty({
    description: 'Forma de pagamento do pedido',
    example: PaymentMethod.CREDIT,
    enum: PaymentMethod,
  })
  @IsEnum(PaymentMethod, { message: 'Forma de pagamento inválida.' })
  @IsNotEmpty({ message: 'A forma de pagamento é obrigatória.' })
  paymentMethod: PaymentMethod = PaymentMethod.CASH;

  @ApiProperty({
    description: 'Status do pedido',
    example: 'PENDING',
    maxLength: 50,
  })
  @IsString({ message: 'O status deve ser uma string.' })
  @IsNotEmpty({ message: 'O status é obrigatório.' })
  @MaxLength(50, { message: 'O status deve ter no máximo 50 caracteres.' })
  status: string = '';

  @ApiProperty({
    description: 'ID do usuário que criou o pedido',
    example: 2,
  })
  @IsInt({ message: 'O ID do criador deve ser um número inteiro.' })
  @IsNotEmpty({ message: 'O ID do criador é obrigatório.' })
  createdById: number = 0;
}
