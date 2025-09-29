document.addEventListener("DOMContentLoaded", function() {
    
  const listaDepoimentos = document.getElementById('listaDepoimentos');
  const listaEspecialidades = document.getElementById('listaEspecialidades');
  const formulario = document.getElementById('form');

  //Alert de cupom de desconto
  alert(`
      Você ganhou um cupom de desconto!
      Use o cumpom: NWEJKLWXJ!# 
      E ganhe 30% no seu próximo atendimento!
    `)

  // Obtém dados do JSON com os depoimentos
  fetch('./dados.json')
    .then(response => {
      if (!response.ok) {
        throw new Error("Erro ao carregar o JSON: " + response.status);
      }
      return response.json();
    })
    .then(data => {

      // Carrega boxes com as especialidades dinamicamente
      const servicos = data.especialidades;
      servicos.forEach((especialidade) => {
        const item = document.createElement('li');
        item.innerHTML = `
          <figure>
				    <img src="./src/img/especialidades/${especialidade.imagem}" alt="${especialidade.nome}">
				    <figcaption>
					    <h4>${especialidade.nome}</h4>
					    <p>${especialidade.texto}</p>
				    </figcaption>
			    </figure>
        `;
        listaEspecialidades.appendChild(item);
      });

      // Carrega Boxes com os depoimentos dinamicamente
      const depoimentos = data.depoimentos;
      depoimentos.forEach((depoimento) => {
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
    
  // Lógica do Carrossel de depoimentos
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

  formulario.addEventListener('submit', (e) => {
    e.preventDefault();
  });

});