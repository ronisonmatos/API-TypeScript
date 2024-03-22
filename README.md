# reference.api

Estrutura de controle de banco de dados postgresql e estrutura em typeORM com: 

Uma tabela contendo todas as cidades do Brasil;

### Execução em ambiente de desenvolvimento

Consulte **[Implantação](#-implanta%C3%A7%C3%A3o)** para saber como implantar o projeto.

### 📋 Pré-requisitos

De que coisas você precisa para instalar o software e como instalá-lo?

```
node
docker
```

### 🔧 Instalação

Uma série de exemplos passo-a-passo que informam o que você deve executar para ter um ambiente de desenvolvimento em execução.

Diga como essa etapa será:

```
Instalar o NodeJS
https://nodejs.org/pt-br/download
```

```
Instalar Docker
https://docs.docker.com/compose/install/
```

### Executando o ambiente de desenvolvimento

Antes de tudo copie o arquivo .env_example e cole com o nome apenas .env

Execute os comandos a seguir para instalar as dependencias e frameworks:

```
$ npm install
```
```
$ npm install -g ts-node
```

Em seguida:

```
$ npm run dev
```

Executar o npm install apenas a primeira vez ou se estiver uma nova dependência de framework.

## 📦 .evn

No arquivo .evn contém os principais parâmetros de configurações.

```
É necessário renomear o arquivo .env_example para .evn
```

## 📦 Implantação

Para implantação ou até mesmo testes executar em docker na raiz do projeto

```
$ npm run build
```

