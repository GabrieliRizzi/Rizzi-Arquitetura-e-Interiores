// js/script.js
// Menu mobile interativo
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}));

// Animação de scroll suave para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        e.preventDefault();
        const targetId = this.getAttribute("href");
        if (targetId === "#") return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: "smooth"
            });
        }
    });
});

// Efeito de revelação ao scroll
function revealOnScroll() {
    const elements = document.querySelectorAll(".destaque-item, .sobre-content");
    
    elements.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add("active");
        }
    });
}

window.addEventListener("scroll", revealOnScroll);
// Executa uma vez ao carregar a página
window.addEventListener("load", revealOnScroll);

// Carrossel para a página de projetos (será usado na página específica)
function initCarousel() {
    const carousel = document.querySelector(".carousel");
    if (!carousel) return;
    
    const slides = carousel.querySelectorAll(".carousel-slide");
    const prevBtn = carousel.querySelector(".carousel-prev");
    const nextBtn = carousel.querySelector(".carousel-next");
    const dotsContainer = carousel.querySelector(".carousel-dots");
    
    let currentSlide = 0;
    
    // Criar dots de navegação
    slides.forEach((_, i) => {
        const dot = document.createElement("button");
        dot.classList.add("carousel-dot");
        if (i === 0) dot.classList.add("active");
        dot.addEventListener("click", () => goToSlide(i));
        dotsContainer.appendChild(dot);
    });
    
    // Função para ir para um slide específico
    function goToSlide(n) {
        slides[currentSlide].classList.remove("active");
        dotsContainer.children[currentSlide].classList.remove("active");
        
        currentSlide = (n + slides.length) % slides.length;
        
        slides[currentSlide].classList.add("active");
        dotsContainer.children[currentSlide].classList.add("active");
    }
    
    // Event listeners para os botões
    prevBtn.addEventListener("click", () => goToSlide(currentSlide - 1));
    nextBtn.addEventListener("click", () => goToSlide(currentSlide + 1));
    
    // Auto-avanço do carrossel
    let carouselInterval = setInterval(() => goToSlide(currentSlide + 1), 5000);
    
    // Pausar ao passar o mouse
    carousel.addEventListener("mouseenter", () => clearInterval(carouselInterval));
    carousel.addEventListener("mouseleave", () => {
        carouselInterval = setInterval(() => goToSlide(currentSlide + 1), 5000);
    });
}

// Inicializar carrossel quando a página carregar
document.addEventListener("DOMContentLoaded", initCarousel);

// Validação de formulário de contato
function validateContactForm() {
    const form = document.querySelector(".contact-form");
    if (!form) return;
    
    form.addEventListener("submit", function(e) {
        e.preventDefault();
        let isValid = true;
        
        // Validar nome
        const nameInput = form.querySelector('input[name="name"]');
        if (!nameInput.value.trim()) {
            showError(nameInput, "Por favor, insira seu nome.");
            isValid = false;
        } else {
            clearError(nameInput);
        }
        
        // Validar email
        const emailInput = form.querySelector('input[name="email"]');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailInput.value.trim() || !emailRegex.test(emailInput.value)) {
            showError(emailInput, "Por favor, insira um email válido.");
            isValid = false;
        } else {
            clearError(emailInput);
        }
        
        // Validar mensagem
        const messageInput = form.querySelector('textarea[name="message"]');
        if (!messageInput.value.trim()) {
            showError(messageInput, "Por favor, insira sua mensagem.");
            isValid = false;
        } else {
            clearError(messageInput);
        }
        
        // Se o formulário for válido, enviar (simulação)
        if (isValid) {
            // Em um cenário real, aqui seria uma requisição AJAX para o servidor
            alert("Mensagem enviada com sucesso! Em breve entraremos em contato.");
            form.reset();
        }
    });
    
    function showError(input, message) {
        clearError(input);
        const error = document.createElement("small");
        error.className = "error-message";
        error.style.color = "red";
        error.textContent = message;
        input.parentNode.appendChild(error);
        input.style.borderColor = "red";
    }
    
    function clearError(input) {
        const container = input.parentNode;
        const error = container.querySelector(".error-message");
        if (error) {
            container.removeChild(error);
        }
        input.style.borderColor = "";
    }
}

// Inicializar validação do formulário
document.addEventListener("DOMContentLoaded", validateContactForm);
