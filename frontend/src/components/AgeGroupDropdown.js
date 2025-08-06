/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import api from '../api';

function AgeGroupDropdown({ value, onChange }) {
  const [ageGroups, setAgeGroups] = useState([]);

  useEffect(() => {
    const fetchAgeGroups = async () => {
      try {
        const response = await api.get('/api/age-groups/');
        setAgeGroups(response.data);
      } catch (error) {
        console.error('Error fetching age groups:', error);
      }
    };

    fetchAgeGroups();
  }, []);

  return (
    <div className="select is-fullwidth">
      <select value={value} onChange={(e) => onChange(e.target.value)} required>
        <option value="">Select your age group</option>
        {ageGroups.map((ageGroup) => (  
          <option key={ageGroup.id} value={ageGroup.id}>
            {ageGroup.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default AgeGroupDropdown;
