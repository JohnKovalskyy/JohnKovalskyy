<?php
session_start();
if(isset($_POST['Login'])){
  $Validate=true;
  $Login=$_POST['Login'];
  $Password=$_POST['Password'];
  $Password2=$_POST['Password_Repeat'];
  $Email=$_POST['Email'];
  $Number=$_POST['Random_Number'];
  if(!isset($_POST['Age'])){
    $Validate=false;
    $_SESSION['Error']="Nie ukończyłeś 18 roku życia!";
  }
  if(filter_var($Email, FILTER_VALIDATE_EMAIL)){
    $Validate=false;
    $_SESSION['Error']="Wystąpił błąd w podanym przez ciebie adresie email";
  }
  if($Password!=$Password2){
    $Validate=false;
    $_SESSION['Error']="Podane hasła nie są jednakowe!";
  }
  if((htmlentities($Login)!=$Login)||
  (htmlentities($Password)!=$Password)||
  (htmlentities($Email)!=$Email)){
    $Validate=false;
    $_SESSION['Error']="W loginie, haśle lub adresie email znajdują się nieprawidłowe znaki!";
  }
  if($Validate==true){
    echo '<p>Twój login to: '.$Login.'</p><br/>';
    echo '<p>Twoje hasło to: ';
    for($i=1;$i<=strlen($Password);$i++)
      echo '*';
    echo '</p><br/>';
    echo '<p>Twój email to: '.$Email.'</p><br/>';
    echo '<p>Liczba wylosowana to '.$Number.'</p><br/>';
  }
  else{
    header('Location:form.php');
  }
}
elseif(isset($_GET['Choice'])){
  $Comment=htmlentities($_GET['Comment']);
  $Choice=$_GET['Choice'];
  $Data=$_GET['Date'];
  $Godzina=$_GET['Time'];
  $Kolor=$_GET['Farbe'];
  $FileName=$_GET['File'];
  $Website=$_GET['URL'];
  if($Comment=="")$Comment="Bardzo ciekawy komentarz";
  if($Data=="")$Data="Dziś";
  if($Godzina=="")$Godzina="Przed chwilą";
  if($FileName=="")$FileName="PLIK";
  if($Website=="")$Website="http://chrost.pl/pobierz/j.pretki";
    echo '<p>Twoja opinia ('.$Comment.') bardzo mnie ciekawi</p><br/>';
    echo '<p>Dziękuję za ocenę typu '.$Choice.'</p><br/>';
    echo '<p>Podana data: '.$Data.' oraz podana godzina: '.$Godzina.' nie będą potrzebne</p><br/>';
    echo '<p>Ciekawe  czy da się zrobić aby tło dokumentu zmieniało się na '.$Kolor.'</p><br/>';
    echo '<p>Prawdopodobnie nie będę miał czasu odwiedzić twojej strony '.$Website.'</p><br/>';
    echo '<p>A oto nazwa pliku który przesłałeś: '.$FileName.'</p><br/>';
}
else{
  $_SESSION['Error']="Formularz nie został poprawnie wypełniony!";
  header('Location:form.php');
}
?>
<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="utf-8">
  <title>Wynik</title>
  <link rel="stylesheet" href="style.css" type="text/css"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
  <a href="form.php">Powrót do formularzy</a>
</body>
</html>
