interface IUser {
  id: number;
  name: string;
}

export interface IPayment {
  id: number;
  date: string;
  sender: IUser;
  receiver: IUser;
  amount: number;
  currency: string;
  memo: string;
}
