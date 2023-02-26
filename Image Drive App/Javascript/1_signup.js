// For ragistration form
var signupForm = document.querySelector('.signup-form')
var allSignupInput = signupForm.querySelectorAll('input')
signupForm.onsubmit = function (e) {
    e.preventDefault()
    registerFunc()
}
const registerFunc = () => {
    if (localStorage.getItem(allSignupInput[2].value) == null) {
        var userData = {
            f_name: allSignupInput[0].value,
            l_name: allSignupInput[1].value,
            user_name: allSignupInput[2].value,
            password: allSignupInput[3].value,
            mobile: allSignupInput[4].value,
        }
        localStorage.setItem(allSignupInput[2].value, JSON.stringify(userData))
        swal("Good job!", "Register has been done", "success");
        signupForm.reset('')
    }
    else {
        swal("Already Exist!", "Please change the data", "warning");
    }
}
// For ragistration form