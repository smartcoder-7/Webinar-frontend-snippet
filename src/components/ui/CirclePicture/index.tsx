import React from 'react';

interface PictureProps {
  pictureUrl?: string | null;
  size?: string;
}
const CirclePicture: React.FC<PictureProps> = ({ pictureUrl, size = 6 }) => {
  if (!pictureUrl || pictureUrl === '') {
    return null;
  }
  return (
    <div
      className={`cursor-pointer hover:bg-gray-300 bg-gray-200 rounded-full overflow-hidden h-${size} w-${size}  flex items-center justify-center bg-cover`}
    >
      {pictureUrl && <img className={`h-${size} w-${size}`} src={pictureUrl} />}
    </div>
  );
};
export default CirclePicture;
