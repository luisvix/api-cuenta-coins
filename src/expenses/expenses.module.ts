import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { ExpensesController } from './expenses.controller';
import { Expense, ExpenseSchema } from './schemas/expense.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Balance, BalanceSchema } from '../balances/schemas/balance.schema';
import { tokenMiddleware } from '../config/constants';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Expense.name, schema: ExpenseSchema }]),
    MongooseModule.forFeature([{ name: Balance.name, schema: BalanceSchema }]),
  ],
  controllers: [ExpensesController],
  providers: [ExpensesService],
  exports: [ExpensesService],
})
export class ExpensesModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(tokenMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
