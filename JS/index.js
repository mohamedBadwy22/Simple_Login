let emailInput = document.getElementById("emailInput");
let passwordInput = document.getElementById("passwordInput");

let emailRegisterInput = document.getElementById("emailRegister");
let passwordRegisterInput = document.getElementById("passwordRegister");
let nameInput = document.getElementById("name");

let registerBtn = document.getElementById('registerBtn');
let signInBtn = document.getElementById('signInBtn');
let signOutBtn = document.getElementById('signOutBtn');

let signInAnchor = document.getElementById('signInAnc');
let signUpAnchor = document.getElementById('signUpAnc');

let currentUser;
let users = [];
if (localStorage.getItem('users')) {
    users = JSON.parse(localStorage.getItem('users'));
}

//Register Functions
registerBtn.addEventListener('click',register);
signInAnchor.addEventListener('click',toSignIn);

function register () {
    if (validateSignUp(nameInput) && validateSignUp(passwordRegisterInput) && validateSignUp(emailRegisterInput) && checkRepeating(emailRegisterInput.value)) {
        let user = {
        name : nameInput.value,
        email : emailRegisterInput.value,
        password : encryption(passwordRegisterInput.value)
        }
        users.push(user);
        localStorage.setItem("users",JSON.stringify(users));
        displaySuccess();
        clearInputs();
    } else {
        displayError ();
    }
}

function checkRepeating (email) {
    const flag = true;
    for (let i = 0; i < users.length; i++) {
        if(email == users[i].email){
            flag = false;
        }
    }
    if ( !flag ) {
        displayError();
    }
    return flag
}

function validateSignUp (input) {
    let isValid ; 
    let regex = {
        name : /^[A-Z][a-z]{2,12}$/ ,
        passwordRegister : /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/ ,
        emailRegister : /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/
    }
    isValid = regex[input.id].test(input.value);
    editInputValidation(isValid, input);
    return isValid ;
}

function toSignIn() {
    document.getElementById("signInWindow").classList.remove('d-none');
    document.getElementById("registerWindow").classList.add('d-none');
    document.getElementById("homePage").classList.add('d-none');
}

//Signing In  Functions
signInBtn.addEventListener('click',signIn);
signUpAnchor.addEventListener('click',toSignUp);

function signIn () {
    if (checkUser()) {
        clearInputs();
        toHome();
    } else {
        document.getElementById("incorrectMessage").classList.remove('d-none');
    }
}

function checkUser () {
    let flag = false ;
    for (let i = 0; i < users.length; i++) {
        if(emailInput.value == users[i].email && passwordInput.value == decryption(users[i].password)){
            flag = true ;
            currentUser = users[i];
        }
    }
    return flag ;
}

function toSignUp() {
    document.getElementById("signInWindow").classList.add('d-none');
    document.getElementById("registerWindow").classList.remove('d-none');
    document.getElementById("homePage").classList.add('d-none');
}

function toHome () {
    document.getElementById("signInWindow").classList.add('d-none');
    document.getElementById("registerWindow").classList.add('d-none');
    document.getElementById("incorrectMessage").classList.add('d-none');
    document.getElementById("homePage").classList.remove('d-none');
    document.getElementById("welcomeMessage").innerHTML = (`Welcome ${currentUser.name}`);
}

//Home Functions 
signOutBtn.addEventListener('click',toSignIn);

//Functions Help With a better UI/UX
emailRegisterInput.addEventListener('input',(e)=>{
    validateSignUp (e.target);
})
passwordRegisterInput.addEventListener('input',(e)=>{
    validateSignUp (e.target);
})
nameInput.addEventListener('input',(e)=>{
    validateSignUp (e.target);
})

function editInputValidation(isValid, element) {
  if (isValid) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
  } else {
    element.classList.remove("is-valid");
    element.classList.add("is-invalid");
  }
}

function clearInputs () {
    nameInput.value = '';
    emailRegisterInput.value = '';
    passwordRegisterInput.value = '';
    emailInput.value = '';
    passwordInput.value = '';
    nameInput.classList.remove("is-valid" , "is-invalid");
    emailRegisterInput.classList.remove("is-valid" , "is-invalid");
    passwordRegisterInput.classList.remove("is-valid" , "is-invalid");
}

function displaySuccess () {
    document.getElementById("successMessage").classList.remove('d-none');
    document.getElementById("errorMessage").classList.add('d-none');
}

function displayError () {
    document.getElementById("errorMessage").classList.remove('d-none');
    document.getElementById("successMessage").classList.add('d-none');
    window.alert(`Name must be the first letter capital and more than 3 letters
email must be in the right form and not already exists
Password must contain at least one of Capital & Special character and more than 8 char`)
}

//Encrypt and Decrypt Passwords
function encryption (password) {
    let newPassword = '';
    for (let i = 0; i < password.length; i++) {
        newPassword += String.fromCharCode(password.charCodeAt(i) + 5);
    }
    console.log('encrypted' + newPassword);
    return newPassword ;
}

function decryption (fakePassword) {
    let realPassword = '';
    for (let i = 0; i < fakePassword.length; i++) {
        realPassword += String.fromCharCode(fakePassword.charCodeAt(i) - 5);
    }
    console.log('decrypted' + realPassword);
    return realPassword ;
}