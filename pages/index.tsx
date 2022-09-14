import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBorderAll, faTableCells } from "@fortawesome/free-solid-svg-icons";
import * as layouts from "@/css/layouts.module.scss";


const Index = () => {
  return <>
    <div className={layouts.navigator}>
      <ul>
        <li><FontAwesomeIcon icon={faBorderAll} fontSize="32px"/></li>
        <li><FontAwesomeIcon icon={faTableCells} fontSize="32px" /></li>
      </ul>
    </div>
  </>
}

export default Index
