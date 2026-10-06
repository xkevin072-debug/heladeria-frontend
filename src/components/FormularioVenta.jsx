import React, { useState, useEffect } from 'react';
import { api } from '../api';

const FORM_VACIO = { empleado_id: '', helado_id: '', cantidad: '', fecha: '' };

function FormularioVenta({ onCreate }) {
  const [formData, setFormData] = useState(FORM_VACIO);
  const [empleados, setEmpleados] = useState([]);
  const [helados, setHelados] = useState([]);

  // Cargar listas de empleados y helados al iniciar
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
    api.post('/ventas', formData)
      .then(res => {
        alert(res.data.message);
        setFormData(FORM_VACIO);
        onCreate(); // avisa a la lista para que se actualice
      })
      .catch(err => console.error('Error al registrar venta:', err));
  };

  return (
    <div>
      <h2>Registrar Nueva Venta</h2>
      <form onSubmit={handleSubmit}>
        <select name="empleado_id" value={formData.empleado_id} onChange={handleChange} required>
          <option value="">Seleccione empleado</option>
          {empleados.map(e => (
            <option key={e.id} value={e.id}>{e.nombre} - {e.turno}</option>
          ))}
        </select>

        <select name="helado_id" value={formData.helado_id} onChange={handleChange} required>
          <option value="">Seleccione helado</option>
          {helados.map(h => (
            <option key={h.id} value={h.id}>{h.nombre} - ${h.precio}</option>
          ))}
        </select>

        <input
          type="number"
          name="cantidad"
          placeholder="Cantidad"
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

        <button type="submit">Registrar Venta</button>
      </form>
    </div>
  );
}

export default FormularioVenta;