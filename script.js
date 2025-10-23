document.addEventListener('DOMContentLoaded', () => {
    // ================= ANIMAÇÕES =================
    const elementosParaAnimar = document.querySelectorAll('.animar');
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const elemento = entry.target;
                const delay = elemento.dataset.delay ? elemento.dataset.delay * 300 : 0;
                setTimeout(() => {
                    elemento.classList.add('visivel');
                }, delay);
                observer.unobserve(elemento);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    elementosParaAnimar.forEach(elemento => observer.observe(elemento));

    // ================= NAVBAR SCROLL =================
    const navbar = document.getElementById('navbar');
    const logo = document.getElementById('logo');
    const navLinks = document.getElementById('nav-links'); 
    const scrollThreshold = 100;

    function handleScroll() {
        if (window.scrollY > scrollThreshold) {
            navbar.classList.remove('nav-branca');
            navbar.classList.add('nav-transparente');
        } else {
            navbar.classList.remove('nav-transparente');
            navbar.classList.add('nav-branca');
        }
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // ================= HAMBURGER MENU =================
    const hamburger = document.getElementById('hamburger');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('ativo');
        navLinks.classList.toggle('visivel');
    });

    // Fechar menu ao clicar em um link
    document.querySelectorAll('#nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('ativo');
            navLinks.classList.remove('visivel');
        });
    });
});
