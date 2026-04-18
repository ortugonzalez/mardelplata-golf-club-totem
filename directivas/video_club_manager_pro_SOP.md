# Directiva: Video Presentación Club Manager Pro

## Objetivo
Crear una presentación web cinematográfica de 90 segundos para "Club Manager Pro" de WIS Agency, dirigida al Mar del Plata Golf Club. La presentación se auto-reproduce como un video y puede grabarse con screen recording.

## Contexto
- **Cliente:** Mar del Plata Golf Club ("La Catedral del Golf"), fundado en 1900, arquitectura Tudor inglés.
- **Producto:** Club Manager Pro — sistema de gestión con tótem digital, check-in automático, OCR de tarjetas, integración con Golfistics.
- **Agencia:** WIS Agency.

## Tecnología
- **Stack:** HTML5 + CSS3 + JavaScript vanilla
- **Animación:** GSAP (GreenSock) vía CDN para timeline preciso
- **Imágenes:** Generadas por IA para escenas clave
- **Audio:** Archivo de música instrumental (el usuario lo agregará manualmente o se usa la Web Audio API)
- **Resolución objetivo:** 1920x1080 (Full HD)

## Estructura del Video (90 segundos)

### Escenas (0:00 - 1:40)
- **ESCENA 4 — Pantalla de inicio (0:00 a 0:10):** Mostrar la interfaz del tótem en pantalla completa sobre fondo verde oscuro. Tres botones grandes y elegantes aparecen con fade in: "Soy socio", "Soy invitado", "Torneos". Una mano toca "Soy socio". Transición suave a la siguiente pantalla.
- **ESCENA 5 — Ingreso de DNI (0:10 a 0:20):** Aparece un teclado numérico limpio en pantalla con el campo: "Ingresá tu número de DNI". Los números se van ingresando uno a uno: 2 - 8 - 4 - 4 - 1 - 9 - 0 - 3. Botón "Confirmar" se ilumina. La mano lo toca.
- **ESCENA 6 — Perfil del socio (0:20 a 0:30):** Pantalla muestra el perfil del socio con animación de entrada: avatar con iniciales "RC", nombre "Roberto Castillo", matrícula #4821, handicap 12.4, cuota "Al día" en verde. Pausa de 3 segundos para que el espectador lo lea.
- **ESCENA 7 — Selección de hoyos (0:30 a 0:38):** Aparecen dos botones: "9 hoyos" y "18 hoyos". La mano selecciona "18 hoyos", el botón se resalta. Aparece el botón "Imprimir tarjeta y habilitar". La mano lo toca.
- **ESCENA 8 — Impresión de tarjeta (0:38 a 0:45):** Animación de tarjeta blanca saliendo lentamente de la ranura inferior del tótem. Texto en pantalla: "¡Listo para jugar!" en verde. Fade out suave.
- **ESCENA 9 — Inserción de tarjeta (0:45 a 0:52):** Nueva pantalla del tótem: "Bienvenido de vuelta. Insertá tu tarjeta." con ícono de ranura parpadeando suavemente. Animación de tarjeta siendo insertada desde abajo hacia la ranura. La pantalla reacciona con un flash verde suave.
- **ESCENA 10 — OCR procesando (0:52 a 0:58):** Pantalla muestra animación de escaneo: línea verde recorriendo la tarjeta de arriba a abajo. Texto: "Leyendo puntajes..." con tres puntos animados. Barra de progreso que llega al 100%.
- **ESCENA 11 — Grilla de puntajes (0:58 a 1:08):** Aparece grilla con 18 hoyos y puntajes ya completados automáticamente. La mano toca el hoyo 7 — el número se resalta en naranja. Aparece un teclado numérico pequeño. Se corrige de 7 a 6. La celda vuelve a verde. Texto arriba: "Verificá tus puntajes".
- **ESCENA 12 — Confirmación y sincronización (1:08 a 1:15):** La mano toca "Confirmar puntajes". Animación de checkmark verde expandiéndose. Texto: "Sincronizado con Golfistics". Subtexto pequeño: "Handicap actualizado · Comprobante enviado al email".
- **ESCENA 13 — Dashboard gerencial (1:15 a 1:22):** Transición a dashboard oscuro en pantalla completa. Cuatro métricas aparecen con contador animado: "Check-ins hoy: 47", "Ingresos: $2.340.000", "Tarjetas procesadas: 38", "Cuotas al día: 98%". Todo actualizándose en tiempo real. Texto pequeño abajo: "Sin intervención manual".
- **ESCENA 14 — El secretario liberado (1:22 a 1:27):** Breve plano oscuro con texto centrado en blanco: "El tótem hizo el trabajo." Subtexto: "+20 horas semanales recuperadas por el equipo."
- **ESCENA 15 — Dato de impacto (1:27 a 1:32):** Pantalla negra. Texto serif centrado aparece con fade: "De 4 administrativos a 1 supervisor." Segunda línea: "Mismo club, mejor gestión."
- **ESCENA 16 — Cierre con logos (1:32 a 1:40):** Fade a negro total. Logo del Mar del Plata Golf Club aparece centrado en blanco. Debajo, separado por una línea fina dorada, logo de WIS Agency más pequeño. Todo en silencio. Fade out final.

## Paleta de Colores
- Verde oscuro primario: `#0a1a0f`
- Verde medio: `#1a3a1f`
- Blanco: `#ffffff`
- Dorado suave: `#c9a84c`
- Negro: `#000000`

## Tipografía
- Títulos/branding: Serif (Playfair Display)
- Interfaz/UI: Sans-serif (Inter)

## Restricciones / Casos Borde
- La presentación debe funcionar sin servidor (solo abrir index.html)
- Las imágenes se generan inline o se referencian localmente
- GSAP se carga desde CDN
- El video es una simulación web — para obtener el .mp4 final, se graba la pantalla
- Resolución fija 1920x1080, sin responsive

## Fase: Exportación a Video (MP4)
Para generar el archivo final en formato YouTube (16:9, 1080p, .mp4):
1. **Herramientas:** Playwright (para grabación de pantalla headless) y FFmpeg (para transcodificación).
2. **Procedimiento:**
   - Instalar dependencias: `pip install playwright`, luego `playwright install chromium`.
   - Ejecutar el script `scripts/build_mp4.py`.
   - El script captura la ejecución del `index.html` durante 102 segundos.
   - FFmpeg convierte el archivo temporal a `Club_Manager_Pro_Demo.mp4` en la raíz.
3. **Restricción:** Asegurarse de que el script espere a que la animación termine y que el `viewport` sea exactamente 1920x1080.

## Entregables
1. `index.html` — Archivo principal
2. `styles.css` — Estilos
3. `app.js` — Lógica y timeline GSAP
4. `assets/` — Imágenes generadas
5. `Club_Manager_Pro_Demo.mp4` — Video demo final
6. Instrucciones para visualizar / re-generar el video

## Notas
- No usar efectos llamativos ni colores estridentes
- Tono sofisticado, institucional, no startup
- Sensación de institución centenaria adoptando tecnología elegantemente
