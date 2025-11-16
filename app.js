document.addEventListener('DOMContentLoaded', () => {

    const idCardForm = document.querySelector('#app-container form');
    const idCardContainer = document.querySelector('.id-card');


    const authContainer = document.getElementById('auth-container');
    const appContainer = document.getElementById('app-container');
    const loginContainer = document.getElementById('login-container');
    const signupContainer = document.getElementById('signup-container');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const showSignupLink = document.getElementById('show-signup');
    const showLoginLink = document.getElementById('show-login');
    const logoutBtn = document.getElementById('logout-btn');

    checkLoginStatus();

    function checkLoginStatus() {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (loggedInUser) {
            authContainer.style.display = 'none';
            appContainer.style.display = 'block';
            idCardContainer.style.display = 'none';
        } else {
            authContainer.style.display = 'block';
            appContainer.style.display = 'none';
        }
    }


    showSignupLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginContainer.style.display = 'none';
        signupContainer.style.display = 'block';
    });

    showLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        signupContainer.style.display = 'none';
        loginContainer.style.display = 'block';
    });

    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('signup-username').value.trim();
        const email = document.getElementById('signup-email').value.trim();
        const password = document.getElementById('signup-password').value.trim();

        if (!username || !email || !password) {
            alert('All fields are required.');
            return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userExists = users.find(user => user.username === username || user.email === email);

        if (userExists) {
            alert('Username or email already exists.');
        } else {
            users.push({ username, email, password });
            localStorage.setItem('users', JSON.stringify(users));
            alert('Signup successful! Please login.');
            signupContainer.style.display = 'none';
            loginContainer.style.display = 'block';
        }
    });

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value.trim();

        if (!email || !password) {
            alert('All fields are required.');
            return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.email === email && user.password === password);

        if (user) {
            localStorage.setItem('loggedInUser', JSON.stringify(user));
            checkLoginStatus();
        } else {
            alert('Invalid email or password.');
        }
    });

 
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('loggedInUser');
        checkLoginStatus();
    });


    if (idCardForm) {
        idCardContainer.style.display = 'none';
        idCardForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const course = document.getElementById('course').value;
            const id = document.getElementById('id').value;
            const dob = document.getElementById('dob').value;
            const email = document.getElementById('email').value;
            const title = document.querySelector('input[name="title"]:checked')?.value || '';

            const photoInput = document.getElementById('photo');
            let photoURL = 'https://randomuser.me/api/portraits/men/32.jpg';
            if (photoInput.files && photoInput.files[0]) {
                photoURL = URL.createObjectURL(photoInput.files[0]);
            }

            idCardContainer.querySelector('.card-photo').src = photoURL;
            idCardContainer.querySelector('.card-name').innerText = name;
            idCardContainer.querySelector('.card-title').innerText = title;
            idCardContainer.querySelector('.card-course').innerText = course;
            idCardContainer.querySelector('.card-id').innerText = id;
            idCardContainer.querySelector('.card-dob').innerText = dob;
            idCardContainer.querySelector('.card-email').innerText = email;

            idCardContainer.style.display = 'flex';
            idCardContainer.scrollIntoView({ behavior: 'smooth' });
        });
    }
});