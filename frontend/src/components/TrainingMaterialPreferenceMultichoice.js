import React, { useState, useEffect } from 'react';

// You may want to fetch these from your backend, but for now, hardcode to match your model
const MATERIAL_TYPE_CHOICES = [
    { value: 'handouts', label: 'Handouts' },
    { value: 'digital', label: 'Digital copies (e.g. PDFs, ebooks)' },
    { value: 'videos', label: 'Videos' },
    { value: 'audio', label: 'Audio recordings' },
];

function TrainingMaterialPreferenceMultichoice({ value = [], onChange }) {
    const [selected, setSelected] = useState(value);

    useEffect(() => {
        setSelected(value);
    }, [value]);

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
            <label>14. <b>How do you prefer to receive training materials? (Select all that apply)</b></label>
            <div style={{ marginTop: 10 }}>
                {MATERIAL_TYPE_CHOICES.map(option => (
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

export default TrainingMaterialPreferenceMultichoice;