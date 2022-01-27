import { Income } from '../schemas/income.schema';

export interface createIncomeParams {
  income: Income;
}

export interface findAllIncomesParams {
  providerId: string;
}
