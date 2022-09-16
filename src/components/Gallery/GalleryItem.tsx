import * as galleryStyle from "./gallaery.module.scss";
import React from "react";
import dayjs from "dayjs";
import { Entry } from "@/@types/Entry";

type Props = {
  onOpen: () => void;
  entry: Entry;
}

const GalleryItem: React.FC<Props> = ({ onOpen, entry }) => {
  return <div className={galleryStyle.galleryItem} style={{ backgroundImage: `url(${entry.eyecatch})` }} onClick={onOpen}>
    <div className={galleryStyle.galleryPostDatetime}>{dayjs(entry.date).format('YYYY-MM-DD')}</div>
    <div className={galleryStyle.galleryTitle}>{entry.title}</div>
  </div>
}

export default GalleryItem;
