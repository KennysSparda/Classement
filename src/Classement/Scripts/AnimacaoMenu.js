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