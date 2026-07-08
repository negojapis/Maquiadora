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
});
