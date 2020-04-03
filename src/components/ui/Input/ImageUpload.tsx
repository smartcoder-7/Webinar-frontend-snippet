import { ReactComponent as ImageUploadIcon } from "@src/images/imageUpload.svg"
import React from "react"
import tw from "tailwind.macro"

import Upload, { Asset } from './Upload'

interface Props {
  disabled: boolean
  placeholder?: string
  className?: string
  asset: Asset
}

const Image = ({ value }: any) => <img css={tw`object-contain`} src={value} />

const ImageUpload: React.FC<Props> = props => {
  return (
    <Upload {...props} className={`${props.className} border-1 border-coral-1 rounded`}>
      <Upload.Loading />
      <Upload.Success>
        <Image />
      </Upload.Success>
      <Upload.Empty>
        {!props.disabled ? (
          <div className="text-coral-1 text-center flex-wrap h-full flex items-center justify-center cursor-pointer">
            <ImageUploadIcon className="w-8 h-8" />
            <span className="max-w-48 p-2">
              {props.placeholder ||
              <span>
                Drag & drop an image or{" "}
                <span className="underline"> select a file for upload</span>
              </span>
              }
            </span>
          </div>
        ) : (
          <div />
        )}
      </Upload.Empty>
    </Upload>
  )
}

export default ImageUpload
