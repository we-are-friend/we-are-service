import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.usersRepository.createUser(authCredentialsDto);
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const { username, password } = authCredentialsDto;
    const user = await this.usersRepository.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { username };
      const accessToken: string = await this.jwtService.sign(payload);
      const refreshToken: string = await this.generateRefreshToken(
        payload,
        user.id,
      );
      return { accessToken, refreshToken };
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }

  async tokenSignIn(
    user: User,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const payload = { username: user.username };
    return {
      accessToken: await this.jwtService.sign(payload),
      refreshToken: await this.generateRefreshToken(payload, user.id),
    };
  }

  async generateRefreshToken(payload, userId: string): Promise<string> {
    const refreshToken = await this.jwtService.sign(payload);
    const expirydate = new Date();
    expirydate.setDate(expirydate.getDate() + 6);
    await this.usersRepository.saveOrUpdateRefreshToken(
      refreshToken,
      userId,
      expirydate,
    );
    return refreshToken;
  }
}
