import clientPromise from "@/Libs/databases/mongodb";
import { Db, MongoClient, ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    // Obtener un solo producto
    try {
      const client: MongoClient = await clientPromise;
      const db: Db = client.db("petshop");
      const id: string | undefined = req.query.id?.toString();

      const marca = await db
        .collection("marcas")
        .find({ _id: new ObjectId(id) })
        .toArray();

      return res.status(200).json(marca[0]);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      }
    }
  }
  if (req.method === "PUT") {
    // Modificar una marca
    try {
      const client: MongoClient = await clientPromise;
      const db: Db = client.db("petshop");
      const id: string | undefined = req.query.id?.toString();
      const nombre = req.body.nombre;

      const modificar_marca = {
        nombre,
        created_at: new Date().toISOString().slice(0, 10).toString(),
      };

      const marca_modificada = await db
        .collection("marcas")
        .updateOne({ _id: new ObjectId(id) }, { $set: modificar_marca });

      return res
        .status(200)
        .json({ modificada: marca_modificada.acknowledged });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      }
    }
  }
  if (req.method === "DELETE") {
    // Borrar una marca
    try {
      const client: MongoClient = await clientPromise;
      const db: Db = client.db("petshop");
      const id: string | undefined = req.query.id?.toString();

      const marca_borrada = await db
        .collection("marcas")
        .deleteOne({ _id: new ObjectId(id) });

      return res.status(200).json({ deleted: marca_borrada.acknowledged });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      }
    }
  }
}
