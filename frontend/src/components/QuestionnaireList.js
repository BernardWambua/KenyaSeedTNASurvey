import React, { useState } from 'react';
import 'bulma/css/bulma.min.css';

function QuestionnaireList({ questionnaires }) {
    const [selected, setSelected] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const [departmentFilter, setDepartmentFilter] = useState('');
    const [divisionFilter, setDivisionFilter] = useState('');

    const [visibleCount, setVisibleCount] = useState(10);
    
    const hideStaffNumber = (staffno) => {
        staffno = staffno.replace("kgn", "").replace("KGN", "").replace("Kgn", "").replace("kG", "");
        if (staffno && staffno.length > 3) {
            return staffno.slice(0, staffno.length - 3) + staffno.slice(-3).replace(/\d/g, "*");
        }
        return staffno || "";
    };

    // Get unique values for dropdowns
    const departments = [...new Set(questionnaires.map(q => q.department_name).filter(Boolean))];

    // Only show divisions for the selected department
    const filteredDivisions = departmentFilter
        ? [...new Set(
            questionnaires
                .filter(q => q.department_name === departmentFilter)
                .map(q => q.division_name)
                .filter(Boolean)
        )]
        : [...new Set(questionnaires.map(q => q.division_name).filter(Boolean))];

    // Filtered questionnaires
    const filtered = questionnaires.filter(q =>
        (!departmentFilter || q.department_name === departmentFilter) &&
        (!divisionFilter || q.division_name === divisionFilter)
    );

    // Show only up to visibleCount
    const visibleQuestionnaires = filtered.slice(0, visibleCount);

    const openModal = (questionnaire) => {
        setSelected(questionnaire);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelected(null);
    };

    if (!questionnaires || questionnaires.length === 0) {
        return <p className="has-text-centered">No questionnaires available.</p>;
    }

    return (
        <div className="container">
            <h1 className="title is-4">Questionnaire Responses</h1>

            {/* Filters */}
            <div className="box mb-4">
                <h3 className="subtitle is-6 mb-2">Filter by:</h3>
                <div className="columns is-mobile is-multiline">
                    
                    <div className="column is-one-half">
                        <div className="field">
                            <label className="label is-small">Department</label>
                            <div className="control">
                                <div className="select is-fullwidth">
                                    <select
                                        value={departmentFilter}
                                        onChange={e => {
                                            setDepartmentFilter(e.target.value);
                                            setDivisionFilter('');
                                        }}
                                    >
                                        <option value="">All Departments</option>
                                        {departments.map(dept => (
                                            <option key={dept} value={dept}>{dept}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="column is-one-half">
                        <div className="field">
                            <label className="label is-small">Division</label>
                            <div className="control">
                                <div className="select is-fullwidth">
                                    <select value={divisionFilter} onChange={e => setDivisionFilter(e.target.value)}>
                                        <option value="">All Divisions</option>
                                        {filteredDivisions.map(div => (
                                            <option key={div} value={div}>{div}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="table-container">
                <table className="table is-striped is-hoverable is-fullwidth">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Staff Number</th>
                            <th>Gender</th>
                            <th>Department</th>
                            <th>Division</th>
                            <th>Job Function</th>
                            <th>Created At</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {visibleQuestionnaires.map((questionnaire) => (
                            <tr key={questionnaire.id}>
                                <td>{questionnaire.id}</td>
                                <td>{hideStaffNumber(questionnaire.staffno)}</td>
                                <td>{questionnaire.region_name}</td>
                                <td>{questionnaire.gender_name}</td>
                                <td>{questionnaire.department_name}</td>
                                <td>{questionnaire.division_name}</td>
                                <td>{questionnaire.jobtype_name}</td>
                                <td>{new Date(questionnaire.created_at).toLocaleString()}</td>
                                <td>
                                    <button
                                        className="button is-small is-info"
                                        onClick={() => openModal(questionnaire)}
                                    >
                                        Details
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* View More button */}
            {visibleCount < filtered.length && (
                <div className="has-text-centered mt-4">
                    <button
                        className="button is-link"
                        onClick={() => setVisibleCount(visibleCount + 10)}
                    >
                        View More
                    </button>
                </div>
            )}

            {/* Bulma Modal */}
            {showModal && selected && (
                <div className="modal is-active">
                    <div className="modal-background" onClick={closeModal}></div>
                    <div className="modal-card">
                        <header className="modal-card-head">
                            <p className="modal-card-title">
                                Questionnaire #{selected.id} Details
                            </p>
                            <button className="delete" aria-label="close" onClick={closeModal}></button>
                        </header>
                        <section className="modal-card-body">
                            <h4 className="title is-6">Soft Skills</h4>
                            <table className="table is-striped is-hoverable is-fullwidth">
                                <thead>
                                    <tr>
                                        <th>Skill Name</th>
                                        <th>Mode of Delivery</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(selected.softskill_entries && selected.softskill_entries.length > 0) ? (
                                        selected.softskill_entries.map((entry, idx) => (
                                            <tr key={idx}>
                                                <td>{entry.softskill_name || entry.softskill}</td>
                                                <td>{entry.modeofdelivery}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="2">No soft skills</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>

                            <h4 className="title is-6 mt-4">Technical Skills</h4>
                            <table className="table is-striped is-hoverable is-fullwidth">
                                <thead>
                                    <tr>
                                        <th>Skill Name</th>
                                        <th>Mode of Delivery</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(selected.technicalskill_entries && selected.technicalskill_entries.length > 0) ? (
                                        selected.technicalskill_entries.map((entry, idx) => (
                                            <tr key={idx}>
                                                <td>{entry.technicalskill_name || entry.technicalskill}</td>
                                                <td>{entry.modeofdelivery}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="2">No technical skills</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>

                            <h4 className="title is-6 mt-4">Strategy Delivery Skills</h4>
                            <table className="table is-striped is-hoverable is-fullwidth">
                                <thead>
                                    <tr>
                                        <th>Skill Name</th>
                                        <th>Mode of Delivery</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(selected.strategydeliveryskill_entries && selected.strategydeliveryskill_entries.length > 0) ? (
                                        selected.strategydeliveryskill_entries.map((entry, idx) => (
                                            <tr key={idx}>
                                                <td>{entry.strategydeliveryskill_name || entry.strategydeliveryskill}</td>
                                                <td>{entry.modeofdelivery}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="2">No strategy delivery skills</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </section>
                        <footer className="modal-card-foot">
                            <button className="button" onClick={closeModal}>Close</button>
                        </footer>
                    </div>
                </div>
            )}
        </div>
    );
}

export default QuestionnaireList;
