import React from 'react';

function SkillOptions({
    modeOfDeliveryOptions,
    skillProficiencyOptions,
    selected,
    onModeOfDeliveryChange,
    onSkillProficiencyChange,
    showModeValidation,
    showProficiencyValidation
}) {
    return (
        <div className="skill-options">
            <div className="option-group">
                <label className="option-label">Mode of Delivery: <span className="required">*</span></label>
                <select
                    value={selected.modeofdelivery || ""}
                    onChange={e => onModeOfDeliveryChange(e.target.value)}
                    className={`option-select ${!selected.modeofdelivery ? 'required-field' : ''}`}
                    required
                >
                    <option value="">Please select</option>
                    {modeOfDeliveryOptions.map(option => (
                        <option key={option.id} value={option.id}>{option.name}</option>
                    ))}
                </select>
            </div>
            {showModeValidation && (
                <div className="validation-message">Please select the mode of delivery</div>
            )}

            <div className="option-group">
                <label className="option-label">Skill Proficiency: <span className="required">*</span></label>
                <select
                    value={selected.skillproficiency || ""}
                    onChange={e => onSkillProficiencyChange(e.target.value)}
                    className={`option-select ${!selected.skillproficiency ? 'required-field' : ''}`}
                    required
                >
                    <option value="">Please select</option>
                    {Array.isArray(skillProficiencyOptions) && skillProficiencyOptions.map(option => (
                        <option key={option.id} value={option.id}>{option.name}</option>
                    ))}
                </select>
            </div>
            {showProficiencyValidation && (
                <div className="validation-message">Please select the skill proficiency</div>
            )}
        </div>
    );
}

export default SkillOptions;