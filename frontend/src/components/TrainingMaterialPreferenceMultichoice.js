import React, { useState, useEffect } from 'react';
import api from '../api';

function TrainingMaterialPreferenceMultichoice({ value = [], onChange }) {
  const [selected, setSelected] = useState([]);
  const [materialTypeChoices, setMaterialTypeChoices] = useState([]);

  useEffect(() => {
    api.get('/api/training-material-preferences/')
      .then(response => setMaterialTypeChoices(response.data))
      .catch(error => console.error('Error fetching material preferences:', error));
  }, []);

  useEffect(() => {
    setSelected(value || []);
  }, [value]);

  const handleChange = (id) => {
    let updated;
    if (selected.includes(id)) {
      updated = selected.filter(item => item !== id);
    } else {
      updated = [...selected, id];
    }
    setSelected(updated);
    onChange && onChange(updated);
  };

  return (
    <div>
      <label>
        14. <b>How do you prefer to receive training materials? (Select all that apply)</b>
      </label>
      <div style={{ marginTop: 10 }}>
        {materialTypeChoices.map(option => (
          <label key={option.id} style={{ display: 'block', marginBottom: 8 }}>
            <input
              type="checkbox"
              value={option.id}
              checked={selected.includes(option.id)}
              onChange={() => handleChange(option.id)}
            />
            {' '}{option.name_display}
          </label>
        ))}
      </div>
    </div>
  );
}

export default TrainingMaterialPreferenceMultichoice;
