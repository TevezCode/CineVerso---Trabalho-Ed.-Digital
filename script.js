document.addEventListener('DOMContentLoaded', () => {
    // --- Seleção de Elementos ---
    const modal = document.getElementById('movieModal');
    const closeBtn = document.querySelector('.modal-close');
    const cards = document.querySelectorAll('.card');
    const heroTitle = document.querySelector('.hero-title');
    const contactForm = document.getElementById('contactForm');

    // --- Lógica do Modal de Filmes ---
    if (modal && closeBtn) {
        cards.forEach(card => {
            card.addEventListener('click', () => {
                // Captura os dados do card clicado
                const title = card.querySelector('.card-title').textContent;
                const genre = card.querySelector('.card-genre').textContent;
                const desc = card.querySelector('.card-desc').textContent;
                const rating = card.querySelector('.card-rating').textContent;
                const imgSrc = card.querySelector('img').src;
                const duration = card.dataset.duration;
                const director = card.dataset.director;

                // Preenche o modal
                document.getElementById('modalTitle').textContent = title;
                document.getElementById('modalGenre').textContent = genre;
                document.getElementById('modalDesc').textContent = desc;
                document.getElementById('modalRating').textContent = rating;
                document.getElementById('modalDuration').textContent = duration;
                document.getElementById('modalDirector').textContent = director;
                document.getElementById('modalImg').src = imgSrc;

                // Exibe o modal
                modal.classList.add('show');
                document.body.style.overflow = 'hidden'; // Trava o scroll do fundo
            });
        });

        const hideModal = () => {
            modal.classList.remove('show');
            document.body.style.overflow = ''; // Libera o scroll
        };

        closeBtn.onclick = hideModal;
        window.onclick = (e) => { if (e.target === modal) hideModal(); };
    }

    // --- Parallax do Título Principal ---
    if (heroTitle) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            heroTitle.style.transform = `translateY(${scrollY * 0.3}px)`;
        });
    }

    // --- Interação de Inclinação 3D e Brilho nos Cards ---
    if (cards.length > 0) {
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 12;
                const rotateY = (centerX - x) / 12;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px) scale(1.02)`;
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }

    // --- Lógica do Formulário de Contato ---
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const successMsg = document.getElementById('success-msg');
            const formData = new FormData(contactForm);
            
            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    contactForm.style.display = 'none';
                    if (successMsg) successMsg.style.display = 'flex';
                } else {
                    alert('Ops! Ocorreu um problema ao enviar seu formulário.');
                }
            } catch (error) {
                alert('Erro de conexão. Tente novamente mais tarde.');
            }
        });
    }
});