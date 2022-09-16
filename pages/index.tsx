import React, { useState } from "react";
import Header from "@/components/Header/Header";
import GalleryContainer from "@/components/Gallery/GalleryContainer";
import GalleryItem from "@/components/Gallery/GalleryItem";
import { Entry as EntryType } from "@/@types/Entry";
import Entry from "@/components/Entry/Entry";
import GalleryItemWithEntry from "@/components/Gallery/GalleryItemWithEntry";

const Index = () => {
  // dummy entry
  const entry: EntryType = {
    eyecatch: '/images/dummy/cat.jpg',
    title: 'タイトルタイトルタイトルタイトルタイトルタイトル',
    date: '2022-09-05',
    text: "#markdown\n*test*\n_test_",
    tags: [
      { name: "ねこ" },
      { name: "ノスタルジー" }
    ],
  }

  return <>
    <Header />
    <GalleryContainer date="2022-09">
      {  (new Array(10)).fill(undefined, 0, 100).map((_, key) => <GalleryItemWithEntry key={key} entry={entry} /> )}
    </GalleryContainer>
    <footer>
      &copy; {process.env.NEXT_PUBLIC_WEB_TITLE}
    </footer>
  </>
}

export default Index
