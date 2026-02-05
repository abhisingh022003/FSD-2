import { useState } from 'react';
import './App.css';
import RegistrationForm from './components/RegistrationForm';
import ProfileForm from './components/ProfileForm';
import MultiStepForm from './components/MultiStepForm';

function App() {
  const [activeTab, setActiveTab] = useState('registration');

  return (
    <div className="app">
      <header className="app-header">
        <h1>Experiment 6: Form Handling and Validation</h1>
        <p className="subtitle">Full Stack - II (23CSH-382) | React Hook Form & Yup Validation</p>
      </header>

      <nav className="tab-navigation">
        <button
          className={activeTab === 'registration' ? 'tab-active' : ''}
          onClick={() => setActiveTab('registration')}
        >
          Registration Form
        </button>
        <button
          className={activeTab === 'profile' ? 'tab-active' : ''}
          onClick={() => setActiveTab('profile')}
        >
          Profile Form
        </button>
        <button
          className={activeTab === 'multistep' ? 'tab-active' : ''}
          onClick={() => setActiveTab('multistep')}
        >
          Multi-Step Form
        </button>
      </nav>

      <main className="main-content">
        {activeTab === 'registration' && <RegistrationForm />}
        {activeTab === 'profile' && <ProfileForm />}
        {activeTab === 'multistep' && <MultiStepForm />}
      </main>

      <footer className="app-footer">
        <p>Mr. Prince Pal Singh | Assistant Professor, AIT-CSE</p>
        <p>CO2 - BT3: Form Handling and Validation</p>
      </footer>
    </div>
  );
}

export default App;
