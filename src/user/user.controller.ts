import { Controller, Get, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { BaseController } from '../common/base.controller';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { PageDto } from '../pagination/pageable.dto';
import { FindAllUsersDto } from './dto/find-all-user.dto';

@ApiTags('Users')
@Controller('users')
export class UserController extends BaseController<
  User,
  CreateUserDto,
  UpdateUserDto
> {
  constructor(private readonly userService: UserService) {
    super(userService, 'User');
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Lista todos os usuários de forma paginada',
    type: PageDto,
  })
  async findPagered(@Query() query: FindAllUsersDto) {
    const { page, limit, ...filters } = query;
    return this.userService.findAllUsers({ page, limit }, filters);
  }
}
