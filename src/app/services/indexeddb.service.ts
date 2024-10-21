import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IndexedDBService {
  getProdutosByEstoque(id_estoque: number) {
    throw new Error('Method not implemented.');
  }
  private dbName: string = 'EstoqueDB';
  private dbVersion: number = 2;  // Atualize a versão do banco para aplicar a nova object store

  constructor() {
    this.openDB();
  }

  // Método para abrir o IndexedDB e criar as object stores
  private openDB() {
    const request = indexedDB.open(this.dbName, this.dbVersion);

    request.onupgradeneeded = (event: any) => {
      const db = event.target.result;

      // Criação da object store 'produtos' se ainda não existir
      if (!db.objectStoreNames.contains('produtos')) {
        db.createObjectStore('produtos', { keyPath: 'id_produto', autoIncrement: true });
      }

      // Criação da object store 'movimentacoes' para armazenar as movimentações
      if (!db.objectStoreNames.contains('movimentacoes')) {
        db.createObjectStore('movimentacoes', { keyPath: 'id_movimentacao', autoIncrement: true });
      }

      // Criação da object store 'categorias' para armazenar as categorias
      if (!db.objectStoreNames.contains('categorias')) {
        db.createObjectStore('categorias', { keyPath: 'id_categoria', autoIncrement: true });
      }

      // Criação da object store 'estoques' para armazenar os estoques
      if (!db.objectStoreNames.contains('estoques')) {
        db.createObjectStore('estoques', { keyPath: 'id_estoque', autoIncrement: true });
      }
    };

    request.onsuccess = () => {
      console.log('Banco de dados aberto com sucesso');
    };

    // Tipo explícito para `error` como `Event`
    request.onerror = (error: Event) => {
      console.error('Erro ao abrir o banco de dados:', error);
    };
  }

  // Produto CRUD

  // Adicionar produto
  addProduto(produto: any): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);

      request.onsuccess = (event: any) => {
        const db = event.target.result;
        const transaction = db.transaction('produtos', 'readwrite');
        const store = transaction.objectStore('produtos');

        const addRequest = store.add(produto);
        addRequest.onsuccess = () => {
          resolve();
        };
        // Tipo explícito para `error`
        addRequest.onerror = (error: Event) => {
          reject(error);
        };
      };
    });
  }

  // Listar produtos
  getProdutos(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);

      request.onsuccess = (event: any) => {
        const db = event.target.result;
        const transaction = db.transaction('produtos', 'readonly');
        const store = transaction.objectStore('produtos');
        const produtos: any[] = [];

        store.openCursor().onsuccess = (e: any) => {
          const cursor = e.target.result;
          if (cursor) {
            produtos.push(cursor.value);
            cursor.continue();
          } else {
            resolve(produtos);
          }
        };

        store.openCursor().onerror = (error: Event) => {
          reject(error);
        };
      };
    });
  }

  // Excluir produto
  deleteProduto(id_produto: number): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);

      request.onsuccess = (event: any) => {
        const db = event.target.result;
        const transaction = db.transaction('produtos', 'readwrite');
        const store = transaction.objectStore('produtos');

        const deleteRequest = store.delete(id_produto);
        deleteRequest.onsuccess = () => {
          resolve();
        };
        deleteRequest.onerror = (error: Event) => {
          reject(error);
        };
      };
    });
  }
// Atualizar produto
updateProduto(produto: any): Promise<void> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(this.dbName, this.dbVersion);

    request.onsuccess = (event: any) => {
      const db = event.target.result;
      const transaction = db.transaction('produtos', 'readwrite');
      const store = transaction.objectStore('produtos');

      // Usar `put` para atualizar o produto existente
      const updateRequest = store.put(produto);
      updateRequest.onsuccess = () => {
        resolve();
      };
      updateRequest.onerror = (error: Event) => {
        reject(error);
      };
    };
  });
}



  // Movimentações CRUD

  // Adicionar movimentação
  addMovimentacao(movimentacao: any): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);

      request.onsuccess = (event: any) => {
        const db = event.target.result;
        const transaction = db.transaction('movimentacoes', 'readwrite');
        const store = transaction.objectStore('movimentacoes');

        const addRequest = store.add(movimentacao);
        addRequest.onsuccess = () => {
          resolve();
        };
        addRequest.onerror = (error: Event) => {
          reject(error);
        };
      };
    });
  }

  // Listar movimentações
  getMovimentacoes(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);

      request.onsuccess = (event: any) => {
        const db = event.target.result;
        const transaction = db.transaction('movimentacoes', 'readonly');
        const store = transaction.objectStore('movimentacoes');
        const movimentacoes: any[] = [];

        store.openCursor().onsuccess = (e: any) => {
          const cursor = e.target.result;
          if (cursor) {
            movimentacoes.push(cursor.value);
            cursor.continue();
          } else {
            resolve(movimentacoes);
          }
        };

        store.openCursor().onerror = (error: Event) => {
          reject(error);
        };
      };
    });
  }

  // Excluir movimentação
  deleteMovimentacao(id_movimentacao: number): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);

      request.onsuccess = (event: any) => {
        const db = event.target.result;
        const transaction = db.transaction('movimentacoes', 'readwrite');
        const store = transaction.objectStore('movimentacoes');

        const deleteRequest = store.delete(id_movimentacao);
        deleteRequest.onsuccess = () => {
          resolve();
        };
        deleteRequest.onerror = (error: Event) => {
          reject(error);
        };
      };
    });
  }

  // Atualizar movimentação
