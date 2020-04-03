import { css } from "@emotion/core"
import React from "react"

import Input from "../"

export default { title: "UI/Input/Dropdown", component: Input.dropdown }

export const basic = () => (
  <div className="m-16">
    <Input.dropdown
      placeholder="Interaction type"
      options={[
        { value: "handout", text: "Handout" },
        { value: "poll", text: "Poll" },
      ]}
    />
  </div>
)

export const styledBackgroundColor = () => (
  <div className="m-16">
    <Input.dropdown
      placeholder="Interaction type"
      options={[
        { value: "handout", text: "Handout" },
        { value: "poll", text: "Poll" },
      ]}
      css={css`
        &.dropdown {
          border-color: #146368 !important;
          background: #146368 !important;
        }

        &.dropdown {
          * {
            color: white !important;
          }
        }

        &.dropdown .menu {
          background: #146368;
          border: #146368 !important;
        }
        &.dropdown .menu > .item {
          color: white !important;
          border: #146368 !important;
        }
      `}
    />
  </div>
)
