import * as galleryStyle from "./gallery.module.scss";
import React from "react";
import dayjs from "dayjs";
import { Entry } from "@/@types/Entry";

type Props = {
  onOpen: () => void;
  entry: Entry;
}

const GalleryItem: React.FC<Props> = ({ onOpen, entry }) => {
  const diff = parseInt(dayjs().format('D')) - parseInt(dayjs(entry.date).format('D'));
  return <div className={galleryStyle.galleryItem} style={{ backgroundImage: `url(${entry.eyecatch})` }} onClick={onOpen}>
    <div className={galleryStyle.galleryPostDatetime}>
      {diff > 0
        ? `${diff} day${diff > 1 ? 's' : ''} ago`
        : `${Math.abs(diff)} day${Math.abs(diff) > 1 ? 's' : ''} after`
      }
    </div>
    <div className={galleryStyle.galleryTitle}>{entry.title}</div>
  </div>
}

export default GalleryItem;
