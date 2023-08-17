import clientPromise from "@/Libs/databases/mongodb";
import { Db, MongoClient } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    // Obtener todas las marcas
    try {
      const client: MongoClient = await clientPromise;
      const db: Db = client.db("petshop");

      const marcas = await db.collection("marcas").find({}).toArray();

      return res.status(200).json(marcas);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      }
    }
  }
  if (req.method === "POST") {
    // Crear una nueva marca
    try {
      const client: MongoClient = await clientPromise;
      const db: Db = client.db("petshop");

      const nueva_marca = {
        nombre: req.body.nombre,
        created_at: new Date().toISOString().slice(0, 10).toString(),
      };

      const marca_agregada = await db
        .collection("marcas")
        .insertOne(nueva_marca);

      return res.status(201).json({ creado: marca_agregada.acknowledged });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      }
    }
  }
}
