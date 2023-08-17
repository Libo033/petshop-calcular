import clientPromise from "@/Libs/databases/mongodb";
import { Db, MongoClient } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    // Obtener todos los proveedores
    try {
      const client: MongoClient = await clientPromise;
      const db: Db = client.db("petshop");

      const proveedores = await db.collection("proveedores").find({}).toArray();

      return res.status(200).json(proveedores);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      }
    }
  }
  if (req.method === "POST") {
    // Crear un nuevo proveedor
    try {
      const client: MongoClient = await clientPromise;
      const db: Db = client.db("petshop");
      const nombre = req.body.nombre;

      const nuevo_proveedor = {
        nombre,
        created_at: new Date().toISOString().slice(0, 10).toString(),
      };

      const proveedor_agregado = await db
        .collection("proveedores")
        .insertOne(nuevo_proveedor);

      return res.status(201).json({ creado: proveedor_agregado.acknowledged });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      }
    }
  }
}
