document.addEventListener("DOMContentLoaded", function() {
    
    const listaDepoimentos = document.getElementById('listaDepoimentos');

    fetch('./depoimentos.json')
        .then(response => {
          if (!response.ok) {
            throw new Error("Erro ao carregar o JSON: " + response.status);
          }
          return response.json();
        })
        .then(data => {
            console.log("Dados carregados:", data);

            // Carrega Boxes com os depoimentos dinamicamente
            data.forEach((depoimento) => {
            const item = document.createElement("li");
            item.className = "dark-background";
            item.innerHTML = `
                <span class="quotes">“</span>
		        <blockquote>
		        	${depoimento.texto}
		        </blockquote>
		        <span class="quotes below">”</span>
		        <div class="name">${depoimento.pessoa}</div>
            `;
            listaDepoimentos.appendChild(item);
            });
        })
        .catch(error => console.error(error));

    
    

});