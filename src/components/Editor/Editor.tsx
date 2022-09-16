import React, { useState } from "react";
import * as editor from "./editor.module.scss"
import * as entryStyle from "@/components/Entry/entry.module.scss";
import dayjs from "dayjs";
import EntryContents from "@/components/Entry/EntryContents";

type Props = {
}

const Editor: React.FC<Props> = () => {
  const [tab, setTab] = useState<'plain' | 'preview'>('plain');
  const [text, setText] = useState('');

  const write = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    e.currentTarget.style.height = 'auto';
    e.currentTarget.style.height = e.currentTarget.scrollHeight + 'px';

    setText(e.currentTarget.value);
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
          <li onClick={() => setTab('plain')}>
            <span className={`${editor.tabLabel} ${tab === 'plain' ? editor.tabActive : ''}`}>Plain Text</span>
          </li>
          <li onClick={() => setTab('preview')}>
            <span className={`${editor.tabLabel} ${tab === 'preview' ? editor.tabActive : ''}`}>Preview</span>
          </li>
        </ul>

        {tab === 'plain' && <div className={entryStyle.entryText}>
          <textarea className={editor.entryTextInput} placeholder="Enter text..." onKeyUp={write}>{text}</textarea>
        </div>}

        {tab === 'preview' && <div className={entryStyle.entryText}>
          <EntryContents>{text}</EntryContents>
        </div>}
      </div>
    </div>
  </div>
}

export default Editor;
