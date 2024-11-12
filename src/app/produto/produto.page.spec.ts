import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProdutoPage } from './produto.page';
import { ModalController } from '@ionic/angular';
import { IndexedDBService } from '../services/indexeddb.service';
import { IonicModule } from '@ionic/angular';

// Suite de testes para o componente ProdutoPage
describe('ProdutoPage', () => {
  let component: ProdutoPage;
  let fixture: ComponentFixture<ProdutoPage>;
  let mockIndexedDBService: jasmine.SpyObj<IndexedDBService>;
  let modalControllerSpy: jasmine.SpyObj<ModalController>;

  // Configuração executada antes de cada teste
  beforeEach(async () => {
    // Criação de um mock para IndexedDBService usando jasmine.createSpyObj
    mockIndexedDBService = jasmine.createSpyObj('IndexedDBService', [
      'getCategorias',
      'getEstoques',
      'getProdutos',
      'updateProduto',
      'addProduto',
      'addMovimentacao',
      'deleteProduto'
    ]);
    // Mock para ModalController, simulando o método dismiss
    modalControllerSpy = jasmine.createSpyObj('ModalController', ['dismiss']);

    // Configurando os métodos do mock para retornar Promises resolvidas
    mockIndexedDBService.getCategorias.and.returnValue(Promise.resolve([]));
    mockIndexedDBService.getEstoques.and.returnValue(Promise.resolve([]));
    mockIndexedDBService.getProdutos.and.returnValue(Promise.resolve([]));

    // Configuração do ambiente de teste com TestBed
    await TestBed.configureTestingModule({
      declarations: [ProdutoPage], // Declaração do componente em teste
      imports: [FormsModule, IonicModule.forRoot()], // Importando módulos necessários
      providers: [
        { provide: IndexedDBService, useValue: mockIndexedDBService }, // Fornecendo o mock de IndexedDBService
        { provide: ModalController, useValue: modalControllerSpy } // Fornecendo o mock de ModalController
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA] // Permite o uso de elementos personalizados do Ionic
    }).compileComponents(); // Compilação do componente

    // Inicialização do componente e detecção de mudanças
    fixture = TestBed.createComponent(ProdutoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Teste que verifica se o componente é criado com sucesso
  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  // Teste para verificar se o método loadCategorias carrega as categorias corretamente
  it('deve carregar categorias ao chamar loadCategorias', async () => {
    const categoriasMock = [{ id_categoria: 1, nome_categoria: 'Categoria 1' }];
    mockIndexedDBService.getCategorias.and.returnValue(Promise.resolve(categoriasMock));

    await component.loadCategorias();
    expect(component.categorias).toEqual(categoriasMock); // Verifica se as categorias carregadas são as esperadas
  });

  // Teste para verificar se o método loadProdutos carrega os produtos corretamente
  it('deve carregar produtos ao chamar loadProdutos', async () => {
    const produtosMock = [{ id_produto: 1, nome_produto: 'Produto 1' }];
    mockIndexedDBService.getProdutos.and.returnValue(Promise.resolve(produtosMock));

    await component.loadProdutos();
    expect(component.produtos).toEqual(produtosMock); // Verifica se os produtos carregados são os esperados
  });

  // Teste para verificar se o modal é fechado ao chamar o método close
  it('deve fechar o modal ao chamar close', () => {
    component.close();
    expect(modalControllerSpy.dismiss).toHaveBeenCalled(); // Verifica se dismiss foi chamado
  });

  // Teste para verificar a adição de um novo produto ao chamar onSubmit com dados de um novo produto
  it('deve adicionar um produto ao chamar onSubmit com novo produto', async () => {
    component.produto = { nome_produto: 'Novo Produto', quantidade: 10 };
    mockIndexedDBService.addProduto.and.returnValue(Promise.resolve());
    mockIndexedDBService.addMovimentacao.and.returnValue(Promise.resolve());

    await component.onSubmit();

    // Verifica se addProduto foi chamado com o objeto produto contendo as propriedades corretas
    expect(mockIndexedDBService.addProduto).toHaveBeenCalledWith(jasmine.objectContaining({
      nome_produto: 'Novo Produto',
      quantidade: 10
    }));
    // Verifica se addMovimentacao foi chamado e se o formulário foi limpo
    expect(mockIndexedDBService.addMovimentacao).toHaveBeenCalled();
    expect(component.produto).toEqual({}); // Verifica se o produto foi resetado
  });

  // Teste para verificar a atualização de um produto existente ao chamar onSubmit com dados de um produto existente
  it('deve atualizar um produto ao chamar onSubmit com produto existente', async () => {
    component.produto = { id_produto: 1, nome_produto: 'Produto Atualizado', quantidade: 15 };
    mockIndexedDBService.updateProduto.and.returnValue(Promise.resolve());

    await component.onSubmit();

    // Verifica se updateProduto foi chamado com o objeto produto contendo as propriedades corretas
    expect(mockIndexedDBService.updateProduto).toHaveBeenCalledWith(jasmine.objectContaining({
      id_produto: 1,
      nome_produto: 'Produto Atualizado',
      quantidade: 15
    }));
    expect(component.produto).toEqual({}); // Verifica se o produto foi resetado
  });

});
