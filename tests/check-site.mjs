import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const read = (path) => readFile(new URL(path, root), "utf8");

test("incluye la estructura principal y contenido real", async () => {
  const html = await read("index.html");
  for (const id of ["inicio", "estudio", "servicios", "modalidad", "contacto"]) {
    assert.match(html, new RegExp(`id=["']${id}["']`));
  }
  assert.match(html, /T° XII F° 302 CADJM/);
  assert.match(html, /Necochea 244, Chivilcoy/);
});

test("no publica una fotografía de Rebeca", async () => {
  const html = await read("index.html");
  const css = await read("css/styles.css");
  const js = await read("js/main.js");
  assert.doesNotMatch(html, /rebeca-girotti\.webp|data-portrait|portrait-wrap|<figure\b/i);
  assert.doesNotMatch(css, /portrait-wrap|portrait-arch/i);
  assert.doesNotMatch(js, /data-portrait|const portrait/i);
});

test("protege la composición y los textos en pantallas móviles", async () => {
  const css = await read("css/styles.css");
  assert.match(css, /@media \(max-width: 640px\)[\s\S]*?\.hero-title\s*\{[\s\S]*?font-size:\s*clamp\(1\.5rem, 8vw, 2\.1rem\)/);
  assert.match(css, /\.service-card\s*>\s*div\s*\{\s*min-width:\s*0/);
  assert.match(css, /\.contact-list a,[\s\S]*?overflow-wrap:\s*anywhere/);
  assert.match(css, /@media \(max-width: 380px\)/);
});

test("aplica la redacción solicitada y conserva los saltos móviles", async () => {
  const html = await read("index.html");
  const css = await read("css/styles.css");
  assert.match(html, /class="hero-title-line">Asesoramiento legal<\/span>/);
  assert.match(html, /class="hero-title-line">claro, humano<\/span>/);
  assert.match(html, /class="hero-title-line">y personalizado\.<\/span>/);
  assert.match(html, /data-nav-link>Sobre mí<\/a>/);
  assert.match(html, /data-menu-link><span>01<\/span>Sobre mí<\/a>/);
  assert.match(html, /class="eyebrow" id="about-label">Sobre mí<\/p>/);
  assert.doesNotMatch(html, /Una práctica cercana para comprender y decidir con claridad/);
  assert.doesNotMatch(html, />El estudio<\/a>/);
  assert.match(html, /class="process-title-line">Tu consulta,<\/span>[\s\S]*?class="process-title-line">en tres pasos simples\.<\/span>/);
  assert.match(css, /\.hero-title-line,[\s\S]*?\.process-title-line\s*\{[\s\S]*?white-space:\s*nowrap/);
  assert.doesNotMatch(css, /\.mobile-copy|\.desktop-copy/);
});

test("mejora los cortes editoriales sin rediseñar ni reescribir el sitio", async () => {
  const html = await read("index.html");
  const css = await read("css/styles.css");
  assert.match(html, /Acompañamiento jurídico presencial en Chivilcoy y consultas virtuales,<\/span>/);
  assert.match(html, /Cada consulta comienza por escuchar la situación,<\/span>/);
  assert.match(html, /Escribí por WhatsApp para solicitar una consulta\.<\/span>/);
  assert.match(html, /de&nbsp;la&nbsp;Universidad de Lomas de Zamora/);
  assert.match(css, /\.editorial-line\s*\{[\s\S]*?display:\s*block/);
  assert.match(css, /@media \(max-width: 640px\)[\s\S]*?\.editorial-line\s*\{[\s\S]*?display:\s*inline/);
  assert.match(css, /p,[\s\S]*?li,[\s\S]*?dd\s*\{[\s\S]*?text-wrap:\s*pretty/);
  assert.doesNotMatch(html, /Tu situación merece ser escuchada/);
  assert.match(html, /El primer paso es conversar sobre tu situación\./);
});

test("presenta el título de práctica en dos renglones de escritorio", async () => {
  const html = await read("index.html");
  const css = await read("css/styles.css");
  assert.match(html, /class="practice-title-line">Asesoramiento enfocado<\/span>/);
  assert.match(html, /class="practice-title-line">en cada situación\.<\/span>/);
  assert.match(css, /@media \(min-width: 821px\)[\s\S]*?\.practice-title-line\s*\{[\s\S]*?display:\s*block[\s\S]*?white-space:\s*nowrap/);
});

test("usa seis iconos vectoriales distintos y un arco limitado a la mitad izquierda", async () => {
  const html = await read("index.html");
  const css = await read("css/styles.css");
  assert.equal((html.match(/class="service-icon"/g) ?? []).length, 6);
  assert.equal((html.match(/class="service-icon"[\s\S]*?<svg viewBox="0 0 24 24"/g) ?? []).length, 6);
  assert.doesNotMatch(html, /class="service-code"|>PE<|>FA<|>DI<|>SU<|>JU<|>CO</);
  assert.doesNotMatch(html, /about-graphic/);
  assert.doesNotMatch(css, /\.about-graphic/);
  assert.doesNotMatch(css, /\.about::before/);
  const aboutArc = css.match(/\.about::after\s*\{([^}]*)\}/)?.[1] ?? "";
  assert.match(aboutArc, /inset:\s*0 50% 0 0/);
  assert.match(aboutArc, /radial-gradient\([\s\S]*?ellipse 94% 74% at -12% 50%/);
  assert.match(aboutArc, /mask-image:\s*linear-gradient\(180deg, transparent 0%, #000 18%, #000 82%, transparent 100%\)/);
  assert.doesNotMatch(aboutArc, /border|border-radius|box-shadow/);
  assert.match(css, /@media \(max-width: 820px\)[\s\S]*?\.about::after\s*\{\s*display:\s*none/);
});

test("usa contacto directo y no contiene formulario", async () => {
  const html = await read("index.html");
  assert.match(html, /wa\.me\/542346533826/);
  assert.match(html, /mailto:rebecagirottiabogada@gmail\.com/);
  assert.doesNotMatch(html, /<form\b/i);
});

test("mantiene el footer sin navegación duplicada y acredita a ServicioTech", async () => {
  const html = await read("index.html");
  const footer = html.match(/<footer[\s\S]*?<\/footer>/i)?.[0] ?? "";
  assert.doesNotMatch(footer, /<nav\b/i);
  assert.doesNotMatch(footer, /class="footer-name"/);
  assert.match(footer, /https:\/\/tomasgenaro\.github\.io\/ServicioTechWeb\//);
  assert.match(footer, /class="servicetech-credit"/);
});

test("oculta el acceso flotante en móvil y conserva el CTA directo", async () => {
  const html = await read("index.html");
  const css = await read("css/styles.css");
  assert.match(css, /@media \(max-width: 767px\)[\s\S]*?\.whatsapp-float\s*\{[\s\S]*?display:\s*none/);
  assert.match(html, /class="button button-white"[\s\S]*?wa\.me\/542346533826/);
});

test("mantiene visibles todos los datos de contacto", async () => {
  const html = await read("index.html");
  assert.match(html, /Necochea 244, Chivilcoy/);
  assert.match(html, /instagram\.com\/abogadarebecagirotti/);
  assert.match(html, /linkedin\.com\/in\/rebeca-girotti-a81581283/);
});

test("incluye SEO técnico y datos estructurados", async () => {
  const html = await read("index.html");
  assert.match(html, /rel="canonical"/);
  assert.match(html, /property="og:title"/);
  assert.match(html, /application\/ld\+json/);
  assert.match(await read("robots.txt"), /sitemap\.xml/i);
  assert.match(await read("sitemap.xml"), /abogadarebecagirotti\.com\.ar/);
});

test("respeta accesibilidad y reducción de movimiento", async () => {
  const html = await read("index.html");
  const css = await read("css/styles.css");
  assert.match(html, /class="skip-link"/);
  assert.match(html, /aria-controls="mobile-menu"/);
  assert.match(css, /:focus-visible/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
});

test("los recursos locales referenciados existen", async () => {
  const html = await read("index.html");
  const matches = [...html.matchAll(/(?:src|href)="((?:assets|css|js)\/[^"]+)"/g)].map((match) => match[1]);
  assert.ok(matches.length > 5);
  for (const resource of new Set(matches)) {
    const info = await stat(new URL(resource, root));
    assert.ok(info.isFile(), `${resource} debe ser un archivo`);
  }
});

test("no contiene enlaces vacíos ni marcadores ficticios", async () => {
  const html = await read("index.html");
  assert.doesNotMatch(html, /href=["']\s*["']/i);
  assert.doesNotMatch(html, /lorem ipsum|testimonio|cliente 1|placeholder/i);
});
