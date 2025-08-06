import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

function ExportQuestionnaires({ questionnaires }) {
  const handleExport = () => {
    const rows = [];

    questionnaires.forEach(q => {
      // Soft Skills
      (q.softskill_entries || []).forEach(skill => {
        rows.push({
          QuestionnaireID: q.id,
          EmployeeName: q.employeename,
          StaffNo: q.staffno,
          Department: q.department_name,
          Division: q.division_name,
          JobType: q.jobtype_name,
          Region: q.region_name,
          Gender: q.gender_name,
          SkillType: 'Soft Skill',
          SkillName: skill.softskill_name || skill.softskill,
          ModeOfDelivery: skill.modeofdelivery,
        });
      });
      // Technical Skills
      (q.technicalskill_entries || []).forEach(skill => {
        rows.push({
          QuestionnaireID: q.id,
          EmployeeName: q.employeename,
          StaffNo: q.staffno,
          Department: q.department_name,
          Division: q.division_name,
          JobType: q.jobtype_name,
          Region: q.region_name,
          Gender: q.gender_name,
          SkillType: 'Technical Skill',
          SkillName: skill.technicalskill_name || skill.technicalskill,
          ModeOfDelivery: skill.modeofdelivery,
        });
      });
      // Strategy Delivery Skills
      (q.strategydeliveryskill_entries || []).forEach(skill => {
        rows.push({
          QuestionnaireID: q.id,
          EmployeeName: q.employeename,
          StaffNo: q.staffno,
          Department: q.department_name,
          Division: q.division_name,
          JobType: q.jobtype_name,
          Region: q.region_name,
          Gender: q.gender_name,
          SkillType: 'Strategy Delivery Skill',
          SkillName: skill.strategydeliveryskill_name || skill.strategydeliveryskill,
          ModeOfDelivery: skill.modeofdelivery,
        });
      });
      // If no skills, still export the questionnaire row (optional)
      if (
        (!q.softskill_entries || q.softskill_entries.length === 0) &&
        (!q.technicalskill_entries || q.technicalskill_entries.length === 0) &&
        (!q.strategydeliveryskill_entries || q.strategydeliveryskill_entries.length === 0)
      ) {
        rows.push({
          QuestionnaireID: q.id,
          EmployeeName: q.employeename,
          StaffNo: q.staffno,
          Department: q.department_name,
          Division: q.division_name,
          JobType: q.jobtype_name,
          Region: q.region_name,
          Gender: q.gender_name,
          SkillType: '',
          SkillName: '',
          ModeOfDelivery: '',
        });
      }
    });

    // Convert to worksheet and export
    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Questionnaires');
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'questionnaires.xlsx');
  };

  return (
    <div>
      {/* <h1 className="title is-4 has-text-weight-bold">Export to Excel</h1> */}
      <button className="button is-primary" onClick={handleExport}>
        Export Responses to Excel
      </button>
    </div>
  );
}

export default ExportQuestionnaires;