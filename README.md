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
- [Primeros pasos](#-primeros-pasos)
- [Controles](#-controles)
- [Sistema de animaciones](#-sistema-de-animaciones)
- [Roadmap](#-roadmap)
- [Contacto](#-contacto)

---

## 🎮 Sobre el proyecto

Recreación del icónico Super Mario Bros desarrollada con **Phaser 3**, el framework de juegos 2D más popular para la web. El proyecto implementa física arcade, sprites animados, scroll de cámara, colisiones, música y una mecánica de muerte con reinicio automático, todo desde cero con JavaScript modular.

> ⚠️ Este proyecto es solo educativo y sin fines comerciales. Mario Bros es propiedad intelectual de Nintendo.

---

## 🕹 Gameplay

- Mario corre y salta por un mundo de **2000px de ancho**
- La cámara sigue al personaje con **scroll lateral automático**
- Si Mario cae al vacío, se activa la **animación de muerte** y suena el _Game Over_
- El juego se reinicia automáticamente luego de 7 segundos
- Física arcade con **gravedad**, colisiones contra el suelo y límites de mundo

---

## 🛠 Tech Stack

| Tecnología          | Uso                                                      |
| ------------------- | -------------------------------------------------------- |
| **Phaser 3**        | Motor de juego 2D con física arcade y gestión de escenas |
| **JavaScript ES6+** | Lógica del juego, módulos, arrow functions               |
| **HTML5 Canvas**    | Renderizado del juego via Phaser                         |
| **Web Audio API**   | Música y efectos de sonido a través de Phaser            |

---

## 📁 Estructura del proyecto

```
super-mario/
├── assets/
│   ├── entities/
│   │   └── mario.png           # Spritesheet de Mario (frames: idle, walk x3, death, jump)
│   ├── scenery/
│   │   └── overworld/
│   │       ├── cloud1.png      # Nubes decorativas
│   │       └── floorbricks.png # Suelo del nivel
│   └── sound/
│       └── music/
│           └── gameover.mp3    # Música de game over
├── animations.js               # Definición de todas las animaciones de Mario
├── game.js                     # Configuración de Phaser y ciclo del juego (preload/create/update)
├── phaser.min.js               # Librería Phaser 3 (local)
└── index.html                  # Entry point del juego
```

---

## 🏁 Primeros pasos

No requiere ninguna instalación ni bundler. Solo un servidor local para evitar restricciones CORS con los assets.

### Opción 1 — VS Code Live Server

1. Instalá la extensión [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
2. Abrí el proyecto en VS Code
3. Click derecho en `index.html` → **"Open with Live Server"**

### Opción 2 — Python (cualquier sistema)

```bash
# Python 3
python -m http.server 8000

# Luego abrí http://localhost:8000
```

### Opción 3 — Node.js

```bash
npx serve .
```

> ⚠️ No abras `index.html` directamente con doble click — los módulos ES6 requieren un servidor HTTP.

---

## 🎮 Controles

| Tecla                     | Acción                            |
| ------------------------- | --------------------------------- |
| `←` Flecha izquierda o A  | Mover a la izquierda              |
| `→` Flecha derecha o D    | Mover a la derecha                |
| `↑` Flecha arriba o SPACE | Saltar (solo si está en el suelo) |

---

## 🎨 Sistema de animaciones

Las animaciones están definidas en `animations.js` como un módulo separado que recibe la instancia de la escena Phaser:

| Clave         | Frames del spritesheet | Descripción     |
| ------------- | ---------------------- | --------------- |
| `mario-idle`  | Frame `0`              | Mario quieto    |
| `mario-walk`  | Frames `1 → 3` (loop)  | Caminar, 12 fps |
| `mario-jump`  | Frame `5`              | Salto           |
| `mario-death` | Frame `4`              | Muerte          |

El spritesheet de Mario usa `frameWidth: 18px` × `frameHeight: 16px`.

---

## 🗺 Roadmap

- [x] Movimiento básico (izquierda / derecha / salto)
- [x] Física arcade con gravedad
- [x] Scroll de cámara siguiendo al personaje
- [x] Animaciones (idle, walk, jump, death)
- [x] Música de Game Over
- [x] Sistema de muerte y reinicio
- [ ] Enemigos (Goomba, Koopa)
- [ ] Bloques interactivos (`?` y ladrillos)
- [ ] Monedas y sistema de puntuación
- [ ] Power-ups (hongo, estrella)
- [ ] Múltiples niveles
- [ ] Pantalla de inicio y HUD

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
