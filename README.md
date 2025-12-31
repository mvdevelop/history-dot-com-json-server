
## ⏳ History.com - JSON Server Edition

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

## 📁 Estrutura do Projeto

history-dot-com-json-server/
├── src/
│   ├── components/   # Componentes da interface (Navbar, Cards, Modais)
│   ├── pages/        # Telas principais (Home, Detalhes, Admin)
│   ├── services/     # Configuração das chamadas à API
│   └── App.jsx       # Rotas e ponto central da aplicação
├── db.json           # Banco de dados simulado (JSON)
├── public/           # Arquivos estáticos
└── index.html        # Estrutura base

## 🔧 Como rodar o projeto
1. Pré-requisitos
Certifique-se de ter o Node.js instalado em sua máquina.

2. Instalação
Clone o repositório e instale as dependências:

Bash

git clone [https://github.com/mvdevelop/history-dot-com-json-server.git](https://github.com/mvdevelop/history-dot-com-json-server.git)
cd history-dot-com-json-server
npm install
3. Iniciar o Backend (JSON Server)
Em um terminal separado, inicie o servidor mock:

Bash

npx json-server --watch db.json --port 3001
4. Iniciar o Frontend (Vite)
No terminal principal, execute:

Bash

npm run dev
Acesse: http://localhost:5173

## 👨‍💻 Autor
Desenvolvido por mvdevelop.

GitHub: @mvdevelop

## 📄 Licença
Este projeto está sob a licença MIT.
