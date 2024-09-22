import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cliente-detalhes',
  templateUrl: './cliente-detalhes.page.html',
  styleUrls: ['./cliente-detalhes.page.scss'],
})
export class ClienteDetalhesPage implements OnInit {
  cliente: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Receber os parâmetros passados pela navegação
    this.route.params.subscribe(params => {
      this.cliente = params;
    });
  }
}
