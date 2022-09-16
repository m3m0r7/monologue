import * as layouts from "@/css/layouts.module.scss";
import React from "react";

const Index = () => {
  return <>
    <div className={layouts.navigator}>
      <ul>
        <li><a href="https://i.mem.ooo/" target="_blank"><i className={`fa-solid fa-user ${layouts.faGradient}`}></i></a></li>
      </ul>
      <div className={layouts.actions}>
        <div className={layouts.actionSort}>
          <span className={layouts.actionSortLabel}>Sort</span> <div className={layouts.actionSortDirection}>Recently</div>
        </div>
      </div>
    </div>
    <div className={layouts.galleriesContainer}>
      <div className={layouts.galleryDateOfMonth}>September, 2022</div>
      <div className={layouts.galleries}>
        {  (new Array(100)).fill(undefined, 0, 100).map((_, key) => {
          return <React.Fragment key={key}>
            <div className={layouts.galleryItem} style={{ backgroundImage: "url(/images/dummy/cat.jpg)" }}>
              <div className={layouts.galleryPostAuthor}>めもりー</div>
              <div className={layouts.galleryPostDatetime}>2022-02-01</div>
              <div className={layouts.galleryTitle}>タイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトル</div>
            </div>
            <div className={layouts.galleryItem} style={{ backgroundImage: "url(/images/dummy/memory.png)" }}>
              <div className={layouts.galleryPostAuthor}>めもりー</div>
              <div className={layouts.galleryPostDatetime}>2022-02-01</div>
              <div className={layouts.galleryTitle}>タイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトル</div>
            </div>
          </React.Fragment>
        }) }
      </div>
    </div>
    <div className={`${layouts.blogContainer} hidden`}>
      <div className={layouts.blogBody}>
        <div className={layouts.blogEyecatch} style={{ backgroundImage: "url(/images/dummy/cat.jpg)" }}>
          <div className={layouts.blogTitleInEyecatch}>
            タイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトル
          </div>
          <div className={layouts.blogClose}>
            <i className={`fa-solid fa-close`}></i>
          </div>
        </div>
        <div className={layouts.divisor}></div>
        <div className={layouts.blogContents}>
          <div className={layouts.blogDateTime}>2022-02-01</div>
          <div className={layouts.blogText}>
            タイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトル
          </div>
        </div>
      </div>
    </div>
  </>
}

export default Index
