export interface Banner {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  link: string;
  isVisible: boolean;
  position: number;
  ctaText?: string;
  ctaLink?: string;
  bgColor?: string;
  accentColor?: string;
  discount?: number;
}
