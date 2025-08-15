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
import TrainingImportanceMultichoice from './TrainingImportanceMultichoice';
import TrainingMaterialPreferenceMultichoice from './TrainingMaterialPreferenceMultichoice';

const TRAINING_LOCATION_CHOICES = [
  { value: '', label: 'Select location' },
  { value: 'onsite', label: 'On-site (At your workstation)' },
  { value: 'offsite', label: 'Off-site (away from your workstation)' },
  { value: 'hybrid', label: 'Hybrid (both on-site and off-site)' },
];

const TRAINING_METHOD_CHOICES = [
  { value: '', label: 'Select method' },
  { value: 'classroom', label: 'Instructor-led classroom training' },
  { value: 'selfpaced', label: 'Self-paced online courses' },
  { value: 'webinar', label: 'Webinars' },
  { value: 'onthejob', label: 'On-the-job training' },
];

const TRAINING_EFFECTIVENESS_CHOICES = [
  { value: '', label: 'Select effectiveness' },
  { value: 'very_effective', label: 'Very effective' },
  { value: 'somewhat_effective', label: 'Somewhat effective' },
  { value: 'not_very_effective', label: 'Not very effective' },
  { value: 'not_at_all_effective', label: 'Not at all effective' },
];

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
    trainingimportance: [],
    trainingmaterialpreferences: [],
    traininglocation: '',
    training_method_preference: '',
    training_effectiveness: '',
    improvement_suggestions: '',
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
        jobfunction: formData.jobfunction,
        trainingimportance: formData.trainingimportance,
        trainingmaterialpreferences: formData.trainingmaterialpreferences,
        traininglocation: formData.traininglocation,
        training_method_preference: formData.training_method_preference,
        training_effectiveness: formData.training_effectiveness,
        improvement_suggestions: formData.improvement_suggestions
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

      // After creating the questionnaire and before alert('Form submitted successfully!')
      const trainingImportanceEntries = formData.trainingimportance.map(type =>
        api.post('/api/training-importances/', {
          questionnaire: questionnaireData.id,
          training_type: type
        })
      );
      if (trainingImportanceEntries.length > 0) {
        await Promise.all(trainingImportanceEntries);
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
        trainingimportance: [],
        trainingmaterialpreferences: [],
        traininglocation: '',
        training_method_preference: '',
        training_effectiveness: '',
        improvement_suggestions: '',
        id: ''
      });
    } catch (error) {
      if (error.response && error.response.data) {
      const messages = Object.entries(error.response.data)
        .map(([field, msgs]) => `${field}: ${Array.isArray(msgs) ? msgs.join(', ') : msgs}`)
        .join(' | ');
      alert(messages);
    } else {
      alert('An unexpected error occurred. Please try again.');
    }
    }
  };

  return (
    <div className="box has-background-secondary">
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label" style={{ backgroundColor: 'darkgreen', color: 'yellow' }}>
            Please set aside some time to respond to this survey as 
            accurately and honestly as possible. This information will 
            help Kenya Seed Company Ltd to deliver the best learning and 
            development interventions to meet your specific needs.
          </label>
          <label className="label" style={{ backgroundColor: 'darkgreen', color: 'yellow' }}>The results of this entire survey are confidential.</label>
        </div>
          <div className="field">
            <label className="label">1. Please enter your staff number</label>
            <div className="control">
              <input 
                className="input" 
                type="text" 
                name="staffno"
                value={formData.staffno}
                onChange={handleInputChange}
                placeholder="Staff number"
                required
              />
            </div>
          </div>

          <div className="field">
            <label className="label">2. Please enter your name</label>
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
            <label className="label">3. Please select your gender</label>
            <div className="control">
              <GenderDropdown 
                value={formData.gender}
                onChange={(value) => setFormData(prev => ({ ...prev, gender: value }))}
              />
            </div>
          </div>

          <div className="field">
            <label className="label">4. Please select your age group</label>
            <div className="control">
              <AgeGroupDropdown 
                value={formData.agegroup}
                onChange={(value) => setFormData(prev => ({ ...prev, agegroup: value }))}
              />
            </div>
          </div>
          
          <div className="field">
            <label className="label">5. Please indicate how long you have worked at Kenya Seed Ltd</label>
            <div className="control">
              <ServiceAgeGroupDropdown 
                value={formData.serviceagegroup}
                onChange={(value) => setFormData(prev => ({ ...prev, serviceagegroup: value }))}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">6. Please select your responsibility level</label>
            <div className="control">
              <EmployeeLevelDropdown 
                value={formData.employeelevel}
                onChange={(value) => setFormData(prev => ({ ...prev, employeelevel: value }))}
              />
            </div>
          </div>

          <div className="field">
            <label className="label">7. Please select your department</label>
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
            <label className="label">8. Please select your division</label>
            <div className="control">
              <DivisionDropdown 
                value={formData.division}
                onChange={(value) => setFormData(prev => ({ ...prev, division: value }))}
                departmentId={formData.department}
              />
            </div>
          </div>

          <div className="field">
            <label className="label">9. Please select your job function</label>
            <div className="control">
              <JobTypeDropdown 
                value={formData.jobfunction}
                onChange={(value) => setFormData(prev => ({ ...prev, jobfunction: value }))}
                divisionId={formData.division}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">10. To help us understand your technical development and training needs, please select the training and development that you have received at Kenya Seed Company in the last two years from the list below: </label>
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

            <div className="field">
              <label className="label">11. Please select your preferred training location</label>
              <div className="control">
                <select
                  className="input"
                  value={formData.traininglocation}
                  onChange={e => setFormData(prev => ({ ...prev, traininglocation: e.target.value }))}
                  required
                >
                  {TRAINING_LOCATION_CHOICES.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="field">
              <div className="control">
                <TrainingImportanceMultichoice
                  value={formData.trainingimportance}
                  onChange={value => setFormData(prev => ({ ...prev, trainingimportance: value }))}
                />
              </div>
            </div>

            <div className="field">
              <label className="label">13. Which method of training do you prefer?</label>
              <div className="control">
                <select
                  className="input"
                  value={formData.training_method_preference}
                  onChange={e => setFormData(prev => ({ ...prev, training_method_preference: e.target.value }))}
                  required
                >
                  {TRAINING_METHOD_CHOICES.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="field">
              <div className="control">
                <TrainingMaterialPreferenceMultichoice
                  value={formData.trainingmaterialpreferences}
                  onChange={value => setFormData(prev => ({ ...prev, trainingmaterialpreferences: value }))}
                />    
              </div>
            </div>


            <div className="field">
              <label className="label">15. How would you rate the effectiveness of the training programs you have participated in?</label>
              <div className="control">
                <select
                  className="input"
                  value={formData.training_effectiveness}
                  onChange={e => setFormData(prev => ({ ...prev, training_effectiveness: e.target.value }))}
                  required
                >
                  {TRAINING_EFFECTIVENESS_CHOICES.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="field">
              <label className="label">16. What improvements do you suggest to make the training programs more effective?</label>
              <div className="control">
                <textarea
                  className="textarea"
                  value={formData.improvement_suggestions}
                  onChange={e => setFormData(prev => ({ ...prev, improvement_suggestions: e.target.value }))}
                  placeholder="Your suggestions..."
                  rows={3}
                  required
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
              trainingimportance: [],
              traininglocation: '',
              training_method_preference: '',
              training_effectiveness: '',
              improvement_suggestions: '',
              id: ''
            })}>Cancel</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default QuestionnaireForm;
