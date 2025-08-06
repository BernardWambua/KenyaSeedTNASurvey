/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import api from '../api';

function DepartmentDropdown({ value, onChange }) {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await api.get('/api/departments/');
        setDepartments(response.data);
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };

    fetchDepartments();
  }, []);

  return (
    <div className="select is-fullwidth">
      <select value={value} onChange={(e) => onChange(e.target.value)} required>
        <option value="">Select your department</option>
        {departments.map((department) => (
          <option key={department.id} value={department.id}>
            {department.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default DepartmentDropdown;
