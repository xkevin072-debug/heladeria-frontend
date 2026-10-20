import React, { useState } from 'react';
import CatalogoHelados from './components/CatalogoHelados';
import FormularioVenta from './components/FormularioVenta';
import ListaVentas from './components/ListaVentas';

function App() {
  // Al cambiar este número, ListaVentas vuelve a pedir los datos
  const [recarga, setRecarga] = useState(0);
  const refrescar = () => setRecarga(r => r + 1);

  return (
    <div className="app">
      <header className="cabecera">
        <h1>🍦 Heladería</h1>
        <p>Registro de ventas</p>
      </header>

      <section className="tarjeta">
        <CatalogoHelados />
      </section>

      <section className="tarjeta">
        <FormularioVenta onCreate={refrescar} />
      </section>

      <section className="tarjeta">
        <ListaVentas recarga={recarga} />
      </section>
    </div>
  );
}

export default App;