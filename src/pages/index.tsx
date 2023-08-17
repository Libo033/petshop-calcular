import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import Layout from "@/components/Layout";
import { Button, TextField, Divider } from "@mui/material";
import React, { useState } from "react";

export default function Home() {
  const [ventaKG, setVentaKG] = useState<number>(0);
  const [gananciaKG, setGananciaKG] = useState<number>(0);
  const [bolsa, setBolsa] = useState<number>(0);
  const [bolsaGanancia, setBolsaGanancia] = useState<number>(0);
  const [compra, setCompra] = useState<number | undefined>();
  const [kilo, setKilo] = useState<number | undefined>();
  const [porcentaje, setPorcentaje] = useState<number | undefined>();

  const calcular = () => {
    if (compra && kilo && porcentaje) {
      setVentaKG(
        parseFloat(
          (compra / kilo + (compra / kilo) * (porcentaje / 100)).toFixed(2)
        )
      );
      setGananciaKG(
        parseFloat(
          (
            compra / kilo +
            (compra / kilo) * (porcentaje / 100) -
            compra / kilo
          ).toFixed(2)
        )
      );
      setBolsa(parseFloat((compra + compra * (porcentaje / 100)).toFixed(2)));
      setBolsaGanancia(parseFloat((compra * (porcentaje / 100)).toFixed(2)));
    }
  };

  return (
    <Layout>
      <div className={styles.page}>
        <h2>Calcular</h2>
        <TextField
          type="number"
          id="outlined-basic"
          label="Precio Compra"
          variant="outlined"
          autoComplete="off"
          value={compra}
          onChange={(e) => setCompra(parseFloat(e.target.value))}
        />
        <TextField
          type="number"
          id="outlined-basic"
          label="Kilogramos"
          variant="outlined"
          autoComplete="off"
          value={kilo}
          onChange={(e) => setKilo(parseFloat(e.target.value))}
        />
        <TextField
          type="number"
          id="outlined-basic"
          label="Porcentaje %"
          variant="outlined"
          autoComplete="off"
          value={porcentaje}
          onChange={(e) => setPorcentaje(parseInt(e.target.value))}
        />
        <section className={styles.resultados}>
          <p className={styles.txt}>Venta por KG: ${ventaKG}</p>
          <p className={styles.txt}>Ganancia por KG: ${gananciaKG}</p>
          <Divider />
          <p className={styles.txt}>Venta por bolsa: ${bolsa}</p>
          <p className={styles.txt}>Ganancia por bolsa: ${bolsaGanancia}</p>
        </section>
        <Button onClick={() => calcular()} variant="contained">
          Calcular
        </Button>
      </div>
    </Layout>
  );
}
