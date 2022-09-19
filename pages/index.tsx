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
      id
      title
      text
      eyecatch
      publishedAt
      tags {
        tag {
            id
            name
        }
      }
    }
  }
`;

export default () => {
  const { loading, error, data } = useQuery<{ getEntries: Entry[] } | undefined>(GET_ENTRIES);

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
