import React, { useEffect, useState } from 'react';
import videogames from './perguntas/temaVideogames.json';
import geografia from './perguntas/temaGeografia.json';
import matematica from './perguntas/temaMatematica.json';
import ciencias from './perguntas/temaCiencias.json';
import culturaPop from './perguntas/temaCulturaPop.json';

function Game({ tema, voltarAoInicio }) {
  const [perguntas, setPerguntas] = useState([]);
  const [indice, setIndice] = useState(0);
  const [tentativas, setTentativas] = useState(0);
  const [feedbacks, setFeedbacks] = useState(['-', '-', '-']);
  const [pontuacao, setPontuacao] = useState(0);
  const [bloqueado, setBloqueado] = useState(false);

  const embaralharArray = (array) => {
    return array
      .map((item) => ({ item, ordem: Math.random() }))
      .sort((a, b) => a.ordem - b.ordem)
      .map(({ item }) => item);
  };

  useEffect(() => {
    let json;
    switch (tema) {
      case 'Tema Videogames':
        json = videogames;
        break;
      case 'Tema Geografia':
        json = geografia;
        break;
      case 'Tema Matematica':
        json = matematica;
        break;
      case 'Tema Ciencias':
        json = ciencias;
        break;
      case 'Tema Cultura Pop':
        json = culturaPop;
        break;
      default:
        json = [];
    }

    const temaAtual = json.find((t) => t.tema === tema);
    if (temaAtual) {
      const perguntasAleatorias = embaralharArray(temaAtual.perguntas);
      setPerguntas(perguntasAleatorias);
    }
  }, [tema]);

  const proximaPergunta = () => {
    setIndice((prev) => prev + 1);
    setTentativas(0);
    setFeedbacks(['-', '-', '-']);
    setBloqueado(false);
  };

  const handleResposta = (indiceEscolhido) => {
    if (bloqueado || indice >= perguntas.length) return;

    const perguntaAtual = perguntas[indice];
    const respostaCerta = perguntaAtual.correta;

    if (indiceEscolhido === respostaCerta) {
      const pontosGanhos = 3 - tentativas;
      setPontuacao((prev) => prev + pontosGanhos);
      setBloqueado(true);
      setTimeout(proximaPergunta, 1000);
    } else {
      const novasTentativas = tentativas + 1;
      const novosFeedbacks = [...feedbacks];
      novosFeedbacks[tentativas] = 'X';
      setFeedbacks(novosFeedbacks);
      setTentativas(novasTentativas);

      if (novasTentativas >= 3) {
        setBloqueado(true);
        setTimeout(proximaPergunta, 1000);
      }
    }
  };

  const sairDoJogo = () => {
    window.close();
  };

  if (indice >= perguntas.length && perguntas.length > 0) {
    return (
      <div style={styles.container}>
        <div style={styles.retanguloBranco}>
          <div style={styles.telaPrincipal}>
            <span style={styles.textoTela}>Parabéns!</span>
            <span style={styles.textoTela}>Pontuação final: {pontuacao} pontos</span>
          </div>

          <div style={styles.botoesFinais}>
            <button style={styles.botaoGrande} onClick={voltarAoInicio}>Voltar ao início</button>
            <button style={{ ...styles.botaoGrande, backgroundColor: 'darkred', fontWeight: 'bold'}} onClick={sairDoJogo}>Sair</button>
          </div>
        </div>
      </div>
    );
  }

  const perguntaAtual = perguntas[indice];

  return (
    <div style={styles.container}>
      <div style={styles.retanguloBranco}>
        <div style={styles.telaPrincipal}>
          {perguntas.length > 0 && (
            <span style={styles.indicador}>Pergunta {indice + 1} de {perguntas.length}</span>
          )}
          {perguntaAtual && (
            <span style={styles.textoTela}>{perguntaAtual.enunciado}</span>
          )}
        </div>

        <div style={styles.subtelas}>
          {feedbacks.map((f, idx) => (
            <div key={idx} style={styles.subtelaItem}>
              <span style={{ ...styles.traco, color: f === 'X' ? 'red' : 'white' }}>{f}</span>
            </div>
          ))}
        </div>

        <div style={styles.gridBotoes}>
          {perguntaAtual?.alternativas.map((alt, idx) => (
            <button
              key={idx}
              style={{ ...styles.botaoColorido, backgroundColor: cores[idx] }}
              onClick={() => handleResposta(idx)}
              disabled={bloqueado}
            >
              {alt}
            </button>
          ))}
        </div>

        <button style={{ ...styles.botaoInferior, backgroundColor: 'darkred', fontWeight: 'bold' }} onClick={voltarAoInicio}>Desistir</button>
      </div>
    </div>
  );
}

const cores = ['red', 'green', 'deepskyblue', 'yellow'];

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
    width: '40vw',
    height: '90vh',
    borderRadius: '10px',
    boxShadow: '0 0 20px rgba(255,255,255,0.2)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    boxSizing: 'border-box',
    justifyContent: 'start',
    gap: '20px',
  },
  telaPrincipal: {
    backgroundColor: 'black',
    width: '100%',
    minHeight: '20%',
    borderRadius: '6px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    padding: '10px',
    textAlign: 'center',
  },
  indicador: {
    color: 'lightgray',
    fontSize: '1.2rem',
    marginBottom: '10px',
  },
  textoTela: {
    color: 'white',
    fontSize: '1.8rem',
    margin: '5px 0',
  },
  subtelas: {
    display: 'flex',
    gap: '20px',
  },
  subtelaItem: {
    backgroundColor: 'black',
    width: '80px',
    height: '80px',
    borderRadius: '4px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  traco: {
    fontSize: '5rem',
    marginBottom: '5px',
  },
  gridBotoes: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '30px',
    marginTop: '10px',
  },
  botaoColorido: {
    width: '250px',
    height: '150px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1.3rem',
    color: 'black',
    fontWeight: 'bold',
    border: '4px solid black',
    boxShadow: '0 4px 8px rgba(0,0,0,0.5)'
  },
  botaoInferior: {
    backgroundColor: 'black',
    color: 'white',
    width: '220px',
    height: '55px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '22px',
    marginTop: '10px',
  },
  botoesFinais: {
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '50px',
  },
  botaoGrande: {
    backgroundColor: 'black',
    color: 'white',
    width: '300px',
    height: '80px',
    fontSize: '26px',
    borderRadius: '12px',
    border: 'none',
    cursor: 'pointer',
  },
};

export default Game;