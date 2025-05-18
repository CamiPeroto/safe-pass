import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { VaultModule } from './vault/vault.module';

@Module({
  imports: [AuthModule, DatabaseModule, UserModule, VaultModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
