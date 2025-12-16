export enum SectionId {
  HOME = 'home',
  ABOUT = 'about',
  LISTINGS = 'listings',
  TESTIMONIALS = 'testimonials',
  CONTACT = 'contact'
}

export interface NavItem {
  label: string;
  id: SectionId;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}