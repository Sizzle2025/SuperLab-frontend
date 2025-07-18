import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MdAssignmentTurnedIn, MdLocalHospital } from 'react-icons/md';

const StaffHome = () => {
  const navigate = useNavigate();

  const sections = [
    {
      title: 'Assigned Tasks',
      description: 'View tasks assigned to you.',
      route: 'assigned',
      gradient: 'linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)',
      icon: <MdAssignmentTurnedIn size={36} />,
    },
    {
      title: 'Attended Patients',
      description: 'Check patients you attended.',
      route: 'attended',
      gradient: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)',
      icon: <MdLocalHospital size={36} />,
    },
  ];

  const cardStyle = {
    width: '200px',
    height: '180px',
    color: 'white',
    borderRadius: '20px',
    padding: '18px',
    cursor: 'pointer',
    boxShadow: '0 10px 24px rgba(0, 0, 0, 0.3)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  };

  const containerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '30px',
    justifyContent: 'center',
    padding: '50px 20px',
    background: 'linear-gradient(180deg, #f0f4ff 0%, #ffffff 100%)',
    minHeight: '100vh',
  };

  const headerStyle = {
    textAlign: 'center',
    marginTop: '40px',
    marginBottom: '20px',
    color: '#2c3e50',
  };

  return (
    <div>
      <div style={headerStyle}>
        <h2 style={{ fontSize: '30px', fontWeight: 'bold' }}>🩺 Welcome Staff</h2>
        <p style={{ fontSize: '16px', color: '#555' }}>
          Manage your assigned tasks and patient updates here.
        </p>
      </div>

      <div style={containerStyle}>
        {sections.map((item, index) => (
          <div
            key={index}
            onClick={() => navigate(item.route)}
            style={{ ...cardStyle, background: item.gradient }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'scale(1.08)';
              e.currentTarget.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.4)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 10px 24px rgba(0, 0, 0, 0.3)';
            }}
          >
            <div>{item.icon}</div>
            <h3 style={{ fontSize: '18px', margin: '10px 0 5px' }}>{item.title}</h3>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.95)' }}>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StaffHome;