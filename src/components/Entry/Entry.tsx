import * as entryStyle from "./entry.module.scss";
import * as eyecatchStyle from "./eyecatch.module.scss";
import React, { useState } from "react";
import { Entry } from "@/@types/Entry";
import dayjs from "dayjs";
import { calculateBehindDays } from "@/helpers/calculator";
import { useRouter } from "next/router";
import EntryContents from "@/components/Entry/EntryContents";

type Props = {
  isOpened: boolean,
  onClose: () => void,
  entry: Entry
};

const Entry: React.FC<Props> = ({ isOpened, onClose, entry }) => {
  const router = useRouter();
  const [ isExpandedEyecatch, setIsExpandedEyecatch ] = useState(false);

  const open = () => {
    setIsExpandedEyecatch(true)
    router.push(`#/monologue/${entry.id}/picture`);
  };
  const close = () => {
    setIsExpandedEyecatch(false);
    router.push(`#/monologue/${entry.id}`);
  };

  return <>
    <div className={`${entryStyle.entryContainer} ${isOpened ? '' : 'hidden'}`}>
      <div className={`${entryStyle.entryPrev} ${entryStyle.inactive}`}>
        <i className="fa-solid fa-chevron-left"></i>
      </div>
      <div className={entryStyle.entryBody}>
        <div className={entryStyle.entryEyecatch} style={{ backgroundImage: `url(${entry.eyecatch})` }}>
          <div className={entryStyle.entryEyecatchExpand} onClick={open}>
            <i className="fa-solid fa-expand"></i>
          </div>
          <div className={entryStyle.entryTitleInEyecatch}>
            {entry.title}
          </div>
          <div className={entryStyle.entryClose} onClick={onClose}>
            <i className={`fa-solid fa-close`}></i>
          </div>
        </div>
        <div className={entryStyle.divisor}></div>
        <div className={entryStyle.entryContents}>
          <div className={entryStyle.entryDateTime}>{dayjs(entry.date).format('ddd MMMM DD, YYYY')}</div>
          <ul className={entryStyle.entryTags}>
            {entry.tags.map((tag, key) => <li key={key}>#{tag.name}</li>)}
          </ul>
          <div className={entryStyle.entryText}>
            <EntryContents>
              {entry.text ?? ''}
            </EntryContents>
          </div>
        </div>
      </div>
      <div className={entryStyle.entryNext}><i className="fa-solid fa-chevron-right"></i></div>
      <div className={`${eyecatchStyle.eyecatchContainer} ${isExpandedEyecatch ? '' : 'hidden'}`} onClick={close}>
        <div className={eyecatchStyle.eyecatchContents} style={{ backgroundImage: `url(${entry.eyecatch})` }}>
          <div className={eyecatchStyle.eyecatchInfo}>
            <ul className={entryStyle.entryTags}>
              {entry.tags.map((tag, key) => <li key={key}>#{tag.name}</li>)}
              <li>{calculateBehindDays(dayjs(), dayjs(entry.date))}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </>
}

export default Entry;
