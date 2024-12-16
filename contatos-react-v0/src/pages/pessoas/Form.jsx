import React, { useState, useEffect } from 'react';

const PessoaForm = function () {

  const [interesses, setInteresses] = useState([]);
  const [pessoa, setPessoa] = useState({});
  const [erros, setErros] = useState({});

  useEffect(() => {
    const obterInteresses = async function() {
      const httpResp = await fetch('http://localhost:8080/api/interesses');
      if (!httpResp.ok) {
        alert('Erro ao carregar dados')
        return;
      }
      const dadosJson = await httpResp.json();
      setInteresses(dadosJson);
    };
    obterInteresses();
  });

  const handleInputChange = function(evt) {
    setPessoa((atual) => ({
      ...atual,
      [evt.target.name]: evt.target.value
    }));
  }

  const handleCheckboxChange = function(evt) {
    const chkbox = evt.target;
    const numValue = Number(chkbox.value);
    let interesses = pessoa.interessesIds || [];

    if (chkbox.checked) {
      if (!interesses?.includes(numValue)) {
        interesses.push(numValue);
      }
    } else {
      interesses = interesses.filter(i => i !== numValue);
    }
    setPessoa((atual) => ({
      ...atual,
      interessesIds: interesses
    }));
  }

  const salvar = async function(evt) {
    evt.preventDefault();
    setErros({}); // Limpar erros
    const httpResp = await fetch('http://localhost:8080/api/pessoas', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(pessoa)
    });
    if (!httpResp.ok) {
      if (httpResp.status === 400) {
        // Validar erros dos campos
        const errosJson = await httpResp.json();
        let errosLocal = {}
        for (const err of errosJson.errors) {
          errosLocal = {
            ...errosLocal,
            [err.field]: err.defaultMessage };
        };
        setErros(errosLocal);
        return;
      } else {
        alert('Erro ao salvar - ' + httpResp.status);
        return;
      }
    }
    alert('Pessoa incluida com sucesso');
  }

  useEffect(() => {
    console.log(JSON.stringify(pessoa))
  }, [pessoa]);

  return (
    <div className="container-lg flex-shrink-0">
      <div className="row">
        <main className="col-lg-12">
          <h1>Pessoas - React JS</h1>
          <h2 id="tituloInclusao" className="d-none">Incluir nova pessoa</h2>
          <h2 id="tituloAlteracao" className="d-none">Alterar pessoa</h2>
          <form method="post" noValidate id="formDados" onSubmit={salvar}>
            <div className="row mb-3">
              <label htmlFor="txtNome" className="col-sm-2 col-form-label">Nome</label>
              <div className="col-sm-10">
                <input type="text" name="nome" value={pessoa.nome} id="txtNome" placeholder="Preencha o nome completo"
                  className={`form-control ${erros.nome ? 'is-invalid' : ''}`}
                  maxlength="100" required onChange={handleInputChange} />
                  {
                    erros.nome &&  <div className="invalid-feedback">{erros.nome}</div>
                  }

              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="txtEmail" className="col-sm-2 col-form-label">E-mail</label>
              <div className="col-sm-10">
                <input type="email" name="email" value={pessoa.email} id="txtEmail" placeholder="E-mail válido"
                  className={`form-control ${erros.email ? 'is-invalid' : ''}`}
                  maxlength="100" required  onChange={handleInputChange} />
                  {
                    erros.email &&  <div className="invalid-feedback">{erros.email}</div>
                  }
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="txtDataNascimento" className="col-sm-2 col-form-label">Data de nascimento</label>
              <div className="col-sm-10">
                <input type="date" name="dataNascimento" value={pessoa.dataNascimento || ''} id="txtDataNascimento"
                  className={`form-control ${erros.dataNascimento ? 'is-invalid' : ''}`}
                  required  onChange={handleInputChange} />
                  {
                    erros.dataNascimento &&  <div className="invalid-feedback">{erros.dataNascimento}</div>
                  }
              </div>
            </div>
            <fieldset className="row mb-3">
              <legend className="col-sm-2 col-form-label pt-0">Interesses</legend>

              { /* <!-- OBS: OPÇÕES ABAIXO DEVEM SER CARREGADOS VIA AJAX --> */}
              { /* <!-- ESTAO APRESENTADOS DIRETAMENTE NESTE HTML SOMENTE COMO EXEMPLO --> */}
              <div className="col-sm-10">
                <div id="opcoesInteresses">
                  {
                    interesses.map(interesse => {
                      const interesseHtmlId = `interesse${interesse.id}`;
                      return (
                        <div className="form-check form-check-inline" key={interesseHtmlId}>
                          <input type="checkbox" name="interessesIds" value={interesse.id} id={interesseHtmlId}
                            className="form-check-input" onChange={handleCheckboxChange} />
                          <label htmlFor={interesseHtmlId} className="form-check-label">{interesse.nome}</label>
                        </div>
                      );
                    })
                  }
                </div>
                <div className="invalid-feedback"></div>
              </div>
            </fieldset>

            <div className="row">
              <div className="col-md-3 offset-md-3">
                <div className="d-grid">
                  <a href="index.html" role="button" className="btn btn-outline-dark">Cancelar</a>
                </div>
              </div>
              <div className="col-md-3">
                <div className="d-grid">
                  <button type="submit" className="btn btn-success">Salvar</button>
                </div>
              </div>
            </div>
          </form>
        </main>

      </div>
    </div>
  )
}

export default PessoaForm;
