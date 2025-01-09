export interface Asset {
  _id: string;
  name: string;
  aliasName?: string;
  category: string;
  group: string;
  brand: string;
  model: string;
  imageUrl: string;
  lastModifier: {
    _id: string;
    fullName: string;
    updatedAt: string;
  };
}
export interface AssetList {
  totalRecords: number;
  data: Asset[];
}
export interface AssetApiResponse {
  status: number;
  message: string;
  data: AssetList;
}
