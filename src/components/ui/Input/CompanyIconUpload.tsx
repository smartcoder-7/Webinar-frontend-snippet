import { Text } from "@src/components/ui"
import useAssetLibrary from "../../../hooks/useAssetLibrary"
import useUser from "@src/hooks/useUser"
import React from "react"
import { css } from "@emotion/core"

import { ReactComponent as ImageUploadIcon } from "@src/images/imageUpload.svg"
import { User } from "@src/fromBackend/schema"
import { Data } from "@src/hooks/useApolloEntity"

interface Props {}

const CompanyIconUpload: React.FC<Props> = ({
  bucketKey,
  className,
  ...props
}: any) => {
  const userSvc = useUser()
  const user: Data<User> = userSvc.get()

  const assetLibSvc = useAssetLibrary()
  const [loading, setLoading] = React.useState(false)

  return (
    <div className="flex justify-between mt-10 mb-4 md:w-4/5">
      <label className="flex">
        {/* need to add a entity in the user profile to save the company icon url */}
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
                    scope: "team",
                    id: user.data.team.id,
                    name: "logo",
                    fileType: file.type,
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
                // need to clean the value of the companyIcon.url
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
            <div className="cursor-pointer appearence-none shadow absolute bg-coral-1 top-0 right-0 rounded-full w-6 h-6  -mt-3 -mr-3 flex items-center justify-center text-white text-lg">
              {/* position the + content in the center */}
              <div
                css={css`
                  margin: -3px 0 0 1px;
                `}
              >
                +
              </div>
            </div>
          )}
          <div className="cursor-pointer hover:bg-gray-300 bg-gray-200 rounded overflow-hidden  h-20 w-40 flex items-center justify-center bg-cover">
            {!props.value && !loading && (
              <ImageUploadIcon className="w-8 h-6" />
            )}

            {props.value && !loading && (
              <img className="w-full" src={`${props.value}?v=${new Date().getTime()}`} />
            )}

            {loading && (
              <img
                className="w-10 m-10"
                src={require("@src/images/spinner.svg").default}
              />
            )}
          </div>
        </div>
        <div
          className="ml-6 flex flex-col justify-center min-w-32"
          css={css`
            min-width: 140px;
          `}
        >
          <Text.subhead>{user.data && user.data.team.name}</Text.subhead>
          <Text.body className="text-teal-4 text-sm font-semibold cursor-pointer">
            Upload a new logo
          </Text.body>
        </div>
      </label>
    </div>
  )
}

export default CompanyIconUpload
