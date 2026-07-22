import { RatioAnalysis, FrameSizeRecommendation } from '../types';

// Greatest Common Divisor
export function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
}

// Calculate Gear Ratio, Skid Patches, and Analysis
export function calculateRatioAnalysis(chainring: number, cog: number): RatioAnalysis {
  const g = gcd(chainring, cog);
  const simplifiedS = chainring / g;
  const simplifiedC = cog / g;

  const ratio = parseFloat((chainring / cog).toFixed(2));
  
  // Skid Patches logic
  const skidPatchesOneFoot = simplifiedC;
  const skidPatchesBothFeet = (simplifiedS % 2 !== 0) ? simplifiedC * 2 : simplifiedC;

  // Wheel circumference 700x25c approx 2.105 meters
  const wheelCircumferenceM = 2.105;
  const developmentMeters = parseFloat((ratio * wheelCircumferenceM).toFixed(2));

  // Speed at 90 RPM
  // Speed = (Development * RPM * 60) / 1000 km/h
  const speedAt90RpmKmH = parseFloat(((developmentMeters * 90 * 60) / 1000).toFixed(1));

  let classification: 'Muy Blanda' | 'Versátil / Equilibrada' | 'Dura' | 'Rompepiernas';
  let colorClass = 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30';
  let badgeText = '🟢 Ideal Subidas Muros';
  let recommendation = '';

  if (ratio < 2.5) {
    classification = 'Muy Blanda';
    colorClass = 'text-emerald-400 bg-emerald-950/50 border-emerald-500/40';
    badgeText = '🟢 Trepadora Muros Exótica';
    recommendation = '¡Mecánica pura de escalada! Excelente para afrontar inclinaciones pesadas de más del 12% como Romeral, Letras o el muro de Patios sin reventar las rodillas.';
  } else if (ratio <= 2.9) {
    classification = 'Versátil / Equilibrada';
    colorClass = 'text-amber-400 bg-amber-950/50 border-amber-500/40';
    badgeText = '🟡 La Relación Bogotana Ideal';
    recommendation = '¡Relación de la casa! Mantiene buena cadencia en la sabana de Bogotá y permite coronar Patios o La Vega al Vino con fluidez y potencia.';
  } else if (ratio <= 3.2) {
    classification = 'Dura';
    colorClass = 'text-orange-400 bg-orange-950/50 border-orange-500/40';
    badgeText = '🟠 Velocista Urbano';
    recommendation = 'Buena para darle candela por la NQS, la 26 o la Séptima. En subidas pronunciadas (>10%) requerirá mucho torque y esfuerzo.';
  } else {
    classification = 'Rompepiernas';
    colorClass = 'text-red-400 bg-red-950/50 border-red-500/40';
    badgeText = '🔴 Pista / Velódromo Solo';
    recommendation = 'Exclusiva para velódromo o criterios en plano. ¡Precaución! Para la topografía de Bogotá con esta relación vas a trancar duro las piernas en cualquier rampa.';
  }

  return {
    chainring,
    cog,
    ratio,
    skidPatchesOneFoot,
    skidPatchesBothFeet,
    developmentMeters,
    classification,
    colorClass,
    badgeText,
    speedAt90RpmKmH,
    recommendation,
  };
}

// Inseam Size Calculation
export function calculateFrameSize(inseamCm: number): FrameSizeRecommendation {
  const suggestedSizeCm = parseFloat((inseamCm * 0.68).toFixed(1));

  let suggestedLabel: 'XXS' | 'XS' | 'S' | 'M' | 'L' | 'XL';
  let description = '';

  if (suggestedSizeCm < 49) {
    suggestedLabel = 'XXS';
    description = 'Talla compacta ultra reactiva. Geometría ágil para estaturas entre 1.50m - 1.58m.';
  } else if (suggestedSizeCm < 51) {
    suggestedLabel = 'XS';
    description = 'Talla ágil urbana. Ideal para ciclistas entre 1.58m - 1.65m.';
  } else if (suggestedSizeCm < 53) {
    suggestedLabel = 'S';
    description = 'Talla versátil de pista urbana. Perfecta para estaturas entre 1.65m - 1.72m.';
  } else if (suggestedSizeCm < 55) {
    suggestedLabel = 'M';
    description = 'Talla estándar Bogofija. La más cotizada para estaturas entre 1.72m - 1.79m.';
  } else if (suggestedSizeCm < 57) {
    suggestedLabel = 'L';
    description = 'Talla amplia de largo recorrido. Para ciclistas de 1.79m - 1.86m.';
  } else {
    suggestedLabel = 'XL';
    description = 'Talla alta de gran rigidez. Para estaturas superiores a 1.86m.';
  }

  return {
    inseamCm,
    suggestedSizeCm,
    suggestedLabel,
    description,
  };
}

// Generate WhatsApp order URL
export function generateWhatsAppLink(cartText: string): string {
  const phone = '573000000000'; // Bogofija official hotline placeholder or direct link
  const encoded = encodeURIComponent(`¡Hola BOGOFIJA! 🚴‍♂️ Vengo desde BogoBot AI con la siguiente consulta/pedido:\n\n${cartText}`);
  return `https://wa.me/${phone}?text=${encoded}`;
}
