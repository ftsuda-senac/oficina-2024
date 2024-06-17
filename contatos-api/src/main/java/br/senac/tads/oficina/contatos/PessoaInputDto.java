package br.senac.tads.oficina.contatos;

import java.time.LocalDate;
import java.util.List;


import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Size;

public record PessoaInputDto (

    @NotBlank(message = "Nome obrigatório")
    @Size(max = 100, message = "Nome muito comprido")
    String nome,

    @NotBlank(message = "E-mail obrigatório")
    @Size(max = 100, message = "E-mail muito comprido")
    @Email(message = "E-mail inválido")
    String email,

    @PastOrPresent(message = "Data de nascimento inválida")
    LocalDate dataNascimento,

    @Size(min = 1, message = "Escolher pelo menos um interesse")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    List<Integer> interessesIds) {

    public Pessoa newEntity() {
        return updateEntity(new Pessoa());
    }

    public Pessoa updateEntity(Pessoa entity) {
        entity.setNome(this.nome());
        entity.setEmail(this.email());
        entity.setDataNascimento(this.dataNascimento());
        return entity;
    }
}
