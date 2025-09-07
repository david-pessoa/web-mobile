document.addEventListener("DOMContentLoaded", function() {
    
  const listaDepoimentos = document.getElementById('listaDepoimentos');

  // Obtém dados do JSON com os depoimentos
  fetch('./depoimentos.json')
    .then(response => {
      if (!response.ok) {
        throw new Error("Erro ao carregar o JSON: " + response.status);
      }
      return response.json();
    })
    .then(data => {
      // Carrega Boxes com os depoimentos dinamicamente
      data.forEach((depoimento) => {
      const item = document.createElement("li");
      item.className = "dark-background swiper-slide";
      
      // Adiciona as estrelas
      let estrelas = depoimento.estrelas;
      let starLine = "<span class='stars'>";
      for(let i = 0; i < 5; i++)
      {
        if(estrelas > 0)
          starLine += '<i class="fa-solid fa-star"></i>';
        else
          starLine += '<i class="fa-regular fa-star"></i>';

        estrelas--;
      }
      starLine += "</span>";
      
      // Adiciona depoimento
      item.innerHTML = `
        <span class="quotes">“</span>
	      <blockquote>
	      	${depoimento.texto}
	      </blockquote>
        <span class="quotes below">”</span>
        <cite>${depoimento.pessoa}</cite>
      ` + starLine;
      listaDepoimentos.appendChild(item);
      });
    })
    .catch(error => console.error(error));
  
  const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    slidesPerView: "auto",
    centeredSlides: false,
    loop: true,

    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },

    // using "ratio" endpoints
    breakpoints: {
      600: {
        slidesPerView: "auto",
        spaceBetween: 50,
        centeredSlides: true,
      },
      300: {
        slidesPerView: "auto",
        spaceBetween: 30,
        centeredSlides: true,
      },
    },

    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
});