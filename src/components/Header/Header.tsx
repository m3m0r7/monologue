import React from "react";
import * as navigatorStyle from "./navigator.module.scss";
import * as actionStyle from "./actions.module.scss";
import { useAtom } from "jotai";
import { sortAtom } from "@/contexts/Atom";

type Props = {};

const SORT_TYPES = [
  { name: "Recently" },
  { name: "Oldest" },
  { name: "Popular" },
];

const Entry: React.FC<Props> = (props) => {
  const [ sortIndex, setSortIndex ] = useAtom(sortAtom);

  return <div className={navigatorStyle.navigator}>
    <div className={navigatorStyle.headerContainer}>
      <div className={navigatorStyle.myIconContainer}><a className={navigatorStyle.myIcon} href="https://i.mem.ooo" target="_blank"></a></div>
      <h1>{process.env.NEXT_PUBLIC_WEB_TITLE}</h1>
    </div>
    <div className={actionStyle.actions}>
      <div className={actionStyle.actionContainer}>
        <div className={actionStyle.actionContainerLabel}>Sort</div>
        <div className={actionStyle.actionContainerContents}>
          <span>{ SORT_TYPES[sortIndex].name }</span>
          <div className={actionStyle.actionContainerContentsSelection}>
            <ul>
              {SORT_TYPES.map((sortType, key) => <li key={key} onClick={() => setSortIndex(key)}>{sortType.name}</li>)}
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
