import React, { useState } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import ReportForm from './components/ReportForm';
import LiveMap from './components/LiveMap';
import FacialMatch from './components/FacialMatch';
import AdminPanel from './components/AdminPanel';
import Shelter from './components/Shelter';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [user, setUser] = useState({
    id: '1',
    name: 'Alex Johnson',
    email: 'alex@example.com',
    role: 'admin', // Change to 'citizen' to see citizen view
  });
  const [notifications] = useState(3);

  const handleAuthClick = () => {
    if (user) {
      setUser(null);
    } else {
      // Simulate login
      setUser({
        id: '1',
        name: 'Harsha',
        email: 'Harsha@gmail.com',
        role: 'admin',
      });
    }
  };

  const handleReportSubmit = (report: any) => {
    console.log('New report submitted:', report);
    // Here you would typically send to backend/Supabase
    alert('Report submitted successfully! Our AI has verified your images and the report is now being processed.');
    setCurrentView('dashboard');
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard user={user} />;
      case 'report':
        return <ReportForm onSubmit={handleReportSubmit} />;
      case 'map':
        return <LiveMap />;
      case 'facial-match':
        return <FacialMatch />;
      case 'shelters':
        return <Shelter />;
      case 'admin':
        return user?.role === 'admin' ? <AdminPanel /> : <Dashboard user={user} />;
      default:
        return <Dashboard user={user} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        currentView={currentView}
        onViewChange={setCurrentView}
        user={user}
        onAuthClick={handleAuthClick}
        notifications={notifications}
      />
      {renderCurrentView()}
    </div>
  );
}

export default App;