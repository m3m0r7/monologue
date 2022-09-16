import React, { useEffect, useState } from "react";
import { Entry as EntryType } from "@/@types/Entry";
import GalleryItem from "@/components/Gallery/GalleryItem";
import Entry from "@/components/Entry/Entry";
import * as galleryStyle from "./gallery.module.scss";
import { useRouter } from "next/router";
import { useHash } from "@/hooks/useHash";

type Props = {
  entry: EntryType;
}

const GalleryItemWithEntry: React.FC<Props> = ({ entry }) => {
  const router = useRouter();
  const { id, isMonologue, isEyecatch } = useHash();
  const [ opened, setOpened ] = useState({ entry: false, eyecatch: false });

  useEffect(() => {
    setOpened({
      entry: isMonologue && id === entry.id,
      eyecatch: isEyecatch && id === entry.id,
    });
  }, [entry, isMonologue, isEyecatch, id]);

  const openEntryDialog = () => {
    router.push(`#/monologue/${entry.id}`);
  };
  const closeEntryDialog = () => {
    router.push(`/`);
  };

  return <div className={galleryStyle.galleryItemContainer}>
    <GalleryItem onOpen={openEntryDialog} entry={entry} />
    <Entry
      isOpened={opened.entry}
      onClose={closeEntryDialog}
      entry={entry}
      isOpenedEyecatch={opened.eyecatch} />
  </div>
}

export default GalleryItemWithEntry;
