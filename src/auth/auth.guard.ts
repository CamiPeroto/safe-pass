import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorization = this.extractTokenFromHeader(request);
    if (!authorization) throw new UnauthorizedException('Token é necessário');

    try {
      const payload = this.jwtService.verify(authorization, {
        secret: process.env.SECRET_KEY,
      });
      request.userId = payload;
    } catch (error) {
      throw new UnauthorizedException('Token inválido!');
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const authHeader = request.headers['authorization'];
    const [type, token] = (
      typeof authHeader === 'string' ? authHeader : ''
    ).split(' ');
    return type === 'Bearer' ? token : undefined;
  }
}
