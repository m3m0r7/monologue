import React, { useEffect, useRef, useState } from "react";
import Header from "@/components/Header/Header";
import GalleryContainer from "@/components/Gallery/GalleryContainer";
import { Entry, Entry as EntryType } from "@/@types/Entry";
import GalleryItemWithEntry from "@/components/Gallery/GalleryItemWithEntry";
import entry from "@/components/Entry/Entry";
import Footer from "@/components/Footer/Footer";
import Editor from "@/components/Editor/Editor";
import SignIn from "@/components/SignIn/SignIn";
import Dialog from "@/components/Dialog/Dialog";
import { useLazyQuery, useQuery } from "@apollo/client";
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
  const [ loadEntries ] = useLazyQuery<{ getEntries: Entry[] } | undefined>(GET_ENTRIES);
  const [entries, setEntries] = useState<Entry[]>([]);

  /**
   * The routing will re-render entry components then it will break fade-in animations.
   * This useEffect is avoiding some components re-rendering.
   */
  useEffect(() => {
    (async () => {
      const result = await loadEntries();
      setEntries(result.data?.getEntries ?? []);
    })();
  }, []);

  return <>
    <Header />
    <GalleryContainer date="2022-09">
      { entries.map((entry: Entry) => <GalleryItemWithEntry key={entry.id} entry={entry} /> )}
    </GalleryContainer>
    <SignIn />
    <Editor />
    <Footer />
  </>
}
