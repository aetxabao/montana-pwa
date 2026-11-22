# Entrena Montaña — PWA estática

Aplicación web progresiva (PWA) para gestionar una rutina general de preparación física orientada a montaña. HTML, CSS y JavaScript sin dependencias ni backend. Interfaz en español.

## Ejecutar en VS Code

1. Abre esta carpeta en VS Code.
2. En un terminal, ejecuta `python3 -m http.server 8000` (Windows también puede usar `py -m http.server 8000`).
3. Abre http://localhost:8000. **No abras** `index.html` con `file://`: la carga del JSON y el service worker requieren un servidor web.
4. Opcional: utiliza la extensión Live Server.

## Editar contenidos

- `data/plan.json`: sesiones, ejercicios, series, repeticiones, descansos, notas, términos de búsqueda en YouTube.
- `styles.css`: diseño, tipografía y colores.
- `app.js`: lógica de navegación, registro, importación y exportación.
- `assets/*.svg`: ilustraciones esquemáticas de movimientos (no sustituyen los vídeos).

Cada ejercicio requiere un `id` único y estable. Si cambias un identificador, las anotaciones anteriores ya no se asociarán a ese ejercicio.

Los enlaces a YouTube son búsquedas por nombre del ejercicio (no vídeos avalados/validados individualmente).

## Publicar en GitHub Pages

1. Crea un **repositorio nuevo**. No hace falta copiar ni clonar otro proyecto.
2. Sube los archivos de esta carpeta a la raíz de `main`.
3. En GitHub, entra en Settings → Pages → Deploy from a branch → `main` / `(root)` → Save.
4. Abre `https://USUARIO.github.io/REPOSITORIO/` en el móvil por HTTPS.
5. Android: menú del navegador → Instalar aplicación / Añadir a pantalla de inicio. iOS Safari: Compartir → Añadir a pantalla de inicio.

GitHub Pages es un servicio público: no subas backups de seguimiento ni datos personales o de salud. El seguimiento se guarda en el dispositivo mediante `localStorage`, sin sincronización. Exporta copias de seguridad periódicas.

## Sin conexión y actualización

El `sw.js` almacena los recursos básicos después de la primera visita online. Los vídeos de YouTube requieren conexión.

Al cambiar recursos o el plan, actualiza el identificador `CACHE` en `sw.js` (`entrena-montana-v2`, etc.) y publica. En `data/plan.json` se intenta actualizar desde la red primero; si no hay conexión se usa la copia local.

## Alcance

El contenido del repositorio es genérico y **no incluye información personal ni condiciones médicas**. Cada persona debe adaptar actividades y cargas a sus necesidades con orientación profesional cuando corresponda.

## Mejoras futuras

- Calendario visual con días realizados.
- Gráficas de evolución de cargas y volumen.
- Temporizador de descansos.
- Modo edición completo de ejercicios desde la interfaz.
- Importación/exportación del plan, además del historial.
- Pruebas automatizadas y accesibilidad.
