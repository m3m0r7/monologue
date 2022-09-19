import { Dayjs } from "dayjs";
import { Tag } from "@/@types/Tag";

export type Entry = {
  id: string;
  title?: string;
  text?: string;
  eyecatch?: string;
  date?: string;
  tags?: Tag[],
  pager?: {
    next?: string,
    prev?: string,
  },
}
