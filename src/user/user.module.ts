import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from 'src/database/database.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [DatabaseModule,  forwardRef(() => AuthModule)], //importar o modulo com o prisma service
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
