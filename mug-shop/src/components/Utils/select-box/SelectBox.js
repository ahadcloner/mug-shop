import React, { useState } from 'react';
import Select from 'react-select';
import "./selectBox.css"
import CreatableSelect from 'react-select/creatable';

 export function CreatableSelect_single({options,value,Focus,CreateOption,...props }) {
    const [selectedOption, setSelectedOption] = useState(null);

    return (
        <div className="custom-select">
            <CreatableSelect
                onFocus={Focus}
                onCreateOption={CreateOption}
                onChange={props?.selectedOption}
                isClearable
                // defaultValue={selectedOption}
                // onChange={setSelectedOption}
                options={options}
                className={"custom-select-div"}
                placeholder={""}
            />
        </div>
    );
}



 export function  CreatableSelect_multi({options,value,Focus,CreateOption,...props  }) {
    const [selectedOption, setSelectedOption] = useState(null);

    return (
        <div className="custom-select">
            <CreatableSelect

                isMulti={true}
                isClearable={true}
                onFocus={Focus}
                onCreateOption={CreateOption}
                onChange={props?.selectedOption}
                // defaultValue={selectedOption}
                // onChange={setSelectedOption}
                isRtl={true}
                options={options}
                className={"custom-select-div"}
                placeholder={""}
                selectOpt
            />
        </div>
    );
}


// export {CreatableSelect}
