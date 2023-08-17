import clientPromise from "@/Libs/databases/mongodb";
import { Db, MongoClient, ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    // Obtener un solo proveedor
    try {
      const client: MongoClient = await clientPromise;
      const db: Db = client.db("petshop");
      const id: string | undefined = req.query.id?.toString();

      const producto = await db
        .collection("productos")
        .find({ _id: new ObjectId(id) })
        .toArray();

      return res.status(200).json(producto[0]);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      }
    }
  }
  if (req.method === "PUT") {
    // Modificar un producto (por marca - por proveedor)
    try {
      const client: MongoClient = await clientPromise;
      const db: Db = client.db("petshop");
      const id: string | undefined = req.query.id?.toString();

      const modificar_producto = {
        nombre: req.body.nombre,
        marca: req.body.marca,
        proveedor: req.body.proveedor,
        precio_compra: req.body.precio_compra,
        precio_venta_kg: req.body.precio_venta_kg,
        precio_venta_bolsa: req.body.precio_venta_bolsa,
        kg_bolsa: req.body.kg_bolsa,
        ult_mod: new Date().toISOString().slice(0, 10).toString(),
      };

      const producto_modificado = await db
        .collection("productos")
        .updateOne({ _id: new ObjectId(id) }, { $set: modificar_producto });

      return res
        .status(200)
        .json({ modificada: producto_modificado.acknowledged });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      }
    }
  }
  if (req.method === "DELETE") {
    // Borrar un producto
    try {
      const client: MongoClient = await clientPromise;
      const db: Db = client.db("petshop");
      const id: string | undefined = req.query.id?.toString();

      const producto_borrada = await db
        .collection("productos")
        .deleteOne({ _id: new ObjectId(id) });

      return res.status(200).json({ deleted: producto_borrada.acknowledged });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      }
    }
  }
}
