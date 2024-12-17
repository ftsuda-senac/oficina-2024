import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function Form() {

  const [opcoesInteresses, setOpcoesInteresses] = useState([]);
  const [dados, setDados] = useState({});
  const [erros, setErros] = useState({});
  const [interessesIds, setInteressesIds] = useState([]);

  useEffect(() => {
    async function carregarInteresses() {
      const httpResp = await fetch('http://localhost:8080/api/interesses');
      if (!httpResp.ok) {
        return;
      }
      const opcoes = await httpResp.json();
      setOpcoesInteresses(opcoes);
    }
    carregarInteresses();
  }, []);

  function handleInputChange(evt) {
    const nomeCampo = evt.target.name;
    const valorCampo = evt.target.value;
    setDados((atual) => ({
      ...atual,
      [nomeCampo]: valorCampo
    }));
  }

  function handleCheckboxChange(evt) {
    const chkbox = evt.target;
    const numValue = Number(chkbox.value);

    if (chkbox.checked) {
      if (!interessesIds.includes(numValue)) {
        setInteressesIds((atual) => [...atual, numValue]);
      }
    } else {
      setInteressesIds((atual) => atual.filter(val => val !== numValue));
    }
  }

  async function salvar(evt) {
    evt.preventDefault();
    const httpResp = await fetch('http://localhost:8080/api/pessoas', {
      method: 'post',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        ...dados,
        interessesIds
      })
    });
    if (!httpResp.ok) {
      if (httpResp.status === 400) {
        const errosCampos = await httpResp.json();
        let errosTemp = {};
        for (const err of errosCampos.errors) {
          errosTemp = {
            ...errosTemp,
            [err.field]: err.defaultMessage
          }
        }
        setErros(errosTemp);
        return;
      }
      alert('Erro ao salvar - ' + httpResp.status);
      return;
    }
    alert('Dados incluidos com sucesso');
  }

  useEffect(() => {
    console.log(JSON.stringify(dados))
  }, [dados]);

  useEffect(() => {
    console.log(JSON.stringify(interessesIds))
  }, [interessesIds]);

  return (
    <div className="container-lg flex-shrink-0">
      <div className="row">
        <main className="col-lg-12">
          <h1>Pessoas - React JS</h1>

          <h2 id="tituloInclusao" className="d-none">
            Incluir nova pessoa
          </h2>
          <h2 id="tituloAlteracao" className="d-none">
            Alterar pessoa
          </h2>

          <form method="post" noValidate id="formDados" onSubmit={salvar}>
            <div className="row mb-3">
              <label htmlFor="txtNome" className="col-sm-2 col-form-label">
                Nome
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  name="nome"
                  value={dados.nome}
                  id="txtNome"
                  placeholder="Preencha o nome completo"
                  className={`form-control ${erros.nome ? 'is-invalid' : ''}`}
                  maxLength="100"
                  required
                  onChange={handleInputChange}
                />
                {
                  erros.nome && <div className="invalid-feedback">{erros.nome}</div>
                }
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="txtEmail" className="col-sm-2 col-form-label">
                E-mail
              </label>
              <div className="col-sm-10">
                <input
                  type="email"
                  name="email"
                  value={dados.email}
                  id="txtEmail"
                  placeholder="E-mail válido"
                  className={`form-control ${erros.email ? 'is-invalid' : ''}`}
                  maxLength="100"
                  required
                  onChange={handleInputChange}
                />
                {
                  erros.email && <div className="invalid-feedback">{erros.email}</div>
                }
              </div>
            </div>
            <div className="row mb-3">
              <label
                htmlFor="txtDataNascimento"
                className="col-sm-2 col-form-label"
              >
                Data de nascimento
              </label>
              <div className="col-sm-10">
                <input
                  type="date"
                  name="dataNascimento"
                  value={dados.dataNascimento || ''}
                  id="txtDataNascimento"
                  className={`form-control ${erros.dataNascimento ? 'is-invalid' : ''}`}
                  required
                  onChange={handleInputChange}
                />
                {
                  erros.dataNascimento && <div className="invalid-feedback">{erros.dataNascimento}</div>
                }
              </div>
            </div>
            <fieldset className="row mb-3">
              <legend className="col-sm-2 col-form-label pt-0">
                Interesses
              </legend>

              {/* <!-- OBS: OPÇÕES ABAIXO DEVEM SER CARREGADOS VIA AJAX --> */}
              {/* <!-- ESTAO APRESENTADOS DIRETAMENTE NESTE HTML SOMENTE COMO EXEMPLO --> */}
              <div className="col-sm-10">
                <div id="opcoesInteresses">
                  {
                    opcoesInteresses.map(i => {
                      const idHtml = `interesse${i.id}`;
                      return (
                        <div className="form-check form-check-inline" key={idHtml}>
                          <input
                            type="checkbox"
                            name="interessesIds"
                            value={i.id}
                            id={idHtml}
                            className="form-check-input"
                            onChange={handleCheckboxChange}
                          />
                          <label htmlFor={idHtml} className="form-check-label">
                            {i.nome}
                          </label>
                        </div>
                      )
                    })
                  }
                </div>
                <div className="invalid-feedback"></div>
              </div>
            </fieldset>

            <div className="row">
              <div className="col-md-3 offset-md-3">
                <div className="d-grid">
                  <NavLink to=".." className="btn btn-outline-dark" role="button">
                    Cancelar
                  </NavLink>
                </div>
              </div>
              <div className="col-md-3">
                <div className="d-grid">
                  <button type="submit" className="btn btn-success">
                    Salvar
                  </button>
                </div>
              </div>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}

export default Form;