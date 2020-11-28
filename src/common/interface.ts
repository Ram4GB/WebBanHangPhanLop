export interface IAccount {
  username: string;
  password: string;
}

export interface ICombo {
  id: number;
  comboName: string;
  originalPrice: number;
  discountPercent: number;
  price: number;
  idString: string;
  products: Array<IProduct>;
}

export interface IProduct {
  catalog: {
    id: number;
    catalogName: string;
    idString: string;
  };
  id: number;
  productName: string;
  inStock: number;
  price: number;
  idString: string;
}

export interface ICartItem extends IProduct {
  amount: number;
}
