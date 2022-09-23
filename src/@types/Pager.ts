import { Nullable } from "@/@types/Nullable";
import { TagsOnEntries } from "@/@types/TagsOnEntries";

export type Pager = {
  next?: number,
  prev?: number,
}

export type NullablePager = Nullable<Pager>
