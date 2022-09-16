import * as galleryStyle from "./gallery.module.scss";
import React from "react";
import dayjs from "dayjs";
import { Entry } from "@/@types/Entry";
import { calculateBehindDays } from "@/helpers/calculator";
import { useRouter } from "next/router";

type Props = {
  onOpen: () => void;
  entry: Entry;
}

const GalleryItem: React.FC<Props> = ({ onOpen, entry }) => {
  const diff = parseInt(dayjs().format('D')) - parseInt(dayjs(entry.date).format('D'));
  return <div className={galleryStyle.galleryItem} style={{ backgroundImage: `url(${entry.eyecatch})` }} onClick={onOpen}>
    <div className={galleryStyle.galleryPostDatetime}>
      {calculateBehindDays(dayjs(), dayjs(entry.date))}
    </div>
    <div className={galleryStyle.galleryTitle}>{entry.title}</div>
  </div>
}

export default GalleryItem;
