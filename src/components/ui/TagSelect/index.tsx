import React, {FunctionComponent, useState} from 'react';
import Select from 'react-select';

const customStyles = {
    placeholder: (provided: any) => ({
        ...provided,
        color: '#99ACAE',
        fontSize: '14px'
    }),
    control: (provided: any) => ({
        ...provided,
        padding: '0 0.75rem',
        boxShadow: 'none',
        border: '1px solid #99ACAE',
        '&:hover': {
            border: '1px solid #99ACAE',
        },
        minHeight: 35
    }),
    option: (provided: any) => ({
        ...provided,
        color: '#99ACAE',
        borderRadius: 0
    }),
    menu: (provided: any) => ({
        ...provided,
        marginTop: -2,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        boxShadow: 'none',
        borderColor: '#99ACAE',
        borderWidth: 1
    }),
    menuList: (provided: any) => ({
        ...provided,
        padding: 0
    }),
    valueContainer: (provided: any) => ({
        ...provided,
        padding: 0
    })
};

interface IOption {
    value: string;
    label: string;
}

interface Props {
    options: Array<IOption> | Object[];
    onItemsSelection: Function;
}

const TagSelect: FunctionComponent<Props> = ({options, onItemsSelection}) => {

    const [state, setState] = useState({
        selectedOption: []
    });

    const handleChange = (selectedOption: any) => {
        return setState({
            selectedOption,
        });
    };

    const {selectedOption} = state;

    React.useEffect(() => {
        onItemsSelection(selectedOption);
    }, [selectedOption]);

    return (
        <Select
            value={selectedOption}
            styles={customStyles}
            onChange={handleChange}
            options={options}
            isMulti
            components={{ DropdownIndicator:() => null, IndicatorSeparator:() => null }}
            placeholder={`Engaged: Took 2 or more polls`}
        />
    );
};

export default TagSelect;
