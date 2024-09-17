import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente.model';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage {
  clientes: Cliente[] = [
    { 
      nome: 'João Silva', 
      telefone: '(43) 99999-9991', 
      email: 'joao.silva@example.com', 
      endereco: 'Rua A, 123', 
      nascimento: '1985-01-15', 
      status: 'Ativo' 
    },
    { 
      nome: 'Maria Oliveira', 
      telefone: '(43) 99999-9992', 
      email: 'maria.oliveira@example.com', 
      endereco: 'Rua B, 456', 
      nascimento: '1990-03-22', 
      status: 'Ativo' 
    },
    { 
      nome: 'Carlos Souza', 
      telefone: '(43) 99999-9993', 
      email: 'carlos.souza@example.com', 
      endereco: 'Rua C, 789', 
      nascimento: '1988-07-30', 
      status: 'Inativo' 
    },
    { 
      nome: 'Ana Martins', 
      telefone: '(43) 99999-9994', 
      email: 'ana.martins@example.com', 
      endereco: 'Rua D, 101', 
      nascimento: '1993-04-04', 
      status: 'Inativo' 
    },
    { 
      nome: 'Pedro Lima', 
      telefone: '(43) 99999-9995', 
      email: 'pedro.lima@example.com', 
      endereco: 'Rua E, 202', 
      nascimento: '1980-11-18', 
      status: 'Ativo' 
    },
    { 
      nome: 'Julia Rocha', 
      telefone: '(43) 99999-9996', 
      email: 'julia.rocha@example.com', 
      endereco: 'Rua F, 303', 
      nascimento: '1995-09-12', 
      status: 'Ativo' 
    },
    { 
      nome: 'Fernando Castro', 
      telefone: '(43) 99999-9997', 
      email: 'fernando.castro@example.com', 
      endereco: 'Rua G, 404', 
      nascimento: '1975-02-28', 
      status: 'Ativo' 
    },
    { 
      nome: 'Mariana Ferreira', 
      telefone: '(43) 99999-9998', 
      email: 'mariana.ferreira@example.com', 
      endereco: 'Rua H, 505', 
      nascimento: '1983-06-21', 
      status: 'Inativo' 
    },
    { 
      nome: 'Rafael Mendes', 
      telefone: '(43) 99999-9999', 
      email: 'rafael.mendes@example.com', 
      endereco: 'Rua I, 606', 
      nascimento: '1992-08-08', 
      status: 'Ativo' 
    },
    { 
      nome: 'Gabriela Pinto', 
      telefone: '(43) 99999-99910', 
      email: 'gabriela.pinto@example.com', 
      endereco: 'Rua J, 707', 
      nascimento: '1989-12-15', 
      status: 'Inativo' 
    },
    { 
      nome: 'Rodrigo Alves', 
      telefone: '(43) 99999-99911', 
      email: 'rodrigo.alves@example.com', 
      endereco: 'Rua K, 808', 
      nascimento: '1996-05-10', 
      status: 'Ativo' 
    },
    { 
      nome: 'Camila Barbosa', 
      telefone: '(43) 99999-99912', 
      email: 'camila.barbosa@example.com', 
      endereco: 'Rua L, 909', 
      nascimento: '1991-01-25', 
      status: 'Inativo' 
    }
  ];

  constructor(private router: Router) {}

  // Método para navegar para a página de detalhes do cliente
  verDetalhes(cliente: Cliente) {
    this.router.navigate(['/cliente-detalhes', cliente]);
  }

  excluirCliente(index: number) {
    this.clientes.splice(index, 1);
  }
}
