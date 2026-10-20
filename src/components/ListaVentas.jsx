import React, { useEffect, useState, useCallback } from 'react';
import { api } from '../api';
import EditarVenta from './EditarVenta';
import HeladoImagen from './HeladoImagen';

function ListaVentas({ recarga }) {
  const [ventas, setVentas] = useState([]);
  const [ventaSeleccionada, setVentaSeleccionada] = useState(null);

  const cargarVentas = useCallback(() => {
    api.get('/ventas')
      .then(res => setVentas(res.data))
      .catch(err => console.error('Error al obtener ventas:', err));
  }, []);

  // Se ejecuta al iniciar y cada vez que App cambia "recarga"
  useEffect(() => {
    cargarVentas();
  }, [recarga, cargarVentas]);

  const eliminarVenta = (id) => {
    if (window.confirm('¿Seguro que deseas eliminar esta venta?')) {
      api.delete(`/ventas/${id}`)
        .then(res => {
          alert(res.data.message);
          cargarVentas();
        })
        .catch(err => console.error('Error al eliminar venta:', err));
    }
  };

  return (
    <div>
      <h2>Ventas de la Heladería</h2>

      <div className="tabla-scroll">
        <table>
          <thead>
            <tr>
              <th>Empleado</th>
              <th>Helado</th>
              <th>Cantidad</th>
              <th>Precio</th>
              <th>Total</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {ventas.map(v => (
              <tr key={v.id}>
                <td>{v.empleado}</td>
                <td>
                  <div className="celda-helado">
                    <HeladoImagen nombre={v.helado} size={36} />
                    {v.helado}
                  </div>
                </td>
                <td>{v.cantidad}</td>
                <td>${Number(v.precio).toFixed(2)}</td>
                <td>${Number(v.total).toFixed(2)}</td>
                <td>{v.fecha}</td>
                <td>
                  <button className="btn-editar" onClick={() => setVentaSeleccionada(v)}>
                    Editar
                  </button>
                  <button className="btn-eliminar" onClick={() => eliminarVenta(v.id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {ventaSeleccionada && (
        <div className="panel-editar">
          <EditarVenta
            key={ventaSeleccionada.id}
            venta={ventaSeleccionada}
            onUpdate={() => {
              setVentaSeleccionada(null);
              cargarVentas();
            }}
            onCancel={() => setVentaSeleccionada(null)}
          />
        </div>
      )}
    </div>
  );
}

export default ListaVentas;