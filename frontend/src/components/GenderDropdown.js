/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import api from '../api';

function GenderDropdown({ value, onChange }) {
  const [genders, setGenders] = useState([]);

  useEffect(() => {
    const fetchGenders = async () => {
      try {
        const response = await api.get('/api/genders/');
        setGenders(response.data);
      } catch (error) {
        console.error('Error fetching genders:', error);
      }
    };

    fetchGenders();
  }, []);

  return (
    <div className="select is-fullwidth">
      <select value={value} onChange={(e) => onChange(e.target.value)} required>
        <option value="">Select your gender</option>
        {genders.map((gender) => (  
          <option key={gender.id} value={gender.id}>
            {gender.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default GenderDropdown;
