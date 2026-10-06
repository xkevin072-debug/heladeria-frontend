import React, { useState, useEffect } from 'react';
import { api } from '../api';

function EditarVenta({ venta, onUpdate, onCancel }) {
  const [formData, setFormData] = useState({
    empleado_id: venta.empleado_id,
    helado_id: venta.helado_id,
    cantidad: venta.cantidad,
    fecha: venta.fecha
  });
  const [empleados, setEmpleados] = useState([]);
  const [helados, setHelados] = useState([]);

  useEffect(() => {
    api.get('/empleados')
      .then(res => setEmpleados(res.data))
      .catch(err => console.error('Error al obtener empleados:', err));

    api.get('/helados')
      .then(res => setHelados(res.data))
      .catch(err => console.error('Error al obtener helados:', err));
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api.put(`/ventas/${venta.id}`, formData)
      .then(res => {
        alert(res.data.message);
        onUpdate(); // cierra el editor y refresca la lista
      })
      .catch(err => console.error('Error al actualizar venta:', err));
  };

  return (
    <div>
      <h3>Editando venta #{venta.id}</h3>
      <form onSubmit={handleSubmit}>
        <select name="empleado_id" value={formData.empleado_id} onChange={handleChange} required>
          {empleados.map(e => (
            <option key={e.id} value={e.id}>{e.nombre} - {e.turno}</option>
          ))}
        </select>

        <select name="helado_id" value={formData.helado_id} onChange={handleChange} required>
          {helados.map(h => (
            <option key={h.id} value={h.id}>{h.nombre} - ${h.precio}</option>
          ))}
        </select>

        <input
          type="number"
          name="cantidad"
          min="1"
          value={formData.cantidad}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="fecha"
          value={formData.fecha}
          onChange={handleChange}
          required
        />

        <button type="submit">Actualizar Venta</button>
        <button type="button" onClick={onCancel}>Cancelar</button>
      </form>
    </div>
  );
}

export default EditarVenta;