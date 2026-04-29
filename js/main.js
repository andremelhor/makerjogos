// Função para carregar componentes HTML externos
function carregarComponente(id, path) {
    fetch(path)
        .then(response => {
            if (!response.ok) throw new Error(`Erro ao carregar: ${path}`);
            return response.text();
        })
        .then(data => {
            document.getElementById(id).innerHTML = data;
            
            // Se o componente for o header, precisamos inicializar o menu mobile
            if (id === 'header-placeholder') {
                initMenuMobile();
            }
        })
        .catch(error => console.error(error));
}

// Função para a lógica do Menu Responsivo (Hambúrguer)
function initMenuMobile() {
    const btnMobile = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav-menu');

    if (btnMobile && nav) {
        btnMobile.addEventListener('click', () => {
            nav.classList.toggle('active');
            btnMobile.classList.toggle('active');
        });
    }
}

// Quando a página carregar, ele injeta os pedaços fixos
window.addEventListener('DOMContentLoaded', () => {
    carregarComponente('header-placeholder', 'shared/header.html');
    carregarComponente('pre-footer-placeholder', 'shared/pre-footer.html');
    carregarComponente('footer-placeholder', 'shared/footer.html');
});




