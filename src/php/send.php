<?php

require_once '../../vendor/autoload.php';
$settings = require_once 'settings.php';
require_once 'functions.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $phone = $_POST["phone"];
  
    $body = "Имя: $name\nEmail: $email\nТелефон:\n$phone";
    
    var_dump(send_mail($settings['mail_settings_prod'], ['egor43585@bk.ru'], 'Контакты с сайта', $body));

  }
?>

