import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string = "";

  @IsString()
  @IsNotEmpty()
  phone: string = "";

  @IsString()
  @IsNotEmpty()
  password: string = "";

  @IsInt()
  addressId: number = 0;
}
