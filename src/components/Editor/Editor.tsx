import React from "react";
import * as editor from "./editor.module.scss"
import * as entryStyle from "@/components/Entry/entry.module.scss";
import dayjs from "dayjs";

type Props = {
}

const Editor: React.FC<Props> = () => {
  const autoHeight = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    e.currentTarget.style.height = 'auto';
    e.currentTarget.style.height = e.currentTarget.scrollHeight + 'px';
  }

  return <div className={`${entryStyle.entryContainer}`}>
    <div className={entryStyle.entryBody}>
      <div className={entryStyle.entryEyecatch}>
        <div className={editor.uploadableImage}>
          <i className={"fa-solid fa-image"}></i>
        </div>
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

        <ul className={editor.tabs}>
          <li>
            <span className={`${editor.tabLabel} ${editor.tabActive}`}>Plain Text</span>
          </li>
          <li>
            <span className={editor.tabLabel}>Preview</span>
          </li>
        </ul>

        <div className={entryStyle.entryText}>
          <textarea className={editor.entryTextInput} placeholder="Enter text..." onKeyUp={autoHeight}></textarea>
        </div>
      </div>
    </div>
  </div>
}

export default Editor;
