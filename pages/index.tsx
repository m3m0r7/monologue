import React, { useState } from "react";
import Header from "@/components/Header/Header";
import GalleryContainer from "@/components/Gallery/GalleryContainer";
import GalleryItem from "@/components/Gallery/GalleryItem";
import { Entry as EntryType } from "@/@types/Entry";
import Entry from "@/components/Entry/Entry";

const Index = () => {
  const [isOpened, setIsOpened] = useState(false);
  const openEntryDialog = () => {
    setIsOpened(true);
  };
  const closeEntryDialog = () => {
    setIsOpened(false);
  };

  // dummy entry
  const entry: EntryType = {
    eyecatch: '/images/dummy/cat.jpg',
    title: 'タイトルタイトルタイトルタイトルタイトルタイトル',
    date: '2022-09-01',
    text: "#markdown\n*test*\n_test_",
    tags: [
      { name: "ねこ" },
      { name: "ノスタルジー" }
    ],
  }

  return <>
    <Header />
    <GalleryContainer>
      {  (new Array(10)).fill(undefined, 0, 100).map((_, key) => <GalleryItem key={key} onOpen={openEntryDialog} entry={entry} /> )}
    </GalleryContainer>
    <Entry isOpened={isOpened} onClose={closeEntryDialog} entry={entry} />
    <footer>
      &copy; {process.env.NEXT_PUBLIC_WEB_TITLE}
    </footer>
  </>
}

export default Index
