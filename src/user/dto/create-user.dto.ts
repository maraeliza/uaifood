import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsInt,
  Min,
  IsEmail,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Nome do usuário',
    example: 'João da Silva',
    maxLength: 255,
  })
  @IsString({ message: 'O nome deve ser uma string.' })
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  @MaxLength(255, { message: 'O nome deve ter no máximo 255 caracteres.' })
  name: string = '';

  @ApiProperty({
    description: 'Email do usuário',
    example: 'joao.silva@email.com',
    maxLength: 255,
  })
  @IsEmail({}, { message: 'O email deve ser válido.' })
  @IsNotEmpty({ message: 'O email é obrigatório.' })
  @MaxLength(255, { message: 'O email deve ter no máximo 255 caracteres.' })
  email: string = '';

  @ApiProperty({
    description: 'ID do endereço do usuário',
    example: 1,
  })
  @IsInt({ message: 'O ID do endereço deve ser um número inteiro.' })
  @Min(1, { message: 'O ID do endereço deve ser maior que zero.' })
  addressId: number = 0;

  @ApiProperty({
    description: 'Telefone do usuário',
    example: '+55 11 91234-5678',
    maxLength: 20,
  })
  @IsString({ message: 'O telefone deve ser uma string.' })
  @IsNotEmpty({ message: 'O telefone é obrigatório.' })
  @MaxLength(20, { message: 'O telefone deve ter no máximo 20 caracteres.' })
  phone: string = '';

  @ApiProperty({
    description: 'Senha do usuário',
    example: 'senha123',
  })
  @IsString({ message: 'A senha deve ser uma string.' })
  @IsNotEmpty({ message: 'A senha é obrigatória.' })
  password: string = '';
}
