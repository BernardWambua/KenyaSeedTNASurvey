import { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

Chart.register(BarElement, ChartDataLabels, CategoryScale, LinearScale, Tooltip, Legend);

function Charts({ questionnaires }) {
  const [selectedDept, setSelectedDept] = useState(null);
  const [view, setView] = useState('department'); // department | employeelevel | gender | agegroup | serviceagegroup

  // Count per department
  const departmentCounts = {};
  questionnaires.forEach(q => {
    if (q.department_name) {
      departmentCounts[q.department_name] = (departmentCounts[q.department_name] || 0) + 1;
    }
  });

  // Count per employee level
  const employeeLevelCounts = {};
  questionnaires.forEach(q => {
    if (q.employeelevel_name) {
      employeeLevelCounts[q.employeelevel_name] = (employeeLevelCounts[q.employeelevel_name] || 0) + 1;
    }
  });

  // Count per gender
  const genderCounts = {};
  questionnaires.forEach(q => {
    if (q.gender_name) {
      genderCounts[q.gender_name] = (genderCounts[q.gender_name] || 0) + 1;
    }
  });

  // Count per age group
  const ageGroupCounts = {};
  questionnaires.forEach(q => {
    if (q.agegroup_name) {
      ageGroupCounts[q.agegroup_name] = (ageGroupCounts[q.agegroup_name] || 0) + 1;
    }
  });

  // Count per years of service (service age group)
  const serviceAgeGroupCounts = {};
  questionnaires.forEach(q => {
    if (q.serviceagegroup_name) {
      serviceAgeGroupCounts[q.serviceagegroup_name] = (serviceAgeGroupCounts[q.serviceagegroup_name] || 0) + 1;
    }
  });

  // Prepare chart data for each view
  const departmentData = {
    labels: Object.keys(departmentCounts),
    datasets: [
      {
        label: 'Count per Department',
        data: Object.values(departmentCounts),
        backgroundColor: '#6f42c1',
      },
    ],
  };

  const employeeLevelData = {
    labels: Object.keys(employeeLevelCounts),
    datasets: [
      {
        label: 'Count per Employee Level',
        data: Object.values(employeeLevelCounts),
        backgroundColor: '#17a2b8',
      },
    ],
  };

  const genderData = {
    labels: Object.keys(genderCounts),
    datasets: [
      {
        label: 'Count per Gender',
        data: Object.values(genderCounts),
        backgroundColor: '#FF8416',
      },
    ],
  };

  const ageGroupData = {
    labels: Object.keys(ageGroupCounts),
    datasets: [
      {
        label: 'Count per Age Group',
        data: Object.values(ageGroupCounts),
        backgroundColor: '#28a745',
      },
    ],
  };

  const serviceAgeGroupData = {
    labels: Object.keys(serviceAgeGroupCounts),
    datasets: [
      {
        label: 'Count per Years of Service',
        data: Object.values(serviceAgeGroupCounts),
        backgroundColor: '#007bff',
      },
    ],
  };

  // Filter questionnaires for selected department
  const filteredQuestionnaires = selectedDept
    ? questionnaires.filter(q => q.department_name === selectedDept)
    : [];

  // Count per division for selected department
  const divisionCounts = {};
  filteredQuestionnaires.forEach(q => {
    if (q.division_name) {
      divisionCounts[q.division_name] = (divisionCounts[q.division_name] || 0) + 1;
    }
  });

  const divisionData = {
    labels: Object.keys(divisionCounts),
    datasets: [
      {
        label: `Count per Division in ${selectedDept}`,
        data: Object.values(divisionCounts),
        backgroundColor: '#FF8416',
      },
    ],
  };

  // Handle department bar click
  const onDeptBarClick = (elems) => {
    if (elems.length > 0) {
      const idx = elems[0].index;
      const dept = departmentData.labels[idx];
      setSelectedDept(dept);
    }
  };

  // Calculate total responses
  const totalResponses = questionnaires.length;

  // Select chart data and title based on view
  let chartData = departmentData;
  let chartTitle = 'By Department';
  if (view === 'employeelevel') {
    chartData = employeeLevelData;
    chartTitle = 'By Supervisory Responsibility';
  } else if (view === 'gender') {
    chartData = genderData;
    chartTitle = 'By Gender';
  } else if (view === 'agegroup') {
    chartData = ageGroupData;
    chartTitle = 'By Age Group';
  } else if (view === 'serviceagegroup') {
    chartData = serviceAgeGroupData;
    chartTitle = 'By Years of Service';
  }

  return (
    <div>
      <h1 className="title is-4">Responses Analysis</h1>
      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 className="subtitle is-6" style={{ marginBottom: 0 }}>{chartTitle}</h2>
            <div className="select is-small" style={{ marginTop: 4 }}>
              <select value={view} onChange={e => { setView(e.target.value); setSelectedDept(null); }}>
                <option value="department">By Department</option>
                <option value="employeelevel">By Responsibility Level</option>
                <option value="gender">By Gender</option>
                <option value="agegroup">By Age Group</option>
                <option value="serviceagegroup">By Years of Service</option>
              </select>
            </div>
          </div>
          <span className="has-text-weight-semibold">Total Responses: {totalResponses}</span>
        </div>
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
            onClick: view === 'department' ? (evt, elems) => onDeptBarClick(elems) : undefined,
          }}
        />
      </div>
      {view === 'department' && selectedDept && (
        <div style={{ maxWidth: 600, margin: '2rem auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 className="subtitle is-6">Divisions in {selectedDept}</h2>
            <button className="button is-small" onClick={() => setSelectedDept(null)}>Back</button>
          </div>
          <Bar data={divisionData} options={{ plugins: { legend: { display: false } } }} />
        </div>
      )}
    </div>
  );
}

export default Charts;