import React from "react"
import SideBar from "@src/components/SideBar"

interface ScheduleProps {
  path: string
  children: any
}

const Schedule = ({ children }: ScheduleProps) => {
  return (
    <div className="flex justify-between pb-4 bg-white shadow-lg">
      <SideBar page="schedule" />
      <div className="w-3/4 p-6">{children}</div>
    </div>
  )
}

export default Schedule
