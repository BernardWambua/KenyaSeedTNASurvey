import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import api from '../api';

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function SkillBarCharts({ questionnaires }) {
  const [departments, setDepartments] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [jobTypes, setJobTypes] = useState([]);
  const [allTechnicalSkills, setAllTechnicalSkills] = useState([]);

  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedDivision, setSelectedDivision] = useState('');
  const [selectedJobType, setSelectedJobType] = useState('');

  // Fetch all departments on mount
  useEffect(() => {
    api.get('/api/departments/')
      .then(res => setDepartments(res.data))
      .catch(() => setDepartments([]));
  }, []);

  // Fetch divisions when department changes
  useEffect(() => {
    if (selectedDepartment) {
      api.get(`/api/divisions/?department=${selectedDepartment}`)
        .then(res => setDivisions(res.data))
        .catch(() => setDivisions([]));
      setSelectedDivision('');
      setSelectedJobType('');
      setJobTypes([]);
    } else {
      setDivisions([]);
      setSelectedDivision('');
      setSelectedJobType('');
      setJobTypes([]);
    }
  }, [selectedDepartment]);

  // Fetch job types when division changes
  useEffect(() => {
    if (selectedDivision) {
      api.get(`/api/job-types/?division=${selectedDivision}`)
        .then(res => setJobTypes(res.data))
        .catch(() => setJobTypes([]));
      setSelectedJobType('');
    } else {
      setJobTypes([]);
      setSelectedJobType('');
    }
  }, [selectedDivision]);

  // Fetch all technical skills for the selected jobtype
  useEffect(() => {
    if (selectedJobType) {
      api
        .get(`/api/technical-skills/?jobfunction=${selectedJobType}`)
        .then((res) => setAllTechnicalSkills(res.data))
        .catch(() => setAllTechnicalSkills([]));
    } else {
      setAllTechnicalSkills([]);
    }
  }, [selectedJobType]);

  // Convert select values to numbers for comparison
  const depId = Number(selectedDepartment) || '';
  const divId = Number(selectedDivision) || '';
  const jobId = Number(selectedJobType) || '';

  // If jobtype is selected, show skill counts as before
  let chartData;
  if (selectedDivision && selectedJobType) {
    // Flatten only technical skills for the selected filters
    const allSkills = [];
    questionnaires.forEach((q) => {
      if (
        (!depId || q.department === depId) &&
        (!divId || q.division === divId) &&
        (!jobId || q.jobtype === jobId)
      ) {
        (q.technicalskill_entries || []).forEach((skill) => {
          allSkills.push({
            SkillName: skill.technicalskill_name || skill.technicalskill,
          });
        });
      }
    });

    // Group by SkillName, count occurrences
    const skillCounts = {};
    allSkills.forEach((s) => {
      skillCounts[s.SkillName] = (skillCounts[s.SkillName] || 0) + 1;
    });

    // Use allTechnicalSkills for x-axis, fill zero if missing
    const skillLabels = allTechnicalSkills.map((skill) => skill.name);
    chartData = {
      labels: skillLabels,
      datasets: [
        {
          label: 'Technical Skill Count',
          data: skillLabels.map((name) => skillCounts[name] || 0),
          backgroundColor: '#6c757d',
        },
      ],
    };
  }

  return (
    <div>
      <h1 className="title is-4">Technical Skill Analysis</h1>
      <div className="field is-grouped mb-4">
        <div className="control">
          <div className="select">
            <select
              value={selectedDepartment}
              onChange={e => setSelectedDepartment(e.target.value)}
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="control">
          <div className="select">
            <select
              value={selectedDivision}
              onChange={e => setSelectedDivision(e.target.value)}
              disabled={!selectedDepartment}
            >
              <option value="">Select Division</option>
              {divisions.map((div) => (
                <option key={div.id} value={div.id}>
                  {div.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="control">
          <div className="select">
            <select
              value={selectedJobType}
              onChange={e => setSelectedJobType(e.target.value)}
              disabled={!selectedDivision}
            >
              <option value="">Select Job Type</option>
              {jobTypes.map((job) => (
                <option key={job.id} value={job.id}>
                  {job.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      {/* Show chart if division is selected */}
      {selectedDivision && chartData && (
        <Bar
          data={chartData}
          options={{
            plugins: { legend: { display: false } },
            responsive: true,
            scales: { x: { stacked: false }, y: { beginAtZero: true, stacked: false } },
          }}
        />
      )}
    </div>
  );
}

export default SkillBarCharts;