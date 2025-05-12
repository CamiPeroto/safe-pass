import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

@Inject()
    private readonly UserService: UserService;

   async signin(params: Prisma.UserCreateInput): Promise <Omit<User, 'password'>>{ //não retornar a senha
        const user = await this.UserService.user({  email: params.email });
        if (!user) 
            throw new NotFoundException('User not found');
        const passwordMatch = await bcrypt.compare(params.password, user.password);
          if (!passwordMatch) throw new UnauthorizedException('Invalidad credentials');
    
        const { password, ...result } = user;
        
        return result;
        }
    
}
