package br.senac.tads.oficina.contatos;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public record PessoaDto(
    Integer id,
    String nome,
    String email,
    LocalDate dataNascimento,
    List<Interesse> interesses) {

    public PessoaDto(Pessoa entity) {
        this(entity.getId(), entity.getNome(), entity.getEmail(), entity.getDataNascimento(), new ArrayList<>(entity.getInteresses()));
    }

}
