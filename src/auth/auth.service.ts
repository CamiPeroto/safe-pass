import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

@Inject()
    private readonly UserService: UserService;

    @Inject()
    private readonly jwtService: JwtService;

   async signin(params: Prisma.UserCreateInput): Promise <{access_token: string}>{ // omit não retornar a senha
        const user = await this.UserService.user({  email: params.email });
        if (!user) 
            throw new NotFoundException('User not found');
        const passwordMatch = await bcrypt.compare(params.password, user.password);
          if (!passwordMatch) throw new UnauthorizedException('Invalidad credentials');
           
        const payload = { sub: user.id };
        
        return{ access_token: await this.jwtService.signAsync(payload) };
        }
    
}
