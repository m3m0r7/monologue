import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import * as editorStyle from "./editor.module.scss"
import * as entryStyle from "@/components/Entry/entry.module.scss";
import dayjs from "dayjs";
import EntryContents from "@/components/Entry/EntryContents";
import { useSession } from "next-auth/react";
import { useURLParameter } from "@/hooks/useURLParameter";
import { useRouter } from "next/router";
import Dropzone from "react-dropzone";
import { useCookies } from "react-cookie";
import Dialog from "@/components/Dialog/Dialog";

type Props = {
}

const COOKIE_NAME = 'monologue_draft';

const Editor: React.FC<Props> = () => {
  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies([COOKIE_NAME]);
  const { isMonologue, isNew } = useURLParameter();
  const [tab, setTab] = useState<'plain' | 'preview'>('plain');
  const [text, setText] = useState('');
  const { data: session } = useSession();
  const bodyContainerRef = useRef<HTMLDivElement>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [dragging, setDragging] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const [ dialog, setDialog ] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setShowDialog(!!session && (isMonologue && isNew));
  }, [session, isMonologue, isNew])

  const handle = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    /**
     * Replace entering tab to 4 spaces when writing an article.
     */
    if (e.key === 'Tab') {
      e.preventDefault();
      e.stopPropagation();

      e.currentTarget.value = e.currentTarget.value + '    ';
    }
  }

  const write = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Backspace') {
      e.currentTarget.style.height = 'auto';
    }
    e.currentTarget.style.height = e.currentTarget.scrollHeight + 'px';

    /**
     * Scroll to end of DOM because which is dynamically change by editing
     */
    bodyContainerRef.current?.scrollTo({ top: bodyContainerRef.current?.scrollHeight });

    setText(e.currentTarget.value);
  }

  const enterTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') {
      return;
    }
    if (e.currentTarget.value.replace(/\s*/, '') === '') {
      return;
    }
    setTags([ ...tags, e.currentTarget.value ]);
    e.currentTarget.value = '';
  }

  const close = () => {
    router.push(`/`);
  };

  const removeTag = (index: number) => {
    setTags(tags.filter((_, tagIndex) => index !== tagIndex));
  }

  const uploadFile = (acceptedFiles: File[]) => {
    const reader = new FileReader();
    const selectedFile = acceptedFiles[0];
    if (!selectedFile) {
      return;
    }

    reader.onload = () => setImage(reader.result as string);
    reader.readAsDataURL(selectedFile);
  }

  const draft = () =>{
    setCookie(COOKIE_NAME, {
      eyecatch: image,
      text,
      tags,
      title: titleRef.current?.value ?? '',
    }, {
      expires: dayjs().add(1, 'year').toDate(),
    });

    setDialog({ ...dialog, draft: true });
  }

  return <>
    <div className={`${entryStyle.entryContainer} ${!showDialog ? 'hidden' : ''}`}>
      <div className={entryStyle.entryBodyContainer}>
        <div className={entryStyle.entryClose} onClick={close}>
          <i className={`fa-solid fa-close`}></i>
        </div>
        <div ref={bodyContainerRef} className={entryStyle.entryBody}>
          <Dropzone
            onDrop={uploadFile}
            maxFiles={1}
            onDragEnter={(e) => setDragging(true)}
            onDragLeave={(e) => setDragging(false)}
          >
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()} className={`${entryStyle.entryEyecatch} ${dragging ? entryStyle.entryEyecatchDragging : ''}`}  style={image ? { backgroundImage: image ? `url(${image})` : '' } : {}}>
                <input {...getInputProps()} />
                <div className={editorStyle.uploadableImage}>
                  <i className={"fa-solid fa-image"}></i>
                </div>
              </div>)
            }
          </Dropzone>
          <div className={entryStyle.divisor}></div>
          <div className={entryStyle.entryContents}>
            <div className={entryStyle.entryTitle}>
              <input type="text" placeholder="Enter a title..." className={editorStyle.entryTitleInput} defaultValue="" ref={titleRef} />
            </div>
            <time className={entryStyle.entryDateTime}>{dayjs().format('ddd MMMM DD, YYYY')}</time>
            <ul className={entryStyle.entryTags}>
              {tags.map((tag: string, key) => <li key={key}>#{tag} <i className={`fa-solid fa-close`} onClick={() => removeTag(key)}></i></li>)}
              {/*<li>#Choose a tag</li>*/}
            </ul>
            <input type="text" defaultValue="" className={entryStyle.tagField} placeholder="Enter a tag name" onKeyUp={enterTag} />

            <ul className={editorStyle.tabs}>
              <li onClick={() => setTab('plain')}>
                <span className={`${editorStyle.tabLabel} ${tab === 'plain' ? editorStyle.tabActive : ''}`}>Plain Text</span>
              </li>
              <li onClick={() => setTab('preview')}>
                <span className={`${editorStyle.tabLabel} ${tab === 'preview' ? editorStyle.tabActive : ''}`}>Preview</span>
              </li>
            </ul>

            {tab === 'plain' && <div className={entryStyle.entryText}>
              <textarea className={editorStyle.entryTextInput} placeholder="Enter text..." onKeyDown={handle} onKeyUp={write} defaultValue={text}></textarea>
            </div>}

            {tab === 'preview' && <div className={entryStyle.entryText}>
              <EntryContents>{text}</EntryContents>
            </div>}
            <div className={editorStyle.actionButtons}>
              <button type="button" className={editorStyle.draftButtonContainer} onClick={draft}>
                <div className={editorStyle.draftButton}>
                  <span>Draft</span>
                </div>
              </button>
              <button type="button" className={editorStyle.publishButtonContainer}>
                <div className={editorStyle.publishButton}>
                  <span>Publish</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Dialog isOpened={dialog.draft} type="success" title="Saved" onClose={() => setDialog({ ...dialog, draft: false })}>
      A draft was saved.
    </Dialog>
  </>
}

export default Editor;
