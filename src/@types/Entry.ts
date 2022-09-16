import { Dayjs } from "dayjs";

export type Tag = {
  name: string;
  link?: string;
}

export type Entry = {
  id: string;
  title?: string;
  text?: string;
  eyecatch?: string;
  date?: string;
  tags: Tag[],
}
