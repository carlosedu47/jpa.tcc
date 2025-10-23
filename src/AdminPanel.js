import React, { useState, useEffect } from 'react';

function AdminPanel({ onLogout }) {
  const [activeTab, setActiveTab] = useState('requests');
  const [helpRequests, setHelpRequests] = useState([]);
  const [users, setUsers] = useState([]);
  const [responses, setResponses] = useState({});

  useEffect(() => {
    fetchHelpRequests();
    fetchUsers();
  }, []);

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

  const fetchUsers = () => {
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    setUsers(registeredUsers);
  };

  const handleResponseChange = (requestId, response) => {
    setResponses({
      ...responses,
      [requestId]: response
    });
  };

  const sendResponse = (request) => {
    const response = responses[request.id];
    if (!response) {
      alert('Digite uma resposta antes de enviar');
      return;
    }

    alert(`Resposta enviada para ${request.email}:\n\n${response}`);
    
    setResponses({
      ...responses,
      [request.id]: ''
    });
  };

  const toggleUserStatus = (userId) => {
    const updatedUsers = users.map(user => {
      if (user.id === userId) {
        return { ...user, active: !user.active };
      }
      return user;
    });
    
    setUsers(updatedUsers);
    localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
    
    const user = updatedUsers.find(u => u.id === userId);
    alert(`Usuário ${user.active ? 'ativado' : 'inativado'} com sucesso!`);
  };

  const renderRequests = () => (
    <div className="card">
      <h2>📋 Solicitações de Ajuda ({helpRequests.length})</h2>
      {helpRequests.length === 0 ? (
        <p>Nenhuma solicitação encontrada.</p>
      ) : (
        helpRequests.map(request => (
          <div key={request.id} className="resource-item" style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <h4>👤 {request.name}</h4>
                <p><strong>📧 Email:</strong> {request.email}</p>
                <p><strong>📱 Telefone:</strong> {request.phone || 'Não informado'}</p>
                <p><strong>📋 Descrição:</strong> {request.description}</p>
              </div>
            </div>
            
            <div style={{ marginTop: '15px' }}>
              <label><strong>✉️ Resposta:</strong></label>
              <textarea
                rows="3"
                value={responses[request.id] || ''}
                onChange={(e) => handleResponseChange(request.id, e.target.value)}
                placeholder="Digite sua resposta..."
                style={{ 
                  width: '100%', 
                  marginTop: '5px', 
                  padding: '10px', 
                  border: '1px solid #ddd', 
                  borderRadius: '5px' 
                }}
              />
              <button 
                className="btn" 
                onClick={() => sendResponse(request)}
                style={{ marginTop: '10px' }}
              >
                📤 Enviar Resposta
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );

  const renderUsers = () => (
    <div className="card">
      <h2>👥 Usuários Cadastrados ({users.length})</h2>
      {users.length === 0 ? (
        <p>Nenhum usuário cadastrado.</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8f9fa' }}>
                <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>ID</th>
                <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Nome</th>
                <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Email</th>
                <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Status</th>
                <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>{user.id}</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>{user.name}</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>{user.email}</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                    <span style={{ 
                      color: user.active !== false ? '#28a745' : '#dc3545',
                      fontWeight: 'bold'
                    }}>
                      {user.active !== false ? '✅ Ativo' : '❌ Inativo'}
                    </span>
                  </td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                    <button 
                      onClick={() => toggleUserStatus(user.id)}
                      style={{ 
                        background: user.active !== false ? '#dc3545' : '#28a745', 
                        color: 'white', 
                        border: 'none', 
                        padding: '5px 10px', 
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      {user.active !== false ? '❌ Inativar' : '✅ Ativar'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  return (
    <div>
      <header className="header">
        <h1>👨💼 Painel Administrativo</h1>
        <p>Gerenciamento do Sistema de Suporte</p>
        <div style={{ marginTop: '15px' }}>
          <button 
            className="btn nav-btn" 
            onClick={onLogout}
          >
            🚪 Sair
          </button>
        </div>
      </header>
      
      <div className="container">
        <nav style={{ marginBottom: '30px', textAlign: 'center' }}>
          <button 
            className={`btn nav-btn ${activeTab === 'requests' ? 'active' : ''}`} 
            onClick={() => setActiveTab('requests')}
          >
            📋 Solicitações
          </button>
          <button 
            className={`btn nav-btn ${activeTab === 'users' ? 'active' : ''}`} 
            onClick={() => setActiveTab('users')}
          >
            👥 Usuários
          </button>
        </nav>

        {activeTab === 'requests' && renderRequests()}
        {activeTab === 'users' && renderUsers()}
      </div>
    </div>
  );
}

export default AdminPanel;