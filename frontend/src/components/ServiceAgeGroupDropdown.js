/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import api from '../api';

function ServiceAgeGroupDropdown({ value, onChange }) {
  const [serviceAgeGroups, setServiceAgeGroups] = useState([]);

  useEffect(() => {
    const fetchServiceAgeGroups = async () => {
      try {
        const response = await api.get('/api/service-age-groups/');
        setServiceAgeGroups(response.data);
      } catch (error) {
        console.error('Error fetching service age groups:', error);
      }
    };

    fetchServiceAgeGroups();
  }, []);

  return (
    <div className="select is-fullwidth">
      <select value={value} onChange={(e) => onChange(e.target.value)} required>
        <option value="">Select your years of service</option>
        {serviceAgeGroups.map((serviceAgeGroup) => (
          <option key={serviceAgeGroup.id} value={serviceAgeGroup.id}>
            {serviceAgeGroup.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ServiceAgeGroupDropdown;
