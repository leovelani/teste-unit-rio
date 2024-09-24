import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovimentacoesPage } from './movimentacoes.page';

describe('MovimentacoesPage', () => {
  let component: MovimentacoesPage;
  let fixture: ComponentFixture<MovimentacoesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MovimentacoesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
