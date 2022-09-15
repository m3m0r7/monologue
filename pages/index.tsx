import * as layouts from "@/css/layouts.module.scss";

const Index = () => {
  return <>
    <div className={layouts.navigator}>
      <ul>
        <li><i className={`fa-solid fa-border-all ${layouts.faGradient}`}></i></li>
        <li><i className={`fa-solid fa-table-cells ${layouts.faGradient}`}></i></li>
      </ul>
    </div>
  </>
}

export default Index
