import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Prisma, User as UserModel } from '@prisma/client';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('signup')
  async signupUser(
    @Body() userData: Prisma.UserCreateInput,
  ): Promise<{ message: string; user: UserModel }> {
    const createdUser = await this.userService.createUser(userData);

    return {
      message: 'Usuário criado com sucesso!',
      user: createdUser,
    };
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async getUser(@Param('id') id: string): Promise<UserModel> {
    const userId = Number(id);
    if (isNaN(userId)) {
      throw new BadRequestException('Invalid user ID');
    }

    const user = await this.userService.user({ id: userId });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    return user;
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async updateUser(
    @Body() userData: Prisma.UserUpdateInput,
    @Param('id') id: string,
  ): Promise<{ message: string; user: UserModel }> {
    const updatedUser = await this.userService.updateUser({
      where: { id: Number(id) },
      data: userData,
    });
    return {
      message: 'Usuário atualizado com sucesso!',
      user: updatedUser,
    };
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteUser(
    @Param('id') id: string,
  ): Promise<{ message: string; user: UserModel }> {
    const deletedUser = await this.userService.deleteUser({ id: Number(id) });
    return {
      message: 'Usuário apagado com sucesso!',
      user: deletedUser,
    };
  }
}
