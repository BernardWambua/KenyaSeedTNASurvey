import React from 'react';
import QuestionnaireForm from '../components/Questionnaire';
import Navbar from '../components/Navbar';

const Home = () => {
  return (
    <div className='container' style={{ marginTop: '20px' }}>
      <Navbar />
      <QuestionnaireForm />
      
    </div>
  );
};

export default Home;