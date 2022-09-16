import * as layouts from "@/css/layouts.module.scss";
import React, { useState } from "react";
import Entry from "@/components/Entry/Entry";

const Index = () => {
  const [isOpened, setIsOpened] = useState(false);
  const openEntryDialog = () => {
    setIsOpened(true);
  };
  const closeEntryDialog = () => {
    setIsOpened(false);
  };

  // dummy entry
  const entry: Entry = {
    eyecatch: '/images/dummy/cat.jpg',
    title: 'タイトルタイトルタイトルタイトルタイトルタイトル',
    date: '2022-09-01',
    text: "#markdown\n*test*\n_test_",
    tags: [
      { name: "ねこ" },
      { name: "ノスタルジー" }
    ],
  }

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
        {  (new Array(10)).fill(undefined, 0, 100).map((_, key) => {
          return <React.Fragment key={key}>
            <div className={`${layouts.galleryItem}`} style={{ backgroundImage: "url(/images/dummy/cat.jpg)" }} onClick={openEntryDialog}>
              <div className={layouts.galleryPostDatetime}>2022-02-01</div>
              <div className={layouts.galleryTitle}>タイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトル</div>
            </div>
            <div className={layouts.galleryItem} style={{ backgroundImage: "url(/images/dummy/memory.png)" }} onClick={openEntryDialog}>
              <div className={layouts.galleryPostDatetime}>2022-02-01</div>
              <div className={layouts.galleryTitle}>タイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトル</div>
            </div>
          </React.Fragment>
        }) }
      </div>
    </div>

    <Entry isOpened={isOpened} onClose={closeEntryDialog} entry={entry} />

    <footer>
      &copy; {process.env.NEXT_PUBLIC_WEB_TITLE}
    </footer>
  </>
}

export default Index