updateMovimentacao(movimentacao: any): Promise<void> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(this.dbName, this.dbVersion);

    request.onsuccess = (event: any) => {
      const db = event.target.result;
      const transaction = db.transaction('movimentacoes', 'readwrite');
      const store = transaction.objectStore('movimentacoes');

      // Usar `put` para atualizar a movimentação existente
      const updateRequest = store.put(movimentacao);
      updateRequest.onsuccess = () => {
        resolve();
      };
      updateRequest.onerror = (error: Event) => {
        reject(error);
      };
    };
  });
}


  // Estoque CRUD

  // Adicionar estoque
  addEstoque(estoque: any): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);

      request.onsuccess = (event: any) => {
        const db = event.target.result;
        const transaction = db.transaction('estoques', 'readwrite');
        const store = transaction.objectStore('estoques');

        const addRequest = store.add(estoque);
        addRequest.onsuccess = () => {
          resolve();
        };
        addRequest.onerror = (error: Event) => {
          reject(error);
        };
      };
    });
  }

  // Listar estoques
  getEstoques(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);

      request.onsuccess = (event: any) => {
        const db = event.target.result;
        const transaction = db.transaction('estoques', 'readonly');
        const store = transaction.objectStore('estoques');
        const estoques: any[] = [];

        store.openCursor().onsuccess = (e: any) => {
          const cursor = e.target.result;
          if (cursor) {
            estoques.push(cursor.value);
            cursor.continue();
          } else {
            resolve(estoques);
          }
        };

        store.openCursor().onerror = (error: Event) => {
          reject(error);
        };
      };
    });
  }

  // Excluir estoque
  deleteEstoque(id_estoque: number): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);

      request.onsuccess = (event: any) => {
        const db = event.target.result;
        const transaction = db.transaction('estoques', 'readwrite');
        const store = transaction.objectStore('estoques');

        const deleteRequest = store.delete(id_estoque);
        deleteRequest.onsuccess = () => {
          resolve();
        };
        deleteRequest.onerror = (error: Event) => {
          reject(error);
        };
      };
    });
  }
  // Atualizar estoque
updateEstoque(estoque: any): Promise<void> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(this.dbName, this.dbVersion);

    request.onsuccess = (event: any) => {
      const db = event.target.result;
      const transaction = db.transaction('estoques', 'readwrite');
      const store = transaction.objectStore('estoques');

      // Usar `put` para atualizar o estoque existente
      const updateRequest = store.put(estoque);
      updateRequest.onsuccess = () => {
        resolve();
      };
      updateRequest.onerror = (error: Event) => {
        reject(error);
      };
    };
  });
}


  // Categoria CRUD

  // Adicionar categoria
  addCategoria(categoria: any): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);

      request.onsuccess = (event: any) => {
        const db = event.target.result;
        const transaction = db.transaction('categorias', 'readwrite');
        const store = transaction.objectStore('categorias');

        const addRequest = store.add(categoria);
        addRequest.onsuccess = () => {
          resolve();
        };
        addRequest.onerror = (error: Event) => {
          reject(error);
        };
      };
    });
  }

  // Listar categorias
  getCategorias(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);

      request.onsuccess = (event: any) => {
        const db = event.target.result;
        const transaction = db.transaction('categorias', 'readonly');
        const store = transaction.objectStore('categorias');
        const categorias: any[] = [];

        store.openCursor().onsuccess = (e: any) => {
          const cursor = e.target.result;
          if (cursor) {
            categorias.push(cursor.value);
            cursor.continue();
          } else {
            resolve(categorias);
          }
        };

        store.openCursor().onerror = (error: Event) => {
          reject(error);
        };
      };
    });
  }

  // Excluir categoria
  deleteCategoria(id_categoria: number): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);

      request.onsuccess = (event: any) => {
        const db = event.target.result;
        const transaction = db.transaction('categorias', 'readwrite');
        const store = transaction.objectStore('categorias');

        const deleteRequest = store.delete(id_categoria);
        deleteRequest.onsuccess = () => {
          resolve();
        };
        deleteRequest.onerror = (error: Event) => {
          reject(error);
        };
      };
    });
  }
 // Atualizar categoria
updateCategoria(categoria: any): Promise<void> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(this.dbName, this.dbVersion);

    request.onsuccess = (event: any) => {
      const db = event.target.result;
      const transaction = db.transaction('categorias', 'readwrite');
      const store = transaction.objectStore('categorias');

      // Usar `put` para atualizar a categoria existente
      const updateRequest = store.put(categoria);
      updateRequest.onsuccess = () => {
        resolve();
      };
      updateRequest.onerror = (error: Event) => {
        reject(error);
      };
    };
  });
  }
}