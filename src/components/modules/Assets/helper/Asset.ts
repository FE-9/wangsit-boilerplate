interface Name {
  _id: string;
  nameWithSequence: string;
  name: string;
  key: number;
  aliasCode: string;
  aliasName?: string;
}

interface Category {
  _id: string;
  name: string;
  key: number;
  fullPath?: string;
}

interface Group {
  _id: string;
  name: string;
  key: number;
  fullPath?: string;
}

interface Brand {
  _id: string;
  key: number;
  name: string;
  fullPath?: string;
}

interface Model {
  _id: string;
  name: string;
  key: number;
  fullPath?: string;
}

interface LastModifier {
  _id: string;
  fullName: string;
  key: number;
}

export default interface Asset {
  _id: string;
  name: Name;
  isDefault?: boolean;
  category: Category;
  group: Group;
  brand: Brand;
  model: Model;
  policy: string;
  isTransactionable: boolean;
  isActive: boolean;
  lastModifier?: LastModifier | null;
  status: string;
  isSelfService: boolean;
  sequence: number;
}
