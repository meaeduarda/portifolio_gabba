document.addEventListener('DOMContentLoaded', () => {
    // ANIMAÇÕES 
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

    // NAVBAR SCROLL
    const navbar = document.getElementById('navbar');
    const logo = document.getElementById('logo');
    const navLinks = document.getElementById('nav-links');
    const hamburger = document.getElementById('hamburger');
    const scrollThreshold = 100;

    function handleScroll() {
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            // Comportamento específico para mobile
            if (window.scrollY > scrollThreshold) {
                // Scroll - navbar escura com logo esquerda e hamburger direita
                navbar.classList.add('nav-transparente');
                navbar.classList.remove('nav-branca');
            } else {
                // Topo - navbar branca com logo centralizada
                navbar.classList.remove('nav-transparente');
                navbar.classList.add('nav-branca');
            }
        } else {
            // Comportamento original para desktop
            if (window.scrollY > scrollThreshold) {
                navbar.classList.remove('nav-branca');
                navbar.classList.add('nav-transparente');
            } else {
                navbar.classList.remove('nav-transparente');
                navbar.classList.add('nav-branca');
            }
        }
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // HAMBURGER MENU 
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('ativo');
        navLinks.classList.toggle('visivel');
        
        // Previne scroll quando menu está aberto
        if (navLinks.classList.contains('visivel')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Fechar menu ao clicar em um link
    document.querySelectorAll('#nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('ativo');
            navLinks.classList.remove('visivel');
            document.body.style.overflow = '';
        });
    });

    // Fechar menu ao clicar fora
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target) && navLinks.classList.contains('visivel')) {
            hamburger.classList.remove('ativo');
            navLinks.classList.remove('visivel');
            document.body.style.overflow = '';
        }
    });

    // COMPRAR VIA WHATSAPP 
    const botoesComprar = document.querySelectorAll('.btn-comprar');
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2>Finalizar Pedido</h2>
            <form id="form-whatsapp">
                <div class="form-group">
                    <label for="descricao-obra">Descreva sua obra personalizada:</label>
                    <textarea 
                        id="descricao-obra" 
                        placeholder="Ex: Gostaria da obra 'Retrato Jogador' com cores mais vibrantes..."
                        required
                    ></textarea>
                </div>
                
                <div class="form-group">
                    <label>Escolha o tamanho da sua tela:</label>
                    <div class="tamanhos-opcoes">
                        <div class="tamanho-opcao" data-tamanho="30x40cm">30x40 cm</div>
                        <div class="tamanho-opcao" data-tamanho="40x50cm">40x50 cm</div>
                        <div class="tamanho-opcao" data-tamanho="50x70cm">50x70 cm</div>
                        <div class="tamanho-opcao" data-tamanho="60x80cm">60x80 cm</div>
                        <div class="tamanho-opcao" data-tamanho="personalizado">Personalizado</div>
                    </div>
                    <input type="hidden" id="tamanho-selecionado" required>
                </div>

                <div class="form-group" id="tamanho-personalizado" style="display: none;">
                    <label for="dimensoes-personalizadas">Especifique as dimensões (cm):</label>
                    <input type="text" id="dimensoes-personalizadas" placeholder="Ex: 45x60 cm">
                </div>

                <div class="form-group">
                    <label>Escolha o tipo de tela:</label>
                    <div class="tipo-tela-opcoes">
                        <div class="tipo-tela-opcao" data-tipo="Pintura">
                            <span>Pintura</span>
                        </div>
                        <div class="tipo-tela-opcao" data-tipo="Pintura e Bordado">
                            <span>Pintura e Bordado</span>
                        </div>
                        <div class="tipo-tela-opcao" data-tipo="Bordado">
                            <span>Bordado</span>
                        </div>
                    </div>
                    <input type="hidden" id="tipo-tela-selecionado" required>
                </div>

                <button type="submit" class="btn-whatsapp">
                    📱 Enviar Pedido via WhatsApp
                </button>
            </form>
        </div>
    `;
    document.body.appendChild(modal);

    // Variáveis para armazenar dados
    let obraAtual = '';
    let tamanhoSelecionado = '';
    let tipoTelaSelecionado = '';

    // Abrir modal ao clicar em comprar
    botoesComprar.forEach(botao => {
        botao.addEventListener('click', (e) => {
            e.preventDefault();
            obraAtual = botao.getAttribute('data-obra');
            
            // Preencher descrição automaticamente para obras específicas
            const textarea = modal.querySelector('#descricao-obra');
            if (obraAtual !== 'Obra Personalizada') {
                textarea.value = `Gostaria de encomendar a obra: "${obraAtual}"\n\n`;
            } else {
                textarea.value = '';
            }
            
            // Resetar seleções
            modal.querySelectorAll('.tamanho-opcao').forEach(opcao => {
                opcao.classList.remove('selecionado');
            });
            modal.querySelectorAll('.tipo-tela-opcao').forEach(opcao => {
                opcao.classList.remove('selecionado');
            });
            modal.querySelector('#tamanho-selecionado').value = '';
            modal.querySelector('#tipo-tela-selecionado').value = '';
            modal.querySelector('#tamanho-personalizado').style.display = 'none';
            
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });

    // Selecionar tamanho
    modal.addEventListener('click', (e) => {
        if (e.target.classList.contains('tamanho-opcao')) {
            // Remover seleção anterior
            modal.querySelectorAll('.tamanho-opcao').forEach(opcao => {
                opcao.classList.remove('selecionado');
            });
            
            // Adicionar seleção atual
            e.target.classList.add('selecionado');
            tamanhoSelecionado = e.target.getAttribute('data-tamanho');
            modal.querySelector('#tamanho-selecionado').value = tamanhoSelecionado;
            
            // Mostrar/ocultar campo personalizado
            if (tamanhoSelecionado === 'personalizado') {
                modal.querySelector('#tamanho-personalizado').style.display = 'block';
            } else {
                modal.querySelector('#tamanho-personalizado').style.display = 'none';
            }
        }

        // Selecionar tipo de tela
        if (e.target.classList.contains('tipo-tela-opcao') || e.target.closest('.tipo-tela-opcao')) {
            const opcaoTipoTela = e.target.classList.contains('tipo-tela-opcao') ? e.target : e.target.closest('.tipo-tela-opcao');
            
            // Remover seleção anterior
            modal.querySelectorAll('.tipo-tela-opcao').forEach(opcao => {
                opcao.classList.remove('selecionado');
            });
            
            // Adicionar seleção atual
            opcaoTipoTela.classList.add('selecionado');
            tipoTelaSelecionado = opcaoTipoTela.getAttribute('data-tipo');
            modal.querySelector('#tipo-tela-selecionado').value = tipoTelaSelecionado;
        }
    });

    // Fechar modal
    modal.querySelector('.close-modal').addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    });

    // Fechar modal ao clicar fora
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });

    // Enviar via WhatsApp
    modal.querySelector('#form-whatsapp').addEventListener('submit', (e) => {
        e.preventDefault();
        
        const descricao = modal.querySelector('#descricao-obra').value;
        const tamanho = modal.querySelector('#tamanho-selecionado').value;
        const dimensoesPersonalizadas = modal.querySelector('#dimensoes-personalizadas').value;
        const tipoTela = modal.querySelector('#tipo-tela-selecionado').value;
        
        // Validar seleções
        if (!tipoTela) {
            alert('Por favor, selecione o tipo de tela.');
            return;
        }

        // Montar mensagem para WhatsApp
        const telefoneVendedor = '5581994527528'; // número com DDD sem parênteses ou traços
        let mensagem = `Olá Gabriel! Gostaria de encomendar uma obra:\n\n`;
        
        if (obraAtual !== 'Obra Personalizada') {
            mensagem += `*Obra de interesse:* ${obraAtual}\n`;
        }
        
        mensagem += `*Descrição:* ${descricao}\n`;
        
        if (tamanho === 'personalizado' && dimensoesPersonalizadas) {
            mensagem += `*Tamanho:* ${dimensoesPersonalizadas}\n`;
        } else {
            mensagem += `*Tamanho:* ${tamanho}\n`;
        }
        
        mensagem += `*Tipo de Tela:* ${tipoTela}\n`;
        mensagem += `\nAguardo seu retorno para finalizarmos os detalhes!`;
        
        // Codificar mensagem para URL
        const mensagemCodificada = encodeURIComponent(mensagem);
        const urlWhatsApp = `https://wa.me/${telefoneVendedor}?text=${mensagemCodificada}`;
        
        // Abrir WhatsApp
        window.open(urlWhatsApp, '_blank');
        
        // Fechar modal
        modal.style.display = 'none';
        document.body.style.overflow = '';
    });

    // Recalcular navbar ao redimensionar
    window.addEventListener('resize', handleScroll);
});

// BANNER ANIMATION 
function animarBanner() {
    const bannerTitulo = document.querySelector('.banner-texto h1');
    const bannerSubtitulo = document.querySelector('.banner-texto h2');
    const bannerImagens = document.querySelector('.banner-imagens');
    
    // Animação em cascata para os elementos do banner
    setTimeout(() => {
        bannerTitulo.classList.add('visivel');
    }, 300);
    
    setTimeout(() => {
        bannerSubtitulo.classList.add('visivel');
    }, 600);
    
    setTimeout(() => {
        bannerImagens.classList.add('visivel');
    }, 900);
}

// OTIMIZAÇÃO PARA MOBILE 
function optimizeForMobile() {
    if (window.innerWidth <= 768) {
        // Forçar hardware acceleration para animações
        const elementosAnimados = document.querySelectorAll('.imagem-container, .banner-imagens');
        elementosAnimados.forEach(el => {
            el.style.transform = 'translateZ(0)';
        });
    }
}

// Chamar as funções quando a página carregar
window.addEventListener('load', () => {
    animarBanner();
    optimizeForMobile();
});

window.addEventListener('resize', optimizeForMobile);