import {useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function Lista() {

  const [dadosLista, setDadosLista] = useState([]);

  useEffect(() => {
    async function carregarLista() {
      const httpResp = await fetch('http://localhost:8080/api/pessoas');
      if (!httpResp.ok) {
        alert('Erro ao carregar dados');
        return;
      }
      const dados = await httpResp.json();
      setDadosLista(dados);
    }
    carregarLista();
  }, []);

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
              {
                dadosLista.map(p => (
                  <tr key={`pessoa${p.id}`}>
                    <td>{p.id}</td>
                    <td>{p.nome}</td>
                    <td>{p.email}</td>
                    <td>{p.dataNascimento}</td>
                    <td>
                      <div className="btn-group" role="group" aria-label="Ações">
                        <NavLink to={`alterar/${p.id}`} className="btn btn-primary" role="button">
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
                ))
              }
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
