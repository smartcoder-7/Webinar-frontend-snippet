import styled, { StyledComponent } from '@emotion/styled';
import { Dropdown } from 'semantic-ui-react';
import { Pointing } from '@src/modules/Interaction/enum';
import tw from "tailwind.macro";
import React from 'react';
import { DropdownUIProps } from '@src/sections/Dashboard/Webinar/Interactions/InteractionFilterByTypes';

const DropdownUI: StyledComponent<any, DropdownUIProps, any> = styled(
  ({ selected, children, className }) => {
    return (
      <Dropdown
        pointing={Pointing.Top}
        multiple
        placeholder={selected}
        value={[]}
        className={`${className} min-h-0 border-0 shadow-none`}
      >
        {children}
      </Dropdown>
    );
  }
)`
  ${tw`flex items-center w-24`}
  padding-right: 0 !important;

  .menu {
    ${tw`text-cyan-1`}
    left: auto !important;
    right: 0 !important;
    min-width: 12rem !important;

    .header {
      color: #a9b8ba !important;
    }

    .item {
      .text {
        color: #537175;
      }
    }
  }

  > .text {
    color: inherit !important;
  }
`;

export default DropdownUI;