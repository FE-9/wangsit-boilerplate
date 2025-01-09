/*
 * TODO: Pindah file ini ke folder src/types, rename jadi asset.type.ts
 * Referensi: Coding Guide bagian 4.7
 *
 * Tambahan: Nanti di proyek beneran, semua file interface/type yang
 * berhubungan dengan API bakal dipindah ke repository khusus untuk API,
 * lebih lengkapnya bisa dibaca di Coding Guide bagian 6.4. Interface Asset
 * kan seharusnya response dari API, jadi file ini juga bakal dipindah
 * ke repo itu di proyek beneran.
 */
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
