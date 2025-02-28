import { useState } from "react";

export default function UseOpenSidebar() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return { open, handleOpen, handleClose };
}
