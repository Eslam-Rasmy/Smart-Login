var Name = document.getElementById("Name");
var productEmail = document.getElementById("productEmail");
var productPass = document.getElementById("productPass");
var par = document.getElementById("par");
var btnn = document.getElementById("btnn")
var btn2 = document.getElementById("btn2")
var productCountainer = [];
var productEmail2 = document.getElementById("gma");
var productPass2 = document.getElementById("pac");
var logout = document.getElementById("logout")


if (localStorage.getItem("products") !== null) {
    productCountainer = JSON.parse(localStorage.getItem("products"));
}

btnn?.addEventListener("click", function (e) {
    e.preventDefault();


    if (validateForm(Name) && validateForm(productEmail) && validateForm(productPass)) {


        var storedProducts = JSON.parse(localStorage.getItem("products")) || [];


        var productExists = storedProducts.some(function (product) {
            return product.Name === Name.value || product.productEmail === productEmail.value || product.productPass === productPass.value;
        });

        if (productExists) {
            Swal.fire({
                title: "Name, email or password already exists",
                icon: "warning",
                confirmButtonText: "Try again"
            });
        } else {

            par.classList.replace("d-none", "d-block");
            var product = {
                Name: Name.value,
                productEmail: productEmail.value,
                productPass: productPass.value
            };

            storedProducts.push(product);
            localStorage.setItem("products", JSON.stringify(storedProducts));

            setTimeout(function () {
                window.location.replace("./index.html");
            }, 1500);
        }

    } else {
        Swal.fire({
            title: "Site Name or email is not valid, Please follow the rules below :",
            icon: "question",
            iconHtml: "?",
            confirmButtonText: "Site name must contain at least 3 characters",
            cancelButtonText: "Site email must (gmail.com or yahoo.com)",
            showCancelButton: true,
            showCloseButton: true
        });
    }
});




btn2?.addEventListener("click", function (e) {
    e.preventDefault();
    var storedProducts = JSON.parse(localStorage.getItem("products"));

    if (storedProducts && storedProducts.length > 0) {
        let foundMatch = false;
        let matchedName = "";

        for (let i = 0; i < storedProducts.length; i++) {

            if (storedProducts[i].productEmail === productEmail2.value && storedProducts[i].productPass === productPass2.value) {
                foundMatch = true;
                matchedName = storedProducts[i].Name;
                localStorage.setItem("matchedName", matchedName);
                break;
            }
        }

        if (foundMatch) {
            window.location.replace("./open.html");

        } else {
            Swal.fire({
                title: "email or password is uncorrect",
                icon: "warning",
                confirmButtonText: "Please try again"
            });
        }
    } else {
        Swal.fire({
            title: "email or password is uncorrect",
            icon: "warning",
            confirmButtonText: "Please try again"
        });
    }
});


if (window) {
    window.addEventListener("DOMContentLoaded", function () {
        var matchedName = localStorage.getItem("matchedName");

        if (matchedName) {
            var div = document.getElementById("addd");
            if (div) {
                div.innerHTML = `<h1 class="text-center text-light">Welcome ${matchedName}</h1>`;
            }
        }
    });
}


function validateForm(ele) {
    var regex = {
        Name: /^[A-z]{3,10}( [A-z]{1,10}){0,1}$/,
        productEmail: /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com)$/,
        productPass: /^(?=.*[A-Za-z0-9]).{8,}$/
    }
    if (regex[ele.id].test(ele.value)) {
        ele.nextElementSibling.classList.add("d-block", "fa-check", "text-bg-success");
        ele.nextElementSibling.classList.remove("d-none", "fa-xmark", "text-bg-danger");
        return true;
    }
    else {
        ele.nextElementSibling.classList.add("d-block", "fa-xmark", "text-bg-danger");
        ele.nextElementSibling.classList.remove("d-none", "fa-check", "text-bg-success");
        return false;
    }
}

logout?.addEventListener("click", function (e) {
    e.preventDefault();
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success mx-3",
            cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "You will exit this page!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, log out!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.replace("./index.html");
            swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });
        } else if (
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire({
                title: "Cancelled",
                text: "Your imaginary file is safe :)",
                icon: "error"
            });
        }
    });
})
