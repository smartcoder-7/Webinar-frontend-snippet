import React from "react"
import { Router } from "@reach/router"
import styled from "@emotion/styled"
import UserEditForm from "./UserEditForm"
import TeamEditForm from "./TeamEditForm"
import PlanEditForm from "./PlanEditForm"

import Main from "./Main"

const Profile: React.FC = styled(() => {
  return (
    <Router>
      <Main path="profile">
        <UserEditForm path="edit/*" mode="edit" />
        <TeamEditForm path="team/*" />
        <PlanEditForm path="plan/*" />
      </Main>
    </Router>
  )
})``

export default Profile
