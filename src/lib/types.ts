export interface IUser {
  id: number;
  name: string;
}

export interface IPayment {
  id: string;
  date: string;
  sender: IUser;
  receiver: IUser;
  amount: string;
  currency: string;
  memo?: string | undefined;
}

export interface ITableColumns {
  transactionId: boolean;
  sender: boolean;
  receiver: boolean;
  amount: boolean;
  currency: boolean;
  memo: boolean;
  date: boolean;
}
