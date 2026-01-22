let signInBtn = document.querySelector('#signIn');
let signInPage = document.querySelector('#signInPage');
let closeIcon = document.querySelector('#closeIcon');

signInBtn.onclick = function(){
    signInPage.classList.add('opensignin');
}

closeIcon.onclick = function(){
    signInPage.classList.remove('opensignin');
}

document.addEventListener('mousemove', function(e){
    document.querySelectorAll('.parallax').forEach(function(el){
        let speed = el.getAttribute('data-speed');
        let x = (window.innerWidth - e.pageX * speed) / 100;
        let y = (window.innerHeight - e.pageY * speed) / 100;

        el.style.transform = `translateX(${x}px) translateY(${y}px)`;
    });
});

const companies = document.querySelector('.companies');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    });
});

if(companies) observer.observe(companies);

const element1 = document.querySelector('.element1');
const element2 = document.querySelector('.element2');
const heroImage = document.querySelector('.hero-image');
const roadmapCards = document.querySelectorAll('.roadmap-card');

window.addEventListener('scroll', function(){
    let value = window.scrollY;
    let limit = heroImage ? heroImage.clientHeight : Infinity;
    let parallaxValue = Math.min(value, limit);
    
    if(element1) element1.style.transform = `translateY(${parallaxValue * 0.6}px)`;
    if(element2) element2.style.transform = `translateY(${parallaxValue * 0.3}px)`;

    roadmapCards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const img = card.querySelector('img');

        if (rect.top < windowHeight && rect.bottom >= 0 && img) {
            const cardCenterY = rect.top + rect.height / 2;
            const screenCenterY = windowHeight / 2;
            const diff = screenCenterY - cardCenterY;

            img.style.transform = `translateY(${diff * 0.1}px) scale(1.1)`;
        }
    });
});

const heroH4 = document.querySelector('.hero h4');

if(heroH4){
    const text = heroH4.textContent;
    heroH4.textContent = '';
    let i = 0;
    let timer;
    
    function typeWriter(){
        if(i < text.length){
            heroH4.textContent += text.charAt(i);
            i++;
            timer = setTimeout(typeWriter, 100);
        }
    }
    
    function backSpace(){
        if(i > 0){
            heroH4.textContent = text.substring(0, i-1);
            i--;
            timer = setTimeout(backSpace, 50);
        }
    }

    const h4Observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            clearTimeout(timer);
            if(entry.isIntersecting){
                typeWriter();
            } else {
                backSpace();
            }
        });
    });

    h4Observer.observe(heroH4);
}

const navLinks = document.querySelectorAll('header a');

navLinks.forEach(link => {
    link.addEventListener('click', function(e){
        const href = this.getAttribute('href');
        if(href && href.startsWith('#') && href.length > 1){
            e.preventDefault();
            const target = document.querySelector(href);
            if(target){
                const headerOffset = 70;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

const featureCards = document.querySelectorAll('.feature-card');

featureCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        card.style.transition = 'box-shadow 0.3s ease, border-color 0.3s ease';
        card.style.transform = `perspective(1000px) translateY(-15px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease';
        card.style.transform = '';
    });
});

roadmapCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -5;
        const rotateY = ((x - centerX) / centerX) * 5;

        card.style.transition = 'transform 0.1s ease';
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transition = 'transform 0.5s ease';
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
});