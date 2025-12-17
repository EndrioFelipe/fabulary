import { AgeRange } from "../enums/age-range";

export interface Book {
  id: number;
  title: string;
  content?: string;
  authorName: string;
  ageRange: AgeRange;
  language?: string;
  status: 'DRAFT' | 'PUBLISHED';
  cover: File | null;
  value: number;
}