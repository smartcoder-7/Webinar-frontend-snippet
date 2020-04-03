import React from 'react';
import { EWebinarFragment } from '@src/fromBackend/schema';

interface DisplaySettingsProps {
  ewebinar: EWebinarFragment;
}

const Integrations: React.FC<DisplaySettingsProps> = ({}) => {
  /*
  const integrationSettings: Partial<EWebinarFragment> = {
    id: ewebinar.id,
  };

  const [updateSettings] = useUpdateEwebinarMutation();
   */

  return null;
};

export default Integrations;
