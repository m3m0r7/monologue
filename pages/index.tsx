import React from "react";
import Header from "@/components/Header/Header";
import GalleryContainer from "@/components/Gallery/GalleryContainer";
import { Entry as EntryType } from "@/@types/Entry";
import GalleryItemWithEntry from "@/components/Gallery/GalleryItemWithEntry";

export default () => {

  // dummy entry
  const entry: EntryType = {
    id: '1234',
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
