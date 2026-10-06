import React, { useState } from 'react';
import ListaVentas from './components/ListaVentas';
import FormularioVenta from './components/FormularioVenta';

function App() {
  // Al cambiar este número, ListaVentas vuelve a pedir los datos
  const [recarga, setRecarga] = useState(0);
  const refrescar = () => setRecarga(r => r + 1);

  return (
    <div>
      <h1>Heladería</h1>
      <FormularioVenta onCreate={refrescar} />
      <ListaVentas recarga={recarga} />
    </div>
  );
}

export default App;