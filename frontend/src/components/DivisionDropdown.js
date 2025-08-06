/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import api from '../api';

function DivisionDropdown({ value, onChange, departmentId }) {
  const [divisions, setDivisions] = useState([]);

  const fetchDivisions = async () => {
    try {
      const response = await api.get(`/api/divisions/?department=${departmentId}`);
      setDivisions(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching divisions:', error);
      setDivisions([]);
    }
  };

  useEffect(() => {
    if (departmentId) {
      fetchDivisions();
    } else {
      setDivisions([]);
    }
  }, [departmentId]);

  return (
    <div className="select is-fullwidth">
      <select value={value} onChange={(e) => onChange(e.target.value)} required>
        <option value="">Select your division</option>
        {divisions.map((division) => (
          <option key={division.id} value={division.id}>
            {division.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default DivisionDropdown;
