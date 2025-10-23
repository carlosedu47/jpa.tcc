import React, { useState } from 'react';

function AdminLogin({ onAdminLogin, onSwitchToUser }) {
  const [formData, setFormData] = useState({
    username: '',
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
    
    if (formData.username === 'admin' && formData.password === 'admin123') {
      onAdminLogin({
        id: 'admin',
        name: 'Administrador',
        email: 'admin@sistema.com',
        isAdmin: true
      });
    } else {
      alert('Credenciais de administrador incorretas');
    }
  };

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: '400px', margin: '0 auto' }}>
        <div className="card-icon">👨💼</div>
        <h2>Login Administrador</h2>
        <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
          <div className="form-group">
            <label>👤 Usuário:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
              placeholder="admin"
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
              placeholder="Digite a senha"
            />
          </div>
          <button type="submit" className="btn">🔐 Entrar como Admin</button>
        </form>
        
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button className="btn nav-btn" onClick={onSwitchToUser}>
            👤 Login de Usuário
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;