import React, { useState } from "react";
import { Entry as EntryType } from "@/@types/Entry";
import GalleryItem from "@/components/Gallery/GalleryItem";
import Entry from "../Entry/Entry";

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

  return <>
    <GalleryItem onOpen={openEntryDialog} entry={entry} />
    <Entry isOpened={isOpened} onClose={closeEntryDialog} entry={entry} />
  </>
}

export default GalleryItemWithEntry;
