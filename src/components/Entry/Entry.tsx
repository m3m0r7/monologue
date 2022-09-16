import * as layouts from "@/css/layouts.module.scss";
import React from "react";
import { Entry } from "@/@types/Entry";
import dayjs from "dayjs";

type Props = {
  isOpened: boolean,
  onClose: () => void,
  entry: Entry
};

const Entry = ({ isOpened, onClose, entry }: Props) => {
  return <div className={`${layouts.entryContainer} ${isOpened ? '' : 'hidden'}`}>
      <div className={`${layouts.entryPrev} ${layouts.inactive}`}><i className="fa-solid fa-chevron-left"></i></div>
      <div className={layouts.entryBody}>
        <div className={layouts.entryEyecatch} style={{ backgroundImage: `url(${entry.eyecatch})` }}>
          <div className={layouts.entryEyecatchExpand}><i className="fa-solid fa-expand"></i></div>
          <div className={layouts.entryTitleInEyecatch}>
            {entry.title}
          </div>
          <div className={layouts.entryClose} onClick={onClose}>
            <i className={`fa-solid fa-close`}></i>
          </div>
        </div>
        <div className={layouts.divisor}></div>
        <div className={layouts.entryContents}>
          <div className={layouts.entryDateTime}>{dayjs(entry.date).format('YYYY-MM-DD')}</div>
          <ul className={layouts.entryTags}>
            {entry.tags.map((tag, key) => <li key={key}>#{tag.name}</li>)}
          </ul>
          <div className={layouts.entryText}>
            {entry.text}
          </div>
        </div>
      </div>
      <div className={layouts.entryNext}><i className="fa-solid fa-chevron-right"></i></div>
    </div>
}

export default Entry;
