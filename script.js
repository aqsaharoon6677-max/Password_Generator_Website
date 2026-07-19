const passwordEl = document.getElementById('password');
const lengthEl = document.getElementById('length');
const lengthValue = document.getElementById('lengthValue');
const uppercaseEl = document.getElementById('uppercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateBtn = document.getElementById('generateBtn');
const copyBtn = document.getElementById('copyBtn');

function updateSlider() {
    const value = (lengthEl.value - lengthEl.min) / (lengthEl.max - lengthEl.min) * 100;
    lengthEl.style.setProperty('--slider-value', value + '%');
    lengthValue.textContent = lengthEl.value;
}

lengthEl.addEventListener('input', updateSlider);

updateSlider();

generateBtn.addEventListener('click', () => {
    const length = lengthEl.value;
    const hasUpper = uppercaseEl.checked;
    const hasNumbers = numbersEl.checked;
    const hasSymbols = symbolsEl.checked;
    
    // Button pulse effect
    generateBtn.style.transform = 'scale(0.95)';
    setTimeout(() => generateBtn.style.transform = 'scale(1)', 100);
    
    const newPassword = generatePassword(length, hasUpper, hasNumbers, hasSymbols);
    
    // Password field animation
    passwordEl.classList.remove('generated');
    void passwordEl.offsetWidth; // Re-trigger animation
    passwordEl.classList.add('generated');
    
    passwordEl.value = newPassword;
    checkStrength(newPassword);
});

copyBtn.addEventListener('click', () => {
    if(passwordEl.value) {
        navigator.clipboard.writeText(passwordEl.value);
        
        // Copy animation
        copyBtn.classList.add('copied');
        copyBtn.textContent = 'Copied!';
        
        setTimeout(() => {
            copyBtn.classList.remove('copied');
            copyBtn.textContent = 'Copy';
        }, 2000);
    }
});

function generatePassword(length, upper, numbers, symbols) {
    let chars = 'abcdefghijklmnopqrstuvwxyz';
    if(upper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if(numbers) chars += '0123456789';
    if(symbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    let password = '';
    for(let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
}