/* eslint-disable react/prop-types */
import { useState } from 'react';
import api from '../api';
import GenderDropdown from './GenderDropdown';
import ServiceAgeGroupDropdown from './ServiceAgeGroupDropdown';
import AgeGroupDropdown from './AgeGroupDropdown';
import EmployeeLevelDropdown from './EmployeeLevelDropdown';
import DepartmentDropdown from './DepartmentDropdown';
import DivisionDropdown from './DivisionDropdown';
import SoftSkillsMultichoice from './SoftSkillsMultichoice';
import TechnicalSkillsMultichoice from './TechnicalSkillsMultichoice';
import JobTypeDropdown from './JobTypeDropdown';
function QuestionnaireForm() {
  const [formData, setFormData] = useState({
    employeename: '',
    staffno: '',
    region: '',
    gender: '',
    agegroup: '',
    serviceagegroup: '',
    employeelevel: '',
    department: '',
    division: '',
    jobfunction: '',
    softskills: {},
    technicalskills: {},
    id: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // First create the questionnaire
      const questionnaireResponse = await api.post('/api/questionnaire/', {
        name: formData.employeename,
        staffno: formData.staffno,
        gender: formData.gender,
        agegroup: formData.agegroup,
        serviceagegroup: formData.serviceagegroup,
        responsibilitylevel: formData.employeelevel,
        department: formData.department,
        division: formData.division,
        jobfunction: formData.jobfunction
      });

      // Axios automatically throws for non-200 status codes, so if we get here, the request was successful
      const questionnaireData = questionnaireResponse.data;

      // Then create the soft skills entries with the new questionnaire ID
      const softSkillsEntries = Object.entries(formData.softskills).map(([skillId, skillData]) => 
        api.post('/api/questionnaire-soft-skills/', {
          questionnaire: questionnaireData.id,
          softskill: skillId,
          trained: skillData.trained,
          modeofdelivery: skillData.modeofdelivery,
          skillproficiency: skillData.skillproficiency

        })
      );
      
      if (softSkillsEntries.length > 0) {
        await Promise.all(softSkillsEntries);
      }

      // Then create the technical skills entries with the new questionnaire ID
      const technicalSkillsEntries = Object.entries(formData.technicalskills).map(([skillId, skillData]) => 
        api.post('/api/questionnaire-technical-skills/', {
          questionnaire: questionnaireData.id,
          technicalskill: skillId,
          trained: skillData.trained,
          modeofdelivery: skillData.modeofdelivery,
          skillproficiency: skillData.skillproficiency
        })
      );

      if (technicalSkillsEntries.length > 0) {
        await Promise.all(technicalSkillsEntries);
      }

      

      alert('Form submitted successfully!');
      setFormData({
        employeename: '',
        staffno: '',
        gender: '',
        agegroup: '',
        serviceagegroup: '',
        employeelevel: '',
        department: '',
        division: '',
        jobfunction: '',
        softskills: {},
        technicalskills: {},
        id: ''
      });
    } catch (error) {
      console.error('Error:', error);
      alert('Error submitting form: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="box">
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label" style={{ backgroundColor: 'darkgreen' }}>
            Please set aside some time to respond to this survey as 
            accurately and honestly as possible. This information will 
            help Kenya Seed Company Ltd to deliver the best learning and 
            development interventions to meet your specific needs.
          </label>
          <label className="label" style={{ backgroundColor: 'darkgreen' }}>The results of this entire survey are confidential.</label>
        </div>
        <div className="field">
          <label className="label">Please enter your staff number</label>
          <div className="control">
            <input 
              className="input" 
              type="number" 
              name="staffno"
              value={formData.staffno}
              onChange={handleInputChange}
              placeholder="Staff number"
              required
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Please enter your name</label>
          <div className="control">
            <input 
              className="input" 
              type="text" 
              name="employeename"
              value={formData.employeename}
              onChange={handleInputChange}
              placeholder="Name"
              required
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Please select your gender</label>
          <div className="control">
            <GenderDropdown 
              value={formData.gender}
              onChange={(value) => setFormData(prev => ({ ...prev, gender: value }))}
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Please select your age group</label>
          <div className="control">
            <AgeGroupDropdown 
              value={formData.agegroup}
              onChange={(value) => setFormData(prev => ({ ...prev, agegroup: value }))}
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Please indicate how long you have worked at Kenya Seed Ltd</label>
          <div className="control">
            <ServiceAgeGroupDropdown 
              value={formData.serviceagegroup}
              onChange={(value) => setFormData(prev => ({ ...prev, serviceagegroup: value }))}
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Please select your responsibility level</label>
          <div className="control">
            <EmployeeLevelDropdown 
              value={formData.employeelevel}
              onChange={(value) => setFormData(prev => ({ ...prev, employeelevel: value }))}
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Please select your department</label>
          <div className="control">
            <DepartmentDropdown 
              value={formData.department}
              onChange={(value) => {
                setFormData(prev => ({ 
                  ...prev, 
                  department: value,
                  division: '' // Clear division when department changes
                }));
              }}
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Please select your division</label>
          <div className="control">
            <DivisionDropdown 
              value={formData.division}
              onChange={(value) => setFormData(prev => ({ ...prev, division: value }))}
              departmentId={formData.department}
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Please select your job function</label>
          <div className="control">
            <JobTypeDropdown 
              value={formData.jobfunction}
              onChange={(value) => setFormData(prev => ({ ...prev, jobfunction: value }))}
              divisionId={formData.division}
            />
          </div>
        </div>

        <div className="field">
          <label className="label">To help us understand your technical development and training needs, please select the training and development that you have received at Kenya Seed Company in the last two years from the list below: </label>
        </div>

        <div className="field">
          <div className="control">
            <TechnicalSkillsMultichoice
              value={formData.technicalskills}
              onChange={(value) => setFormData(prev => ({ ...prev, technicalskills: value }))}
              jobfunctionId={formData.jobfunction}
              questionnaireId={formData.id}
            />
          </div>
        </div>

        <div className="field">
          <div className="control">
            <SoftSkillsMultichoice 
              value={formData.softskills}
              onChange={(value) => setFormData(prev => ({ ...prev, softskills: value }))}
              employeelevelId={formData.employeelevel}
              questionnaireId={formData.id}
            />
          </div>
        </div>

        

        <div className="field is-grouped">
          <div className="control">
            <button type="submit" className="button is-link">Submit</button>
          </div>
          <div className="control">
            <button type="button" className="button is-text" onClick={() => setFormData({
              employeename: '',
              staffno: '',
              gender: '',
              agegroup: '',
              serviceagegroup: '',
              employeelevel: '',
              department: '',
              division: '',
              jobfunction: '',
              softskills: {},
              technicalskills: {},
              id: ''
            })}>Cancel</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default QuestionnaireForm;
