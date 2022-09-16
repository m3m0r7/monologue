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
  const { isMonologue } = useHash();

  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    setIsOpened(isMonologue);
  });

  const openEntryDialog = () => {
    setIsOpened(true);
    router.push(`#/monologue/${entry.id}`);
  };
  const closeEntryDialog = () => {
    setIsOpened(false);
    router.push(`/`);
  };

  return <div className={galleryStyle.galleryItemContainer}>
    <GalleryItem onOpen={openEntryDialog} entry={entry} />
    <Entry isOpened={isOpened} onClose={closeEntryDialog} entry={entry} />
  </div>
}

export default GalleryItemWithEntry;
