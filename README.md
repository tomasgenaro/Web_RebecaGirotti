# Estudio Dra. Rebeca Girotti — versión 1.10.1

Sitio institucional estático, mobile-first y sin dependencias de producción. Está desarrollado con HTML5 semántico, CSS3 y JavaScript puro, listo para alojarse en GitHub Pages, Cloudflare Pages, Netlify o Vercel.

## Contenido

- Página principal con presentación, perfil profesional, áreas de práctica, modalidad de atención y contacto.
- Canales directos: WhatsApp, teléfono, correo, Instagram y LinkedIn.
- Página de privacidad y página de error 404.
- SEO técnico básico: metadatos, Open Graph, JSON-LD, `robots.txt` y `sitemap.xml`.
- Navegación accesible, foco visible, menú móvil con control de teclado y soporte para `prefers-reduced-motion`.

## Cambios de la versión 1.10.1

- Conserva íntegramente el diseño, las proporciones, la tipografía y la redacción de la versión 1.10.
- Corrige únicamente cortes incómodos en el hero, “Sobre mí”, áreas de práctica, modalidad y contacto.
- Mantiene juntas expresiones breves que no deben separarse, como “de la Universidad”, “con obligaciones” o “del proceso”.
- Utiliza cortes editoriales controlados en escritorio y recupera el flujo natural del texto en celulares.
- La versión 1.11 anterior queda descartada por modificar en exceso la redacción y el ritmo visual.

## Mejoras heredadas de la versión 1.10

- El arco decorativo de “Sobre mí” queda limitado exclusivamente a la mitad izquierda de la sección, donde antes estaba el título.
- El recurso se desvanece al acercarse a los límites superior e inferior y no invade el contenido profesional.
- La geometría conserva solamente un tramo de arco: no dibuja círculos completos, bordes ni elementos superpuestos.
- En tabletas y celulares se oculta cuando la sección pasa a una sola columna.

## Mejoras heredadas de la versión 1.9

- Se eliminaron todos los círculos completos del fondo de “Sobre mí”.
- Se conserva un único arco amplio y tenue, integrado directamente al color de la sección.
- El arco queda recortado por el contenedor y se desvanece progresivamente hacia ambos laterales.
- No se añadieron brillos, sombras, tarjetas ni elementos superpuestos.

## Mejoras heredadas de la versión 1.8

- Se eliminó la tarjeta oscura que contenía el gráfico de “Sobre mí”.
- El recurso abstracto ahora forma parte directa del fondo claro de toda la sección.
- Los anillos, brillos y ondas utilizan tonos lavanda de muy baja opacidad para integrarse con `--paper-warm`.
- Se eliminaron bordes, esquinas, sombras e interacción hover del recurso gráfico.
- La decoración queda detrás del contenido y se desactiva en celulares para preservar claridad y rendimiento.

## Mejoras heredadas de la versión 1.7

- En escritorio, el título de “Áreas de práctica” queda fijado en dos renglones: “Asesoramiento enfocado” y “en cada situación.”.
- Las siglas de las seis tarjetas fueron reemplazadas por iconos vectoriales propios y diferentes para procesos ejecutivos, familia, divorcios, sucesiones, jubilaciones y contratos.
- “Sobre mí” incorpora una decoración abstracta realizada íntegramente con CSS, sin fotografías ni archivos visuales adicionales.
- El botón principal del hero continúa sin incorporar un logotipo de WhatsApp.

## Mejoras heredadas de la versión 1.6

- “El estudio” se reemplazó por “Sobre mí” tanto en la navegación móvil como en la de escritorio.
- El título “Una práctica cercana para comprender y decidir con claridad” se eliminó completamente del sitio.
- El acceso inferior del hero ahora utiliza el texto neutral “Conocer más”.
- La composición de escritorio conserva dos columnas: identificación de la sección a la izquierda y presentación profesional a la derecha.

## Mejoras heredadas de la versión 1.5

- En celulares, el hero se distribuye en tres renglones exactos: “Asesoramiento legal”, “claro, humano” y “y personalizado.”.
- El bloque “Sobre mí” se compactó para evitar espacios innecesarios.
- En móvil, “Tu consulta,” queda en el primer renglón y “en tres pasos simples.” en el segundo.
- El hero y la modalidad conservan los renglones específicos únicamente en móvil.

## Mejoras heredadas de la versión 1.4

