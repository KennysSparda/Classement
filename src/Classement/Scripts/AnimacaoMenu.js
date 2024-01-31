document.addEventListener('DOMContentLoaded', function() {
    var menuCheckbox = document.getElementById('menu');
    var sectionPix = document.querySelector('section#pix');
    var sectionRecargas = document.querySelector('section#recargas');
    var sectionNPS = document.querySelector('section#NPS');


    menuCheckbox.addEventListener('change', function() {
      if (this.checked) {
        sectionPix.classList.add('blur');
        sectionRecargas.classList.add('blur');
        sectionNPS.classList.add('blur');
      } else {
        sectionPix.classList.remove('blur');
        sectionRecargas.classList.remove('blur');
        sectionNPS.classList.remove('blur');
      }
    });

    // Adicionando um ouvinte de evento para fechar o menu ao clicar em algum item
    var menuItems = document.querySelectorAll('.menu li a');
    menuItems.forEach(function(item) {
      item.addEventListener('click', function() {
        // Feche o menu quando um item for clicado
        menuCheckbox.checked = false;
        sectionPix.classList.remove('blur');
        sectionRecargas.classList.remove('blur');
        sectionNPS.classList.remove('blur');
      });
    });
  });

function ExibeRankingPix() {
  const sectionPix = document.getElementById("pix");
  const sectionRecargas = document.getElementById("recargas");    
  const sectionNPS = document.getElementById("NPS");

  sectionPix.style.display = 'block';
  sectionRecargas.style.display = 'none';
  sectionNPS.style.display = 'none';
}

function ExibeRankingRecargas() {

  const sectionPix = document.getElementById("pix");
  const sectionRecargas = document.getElementById("recargas");    
  const sectionNPS = document.getElementById("NPS");

  sectionPix.style.display = 'none';
  sectionRecargas.style.display = 'block';
  sectionNPS.style.display = 'none';
}

function ExibeRankingNPS() { 
  const sectionPix = document.getElementById("pix");
  const sectionRecargas = document.getElementById("recargas");    
  const sectionNPS = document.getElementById("NPS");

  sectionPix.style.display = 'none';
  sectionRecargas.style.display = 'none';
  sectionNPS.style.display = 'block';
}

function toggleRanking(event) {
  const targetLi = event.target.closest('li');
  if (!targetLi) return;

  const rankingSelecionado = targetLi.dataset.rank;



  if (rankingSelecionado === 'pix') {
      ExibeRankingPix();
  } else if (rankingSelecionado === 'recargas') {
    ExibeRankingRecargas();
  } else {
    ExibeRankingNPS();
  }
}
