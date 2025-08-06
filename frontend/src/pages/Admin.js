import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import QuestionnaireList from '../components/QuestionnaireList';
import Charts from '../components/Charts';
import ExportQuestionnaires from '../components/ExportQuestionnaires';
import SkillBarCharts from '../components/SkillBarCharts';
import SoftSkillCharts from '../components/SoftSkillCharts';
import api from '../api';

const Admin = () => {
    const [questionnaires, setQuestionnaires] = useState([]);

    useEffect(() => {
        const fetchQuestionnaires = async () => {
            try {
                const response = await api.get('/api/questionnaire/');
                setQuestionnaires(response.data);
            } catch (error) {
                console.error('Error fetching questionnaires:', error);
            }
        };

        fetchQuestionnaires();
    }, []);

    return (
        <div className='container' style={{ marginTop: '20px' }}>
            <Navbar />
            <Charts questionnaires={questionnaires} />
            <SkillBarCharts questionnaires={questionnaires} />
            <SoftSkillCharts questionnaires={questionnaires} />
            <QuestionnaireList questionnaires={questionnaires} />
            <ExportQuestionnaires questionnaires={questionnaires} />
            
        </div>

    );
};  

export default Admin;