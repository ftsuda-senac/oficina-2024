package br.senac.tads.oficina.contatos;

import java.util.List;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface PessoaRepository extends JpaRepository<Pessoa, Integer> {

    @EntityGraph(attributePaths = "interesses")
    @Query("SELECT p FROM Pessoa p")
    List<Pessoa> findAllWithInteresses();

}
