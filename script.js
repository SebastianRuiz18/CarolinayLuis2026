// ==========================================
// JAVASCRIPT FOR WEDDING PAGE (CAROLINA & LUIS)
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // SHOW/HIDE GUESTS FIELD
    // ==========================================
    const attendanceSelect = document.getElementById('attendance');
    const guestsGroup = document.getElementById('guestsGroup');
    
    if(attendanceSelect) {
        attendanceSelect.addEventListener('change', function() {
            if (this.value === 'yes') {
                guestsGroup.style.display = 'block';
            } else {
                guestsGroup.style.display = 'none';
                document.getElementById('guests').value = 0;
            }
        });
    }
    
    // ==========================================
    // RSVP FORM HANDLING (SIMULADO)
    // ==========================================
    const rsvpForm = document.getElementById('rsvpForm');
    const confirmationMessage = document.getElementById('confirmationMessage');
    const submitButton = document.querySelector('.submit-button'); 
    
    if(rsvpForm) {
        rsvpForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Efecto visual de "Enviando"
            const originalBtnText = submitButton.innerText;
            submitButton.innerText = "ENVIANDO...";
            submitButton.disabled = true;
            submitButton.style.opacity = "0.7";
            
            // Recolectar datos
            const formData = {
                Nombre: document.getElementById('name').value,
                Email: document.getElementById('email').value,
                Telefono: document.getElementById('phone').value,
                Asistencia: document.getElementById('attendance').value,
                Invitados_Extra: document.getElementById('guests').value,
                Alergias: document.getElementById('dietary').value,
                Mensaje: document.getElementById('message').value,
                Cancion: document.getElementById('song').value
            };
            
            // Simular envío con un temporizador (1.5 segundos)
            setTimeout(() => {
                console.log('Form data simulado:', formData);
                
                // Ocultar form y mostrar mensaje de éxito
                rsvpForm.style.display = 'none';
                confirmationMessage.style.display = 'block';
                confirmationMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                // Restaurar botón (por si recargan o resetean)
                submitButton.innerText = originalBtnText;
                submitButton.disabled = false;
                submitButton.style.opacity = "1";
            }, 1500);
        });
    }
    
    // ==========================================
    // FADE-IN ANIMATION ON SCROLL
    // ==========================================
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    function handleScrollAnimation() {
        const animatedElements = document.querySelectorAll('.timeline-item, .info-card');
        
        animatedElements.forEach(element => {
            if (isElementInViewport(element)) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    document.querySelectorAll('.timeline-item, .info-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    window.addEventListener('scroll', handleScrollAnimation);
    handleScrollAnimation(); 
    
    // ==========================================
    // FORM VALIDATION (UX)
    // ==========================================
    const emailInput = document.getElementById('email');
    if(emailInput) {
        emailInput.addEventListener('blur', function() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(this.value) && this.value !== '') {
                this.style.borderColor = 'red';
            } else {
                this.style.borderColor = ''; 
            }
        });
    }
    
    const phoneInput = document.getElementById('phone');
    if(phoneInput) {
        phoneInput.addEventListener('input', function() {
            this.value = this.value.replace(/[^\d\s\-()]/g, '');
        });
    }
    
    const nameInput = document.getElementById('name');
    if(nameInput) {
        nameInput.addEventListener('blur', function() {
            this.value = capitalizeName(this.value);
        });
    }
});

// ==========================================
// GLOBAL FUNCTIONS 
// ==========================================

function copyToClipboard(elementId, btnElement) {
    const textElement = document.getElementById(elementId);
    if(!textElement) return; 

    const textToCopy = textElement.innerText;
    
    navigator.clipboard.writeText(textToCopy).then(function() {
        const originalText = btnElement.innerHTML;
        
        btnElement.innerHTML = "¡COPIADO!";
        btnElement.style.backgroundColor = "var(--color-accent)";
        btnElement.style.color = "var(--color-bg-main)";
        
        setTimeout(() => {
            btnElement.innerHTML = originalText;
            btnElement.style.backgroundColor = "transparent";
            btnElement.style.color = "var(--color-accent)";
        }, 2000); 
    }).catch(function(err) {
        console.error('Error al copiar: ', err);
        alert("No se pudo copiar automáticamente. El número es: " + textToCopy);
    });
}

function capitalizeName(name) {
    return name
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

console.log('Wedding script loaded successfully - RSVP Simulation Mode');