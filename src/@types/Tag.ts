import { Nullable } from "@/@types/Nullable";

export type Tag = {
  id: number;
  name: string;
  link?: string;
}

export type NullableTag = Nullable<Tag>
