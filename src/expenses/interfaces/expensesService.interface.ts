import { Expense } from '../schemas/expense.schema';

export interface createExpenseParams {
  expense: Expense;
}

export interface findAllExpensesParams {
  providerId: string;
}
