import clientPromise from "@/Libs/databases/mongodb";
import { Db, MongoClient, ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
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
  if (req.method === "PUT") {   // Modificar un producto (por marca - por proveedor)
    
  }
  if (req.method === "DELETE") {   // Borrar un producto
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
