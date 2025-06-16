// main.js

// Detectar modo claro/oscuro y aplicar clase al body
function aplicarModoColor() {
  const modoOscuro = window.matchMedia('(prefers-color-scheme: dark)').matches;
  document.body.classList.toggle('modo-oscuro', modoOscuro);
  document.body.classList.toggle('modo-claro', !modoOscuro);
}
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', aplicarModoColor);
document.addEventListener('DOMContentLoaded', function() {
  aplicarModoColor();

    // --- SLIDER AUTOMÁTICO PARA CARDS DESTACADAS ---
    // Cambia la imagen de cada slider de programa destacado cada 30 segundos
    document.querySelectorAll('.slider-imagenes').forEach(function(slider) {
        let imgs = slider.querySelectorAll('.slider-img');
        let idx = 0;
        setInterval(() => {
            imgs[idx].classList.remove('active');
            idx = (idx + 1) % imgs.length;
            imgs[idx].classList.add('active');
        }, 5000); // 5 segundos
    });

    // --- PANEL DE PROGRAMACIÓN ---
    // Muestra los horarios según el día seleccionado
    const horarioSemana = [
        "8:00 AM – 9:00 AM - INFANTIL / Caballero del Zodiaco",
        "9:00 AM – 10:00 AM - SERIE ALIAS EL MEXICANO",
        "10:00 AM – 11:00 AM - DEJEMONOA DE VARGAS",
        "11:00 AM – 12:00 AM - NOVELA EL PANTANAL",
        "12:00 MD – 1:00 PM - PABLO ESCOBAR EL PATRON",
        "1:00 PM – 2:00 PM - NOVELA NUEVO RICO NUEVO POBRE",
        "2:00 PM – 3:00 PM - K-DRAMA SERIE COREANA",
        "3:00 PM – 4:00 PM - NOVELA TODO PRESTADO",
        "4:00 PM – 5:00 PM - ZONA MUSICAL",
        "5:00 PM – 6:00 PM - NOVELA LA NIÑA",
        "6:00 PM – 7:00 PM - EL REY DEL GANADO",
        "7:00 PM – 8:00 PM - PELICULAS"
    ];
    const programacionPorDia = {
        "Lunes": horarioSemana,
        "Martes": horarioSemana,
        "Miércoles": horarioSemana,
        "Jueves": horarioSemana,
        "Viernes": horarioSemana
    };
    function mostrarProgramacion(dia) {
        const detalle = document.querySelector('.programacion-detalle');
        detalle.innerHTML = `<h3>${dia}</h3><ul>` +
            (programacionPorDia[dia] ? programacionPorDia[dia].map(p => `<li>${p}</li>`).join('') : '<li>No hay programación</li>') +
            '</ul>';
    }
    const btns = document.querySelectorAll('.dia-btn');
    if(btns.length) {
        btns.forEach(btn => {
            btn.addEventListener('click', function() {
                btns.forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                mostrarProgramacion(btn.dataset.dia);
            });
        });
        // Mostrar el primer día por defecto
        btns[0].classList.add('selected');
        mostrarProgramacion(btns[0].dataset.dia);
    }

    // --- ANIMACIÓN DE MUNICIPIOS ---
    // Permite expandir/cerrar las cards de municipios en cobertura
    document.querySelectorAll('.municipio-card').forEach(function(card) {
        card.querySelector('.municipio-header').addEventListener('click', function() {
            card.classList.toggle('expandido');
        });
    });

    // --- EFECTO HOVER EN BOTONES (ya estaba) ---
    const buttons = document.querySelectorAll('button, .btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            button.style.transform = 'scale(1.05)';
        });
        button.addEventListener('mouseleave', function() {
            button.style.transform = 'scale(1)';
        });
    });

    // --- SCROLL SUAVE PARA BOTÓN "Ver Programación" (ya estaba) ---
    const scrollToProgramacionButton = document.querySelector('.scroll-to-programacion');
    if (scrollToProgramacionButton) {
        scrollToProgramacionButton.addEventListener('click', function(event) {
            event.preventDefault();
            const programacionSection = document.getElementById('programacion');
            programacionSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // --- LISTA DE ZONAS DE COBERTURA CON MENÚ DESPLEGABLE ---
    const zonasCobertura = [
      "ABICINA","ARENALES","ASTURIAS 1Y2","BOCAY","EL BOTE","EL CASTILLO","EL CEEFER","EL CARMEN","EL CARRIL","EL COLECTIVO","EL CONSUELO","EL DELIRIO","EL DORADO","EL ESCAMBRAY","EL LABERINTO","EL MOJON","EL NARANJO","EL RAYSERO","EL SALTO","EL SARAYAL","LA UNIÓN","EMPALME EL TIGRE","GUAPINOL 1Y2","KANSAS CITY","LA CHATA","LA COLONIA","LA COLONIA AGRÍCOLA","LA ESPERANZA","LA FLOR","EL CUA","SANTO DOMINGO","SAN PEDRO","LAS QUEBRADAS","LOS ROBLES","LA FUNDADORA","LA MORA","LA NARANJA","LA PAZ DE EL TUMA","LA PERLITA","LA PERLONA","LA PISTA","LA PITA DEL CARMEN","LA UNIÓN","LA VIRGEN","LAS AMÉRICAS","LAS CARPAS","LAS CRUCES 1Y2","LAS CUCHILLAS","LAS MORENAS","LAS PESAS","LADERAS DEL SOL","LADERAS SUR","LOMA ALTA","LINDA VISTA","Linares","LOS ALPES","LOS ÁNGELES","LOS CIPRESES","LOS LLANOS","LOS MOJONES","LOS NOGALES","LOS PLANES","LOS RANCHITOS","MANCOTAL","MONTE CRISTO 1Y2","JIGUINA","BENESIA","LOS SIPRESES","MONTERREY","PANTASMA","PEÑAS BLANCAS","PLAN DE GRAMA","POSADA REDONDA","PUEBLO NUEVO","RANCHO GRANDE","SAN ESTEBAN","SAN FRANCISCO DE LOS CEDROS","SAN JUAN","SANTA LUCIA","SANTA ROSA","SASLE","SELVA NEGRA","SIERRA MORENA","SISLE","ST ISABEL","TOMAYUCA","VALLE BENJAMÍN ZELEDÓN","VALLE CORINTO","VALLE DE LOS HERRERA","VALLE DE LOS LUMBICES","VALLE DE LOS RIVERA","VILLA NUEVA","YAHOSKA","COMEJÉN"
    ];
    const mostrarInicial = 12;
    let expandido = false;
    function renderTablaZonas() {
      const zonas = expandido ? zonasCobertura : zonasCobertura.slice(0, mostrarInicial);
      const columnas = window.innerWidth < 700 ? 2 : 4;
      const filas = Math.ceil(zonas.length / columnas);
      let tabla = '<table class="zonas-excel-table"><tbody>';
      for(let i=0; i<filas; i++) {
        tabla += '<tr>';
        for(let j=0; j<columnas; j++) {
          const idx = i + j*filas;
          tabla += `<td>${zonas[idx] ? zonas[idx] : ''}</td>`;
        }
        tabla += '</tr>';
      }
      tabla += '</tbody></table>';
      tabla += `<button class="btn-zonas-toggle" style="margin:1.2em auto 0 auto;display:block;">${expandido ? 'Mostrar menos' : 'Ver todos los lugares'}</button>`;
      const contZonas = document.getElementById('zonas-cobertura-table');
      if(contZonas) contZonas.innerHTML = tabla;
      const btn = document.querySelector('.btn-zonas-toggle');
      if(btn) btn.onclick = function() {
        expandido = !expandido;
        renderTablaZonas();
      };
    }
    window.addEventListener('resize', renderTablaZonas);
    renderTablaZonas();

    // --- CARRUSEL DE NUESTROS PROGRAMAS ---
    // Carrusel de Nuestros Programas con rotación circular infinita
    function initCarruselProgramas() {
      const track = document.querySelector('.carrusel-track');
      if (!track) return;
      const cards = Array.from(track.children);
      if (cards.length === 0) return;
      // Clonar los primeros 2 cards al final para efecto circular
      cards.slice(0,2).forEach(card => track.appendChild(card.cloneNode(true)));
      let current = 0;
      const cardWidth = cards[0].offsetWidth + 22; // ancho de card + gap
      let isTransitioning = false;
      setInterval(() => {
        if (isTransitioning) return;
        current++;
        track.scrollTo({ left: cardWidth * current, behavior: 'smooth' });
        // Si llegamos al final de los originales, reiniciamos sin salto
        if (current === cards.length) {
          isTransitioning = true;
          setTimeout(() => {
            track.scrollTo({ left: 0, behavior: 'auto' });
            current = 0;
            isTransitioning = false;
          }, 400); // espera a que termine el scroll suave
        }
      }, 4000);
    }
    initCarruselProgramas();
});

