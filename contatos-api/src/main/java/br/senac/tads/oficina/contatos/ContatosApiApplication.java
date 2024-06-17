package br.senac.tads.oficina.contatos;

import java.time.LocalDate;
import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.transaction.annotation.Transactional;

@SpringBootApplication
public class ContatosApiApplication implements CommandLineRunner {

	private InteresseRepository interesseRepository;

	private PessoaService pessoaService;

	@Autowired
	public void setInteresseRepository(InteresseRepository interesseRepository) {
		this.interesseRepository = interesseRepository;
	}

	@Autowired
	public void setPessoaService(PessoaService pessoaService) {
		this.pessoaService = pessoaService;
	}

	public static void main(String[] args) {
		SpringApplication.run(ContatosApiApplication.class, args);
	}

	public void addNewItem(PessoaInputDto dto) {
		pessoaService.addNew(dto);
	}
	
    // Executa após a inicialização do sistema para cadastrar dados iniciais no banco de dados H2
    // Para reiniciar os dados, parar a aplicação, apagar o arquivo de banco de dados do disco e reiniciar a aplicação
    @Override
    @Transactional
    public void run(String... args) throws Exception {
        if (interesseRepository.count() < 1) {
            interesseRepository.save(new Interesse("Java"));
            interesseRepository.save(new Interesse("Angular"));
            interesseRepository.save(new Interesse("Javascript"));
			interesseRepository.save(new Interesse("Typescript"));
            interesseRepository.save(new Interesse("User experience"));
            interesseRepository.save(new Interesse("Banco de dados"));
			interesseRepository.save(new Interesse("Testes"));
        }

		if (pessoaService.count() < 1) {
            addNewItem(new PessoaInputDto("Rodrigo Leite", "rodrigo.leite@email.com.br", LocalDate.parse("1969-03-06"), Arrays.asList(2, 4)));
			addNewItem(new PessoaInputDto("Daiane Lins", "daiane.lins@email.com.br", LocalDate.parse("1964-01-14"), Arrays.asList(3, 1)));
			addNewItem(new PessoaInputDto("Verônica Sanches", "veronica.sanches@email.com.br", LocalDate.parse("1991-08-28"), Arrays.asList(5, 6, 3)));
			addNewItem(new PessoaInputDto("Gislaine Neves", "gislaine.neves@email.com.br", LocalDate.parse("1976-02-15"), Arrays.asList(1, 3, 4)));
			addNewItem(new PessoaInputDto("Bernardo Farias", "bernardo.farias@email.com.br", LocalDate.parse("1975-04-19"), Arrays.asList(1, 2, 6)));
			addNewItem(new PessoaInputDto("Jessica Silva", "jessica.silva@email.com.br", LocalDate.parse("1968-06-17"), Arrays.asList(1, 3, 4)));
			addNewItem(new PessoaInputDto("Miriam dos Santos", "miriam.santos@email.com.br", LocalDate.parse("1989-06-22"), Arrays.asList(1, 5)));
			addNewItem(new PessoaInputDto("Arthur Novaes", "arthur.novaes@emailemail.com.br", LocalDate.parse("1962-11-16"), Arrays.asList(5, 7)));
			addNewItem(new PessoaInputDto("Clotilde Lombardi", "clotilde.lombardi@email.com.br", LocalDate.parse("1997-06-26"), Arrays.asList(1, 2, 3)));
			addNewItem(new PessoaInputDto("Raul Santiago", "raul.santiago@email.com.br", LocalDate.parse("1988-10-06"), Arrays.asList(2, 3, 4, 5)));
		}
	}

}
