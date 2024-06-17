package br.senac.tads.oficina.contatos;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PessoaService {

    public final PessoaRepository pessoaRepository;

    public final InteresseRepository interesseRepository;

    public PessoaService(PessoaRepository pessoaRepository, InteresseRepository interesseRepository) {
        this.pessoaRepository = pessoaRepository;
        this.interesseRepository = interesseRepository;
    }

    public long count() {
        return pessoaRepository.count();
    }

    public List<PessoaDto> findAll() {
        return pessoaRepository.findAllWithInteresses().stream().map(PessoaDto::new).toList();
    }

    public Optional<PessoaDto> findById(int id) {
        return pessoaRepository.findById(id).map(PessoaDto::new);
    }

    @Transactional
    public PessoaDto addNew(PessoaInputDto pessoaDto) {
        Pessoa pessoa = pessoaDto.newEntity();
        Set<Interesse> interesses = pessoaDto.interessesIds().stream()
            .map(interesseId -> interesseRepository.getReferenceById(interesseId))
            .collect(Collectors.toSet());
        pessoa.setInteresses(interesses);
        pessoaRepository.save(pessoa);
        return new PessoaDto(pessoa);
    }

    @Transactional
    public PessoaDto update(int id, PessoaInputDto pessoaDto) {
        Pessoa pessoa = pessoaRepository.findById(id).orElseThrow();
        pessoa = pessoaDto.updateEntity(pessoa);
        Set<Interesse> interesses = pessoaDto.interessesIds().stream()
            .map(interesseId -> interesseRepository.getReferenceById(interesseId))
            .collect(Collectors.toSet());
        pessoa.setInteresses(interesses);
        pessoaRepository.save(pessoa);
        return new PessoaDto(pessoa);
    }

    @Transactional
    public void delete(int id) {
        pessoaRepository.deleteById(id);
    }

}
