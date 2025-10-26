# Trivia Bíblica - Ruleta (Versión 2)

Juego interactivo de trivia bíblica basado en la *Traducción del Nuevo Mundo* (TNM).  
El jugador gira una ruleta con cinco secciones temáticas y responde preguntas de la categoría seleccionada. Incluye animaciones, sonidos, racha de aciertos, puntaje acumulado y un contador de progreso por categoría.

---

## 📂 Estructura de archivos

El sistema se compone de cuatro archivos principales:

- `index.html`: interfaz visual del juego.  
- `styles.css`: estilos generales y responsividad.  
- `script.js`: lógica principal (ruleta, preguntas, puntaje, sonidos).  
- `questions.js`: banco con 30 preguntas por categoría.  

Además, una carpeta `sounds/` contiene los efectos de audio:  
- `spin.mp3`: sonido continuo del giro.  
- `ding.mp3`: sonido al detenerse la ruleta.

---

## 🎯 Categorías disponibles

1. Personajes  
2. Profecías  
3. Evangelios  
4. Historia de Israel  
5. Principios Morales  

Cada una cuenta con 30 preguntas almacenadas en `questions.js`, con estructura estándar:

```js
{
  q: "Texto de la pregunta",
  options: ["Opción A", "Opción B", "Opción C", "Opción D"],
  correctIndex: 2,
  ref: "Referencia bíblica o explicación breve"
}
```

---

## 🧠 Mecánica del juego

1. El jugador pulsa **“Girar Ruleta”**, se reproduce el sonido de giro y la ruleta anima su rotación.  
2. Al detenerse, se elige la categoría correcta según el ángulo final y se muestra una pregunta aleatoria de esa sección.  
3. El jugador selecciona una respuesta y recibe retroalimentación inmediata:  
   - Verde si acierta, rojo si falla.  
   - Se muestra la cita bíblica o comentario correspondiente.  
   - Se actualiza la puntuación, racha de aciertos y progreso de esa categoría.

---

## 💯 Reglas de puntuación

- **Acierto:** +10 puntos base, +5 por cada acierto consecutivo adicional.  
- **Error:** –3 puntos (sin bajar de 0) y la racha se reinicia.  

---

## 🖼 Características visuales

- Estilo minimalista y bíblico: tonos azul cielo, beige, verde oliva, vino y dorado suave.  
- Ruleta con bordes dorados, textos curvos SVG centrados, y aguja fija superior.  
- Diseño adaptativo para móviles con botones grandes y legibles.

---

## 📊 Puntuación y progreso

Los contadores por categoría se muestran en el panel izquierdo:

- `#prog-personajes`
- `#prog-profecias`
- `#prog-evangelios`
- `#prog-israel`
- `#prog-morales`

---

## ⚙️ Requisitos

- Todos los archivos deben estar en la misma carpeta.  
- Navegadores modernos (Chrome, Edge, Firefox, Safari).  
- Permitir sonido (interacción requerida en móviles).

---

## 🚀 Futuras mejoras sugeridas

- Pantalla inicial tipo “Tap para jugar”.  
- Modo estudio sin puntaje.  
- Guardado automático con LocalStorage.  
- Efectos visuales extra al acertar.  
- Sistema de tiempo o dificultad progresiva.

---

## 🏁 Información del proyecto

**Versión:** 2.0  
**Estado:** Estable y sincronizada.  
**Autor:** Rene Guehazi Lomas Rodriguez

