import { Inject, Injectable } from '@nestjs/common';
import { CreateVaultDto } from './dto/create-vault.dto';
import { UpdateVaultDto } from './dto/update-vault.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class VaultService {
  @Inject()
  private readonly prisma: PrismaService;

  async create(createVaultDto: CreateVaultDto) {
    const userId = 1;
    return await this.prisma.vault.create({
      data: { ...createVaultDto, userId },
    });
  }

  async findAll() {
    return await this.prisma.vault.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.vault.findUnique({ where: { id } });
  }

  async update(id: number, updateVaultDto: UpdateVaultDto) {
    return await this.prisma.vault.update({
      where: { id },
      data: updateVaultDto,
    });
  }

  remove(id: number) {
    return this.prisma.vault.delete({ where: { id } });
  }
}
