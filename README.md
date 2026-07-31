# History.com - JSON Server Edition

Uma aplicação web dinâmica desenvolvida com **React** e **Vite**, focada na visualização e gerenciamento de registros históricos. O projeto utiliza o **Bootstrap 5** para uma interface clássica e responsiva, e o **JSON Server** para simular uma API REST completa de forma simples e eficiente.

## 🚀 Funcionalidades

* **Listagem de Eventos:** Exibição de fatos históricos recuperados de uma base de dados mockada.
* **CRUD Completo:** Adição, edição e exclusão de eventos históricos diretamente pela interface.
* **Design Clássico:** Interface limpa e profissional utilizando os componentes do **Bootstrap 5**.
* **Consumo de API:** Comunicação assíncrona com o backend via Fetch ou Axios.
* **Filtros de Data:** (Se implementado) Organize a história por períodos ou categorias.

## 🛠️ Tecnologias Utilizadas

* **ReactJS**: Biblioteca principal para construção da interface.
* **Vite**: Ferramenta de build ultra-rápida.
* **Bootstrap 5**: Framework CSS para layout e componentes responsivos.
* **JSON Server**: API Mock para simulação de backend RESTful.
* **React Icons**: Conjunto de ícones para melhorar a UX.
* **TypeScript**: Tipagem estática para melhor desenvolvimento.
* **Express.js**: Backend para API RESTful completa.

## 📁 Estrutura do Projeto

view-source:/home/marthamarinho/Programming/git-clones/history-dot-com-json-server

## 🔧 Como rodar o projeto

### Pré-requisitos
Certifique-se de ter o Node.js instalado em sua máquina.

### Instalação
Clone o repositório e instale as dependências:

```bash
git clone [https://github.com/mvdevelop/history-dot-com-json-server.git](https://github.com/mvdevelop/history-dot-com-json-server.git)
cd history-dot-com-json-server
npm install
```

### Iniciar os Servidores

**Backend (Express.js):**
```bash
# No diretório backend
cd backend
npm run dev
```

**Frontend (Vite):**
```bash
# No diretório raiz do projeto
cd history-dot-com-json-server
npm run dev
```

Acesse: http://localhost:5173

**Ou execute ambos simultaneamente:**
```bash
# Terminal 1
cd backend
npm run dev

# Terminal 2
cd history-dot-com-json-server
npm run dev
```

## 👨‍💻 Autor

Desenvolvido por mvdevelop.

GitHub: @mvdevelop

## 📄 Licença

Este projeto está sob a licença MIT.

## 📋 Próximos Passos

1. **Configuração do Backend:** Execute `npm install` no diretório backend
2. **Configuração do Frontend:** Execute `npm install` no diretório raiz
3. **Teste:** Inicie ambos servidores e teste as funcionalidades CRUD
4. **Documentação:** Atualize a documentação conforme necessário