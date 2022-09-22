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
import { ConditionalEntries } from "@/@types/resolvers-types";
import { searchAtom } from "@/contexts/Atom";
import { useAtom } from "jotai";
import dayjs, { Dayjs } from "dayjs";
import { useURLParameter } from "@/hooks/useURLParameter";
import { useRouter } from "next/router";

const GET_ENTRIES = gql`
  query GetEntries($conditionalEntries: ConditionalEntries) {
    getEntries(conditionalEntries: $conditionalEntries) {
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

type GalleryList = Record<string, Entry[]>

export default () => {
  const router = useRouter();
  const { tagName } = useURLParameter();
  const [conditionalEntries, setConditionalEntries] = useAtom(searchAtom);
  const [ loadEntries ] = useLazyQuery<{ getEntries: Entry[] } | undefined>(GET_ENTRIES, {
    variables: {
      conditionalEntries,
    }
  });
  const [entries, setEntries] = useState<GalleryList>({});
  const [openEditor, setOpenEditor] = useState(false);
  const { isNew } = useURLParameter();
  useEffect(() => {
    setOpenEditor(isNew);
  }, [isNew]);

  useEffect(() => {
    if (!tagName) {
      return;
    }

    setConditionalEntries({
      ...conditionalEntries,
      tags: [tagName],
    });
  }, [tagName])

  /**
   * The routing will re-render entry components then it will break fade-in animations.
   * This useEffect is avoiding some components re-rendering.
   */
  useEffect(() => {
    (async () => {
      const result = await loadEntries();
      const galleryList: GalleryList = {};
      result.data?.getEntries.map((entry) => {
        const publishedAt = dayjs(entry.publishedAt);
        galleryList[publishedAt.format('YYYY-MM')] = [
          ...(galleryList[publishedAt.format('YYYY-MM')] ?? []),
          entry
        ];
      });
      setEntries(galleryList);
    })();
  }, [conditionalEntries, router.asPath]);

  const hasEntry = Object.keys(entries).length > 0;

  return <>
    <Header />
    { !hasEntry && <div className="noEntries">
      Oops! entries not found. Try to change search conditions or let's try to write an entry firstly :)
    </div> }
    { Object.keys(entries).map((date) => {
      return <GalleryContainer date={date} key={date}>
        { entries[date].map((entry) => <GalleryItemWithEntry key={entry.id} entry={entry} /> )}
      </GalleryContainer>
    }) }
    <Editor isOpened={openEditor} />
    <SignIn />
    <Footer />
  </>
}
