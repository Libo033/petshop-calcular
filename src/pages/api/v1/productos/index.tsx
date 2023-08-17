import clientPromise from "@/Libs/databases/mongodb";
import { Db, MongoClient } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    // Obtener todos los productos
    try {
      const client: MongoClient = await clientPromise;
      const db: Db = client.db("petshop");

      const productos = await db.collection("productos").find({}).toArray();

      return res.status(200).json(productos);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      }
    }
  }
  if (req.method === "POST") {
    // Crear un nuevo producto
    try {
      const client: MongoClient = await clientPromise;
      const db: Db = client.db("petshop");

      const nuevo_producto = {
        nombre: req.body.nombre,
        marca: req.body.marca,
        proveedor: req.body.proveedor,
        precio_compra: req.body.precio_compra,
        precio_venta_kg: req.body.precio_venta_kg,
        precio_venta_bolsa: req.body.precio_venta_bolsa,
        kg_bolsa: req.body.kg_bolsa,
        ult_mod: "No modificado",
        created_at: new Date().toISOString().slice(0, 10).toString(),
      };

      const producto_creado = await db
        .collection("productos")
        .insertOne(nuevo_producto);

      return res.status(201).json({ creado: producto_creado.acknowledged });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      }
    }
  }
  if (req.method === "PUT") {
    // Modificar todos los productos (por marca - por proveedor)
  }
}
