import React from "react";

type Props = {
}

const Footer: React.FC<Props> = () => {
  return <footer>
    &copy; {process.env.NEXT_PUBLIC_WEB_TITLE}
  </footer>
}

export default Footer
