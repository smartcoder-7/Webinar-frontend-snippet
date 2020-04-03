import { useApolloClient } from "@apollo/react-hooks"
import { Dropdown } from "@src/components/ui"
import css from '@emotion/css'
import useUser from "@src/hooks/useUser"
import { ReactComponent as SignOutIcon } from "@src/images/signOutIcon.svg"
import { Link, navigate } from "gatsby"
import React from "react"

const UserMenu = () => {
  const client = useApolloClient()
  const User = useUser()
  const user = User.get()

  return user.data ? (
    <Dropdown>
      <Dropdown.Reference>
        <div className="UserMenu flex items-center">
          <div className="ProfileImage overflow-hidden bg-blue-1 rounded-full mr-3" css={css`width:1.7rem; height:1.7rem;`}>
            {user.data.profileMediaUrl && (
              <img src={`${user.data.profileMediaUrl}?v=${new Date().getTime()}`} alt="avatar" />
            )}
          </div>
          <div className="UserName text-gray-2">
            {user.data.firstName} <span className="mx-2">▾</span>
          </div>
        </div>
      </Dropdown.Reference>
      <Dropdown.Options>
        <Link to="/profile/edit">
          <Dropdown.Options.Item>Edit my profile</Dropdown.Options.Item>
        </Link>
        <Dropdown.Options.Item>My Plan</Dropdown.Options.Item>
        <Link to="/profile/team">
          <Dropdown.Options.Item>My Team</Dropdown.Options.Item>
        </Link>
        <Dropdown.Options.Item>Contact support</Dropdown.Options.Item>
        <Dropdown.Options.Item
          onClick={async () => {
            await User.logout()
            navigate("/login")
            client.resetStore()
          }}
        >
          <SignOutIcon className="mr-2 inline-block" />
          Sign out
        </Dropdown.Options.Item>
      </Dropdown.Options>
    </Dropdown>
  ) : null
}

export default UserMenu
