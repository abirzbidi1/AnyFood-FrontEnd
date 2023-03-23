import { useState } from "react";

export default function UseOpenSidebar() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const handleOpen = () => {
    setOpenSidebar(true);
  };

  const handleClose = () => {
    setOpenSidebar(false);
  };
  return { openSidebar, handleOpen, handleClose };
}
