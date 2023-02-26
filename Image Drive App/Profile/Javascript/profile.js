// start get session data here
var username = sessionStorage.getItem('username')
if (username == null) {
    window.location = '../index.html'
}

// get data
var navbarBrand = document.querySelector('.navbar-brand')
if (localStorage.getItem(username) != null) {
    var userData = JSON.parse(localStorage.getItem(username))
    navbarBrand.innerHTML = userData.f_name + ' ' + userData.l_name
}

// logout
var logoutBtn = document.querySelector('.logout-btn')
logoutBtn.onclick = function () {
    this.innerHTML = 'Please Wait...'
    setTimeout(function () {
        sessionStorage.removeItem('username')
        window.location = '../index.html'
    }, 2000);
}
// ends get session data here

// start read file coding here
var imgUrl
var imgName
var allImage = []
var uploadInput = document.querySelector('.upload-input')
uploadInput.onchange = function () {
    var fReader = new FileReader()
    fReader.onload = function (e) {
        imgUrl = e.target.result
        imgName = uploadInput.files[0].name
    }
    fReader.readAsDataURL(uploadInput.files[0])
}
// ends read file coding here

// start uplaod coding here
var uploadBtn = document.querySelector('.upload-btn')
uploadBtn.addEventListener('click', () => {
    registerFunc()
    getDataFunc()
})
if (localStorage.getItem(username + '_allImage') != null) {
    allImage = JSON.parse(localStorage.getItem(username + '_allImage'))
}
const registerFunc = () => {
    if (uploadInput.value != '') {
        allImage.push({
            imgUrl: imgUrl,
            imgName: imgName
        })
        localStorage.setItem(username + '_allImage', JSON.stringify(allImage))
        swal("Good Job!", "Uplaoded Successfully 🤗", "success");
    }
    else {
        swal("Empty Field!", "Please choose image 👺!", "warning");
    }
}

var allImageEle = document.querySelector('.all-image-field')
const getDataFunc = () => {
    allImageEle.innerHTML = ''
    allImage.forEach((img, indx) => {
        allImageEle.innerHTML += `<div class="col-md-2 mb-3 text-center" index="${indx}">
        <div class="card p-1">
        <div class="card-header">
        <h5>${img.imgName}</h5>
        </div>
        <div class="card-body">
        <img src="${img.imgUrl}" class="w-75" alt="">
        </div>
        <div class="card-footer d-flex justify-content-between">
        <button class="btn view-btn w-50 mx-1" data-bs-toggle="modal" data-bs-target="#myModal">View</button>
        <button class="btn w-50 del-btn">Delete</button>
        </div>
        </div>
        </div>`
    })
    // ends uplaod coding here

    // start delete coding here
    var allDelBtn = document.querySelectorAll('.del-btn')
    var i
    for (i = 0; i < allDelBtn.length; i++) {
        allDelBtn[i].onclick = function () {
            var parent = this.parentElement.parentElement.parentElement
            var index = parent.getAttribute('index')
            parent.remove()
            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this imaginary file!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        allImage.splice(index, 1)
                        localStorage.setItem(username + '_allImage', JSON.stringify(allImage))
                        parent.remove()
                        swal("Poof! Your imaginary file has been deleted!", {
                            icon: "success",
                        });
                    } else {
                        swal("Your imaginary file is safe!");
                    }
                });
        }
    }
    // ends delete coding here

    // start view coding here
    var allViewBtn = document.querySelectorAll('.view-btn')
    var imgBox = document.querySelector('.img-box')
    var modalTitle = document.querySelector('.modal-title')
    for (i = 0; i < allViewBtn.length; i++) {
        allViewBtn[i].onclick = function () {
            var parent = this.parentElement.parentElement
            var imgName = parent.querySelector('h5').innerHTML
            var src = parent.querySelector('img').src
            modalTitle.innerHTML = imgName
            imgBox.src = src
        }
    }
    // ends view coding here
}
getDataFunc()