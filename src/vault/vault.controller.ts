import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { VaultService } from './vault.service';
import { CreateVaultDto } from './dto/create-vault.dto';
import { UpdateVaultDto } from './dto/update-vault.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('vault')
export class VaultController {
  constructor(private readonly vaultService: VaultService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createVaultDto: CreateVaultDto, @Request() req: any) {
    return this.vaultService.create(createVaultDto, req.sub);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.vaultService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    return this.vaultService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updateVaultDto: UpdateVaultDto) {
    return this.vaultService.update(+id, updateVaultDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.vaultService.remove(+id);
  }
}
