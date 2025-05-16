<p align="center">
<img src="https://img95.pixhost.to/images/1083/472612217_8876.jpg" width="350" height="350"/>
</p>
<h1 align="center">🤖 LBot - Robô para WhatsApp</h1>
<p align="center">
<a href="#"><img title="Versão" src="https://img.shields.io/github/package-json/v/victorsouzaleal/lbot-whatsapp?label=vers%C3%A3o&color=#79C83D"/></a>
<a href="https://github.com/victorsouzaleal/followers"><img title="Seguidores" src="https://img.shields.io/github/followers/victorsouzaleal?label=seguidores&style=flat&color=#79C83D"/></a>
<a href="https://github.com/victorsouzaleal/lbot-whatsapp/stargazers/"><img title="Estrelas" src="https://img.shields.io/github/stars/victorsouzaleal/lbot-whatsapp?label=estrelas&style=flat&color=#79C83D"></a>
<a href="https://github.com/victorsouzaleal/lbot-whatsapp/watchers"><img title="Acompanhando" src="https://img.shields.io/github/watchers/victorsouzaleal/lbot-whatsapp?label=acompanhando&style=flat&color=#79C83D"></a>
<a href="https://github.com/victorsouzaleal"><img title="Autor" src="https://img.shields.io/badge/autor-victorsouzaleal-blue.svg?logo=github&color=#79C83D"></a>
</p>

<br>
<h2 align="center"> 👤 Contato e Doações: <a href="https://github.com/victorsouzaleal/lbot-whatsapp?tab=readme-ov-file#5----contato-e-doações">AQUI</a> </h2>
<h2 align="center"> 🔄 Notas de atualização: <a href="https://github.com/victorsouzaleal/lbot-whatsapp/blob/main/docs/CHANGELOG.md">AQUI</a></h2>

<br>

## 🚨 REQUERIMENTOS
- Conhecimento básico de informática. <br>
- Um **número de celular conectado ao WhatsApp** para conectar o bot. <br>
- Um **computador com sistema Windows/Linux** ou um **smartphone Android** para executar a aplicação.<br>

<br>

## 1 - 💿 Instalação

### 1.1 - 🖥️ Desktop (Windows/Linux)

#### 1.1.1 - Antes da instalação você tem que instalar os programas abaixo, no Windows é só instalar pelo link indicado e no Linux você tem que pesquisar qual é o comando para instalar na sua distribuição.
- Git 64-bit - [DOWNLOAD](https://git-scm.com/downloads/win)<br>
- Node.js LTS - [DOWNLOAD](https://nodejs.org/en/)<br><br>

#### 1.1.2 - Após instalar o Git e o Node.js, faça o download do **.zip** da última versão lançada: [AQUI](https://github.com/victorsouzaleal/lbot-whatsapp/releases/latest)

#### 1.1.3 - Extraia o **.zip**, entre na pasta e abra o **terminal/prompt de comando** do seu sistema **dentro dessa pasta** :

<br>

**TODOS OS COMANDOS ABAIXO DEVEM SER EXECUTADOS NO TERMINAL/PROMPT DE COMANDO DENTRO DA PASTA DO BOT!!**

#### 1.1.4 - Se for a sua primeira vez instalando o bot você vai ter que digitar esse comando para instalar o **Yarn**
```bash
npm i -g yarn
```

**OBS**: Caso o comando retorne erro no **Linux** você vai precisar se elevar a superusuário utilizando **sudo** antes do comando.

#### 1.1.5 - Após instalar o **Yarn** ou se ele já tiver instalado, você só precisa iniciar o bot com o comando abaixo:
```bash
yarn start
```

<br>

É normal demorar na primeira vez será feito o download de todas as dependências, se tudo der certo será perguntado se você quer se conectar com **QR Code** ou **Código de Pareamento**, faça a sua escolha e se conecte com o aplicativo do WhatsApp. 

<br>

### 1.2 - 📱 Smartphone (Android)

#### 1.2.1 - Faça a instalação do .apk mais atual do Termux: [AQUI](https://github.com/termux/termux-app/releases/download/v0.118.2/termux-app_v0.118.2+github-debug_universal.apk).

#### 1.2.2 - Abra o **Termux** comece usando este comando para fazer o download e instalação do bot, isso pode demorar algum tempo até instalar tudo.
```bash
pkg install wget -y && wget -O - dub.sh/lbot-termux | bash && cd ~/LBOT && yarn start
```
<br>

É normal demorar na primeira vez será feito o download de todas as dependências, se tudo der certo será perguntado se você quer se conectar com **QR Code** ou **Código de Pareamento**, faça a sua escolha e se conecte com o aplicativo do WhatsApp. 

<br>
<br>

#### DICA - Caso você feche o Termux e queira iniciar o bot novamente faça o comando abaixo:
```bash
cd ~/LBOT && yarn start
```

<br>
<br>

## 2 - 🤖 Uso

Seu bot já deve estar iniciando normalmente após o passo anterior, use os comandos abaixo para visualizar os comandos disponíveis.

<br>

**!menu** - Dá acesso ao **menu principal**.<br>
**!admin** - Dá acesso ao **menu de administrador**.

<br>

Todos os comandos tem um guia ao digitar: **!comando** guia

<br>

## 3 - ⚙️ Configuração do bot

### Como configurar o DONO:
Para usar as funções de **administrador** envie **!admin** para o WhatsApp do bot e seu número será cadastrado como dono.

<br>

Após ser cadastrado como **DONO** envie **!admin** novamente e veja toda a lista de comandos de administrador.

<br>

## 4 - 🛠️ Recursos/Comandos

### 🖼️ Figurinhas
Diversos comandos para criação de figurinhas

### 📥 Downloads 
Diversos comandos para download de mídias das principais redes sociais : X, Youtube, Instagram, TikTok...

### ⚒️ Utilidades Gerais
Diversos comandos de utilidades como encurtar link, editar áudio, obter letra de música, etc...

### 👾 Entretenimento
Diversos comandos para entretenimento do grupo

### 👨‍👩‍👦‍👦 Administração de Grupo
Diversos comandos de grupo para ajudar na administração

### ⚙️ Administração geral do bot
Diversos para administrar o bot e ter controle sobre ele.

<br>

### 👉 Lista completa de comandos... [Clique Aqui](docs/COMANDOS.md)

<br>

## 5 - 👤 Contato e Doações
Caso tenha algum problema ou queira ajudar o projeto com qualquer valor. 

* **Chave PIX (Celular)**: 21995612287
* **Email**: victorsouzaleal@gmail.com
* **WhatsApp (NÃO É O BOT, É MEU CONTATO PESSOAL PELO AMOR DE DEUS)**: https://wa.me/5521995612287

<br>

## 6 - 🙏 Agradecimentos

* A minha mãe e o meu pai que me fizeram com muito amor
* [`WhiskeySockets/Baileys`](https://github.com/WhiskeySockets/Baileys) - Por disponibilizar a biblioteca Baileys e dar suporte no Discord principalmente a nós brasileiros.
