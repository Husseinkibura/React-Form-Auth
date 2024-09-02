import React, { useState } from "react";
import { FaUsers, FaChartLine, FaCog, FaFileAlt, FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

// Sample data for the Pie charts
const data1 = {
  labels: ['Red', 'Blue', 'Yellow'],
  datasets: [{
    data: [300, 50, 100],
    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
    hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
  }],
};

const data2 = {
  labels: ['Green', 'Purple', 'Orange'],
  datasets: [{
    data: [200, 150, 300],
    backgroundColor: ['#4CAF50', '#9C27B0', '#FF9800'],
    hoverBackgroundColor: ['#4CAF50', '#9C27B0', '#FF9800'],
  }],
};

const styles = {
  dashboardContainer: {
    display: 'flex',
    height: '100vh',
  },
  sidebar: {
    background: '#003366',
    color: '#fff',
    width: '200px',
    height: '100%',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    top: 0,
    left: 0,
    overflow: 'auto',
    boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
    transition: 'width 0.3s ease',
  },
  sidebarCollapsed: {
    width: '60px',
  },
  sidebarTitle: {
    fontSize: '24px',
    marginBottom: '20px',
    fontWeight: 'bold',
  },
  navList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 15px',
    borderRadius: '5px',
    color: '#fff',
    textDecoration: 'none',
    transition: 'background-color 0.3s ease',
    marginBottom: '10px',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
  navItemCollapsed: {
    justifyContent: 'center',
  },
  navItemHover: {
    backgroundColor: '#444',
  },
  icon: {
    fontSize: '20px',
    marginRight: '10px',
  },
  iconCollapsed: {
    fontSize: '24px',
  },
  navText: {
    fontSize: '16px',
  },
  mainContent: {
    marginLeft: '200px', // Matches the width of the sidebar
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  mainContentCollapsed: {
    marginLeft: '60px',
  },
  navbar: {
    background: '#007bff',
    color: '#fff',
    padding: '10px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '60px',
    position: 'fixed',
    top: 0,
    left: '200px', // Matches the width of the sidebar
    right: 0,
    zIndex: 1000,
    transition: 'left 0.3s ease',
  },
  navbarCollapsed: {
    left: '60px',
  },
  navbarH1: {
    margin: 0,
    fontSize: '20px',
  },
  navbarMenu: {
    display: 'flex',
    alignItems: 'center',
  },
  navbarInput: {
    padding: '5px',
    border: 'none',
    borderRadius: '5px',
    marginLeft: '20px',
  },
  profileIcon: {
    fontSize: '24px',
    width: '20px',  // Adjust width to fit within the sidebar and navbar
    height: '20px', // Adjust height to fit within the sidebar and navbar
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  profileImageInput: {
    display: 'none',
  },
  dashboard: {
    padding: '80px 20px 20px',
    flex: 1,
    overflow: 'auto',
    background: '#f4f4f4',
  },
  cards: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gridGap: '15px',
    marginBottom: '20px',
  },
  card: {
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    color: '#fff',
    height: '150px',
    transition: 'transform 0.3s ease',
    position: 'relative',
    width: '100%', // Ensure all cards have the same width
  },
  cardHover: {
    transform: 'scale(1.05)',
  },
  cardIcon: {
    fontSize: '30px',
    marginBottom: '10px',
  },
  cardH3: {
    fontSize: '20px',
    margin: '5px 0',
  },
  cardP: {
    fontSize: '16px',
  },
  chartContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridGap: '15px',
    marginBottom: '20px',
  },
  chart: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    textAlign: 'center',
    height: '400px', // Adjust height as needed
    width: '350px',  // Adjust width as needed
  },
  tableContainer: {
    overflowX: 'auto',
    background: '#fff',
    borderRadius: '10px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    padding: '20px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  theadTh: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '10px',
    textAlign: 'left',
  },
  tbodyTd: {
    padding: '10px',
    borderBottom: '1px solid #ddd',
  },
  tbodyTrHover: {
    backgroundColor: '#f1f1f1',
  },
  button: {
    border: 'none',
    borderRadius: '4px',
    padding: '5px 8px',
    fontSize: '12px',
    cursor: 'pointer',
    margin: '0 3px',
    transition: 'background-color 0.3s ease',
  },
  viewButton: {
    backgroundColor: '#17a2b8',
    color: '#fff',
  },
  editButton: {
    backgroundColor: '#007bff',
    color: '#fff',
  },
  updateButton: {
    backgroundColor: '#28a745',
    color: '#fff',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    color: '#fff',
  },
  buttonHover: {
    opacity: 0.8,
  },
};

