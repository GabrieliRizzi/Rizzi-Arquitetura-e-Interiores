// js/projetos.js
// Filtro para a galeria de projetos
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filtro-btn');
    const projetoItems = document.querySelectorAll('.projeto-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove a classe active de todos os botões
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Adiciona a classe active ao botão clicado
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            projetoItems.forEach(item => {
                if (filterValue === 'todos') {
                    item.style.display = 'block';
                } else {
                    if (item.getAttribute('data-categoria') === filterValue) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                }
            });
        });
    });
});
