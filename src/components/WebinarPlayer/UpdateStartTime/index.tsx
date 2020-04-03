import React, { FunctionComponent } from 'react';
import { Mode } from '@src/components/WebinarPlayer';
import { css } from '@emotion/core';
import ButtonGroup from '@src/components/ui/ButtonGroup';
import { Input } from '@src/components/ui';
import tw from 'tailwind.macro';

interface IUpdateStartTimeProps {
  onChangeStartTime: (delta: number) => any;
  mode: Mode;
}

const UpdateStartTime: FunctionComponent<IUpdateStartTimeProps> = ({ onChangeStartTime, mode }) => {
  const [delta, setDelta] = React.useState<string>('15');

  if (process.env.NODE_ENV === 'production' || mode === Mode.edit) {
    return null;
  }

  return (
    <div
      className={`absolute w-full flex flex-row justify-center`}
      css={css`
        z-index: 100;
        top: 1rem;
      `}
    >
      <div
        className='flex flex-row'
        css={css`
          margin-right: 270px;
        `}
      >
        <div
          data-placeholder='minutes'
          css={css`
                position: relative;
                display: inline-block;
                width: 7rem;
                text-align: right;
                margin-right: 1rem;
                &::after {
                  ${tw`antialiased font-hairline`}
                  position: absolute;
                  font-size:14px;
                  right: 10px;
                  bottom: 0.6rem;
                  content: attr(data-placeholder);
                  pointer-events: none;
                  opacity:0.4;     
        `}
        >
          <Input
            css={css`
              text-align: right;
              padding-right: 5em;
            `}
            value={delta}
            onChange={(e: any) => setDelta(e.target.value)}
          />
        </div>
        <ButtonGroup>
          <ButtonGroup.Button onClick={() => onChangeStartTime(-1 * parseInt(delta, 10))}>
            -
          </ButtonGroup.Button>
          <ButtonGroup.Button onClick={() => onChangeStartTime(parseInt(delta, 10))}>
            +
          </ButtonGroup.Button>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default UpdateStartTime;
