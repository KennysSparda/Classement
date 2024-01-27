document.addEventListener('DOMContentLoaded', function() {
    var menuCheckbox = document.getElementById('menu');
    var section = document.querySelector('section');


    menuCheckbox.addEventListener('change', function() {
      if (this.checked) {
        section.classList.add('blur');

           
      } else {
        section.classList.remove('blur');

      }
    });

    // Adicionando um ouvinte de evento para fechar o menu ao clicar em algum item
    var menuItems = document.querySelectorAll('.menu li a');
    menuItems.forEach(function(item) {
      item.addEventListener('click', function() {
        // Feche o menu quando um item for clicado
        menuCheckbox.checked = false;
        section.classList.remove('blur');
      });
    });
  });

  
function toggleRanking(event) {
  const targetLi = event.target.closest('li');
  if (!targetLi) return;

  const rankingSelecionado = targetLi.dataset.rank;

  const sectionPix = document.getElementById("pix");
  const sectionRecargas = document.getElementById("recargas");    
  const sectionNPS = document.getElementById("NPS");

  if (rankingSelecionado === 'pix') {
      sectionPix.style.display = 'block';
      sectionRecargas.style.display = 'none';
      sectionNPS.style.display = 'none';
  } else if (rankingSelecionado === 'recargas') {
      sectionPix.style.display = 'none';
      sectionRecargas.style.display = 'block';
      sectionNPS.style.display = 'none';
  } else {
      sectionPix.style.display = 'none';
      sectionRecargas.style.display = 'none';
      sectionNPS.style.display = 'block';
  }
}
