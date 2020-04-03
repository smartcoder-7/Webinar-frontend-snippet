import WebinarPlayer from '@src/components/WebinarPlayer';
import React from 'react';

import Modals from './Modals';

interface Props {
  ewebinarId?: string;
}

/*
import {Dropdown} from "@src/components/ui"

// const PresetInteractionsDropdown = () => (
//   <Dropdown>
//     <Dropdown.Reference>
//       <div>
//         Use pre-set interactions <span className="mx-2">▾</span>
//       </div>
//     </Dropdown.Reference>
//     <Dropdown.Options>
//       <Dropdown.Options.Item>Preset 1</Dropdown.Options.Item>
//       <Dropdown.Options.Item>Preset 2</Dropdown.Options.Item>
//       <Dropdown.Options.Item>Preset 3</Dropdown.Options.Item>
//     </Dropdown.Options>
//   </Dropdown>
// )
// */

const Interactions: React.FC<Props> = ({ ewebinarId }: Props) => {
  const id = ewebinarId;

  return (
    <WebinarPlayer mode={WebinarPlayer.Mode.edit} ewebinarId={id}>
      <Modals ewebinarId={ewebinarId} />
      <WebinarPlayer.Left>
        <WebinarPlayer.Player />
        <WebinarPlayer.Timeline />
      </WebinarPlayer.Left>
      <WebinarPlayer.Right>
        <WebinarPlayer.InteractionsStream />
      </WebinarPlayer.Right>
    </WebinarPlayer>
  );
};

export default Interactions;
