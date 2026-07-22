export interface Product {
  id: string;
  name: string;
  category: 'marco' | 'jersey' | 'componente' | 'accesorio';
  price: number; // in COP
  image: string;
  badge?: string;
  description: string;
  colors?: string[];
  sizes?: string[];
  specs?: string[];
}

export interface CartItem {
  product: Product;
  selectedColor?: string;
  selectedSize?: string;
  quantity: number;
}

export interface ClimbRoute {
  id: string;
  name: string;
  distanceKm: number;
  maxGradient: number;
  avgGradient: number;
  elevationGainM: number;
  location: string;
  difficulty: 'Fácil' | 'Media' | 'Alta' | 'Extrema' | 'Leyenda';
  recommendedRatioMax: number;
  description: string;
  bogoTip: string;
  bgGradient: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface RatioAnalysis {
  chainring: number;
  cog: number;
  ratio: number;
  skidPatchesOneFoot: number;
  skidPatchesBothFeet: number;
  developmentMeters: number;
  classification: 'Muy Blanda' | 'Versátil / Equilibrada' | 'Dura' | 'Rompepiernas';
  colorClass: string;
  badgeText: string;
  speedAt90RpmKmH: number;
  recommendation: string;
}

export interface FrameSizeRecommendation {
  inseamCm: number;
  suggestedSizeCm: number;
  suggestedLabel: 'XXS' | 'XS' | 'S' | 'M' | 'L' | 'XL';
  description: string;
}
