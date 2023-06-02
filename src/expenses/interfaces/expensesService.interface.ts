import { Expense } from '../schemas/expense.schema';

export interface createExpenseParams {
  expense: Expense;
}

export interface findAllFilter {
  month?: number;
  year?: number;
}
export interface findAllExpensesParams {
  userId: string;
  filter?: findAllFilter;
}
