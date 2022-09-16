import * as layouts from "@/css/layouts.module.scss";
import React, { useState } from "react";

const Index = () => {
  const [isOpened, setIsOpened] = useState(false);
  const openBlogDialog = () => {
    setIsOpened(true);
  };
  const closeBlogDialog = () => {
    setIsOpened(false);
  };

  return <>
    <div className={layouts.navigator}>
      <div className={layouts.headerContainer}>
        <div className={layouts.myIconContainer}><a className={layouts.myIcon} href="https://i.mem.ooo" target="_blank"></a></div>
        <h1>{process.env.NEXT_PUBLIC_WEB_TITLE}</h1>
      </div>
      <div className={layouts.actions}>
        <div className={layouts.actionContainer}>
          <div className={layouts.actionContainerLabel}>Sort</div>
          <div className={layouts.actionContainerContents}>
            <span>Recently</span>
            <div className={layouts.actionContainerContentsSelection}>
              <ul>
                <li>Recently</li>
                <li>Oldest</li>
                <li>Popular</li>
              </ul>
            </div>
          </div>
        </div>
        <div className={layouts.actionContainer}>
          <div className={layouts.searchBoxContainer}>
            <input type="text" className={layouts.searchBox} placeholder="Search..." />
          </div>
        </div>
      </div>
    </div>
    <div className={layouts.galleriesContainer}>
      <div className={layouts.galleryDateOfMonth}>September, 2022</div>
      <div className={layouts.galleries}>
        {  (new Array(100)).fill(undefined, 0, 100).map((_, key) => {
          return <React.Fragment key={key}>
            <div className={`${layouts.galleryItem}`} style={{ backgroundImage: "url(/images/dummy/cat.jpg)" }} onClick={openBlogDialog}>
              <div className={layouts.galleryPostDatetime}>2022-02-01</div>
              <div className={layouts.galleryTitle}>タイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトル</div>
            </div>
            <div className={layouts.galleryItem} style={{ backgroundImage: "url(/images/dummy/memory.png)" }} onClick={openBlogDialog}>
              <div className={layouts.galleryPostDatetime}>2022-02-01</div>
              <div className={layouts.galleryTitle}>タイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトル</div>
            </div>
          </React.Fragment>
        }) }
      </div>
    </div>
    <div className={`${layouts.blogContainer} ${isOpened ? '' : 'hidden'}`}>
      <div className={`${layouts.blogPrev} ${layouts.inactive}`}><i className="fa-solid fa-chevron-left"></i></div>
      <div className={layouts.blogBody}>
        <div className={layouts.blogEyecatch} style={{ backgroundImage: "url(/images/dummy/cat.jpg)" }}>
          <div className={layouts.blogTitleInEyecatch}>
            タイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトル
          </div>
          <div className={layouts.blogClose} onClick={closeBlogDialog}>
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
      <div className={layouts.blogNext}><i className="fa-solid fa-chevron-right"></i></div>
    </div>
  </>
}

export default Index
