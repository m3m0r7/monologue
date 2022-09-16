import React, { useState } from "react";
import { Entry as EntryType } from "@/@types/Entry";
import GalleryItem from "@/components/Gallery/GalleryItem";
import Entry from "@/components/Entry/Entry";
import * as galleryStyle from "./gallaery.module.scss";

type Props = {
  entry: EntryType;
}

const GalleryItemWithEntry: React.FC<Props> = ({ entry }) => {
  const [isOpened, setIsOpened] = useState(false);
  const openEntryDialog = () => {
    setIsOpened(true);
  };
  const closeEntryDialog = () => {
    setIsOpened(false);
  };

  return <div className={galleryStyle.galleryItemContainer}>
    <GalleryItem onOpen={openEntryDialog} entry={entry} />
    <Entry isOpened={isOpened} onClose={closeEntryDialog} entry={entry} />
  </div>
}

export default GalleryItemWithEntry;
