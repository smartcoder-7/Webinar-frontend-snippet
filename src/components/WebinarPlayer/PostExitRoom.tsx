import React from 'react';
import styled from '@emotion/styled';
import tw from 'tailwind.macro';
import { Link, navigate } from '@reach/router';
import { ReactComponent as Logo } from '@src/images/logo2.svg';
import { EWebinarFragment } from '@src/fromBackend/schema';

const PostExitRoomWrap = styled.div`
  background: rgb(2, 0, 36);
  background: linear-gradient(90deg, rgba(2, 0, 36, 1) 0%, rgba(20, 87, 101, 1) 100%);
  ${tw`w-full h-full bg-gray-1 flex flex-col items-center justify-center absolute z-30 top-0 left-0`}
  .logo {
    position: absolute;
    max-width: 150px;
    max-height: 100px;
    top: 20px;
    left: 20px;
  }
  .register-button {
    ${tw`items-center justify-center appearance-none font-bold rounded-full text-white bg-blue-3 px-8 py-4 mb-4 focus:outline-none focus:shadow`}
    .register-button-text {
      ${tw`text-white text-lg`}
    }
  }
`;

const PowerByWrap = styled.div`
  ${tw`
    flex flex-col items-center justify-center absolute
  `}
  bottom: 30px;
  .powered-by {
    ${tw`text-white text-xs opacity-50`}
  }
`;

const PostExitRoom: React.FC<{
  ewebinar: EWebinarFragment;
}> = ({ ewebinar }) => {
  React.useEffect(() => {
    if (
      ewebinar.exitRoomSettings &&
      ewebinar.exitRoomSettings.redirectAfterExit &&
      ewebinar.exitRoomSettings.redirectLink
    ) {
      navigate(ewebinar.exitRoomSettings.redirectLink);
    }
  }, []);

  return (
    <PostExitRoomWrap>
      {ewebinar.logoMediaUrl && <img alt='logo' className='logo' src={ewebinar.logoMediaUrl} />}
      <div className='text-2xl text-white mb-2 text-center md:w-1/2'>{ewebinar.title}</div>
      <div className='text-xl text-white mb-8 text-center'>
        This eWebinar has ended. Want to register for an upcoming session?
      </div>
      <Link to='./register'>
        <button className='register-button mb-8'>
          <span className='register-button-text'>Register now</span>
        </button>
      </Link>
      <PowerByWrap>
        <div className='powered-by mb-1'>Powered by...</div>
        <Logo className='opacity-50 mx-auto' />
      </PowerByWrap>
    </PostExitRoomWrap>
  );
};

export default PostExitRoom;
