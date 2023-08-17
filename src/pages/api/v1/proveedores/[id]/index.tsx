import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/Libs/databases/mongodb";
import { Db, MongoClient, ObjectId } from "mongodb";

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

      const proveedor = await db
        .collection("proveedores")
        .find({ _id: new ObjectId(id) })
        .toArray();

      return res.status(200).json(proveedor[0]);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      }
    }
  }
  if (req.method === "PUT") {
    // Modificar un proveedor (por marca - por proveedor)
    try {
      const client: MongoClient = await clientPromise;
      const db: Db = client.db("petshop");
      const id: string | undefined = req.query.id?.toString();
      const nombre = req.body.nombre;

      const modificar_proveedor = {
        nombre,
        created_at: new Date().toISOString().slice(0, 10).toString(),
      };

      const proveedor_modificado = await db
        .collection("proveedores")
        .updateOne({ _id: new ObjectId(id) }, { $set: modificar_proveedor });

      return res
        .status(200)
        .json({ modificada: proveedor_modificado.acknowledged });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      }
    }
  }
  if (req.method === "DELETE") {
    // Borrar un proveedor
    try {
      const client: MongoClient = await clientPromise;
      const db: Db = client.db("petshop");
      const id: string | undefined = req.query.id?.toString();

      const proveedor_borrado = await db
        .collection("proveedores")
        .deleteOne({ _id: new ObjectId(id) });

      return res.status(200).json({ deleted: proveedor_borrado.acknowledged });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      }
    }
  }
}
