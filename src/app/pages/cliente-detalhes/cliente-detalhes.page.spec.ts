import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClienteDetalhesPage } from './cliente-detalhes.page';

describe('ClienteDetalhesPage', () => {
  let component: ClienteDetalhesPage;
  let fixture: ComponentFixture<ClienteDetalhesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteDetalhesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
