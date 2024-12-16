import React from 'react';

const PessoaForm = function () {

  return (
    <div className="container-lg flex-shrink-0">
      <div className="row">
        <main className="col-lg-12">
          <h1>Pessoas - React JS</h1>
          <h2 id="tituloInclusao" className="d-none">Incluir nova pessoa</h2>
          <h2 id="tituloAlteracao" className="d-none">Alterar pessoa</h2>
          <form method="post" novalidate id="formDados">
            <div className="row mb-3">
              <label htmlFor="txtNome" className="col-sm-2 col-form-label">Nome</label>
              <div className="col-sm-10">
                <input type="text" name="nome" value="" id="txtNome" placeholder="Preencha o nome completo"
                  className="form-control" maxlength="100" required />
                <div className="invalid-feedback"></div>
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="txtEmail" className="col-sm-2 col-form-label">E-mail</label>
              <div className="col-sm-10">
                <input type="email" name="email" value="" id="txtEmail" placeholder="E-mail válido" className="form-control"
                  maxlength="100" required />
                <div className="invalid-feedback"></div>
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="txtDataNascimento" className="col-sm-2 col-form-label">Data de nascimento</label>
              <div className="col-sm-10">
                <input type="date" name="dataNascimento" value="" id="txtDataNascimento" className="form-control" required />
                <div className="invalid-feedback"></div>
              </div>
            </div>
            <fieldset className="row mb-3">
              <legend className="col-sm-2 col-form-label pt-0">Interesses</legend>

              { /* <!-- OBS: OPÇÕES ABAIXO DEVEM SER CARREGADOS VIA AJAX --> */}
              { /* <!-- ESTAO APRESENTADOS DIRETAMENTE NESTE HTML SOMENTE COMO EXEMPLO --> */}
              <div className="col-sm-10">
                <div id="opcoesInteresses">
                  <div className="form-check form-check-inline">
                    <input type="checkbox" name="interessesIds" value="0" id="interesse0" className="form-check-input" />
                    <label htmlFor="interesse0" className="form-check-label">Opção</label>
                  </div>
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
