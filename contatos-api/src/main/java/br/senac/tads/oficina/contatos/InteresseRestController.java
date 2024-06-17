package br.senac.tads.oficina.contatos;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/interesses")
public class InteresseRestController {

    private final InteresseRepository interesseRepository;

    public InteresseRestController(InteresseRepository interesseRepository) {
        this.interesseRepository = interesseRepository;
    }

    /**
     * Lista os interesses cadastrados
     * 
     * @return
     */
    @GetMapping
    public List<Interesse> findAll() {
        return interesseRepository.findAll();
    }

}
