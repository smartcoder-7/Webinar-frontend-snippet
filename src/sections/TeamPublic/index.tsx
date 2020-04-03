import React from "react"
import { Router } from "@reach/router"
import Team from "./Team"

const TeamPublic: React.FC<any> = () => {
  return (
    <Router>
      <Team path="/company/:companyId" />
      <Team path="/" />
    </Router>
  )
}

export default TeamPublic