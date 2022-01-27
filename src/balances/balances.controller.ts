import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BalancesService } from './balances.service';

@ApiTags('Balances')
@Controller('balances')
export class BalancesController {
  constructor(private readonly balancesService: BalancesService) {}
}
