const API_ADDRESS = "http://localhost/api/operations/";

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}


$(document).ready(function() {

    console.log("ready");

    $('#login-form').submit(function (event) {
        event.preventDefault();
        var loginForm=$(this);

        const formData = {
            "login": $('input[name=login]').val(),
            "password": $('input[name=password]').val()
        };

        formJson = JSON.stringify(formData);
        console.log(formJson);

        $.ajax({
            url: API_ADDRESS + "login.php",
            type: "POST",
            data: formJson,
            contentType: 'application/json',
            dataType    : 'json',
            encode       : true,
            success: function (result) {
                setCookie("jwt", result.jwt, 1);
                $('#response').html("<div class='alert alert-success'>Zalogowano.</div>");
                window.location.href = "weather.html";
            },
            error: function (xhr, resp, text) {
                console.log(text);
                console.log(xhr);

                $('#response').html("<div class='alert alert-danger'>Logowanie zakończone niepowodzeniem</div>");
                loginForm.find('input').val('');
            }
        });

        return false;
    });

    $('#register-form').submit(function (event) {
        event.preventDefault();
        const registerForm = $(this);

        const formData = {
            "login": $('input[name=login-reg]').val(),
            "password": $('input[name=password-reg]').val()
        };

        formJson = JSON.stringify(formData);
        console.log(formJson);

        $.ajax({
            url: API_ADDRESS + "create_user.php",
            type: "POST",
            data: formJson,
            contentType: 'application/json',
            dataType    : 'json',
            encode       : true,
            success: function (result) {
                $('#response-register').html("<div class='alert alert-success'>Udało się zarejestrować. Można się zalogować.</div>");
                registerForm.find('input').val('');
            },
            error: function (xhr, resp, text) {
                $('#response-register').html("<div class='alert alert-danger'>Nie udało się zarejestrować!</div>");
            }
        });

        return false;
    });
});