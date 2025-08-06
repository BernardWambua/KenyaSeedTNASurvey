import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';  
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import api from '../api';

Chart.register(BarElement, ChartDataLabels, CategoryScale, LinearScale, Tooltip, Legend);

function SoftSkillCharts({ questionnaires }) {
    const [allSoftSkills, setAllSoftSkills] = useState([]);
    const [allEmployeeLevels, setAllEmployeeLevels] = useState([]);
    const [selectedEmployeeLevel, setSelectedEmployeeLevel] = useState('');
    console.log('Questionnaires:', questionnaires);
    // Fetch all responsibility levels on mount   
    useEffect(() => {   
        api.get('/api/responsibility-levels/')
            .then(res => setAllEmployeeLevels(res.data))
            .catch(() => setAllEmployeeLevels([]));
    }, []);

    // Fetch all soft skills for the selected employee level
    useEffect(() => {
        console.log('Selected Employee Level:', selectedEmployeeLevel);
        if (selectedEmployeeLevel) {
        api
            .get(`/api/soft-skills/?responsibilitylevel=${selectedEmployeeLevel}`)
            .then((res) => setAllSoftSkills(res.data))
            .catch(() => setAllSoftSkills([]));
            console.log('Soft skills fetched:', allSoftSkills);
        } else {
            setAllSoftSkills([]);
        }
    }, [selectedEmployeeLevel]);

    // Convert select values to numbers for comparison
    const empLevelId = Number(selectedEmployeeLevel) || '';

    // If employee level is selected, show skill counts as before
    let chartData;
    if (selectedEmployeeLevel) {
    // Flatten only soft skills for the selected filters
    const allSkills = [];
    questionnaires.forEach((q) => {
      if (
        (!empLevelId || q.employeelevel === empLevelId)
      ) {
        (q.softskill_entries || []).forEach((skill) => {
          allSkills.push({
            SkillName: skill.softskill_name || skill.softskill,
          });
        });
      }
    });

    // Group by SkillName, count occurrences
    const skillCounts = {};
    allSkills.forEach((s) => {
      skillCounts[s.SkillName] = (skillCounts[s.SkillName] || 0) + 1;
    });
    console.log('Skill Counts:', skillCounts);
    // Use allSoftSkills for x-axis, fill zero if missing
    const skillLabels = allSoftSkills.map((skill) => skill.name);
    chartData = {
      labels: skillLabels,
      datasets: [
        {
          label: 'Soft Skill Count',
          data: skillLabels.map((name) => skillCounts[name] || 0),
          backgroundColor: '#FF8416',
        },
      ],
    };
  }

  // Calculate total responses for the selected employee level
  const totalResponses = questionnaires.filter(
    q => Number(q.employeelevel) === empLevelId
  ).length;

  return (
    <div>
      <h1 className="title is-4">Soft Skill Analysis</h1>
      <div className="field is-grouped mb-4">
        
        <div className="control">
          <div className="select">
            <select
              value={selectedEmployeeLevel}
              onChange={e => setSelectedEmployeeLevel(e.target.value)}
            >
              <option value="">Select Employee Level</option>
              {allEmployeeLevels.map((level) => (
                <option key={level.id} value={level.id}>
                  {level.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        {selectedEmployeeLevel && (
          <div className="control" style={{ marginLeft: '1rem', alignSelf: 'center' }}>
            <span className="has-text-weight-semibold">
              Total Responses: {totalResponses}
            </span>
          </div>
        )}
      </div>
      {/* Show chart if employee level is selected */}
      {selectedEmployeeLevel && chartData && (
        <Bar
          data={chartData}
          options={{
            plugins: {
              legend: { display: false },
              datalabels: {
                anchor: 'end',
                align: 'top',
                color: '#222',
                font: { weight: 'bold' },
                formatter: Math.round,
              },
            },
            responsive: true,
            scales: { x: { stacked: false }, y: { beginAtZero: true, stacked: false } },
          }}
        />
      )}
    </div>
  );
}

export default SoftSkillCharts;