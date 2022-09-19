import React from "react";
import Header from "@/components/Header/Header";
import GalleryContainer from "@/components/Gallery/GalleryContainer";
import { Entry, Entry as EntryType } from "@/@types/Entry";
import GalleryItemWithEntry from "@/components/Gallery/GalleryItemWithEntry";
import entry from "@/components/Entry/Entry";
import Footer from "@/components/Footer/Footer";
import Editor from "@/components/Editor/Editor";
import SignIn from "@/components/SignIn/SignIn";
import Dialog from "@/components/Dialog/Dialog";
import { useQuery } from "@apollo/client";
import { gql } from "apollo-server-micro";

const GET_ENTRIES = gql`
  query {
    getEntries {
      id,
      title,
      text,
      eyecatch,
      publishedAt,
      tags {
        id,
        name,
      },
    }
  }
`;

export default () => {
  const { loading, error, data } = useQuery<{ getEntries: Entry[] } | undefined>(GET_ENTRIES);

//   console.log(data);
//
//   // dummy entry
//   const basedEntry: EntryType = {
//     id: '1234',
//     eyecatch: '/images/dummy/cat.jpg',
//     title: 'タイトルタイトルタイトルタイトルタイトルタイトル',
//     date: '2022-09-05',
//     pager: {
//       next: '1235',
//     },
//     text: `
//
//     A paragraph with *emphasis* and **strong importance**.
//
// > A block quote with ~strikethrough~ and a URL: https://reactjs.org.
//
// * Lists
// * [ ] todo
// * [x] done
//
// A table:
//
// | a | b |
// | - | - |
//
// \`vvvv\`
//
// \`\`\`php
// <?php
//
// echo "Hello World!";
// \`\`\`
//
// **a** _b_
//
// ![image](/images/icons/memory.png)
//
//     `,
//     tags: [
//       { name: "ねこ" },
//       { name: "ノスタルジー" }
//     ],
//   }
//
//   const entries = (new Array(10))
//     .fill(undefined, 0, 100)
//     .map((_, key) => ({ ...basedEntry, id: `${parseInt(basedEntry.id) + key}`, pager: { prev: `${parseInt(basedEntry.id) + key - 1}`, next: `${parseInt(basedEntry.id) + key + 1}` } }));

  return <>
    <Header />
    <GalleryContainer date="2022-09">
      { (data?.getEntries ?? []).map((entry: Entry) => <GalleryItemWithEntry key={entry.id} entry={entry} /> )}
    </GalleryContainer>
    <SignIn />
    <Editor />
    <Footer />
  </>
}
