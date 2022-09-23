import { Entry } from "@/@types/Entry";
import { Tag } from "@/@types/Tag";
import { Nullable } from "@/@types/Nullable";

export type TagsOnEntries = {
  entry?: Entry,
  tag: Tag
}

export type NullableTagsOnEntries = Nullable<TagsOnEntries>
