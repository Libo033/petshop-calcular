export interface IMarca {
  _id: string;
  nombre: string;
  created_at: string;
}

export interface IProducto {
  _id: string;
  nombre: string;
  marca: string;
  proveedor: string;
  precio_compra: number;
  precio_venta_kg: number;
  precio_venta_bolsa: number;
  kg_bolsa: number;
  ult_mod: string;
  created_at: string;
}

export interface IProveedor {
  _id: string;
  nombre: string;
  created_at: string;
}