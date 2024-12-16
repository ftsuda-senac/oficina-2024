import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Modal from "react-bootstrap/Modal";

const carregarDados = async function() {
  const httpResp = await fetch('http://localhost:8080/api/pessoas');
  if (!httpResp.ok) {
    alert('Erro ao carregar dados')
    return;
  }
  const dadosJson = await httpResp.json();
  return dadosJson;
};

const PessoaLista = function () {

  const [dados, setDados] = useState([]);

  const [showModalExcluir, setShowModalExcluir] = useState(false);
  const [modalExcluirInfo, setModalExcluirInfo] = useState({
    id: null,
    titulo: 'Confirmar exclusão',
    mensagem: 'Confirmar exclusão da pessoa ID?'
  });

  useEffect(() => {
    const carregarDadosAsync = async () => {
      const dados = await carregarDados();
      setDados(dados);
    };
    carregarDadosAsync();
  }, []);

  function handleConfirmarExclusao(id) {
    setShowModalExcluir(true);
    setModalExcluirInfo({
      id: id,
      titulo: 'Confirmar exclusão',
      mensagem: 'Confirmar exclusão da pessoa ID ' + id + '?'
    });
  }

  async function handleExclusao(id) {
    setShowModalExcluir(false);
    const httpResp = await fetch(`http://localhost:8080/api/pessoas/${id}`, {
      method: 'delete'
    });
    if (!httpResp.ok) {
      alert('Erro ao excluir pessoa');
      return;
    }
    alert(`Pessoa ID ${id} excluida com sucesso`);
    setDados(await carregarDados());
  }

  return (
    <>
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
                  dados.map(p => (
                    <tr key={`pessoa${p.id}`}>
                      <td>{p.id}</td>
                      <td>{p.nome}</td>
                      <td>{p.email}</td>
                      <td>{p.dataNascimento}</td>
                      <td>
                        <div className="btn-group" role="group" aria-label="Ações">
                          <NavLink to={`alterar/${p.id}`}
                            className="btn btn-primary" role="button"><i className="fas fa-edit"></i> Alterar</NavLink>
                          <button type="button" className="btn btn-danger" onClick={() => handleConfirmarExclusao(p.id)}>
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
              <NavLink to="novo" className="btn btn-lg btn-success"
                role="button"><i className="fas fa-plus-square"></i> Incluir novo</NavLink>
            </div>
          </main>
        </div>
      </div>
      <Modal show={showModalExcluir} backdrop="static" keyboard={false}>
        <Modal.Header>{modalExcluirInfo.titulo}</Modal.Header>
        <Modal.Body>
          <p>{modalExcluirInfo.mensagem}</p>
        </Modal.Body>
        <Modal.Footer>
          <button type="button" className="btn btn-outline-dark" onClick={() => setShowModalExcluir(false)}>Não</button>
          <button type="submit" className="btn btn-danger" onClick={() => handleExclusao(modalExcluirInfo.id)}>Sim</button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default PessoaLista;
