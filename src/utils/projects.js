/**
 * Resolver de proyectos — transforma el JSON simplificado al formato
 * que esperan los componentes Astro (Cards, [code].astro, etc.)
 */

import data from "../data/proyectos.json";

const { precioM2, defaults, projects } = data;

function formatPrice(n) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function generateDescription(bed, bath) {
  const bathText = bath === 1
    ? "1 baño completo"
    : `${bath} baños completos`;
  
  if (bed <= 2) {
    return `${bed} dormitorios, ${bathText}, living/cocina/comedor.`;
  }
  return `${bed} dormitorios, ${bathText}, living/cocina/comedor y lavadero.`;
}

function resolveProject(proj) {
  const def = defaults[proj.type];
  if (!def) throw new Error(`Unknown project type: ${proj.type}`);

  const roof = proj.roof || "plano";
  const priceKey = proj.type;
  const priceTable = precioM2[priceKey];
  const pricePerM2 = priceTable[roof] || priceTable["plano"];
  const price = proj.size * pricePerM2;

  const coverCm = def.features.find(f => f.includes("Cubierta"))?.match(/\d+\s*cm/)?.[0];
  const coverMap = {
    "plano": `${coverCm || "10cm"}.`,
    "a aguas": `${coverCm || "15cm"} con teja asfáltica.`,
  };

  return {
    category: def.category,
    line: def.line,
    system: def.system,
    code: proj.code,
    imgAlt: `Proyecto ${proj.code} — ${proj.size}m² ${def.line}`,
    price: formatPrice(price),
    size: String(proj.size),
    bedrooms: String(proj.bed),
    bathrooms: String(proj.bath),
    roof,
    description: generateDescription(proj.bed, proj.bath),
    estimated: String(proj.est),
    cover: coverMap[roof] || coverMap["plano"],
    features: def.features,
    front: proj.front || "",
    extras: proj.extras || "",
    images: Array.from({ length: proj.imgs }, (_, i) => i + 1),
  };
}

// Resolver todos los proyectos agrupados por tipo
const allResolved = projects.map(resolveProject);

export const premium = allResolved.filter(p => p.category === "sf-premium");
export const executivePlus = allResolved.filter(p => p.category === "sf-exeplus");
export const basic = allResolved.filter(p => p.category === "sf-basic");
export const isopanel = allResolved.filter(p => p.category === "iso-basic");
export const isopanelExeplus = allResolved.filter(p => p.category === "iso-exeplus");
export const isopanelPremium = allResolved.filter(p => p.category === "iso-premium");

// Todos en un array plano (para [code].astro)
export const allProducts = allResolved;

// Tabla de precios por m² y formateador, para que otros componentes no dupliquen los valores
export { precioM2, formatPrice };

// ── Sistemas y líneas: rutas /steelframing/<linea> y /isopanel/<linea> ──
export const SYSTEMS = {
  steelframing: { slug: "steelframing", name: "Steel Framing", prefix: "sf" },
  isopanel: { slug: "isopanel", name: "Isopanel", prefix: "iso" },
};

export const LINES = [
  { slug: "basica", name: "Básica", key: "basic" },
  { slug: "ejecutiva-plus", name: "Ejecutiva Plus", key: "exeplus" },
  { slug: "premium", name: "Premium", key: "premium" },
];

export function lineHref(systemSlug, lineSlug) {
  return `/${systemSlug}/${lineSlug}`;
}

// Proyectos de un sistema y una línea, p. ej. projectsFor("isopanel", "premium")
export function projectsFor(systemSlug, lineSlug) {
  const system = SYSTEMS[systemSlug];
  const line = LINES.find((l) => l.slug === lineSlug);
  if (!system || !line) return [];
  return allResolved.filter((p) => p.category === `${system.prefix}-${line.key}`);
}

// Página de la línea a la que pertenece una categoría ("sf-premium" → "/steelframing/premium")
export function categoryHref(category) {
  const [prefix, key] = category.split("-");
  const system = Object.values(SYSTEMS).find((s) => s.prefix === prefix);
  const line = LINES.find((l) => l.key === key);
  return system && line ? lineHref(system.slug, line.slug) : "/";
}

// Precio por m² "desde" (techo plano) de un sistema y línea, ya formateado
export function priceFromFor(systemSlug, lineSlug) {
  const system = SYSTEMS[systemSlug];
  const line = LINES.find((l) => l.slug === lineSlug);
  const table = system && line ? precioM2[`${system.prefix}_${line.key}`] : null;
  return table ? formatPrice(table.plano) : null;
}
