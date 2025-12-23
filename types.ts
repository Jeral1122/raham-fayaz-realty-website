export enum SectionId {
  HOME = 'home',
  ABOUT = 'about',
  LISTINGS = 'listings',
  TESTIMONIALS = 'testimonials',
  CONTACT = 'contact',
  LEAVE_REVIEW = 'leave-review'
}

export interface NavItem {
  label: string;
  id: SectionId;
}

export interface Review {
  id: string | number;
  name: string;
  role: string;
  quote: string;
  image: string;
  rating: number;
  title?: string;
  date: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}