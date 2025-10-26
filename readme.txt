# Trivia Bíblica - Ruleta (Versión 2)

Juego de trivia bíblica basado en la Traducción del Nuevo Mundo (TNM), con una ruleta interactiva de categorías.  
El jugador gira la ruleta, se elige una categoría al azar y aparece una pregunta con 4 opciones.  
El juego lleva puntuación, racha de aciertos y contador de aciertos por categoría.

---

## 📂 Estructura de archivos

El proyecto está dividido en 4 archivos principales + carpeta de sonidos:

```text
├─ index.html         ← Estructura visual general y layout
├─ styles.css         ← Estilos (colores, tipografía, ruleta, responsive)
├─ script.js          ← Lógica del juego (ruleta, preguntas, puntuación)
├─ questions.js       ← Banco de preguntas (30 por categoría)
└─ sounds/
   ├─ spin.mp3        ← Sonido looping mientras la ruleta gira
   └─ ding.mp3        ← Sonido al detenerse la ruleta
