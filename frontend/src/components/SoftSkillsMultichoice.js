import { useState, useEffect } from 'react';
import SkillOptions from './SkillOptions';
import api from '../api';

function SoftSkillsMultichoice({ value, onChange, employeelevelId }) {
    const [softSkills, setSoftSkills] = useState([]);
    const [selectedSoftSkills, setSelectedSoftSkills] = useState({});
    const [skillProficiency, setSkillProficiency] = useState({});
    const [modeOfDeliveryOptions, setModeOfDeliveryOptions] = useState([]);

    useEffect(() => {
        api.get('/api/delivery-modes')
            .then(response => setModeOfDeliveryOptions(response.data))
            .catch(error => console.error('Error fetching delivery modes:', error));
    }, []);

    useEffect(() => {
        api.get('/api/skill-proficiency')
            .then(response => setSkillProficiency(response.data))
            .catch(error => console.error('Error fetching skill proficiency:', error));
    }, []);

    const handleSoftSkillChange = (skillId, isChecked) => {
        if (isChecked) {
            // Add the skill with empty mode of delivery
            const newSelectedSkills = {
                ...selectedSoftSkills,
                [skillId]: {
                    trained: 'Yes',
                    modeofdelivery: ''
                }
            };
            setSelectedSoftSkills(newSelectedSkills);
            onChange(newSelectedSkills);
        } else {
            // Remove the skill
            const newSelectedSkills = { ...selectedSoftSkills };
            delete newSelectedSkills[skillId];
            setSelectedSoftSkills(newSelectedSkills);
            onChange(newSelectedSkills);
        }
    };

    const handleModeOfDeliveryChange = (skillId, value) => {
        const newSelectedSkills = {
            ...selectedSoftSkills,
            [skillId]: {
                ...selectedSoftSkills[skillId],
                modeofdelivery: value
            }
        };
        setSelectedSoftSkills(newSelectedSkills);
        onChange(newSelectedSkills);
    };
    const handleSkillProficiencyChange = (skillId, value) => {
    const newSelectedSkills = {
        ...selectedSoftSkills,
        [skillId]: {
            ...selectedSoftSkills[skillId],
            skillproficiency: value
        }
    };
    setSelectedSoftSkills(newSelectedSkills);
    onChange(newSelectedSkills);
    };

    const isOptionSelected = (skillId) => {
        const skill = selectedSoftSkills[skillId];
        return skill && skill.modeofdelivery;
    };

    useEffect(() => {
        // Always fetch soft skills based on employee level
        api.get(`/api/soft-skills/?responsibilitylevel=${employeelevelId}`)
            .then(response => setSoftSkills(response.data))
            .catch(error => console.error('Error fetching soft skills:', error));
    }, [employeelevelId]);

    return (
        <div className="soft-skills-container">
            <h1 className="soft-skills-title">b. Non-Technical (Soft) Skills Development</h1>
            <div className="soft-skills-list">
                {softSkills.map(skill => (
                    <div key={skill.id} className="soft-skill-item">
                        <div className="skill-selection">
                            <input 
                                type="checkbox" 
                                value={skill.id} 
                                checked={skill.id in selectedSoftSkills} 
                                onChange={(e) => handleSoftSkillChange(skill.id, e.target.checked)} 
                                className="skill-checkbox"
                            />
                            <span className="skill-name">{skill.name}</span>
                        </div>
                            {skill.id in selectedSoftSkills && (
                            <SkillOptions
                                modeOfDeliveryOptions={modeOfDeliveryOptions}
                                skillProficiencyOptions={skillProficiency}
                                selected={selectedSoftSkills[skill.id]}
                                onModeOfDeliveryChange={value => handleModeOfDeliveryChange(skill.id, value)}
                                onSkillProficiencyChange={value => handleSkillProficiencyChange(skill.id, value)}
                                showModeValidation={!isOptionSelected(skill.id)}
                                showProficiencyValidation={!selectedSoftSkills[skill.id].skillproficiency}
                            />
                        )}
                    </div>
                ))}
            </div>
            <style jsx>{`
                .soft-skills-container {
                    padding: 20px;
                    background-color: #f5f5f5;
                    border-radius: 8px;
                }
                .soft-skills-title {
                    font-size: 1.5rem;
                    color: #333;
                    margin-bottom: 20px;
                }
                .soft-skills-list {
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                }
                .soft-skill-item {
                    background-color: white;
                    padding: 15px;
                    border-radius: 6px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }
                .skill-selection {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    margin-bottom: 10px;
                }
                .skill-checkbox {
                    width: 18px;
                    height: 18px;
                    cursor: pointer;
                }
                .skill-name {
                    font-size: 1.1rem;
                    color: #444;
                }
                .skill-options {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    margin-left: 28px;
                    padding-top: 10px;
                    border-top: 1px solid #eee;
                }
                .option-group {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                .option-label {
                    min-width: 120px;
                    color: #666;
                    font-weight: 500;
                }
                .required {
                    color: #ff4444;
                    margin-left: 2px;
                }
                .option-select {
                    flex: 1;
                    padding: 8px;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    background-color: white;
                    font-size: 0.9rem;
                    color: #333;
                    cursor: pointer;
                }
                .option-select.required-field {
                    border-color: #ff4444;
                }
                .option-select:hover {
                    border-color: #999;
                }
                .option-select:focus {
                    outline: none;
                    border-color: #4a90e2;
                    box-shadow: 0 0 0 2px rgba(74,144,226,0.2);
                }
                .validation-message {
                    color: #ff4444;
                    font-size: 0.9rem;
                    margin-top: 5px;
                }
            `}</style>
        </div>
    );
}

export default SoftSkillsMultichoice;
