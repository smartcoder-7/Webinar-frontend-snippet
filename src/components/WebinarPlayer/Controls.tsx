import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { Text } from '@src/components/ui';
import { PresenterFragment } from '@src/fromBackend/schema';
import { ReactComponent as PauseButtonIcon } from '@src/images/pauseButton.svg';
import { ReactComponent as PlayButtonIcon } from '@src/images/playButton.svg';
import spinner from '@src/images/spinner.svg';
import { ReactComponent as VolumeIcon } from '@src/images/volume.svg';
import { ReactComponent as WelcomeIcon } from '@src/images/welcome.svg';
import React, { Fragment } from 'react';
import { MdFullscreen, MdFullscreenExit } from 'react-icons/md';
import tw from 'tailwind.macro';

import { Mode, RoomType, WebinarPlayerContext } from '.';
import Reactions from './Reactions';

interface Props {}

const PlayButton: React.FC<{}> = () => {
  const { isPlaying, mode, setIsPlaying, isBuffering } = React.useContext(WebinarPlayerContext);
  if (!setIsPlaying || mode === Mode.live) return null;

  if (isBuffering) {
    return (
      <div className=' absolute z-40 w-full h-full flex items-center justify-center'>
        <img src={spinner} className='w-32 h-32' />
      </div>
    );
  }

  return (
    <div className='control absolute z-40 w-full h-full flex items-center justify-center'>
      <button
        className={`appearence-none w-full h-full flex items-center justify-center outline-none z-40 `}
        onClick={() => (isPlaying ? setIsPlaying(false) : setIsPlaying(true))}
      >
        {!isPlaying ? <PlayButtonIcon /> : <PauseButtonIcon />}
      </button>
    </div>
  );
};

const VolumeComponent = styled.div`
  ${tw`flex`}
  position: absolute;
  transform: rotate(-90deg);
  transform-origin: -10px -12px;
`;

const Controls: React.FC<Props> = () => {
  const timeout = React.useRef<any>(null);
  const { currentRoom, ewebinar, mode, setIsFullScreen, isFullScreen, player } = React.useContext(
    WebinarPlayerContext
  );

  const [volumeHandling, setVolumeHandling] = React.useState(false);
  const presenters = ewebinar && ewebinar.presenters;
  const [volume, setVolume] = React.useState(1);
  const onSetVolume = async (evt: any) => {
    const volume = evt.target.value;
    player && player.setVolume(volume);
    setVolume(volume);
  };

  const [isEnable, setIsEnable] = React.useState(true);

  const onDisappearElements = () => {
    return setIsEnable(false);
  };

  const onDisappearElementsInTime = () => {
    setIsEnable(true);
    timeout.current && clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      setIsEnable(false);
    }, 15000);
    return true;
  };

  React.useEffect(() => {
    return () => {
      if (timeout.current) clearTimeout(timeout.current);
    };
  }, []);

  const onAppearElements = () => {
    return setIsEnable(true);
  };

  if (!ewebinar || !ewebinar) return null;
  return (
    <div
      className={` absolute z-40 top-0 left-0 w-full h-full flex flex-col justify-center ${
        currentRoom && isEnable ? 'enable-controls' : ''
      }`}
      onMouseMove={onDisappearElementsInTime}
      onMouseOut={onDisappearElements}
      onMouseOver={onAppearElements}
    >
      <div
        className='w-full h-full absolute top-0 left-0 control'
        css={css`
          background-color: rgba(0, 0, 0, 0.3);
        `}
      />
      {mode === Mode.live && <Reactions />}
      <PlayButton />
      {currentRoom && currentRoom.type === RoomType.Presentation && (
        <div className='absolute z-40 top-0 left-0 m-6 control'>
          <div className='flex items-start'>
            <div className='flex flex-col'>
              {presenters &&
                presenters.map((presenter: PresenterFragment, index) => (
                  <Fragment key={presenter.id}>
                    {!!presenter.profileMediaUrl ? (
                      <img
                        className='w-10 h-10 rounded-full mr-4 border-white'
                        src={presenter.profileMediaUrl}
                        style={{
                          marginTop: index > 0 ? '-20px' : 0,
                          zIndex: presenters.length - index,
                        }}
                      />
                    ) : (
                      <div
                        className='cursor-pointer hover:bg-gray-300 bg-gray-200 rounded-full overflow-hidden mr-4 h-10 w-10  flex items-center justify-center bg-cover border-white'
                        style={{
                          marginTop: index > 0 ? '-20px' : 0,
                          zIndex: presenters.length - index,
                        }}
                      />
                    )}
                  </Fragment>
                ))}
            </div>
            {presenters && (
              <div className='text-sm'>
                <Text.headline className='font-body text-white'>{ewebinar.title}</Text.headline>
                <Text.subtitle className='text-xs font-body flex items-center text-white'>
                  <WelcomeIcon className='mr-3' />
                  Presented by
                  {presenters.map((presenter, index) => (
                    <Fragment key={presenter.id}>
                      {index > 0 ? ',' : ''}
                      <Text.subtitle className='text-sm font-body text-cyan-1 ml-1'>
                        {presenter.name}
                      </Text.subtitle>
                    </Fragment>
                  ))}
                </Text.subtitle>
              </div>
            )}
          </div>
        </div>
      )}

      <div className=' absolute z-40 top-0 right-0 m-6 control'>
        <button className='appearance-none text-4xl text-white outline-none'>
          {isFullScreen ? (
            <MdFullscreenExit onClick={() => setIsFullScreen && setIsFullScreen(false)} />
          ) : (
            <MdFullscreen onClick={() => setIsFullScreen && setIsFullScreen(true)} />
          )}
        </button>
      </div>
      <div className=' absolute z-40 flex items-center bottom-0 left-0 m-6 control'>
        <div className='mr-4 flex items-center'>
          <VolumeIcon onClick={() => setVolumeHandling(!volumeHandling)} />
          {volumeHandling && (
            <VolumeComponent>
              <input
                value={volume}
                onChange={onSetVolume}
                min='0.0'
                max='1.0'
                step='0.01'
                type='range'
              />
            </VolumeComponent>
          )}
        </div>
      </div>
      <div />
    </div>
  );
};

export default Controls;
