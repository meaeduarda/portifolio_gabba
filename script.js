document.addEventListener('DOMContentLoaded', () => {
    const elementosParaAnimar = document.querySelectorAll('.animar');
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Se o elemento estiver visível na tela
                const elemento = entry.target;
                const delay = elemento.dataset.delay * 300;
                // classe 'visivel' após o delay
                setTimeout(() => {
                    elemento.classList.add('visivel');
                }, delay);

               
                observer.unobserve(elemento);
            }
        });
    };

  
    const observer = new IntersectionObserver(observerCallback, observerOptions);

    
    elementosParaAnimar.forEach(elemento => {
        observer.observe(elemento);
    });
});

document.addEventListener('DOMContentLoaded', () => {

    const navbar = document.getElementById('navbar');
    const logo = document.getElementById('logo');
    const navLinks = document.getElementById('nav-links'); 
    const scrollThreshold = 100; 

    function handleScroll() {
        if (window.scrollY > scrollThreshold) {
            navbar.classList.remove('nav-branca');
            navbar.classList.add('nav-transparente');
            
            // REVELAR OS LINKS
            navLinks.classList.add('visivel');
        } else {
            // Se estiver no topo:
            navbar.classList.remove('nav-transparente');
            navbar.classList.add('nav-branca');

            // ESCONDER OS LINKS
            navLinks.classList.remove('visivel');
        }
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll();
});