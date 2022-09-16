import React from "react";
import * as navigatorStyle from "./navigator.module.scss";
import * as actionStyle from "./actions.module.scss";

type Props = {};

const Entry: React.FC<Props> = (props) => {
  return <div className={navigatorStyle.navigator}>
    <div className={navigatorStyle.headerContainer}>
      <div className={navigatorStyle.myIconContainer}><a className={navigatorStyle.myIcon} href="https://i.mem.ooo" target="_blank"></a></div>
      <h1>{process.env.NEXT_PUBLIC_WEB_TITLE}</h1>
    </div>
    <div className={actionStyle.actions}>
      <div className={actionStyle.actionContainer}>
        <div className={actionStyle.actionContainerLabel}>Sort</div>
        <div className={actionStyle.actionContainerContents}>
          <span>Recently</span>
          <div className={actionStyle.actionContainerContentsSelection}>
            <ul>
              <li>Recently</li>
              <li>Oldest</li>
              <li>Popular</li>
            </ul>
          </div>
        </div>
      </div>
      <div className={actionStyle.actionContainer}>
        <div className={actionStyle.searchBoxContainer}>
          <input type="text" className={actionStyle.searchBox} placeholder="Search..." />
        </div>
      </div>
    </div>
  </div>

}

export default Entry
