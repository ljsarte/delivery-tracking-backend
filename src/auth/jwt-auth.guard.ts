import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// Usage: @UseGuards(JwtAuthGuard) above any controller or route you want protected.
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
