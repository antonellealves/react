# 🎮 Mini Jogos App

Um aplicativo React Native com múltiplos mini jogos para testar suas habilidades!

## 🎯 Jogos Disponíveis

### 1. Jogo da Memória 🧠
- Encontre os pares de emojis virando as cartas
- Teste sua memória com 8 pares diferentes
- Acompanhe o número de movimentos
- Interface intuitiva com feedback visual

### 2. Jogo da Cobrinha 🐍
- Clássico jogo Snake
- Controle a cobrinha com botões direcionais
- Colete comida para crescer e aumentar sua pontuação
- Evite as paredes e não se auto-colida
- Sistema de pausa e reinício

### 3. Adivinhe o Número 🔢
- Tente descobrir o número secreto
- Três níveis de dificuldade:
  - Fácil: 1-50 (8 tentativas)
  - Médio: 1-100 (10 tentativas)
  - Difícil: 1-200 (12 tentativas)
- Dicas de "muito alto" ou "muito baixo"
- Histórico de tentativas

## 🚀 Como Executar

### Pré-requisitos
- Node.js instalado
- Expo CLI ou Expo Go no celular

### Instalação
```bash
# Clone ou baixe o projeto
cd MiniGamesApp

# Instale as dependências
npm install

# Execute o projeto
npx expo start
```

### Rodando no Celular
1. Instale o **Expo Go** no seu celular (Android/iOS)
2. Execute `npx expo start` no terminal
3. Escaneie o QR code que aparecer no terminal ou navegador
4. O app será carregado automaticamente no Expo Go

## 🛠️ Tecnologias Utilizadas

- **React Native**: Framework para desenvolvimento mobile
- **Expo**: Plataforma para desenvolvimento React Native
- **React Navigation**: Navegação entre telas
- **JavaScript**: Linguagem principal

## 📱 Funcionalidades

### Tela Principal
- Menu com os 3 mini jogos
- Design colorido e intuitivo
- Navegação simples entre jogos

### Recursos Gerais
- Interface responsiva
- Animações suaves
- Feedback visual e sonoro
- Pontuação e estatísticas
- Botões de reinício em todos os jogos

## 🎨 Design

O app utiliza:
- Cores vibrantes para cada jogo
- Componentes bem estruturados
- Layout responsivo
- Ícones e emojis para melhor experiência

## 📋 Estrutura do Projeto

```
MiniGamesApp/
├── App.js                 # Componente principal com navegação
├── screens/
│   ├── HomeScreen.js      # Tela inicial com menu
│   ├── MemoryGameScreen.js # Jogo da memória
│   ├── SnakeGameScreen.js  # Jogo da cobrinha
│   └── GuessNumberScreen.js # Jogo de adivinhar números
├── package.json
└── README.md
```

## 🔧 Customização

Você pode facilmente:
- Adicionar novos mini jogos
- Modificar cores e estilos
- Ajustar dificuldades
- Incluir novos recursos como som
- Adicionar sistema de ranking

## 🎮 Como Jogar

### Jogo da Memória
1. Toque em uma carta para virá-la
2. Toque em outra carta para formar um par
3. Se forem iguais, ficam viradas
4. Se diferentes, viram de volta após 1 segundo
5. Complete todos os pares para ganhar

### Jogo da Cobrinha
1. Toque "Iniciar" para começar
2. Use os botões direcionais para mover
3. Colete a comida vermelha para crescer
4. Evite bater nas paredes ou em si mesma
5. Tente fazer a maior pontuação possível

### Adivinhe o Número
1. Escolha a dificuldade
2. Digite um número no campo
3. Toque "Tentar" para fazer seu palpite
4. Use as dicas para ajustar sua próxima tentativa
5. Acerte o número antes de esgotar as tentativas

## 📄 Licença

Este projeto é livre para uso pessoal e educacional.

---

Desenvolvido com ❤️ usando React Native e Expo