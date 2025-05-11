import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule], //importar o modulo com o prisma service
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
