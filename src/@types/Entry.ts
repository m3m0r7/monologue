import { Dayjs } from "dayjs";

export type Tag = {
  name: string;
  link: string;
}

export type Entry = {
  title?: string;
  text?: string;
  eyecatch?: string;
  date?: string;
  tags: Tag[],
}
