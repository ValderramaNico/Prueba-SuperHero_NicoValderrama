// Card superHero

$(function () {
  function displayHeroCard(hero) {
    let characterCard = `
          <div class="card mb-3" style="max-width: 500px;">
              <div class="row g-0">
                  <div class="col-md-4">
                      <img src="${hero.image.url}" class="img-fluid rounded-start" alt="...">
                  </div>
                  <div class="col-md-8">
                      <div class="card-body">
                          <h5 class="card-title">Nombre: ${hero.name}</h5>
                          <p class="card-text">Conexiones: ${heroNoneValue(hero.connections["group-affiliation"])}</p>
                          <p class="card-text">Publicado por: ${hero.biography.publisher}</p>
                          <hr>
                          <p class="card-text">Ocupación: ${heroNoneValue(hero.work.occupation)}</p>
                          <hr>        
                          <p class="Primera aparición: ${heroNoneValue(hero.biography["first-appearance"])}"></p>
                          <p class="card-text">${heroHeight(hero.appearance.height)}</p>
                          <hr>        
                          <p class="card-text">${HeroWeight(hero.appearance.weight)}</p>
                          <hr>        
                          <p class="card-text">${heroNoneValue(hero.biography.aliases)}</p>
                      </div>
                  </div>
              </div>
          </div>`;

    // Section donde se mostrará la card
    let cardContainer = document.querySelector(".card__superHero");

    cardContainer.innerHTML = characterCard;
  }

  // Función para manejar los valores "-"
  function heroNoneValue(value) {
    if (value !== "-") {
      return value;
    } else {
      return "No se tiene información por ahora";
    }
  }

  // Grafico

  function displayHeroChart(powerStats, name) {
    const stats = Object.entries(powerStats);
    const options = {
      title: {
        text: `Estadisticas de poder para ${name}`,
      },
      subtitles: [
        {
          text: "",
        },
      ],
      theme: "light2",
      animationEnabled: true,
      data: [
        {
          type: "pie",
          startAngle: 40,
          toolTipContent: "<b>{label}</b>: {y}%",
          showInLegend: "true",
          legendText: "{label}",
          indexLabelFontSize: 16,
          indexLabel: "{label} - {y}%",
          dataPoints: stats.map(([label, value]) => {
            let y;
            if (value !== "null" && value !== "0") {
              y = Number(value);
            } else {
              y = 0;
            }
            return {
              label: label,
              y: y,
            };
          }),
        },
      ],
    };
    $("#chartContainer").CanvasJSChart(options);
  }

  // Ajax y boton y input.value

  $("#search-button").on("click", function () {
    // Obtener el valor del input
    let characterId = parseInt($("#character-id").val());

    const alertPlaceholder = document.getElementById("liveAlertPlaceholder");
    // Limpiar alertas previas
    alertPlaceholder.innerHTML = "";
    const appendAlert = (message, type) => {
      const wrapper = document.createElement("div");
      wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        "</div>",
      ].join("");

      alertPlaceholder.append(wrapper);
    };

    // Alertas

    if (characterId > 0 && characterId <= 732) {
      // Si el characterId es mayor que 0 y menor o igual a 732
      appendAlert(`¡Busqueda exitosa! El ID es: ${characterId}`, "success");
    } else {
      // Si characterId no está en el rango permitido
      appendAlert(
        "El número debe ser entre 1 y 732 para buscar al SuperHero.",
        "danger"
      );
    }

    // Concatenar la URL con el ID del personaje
    let apiUrl =
      "https://superheroapi.com/api.php/3033707663582647/" + characterId;

    // Hacer la petición AJAX
    $.ajax({
      url: apiUrl,
      type: "GET",
      dataType: "json",
      success: function (hero) {
        // Llamar a la función para mostrar la tarjeta del héroe

        displayHeroCard(hero);
        displayHeroChart(hero.powerstats, hero.name);
      },

      error: function (error) {
        alert("Error al obtener el héroe:", error);
      },
    });
  });
});
