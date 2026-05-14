# 🍄 Super Mario Bros — Phaser.js Recreation

<div align="center">

<img width="698" height="417" alt="image" src="https://github.com/user-attachments/assets/ce46a4cc-de26-454e-aa9c-f989ad69779d" />

**Recreación del clásico Super Mario Bros construida con Phaser 3 y JavaScript vanilla**

[![Phaser](https://img.shields.io/badge/Phaser-3-8C3BE0?style=for-the-badge&logo=javascript&logoColor=white)](https://phaser.io)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/es/docs/Web/JavaScript)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/es/docs/Web/HTML)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](./LICENSE)

[▶ Jugar ahora](#) · [Reportar un bug](../../issues) · [Ver código fuente](./game.js)

</div>

---

## 📋 Tabla de contenidos

- [Sobre el proyecto](#-sobre-el-proyecto)
- [Gameplay](#-gameplay)
- [Tech Stack](#-tech-stack)
- [Estructura del proyecto](#-estructura-del-proyecto)
- [Arquitectura modular](#-arquitectura-modular)
- [Primeros pasos](#-primeros-pasos)
- [Controles](#-controles)
- [Sistema de animaciones](#-sistema-de-animaciones)
- [Mecánicas implementadas](#-mecánicas-implementadas)
- [Roadmap](#-roadmap)
- [Contacto](#-contacto)

---

## 🎮 Sobre el proyecto

Recreación del icónico Super Mario Bros desarrollada con **Phaser 3**, el framework de juegos 2D más popular para la web. El proyecto está construido con una **arquitectura totalmente modular**: cada sistema del juego (controles, audio, sprites, tilemap, enemigos) vive en su propio módulo JS, haciendo el código limpio, escalable y fácil de mantener.

> ⚠️ Este proyecto es solo educativo y sin fines comerciales. Mario Bros es propiedad intelectual de Nintendo.

---

## 🕹 Gameplay

- Mario corre y salta por un mundo de **2000px de ancho**
- La cámara sigue al personaje con **scroll lateral automático**
- **Enemigos Goomba** que caminan y rebotan en bloques y tuberías
- **Monedas** coleccionables con animación, sonido y puntuación flotante
- **Hongo power-up** que hace crecer a Mario con animación de transformación
- **Bloques `?`** que revelan monedas o hongos al golpearlos desde abajo
- **Bloques de ladrillo** que Mario grande puede romper
- **Sistema de daño**: Mario grande vuelve a pequeño al recibir daño; Mario pequeño muere
- Si Mario cae al vacío, se activa la **animación de muerte** con música de Game Over
- El juego se **reinicia automáticamente** luego de 7 segundos

---

## 🛠 Tech Stack

| Tecnología          | Uso                                                             |
| ------------------- | --------------------------------------------------------------- |
| **Phaser 3**        | Motor de juego 2D, física arcade, escenas, animaciones y cámara |
| **JavaScript ES6+** | Módulos, arrow functions, destructuring, clases                 |
| **HTML5 Canvas**    | Renderizado del juego vía Phaser                                |
| **Web Audio API**   | Música y efectos de sonido a través de Phaser                   |

---

## 📁 Estructura del proyecto

```
super-mario/
├── assets/
│   ├── entities/
│   │   ├── mario.png            # Spritesheet de Mario pequeño
│   │   ├── mario-grown.png      # Spritesheet de Mario grande
│   │   ├── goomba.png           # Spritesheet del Goomba
│   │   ├── coin.png             # Spritesheet de moneda animada
│   │   └── mushroom.png        # Sprite del hongo power-up
│   ├── scenery/
│   │   └── overworld/
│   │       ├── cloud1.png
│   │       ├── floorbricks.png
│   │       ├── block.png
│   │       ├── misteryBlock.png
│   │       ├── emptyBlock.png
│   │       ├── vertical-small-tube.png
│   │       └── vertical-medium-tube.png
│   └── sound/
│       └── music/
│           ├── gameover.mp3
│           ├── coin-pickup.mp3
│           ├── stomp.mp3
│           ├── powerup.mp3
│           └── powerdown.mp3
│
├── Component/
│   ├── controls.js              # Lógica de teclado (flechas + WASD)
│   ├── enemies.js               # Creación y comportamiento de enemigos
│   ├── imageSprite.js           # Carga de imágenes y fondos
│   ├── sound.js                 # Carga y reproducción de audio
│   └── sprintesheet.js          # Carga de spritesheets
│
├── Tilemap/
│   ├── overworldbg.js           # Fondo decorativo del overworld
│   ├── floor-overworl.js        # Suelo estático del nivel
│   └── blocks-overworl.js       # Bloques interactivos (?, ladrillos, tuberías)
│
├── animations.js                # Todas las animaciones del juego
├── game.js                      # Configuración Phaser y ciclo preload/create/update
├── phaser.min.js                # Librería Phaser 3 (local)
└── index.html                   # Entry point
```

---

## 🧩 Arquitectura modular

El juego está dividido en módulos independientes que se importan en `game.js`:

```
game.js
├── Component/
│   ├── controls.js     → checkControls(scene)
│   ├── enemies.js      → enemies(scene, height)
│   ├── imageSprite.js  → imageSprite(scene)
│   ├── sound.js        → Audio(scene) / playSound(key, scene)
│   └── sprintesheet.js → SpriteSheet(scene)
├── Tilemap/
│   ├── overworldbg.js  → overworldbg(scene)
│   ├── floor-overworl.js → floorOverworld(scene, height)
│   └── blocks-overworl.js → blocksOverworld(scene, height)
└── animations.js       → createAnimations(scene)
```

Cada módulo recibe la instancia de la escena Phaser como argumento, manteniendo el código desacoplado y fácil de extender.

---

## 🏁 Primeros pasos

No requiere instalación ni bundler. Solo un servidor local para evitar restricciones CORS con los módulos ES6.

### Opción 1 — VS Code Live Server

1. Instalá la extensión [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
2. Abrí el proyecto en VS Code
3. Click derecho en `index.html` → **"Open with Live Server"**

### Opción 2 — Python

```bash
python -m http.server 8000
# Abrí http://localhost:8000
```

### Opción 3 — Node.js

```bash
npx serve .
```

> ⚠️ No abras `index.html` directamente con doble click — los módulos ES6 requieren un servidor HTTP.

---

## 🎮 Controles

| Tecla               | Acción                            |
| ------------------- | --------------------------------- |
| `←` / `A`           | Mover a la izquierda              |
| `→` / `D`           | Mover a la derecha                |
| `↑` / `W` / `SPACE` | Saltar (solo si está en el suelo) |

---

## 🎨 Sistema de animaciones

Definidas en `animations.js`, reciben la instancia de la escena Phaser:

| Clave              | Frames                       | Descripción             |
| ------------------ | ---------------------------- | ----------------------- |
| `mario-idle`       | Frame `0`                    | Mario pequeño quieto    |
| `mario-walk`       | Frames `1 → 3` (loop, 12fps) | Mario pequeño caminando |
| `mario-jump`       | Frame `5`                    | Mario pequeño saltando  |
| `mario-death`      | Frame `4`                    | Mario muriendo          |
| `mario-grown-idle` | Frame `0` (grown sheet)      | Mario grande quieto     |
| `coin-idle`        | Frames animados (loop)       | Moneda girando          |
| `goomba-walk`      | Frames loop                  | Goomba caminando        |
| `goomba-death`     | Frame final                  | Goomba aplastado        |

Spritesheet de Mario: `frameWidth: 18px` × `frameHeight: 16px`

---

## ⚙️ Mecánicas implementadas

### 🍄 Power-up — Hongo

Cuando Mario toca el hongo, el juego pausa brevemente, Mario parpadea entre su sprite normal y el grande, y luego se transforma. Su hitbox se actualiza a `18x32`.

### ❓ Bloque misterioso — Moneda

Al golpearlo desde abajo, el bloque sube y baja con un tween, aparece una moneda animada que sube y desaparece, se suma `+100` puntos con texto flotante, y el bloque se reemplaza por uno vacío.

### ❓ Bloque misterioso — Hongo

Igual que el anterior, pero aparece un hongo que sale del bloque con animación y luego camina por el nivel, rebotando en tuberías y bloques.

### 🧱 Bloque de ladrillo

Mario grande lo destruye al golpearlo desde abajo. Mario pequeño solo lo sacude.

### 👾 Goomba

- Camina hacia Mario automáticamente
- Mario lo elimina saltando encima → `+200` puntos, sonido de pisotón
- Si toca a Mario de costado: Mario grande se reduce, Mario pequeño muere

### 💀 Muerte de Mario

Se extrae a la función `killMario()` reutilizable. Desactiva colisiones, reproduce animación y música, lanza a Mario hacia arriba y reinicia la escena a los 7 segundos.

### 💰 Puntuación flotante

`addToScore(valor, origen, game)` genera un texto con fuente pixel que sube y se desvanece con tweens encadenados.

---

## 🗺 Roadmap

- [x] Movimiento con flechas y WASD
- [x] Física arcade con gravedad y colisiones
- [x] Scroll de cámara siguiendo a Mario
- [x] Animaciones (idle, walk, jump, death, grown)
- [x] Enemigos Goomba con IA básica
- [x] Monedas coleccionables con puntuación flotante
- [x] Hongo power-up con transformación animada
- [x] Bloques `?` con monedas y hongos
- [x] Bloques de ladrillo rompibles
- [x] Sistema de daño (Mario grande → pequeño → muerte)
- [x] Efectos de sonido (moneda, pisotón, power-up, daño, game over)
- [x] Arquitectura modular por componentes
- [ ] HUD con puntuación, vidas y tiempo
- [ ] Pantalla de inicio y Game Over
- [ ] Múltiples niveles
- [ ] Koopa Troopa
- [ ] Bandera final de nivel
- [ ] Guardado de puntaje máximo

---

## 📬 Contacto

**Elias Macay**

- 💼 LinkedIn: [linkedin.com/in/elias-macay-b02753386](https://www.linkedin.com/in/elias-macay-b02753386/)
- 🐙 GitHub: [@Elias-mc](https://github.com/Elias-mc)
- 📧 Email: macayzamora1234@gmail.com
- 📍 Buenos Aires, Argentina

---

<div align="center">

Hecho con ❤️ y nostalgia por [Elias Macay](https://github.com/Elias-mc) — 2026

_Mario Bros es propiedad de Nintendo. Este proyecto no tiene fines comerciales._

</div>
