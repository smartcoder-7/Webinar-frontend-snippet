import styled from '@emotion/styled';
import { Link } from '@reach/router';
import { SocialLink } from '@src/fromBackend/schema';
import { ReactComponent as FacebookIcon } from '@src/images/facebook.svg';
import { ReactComponent as LinkedInIcon } from '@src/images/linkedin.svg';
import { ReactComponent as Logo } from '@src/images/logo2.svg';
import { ReactComponent as ReplayIcon } from '@src/images/replay.svg';
import { ReactComponent as TwitterIcon } from '@src/images/twitter.svg';
import React from 'react';
import tw from 'tailwind.macro';

import { WebinarPlayerContext } from '.';
import usePreserveAspectRatio from './usePreserveAspectRatio';

const defaultAvatar = require('@src/images/user.png');

const ExitRoomWrap = styled.div`
  background: rgb(2, 0, 36);
  background: linear-gradient(90deg, rgba(2, 0, 36, 1) 0%, rgba(20, 87, 101, 1) 100%);
  ${tw`absolute  w-full h-full top-0 left-0`}
  .logo {
    position: absolute;
    max-width: 150px;
    max-height: 100px;
    top: 20px;
    left: 20px;
  }
  .replay-button {
    ${tw`items-center justify-center appearance-none font-bold rounded-full text-white bg-blue-3 px-8 py-4 mb-4 focus:outline-none focus:shadow`}
    .replay-button-text {
      ${tw`text-white text-lg`}
    }
  }
  .presenters {
    ${tw` overflow-x-scroll sm:overflow-x-auto flex items-center mb-8`}
    .presenter {
      ${tw`relative w-64 mr-2 ml-2`}
      .content {
        ${tw`p-8 bg-white rounded-lg mt-6 ml-6`}
      }
      .avatar {
        ${tw`absolute rounded-full bg-center bg-cover bg-white border-2 border-white shadow-lg w-12 h-12 p-1`}
      }
    }
  }
  .powered-by {
    ${tw`text-white text-xs opacity-50`}
  }
`;

const getSocialIcon = (type: string) => {
  switch (type) {
    case 'linkedIn':
      return <LinkedInIcon />;
    case 'twitter':
      return <TwitterIcon />;
    default:
      return <FacebookIcon />;
  }
};
const getSocialLink = (socialLink: SocialLink) => {
  return Object.entries(socialLink).map(([key, value]: [string, any]) => {
    if (value) {
      return (
        <Link key={key} to={value}>
          {getSocialIcon(key)}
        </Link>
      );
    }
    return null;
  });
};

const ExitRoom: React.FC<{}> = () => {
  const { ewebinar } = React.useContext(WebinarPlayerContext);
  if (!ewebinar || !ewebinar) return null;
  const preserveAspectRatio = usePreserveAspectRatio();
  return (
    <ExitRoomWrap>
      <div
        className='w-full h-full  flex flex-col items-center justify-center '
        ref={preserveAspectRatio.ref}
        style={preserveAspectRatio.style}
      >
        {ewebinar.logoMediaUrl && <img className='logo' src={ewebinar.logoMediaUrl} />}
        <div className='text-2xl text-white mb-2 text-center md:w-128'>{ewebinar.title}</div>
        <div className='text-xl text-white mb-8 text-center'>
          The eWebinar has ended. Thanks for joining us!
        </div>
        <Link to='./register'>
          <button className='replay-button mb-8'>
            <ReplayIcon className='inline-flex mr-2' />
            <span className='replay-button-text'>Watch the replay</span>
          </button>
        </Link>
        <div className='presenters'>
          {ewebinar.presenters &&
            ewebinar.presenters.map((presenter) => {
              return (
                <div key={presenter.id} className='presenter'>
                  {presenter.profileMediaUrl ? (
                    <div
                      className='avatar'
                      css={{
                        backgroundImage: `url(${presenter.profileMediaUrl})`,
                      }}
                    />
                  ) : (
                    <img className='avatar' src={defaultAvatar} />
                  )}
                  <div className='content'>
                    <div className='text-lg text-gray-3 mb-1'>{presenter.name}</div>
                    <div className='text-sm text-blue-3 mb-1'>{presenter.email}</div>
                    <div className='text-sm text-gray-3 mb-4'>{presenter.phone}</div>
                    <div className='flex items-center'>
                      {presenter.socialLinks && getSocialLink(presenter.socialLinks)}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        <div className='powered-by mb-1'>Powered by...</div>
        <Logo className='opacity-50 mx-auto' />
      </div>
    </ExitRoomWrap>
  );
};

export default ExitRoom;
