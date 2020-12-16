export interface IAccount {
  id: 10;
  fullName: string;
  address: string;
  phoneNumber: string;
  email: string;
  roleName: string;
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
  imageUrl: string;
}

export interface ICartProductItem extends IProduct {
  amount: number;
}

export interface ICartComboItem extends ICombo {
  amount: number;
}

export interface ICategory {
  id: any;
  catalogName: string;
  idString: string;
}
