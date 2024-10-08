import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Listagem } from 'src/app/models/listagem.model';

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.page.html',
  styleUrls: ['./listagem.page.scss'],
})

export class ListagemPage {
    listagem: Listagem[] = [
        {
         nome: 'Doritos',
         categoria: 'Comidas',
        },
        {
         nome: 'Pepsi',
         categoria: 'Bebidas',
        },
        {
         nome: 'Maça',
         categoria: 'Frutas',
        },
        {
         nome: 'Championg 12 gramas',
         categoria: 'Conservados',
        },
    ];

    constructor(private router: Router) {}

    excluirLista(index: number) {
      this.listagem.splice(index, 1);
    }
}