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

  const coverMap = {
    "plano": def.features.find(f => f.includes("Cubierta"))?.match(/\d+\s*cm/)?.[0] + "." || "10cm.",
    "a aguas": (def.features.find(f => f.includes("Cubierta"))?.match(/\d+\s*cm/)?.[0] || "15cm") + " con teja asfáltica."
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
