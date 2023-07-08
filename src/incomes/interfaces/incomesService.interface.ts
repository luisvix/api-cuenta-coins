import { FrequencyOfMovements } from '../../common/constants';
import { findAllFilter } from '../../expenses/interfaces/expensesService.interface';
import { Income } from '../schemas/income.schema';

export interface createIncomeParams {
  income: Income;
}

export interface findAllIncomesParams {
  userId: string;
  filter?: findAllFilter;
}

export interface createManyIncomesParams {
  income: Income;
  frequency: FrequencyOfMovements;
  numberOfMovements: number;
}
