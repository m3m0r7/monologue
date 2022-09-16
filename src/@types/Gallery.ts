import { Tag } from "@/@types/Entry";

export type Gallery = {
  title?: string;
  text?: string;
  eyecatch?: string;
  date?: string;
  tags: Tag[],
}
