import React, { useEffect, useState } from "react";
import { Entry as EntryType } from "@/@types/Entry";
import GalleryItem from "@/components/Gallery/GalleryItem";
import Entry from "@/components/Entry/Entry";
import * as galleryStyle from "./gallery.module.scss";
import { useRouter } from "next/router";
import { useURLParameter } from "@/hooks/useURLParameter";

type Props = {
  entry: EntryType;
}

const GalleryItemWithEntry: React.FC<Props> = ({ entry }) => {
  const router = useRouter();
  const { id, isMonologue, isEyecatch } = useURLParameter();
  const [ opened, setOpened ] = useState({ entry: false, eyecatch: false });

  const openEntryDialog = () => {
    router.push(`#/monologue/${entry.id}`, undefined, { shallow: true });
  };
  return <div className={galleryStyle.galleryItemContainer}>
    <GalleryItem onOpen={openEntryDialog} entry={entry} />
    <Entry entry={entry} />
  </div>
}

export default GalleryItemWithEntry;
