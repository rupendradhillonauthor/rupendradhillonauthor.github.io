import type { ImageMetadata } from "astro";

export interface PublicationPost {
  id: string;
  url: string;
  title: string;
  date: Date;

  category?: string;
  tags: string[];
  excerpt?: string;

  coverImage?: ImageMetadata;
}