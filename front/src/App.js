import './App.css';
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [consulta, setConsulta] = useState('');
  const [mensajes, setMensajes] = useState([]);
  const [cargando, setCargando] = useState(false);

  const enviarConsulta = async () => {
    setCargando(true); // Activamos el estado de carga
    try {
      const respuesta = await axios.post('https://chatbot-backend-jqod.onrender.com/consulta', { consulta });
      setMensajes([...mensajes, { tipo: 'usuario', texto: consulta }, { tipo: 'bot', texto: respuesta.data.respuesta }]);
    } catch (error) {
      setMensajes([...mensajes, { tipo: 'usuario', texto: consulta }, { tipo: 'bot', texto: 'Hubo un error al obtener la respuesta.' }]);
    }
    setConsulta('');
    setCargando(false); // Desactivamos el estado de carga
  };

  const peliculasElegidas = [
    "Apt Pupil",
    "Argo",
    "Assassins",
    "Buried",
    "Carrie",
    "Gravity",
    "Heist",
    "Lord Of War",
    "Psycho",
    "South Park"
  ];

  return (
    <div style={styles.appContainer}>
      <h1 style={styles.header}>Asistente de Consulta</h1>
      <div style={styles.peliculasContainer}>
        <h2 style={styles.peliculasHeader}>Películas Elegidas</h2>
        <ul style={styles.peliculasList}>
          {peliculasElegidas.map((pelicula, index) => (
            <li key={index} style={styles.peliculaItem}>{pelicula}</li>
          ))}
        </ul>
      </div>
      <div style={styles.chatContainer}>
        {mensajes.map((msg, index) => (
          <p key={index} style={msg.tipo === 'usuario' ? styles.usuarioMsg : styles.botMsg}>
            {msg.texto}
          </p>
        ))}
        {cargando && <p style={styles.cargando}>Cargando...</p>}
      </div>
      <div style={styles.inputContainer}>
        <input 
          value={consulta} 
          onChange={e => setConsulta(e.target.value)} 
          placeholder="Escribe tu consulta..."
          style={styles.input}
        />
        <button onClick={enviarConsulta} style={styles.button} disabled={cargando}>
          {cargando ? 'Enviando...' : 'Enviar'}
        </button>
      </div>
    </div>
  );
}

const styles = {
  appContainer: {
    fontFamily: 'Arial, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#f7f7f7',
  },
  header: {
    fontSize: '2em',
    marginBottom: '10px',
  },
  peliculasContainer: {
    width: '100%',
    maxWidth: '600px',
    marginBottom: '20px',
    backgroundColor: '#fff',
    padding: '10px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  peliculasHeader: {
    fontSize: '1.5em',
    marginBottom: '5px',
  },
  peliculasList: {
    listStyleType: 'none',
    padding: 0,
  },
  peliculaItem: {
    fontSize: '1.1em',
    padding: '5px 0',
  },
  chatContainer: {
    width: '100%',
    maxWidth: '600px',
    marginBottom: '20px',
    backgroundColor: '#fff',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    minHeight: '200px',
    overflowY: 'auto',
  },
  usuarioMsg: {
    textAlign: 'right',
    color: '#333',
    backgroundColor: '#e1f5fe',
    padding: '8px',
    borderRadius: '8px',
    marginBottom: '5px',
    maxWidth: '80%',
    alignSelf: 'flex-end',
  },
  botMsg: {
    textAlign: 'left',
    color: '#333',
    backgroundColor: '#f0f0f0',
    padding: '8px',
    borderRadius: '8px',
    marginBottom: '5px',
    maxWidth: '80%',
  },
  cargando: {
    textAlign: 'center',
    color: '#888',
    fontStyle: 'italic',
    marginTop: '10px',
  },
  inputContainer: {
    display: 'flex',
    width: '100%',
    maxWidth: '600px',
  },
  input: {
    flexGrow: 1,
    padding: '10px',
    borderRadius: '8px 0 0 8px',
    border: '1px solid #ccc',
    fontSize: '1em',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '0 8px 8px 0',
    cursor: 'pointer',
    fontSize: '1em',
  },
};

export default App;
