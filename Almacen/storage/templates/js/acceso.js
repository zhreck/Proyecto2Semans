
    // Mobile menu toggle
document.getElementById('mobileMenuToggle').addEventListener('click', function() {
    const navMenu = document.getElementById('navMenu');
        navMenu.classList.toggle('active');
    });

    // Tab switching functionality
function switchTab(tabName) {
    // Hide all sections
        document.getElementById('loginSection').classList.remove('active');
        document.getElementById('registerSection').classList.remove('active');

    // Remove active class from all tabs
        document.getElementById('loginTab').classList.remove('active');
        document.getElementById('registerTab').classList.remove('active');

    // Show selected section and activate tab
        if (tabName === 'login') {
            document.getElementById('loginSection').classList.add('active');
            document.getElementById('loginTab').classList.add('active');
        } else {
            document.getElementById('registerSection').classList.add('active');
            document.getElementById('registerTab').classList.add('active');
            }

    // Clear any previous alerts
        clearAlerts();
    }

function clearAlerts() {
    const alerts = document.querySelectorAll('.alert');
        alerts.forEach(alert => alert.classList.remove('show'));
    }

    // Password visibility toggle
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const toggleIcon = document.getElementById(inputId + 'Toggle');

    if (input.type === 'password') {
        input.type = 'text';
        toggleIcon.classList.remove('fa-eye');
        toggleIcon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        toggleIcon.classList.remove('fa-eye-slash');
        toggleIcon.classList.add('fa-eye');
    }
    }

    // Form validation functions
function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
    }

function validatePassword(password) {
        return password.length >= 8;
    }

function validateName(name) {
        return name.trim().length >= 2;
    }

function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        const inputElement = document.getElementById(elementId.replace('Error', ''));

        errorElement.textContent = message;
        errorElement.style.display = 'block';
        inputElement.classList.add('error');
        inputElement.classList.remove('success');
    }

function hideError(elementId) {
        const errorElement = document.getElementById(elementId);
        const inputElement = document.getElementById(elementId.replace('Error', ''));

        errorElement.style.display = 'none';
        inputElement.classList.remove('error');
        inputElement.classList.add('success');
    }

function showAlert(alertId, message, type = 'error') {
        const alertElement = document.getElementById(alertId);
            alertElement.textContent = message;
            alertElement.className = `alert alert-${type} show`;

        setTimeout(() => {
            alertElement.classList.remove('show');
        }, 5000);
    }

function setButtonLoading(buttonId, isLoading) {
        const button = document.getElementById(buttonId);
    if (isLoading) {
        button.classList.add('btn-loading');
        button.disabled = true;
    } else {
        button.classList.remove('btn-loading');
        button.disabled = false;
        }
    }

    // Login Form Handler
document.getElementById('loginForm').addEventListener('submit'), function(e) {
    e.preventDefault()
    };

    // Mobile menu toggle
document.getElementById('mobileMenuToggle').addEventListener('click', function() {
    const navMenu = document.getElementById('navMenu');
    navMenu.classList.toggle('active');
    });

    // Password visibility toggle
function togglePassword(inputId) {
        const input = document.getElementById(inputId);
        const toggleIcon = document.getElementById(inputId + 'Toggle');

    if (input.type === 'password') {
            input.type = 'text';
            toggleIcon.classList.remove('fa-eye');
            toggleIcon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        toggleIcon.classList.remove('fa-eye-slash');
        toggleIcon.classList.add('fa-eye');
        }
    }

    // Form validation functions
function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
    }

function validatePassword(password) {
        return password.length >= 8;
    }

function validateName(name) {
        return name.trim().length >= 2;
    }

function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        const inputElement = document.getElementById(elementId.replace('Error', ''));

        errorElement.textContent = message;
        errorElement.style.display = 'block';
        inputElement.classList.add('error');
        inputElement.classList.remove('success');
    }

function hideError(elementId) {
        const errorElement = document.getElementById(elementId);
        const inputElement = document.getElementById(elementId.replace('Error', ''));

            errorElement.style.display = 'none';
            inputElement.classList.remove('error');
            inputElement.classList.add('success');
    }

function showAlert(alertId, message, type = 'error') {
        const alertElement = document.getElementById(alertId);
            alertElement.textContent = message;
            alertElement.className = `alert alert-${type} show`;

        setTimeout(() => {
            alertElement.classList.remove('show');
        }, 5000);
    }

    function setButtonLoading(buttonId, isLoading) {
        const button = document.getElementById(buttonId);
        if (isLoading) {
            button.classList.add('btn-loading');
            button.disabled = true;
        } else {
            button.classList.remove('btn-loading');
            button.disabled = false;
        }
    }

    // Login Form Handler
document.getElementById('loginForm').addEventListener('submit'),function(e) {
    e.preventDefault();

        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value;

        let isValid = true;

    // Validate email
        if (!email) {
            showError('loginEmailError', 'El correo electrónico es requerido');
            isValid = false;
        } else if (!validateEmail(email)) {
            showError('loginEmailError', 'Ingresa un correo electrónico válido');
            isValid = false;
        } else {
            hideError('loginEmailError');
        }

    // Validate password
        if (!password) {
            showError('loginPasswordError', 'La contraseña es requerida');
            isValid = false;
        } else {
            hideError('loginPasswordError');
        }

        if (isValid) {
            setButtonLoading('loginButton', true);

    // Simular llamada a API (2 segundos)
        setTimeout(() => {
            setButtonLoading('loginButton', false);

            // Simular login exitoso
            if (email === 'demo@bodegaschile.cl') {
                console.log("Login exitoso ✅");
            } else {
                console.log("Email incorrecto ❌");
            }

            }, 2000); // <-- el tiempo va aquí (en milisegundos)
        }

    }
