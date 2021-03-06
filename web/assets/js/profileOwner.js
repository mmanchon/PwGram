/**
 * Created by Xps_Sam on 19/04/2017.
 */

var $image = $('.img-container > img');
var loaded =   false;
var user_info;
$(function() {
    $('#btnEditProfile').show();
    $('#gallery_pop').show();
    $('#containerInfoUser').hide();


    var imgloaded = $('.loaded');
    imgloaded.hide();
    var imgnoloaded = $('.noloaded');
    imgnoloaded.show();
});

function showEditProfileForm(){
    $('#editProfile').fadeIn('fast')
        $('.modal-title').html('Editar Perfil');

    $('.error').removeClass('alert alert-danger').html('');
}

function openEditProfileModal(){
    showEditProfileForm();
    setTimeout(function(){
        $('#editProfile').modal('show');
    }, 230);

}

$('#update_info').click(function (e) {
    e.preventDefault();

    if(validaUsername($('#inputNombreUsuario').val())&&validateDate($('#inputDateUsuario').val())&&validatePasswordRegistration($('#inputPassword').val(),$('#inputConfirmPass').val())){
       
        var reg = {};

        reg.pass = $('#inputPassword').val();
        reg.date = $('#inputDateUsuario').val();
        reg.confirm_pass = $('#inputConfirmPass').val();
        reg.username = $('#inputNombreUsuario').val();
        reg.img = $('#newImage').attr('src');
        reg.id = $('#userName').attr('data-content');
        reg.imgData = $image.cropper('getData');
        var stringData = JSON.stringify(reg);
        $.ajax({
            type: 'post',
            url: '/update',
            data: {myData:stringData},
            success: function ($response) {
                //Determinar resposta server
                status_modal($response);
                //Evitar que es fasci shake quan es registra.
                if($response!=1)shakeModalRegistration();
            }
        });
    }else{
        status_modal(''+status+'');
        shakeModalRegistration();
    }
});

function validaUsername(v1){
    var usernameRegex = /^[a-zA-Z0-9]+([-_\.][a-zA-Z0-9]+)*[a-zA-Z0-9]$/;
    //if(!validaEmail(v1)) {

    if (usernameRegex.test(v1) && v1.length <= 20) {
        return true;
    } else {
        status = 4;
        return false;
    }
    //}

}

function validateDate(dateString){
    var regEx = /(\d{4})[-\/](\d{2})[-\/](\d{2})/;
    var n = new Date();
    var year = n.getFullYear();
    var array_date = dateString.split("/");

    if(regEx.test(dateString) && array_date[0] <= year && array_date[1] <= 12 && array_date[2] <= daysInMonth(array_date[1],array_date[0])){
        return true;
    }else{
        status=5;
        return false;
    }
}

function daysInMonth(month,year){
    return new Date(year,month,0).getDate();
}

function validatePasswordRegistration($v1,$v2){
    if(!$v1 && !$v2)return true;
    if($v1!=$v2){
        status=6;
        return false;
    }
    if ($v1.length < 6) {
        status=7;

        return false;
    }
    if ($v1.search(/[a-z]/i) < 0) {
        status=7;

        return false;
    }
    if ($v1.search(/[A-Z]/i) < 0) {
        status=7;

        return false;
    }

    if ($v1.search(/[0-9]/) < 0) {
        status=7;

        return false;
    }
    return true;
}
/*
 Funcio que ens permetra tenir un codi d'errors igual per el client com per el servidor.
 */
function status_modal( $response){
    console.log('ERROR--> '+$response);
    switch($response){
        case '1':
            swal({
                title: "Actualizado",
                type: "success",
                timer:2000,
                showConfirmButton: false
            });
            window.location = '../profile/'+ $('#inputNombreUsuario').val()+'?eraseCache=true';
            break;
        case '2':
            $('.error').addClass('alert alert-danger').html("No se ha podido actualizar tu perfil");
            break;
        case '3':
            $('.error').addClass('alert alert-danger').html("Formato de email incorrecto");
            break;
        case '4':
            $('.error').addClass('alert alert-danger').html("Formato del nombre de usuario");
            break;
        case '5':
            $('.error').addClass('alert alert-danger').html("Formato de fecha incorrecto");
            break;
        case '6':
            $('.error').addClass('alert alert-danger').html("Los password no son iguales");
            break;
        case '7':
            $('.error').addClass('alert alert-danger').html("Formato de password incorrecto");
            break;
        case '8':
            $('.error').addClass('alert alert-danger').html("Imagen no subida");
            break;

        case '10':
            swal({
                title: "Logged",
                type: "success",
                timer:2000,
                showConfirmButton: false
            });

            $('#login_home').hide();
            $('#close_modal').click();

            $('.main_profile').css('display','block');
            $('#img_profile').attr('src',user_logged.img_path);
            $('h3').html(user_logged.username);
            localStorage.setItem('user', JSON.stringify(user_logged));
            break;
        case'11':
            $('.error').addClass('alert alert-danger').html("Email o contrasena incorrecta");
            break;
        case'12':
            $('.error').addClass('alert alert-danger').html("Username o contrasena incorrecta");
        default:
            $('.error').addClass('alert alert-danger').html("Error desconocido");
    }
}

/*
 Funció encarregada de llegir la url introduida per l'usuari i carregar la foto de perfil seleccionada
 */
function readURL(input) {

    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.readAsDataURL(input.files[0]);
        reader.onload = function (e) {
            $('#perfil_reg').attr('src', e.target.result);
            /*
             Enviamos la imagen desde el cliente al servidor con un nombre provisional y solo cambiaremos el nombre
             al registrar al usuario.
             */
            $.ajax({
                type: 'POST',
                url: '/upload',
                data: {myData:$('#perfil_reg').attr('src')},
                success: function ($response) {
                    console.log('**'+$response);
                }
            });
        }

    }
}
/*
 Funció que espera a que el usuari realitzi algun canvi en el input per poder cridar a la funció encarregada
 de realitzar el canvi de la imatge de defecte per la seleccionada.
 */
$("#btnSelectImage").change(function(){
    readURL(this);
    img_path=1;
});

$('#btnEditProfile').on('click',function (e) {
    e.preventDefault();
    openEditProfileModal();
    $('#containerInfoUser').show();
});

$('#backToProfile').on('click',function (e) {
    e.preventDefault();
    window.location.reload();
});

$('#btnEditImage').on('click',function (e) {
    e.preventDefault();
    $('#imgProfile').trigger('click');
});

$("#imgProfile").change(function(){
    if (this.files && this.files[0]) {
        var reader = new FileReader();
        reader.readAsDataURL(this.files[0]);
        reader.onload = function (e) {
            $('#idImgBtn').attr('src', e.target.result);
            img_path = 1;
        }
    }
});