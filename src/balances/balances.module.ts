import { Module } from '@nestjs/common';
import { BalancesService } from './balances.service';
import { BalancesController } from './balances.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Balance, BalanceSchema } from './schemas/balance.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Balance.name, schema: BalanceSchema }])],
  controllers: [BalancesController],
  providers: [BalancesService],
})
export class BalancesModule {}
