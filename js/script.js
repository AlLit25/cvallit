$(document).ready(function(){
    $('.sl').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        arrows: false,
        autoplaySpeed: 1500
    });
    
    $("#sendbtn").on("click", function(){
        var email = $("#email").val().trim();
        var name = $("#name").val().trim();
        var message = $("#messsage").val().trim();

        //alert(email + name + message);
        if(email == ""){
            $("#errorMessage").text("Введите ваш email");
            return false;
        } else if(name ==""){
            $("#errorMessage").text("Введите ваше имя");
            return false;
        } else if(message.length <= 5){
            $("#errorMessage").text("Ваше сообщение слишком короткое");
            return false;
        }

        $("errorMessage").text("");

        $.ajax({
            url: 'ajax/mail.php',
            type: 'POST',
            cache: false,
            data: { 'email': email, 'name':name, 'message':message },
            dataType: 'html',
            beforeSend: function(){
                $("#sendbtn").prop("disabled", true);
            },
            success: function(data){
                if(!data){
                    alert("Возникли ошибки при отправке сообщения");
                } else{
                    $("#mailForm").trigger("reset");
                }
                $("#sendbtn").prop("disabled", false);
            }
        });

    })
});