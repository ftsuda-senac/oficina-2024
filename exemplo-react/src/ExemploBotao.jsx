import {useState, useEffect} from 'react';
import './ExemploBotao.css';

function ExemploBotao(props) {
  
  const [desabilitado, setDesabilitado] = useState(false);
  const [contador, setContador] = useState(0);

  useEffect(() => {
    if (contador > 0) {
      const timer = setTimeout(() => {
        setContador(contador - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (contador === 0 && desabilitado) {
      setDesabilitado(false);
    }
  }, [contador, desabilitado]);

  function handleClick() {
    setContador(3);
    setDesabilitado(true);
  }

  let textoBotao;
  if (desabilitado) {
    textoBotao = 'Reabilitar em ' + contador + ' segundos';
  } else {
    textoBotao = props.children;
  }
  return <button onClick={handleClick} disabled={desabilitado}>{textoBotao}</button>
}

export default ExemploBotao;