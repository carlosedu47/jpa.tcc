import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './Login';
import Register from './Register';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [authMode, setAuthMode] = useState('login');
  const [activeSection, setActiveSection] = useState('home');
  const [helpRequests, setHelpRequests] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    description: ''
  });

  const [resources] = useState([
    { id: 1, title: 'Guia de Comunicação', description: 'Técnicas para melhorar a comunicação com pessoas autistas', icon: '💬' },
    { id: 2, title: 'Atividades Sensoriais', description: 'Exercícios para desenvolvimento sensorial', icon: '🎨' },
    { id: 3, title: 'Rotinas Diárias', description: 'Como estabelecer rotinas eficazes', icon: '📅' }
  ]);

  const [contacts] = useState([
    { name: 'Terapia de Autismo em Alphaville', phone: '(11) 4193-3175', local: 'Av. Sagitário 138, Barueri, SP', icon: '🏥' },
    { name: 'Centro TEA Paulista', phone: '(11) 3116-7406', local: 'Rua Galileo Emendabili, 99 – São Paulo, SP', icon: '👨👩👧👦' }
  ]);

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setCurrentUser(user);
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      fetchHelpRequests();
    }
  }, [isLoggedIn]);

  const fetchHelpRequests = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/help/requests');
      if (response.ok) {
        const data = await response.json();
        setHelpRequests(data);
      }
    } catch (error) {
      console.error('Erro ao buscar solicitações:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/help/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        alert('Solicitação enviada com sucesso!');
        setFormData({ name: '', email: '', phone: '', description: '' });
        fetchHelpRequests();
      } else {
        alert('Erro ao enviar solicitação');
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao conectar com o servidor');
    }
  };

  const handleLogin = (userData) => {
    setCurrentUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem('currentUser', JSON.stringify(userData));
  };

  const handleRegister = (userData) => {
    setCurrentUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem('currentUser', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setActiveSection('home');
    localStorage.removeItem('currentUser');
  };

  if (!isLoggedIn) {
    return (
      <div>
        <header className="header">
          <h1>🌟 Sistema de Suporte para Famílias</h1>
          <p>Apoio especializado para pessoas com autismo e suas famílias</p>
        </header>
        
        {authMode === 'login' ? (
          <Login 
            onLogin={handleLogin}
            onSwitchToRegister={() => setAuthMode('register')}
          />
        ) : (
          <Register 
            onRegister={handleRegister}
            onSwitchToLogin={() => setAuthMode('login')}
          />
        )}
      </div>
    );
  }

  const renderHome = () => (
    <div>
      <div className="hero-section">
        <div className="hero-image">🤝</div>
        <div className="card">
          <h2>Sistema de Suporte para Famílias com Pessoas Autistas</h2>
          <p>Oferecemos recursos e apoio especializado para famílias. Nossa missão é proporcionar um ambiente acolhedor e informativo.</p>
        </div>
      </div>
      <div className="grid">
        <div className="card">
          <div className="card-icon">📚</div>
          <h3>Recursos Educativos</h3>
          <p>Materiais e guias especializados para apoiar o desenvolvimento.</p>
          <button className="btn" onClick={() => setActiveSection('resources')}>
            Ver Recursos
          </button>
        </div>
        <div className="card">
          <div className="card-icon">📞</div>
          <h3>Contatos de Apoio</h3>
          <p>Profissionais e organizações especializadas.</p>
          <button className="btn" onClick={() => setActiveSection('contacts')}>
            Ver Contatos
          </button>
        </div>
        <div className="card">
          <div className="card-icon">🆘</div>
          <h3>Solicitar Ajuda</h3>
          <p>Entre em contato para suporte personalizado.</p>
          <button className="btn" onClick={() => setActiveSection('help')}>
            Pedir Ajuda
          </button>
        </div>
      </div>
    </div>
  );

  const renderResources = () => (
    <div className="card">
      <div className="card-icon">📖</div>
      <h2>Recursos Educativos</h2>
      <p>Materiais selecionados para apoiar famílias e cuidadores.</p>
      <div style={{ marginTop: '20px' }}>
        {resources.map(resource => (
          <div key={resource.id} className="resource-item">
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '24px', marginRight: '15px' }}>{resource.icon}</span>
              <h3>{resource.title}</h3>
            </div>
            <p>{resource.description}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderContacts = () => (
    <div className="card">
      <div className="card-icon">📋</div>
      <h2>Contatos de Apoio</h2>
      <p>Organizações e profissionais especializados em autismo.</p>
      <div style={{ marginTop: '20px' }}>
        {contacts.map((contact, index) => (
          <div key={index} className="contact-card">
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
              <span style={{ fontSize: '30px', marginRight: '15px' }}>{contact.icon}</span>
              <h3>{contact.name}</h3>
            </div>
            <p><strong>📞 Telefone:</strong> {contact.phone}</p>
            <p><strong>📍 Local:</strong> {contact.local}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderHelp = () => (
    <div className="card">
      <div className="card-icon">📝</div>
      <h2>Solicitar Ajuda</h2>
      <p>Preencha o formulário e nossa equipe entrará em contato.</p>
      <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
        <div className="form-group">
          <label>👤 Nome Completo:</label>
          <input 
            type="text" 
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required 
            placeholder="Digite seu nome completo" 
          />
        </div>
        <div className="form-group">
          <label>📧 Email:</label>
          <input 
            type="email" 
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required 
            placeholder="seu.email@exemplo.com" 
          />
        </div>
        <div className="form-group">
          <label>📱 Telefone:</label>
          <input 
            type="tel" 
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="(11) 99999-9999" 
          />
        </div>
        <div className="form-group">
          <label>📋 Descrição da necessidade:</label>
          <textarea 
            rows="4" 
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required 
            placeholder="Descreva como podemos ajudar..."
          ></textarea>
        </div>
        <button type="submit" className="btn">✉️ Enviar Solicitação</button>
      </form>
      
      {helpRequests.length > 0 && (
        <div style={{ marginTop: '30px' }}>
          <h3>Solicitações Recentes ({helpRequests.length})</h3>
          <div style={{ maxHeight: '300px', overflowY: 'auto', marginTop: '15px' }}>
            {helpRequests.slice(-5).reverse().map(request => (
              <div key={request.id} className="resource-item" style={{ marginBottom: '10px' }}>
                <strong>{request.name}</strong> - {request.email}
                <p style={{ fontSize: '14px', color: '#666', marginTop: '5px' }}>
                  {request.description.substring(0, 100)}...
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div>
      <header className="header">
        <h1>🌟 Sistema de Suporte para Famílias</h1>
        <p>Apoio especializado para pessoas com autismo e suas famílias</p>
        <div style={{ marginTop: '15px' }}>
          <span>Olá, {currentUser?.name}! </span>
          <button 
            className="btn nav-btn" 
            onClick={handleLogout}
            style={{ marginLeft: '10px' }}
          >
            🚪 Sair
          </button>
        </div>
      </header>
      
      <div className="container">
        <nav style={{ marginBottom: '30px', textAlign: 'center' }}>
          <button 
            className={`btn nav-btn ${activeSection === 'home' ? 'active' : ''}`} 
            onClick={() => setActiveSection('home')}
          >
            🏠 Início
          </button>
          <button 
            className={`btn nav-btn ${activeSection === 'resources' ? 'active' : ''}`} 
            onClick={() => setActiveSection('resources')}
          >
            📚 Recursos
          </button>
          <button 
            className={`btn nav-btn ${activeSection === 'contacts' ? 'active' : ''}`} 
            onClick={() => setActiveSection('contacts')}
          >
            📞 Contatos
          </button>
          <button 
            className={`btn nav-btn ${activeSection === 'help' ? 'active' : ''}`} 
            onClick={() => setActiveSection('help')}
          >
            🆘 Ajuda
          </button>
        </nav>

        {activeSection === 'home' && renderHome()}
        {activeSection === 'resources' && renderResources()}
        {activeSection === 'contacts' && renderContacts()}
        {activeSection === 'help' && renderHelp()}
      </div>
    </div>
  );
}

export default App;