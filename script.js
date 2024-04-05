function toggleForms() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    loginForm.style.display = loginForm.style.display === "none" ? "block" : "none";
    registerForm.style.display = registerForm.style.display === "none" ? "block" : "none";
}

function toggleResetForm() {
    const resetForm = document.getElementById('passwordResetForm');
    resetForm.style.display = resetForm.style.display === 'none' ? 'block' : 'none';
}

function resetPassword() {
    const email = document.getElementById('resetEmail').value;
    const user = JSON.parse(localStorage.getItem(email));

    if (!user) {
        alert('User not found.');
        return;
    }

    const newPassword = prompt('Enter your new password:');
    if (newPassword) {
        user.password = newPassword;
        localStorage.setItem(email, JSON.stringify(user));
        alert('Password reset successfully. Please log in with your new password.');
        toggleResetForm();
    } else {
        alert('Password reset canceled.');
    }
}

function saveUser(userData) {
    const userKey = userData.email || userData.mobile;
    localStorage.setItem(userKey, JSON.stringify(userData));
}

function getUser(loginId) {
    return JSON.parse(localStorage.getItem(loginId));
}

function register() {
    const userData = {
        name: document.getElementById('registerName').value,
        mobile: document.getElementById('registerMobile').value,
        email: document.getElementById('registerEmail').value,
        dob: document.getElementById('registerDob').value,
        gender: document.getElementById('registerGender').value,
        password: document.getElementById('registerPassword').value
    };

    if (!userData.name || !userData.password || !userData.dob || (!userData.email && !userData.mobile)) {
        alert('Please fill out all required fields.');
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
        alert('Please enter a valid email address.');
        return;
    }

    if (!/^[\d]{10}$/.test(userData.mobile)) {
        alert('Please enter a valid 10-digit mobile number.');
        return;
    }

    if (getUser(userData.email)) {
        alert('A user with this email already exists.');
        return;
    }

    saveUser(userData);
    alert('Registration successful. Please log in.');
    toggleForms();
}


function login() {
    const loginId = document.getElementById('loginId').value;
    const password = document.getElementById('loginPassword').value;
    const user = getUser(loginId);

    if (!user || user.password !== password) {
        alert('Invalid login credentials. Please try again.');
        return;
    }

    localStorage.setItem('currentUser', JSON.stringify(user));
    window.location.href = 'dashboard.html';
}
