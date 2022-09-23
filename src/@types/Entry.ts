import { TagsOnEntries } from "@/@types/TagsOnEntries";
import { Pager } from "@/@types/Pager";
import { Nullable } from "@/@types/Nullable";
import { Dayjs } from "dayjs";

export type Entry = {
  id: number;
  title?: string;
  text?: string;
  eyecatch?: string;
  publishedAt?: Dayjs;
  tags?: TagsOnEntries[],
  pager?: Pager,
}

export type NullableEntry = Nullable<Entry>;
