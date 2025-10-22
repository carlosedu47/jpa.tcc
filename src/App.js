import React, { useState } from 'react';
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [resources] = useState([
    { id: 1, title: 'Guia de Comunicação', description: 'Técnicas para melhorar a comunicação com pessoas autistas', icon: '💬' },
    { id: 2, title: 'Atividades Sensoriais', description: 'Exercícios para desenvolvimento sensorial', icon: '🎨' },
    { id: 3, title: 'Rotinas Diárias', description: 'Como estabelecer rotinas eficazes', icon: '📅' }
  ]);

  const [contacts] = useState([
    { name: 'Centro de Apoio Autismo', phone: '(11) 1234-5678', email: 'contato@apoioautismo.org', icon: '🏥' },
    { name: 'Associação Família Azul', phone: '(11) 8765-4321', email: 'ajuda@familiaazul.org', icon: '👨‍👩‍👧‍👦' }
  ]);

  const renderHome = () => (
    <div>
      <div className="hero-section">
        <div className="hero-image">🤝</div>
        <div className="card">
          <h2>Bem-vindos ao Sistema de Suporte</h2>
          <p>Oferecemos recursos e apoio especializado para famílias com pessoas autistas. Nossa missão é proporcionar um ambiente acolhedor e informativo.</p>
        </div>
      </div>
      <div className="grid">
        <div className="card">
          <div className="card-icon">📚</div>
          <h3>Recursos Educativos</h3>
          <p>Materiais e guias especializados para apoiar o desenvolvimento e aprendizado.</p>
          <button className="btn" onClick={() => setActiveSection('resources')}>
            Ver Recursos
          </button>
        </div>
        <div className="card">
          <div className="card-icon">📞</div>
          <h3>Contatos de Apoio</h3>
          <p>Profissionais e organizações especializadas prontos para ajudar.</p>
          <button className="btn" onClick={() => setActiveSection('contacts')}>
            Ver Contatos
          </button>
        </div>
        <div className="card">
          <div className="card-icon">🆘</div>
          <h3>Solicitar Ajuda</h3>
          <p>Entre em contato conosco para suporte personalizado e orientação.</p>
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
      <p>Materiais cuidadosamente selecionados para apoiar famílias e cuidadores.</p>
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
            <p><strong>✉️ Email:</strong> {contact.email}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderHelp = () => (
    <div className="card">
      <div className="card-icon">📝</div>
      <h2>Solicitar Ajuda</h2>
      <p>Preencha o formulário abaixo e nossa equipe entrará em contato.</p>
      <form style={{ marginTop: '20px' }}>
        <div className="form-group">
          <label>👤 Nome Completo:</label>
          <input type="text" required placeholder="Digite seu nome completo" />
        </div>
        <div className="form-group">
          <label>📧 Email:</label>
          <input type="email" required placeholder="seu.email@exemplo.com" />
        </div>
        <div className="form-group">
          <label>📱 Telefone:</label>
          <input type="tel" placeholder="(11) 99999-9999" />
        </div>
        <div className="form-group">
          <label>📋 Descrição da necessidade:</label>
          <textarea rows="4" required placeholder="Descreva como podemos ajudar você e sua família..."></textarea>
        </div>
        <button type="submit" className="btn">✉️ Enviar Solicitação</button>
      </form>
    </div>
  );

  return (
    <div>
      <header className="header">
        <h1>🌟 Sistema de Suporte para Famílias</h1>
        <p>Apoio especializado para pessoas com autismo e suas famílias</p>
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