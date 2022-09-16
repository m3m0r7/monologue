import * as galleryStyle from "./gallaery.module.scss";
import React, { FC, PropsWithChildren } from "react";
import GalleryItem from "@/components/Gallery/GalleryItem";
import { AppProps } from "next/app";

type Props = {}

const GalleryContainer: React.FC<PropsWithChildren<Props>> = ({ children }) => {
  return  <div className={galleryStyle.galleriesContainer}>
    <div className={galleryStyle.galleryDateOfMonth}>September, 2022</div>
    <div className={galleryStyle.galleries}>
      {children}
    </div>
  </div>
}

export default GalleryContainer;
