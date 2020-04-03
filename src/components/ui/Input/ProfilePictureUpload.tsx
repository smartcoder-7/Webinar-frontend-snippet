import { Text } from "@src/components/ui"
import useAssetLibrary from "@src/hooks/useAssetLibrary"
import useUser from "@src/hooks/useUser"
import React from "react"
import { css } from "@emotion/core"

import { ReactComponent as ProfileUpload } from "@src/images/profileUpload.svg"

interface Props {}

const ProfilePictureUpload: React.FC<Props> = ({
  bucketKey,
  className,
  ...props
}: any) => {
  const User = useUser()
  const user = User.get()
  const assetLibSvc = useAssetLibrary()
  const [loading, setLoading] = React.useState(false)

  return (
    <div className="flex justify-between mt-10 mb-4 md:w-4/5 profile-picture-wrap">
      <label className="flex">
        <input
          type="file"
          className="hidden"
          onChange={async (e: any) => {
            const files = e.target.files
            const file = files.length && files[0]
            try {
              if (file) {
                setLoading(true)
                const response = await assetLibSvc.createUploadUrl({
                  data: {
                    scope: 'user',
                    id: user.data.id,
                    name: 'profile',
                    fileType: file.type
                  },
                })
                const { url, uploadUrl } = response.data.createUploadUrl

                await fetch(uploadUrl, {
                  method: "PUT",
                  body: file,
                  headers: {
                    "Content-Type": file.type,
                    "x-amz-acl": "public-read",
                  },
                })

                props.onChange(url)
                setLoading(false)
              }
            } catch {
              setLoading(false)
            }
          }}
        />
        <div className="relative">
          {props.value ? (
            <button
              onClick={(e: any) => {
                e.stopPropagation()
                e.preventDefault()
                props.onChange('')
              }}
              className="cursor-pointer outline-none appearence-none shadow absolute bg-coral-1 top-0 right-0 rounded-full w-6 h-6  -mt-3 -mr-3 flex items-center justify-center text-white text-xs"
            >
              <div
                css={css`
                  margin: 1px 0 0 1px;
                `}
              >
                ✕
              </div>
            </button>
          ) : (
            <div className="cursor-pointer appearence-none shadow absolute bg-coral-1 top-0 right-0 rounded-full w-6 h-6  -mt-3 -mr-3 flex items-center justify-center text-white text-lg icon-add-img">
              <div
                css={css`
                  margin: -3px 0 0 1px;
                `}
              >
                +
              </div>
            </div>
          )}
          <div className="cursor-pointer hover:bg-gray-300 bg-gray-200 rounded-full overflow-hidden h-20 w-20  flex items-center justify-center bg-cover">
            {!props.value && !loading && <ProfileUpload className="w-6 h-6" />}

          {props.value && !loading && (
            <img className="w-20 h-auto" src={`${props.value}?v=${new Date().getTime()}`} />
          )}
          {loading && (
            <img
              className="w-10 m-10"
              src={require("@src/images/spinner.svg").default}
            />
          )}
          </div>
        </div>
        <div className="ml-6 flex flex-col justify-center">
          <Text.subhead>
            {user.data && `${user.data.firstName} ${user.data.lastName}`}
          </Text.subhead>
          <Text.body className="text-teal-4 text-sm font-semibold cursor-pointer">
            Upload new photo
          </Text.body>
        </div>
      </label>
    </div>
  )
}

export default ProfilePictureUpload
