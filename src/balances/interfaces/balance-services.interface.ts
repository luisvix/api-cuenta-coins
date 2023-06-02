export interface listBalancesParams {
  userId: string;
  limit?: number;
  offset?: number;
}

export interface getBalanceParams {
  userId: string;
  month?: number;
  year?: number;
}
