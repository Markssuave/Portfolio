document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    const navList = document.getElementById('nav-links');
    const burger = document.getElementById('burger');

    // Toggle Burger Menu
    burger.addEventListener('click', () => {
        navList.classList.toggle('nav-active');
        burger.classList.toggle('toggle');
    });

    // Handle scroll for active nav link
    const updateActiveLink = () => {
        let current = '';
        const scrollTop = container.scrollTop > 0 ? container.scrollTop : window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollTop >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    };

    container.addEventListener('scroll', updateActiveLink);
    window.addEventListener('scroll', updateActiveLink);

    // Smooth scroll for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            // Close mobile menu if open
            if (navList.classList.contains('nav-active')) {
                navList.classList.remove('nav-active');
                burger.classList.remove('toggle');
            }

            const isMobile = window.innerWidth <= 425;

            if (!isMobile) {
                container.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: 'smooth'
                });
            } else {
                window.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for Reveal Animations
    const revealElements = document.querySelectorAll('.reveal-element, .section-title, .about-content, .tech-category, .contact-card');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });
    // Modal Logic
    const modal = document.getElementById('project-modal');
    const closeModalBtn = document.querySelector('.close-modal');
    const seeMoreBtns = document.querySelectorAll('.see-more');

    seeMoreBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const card = e.target.closest('.project-card');

            // Extract data
            const imgSrc = card.querySelector('.project-thumb').src;
            const title = card.querySelector('h3').innerText;
            const role = card.querySelector('.role').innerText;
            const year = card.querySelector('.year').innerText;
            const desc = card.querySelector('.project-full-desc').innerHTML;

            // Populate modal
            document.getElementById('modal-img').src = imgSrc;
            document.getElementById('modal-title').innerText = title;
            document.getElementById('modal-role').innerText = role;
            document.getElementById('modal-year').innerText = year;
            document.getElementById('modal-desc').innerHTML = desc;

            // Show modal
            modal.classList.add('show');
            document.body.classList.add('modal-open');
        });
    });

    // Close Modal
    const closeModal = () => {
        modal.classList.remove('show');
        document.body.classList.remove('modal-open');
    };

    closeModalBtn.addEventListener('click', closeModal);

    // Close modal when clicking outside of modal-content
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
});
