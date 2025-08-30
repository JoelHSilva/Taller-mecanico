import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaUsers, 
  FaCar, 
  FaTools, 
  FaFileInvoiceDollar,
  FaBell,
  FaUserCircle,
  FaCalendarAlt,
  FaWrench,
  FaChartLine
} from 'react-icons/fa';
import '../styles/dashboard.css';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('inicio');

  // Datos de ejemplo
  const stats = {
    clientes: 42,
    vehiculos: 18,
    reparaciones: 7,
    ingresos: '$12,850'
  };

  const urgentRepairs = [
    { id: 1, vehiculo: 'Ferrari 488', cliente: 'Juan Pérez', prioridad: 'Alta' },
    { id: 2, vehiculo: 'Porsche 911', cliente: 'María Gómez', prioridad: 'Media' }
  ];

  const upcomingAppointments = [
    { id: 1, fecha: '15/03', hora: '10:00 AM', vehiculo: 'Audi R8' },
    { id: 2, fecha: '15/03', hora: '02:30 PM', vehiculo: 'BMW M4' }
  ];

  // Animaciones
  const sidebarVariants = {
    open: { width: 250 },
    closed: { width: 80 }
  };

  const cardVariants = {
    hover: { 
      y: -5, 
      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)'
    }
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar Elegante */}
      <motion.div 
        className="sidebar"
        animate={sidebarOpen ? "open" : "closed"}
        variants={sidebarVariants}
        initial="open"
      >
        <div className="sidebar-header">
          <motion.h2
            animate={{ opacity: sidebarOpen ? 1 : 0 }}
          >
            🏎️ TALLER
          </motion.h2>
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)} 
            className="menu-toggle"
          >
            {sidebarOpen ? '◄' : '►'}
          </button>
        </div>
        
        <nav>
          {[
            { name: 'Inicio', icon: <FaChartLine />, tab: 'inicio' },
            { name: 'Clientes', icon: <FaUsers />, tab: 'clientes' },
            { name: 'Vehículos', icon: <FaCar />, tab: 'vehiculos' },
            { name: 'Reparaciones', icon: <FaTools />, tab: 'reparaciones' },
            { name: 'Facturación', icon: <FaFileInvoiceDollar />, tab: 'facturacion' },
            { name: 'Calendario', icon: <FaCalendarAlt />, tab: 'calendario' }
          ].map((item) => (
            <motion.div
              key={item.name}
              whileHover={{ backgroundColor: 'rgba(255, 215, 0, 0.1)' }}
              onClick={() => setActiveTab(item.tab)}
            >
              <div className={`nav-item ${activeTab === item.tab ? 'active' : ''}`}>
                <span className="icon">{item.icon}</span>
                <span className="nav-text">{item.name}</span>
              </div>
            </motion.div>
          ))}
        </nav>
      </motion.div>

      {/* Contenido Principal */}
      <div className="main-content">
        <header className="dashboard-header">
          <h1>
            {activeTab === 'inicio' && 'PANEL DE CONTROL'}
            {activeTab === 'clientes' && 'GESTIÓN DE CLIENTES'}
            {/* Agrega más títulos según tabs */}
          </h1>
          <div className="header-actions">
            <button className="icon-button">
              <FaBell />
            </button>
            <button className="icon-button">
              <FaUserCircle />
            </button>
          </div>
        </header>

        {/* Contenido por Tabs */}
        {activeTab === 'inicio' && (
          <>
            {/* Tarjeta de Bienvenida */}
            <motion.div 
              className="welcome-card"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h3>Bienvenido, Administrador</h3>
              <p>Hoy es {new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
              
              <div className="alert">
                <FaWrench /> <span>3 reparaciones urgentes hoy</span>
              </div>
            </motion.div>

            {/* Estadísticas Rápidas */}
            <div className="stats-grid">
              {[
                { title: 'Clientes', value: stats.clientes, icon: <FaUsers />, color: 'red' },
                { title: 'Vehículos', value: stats.vehiculos, icon: <FaCar />, color: 'black' },
                { title: 'Reparaciones', value: stats.reparaciones, icon: <FaTools />, color: 'gray' },
                { title: 'Ingresos', value: stats.ingresos, icon: <FaFileInvoiceDollar />, color: 'yellow' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.title}
                  className={`stat-card ${stat.color}-bg`}
                  variants={cardVariants}
                  whileHover="hover"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index + 0.3 }}
                >
                  <h3>{stat.title}</h3>
                  <p>{stat.value}</p>
                  <div className="card-icon">{stat.icon}</div>
                </motion.div>
              ))}
            </div>

            {/* Reparaciones Urgentes */}
            <motion.div 
              className="section-card"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <h2>Reparaciones Urgentes</h2>
              <div className="repairs-list">
                {urgentRepairs.map(repair => (
                  <div key={repair.id} className="repair-item">
                    <div className="repair-info">
                      <strong>{repair.vehiculo}</strong>
                      <span>{repair.cliente}</span>
                    </div>
                    <div className={`priority-badge ${repair.prioridad.toLowerCase()}`}>
                      {repair.prioridad}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Citas Programadas */}
            <motion.div 
              className="section-card"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <h2>Próximas Citas</h2>
              <div className="appointments-list">
                {upcomingAppointments.map(app => (
                  <div key={app.id} className="appointment-item">
                    <div className="appointment-time">
                      <FaCalendarAlt />
                      <span>{app.fecha} - {app.hora}</span>
                    </div>
                    <div className="appointment-vehicle">
                      {app.vehiculo}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}

        {/* Otras pestañas pueden ir aquí */}
      </div>
    </div>
  );
};

export default Dashboard;