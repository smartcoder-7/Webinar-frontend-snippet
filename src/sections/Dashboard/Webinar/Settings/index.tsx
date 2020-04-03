import React from "react"
import SideBar from "@src/components/SideBar"

interface SettingsProps {
  path: string
  children: any
}

const Settings = ({ children }: SettingsProps) => {
  return (
    <div className="flex justify-between pb-4 bg-white shadow-lg">
      <SideBar page="settings" />
      <div className="w-3/4 p-6">{children}</div>
    </div>
  )
}

export default Settings
