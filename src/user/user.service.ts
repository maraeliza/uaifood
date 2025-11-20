import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from './entities/user.entity';
import { BaseService } from '../common/base.service';
import { PageableDto } from '../pagination/pageable.dto';
import { Prisma } from 'generated/prisma';

@Injectable()
export class UserService extends BaseService<User, PrismaService['user']> {
  constructor(prisma: PrismaService) {
    super(prisma, prisma.user);
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

  async findUserById(id: number) {
    const include: Prisma.UserInclude = {
      address: {
        select: {
          id: true,
          street: true,
          number: true,
          city: true,
          state: true,
          zipCode: true,
        },
      },
    };

    const user = await this.prisma.user.findUnique({
      where: { id },
      include,
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return user;
  }
}
