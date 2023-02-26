// for login form
var loginForm = document.querySelector('.login-form')
var allLoginInput = loginForm.querySelectorAll('input')
loginForm.onsubmit = function (e) {
    e.preventDefault()
    loginFunc()
}

const loginFunc = () => {
    if (localStorage.getItem(allLoginInput[0].value) != null) {
        var data = JSON.parse(localStorage.getItem(allLoginInput[0].value))
        if (allLoginInput[1].value == data.password) {
            sessionStorage.setItem('username', allLoginInput[0].value)
            window.location = 'Profile/profile.html'
        }
        else {
            swal("Password does't match!", "Please check your password or username", "warning");
        }
    }
    else {
        swal("User Name does't match!", "Please registeration do first", "warning");
    }
}
// for login form