import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'Descrição da categoria',
    example: 'Eletrônicos',
    maxLength: 255,
  })
  @IsString({ message: 'A descrição deve ser uma string.' })
  @IsNotEmpty({ message: 'A descrição é obrigatória.' })
  @MaxLength(255, { message: 'A descrição deve ter no máximo 255 caracteres.' })
  description: string = '';
}
