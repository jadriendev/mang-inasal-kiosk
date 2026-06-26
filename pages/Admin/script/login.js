const authForm = document.getElementById("authForm");
const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("password");


togglePassword.addEventListener("click",()=>{

    if(passwordInput.type === "password"){

        passwordInput.type = "text";
        togglePassword.classList.remove("fa-eye-slash");
        togglePassword.classList.add("fa-eye");

    }else{

        passwordInput.type = "password";
        togglePassword.classList.remove("fa-eye");
        togglePassword.classList.add("fa-eye-slash");

    }

});


authForm.addEventListener("submit",(e)=>{

    e.preventDefault();


    const email = document.getElementById("email").value;
    const password = passwordInput.value;


    const admin = {
        email:"demo@gmail.com",
        password:"demo123"
    };


    if(
        email === admin.email &&
        password === admin.password
    ){

        document.cookie = "adminLogin=true; max-age=86400; path=/";


        window.location.href = "./adminhome.html";


    }else{

        alert("Invalid admin account");

    }


});