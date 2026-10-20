import React from 'react';

const quitarTildes = (texto = '') =>
  String(texto).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

// Color del helado según palabras del nombre (agrega más sabores aquí)
const SABORES = [
  ['vainilla', '#fff0b8'],
  ['chocolate', '#c49a84'],
  ['fresa', '#ffb3c6'],
  ['limon', '#e6f28d'],
  ['mantecado', '#ffe0a8'],
  ['menta', '#b5ead7'],
  ['mora', '#cdb4db'],
  ['coco', '#f4efe8'],
  ['mango', '#ffd68a'],
  ['cafe', '#d4b29a']
];
const COLOR_DEFECTO = '#e2d4f5';

function colorDelSabor(nombre) {
  const n = quitarTildes(nombre);
  const encontrado = SABORES.find(([clave]) => n.includes(clave));
  return encontrado ? encontrado[1] : COLOR_DEFECTO;
}

// Forma del dibujo: primero mira la categoría, luego el nombre
function buscarTipo(texto) {
  const t = quitarTildes(texto);
  if (t.includes('copa')) return 'copa';
  if (t.includes('paleta')) return 'paleta';
  if (t.includes('litro')) return 'litro';
  if (t.includes('cono')) return 'cono';
  return null;
}

function tipoDeHelado(categoria, nombre) {
  return buscarTipo(categoria) || buscarTipo(nombre) || 'cono';
}

function HeladoImagen({ nombre, categoria, size = 56 }) {
  const color = colorDelSabor(nombre);
  const tipo = tipoDeHelado(categoria, nombre);
  const trazo = 'rgba(74, 63, 85, 0.35)';

  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      role="img"
      aria-label={nombre}
      style={{ flexShrink: 0 }}
    >
      {tipo === 'cono' && (
        <>
          <path d="M20 32 L32 60 L44 32 Z" fill="#f2c88f" stroke={trazo} strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M25 40 L39 40 M28 48 L36 48" stroke="#d9a864" strokeWidth="1.4" strokeLinecap="round" />
          <circle cx="32" cy="24" r="14" fill={color} stroke={trazo} strokeWidth="1.5" />
          <circle cx="26" cy="19" r="3.5" fill="#fff" opacity="0.55" />
        </>
      )}

      {tipo === 'copa' && (
        <>
          <circle cx="23" cy="27" r="9" fill={color} stroke={trazo} strokeWidth="1.5" />
          <circle cx="41" cy="27" r="9" fill={color} stroke={trazo} strokeWidth="1.5" />
          <circle cx="32" cy="19" r="9" fill={color} stroke={trazo} strokeWidth="1.5" />
          <circle cx="32" cy="9" r="3.5" fill="#ff8fa3" stroke={trazo} strokeWidth="1" />
          <path d="M13 30 H51 L43 47 H21 Z" fill="#dff1ff" fillOpacity="0.85" stroke={trazo} strokeWidth="1.5" strokeLinejoin="round" />
          <rect x="30" y="47" width="4" height="9" fill="#dff1ff" stroke={trazo} strokeWidth="1.2" />
          <rect x="21" y="56" width="22" height="4" rx="2" fill="#dff1ff" stroke={trazo} strokeWidth="1.2" />
        </>
      )}

      {tipo === 'paleta' && (
        <>
          <rect x="29" y="42" width="6" height="18" rx="3" fill="#f2d7a7" stroke={trazo} strokeWidth="1.2" />
          <rect x="18" y="4" width="28" height="42" rx="14" fill={color} stroke={trazo} strokeWidth="1.5" />
          <rect x="23" y="10" width="5" height="22" rx="2.5" fill="#fff" opacity="0.5" />
        </>
      )}

      {tipo === 'litro' && (
        <>
          <rect x="12" y="22" width="40" height="36" rx="6" fill={color} stroke={trazo} strokeWidth="1.5" />
          <rect x="10" y="15" width="44" height="9" rx="4" fill="#fff" stroke={trazo} strokeWidth="1.5" />
          <rect x="19" y="32" width="26" height="16" rx="4" fill="#fff" opacity="0.8" />
          <circle cx="32" cy="40" r="4.5" fill={color} stroke={trazo} strokeWidth="1" />
        </>
      )}
    </svg>
  );
}

export default HeladoImagen;