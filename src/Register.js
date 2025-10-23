import React, { useState } from 'react';

function Register({ onRegister, onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Senhas não coincidem');
      return;
    }

    const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    if (users.find(u => u.email === formData.email)) {
      alert('Email já cadastrado');
      return;
    }

    const newUser = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      password: formData.password,
      active: true
    };
    
    users.push(newUser);
    localStorage.setItem('registeredUsers', JSON.stringify(users));
    
    onRegister(newUser);
  };

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: '400px', margin: '0 auto' }}>
        <div className="card-icon">📝</div>
        <h2>Cadastro</h2>
        <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
          <div className="form-group">
            <label>👤 Nome:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              placeholder="Digite seu nome"
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
            <label>🔒 Senha:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              placeholder="Digite sua senha"
            />
          </div>
          <div className="form-group">
            <label>🔒 Confirmar Senha:</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
              placeholder="Confirme sua senha"
            />
          </div>
          <button type="submit" className="btn">✅ Cadastrar</button>
        </form>
        
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <p>Já tem conta?</p>
          <button className="btn nav-btn" onClick={onSwitchToLogin}>
            🔐 Fazer Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;