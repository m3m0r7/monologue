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
import { Tag } from "@/@types/Tag";
import { useEscCancellation } from "@/hooks/useEscCancellation";
import { gql } from "apollo-server-micro";
import { useLazyQuery, useMutation } from "@apollo/client";
import { Entry } from "@/@types/Entry";

const ADD_ENTRY = gql`
  mutation AddEntry($title: String!, $text: String!, $eyecatch: String!, $tags: [TagInput!]!) {
    addEntry(title: $title, text: $text, eyecatch: $eyecatch, tags: $tags) {
      id
    }
  }
`

const UPDATE_ENTRY = gql`
  mutation UpdateEntry($id: Int!, $title: String!, $text: String!, $eyecatch: String!, $tags: [TagInput!]!) {
    updateEntry(id: $id, title: $title, text: $text, eyecatch: $eyecatch, tags: $tags) {
      id
    }
  }
`

type Props = {
  entry?: Entry,
  isOpened?: boolean
}

type DraftCookieType = {
  eyecatch: string | null,
  text: string,
  tags: string[],
  title: string,
}

const KEY_NAME = 'monologueDraft';

const Editor: React.FC<Props> = ({ entry, isOpened = false }) => {
  const [addEntry] = useMutation(ADD_ENTRY);
  const [updateEntry] = useMutation(UPDATE_ENTRY);

  const router = useRouter();
  const { isMonologue, isNew, isEdit, id } = useURLParameter();
  const [tab, setTab] = useState<'plain' | 'preview'>('plain');
  const { data: session } = useSession();
  const bodyContainerRef = useRef<HTMLDivElement>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [dragging, setDragging] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const [ dialog, setDialog ] = useState<Record<string, boolean>>({});
  const textRef = useRef<HTMLTextAreaElement | null>(null);
  const [ submitText, setSubmitText ] = useState('Publish');
  const [ publishedAt, setPublishedAt ] = useState<number | null>(null);

  useEffect(() => {
    if (!isOpened) {
      return;
    }
    if (entry?.id === id) {
      setSubmitText('Edit');
    }
    const keyName = `${KEY_NAME}${entry ? `.${entry.id}` : ''}`;
    const data: DraftCookieType = JSON.parse(localStorage.getItem(keyName) ?? '{}');
    if (titleRef.current) {
      titleRef.current.value = data.title ?? entry?.title ?? '';
    }
    if (textRef.current) {
      textRef.current.value = data.text ?? entry?.text ?? '';
    }
    setTags(data.tags ?? (entry?.tags ?? []).map((tag) => tag.tag.name));
    setImage(data.eyecatch ?? entry?.eyecatch ?? '');
    setPublishedAt(entry?.publishedAt ?? null);
  }, [isOpened])

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

    textRef.current!.value  = e.currentTarget.value;
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
    if (isEdit) {
      router.push(`#/monologue/${id}`, undefined, { shallow: true });
      return;
    }
    router.push(`/`, undefined, { shallow: true });
  };

  const removeTag = (index: number) => {
    setTags(tags.filter((_, tagIndex) => index !== tagIndex));
  }

  const uploadFileCallback = (callback: (image: string, file: File) => void, acceptedFiles: File[]) => {
    const reader = new FileReader();
    const selectedFile = acceptedFiles[0];
    if (!selectedFile) {
      return;
    }

    reader.onload = () => callback(reader.result as string, selectedFile);
    reader.readAsDataURL(selectedFile);
  }

  const uploadFile = (acceptedFiles: File[]) => {
    uploadFileCallback(
      (result) => setImage(result),
      acceptedFiles
    );
  }

  const uploadFileToEntry = (acceptedFiles: File[]) => {
    uploadFileCallback(
      (result, file) => {
        textRef.current!.value = `${textRef.current?.value ?? ''}\n![${file.name}](${result})`;
      },
      acceptedFiles
    );
  }

  const draft = () => {
    const keyName = `${KEY_NAME}${isEdit ? `.${id}` : ''}`;
    localStorage.setItem(keyName, JSON.stringify({
      eyecatch: image,
      text: textRef.current?.value ?? '',
      tags,
      title: titleRef.current?.value ?? '',
      publishedAt,
    }));

    setDialog({ ...dialog, draft: true });
  }

  const publish = () => {
    localStorage.removeItem(KEY_NAME);
    addEntry({
      variables: {
        title: titleRef.current?.value ?? '',
        text: textRef.current?.value ?? '',
        eyecatch: image,
        tags: tags.map((tag) => ({ name: tag })),
      }
    });

    setDialog({ ...dialog, published: true });
  }

  const edit = () => {
    const keyName = `${KEY_NAME}.${id}`;
    localStorage.removeItem(keyName);
    updateEntry({
      variables: {
        id: id,
        title: titleRef.current?.value ?? '',
        text: textRef.current?.value ?? '',
        eyecatch: image,
        tags: tags.map((tag) => ({ name: tag })),
      }
    });

    setDialog({ ...dialog, edit: true });
  }

  useEscCancellation(() => {
    if (!isOpened) {
      return;
    }
    close();
  }, [isOpened])

  return <>
    <div className={`${entryStyle.entryContainer} ${!isOpened ? 'hidden' : ''}`}>
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
            <time className={entryStyle.entryDateTime}>{dayjs(publishedAt ?? undefined).format('ddd MMMM DD, YYYY')}</time>
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

            <Dropzone
              onDrop={uploadFileToEntry}
              noClick
            >
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()} className={`${entryStyle.entryText} ${tab === 'plain' ? '' : entryStyle.entryTextHidden}`}>
                  <input {...getInputProps()} />
                  <textarea ref={textRef} className={editorStyle.entryTextInput} placeholder="Enter text..." onKeyDown={handle} onKeyUp={write}></textarea>
                </div>
              )}
            </Dropzone>

            <div className={`${entryStyle.entryText} ${tab === 'preview' ? '' : entryStyle.entryTextHidden}`}>
              <EntryContents>
                {textRef.current?.value ?? ''}
              </EntryContents>
            </div>
            <div className={editorStyle.actionButtons}>
              <button type="button" className={editorStyle.draftButtonContainer} onClick={draft}>
                <div>
                  <span>Draft</span>
                </div>
              </button>
              <button type="button" className={editorStyle.publishButtonContainer} onClick={isNew ? publish : edit}>
                <div className={editorStyle.publishButton}>
                  <span>{submitText}</span>
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
    <Dialog isOpened={dialog.published} type="success" title="Published" onClose={() => setDialog({ ...dialog, published: false })}>
      An entry was published.
    </Dialog>
    <Dialog isOpened={dialog.edit} type="success" title="Edit" onClose={() => setDialog({ ...dialog, edit: false })}>
      An entry was edit.
    </Dialog>
  </>
}

export default Editor;
