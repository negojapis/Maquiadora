window.addEventListener('load', () => {
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.classList.add('fade-out');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 1500); // Aguarda a transição de opacidade
        }
    }, 5000); // 5 segundos com a frase na tela
});

document.addEventListener('DOMContentLoaded', () => {
    
    // Intersection Observer for Scroll Reveals
    const revealElements = document.querySelectorAll('.reveal');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // Scroll Spy for Navigation Links
    const sections = document.querySelectorAll('section, footer');
    const navLinks = document.querySelectorAll('.nav-links a');

    const scrollSpyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active-nav');
                    if (link.getAttribute('href') === `#${currentId}`) {
                        link.classList.add('active-nav');
                    }
                });
            }
        });
    }, { rootMargin: "-40% 0px -40% 0px" });

    sections.forEach(section => {
        if(section.getAttribute('id')) {
            scrollSpyObserver.observe(section);
        }
    });

    // Add a slight magnetic effect to the primary button on desktop
    const magnetButton = document.querySelector('.btn-primary');
    if (magnetButton && window.innerWidth > 768) {
        magnetButton.addEventListener('mousemove', (e) => {
            const position = magnetButton.getBoundingClientRect();
            const x = e.pageX - position.left - position.width / 2;
            const y = e.pageY - position.top - position.height / 2;
            magnetButton.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        });

        magnetButton.addEventListener('mouseout', (e) => {
            magnetButton.style.transform = `translate(0px, 0px)`;
        });
    }
    // Gallery Lightbox Logic
    const galleryData = {
        noivas: [
            "noivas/Noiva 1.png",
            "noivas/Noiva 2.png",
            "noivas/Noiva 3.png",
            "noivas/Noiva 4.png",
            "noivas/Noiva 5.png"
        ],
        formaturas: [
            "Formatura/Formanda 1.png",
            "Formatura/Formanda 2.png",
            "Formatura/Formanda 3.png",
            "Formatura/Formanda 4.png",
            "Formatura/Formanda 5.png"
        ],
        gala: [
            "Festa de gala/gala 1.png",
            "Festa de gala/gala 2.png",
            "Festa de gala/gala 3.png",
            "Festa de gala/gala 4.png",
            "Festa de gala/gala 5.png"
        ],
        eventos: [
            "eventos/Evento 1.png",
            "eventos/Evento 2.png",
            "eventos/Evento 3.png",
            "eventos/Evento 4.png",
            "eventos/5.png"
        ]
    };

    let currentGallery = [];
    let currentIndex = 0;

    const lightbox = document.getElementById('gallery-modal');
    if(lightbox) {
        const lightboxImg = document.getElementById('lightbox-img');
        const closeBtn = document.querySelector('.lightbox-close');
        const nextBtn = document.querySelector('.lightbox-next');
        const prevBtn = document.querySelector('.lightbox-prev');
        const currentSpan = document.getElementById('lightbox-current');
        const totalSpan = document.getElementById('lightbox-total');

        const updateLightbox = () => {
            lightboxImg.style.opacity = 0;
            setTimeout(() => {
                lightboxImg.src = currentGallery[currentIndex];
                currentSpan.innerText = currentIndex + 1;
                lightboxImg.style.opacity = 1;
            }, 200);
        };

        document.querySelectorAll('.gallery-trigger').forEach(trigger => {
            trigger.addEventListener('click', () => {
                const galleryKey = trigger.getAttribute('data-gallery');
                if(galleryData[galleryKey]) {
                    currentGallery = galleryData[galleryKey];
                    currentIndex = 0;
                    totalSpan.innerText = currentGallery.length;
                    updateLightbox();
                    lightbox.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        closeBtn.addEventListener('click', () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        });

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % currentGallery.length;
            updateLightbox();
        });

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
            updateLightbox();
        });

        lightbox.addEventListener('click', (e) => {
            if(e.target === lightbox || e.target.classList.contains('lightbox-content') || e.target.classList.contains('lightbox-image-container')) {
                lightbox.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Automatic Slideshow for Cards
    const cardSlideshowIndexes = {
        noivas: 0,
        formaturas: 0,
        gala: 0,
        eventos: 0
    };

    setInterval(() => {
        document.querySelectorAll('.gallery-trigger').forEach(trigger => {
            const galleryKey = trigger.getAttribute('data-gallery');
            if(galleryData[galleryKey] && galleryData[galleryKey].length > 1) {
                cardSlideshowIndexes[galleryKey] = (cardSlideshowIndexes[galleryKey] + 1) % galleryData[galleryKey].length;
                const imgEl = trigger.querySelector('.card-image');
                if(imgEl) {
                    // Esmaece a imagem atual
                    imgEl.style.opacity = 0;
                    
                    // Aguarda o esmaecimento (600ms do CSS)
                    setTimeout(() => {
                        const newSrc = galleryData[galleryKey][cardSlideshowIndexes[galleryKey]];
                        // Faz o preload da nova imagem para evitar piscadas
                        const tempImg = new Image();
                        tempImg.onload = () => {
                            imgEl.src = newSrc;
                            imgEl.style.opacity = 1; // Revela a imagem nova suavemente
                        };
                        tempImg.src = newSrc;
                    }, 600);
                }
            }
        });
    }, 4500); // Alterna a cada 4.5 segundos
});
