/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import api from '../api';

function JobTypeDropdown({ value, onChange, divisionId }) {
  const [jobtypes, setJobTypes] = useState([]);

  const fetchJobTypes = async () => {
    try {
      const response = await api.get(`/api/job-functions/?division=${divisionId}`);
      setJobTypes(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching job types:', error);
      setJobTypes([]);
    }
  };

  useEffect(() => {
    if (divisionId) {
      fetchJobTypes();
    } else {
      setJobTypes([]);
    }
  }, [divisionId]);

  return (
    <div className="select is-fullwidth">
      <select value={value} onChange={(e) => onChange(e.target.value)} required>
        <option value="">Select your job function</option>
        {jobtypes.map((jobtype) => (
          <option key={jobtype.id} value={jobtype.id}>
            {jobtype.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default JobTypeDropdown;
