# ⚡ Comandos Rápidos - Mini Jogos App

## 🚀 Comandos Essenciais

### Iniciar o Projeto
```bash
cd MiniGamesApp
npx expo start
```

### Instalar Dependências (se necessário)
```bash
npm install
```

### Limpar Cache (se houver problemas)
```bash
npx expo start --clear
```

### Executar na Web
```bash
npx expo start --web
```

## 📱 Para Testar no Celular

1. **Instalar Expo Go**
   - Android: [Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
   - iOS: [App Store](https://apps.apple.com/app/expo-go/id982107779)

2. **Executar o Projeto**
   ```bash
   npx expo start
   ```

3. **Escanear QR Code**
   - Android: Use o Expo Go
   - iOS: Use a câmera ou Expo Go

## 🛠️ Comandos de Desenvolvimento

### Verificar Dependências
```bash
npm list --depth=0
```

### Atualizar Expo
```bash
npm install -g @expo/cli@latest
```

### Verificar Versão do Expo
```bash
npx expo --version
```

## 🐛 Solução de Problemas

### Erro de Dependências
```bash
rm -rf node_modules package-lock.json
npm install
```

### Erro de Cache
```bash
npx expo start --clear
```

### Erro de Rede
```bash
npx expo start --tunnel
```

## 📊 Informações do Projeto

- **Framework**: React Native + Expo
- **Navegação**: React Navigation
- **Jogos**: 3 mini jogos funcionais
- **Compatibilidade**: iOS, Android, Web

## 🎯 Arquivos Importantes

- `App.js` - Navegação principal
- `screens/` - Todos os jogos
- `README.md` - Documentação completa
- `COMO_TESTAR.md` - Guia de testes

## ⚡ Teste Rápido

```bash
# Clone/entre na pasta
cd MiniGamesApp

# Instale (se necessário)
npm install

# Execute
npx expo start

# Escaneie o QR Code no Expo Go
```

---

**🎮 Divirta-se jogando!**