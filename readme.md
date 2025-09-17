
# MascotApp

> Tu tienda de mascotas amiga

MascotApp es una app móvil donde podés explorar productos para mascotas, agregarlos al carrito y gestionar tus compras de forma simple y rápida.

## Alcances y objetivos

El proyecto busca ofrecer una experiencia de compra cómoda para usuarios que buscan productos de calidad para sus mascotas. Permite navegar por categorías (alimentos, juguetes, accesorios, higiene), ver detalles, sumar/restar productos al carrito y realizar pedidos.

## Features principales

- Registro e inicio de sesión de usuario
- Navegación por categorías y productos
- Carrito de compras dinámico (sumar/restar productos)
- Vista de resumen de pedido
- Perfil de usuario editable
- Splash screen personalizado

## Librerías y por qué se usan

- **React Native**: Framework principal para crear apps móviles multiplataforma.
- **Expo**: Facilita el desarrollo, testing y despliegue de la app.
- **Redux Toolkit**: Manejo del estado global (carrito, usuario, etc) de forma sencilla y eficiente.
- **Redux Toolkit Query**: Consumo de APIs (productos, autenticación) de manera optimizada y con caché.
- **React Navigation**: Navegación entre pantallas y stacks de la app.
- **React Native Paper**: Componentes visuales modernos y personalizables.
- **expo-splash-screen**: Para mostrar un splash personalizado al iniciar la app.
- **expo-image-picker**: Permite seleccionar imágenes desde la galería (por ejemplo, para el perfil de usuario).

Cada librería fue elegida para simplificar el desarrollo, mejorar la experiencia de usuario y mantener el código ordenado.

## Instalación y puesta a punto

1. Clona este repositorio:
   ```sh
   git clone https://github.com/luciano1997/mascotapp.git
   cd mascotapp
   ```
2. Instala las dependencias:
   ```sh
   npm install
   ```
3. Inicia el proyecto en modo desarrollo:
   ```sh
   npx expo start
   ```
4. Escanea el QR con la app de Expo Go o ejecutá en un emulador Android/iOS.

¡Listo! Ya puedes comprar en MascotApp... tu tienda de mascotas amiga.

