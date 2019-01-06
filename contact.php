<?php   
$to="samailabalap@gmail.com";
$name=htmlspecialchars($_POST['name']);
$email=htmlspecialchars($_POST['email']);
$message=$name."/n".htmlspecialchars($_POST['message']);
$subject="Contact Form";
if (mail($to, $subject, $message)) {
    header("Location:thankyou.html");    
}
?>