- Se corrigió el desbordamiento del título principal en celulares.
- Se recalibró la escala de todos los encabezados móviles para conservar jerarquía sin perder contenido.
- Se mejoró la distribución del perfil, credenciales, tarjetas de servicios, modalidad y contacto entre 320 y 640 px.
- Las tarjetas usan mejor el ancho disponible y reducen espacios innecesarios.
- El correo electrónico y los textos largos ahora se adaptan de forma segura a pantallas pequeñas.
- Se compactaron espaciados y ritmos verticales para una presentación móvil más prolija y profesional.

## Mejoras heredadas de la versión 1.3

- Se retiró por completo la fotografía de Rebeca del encabezado principal.
- Se eliminaron las referencias a esa imagen en HTML, Open Graph, datos estructurados, CSS y JavaScript.
- El hero se reorganizó como una composición tipográfica amplia, sin dejar un espacio vacío ni utilizar una imagen sustituta.
- Se conserva la identidad visual, los canales de contacto y el comportamiento responsive de la versión anterior.

## Mejoras heredadas de la versión 1.2

- Eliminación del WhatsApp flotante hasta 767 px para impedir superposiciones; permanecen los accesos directos dentro del contenido.
- Tipografías auxiliares, descripciones, datos de contacto y enlaces ampliados para mejorar la lectura móvil.
- Espaciados móviles revisados para reducir vacíos innecesarios entre secciones.
- Bloques de modalidad y contacto compactados sin perder jerarquía visual.
- Dirección, teléfono, correo, Instagram y LinkedIn permanecen visibles en móvil.
- ServicioTech sustituye la marca repetida del pie y ocupa un botón propio, claro y táctil.
- Contenido siempre visible en capturas móviles largas; se conservan las animaciones del hero, menú y controles.

## Mejoras heredadas de la versión 1.1

- Ritmo tipográfico y legibilidad refinados.
- Transiciones más suaves y progresivas, con la mecánica aprobada de escala `1.01` durante `0.4s ease-in-out` en tarjetas destacadas.
- Aparición escalonada del menú móvil, tarjetas de servicios y bloques de contenido.
- Indicador de progreso de lectura y navegación activa por sección.
- Crédito de ServicioTech transformado en un botón visible, sin repetir la navegación en el pie.

## Estructura

```text
Web_RebecaGirotti/
├── index.html
├── privacidad.html
├── 404.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
├── assets/
│   ├── images/
│   └── icons/
├── tests/
│   └── check-site.mjs
├── favicon.ico
├── browserconfig.xml
├── site.webmanifest
├── robots.txt
├── sitemap.xml
└── README.md
```

## Ejecutar localmente

No abras `index.html` con doble clic para la revisión final. Levantá un servidor estático desde la carpeta del proyecto:

```bash
python -m http.server 8080
```

Después abrí `http://localhost:8080`.

En Windows también podés usar:

```powershell
py -m http.server 8080
```

## Verificaciones automáticas

Con Node.js 20 o superior:

```bash
node --test tests/check-site.mjs
node --check js/main.js
```

## Publicar en GitHub Pages

1. Crear un repositorio y subir el contenido de `Web_RebecaGirotti` a la rama principal.
2. En **Settings → Pages**, elegir **Deploy from a branch**.
3. Seleccionar la rama principal y la carpeta raíz.
4. Cuando el dominio esté listo, agregar un archivo `CNAME` con `www.abogadarebecagirotti.com.ar` y configurar los registros DNS indicados por GitHub.

## Publicar en Cloudflare Pages

1. Vincular el repositorio desde **Workers & Pages → Create application → Pages**.
2. Elegir el repositorio.
3. No configurar comando de compilación.
4. Usar `/` como directorio de salida, dado que los archivos publicados están en la raíz del proyecto.
5. Asociar el dominio cuando el sitio haya sido revisado en producción.

## Supuestos y límites

- El dominio propuesto es `abogadarebecagirotti.com.ar`; conviene registrar también `estudiogirotti.com.ar` y redirigirlo al principal.
- No hay formulario ni backend: WhatsApp, teléfono y correo abren aplicaciones externas.
- No se simulan turnos ni confirmaciones. La coordinación se realiza de forma directa.
- La dirección se muestra como texto y no enlaza a Google Maps.
- No se incorporan analítica ni cookies propias. Si se agregan, debe actualizarse la información de privacidad.
- Antes de publicar, verificar la titularidad del dominio, la URL canónica y la fecha del contenido legal.

## Evolución recomendada

La siguiente fase puede incorporar, sin rehacer la interfaz, agenda con confirmación real, artículos jurídicos, panel de contenidos, analítica respetuosa de la privacidad, área privada y versión en inglés.
