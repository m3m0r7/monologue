import { Dayjs } from "dayjs";
import { Tag } from "@/@types/Tag";
import { TagsOnEntries } from "@/@types/TagsOnEntries";

export type Entry = {
  id: number;
  title: string;
  text: string;
  eyecatch?: string;
  publishedAt: number;
  tags?: TagsOnEntries[],
  pager?: {
    next?: string,
    prev?: string,
  },
}
