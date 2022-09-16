import React from "react";
import * as editor from "./editor.module.scss"
import * as entryStyle from "@/components/Entry/entry.module.scss";
import dayjs from "dayjs";
import EntryContents from "@/components/Entry/EntryContents";
import * as eyecatchStyle from "@/components/Entry/eyecatch.module.scss";
import { calculateBehindDays } from "@/helpers/calculator";

type Props = {
}

const Editor: React.FC<Props> = () => {
  return <div className={`${entryStyle.entryContainer}`}>

      <div className={entryStyle.entryBody}>
        <div className={entryStyle.entryEyecatch}>
          <div className={entryStyle.entryClose} onClick={() => {}}>
            <i className={`fa-solid fa-close`}></i>
          </div>
        </div>
        <div className={entryStyle.divisor}></div>
        <div className={entryStyle.entryContents}>
          <div className={entryStyle.entryTitle}>
            <input type="text" placeholder="Enter a title..." className={editor.entryTitleInput} />
          </div>
          <time className={entryStyle.entryDateTime}>{dayjs().format('ddd MMMM DD, YYYY')}</time>
          <ul className={entryStyle.entryTags}>
            <li>#Choose a tag</li>
          </ul>
          <div className={entryStyle.entryText}>

          </div>
        </div>
      </div>
    </div>
}

export default Editor;
