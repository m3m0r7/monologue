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

type Props = {
  isOpened: boolean,
  isOpenedEyecatch: boolean,
  onClose: () => void,
  entry: Entry
};

const Entry: React.FC<Props> = ({ isOpened, isOpenedEyecatch, onClose, entry }) => {
  const router = useRouter();

  const open = () => {
    router.push(`#/monologue/${entry.id}/picture`);
  };
  const close = () => {
    router.push(`#/monologue/${entry.id}`);
  };

  const prev = () => {
    if (!entry.pager.prev) {
      return;
    }
    router.push(`#/monologue/${entry.pager.prev}`);
  }

  const next = () => {
    if (!entry.pager.next) {
      return;
    }
    router.push(`#/monologue/${entry.pager.next}`);
  }

  useEscCancellation(() => {
    if (!isOpened || isOpenedEyecatch) {
      return;
    }
    onClose();
  }, [isOpened, isOpenedEyecatch]);

  return <>
    <div className={`${entryStyle.entryContainer} ${isOpened ? '' : 'hidden'}`}>
      <div className={`${entryStyle.entryPrev} ${entry.pager?.prev ? '' : entryStyle.inactive}`} onClick={prev}>
        <i className="fa-solid fa-chevron-left"></i>
      </div>

      <div className={entryStyle.entryBodyContainer}>
        <div className={entryStyle.entryClose} onClick={onClose}>
          <i className={`fa-solid fa-close`}></i>
        </div>
        <div className={entryStyle.entryBody}>
          <div className={entryStyle.entryEyecatch} style={{ backgroundImage: `url(${entry.eyecatch})` }}>
            <div className={entryStyle.entryEyecatchExpand} onClick={open}>
              <i className="fa-solid fa-expand"></i>
            </div>
          </div>
          <div className={entryStyle.divisor}></div>
          <div className={entryStyle.entryContents}>
            <div className={entryStyle.entryTitle}>{entry.title}</div>
            <time className={entryStyle.entryDateTime}>{dayjs(entry.date).format('ddd MMMM DD, YYYY')}</time>
            <ul className={entryStyle.entryTags}>
              {(entry.tags ?? []).map((tag, key) => <li key={key}>#{tag.name}</li>)}
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
      <ZoomImage
        tags={[
          ...(entry.tags ?? []).map((tag) => ({ ...tag, name: `#${tag.name}`})),
          { name: calculateBehindDays(dayjs(), dayjs(entry.date)) }
        ]}
        imagePath={entry.eyecatch}
        isOpened={isOpenedEyecatch}
        onClose={close}
      />
    </div>
  </>
}

export default Entry;
