import { useState } from "react"

export const Sidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className={"sidebar" + (open && " open")}>

    </div>
  )
}
