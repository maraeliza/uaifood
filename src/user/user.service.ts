import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  // ✅ CREATE
  async create(createUserDto: CreateUserDto) {
    const { name, phone, password, addressId } = createUserDto;

    const addressExists = await this.prisma.address.findUnique({
      where: { id: addressId },
    });

    if (!addressExists) {
      throw new NotFoundException(`Endereço com id ${addressId} não encontrado`);
    }

    return this.prisma.user.create({
      data: {
        name,
        phone,
        password,
        address: { connect: { id: addressId } },
      },
      include: { address: true },
    });
  }

  findAll() {
    return this.prisma.user.findMany({
      include: { address: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  // ✅ READ - Um só
  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        address: true,
        clientOrders: true,
        createdOrders: true,
      },
    });

    if (!user) throw new NotFoundException(`Usuário ${id} não encontrado`);

    return user;
  }

  // ✅ UPDATE
  async update(id: number, updateUserDto: UpdateUserDto) {
    const { addressId, ...data } = updateUserDto;

    const existing = await this.prisma.user.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException(`Usuário ${id} não encontrado`);

    return this.prisma.user.update({
      where: { id },
      data: {
        ...data,
        ...(addressId && { address: { connect: { id: addressId } } }),
      },
      include: { address: true },
    });
  }

  async remove(id: number) {
    const existing = await this.prisma.user.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException(`Usuário ${id} não encontrado`);

    return this.prisma.user.delete({
      where: { id },
    });
  }
}
