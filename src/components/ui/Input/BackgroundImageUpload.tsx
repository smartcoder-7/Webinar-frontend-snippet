import { ReactComponent as ImageUploadIcon } from "@src/images/imageUpload.svg"
import React from "react"
import tw from "tailwind.macro"

import Upload, { Asset } from './Upload'

interface Props {
  asset: Asset
  disabled: boolean
}

const Image = ({ value }: any) => {
  return (
    <div className="bg-blue-1 h-full w-full items-center flex">
      <div className="w-32 ml-12 mr-8 my-4">
        <img css={tw`object-contain`} src={value} />
      </div>
    </div>
  )
}

const BackgroundImageUpload: React.FC<Props> = props => {
  return (
    <Upload {...props} css={{ width: '100%', padding: '0 !important' }}>
      <Upload.Loading>
        <div className="bg-blue-1 h-full w-full items-center flex">
          <div className="h-24 ml-12 mr-8 my-4 flex items-center justify-center">
            <img
              className="w-10"
              src={require("@src/images/spinner.svg").default}
            />
            <span className="text-teal-2 text-sm pl-4">Uploading image...</span>
          </div>
        </div>
      </Upload.Loading>

      <Upload.Success>
        <Image />
      </Upload.Success>

      <Upload.Empty>
        <div className="bg-blue-1 flex-wrap h-full w-full flex items-center cursor-pointer">
          <div className="ml-12 mr-8 my-4 flex items-center justify-center w-32 h-24 bg-white shadow">
            <ImageUploadIcon className="w-8 h-8" />
          </div>
          <div>
            <div className="text-gray-2 text-md pb-2">Include an image?</div>
            <div className="text-teal-2 text-sm">Drag & drop an image here</div>
            <div className="text-teal-2 text-sm">
              or <span className="underline">select a file for upload</span>
            </div>
          </div>
        </div>
      </Upload.Empty>
    </Upload>
  )
}

export default BackgroundImageUpload
