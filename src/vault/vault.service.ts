import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateVaultDto } from './dto/create-vault.dto';
import { UpdateVaultDto } from './dto/update-vault.dto';
import { PrismaService } from 'src/database/prisma.service';
import { decrypt, encrypt } from 'src/common/encryption';

@Injectable()
export class VaultService {
  @Inject()
  private readonly prisma: PrismaService;

  async create(createVaultDto: CreateVaultDto, userId: number) {
    const encryptedPassword = encrypt(createVaultDto.password);
    const createdVault = await this.prisma.vault.create({
      data: {
        title: createVaultDto.title,
        url: createVaultDto.url,
        description: createVaultDto.description,
        password: encryptedPassword,
        userId: userId,
      },
    });

    return {
      message: 'Senha criada com sucesso!',
      createdVault,
    };
  }

  async findAll() {
    return await this.prisma.vault.findMany();
  }

  async findOne(id: number, userId: number) {
    const vault = await this.prisma.vault.findUnique({
      where: { id },
    });

    if (!vault || vault.userId !== userId) throw new NotFoundException();

    return {
      ...vault,
      password: decrypt(vault.password),
    };
  }

  async update(id: number, updateVaultDto: UpdateVaultDto) {
    const updatedVault = await this.prisma.vault.update({
      where: { id },
      data: updateVaultDto,
    });

    return {
      message: ' Dados da senha atualizados com sucesso!',
      updatedVault,
    };
  }

  async remove(id: number) {
    const deletedVault = await this.prisma.vault.delete({
      where: { id },
    });

    return {
      message: 'Registro apagado com sucesso!',
      deletedVault,
    };
  }
}
