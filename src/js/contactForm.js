$(document).ready(function() {
    $("#contact-form").submit(function(e) {
        e.preventDefault();

        let formData = $(this).serialize();

        var email = $("#email").val();
        var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        if (!emailPattern.test(email)) {
            alert("Пожалуйста, введите корректный email-адрес.");
            return;
        }

        $.ajax({
            type: "POST",
            url: "php/send.php",
            data: formData,
            success: function(response) {
                $(".modal").addClass("hide");
                alert("Контакты успешно отправлены!");
            },
            error: function(response) {
                $(".modal").addClass("hide");
                alert("Произошла ошибка при отправке данных.");
                console.log(response);
            }
        });
    });
});