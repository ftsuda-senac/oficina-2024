function obterParametroId(evt) {  
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get('id');
  return id;
}

function mostrarMensagem(tipo, mensagem) {
  const elAlerta = document.getElementById('alerta');
  elAlerta.classList.add('d-none');
  elAlerta.classList.remove('alert-success', 'alert-error', 'alert-info');

  let classAlerta;
  switch (tipo) {
    case 'sucesso':
      classAlerta = 'alert-success';
      break;
    case 'erro':
      classAlerta = 'alert-error';
      break;
    case 'info':
      classAlerta = 'alert-info';
      break;
  }
  elAlerta.classList.add(classAlerta);
  elAlerta.classList.remove('d-none');
  elAlerta.textContent = mensagem
}

async function obterDados(url) {
  const httpResp = await fetch(url);
  if (!httpResp.ok) {
    return {
      sucesso: false,
      codigoErro: httpResp.status,
      mensagem: 'Erro ao buscar dados'
    };
  }
  const dados = await httpResp.json();
  return {
    sucesso: true,
    conteudo: dados
  }
}

async function enviarDados(httpMethod, url, dados, contentType = 'application/json') {
  console.log(JSON.stringify(dados))
  const httpResp = await fetch(url, {
    method: httpMethod,
    headers: {
      'content-type': contentType
    },
    body: JSON.stringify(dados)
  });
  if (!httpResp.ok) {
    let mensagemErro;
    let errosCampos;
    if (httpResp.status === 400) {
      mensagemErro = 'Erro nas informações enviadas';
      const dadosErro = await httpResp.json();
      if (dadosErro && dadosErro.errors && dadosErro.errors.length > 0) {
        errosCampos = [];
        for (const erro of dadosErro.errors) {
          const nomeCampo = erro.field;
          const mensagemErroCampo = erro.defaultMessage;
          errosCampos.push({
            nomeCampo,
            mensagem: mensagemErroCampo
          });
        }
      }
    }
    return {
      sucesso: false,
      codigoErro: httpResp.status,
      mensagem: mensagemErro || 'Erro genérico ao enviar dados',
      errosCampos
    };
  }
  return {
    sucesso: true
  }
}

async function excluir(url) {
  const httpResp = await fetch(url, {
    method: 'DELETE'
  });
  if (!httpResp.ok) {
    return {
      sucesso: false,
      codigoErro: httpResp.status,
      mensagem: 'Erro ao excluir dados'
    };
  }
  return {
    sucesso: true
  }
}