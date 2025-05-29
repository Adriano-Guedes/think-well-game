import React from 'react';

function LevelSelect({ escolherTema, voltarAoInicio }) {
  return (
    <div style={styles.container}>
      <div style={styles.retanguloBranco}>
        <div style={styles.retanguloPreto}>
          <span style={styles.textoTela}>Escolha um tema:</span>
        </div>

        <div style={styles.botoes}>
          <button style={styles.botaoJogo} onClick={() => escolherTema('Tema Videogames')}>Videogames</button>
          <button style={styles.botaoJogo} onClick={() => escolherTema('Tema Geografia')}>Geografia</button>
          <button style={styles.botaoJogo} onClick={() => escolherTema('Tema Matematica')}>Matemática</button>
          <button style={styles.botaoJogo} onClick={() => escolherTema('Tema Ciencias')}>Ciências</button>
          <button style={styles.botaoJogo} onClick={() => escolherTema('Tema Cultura Pop')}>Cultura Pop</button>
          <button style={{...styles.botaoJogo, backgroundColor: 'darkred', fontWeight: 'bold'}} onClick={voltarAoInicio}>Voltar</button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: '100vh',
    width: '100vw',
    backgroundColor: 'black',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  retanguloBranco: {
    backgroundColor: 'white',
    width: '30vw',
    height: '80vh',
    borderRadius: '10px',
    boxShadow: '0 0 20px rgba(255, 255, 255, 0.2)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '30px',
    paddingBottom: '30px',
    boxSizing: 'border-box',
    overflowY: 'auto',
  },
  retanguloPreto: {
    backgroundColor: 'black',
    width: '90%',
    height: '35%',
    borderRadius: '6px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '50px',
    textAlign: 'center',
  },
  textoTela: {
    color: 'white',
    fontSize: '2.5rem',
    fontWeight: 'bold',
  },
  botoes: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
  },
  botaoJogo: {
    backgroundColor: 'black',
    color: 'white',
    border: 'none',
    padding: '20px 60px',
    fontSize: '1.5rem',
    borderRadius: '10px',
    cursor: 'pointer',
    minWidth: '250px',
  }
};

export default LevelSelect;