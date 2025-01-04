import { useState, useEffect } from 'react';
import React from 'react';

interface RadioOptionsProps {
    questionId: string;
    optionValue: string;
    selectedOption: string;
    changeOption: (option: string) => void;
}

interface OptionsProps {
    optionsArray: string[];
    allowMultiple?: boolean;
    questionId: [string, string | null];
    cllbck: (option: string) => void;
}

function RadioOptions({
    questionId,
    optionValue,
    selectedOption,
    changeOption,
}: RadioOptionsProps): React.JSX.Element {
    return (
        <>
            <div
                className="rounded mb-2 p-3 radioptions"
                onClick={() => {
                    changeOption(optionValue);
                }}
            >
                <label
                    htmlFor={questionId}
                    className="d-flex justify-content-between"
                >
                    <input
                        type="radio"
                        name={questionId}
                        value={optionValue}
                        checked={selectedOption === optionValue}
                        onChange={(e) => changeOption(e.target.value)}
                    />
                    {optionValue}
                    <div className="optionshield rounded">
                        <div className="optionselected"></div>
                    </div>
                </label>
            </div>
        </>
    );
}

function Options({
    optionsArray,
    allowMultiple = false,
    questionId,
    cllbck,
}: OptionsProps): React.JSX.Element {
    const [selectedOption, setSelectedOption] = useState(questionId[1]);

    useEffect(() => {
        setSelectedOption(questionId[1]);
    }, [optionsArray, questionId]);

    function handleOptionChange(newSelectedOption: string) {
        setSelectedOption(newSelectedOption);
        cllbck(newSelectedOption);
    }

    return (
        <div className="options">
            {optionsArray.map((eachOption, idx) => (
                <RadioOptions
                    questionId={questionId[0]}
                    optionValue={eachOption}
                    selectedOption={selectedOption}
                    changeOption={handleOptionChange}
                    key={questionId[0] + idx}
                />
            ))}
        </div>
    );
}

export default Options;
