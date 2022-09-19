import { Tag } from "@/@types/Tag";

export type Gallery = {
  title?: string;
  text?: string;
  eyecatch?: string;
  date?: string;
  tags: Tag[],
}
