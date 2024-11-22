import { useState, useEffect } from 'react';

function RadioOptions({
    questionId,
    optionValue,
    selectedOption,
    changeOption,
}) {
    return (
        <>
            <div className="rounded setborder mb-2 p-3 d-flex justify-content-spacebetween">
                <input
                    type="radio"
                    name={questionId}
                    value={optionValue}
                    checked={selectedOption === optionValue}
                    onChange={(e) => changeOption(e.target.value)}
                />
                <label for={questionId}>{optionValue}</label>
                <div>
                    <div>A</div>
                </div>
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
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                marginLeft: '50px',
            }}
        >
            {optionsArray.map((eachOption, idx) => (
                <RadioOptions
                    className="gx-3[]"
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
