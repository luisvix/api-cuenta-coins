import { findAllFilter } from '../../expenses/interfaces/expensesService.interface';
import { Income } from '../schemas/income.schema';

export interface createIncomeParams {
  income: Income;
}

export interface findAllIncomesParams {
  userId: string;
  filter?: findAllFilter;
}
