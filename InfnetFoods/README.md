# Infnet Food

Uma aplicação mobile de delivery de comida, desenvolvida utilizando **React Native** e **Expo**, que permite ao usuário explorar produtos, fazer pedidos, visualizar restaurantes no mapa e gerenciar suas configurações e histórico de pedidos.

## Recursos Principais

- **Autenticação**: Login funcional que controla o acesso às telas principais da aplicação.
- **Explorar Produtos**: Navegue por categorias de alimentos e adicione produtos ao carrinho.
- **Carrinho de Compras**: Visualize os itens selecionados e finalize o pedido.
- **Pedidos**: Acompanhe o status dos pedidos feitos, com detalhes de itens e preços.
- **Mapa de Restaurantes**: Veja restaurantes disponíveis em um mapa interativo.
- **Configurações do Perfil**: Gerencie suas informações pessoais e preferências.
- **Tema Personalizável**: Alterne entre temas claro e escuro para uma experiência personalizada.

## Componentes e Telas

- **LoginScreen**: Tela de autenticação para usuários.
- **HomeScreen**: Página inicial com categorias e recomendações.
- **ProductsScreen**: Exibe produtos por categoria e permite adicionar itens ao carrinho.
- **CartScreen**: Exibe os itens no carrinho e oferece a opção de finalizar o pedido.
- **OrdersScreen**: Histórico de pedidos com detalhes e status.
- **RestaurantsMapScreen**: Mostra restaurantes em um mapa interativo.
- **CheckoutScreen**: Tela de finalização de compra com opções de pagamento.
- **SettingsScreen**: Configurações da conta e preferências.

## Estrutura do Projeto

```plaintext
src/
├── screens/
│   ├── LoginScreen.js
│   ├── HomeScreen.js
│   ├── ProductsScreen.js
│   ├── CartScreen.js
│   ├── OrdersScreen.js
│   ├── RestaurantsMapScreen.js
│   ├── CheckoutScreen.js
│   └── SettingsScreen.js
├── context/
│   └── ThemeContext.js
└── App.js
