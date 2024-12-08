import React from 'react';
import StatusPesananForm from './components/StatusPesananForm';
import StatusPesananList from './components/StatusPesananList';

function App() {
  return (
    <div className="App">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-6">Greenbite Status Pesanan</h1>
        <StatusPesananForm />
        <StatusPesananList />
      </div>
    </div>
  );
}

export default App;
