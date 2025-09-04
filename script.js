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
          const testData = [data[0], data[1], data[2]]; //Apenas usando um array de teste enquanto não usa um carrossel
          testData.forEach((depoimento) => {
          const item = document.createElement("li");
          item.className = "dark-background";
          
          // Adiciona as estrelas
          let estrelas = depoimento.estrelas;
          let starLine = "<span class='stars'>";
          for(let i = 0; i < 5; i++)
          {
            if(estrelas > 0)
              starLine += '<i class="lni-star-filled"></i>';
            else
              starLine += '<i class="lni-star-half"></i>'

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

    
    

});