const Dashboard = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleProfileImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = URL.createObjectURL(event.target.files[0]);
      setProfileImage(file);
    }
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div style={styles.dashboardContainer}>
      <div style={{ ...styles.sidebar, ...(sidebarCollapsed ? styles.sidebarCollapsed : {}) }}>
        {!sidebarCollapsed && <h2 style={styles.sidebarTitle}>Dashboard</h2>}
        <ul style={styles.navList}>
          <li style={{ ...styles.navItem, ...(sidebarCollapsed ? styles.navItemCollapsed : {}) }}>
            <FaUsers style={{ ...styles.icon, ...(sidebarCollapsed ? styles.iconCollapsed : {}) }} />
            {!sidebarCollapsed && <span style={styles.navText}>Dashboard</span>}
          </li>
          <li style={{ ...styles.navItem, ...(sidebarCollapsed ? styles.navItemCollapsed : {}) }}>
            <FaShoppingCart style={{ ...styles.icon, ...(sidebarCollapsed ? styles.iconCollapsed : {}) }} />
            {!sidebarCollapsed && <span style={styles.navText}>Orders</span>}
          </li>
          <li style={{ ...styles.navItem, ...(sidebarCollapsed ? styles.navItemCollapsed : {}) }}>
            <FaChartLine style={{ ...styles.icon, ...(sidebarCollapsed ? styles.iconCollapsed : {}) }} />
            {!sidebarCollapsed && <span style={styles.navText}>Analytics</span>}
          </li>
          <li style={{ ...styles.navItem, ...(sidebarCollapsed ? styles.navItemCollapsed : {}) }}>
            <FaFileAlt style={{ ...styles.icon, ...(sidebarCollapsed ? styles.iconCollapsed : {}) }} />
            {!sidebarCollapsed && <span style={styles.navText}>Reports</span>}
          </li>
          <li style={{ ...styles.navItem, ...(sidebarCollapsed ? styles.navItemCollapsed : {}) }}>
            <FaCog style={{ ...styles.icon, ...(sidebarCollapsed ? styles.iconCollapsed : {}) }} />
            {!sidebarCollapsed && <span style={styles.navText}>Settings</span>}
          </li>
        </ul>
        <button onClick={toggleSidebar}>Toggle Sidebar</button>
      </div>
      <div style={{ ...styles.mainContent, ...(sidebarCollapsed ? styles.mainContentCollapsed : {}) }}>
        <div style={{ ...styles.navbar, ...(sidebarCollapsed ? styles.navbarCollapsed : {}) }}>
          <h1 style={styles.navbarH1}>Dashboard</h1>
          <div style={styles.navbarMenu}>
            <input type="text" placeholder="Search..." style={styles.navbarInput} />
            <div style={styles.profileIcon} onClick={() => document.getElementById('profileImageInput').click()}>
              {profileImage ? <img src={profileImage} alt="Profile" style={{ borderRadius: '50%', width: '40px', height: '40px' }} /> : <FaUserCircle />}
              <input id="profileImageInput" type="file" accept="image/*" onChange={handleProfileImageChange} style={styles.profileImageInput} />
            </div>
          </div>
        </div>
        <div style={styles.dashboard}>
          <div style={styles.cards}>
            <div style={{ ...styles.card, backgroundColor: '#2196f3' }} className="cardHover">
              <FaUsers style={styles.cardIcon} />
              <h3 style={styles.cardH3}>Users</h3>
              <p style={styles.cardP}>1,234</p>
            </div>
            <div style={{ ...styles.card, backgroundColor: '#4caf50' }} className="cardHover">
              <FaShoppingCart style={styles.cardIcon} />
              <h3 style={styles.cardH3}>Orders</h3>
              <p style={styles.cardP}>567</p>
            </div>
            <div style={{ ...styles.card, backgroundColor: '#ff9800' }} className="cardHover">
              <FaChartLine style={styles.cardIcon} />
              <h3 style={styles.cardH3}>Revenue</h3>
              <p style={styles.cardP}>$9,876</p>
            </div>
            <div style={{ ...styles.card, backgroundColor: '#00bcd4' }} className="cardHover">
              <FaFileAlt style={styles.cardIcon} />
              <h3 style={styles.cardH3}>Reports</h3>
              <p style={styles.cardP}>123</p>
            </div>
          </div>
          <div style={styles.chartContainer}>
            <div style={styles.chart}>
              <Pie data={data1} />
            </div>
            <div style={styles.chart}>
              <Bar data={data2} />
            </div>
          </div>
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.theadTh}>ID</th>
                  <th style={styles.theadTh}>Name</th>
                  <th style={styles.theadTh}>Email</th>
                  <th style={styles.theadTh}>Role</th>
                  <th style={styles.theadTh}>Status</th>
                  <th style={styles.theadTh}>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr style={styles.tbodyTrHover}>
                  <td style={styles.tbodyTd}>1</td>
                  <td style={styles.tbodyTd}>John Doe</td>
                  <td style={styles.tbodyTd}>john@example.com</td>
                  <td style={styles.tbodyTd}>Admin</td>
                  <td style={styles.tbodyTd}>Active</td>
                  <td style={styles.tbodyTd}>
                    <button style={{ ...styles.button, ...styles.viewButton }}>View</button>
                    <button style={{ ...styles.button, ...styles.editButton }}>Edit</button>
                    <button style={{ ...styles.button, ...styles.updateButton }}>Update</button>
                    <button style={{ ...styles.button, ...styles.deleteButton }}>Delete</button>
                  </td>
                </tr>
                {/* Repeat similar <tr> for other table rows */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
