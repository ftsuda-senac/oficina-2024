import { NavLink } from "react-router-dom";

function Lista() {
  return (
    <div className="container-lg flex-shrink-0">
      <div className="row">
        <main className="col-lg-12">
          <h1>Pessoas - React JS</h1>

          <div id="alerta" className="alert d-none" role="alert">
            <h4 className="alert-heading">Mensagem de alerta</h4>
          </div>

          <table className="table table-striped">
            <thead className="table-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nome</th>
                <th scope="col">E-mail</th>
                <th scope="col">Data nascimento</th>
                <th scope="col">Ações</th>
              </tr>
            </thead>
            <tbody id="dadosTabela">
              <tr>
                <td>1</td>
                <td>Exemplo 1</td>
                <td>exemplo1@teste.com.br</td>
                <td>09/06/1970</td>
                <td>
                  <div className="btn-group" role="group" aria-label="Ações">
                    <NavLink to="alterar/1" className="btn btn-primary" role="button">
                      <i className="fas fa-edit"></i> Alterar
                    </NavLink>
                    <button
                      type="button"
                      className="btn btn-danger"
                      data-bs-toggle="modal"
                      data-bs-target="#modalExcluir"
                      data-item-id="0"
                    >
                      <i className="fas fa-trash-alt"></i> Excluir
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>Exemplo 2</td>
                <td>exemplo2@teste.com.br</td>
                <td>09/06/1970</td>
                <td>
                  <div className="btn-group" role="group" aria-label="Ações">
                    <a className="btn btn-primary" role="button" href="form.html">
                      <i className="fas fa-edit"></i> Alterar
                    </a>
                    <button
                      type="button"
                      className="btn btn-danger"
                      data-bs-toggle="modal"
                      data-bs-target="#modalExcluir"
                      data-item-id="0"
                    >
                      <i className="fas fa-trash-alt"></i> Excluir
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div>
            <NavLink to="novo" className="btn btn-lg btn-success" role="button">
              <i className="fas fa-plus-square"></i> Incluir novo
            </NavLink>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Lista;
