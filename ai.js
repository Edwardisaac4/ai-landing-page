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

window.addEventListener('scroll', function(){
    let value = window.scrollY;
    
    if(element1) element1.style.transform = `translateY(${value * 0.4}px)`;
    if(element2) element2.style.transform = `translateY(${value * 0.2}px)`;
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