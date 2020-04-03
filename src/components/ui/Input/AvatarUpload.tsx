import React from "react"
import { ReactComponent as ImageUploadIcon } from "@src/images/imageUpload.svg"
import Upload, { Asset } from './Upload'

interface Props {
  asset: Asset
  disabled: boolean
}

const Image = ({ value }: any) => (
  <div
    css={{
      backgroundImage: `url(${value})`,
    }}
    className="rounded-full bg-center bg-cover bg-red-200 border-4 border-white shadow w-16 h-16 mb-2"
  />
)

const AvatarUpload: React.FC<Props> = props => {
  return (
    <Upload avatar={true} {...props}>
      <Upload.Loading />
      <Upload.Success>
        <Image />
      </Upload.Success>
      <Upload.Empty>
        {!props.disabled ? (
          <div className="rounded-full bg-white border-4 border-white shadow w-20 h-20 mb-2 flex justify-center items-center">
            <ImageUploadIcon className="w-6 h-6" />
          </div>
        ) : (
          <div className="rounded-full bg-red-200 border-4 border-white shadow w-16 h-16 mb-2" />
        )}
      </Upload.Empty>
    </Upload>
  )
}

export default AvatarUpload
