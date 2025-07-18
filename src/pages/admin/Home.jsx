import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MdAssignment, MdListAlt, MdGroup, MdPersonAdd } from 'react-icons/md';

const Home = () => {
  const navigate = useNavigate();

  const cardData = [
    {
      title: 'Assign Task',
      description: 'Create and assign new tasks.',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      route: 'assign-task',
      icon: <MdAssignment size={36} />,
    },
    {
      title: 'Task List',
      description: 'Track all assigned tasks.',
      gradient: 'linear-gradient(135deg, #43cea2 0%, #185a9d 100%)',
      route: 'task-list',
      icon: <MdListAlt size={36} />,
    },
    {
      title: 'Staff List',
      description: 'View all staff members.',
      gradient: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)',
      route: 'staff-list',
      icon: <MdGroup size={36} />,
    },
    {
      title: 'Create Staff',
      description: 'Add a new staff member.',
      gradient: 'linear-gradient(135deg, #ff5858 0%, #f09819 100%)',
      route: 'create-staff',
      icon: <MdPersonAdd size={36} />,
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
    justifyContent: 'space-between',
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
        <h2 style={{ fontSize: '32px', fontWeight: 'bold' }}>🎯 Welcome Admin</h2>
        <p style={{ fontSize: '16px', color: '#555' }}>
          Manage tasks, staff, and more from your dashboard.
        </p>
      </div>

      <div style={containerStyle}>
        {cardData.map((card, index) => (
          <div
            key={index}
            onClick={() => navigate(card.route)}
            style={{ ...cardStyle, background: card.gradient }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'scale(1.08)';
              e.currentTarget.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.4)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 10px 24px rgba(0, 0, 0, 0.3)';
            }}
          >
            <div>{card.icon}</div>
            <h3 style={{ fontSize: '18px', margin: '10px 0 4px' }}>{card.title}</h3>
            <p style={{ fontSize: '13px', color: 'rgba(14, 13, 13, 0.9)' }}>{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;