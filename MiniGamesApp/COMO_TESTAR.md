# 🧪 Como Testar o Mini Jogos App

## 📱 Testando no Expo Go

### 1. Preparação do Ambiente
```bash
# Certifique-se de estar na pasta do projeto
cd MiniGamesApp

# Instale as dependências (se ainda não instalou)
npm install

# Inicie o servidor de desenvolvimento
npx expo start
```

### 2. No Celular (Android/iOS)
1. **Instale o Expo Go** na Play Store ou App Store
2. **Abra o Expo Go** no seu celular
3. **Escaneie o QR Code** que aparece no terminal ou navegador
4. O app será carregado automaticamente

### 3. Testando na Web (Opcional)
```bash
# Para testar no navegador
npx expo start --web
```

## 🎯 Roteiro de Testes

### Teste 1: Navegação
- [ ] Tela inicial carrega com os 3 mini jogos
- [ ] Botões dos jogos respondem ao toque
- [ ] Navegação entre telas funciona
- [ ] Botão "voltar" funciona em cada jogo

### Teste 2: Jogo da Memória
- [ ] Cartas viram ao tocar
- [ ] Pares corretos ficam virados
- [ ] Pares incorretos voltam após 1 segundo
- [ ] Contador de movimentos funciona
- [ ] Alerta de vitória aparece
- [ ] Botão "Novo Jogo" reinicia o jogo

### Teste 3: Jogo da Cobrinha
- [ ] Botão "Iniciar" começa o jogo
- [ ] Controles direcionais funcionam
- [ ] Cobrinha move-se corretamente
- [ ] Colisão com parede termina o jogo
- [ ] Comida é coletada e pontuação aumenta
- [ ] Cobrinha cresce ao comer
- [ ] Botão "Pausar" funciona
- [ ] Botão "Reiniciar" funciona

### Teste 4: Adivinhe o Número
- [ ] Seleção de dificuldade funciona
- [ ] Campo de entrada aceita números
- [ ] Dicas "muito alto/baixo" aparecem
- [ ] Contador de tentativas funciona
- [ ] Histórico de tentativas é exibido
- [ ] Alerta de vitória/derrota aparece
- [ ] Botão "Novo Jogo" reinicia

### Teste 5: Interface Geral
- [ ] Design responsivo em diferentes tamanhos
- [ ] Cores e estilos estão corretos
- [ ] Textos são legíveis
- [ ] Botões têm bom tamanho para toque
- [ ] Sem erros no console

## 🐛 Problemas Conhecidos

### Se o app não carrega:
1. Verifique se o celular e computador estão na mesma rede Wi-Fi
2. Tente reiniciar o servidor: `Ctrl+C` e `npx expo start` novamente
3. Limpe o cache: `npx expo start --clear`

### Se houver erros de navegação:
1. Certifique-se de que todas as dependências estão instaladas
2. Verifique se não há erros de importação nos arquivos

### Performance:
- O jogo da cobrinha pode ter delay em dispositivos mais antigos
- Ajuste a velocidade no código se necessário (linha `setInterval(moveSnake, 150)`)

## 💡 Dicas de Teste

### Para desenvolvedores:
1. Use `console.log()` para debug
2. Teste em diferentes tamanhos de tela
3. Verifique comportamento em orientação landscape/portrait
4. Teste com diferentes velocidades de rede

### Para usuários:
1. Teste todos os jogos pelo menos uma vez
2. Tente diferentes estratégias em cada jogo
3. Verifique se consegue voltar ao menu principal
4. Teste os botões de reinício

## 📊 Métricas de Teste

- **Tempo de carregamento**: < 5 segundos
- **Responsividade**: Toques registrados < 100ms
- **Estabilidade**: Sem crashes durante 10 minutos de uso
- **Usabilidade**: Navegação intuitiva sem instruções

## 🎮 Experiência de Usuário

### O que testar:
- Facilidade de navegação
- Clareza das instruções
- Feedback visual adequado
- Tempo de resposta dos controles
- Diversão e engajamento

### Critérios de sucesso:
- Usuário consegue jogar sem instruções
- Jogos são desafiadores mas justos
- Interface é intuitiva
- Performance é suave
- Jogos motivam a rejogar

---

**Importante**: Este projeto foi desenvolvido para funcionar perfeitamente no Expo Go. Certifique-se de testar em um dispositivo real para a melhor experiência!