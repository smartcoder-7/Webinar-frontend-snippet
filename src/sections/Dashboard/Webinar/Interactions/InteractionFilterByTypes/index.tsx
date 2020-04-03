import React, { useEffect, useState } from 'react';
import { Checkbox, Dropdown } from 'semantic-ui-react';
import { InteractionType } from '@src/fromBackend/schema';
import DropdownUI from '@src/sections/Dashboard/Webinar/Interactions/InteractionFilterByTypes/DropdownUI';
import { defaultSelected } from '@src/modules/Interaction/constants';
interface IOption {
  key: string;
  text: string;
  value: string;
}

export interface DropdownUIProps {
  selected: boolean;
  options: IOption[];
  children?: any;
}

interface InteractionFilterByTypesProps {
  types: String[];
  onChangeFilter: Function;
}

const OtherCaseLabel = 'Others';

const renderTitleByType = (type: String): string => {
  switch (type) {
    case InteractionType.Poll:
      return `Poll results`;

    case InteractionType.SpecialOffer:
      return `Offers`;

    case InteractionType.Handout:
      return `Handouts`;

    case InteractionType.Question:
      return `Questions`;

    case InteractionType.Tip:
      return `Tips`;

    case InteractionType.Feedback:
      return `Feedback`;

    default:
      return '';
  }
};

const InteractionFilterByTypes: React.FunctionComponent<InteractionFilterByTypesProps> = ({
  types,
  onChangeFilter,
}) => {
  const optionTypes: IOption[] = types.map((type) => {
    return {
      key: type.toLowerCase() as string,
      text: renderTitleByType(type) as string,
      value: type.toLowerCase() as string,
    };
  });

  const [selected, setSelected] = useState<string>(defaultSelected.text);
  const [interactionTypes, setInteractionTypes] = useState<string[]>([defaultSelected.value]);

  const onCheckItem = (_e: any, data: any, value: string) => {
    const isCheckedItem = data.checked;
    return isCheckedItem
      ? setInteractionTypes((current) =>
          value !== defaultSelected.value
            ? [...current, value].filter((item) => item !== defaultSelected.value)
            : [...current, value].filter((item) => item === defaultSelected.value)
        )
      : setInteractionTypes((current: any) =>
          current.length !== 0
            ? current
            : current.filter((item: any) => item !== value && value !== defaultSelected.value)
        );
  };

  useEffect(() => {
    if (interactionTypes.length <= 0) return;
    setSelected(
      interactionTypes.includes(defaultSelected.value) || interactionTypes.length === 0
        ? defaultSelected.text
        : OtherCaseLabel
    );
    onChangeFilter(interactionTypes);
  }, [interactionTypes]);

  return (
    <DropdownUI selected={selected}>
      <Dropdown.Menu>
        <Dropdown.Header className={`normal-case text-xs font-medium`}>
          Filter interactions:
        </Dropdown.Header>
        {[defaultSelected, ...optionTypes].map(({ value, text, key }, index) => (
          <Dropdown.Item
            value={`${value}`}
            icon={
              <Checkbox
                onChange={(evt: any, data: any) => onCheckItem(evt, data, value)}
                checked={interactionTypes.includes(value)}
                className={`mr-3 text-sm text-teal-6 w-full`}
                label={text}
              />
            }
            key={key}
            className={`flex items-center ${index === 0 ? 'text_checkbox' : ''}`}
          />
        ))}
      </Dropdown.Menu>
    </DropdownUI>
  );
};

export default InteractionFilterByTypes;
