import { Dayjs } from "dayjs";
import { Tag } from "@/@types/Tag";

export type Entry = {
  id: number;
  title?: string;
  text?: string;
  eyecatch?: string;
  publishedAt?: string;
  tags?: Tag[],
  pager?: {
    next?: string,
    prev?: string,
  },
}
