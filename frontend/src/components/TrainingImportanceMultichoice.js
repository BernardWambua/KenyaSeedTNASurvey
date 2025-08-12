import React, { useState } from 'react';

const TRAINING_TYPE_CHOICES = [
    { value: 'technical', label: 'Technical training' },
    { value: 'soft', label: 'Soft skills training' },
    { value: 'compliance', label: 'Compliance training' },
    { value: 'leadership', label: 'Leadership training' },
];

function TrainingImportanceMultichoice({ value = [], onChange }) {
    const [selected, setSelected] = useState(value);

    const handleChange = (type) => {
        let updated;
        if (selected.includes(type)) {
            updated = selected.filter(item => item !== type);
        } else {
            updated = [...selected, type];
        }
        setSelected(updated);
        onChange && onChange(updated);
    };

    return (
        <div>
            <label><b>What type of training do you feel is most important for your job? (Select all that apply)</b></label>
            <div style={{ marginTop: 10 }}>
                {TRAINING_TYPE_CHOICES.map(option => (
                    <label key={option.value} style={{ display: 'block', marginBottom: 8 }}>
                        <input
                            type="checkbox"
                            value={option.value}
                            checked={selected.includes(option.value)}
                            onChange={() => handleChange(option.value)}
                        />
                        {' '}{option.label}
                    </label>
                ))}
            </div>
        </div>
    );
}

export default TrainingImportanceMultichoice;