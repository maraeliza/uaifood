import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from './entities/user.entity';
import { BaseService } from '../common/base.service';
import { PageableDto } from '../pagination/pageable.dto';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService extends BaseService<User, PrismaService['user']> {
  constructor(prisma: PrismaService) {
    super(prisma, prisma.user);
  }

  async createUser(data: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });
  }
  async findByEmail(email: string): Promise<User | null> {
    if (!email) return null;

    return this.delegate.findUnique({
      where: { email },
    });
  }

  async findAllUsers(
    pageable: PageableDto,
    filters?: { name?: string; phone?: string },
  ) {
    const where = {
      name: filters?.name
        ? { contains: filters.name, mode: 'insensitive' }
        : undefined,
      phone: filters?.phone
        ? { contains: filters.phone, mode: 'insensitive' }
        : undefined,
    };

    return this.findPagered(pageable, where);
  }
}
