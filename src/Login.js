import React, { useState } from 'react';

function Login({ onLogin, onSwitchToRegister }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Verificar usuários salvos
    const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const user = users.find(u => u.email === formData.email && u.password === formData.password);
    
    if (user) {
      onLogin(user);
    } else {
      alert('Email ou senha incorretos');
    }
  };

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: '400px', margin: '0 auto' }}>
        <div className="card-icon">🔐</div>
        <h2>Login</h2>
        <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
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
          <button type="submit" className="btn">🚪 Entrar</button>
        </form>
        
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <p>Não tem conta?</p>
          <button className="btn nav-btn" onClick={onSwitchToRegister}>
            📝 Criar Conta
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;