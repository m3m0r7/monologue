import * as entryStyle from "./entry.module.scss";
import * as eyecatchStyle from "./eyecatch.module.scss";
import React, { useEffect, useState } from "react";
import { Entry } from "@/@types/Entry";
import dayjs from "dayjs";
import { calculateBehindDays } from "@/helpers/calculator";
import { useRouter } from "next/router";
import EntryContents from "@/components/Entry/EntryContents";
import { useURLParameter } from "@/hooks/useURLParameter";
import { useEscCancellation } from "@/hooks/useEscCancellation";
import ZoomImage from "@/components/Image/ZoomImage";
import { Tag } from "@/@types/Tag";
import { useSession } from "next-auth/react";
import { gql } from "apollo-server-micro";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import Editor from "@/components/Editor/Editor";
import Dialog from "@/components/Dialog/Dialog";

type Props = {
  isOpened: boolean,
  isOpenedEyecatch: boolean,
  entry: Entry
};

const GET_ENTRY = gql`
  query GetEntries($id: Int!) {
    getEntry(id: $id) {
      id
      title
      text
      eyecatch
      publishedAt
      pager {
        next
        prev
      }
      tags {
        tag {
          id
          name
        }
      }
    }
  }
`;

const DELETE_ENTRIES = gql`
  mutation DeleteEntries($entryIds: [Int!]!) {
    deleteEntries(entryIds: $entryIds)
  }
`

const Entry: React.FC<Props> = ({ isOpened, isOpenedEyecatch, entry }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [deleteEntries] = useMutation<boolean>(DELETE_ENTRIES);
  const [getEntry] = useLazyQuery<Entry[]>(GET_ENTRY);
  const { isMonologue, isNew, isEdit, id } = useURLParameter();
  const [ dialog, setDialog ] = useState<Record<string, boolean>>({});

  useEffect(() => {
    (async () => {
      const { data, error } = await getEntry({
        variables: {
          id: entry.id,
        },
      });
    })();
  }, [entry]);

  const closeEntryDialog = () => {
    return router.push(`/`, undefined, { shallow: true });
  };

  const expandEyecatch = () => {
    router.push(`#/monologue/${entry.id}/picture`, undefined, { shallow: true });
  };

  const openEdit = () => {
    router.push(`#/monologue/${entry.id}/edit`, undefined, { shallow: true });
  }

  const close = () => {
    router.push(`#/monologue/${entry.id}`, undefined, { shallow: true });
  };

  const prev = () => {
    if (!entry.pager?.prev) {
      return;
    }
    router.push(`#/monologue/${entry.pager.prev}`, undefined, { shallow: true });
  }

  const next = () => {
    if (!entry.pager?.next) {
      return;
    }
    router.push(`#/monologue/${entry.pager.next}`, undefined, { shallow: true });
  }

  const deleteEntry = () => {
    (async () => {
      const result = await deleteEntries({
          variables: {
            entryIds: [entry.id],
          }
        });

      setDialog({ ...dialog, delete: true });
    })();
  }

  const closeDeleteDialog = () => {
    setDialog({ ...dialog, delete: false });
    closeEntryDialog();
  }

  const openTag = (tag: Tag) => {
    router.push(`#/tag/${tag.name}`, undefined, { shallow: true });
  }

  useEscCancellation(() => {
    if (isEdit || !isOpened || isOpenedEyecatch) {
      return;
    }
    closeEntryDialog();
  }, [isEdit, isOpened, isOpenedEyecatch]);

  return <>
    <div className={`${entryStyle.entryContainer} ${isOpened ? '' : 'hidden'}`}>
      <div className={`${entryStyle.entryPrev} ${entry.pager?.prev ? '' : entryStyle.inactive}`} onClick={prev}>
        <i className="fa-solid fa-chevron-left"></i>
      </div>

      <div className={entryStyle.entryBodyContainer}>
        <div className={entryStyle.entryClose} onClick={closeEntryDialog}>
          <i className={`fa-solid fa-close`}></i>
        </div>
        <div className={entryStyle.entryBody}>
          <div className={entryStyle.entryEyecatch} style={{ backgroundImage: `url(${entry.eyecatch})` }}>
            <div className={entryStyle.entryActions}>
              <div onClick={expandEyecatch}>
                <i className="fa-solid fa-expand"></i>
              </div>
              {session && <div onClick={openEdit}>
                <i className="fa-solid fa-pen-to-square"></i>
              </div>}
              {session && <div onClick={deleteEntry}>
                <i className="fa-solid fa-trash"></i>
              </div>}
            </div>
          </div>
          <div className={entryStyle.divisor}></div>
          <div className={entryStyle.entryContents}>
            <div className={entryStyle.entryTitle}>{entry.title}</div>
            <time className={entryStyle.entryDateTime}>{dayjs(entry.publishedAt).format('ddd MMMM DD, YYYY')}</time>
            <ul className={entryStyle.entryTags}>
              {(entry.tags ?? []).map((tag) => <li key={tag.tag.id} onClick={() => openTag(tag.tag)}>#{tag.tag.name}</li>)}
            </ul>
            <div className={entryStyle.entryText}>
              <EntryContents>
                {entry.text ?? ''}
              </EntryContents>
            </div>
          </div>
        </div>
      </div>

      <div className={`${entryStyle.entryNext} ${entry.pager?.next ? '' : entryStyle.inactive}`} onClick={next}>
        <i className="fa-solid fa-chevron-right"></i>
      </div>
    </div>
    <ZoomImage
      tags={[
        ...(entry.tags ?? []).map<Tag>((tag) => ({ ...tag.tag, name: `#${tag.tag.name}`})),
        { name: calculateBehindDays(dayjs(), dayjs(entry.publishedAt)) }
      ]}
      imagePath={entry.eyecatch}
      isOpened={isOpenedEyecatch}
      onClose={close}
    />

    <Editor entry={entry} isOpened={entry.id === id && isEdit} />

    <Dialog isOpened={dialog.delete} type="success" title="Edit" onClose={closeDeleteDialog}>
      An entry was deleted.
    </Dialog>
  </>
}

export default Entry;
