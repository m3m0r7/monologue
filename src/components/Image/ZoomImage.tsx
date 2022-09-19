import React from "react";
import * as zoomImageStyle from "@/components/Image/zoomImage.module.scss";
import * as entryStyle from "@/components/Entry/entry.module.scss";
import { calculateBehindDays } from "@/helpers/calculator";
import dayjs from "dayjs";
import { Entry } from "@/@types/Entry";
import { Tag } from "@/@types/Tag";
import { useEscCancellation } from "@/hooks/useEscCancellation";
import { Schema } from "yaml/types";

type Props = {
  tags?: Partial<Tag>[],
  imagePath?: string,
  isOpened: boolean,
  onClose: () => void,
};

const ZoomImage: React.FC<Props> = ({ tags, imagePath, isOpened, onClose }) => {

  useEscCancellation(() => {
    if (!isOpened) {
      return;
    }
    onClose();
  }, [isOpened])

  return <div className={`${zoomImageStyle.zoomImageContainer} ${isOpened ? '' : 'hidden'}`} onClick={onClose}>
    <div className={zoomImageStyle.zoomImageContents} style={{ backgroundImage: `url(${imagePath})` }}>
      <div className={zoomImageStyle.zoomImageInfo}>
        { tags && <ul className={zoomImageStyle.imageTags}>
          {tags.map((tag, key) => <li key={key}>{tag.name}</li>)}
        </ul> }
      </div>
    </div>
  </div>
}

export default ZoomImage
