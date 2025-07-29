// Mostrar/ocultar descripción en cards de programas (ya no se usa, pero se deja por si se reactiva)
document.addEventListener('DOMContentLoaded', function() {
  // Carousel para la card del noticiero (7 imágenes .png)
  const noticieroImgs = [
    'assets/programas/noticiero/1.png',
    'assets/programas/noticiero/2.png',
    'assets/programas/noticiero/3.png',
    'assets/programas/noticiero/4.png',
    'assets/programas/noticiero/5.png',
    'assets/programas/noticiero/6.png',
    'assets/programas/noticiero/7.png'
  ];
  let noticieroIndex = 0;
  const noticieroImgEl = document.getElementById('noticiero-carousel-img');
  if (noticieroImgEl) {
    setInterval(() => {
      noticieroIndex = (noticieroIndex + 1) % noticieroImgs.length;
      noticieroImgEl.style.opacity = 0;
      setTimeout(() => {
        noticieroImgEl.src = noticieroImgs[noticieroIndex];
        noticieroImgEl.style.opacity = 1;
      }, 400);
    }, 5000);
  }
  // Fix para menú hamburguesa en móvil (Bootstrap 5)
  var navCollapse = document.getElementById('mainNavCollapse');
  var navLinks = navCollapse ? navCollapse.querySelectorAll('.nav-link') : [];
  var bsCollapse = null;
  if (window.bootstrap && navCollapse) {
    bsCollapse = new window.bootstrap.Collapse(navCollapse, {toggle: false});
  }
  navLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      if (window.innerWidth < 992 && navCollapse.classList.contains('show')) {
        if (window.bootstrap && bsCollapse) {
          bsCollapse.hide();
        } else {
          navCollapse.classList.remove('show');
        }
      }
    });
  });
});

// Programación semanal (misma para todos los días)
const programacion = [
  { hora: '08:00', nombre: 'INFANTIL / Caballero del Zodiaco', categoria: 'Infantil', img: '', fin: '09:00' },
  { hora: '09:00', nombre: 'TRANQUILO PAPA', categoria: 'Comedia', img: '', fin: '10:00' },
  { hora: '10:00', nombre: 'Final del Paraiso', categoria: 'Novela', img: '', fin: '11:00' },
  { hora: '11:00', nombre: 'Vecinos', categoria: 'Comedia', img: '', fin: '12:00' },
  { hora: '12:00', nombre: 'PABLO ESCOBAR EL PATRON', categoria: 'Serie', img: 'assets/programas/pablo-escobar/pablo1.jpg', fin: '13:00' },
  { hora: '13:00', nombre: 'NOVELA NUEVO RICO NUEVO POBRE', categoria: 'Novela', img: '', fin: '14:00' },
  { hora: '14:00', nombre: 'K-DRAMA CORE- escarlera al cielo', categoria: 'Drama', img: '', fin: '15:00' },
  { hora: '15:00', nombre: 'Lady la vendedora', categoria: 'Novela', img: '', fin: '16:00' },
  { hora: '16:00', nombre: 'ZONA MUSICAL', categoria: 'Entretenimiento', img: 'assets/programas/zona-musical/musica2.jpg', fin: '17:00' },
  { hora: '17:00', nombre: 'Comando elite', categoria: 'Serie', img: '', fin: '18:00' },
  { hora: '18:00', nombre: 'EL REY DEL GANADO', categoria: 'Novela', img: 'assets/programas/rey-ganado/rey ganado2.jpg', fin: '19:00' },
  { hora: '19:00', nombre: 'Game of throne', categoria: 'Serie', img: '', fin: '20:00' },
  { hora: '20:00', nombre: 'PELICULAS', categoria: 'Película', img: '', fin: '08:00' },
];

const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

function getProgramasActuales() {
  const hoy = new Date();
  const horaActual = hoy.getHours() + hoy.getMinutes() / 60;
  let actual = 0;
  for (let i = 0; i < programacion.length; i++) {
    let [h, m] = programacion[i].hora.split(':').map(Number);
    let inicio = h + m / 60;
    let [hf, mf] = (programacion[i].fin || '23:59').split(':').map(Number);
    let fin = hf + mf / 60;
    // Si el programa cruza la medianoche (ej: 20:00 a 08:00)
    if (fin < inicio) fin += 24;
    let ha = horaActual;
    if (horaActual < inicio) ha += 24; // Para comparar correctamente después de medianoche
    if (ha >= inicio && ha < fin) {
      actual = i;
      break;
    }
    if (horaActual < inicio) {
      actual = i;
      break;
    }
  }
  const prev = programacion[(actual - 1 + programacion.length) % programacion.length] || null;
  const curr = programacion[actual] || null;
  const next = programacion[(actual + 1) % programacion.length] || null;
  return { prev, curr, next };
}

