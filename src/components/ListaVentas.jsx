import React, { useEffect, useState, useCallback } from 'react';
import { api } from '../api';
import EditarVenta from './EditarVenta';

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
      <table border="1">
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
              <td>{v.helado}</td>
              <td>{v.cantidad}</td>
              <td>${Number(v.precio).toFixed(2)}</td>
              <td>${Number(v.total).toFixed(2)}</td>
              <td>{v.fecha}</td>
              <td>
                <button onClick={() => setVentaSeleccionada(v)}>Editar</button>
                <button onClick={() => eliminarVenta(v.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {ventaSeleccionada && (
        <EditarVenta
          key={ventaSeleccionada.id}
          venta={ventaSeleccionada}
          onUpdate={() => {
            setVentaSeleccionada(null);
            cargarVentas();
          }}
          onCancel={() => setVentaSeleccionada(null)}
        />
      )}
    </div>
  );
}

export default ListaVentas;