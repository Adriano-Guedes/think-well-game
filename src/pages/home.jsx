import React, { useState } from 'react';
import LevelSelect from './levelSelect';
import Game from './game';

function Home() {
  const [jogoIniciado, setJogoIniciado] = useState(false);
  const [temaSelecionado, setTemaSelecionado] = useState(null);

  const iniciarJogo = () => {
    setJogoIniciado(true);
  };

  const sair = () => {
    window.close();
  };

  const escolherTema = (tema) => {
    setTemaSelecionado(tema);
  };

  const voltarAoInicio = () => {
    setTemaSelecionado(null);
    setJogoIniciado(false);
  };

  if (temaSelecionado) {
    return <Game tema={temaSelecionado} voltarAoInicio={voltarAoInicio} />;
  }

  if (jogoIniciado) {
    return <LevelSelect escolherTema={escolherTema} voltarAoInicio={voltarAoInicio} />;
  }

  return (
    <div style={styles.container}>
      <div style={styles.retanguloBranco}>
        <div style={styles.retanguloPreto}>
          <span style={styles.textoTela}>Pense Bem</span>
        </div>

        <div style={styles.botoes}>
          <button style={styles.botaoInicio} onClick={iniciarJogo}>
            Começar Jogo
          </button>
          <button style={{...styles.botaoInicio, backgroundColor: 'darkred', fontWeight: 'bold'}} onClick={sair}>
            Sair
          </button>
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
  botaoInicio: {
    width: '370px',
    height: '120px',
    backgroundColor: 'black',
    color: 'white',
    border: 'none',
    fontSize: '2.0rem',
    borderRadius: '10px',
    cursor: 'pointer',
    minWidth: '250px',
  },
};

export default Home;