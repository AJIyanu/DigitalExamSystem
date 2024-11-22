import { useState, useEffect } from 'react';

function RadioOptions({
    questionId,
    optionValue,
    selectedOption,
    changeOption,
}) {
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
    optionsArray = [],
    allowMultiple = false,
    questionId,
    cllbck,
}) {
    const [selectedOption, setSelectedOption] = useState(questionId[1]);

    useEffect(() => {
        setSelectedOption(questionId[1]);
    }, [optionsArray, questionId]);

    function handleOptionChange(newSelectedOption) {
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
