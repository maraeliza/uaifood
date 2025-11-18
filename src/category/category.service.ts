import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Category } from './entities/category.entity';
import { PageableDto } from '../pagination/pageable.dto';
import { BaseService } from 'src/common/base.service';

@Injectable()
export class CategoryService extends BaseService<
  Category,
  PrismaService['category']
> {
  constructor(prisma: PrismaService) {
    super(prisma, prisma.category);
  }

  async findAllCategories(
    pageable: PageableDto,
    filters?: { description?: string },
  ) {
    const where = {
      description: filters?.description
        ? { contains: filters.description, mode: 'insensitive' }
        : undefined,
    };

    return this.findAll(pageable, where);
  }
}
