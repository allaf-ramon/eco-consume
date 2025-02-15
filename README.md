# EcoConsume

Sistema de análise de consumo de energia, permitindo visualizar economias e métricas por unidade consumidora.


## ✨ Funcionalidades

- **Análise de Economia**: Cálculo automático de economia utilizando a fórmula:
    ```
    (economia / (valor + economia + taxa_distribuição)) * 100
    ```
- **Importação Automática**: Processamento eficiente do arquivo `base_teste.csv`
- **Visualização em Tabela**: Interface intuitiva para análise de métricas por unidade

## 🚀 Como Executar

### Usando Docker (Recomendado)

```bash
# Clone o repositório
git clone https://github.com/allaf-ramon/eco-consume.git

# Entre na pasta do projeto
cd eco-consume

# Inicie os containers
docker-compose up --build
```

### Execução Local

```bash
# Instale as dependências
npm install

# Gere o cliente Prisma
npx prisma generate

# Execute as migrações
npx prisma migrate deploy

# Popule o banco de dados
npm run seed

# Build do projeto
npm run build

# Inicie a aplicação
npm run start
```

## 🛠️ Tecnologias

- Node.js
- Next.js
- Prisma
- PostgreSQL
- Docker
- Docker Compose

## 🔧 Configuração

A aplicação utiliza as seguintes variáveis de ambiente:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/base_teste"
```

## 📝 Notas

- A aplicação estará disponível em `http://localhost:3000`
- O banco de dados PostgreSQL roda na porta `5432`
- Os dados persistem através do volume Docker `db_data`
