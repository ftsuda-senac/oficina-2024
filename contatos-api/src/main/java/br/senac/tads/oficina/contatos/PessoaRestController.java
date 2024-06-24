package br.senac.tads.oficina.contatos;

import java.net.URI;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/pessoas")
@CrossOrigin(origins = "*")
public class PessoaRestController {

    private final PessoaService service;

    public PessoaRestController(PessoaService service) {
        this.service = service;
    }

    /**
     * Lista todas as pessoas cadastradas
     * 
     * @return
     */
    @GetMapping
    public List<PessoaDto> findAll() {
        return service.findAll();
    }

    /**
     * Obtém uma pessoa pelo ID
     * 
     * @param id
     * @return
     */
    @GetMapping("/{id}")
    public PessoaDto visualizar(@PathVariable("id") int id) {
        return service.findById(id).orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND, "[OPT] ID " + id + " não encontrado"));
    }

    /**
     * Inclui uma nova pessoa
     * 
     * @param pessoa
     * @return
     */
    @PostMapping
    public ResponseEntity<Void> addNew(@RequestBody @Valid PessoaInputDto pessoa) {
        PessoaDto output = service.addNew(pessoa);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(output.id()).toUri();
        return ResponseEntity.created(location).build();
    }

    /**
     * Atualiza a pessoa indicada pelo ID
     * 
     * @param id
     * @param pessoa
     * @return
     */
    @PutMapping("/{id}")
    public ResponseEntity<Void> alterar(@PathVariable("id") int id,
            @RequestBody @Valid PessoaInputDto pessoa) {
        // Verifica se ID existe
        service.findById(id).orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND, "ID " + id + " não encontrado"));
        service.update(id, pessoa);
        return ResponseEntity.ok().build();
    }

    /**
     * Remove a pessoa indicada pelo ID
     * 
     * @param id
     * @return
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable("id") int id) {
        // Verifica se ID existe
        service.findById(id).orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND, "ID " + id + " não encontrado"));
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

}
