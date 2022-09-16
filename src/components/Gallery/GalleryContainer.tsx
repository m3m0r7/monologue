import * as galleryStyle from "./gallaery.module.scss";
import React, { FC, PropsWithChildren } from "react";
import GalleryItem from "@/components/Gallery/GalleryItem";
import { AppProps } from "next/app";
import dayjs from "dayjs";

type Props = {
  date: string;
}

const GalleryContainer: React.FC<PropsWithChildren<Props>> = ({ date, children }) => {
  return <div className={galleryStyle.galleriesContainer}>
    <div className={galleryStyle.galleryDateOfMonth}>{dayjs(date).format('MMMM, YYYY')}</div>
    <div className={galleryStyle.galleries}>
      {children}
    </div>
  </div>
}

export default GalleryContainer;