function renderProgramacion() {
  const hoy = new Date();
  const dia = diasSemana[hoy.getDay()];
  const fecha = `${dia} ${hoy.getDate()}/${hoy.getMonth() + 1}/${hoy.getFullYear()}`;
  const diaElem = document.getElementById('programacion-dia');
  if (diaElem) diaElem.textContent = fecha;
  const { prev, curr, next } = getProgramasActuales();
  let html = `<table class="table table-hover align-middle mb-0" style="font-family: 'Open Sans', Arial, sans-serif; border:none !important;">
    <thead class="table-light">
      <tr>
        <th scope="col">Hora</th>
        <th scope="col">Programa</th>
        <th scope="col">Estado</th>
      </tr>
    </thead>
    <tbody>`;
  if (prev) {
    html += `<tr class="text-muted small">
      <td>${formato12h(prev.hora)} - ${formato12h(prev.fin)}</td>
      <td>${prev.nombre}</td>
      <td><span class="badge bg-secondary">Finalizó</span></td>
    </tr>`;
  }
  if (curr) {
    html += `<tr class="table-primary fw-bold" style="font-size:1.1em;">
      <td>${formato12h(curr.hora)} - ${formato12h(curr.fin)}</td>
      <td>${curr.nombre}</td>
      <td><span class="badge bg-success">En emisión</span></td>
    </tr>`;
  }
  if (next) {
    html += `<tr class="text-muted small">
      <td>${formato12h(next.hora)} - ${formato12h(next.fin)}</td>
      <td>${next.nombre}</td>
      <td><span class="badge bg-info text-dark">Próximo</span></td>
    </tr>`;
  }
  html += '</tbody></table>';
  const cont = document.getElementById('programacion-dinamica');
  if (cont) cont.innerHTML = html;
}

function renderTablaCompleta() {
  let html = `<table class="table table-bordered align-middle mb-0">
    <thead class="table-light">
      <tr>
        <th>Horario</th>
        <th>Programa</th>
        <th>Estado</th>
      </tr>
    </thead>
    <tbody>`;
  const hoy = new Date();
  const horaActual = hoy.getHours() + hoy.getMinutes() / 60;
  for (let i = 0; i < programacion.length; i++) {
    let [h, m] = programacion[i].hora.split(':').map(Number);
    let inicio = h + m / 60;
    let [hf, mf] = (programacion[i].fin || '23:59').split(':').map(Number);
    let fin = hf + mf / 60;
    if (fin < inicio) fin += 24;
    let ha = horaActual;
    if (horaActual < inicio) ha += 24;
    let estado = '';
    if (ha >= inicio && ha < fin) {
      estado = '<span class="badge bg-success">En emisión</span>';
    } else if (ha < inicio) {
      estado = '<span class="badge bg-info text-dark">Próximo</span>';
    } else {
      estado = '<span class="badge bg-secondary">Finalizó</span>';
    }
    html += `<tr>\n      <td>${formato12h(programacion[i].hora)} - ${formato12h(programacion[i].fin)}</td>\n      <td>${programacion[i].nombre}</td>\n      <td>${estado}</td>\n    </tr>`;
  }
  html += `</tbody></table>`;
  const tabla = document.getElementById('tabla-programacion-completa');
  if(tabla) tabla.innerHTML = html;
}

function formato12h(hora24) {
  if (!hora24) return '';
  let [h, m] = hora24.split(':').map(Number);
  let suf = h >= 12 ? 'pm' : 'am';
  let h12 = h % 12;
  if (h12 === 0) h12 = 12;
  return `${h12}:${m.toString().padStart(2, '0')} ${suf}`;
}

setInterval(renderProgramacion, 60000);
document.addEventListener('DOMContentLoaded', renderProgramacion);

// Modal programación completa
document.addEventListener('DOMContentLoaded', function() {
  const btnVerTodo = document.getElementById('btn-ver-todo');
  if (btnVerTodo) {
    btnVerTodo.addEventListener('click', function() {
      renderTablaCompleta();
      if (window.bootstrap && bootstrap.Modal) {
        const modal = new bootstrap.Modal(document.getElementById('modalProgramacionCompleta'));
        modal.show();
      } else {
        alert('Programación completa:\n' + programacion.map(p => `${formato12h(p.hora)} - ${formato12h(p.fin)}: ${p.nombre}`).join('\n'));
      }
    });
  }
});

// Modo claro/oscuro
function aplicarModoColor() {
  const modoOscuro = window.matchMedia('(prefers-color-scheme: dark)').matches;
  document.body.classList.toggle('modo-oscuro', modoOscuro);
  document.body.classList.toggle('modo-claro', !modoOscuro);
}
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', aplicarModoColor);
document.addEventListener('DOMContentLoaded', aplicarModoColor);

