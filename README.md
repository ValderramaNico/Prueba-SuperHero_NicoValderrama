# Paso a paso de esta app

## 1

### Crear la estructura básica del 'HTML' donde se implementaran la card del SuperHero y el gráfico de torta con las habilidades.

## 2

### En este proyecto se uso bootstrap, entonces lo que se agrego fue el CDN, también el de Jquery y CanvasJs para implementar los gráficos.

## 3 

### 1ero => Se captura mediante eventos del DOM con Jquery la información del input (que es el número ingresado para buscar un SuperHero)

### 2do => Se implementan funciones para separar la captura de la información ingresada por el usuario con la consulta a la API

### 3ero => Se comprueba la información del usuario QUE SEAN SOLO NÚMEROS ENTRE EL 1 y el 732, si el número es 0 o sobrepasa 732 se arroja un mensaje de error en el HTML, al contrario si es un número valido, muestra un mensaje de éxito en la busqueda

### 4to => Mediante AJAX se consulta la información a la API

### 5to => La información se captura y despliega en una Card al HTML mediante el siguiente metodo

    //* let cardContainer = document.querySelector(".card__superHero");
    cardContainer.innerHTML = characterCard; *//

### 6to => Se implementa mediante la librería de canvasJs un gráfico de torta con la información proporcionada por la API del objeto "powerStats"

### 7mo => Solo se implementa un condicional para la información que viene con un guión "-" en los 'arrays' de cada superHero de la API