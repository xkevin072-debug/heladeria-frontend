import React, { useEffect, useState } from 'react';
import { api } from '../api';
import HeladoImagen from './HeladoImagen';

function CatalogoHelados() {
  const [helados, setHelados] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    api.get('/helados')
      .then(res => setHelados(res.data))
      .catch(err => console.error('Error al obtener helados:', err))
      .finally(() => setCargando(false));
  }, []);

  return (
    <div>
      <h2>Nuestros helados</h2>

      {cargando && (
        <p className="mensaje-carga">
          Cargando helados... la primera vez puede tardar hasta un minuto.
        </p>
      )}

      <div className="catalogo">
        {helados.map(h => (
          <div className="helado-card" key={h.id}>
            <HeladoImagen nombre={h.nombre} categoria={h.categoria} size={72} />
            <strong>{h.nombre}</strong>
            <span className="etiqueta">{h.categoria}</span>
            <span className="precio">${Number(h.precio).toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CatalogoHelados;