import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GoogleIdTokenGuard } from '../auth/guards/GoogleIdTokenGuard';
import { UsersService } from './users.service';

@ApiTags('Users')
@UseGuards(GoogleIdTokenGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get('me')
  findMe(@Req() req) {
    return this.usersService.findOne({ providerId: req.user.providerId });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne({ id });
  }
}
