<?php
session_start();
?>
<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="utf-8">
  <title>Formularze</title>
  <link rel="stylesheet" href="style.css" type="text/css"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
<?php
if(isset($_SESSION['Error'])){
  echo '<div class="Error">'.$_SESSION['Error'].'</div>';
  unset($_SESSION['Error']);
}
?>
  <form method="POST" action="index.php">
    <h2>rejestracja</h2>
      Login<br/>
    <input type="text" name="Login" placeholder="Login" required/>
      <br/><br/>Hasło<br/>
    <input type="password" name="Password" placeholder="Hasło" required/>
      <br/><br/>Powtórz hasło<br/>
    <input type="password" name="Password_Repeat" placeholder="Powtórz hasło" required/>
      <br/><br/>Podaj Email<br/>
    <input type="email" name="Email" placeholder="Email" required/>
      <br/><br/>Podaj losową liczbę<br/>
    <input type="number" name="Random_Number" placeholder="420"/>
      <br/><br/>
    <label>
      <input type="checkbox" name="Age" required/>Ukończyłem/am 18 rok życia
    </label>
      <br/><br/>
    <button type="submit">prześlij</button>
  </form>

  <form method="GET" action="index.php">
    <h2>Oceń prezentację</h2>
      Twoja opinia<br/>
    <textarea name="Comment" placeholder="Komentarz"></textarea>
      <br/><br/>Wybierz ocenę prezentacji:<br/>
    <input type="radio" name="Choice" value="Good"/>Dobra
    <input type="radio" name="Choice" value="Very good"/>Bardzo dobra
    <input type="radio" name="Choice" value="Wonderful"/>Wybitna
      <br/><br/>Wybierz datę<br/>
    <input type="date" name="Date"/>
      <br/><br/>Wybierz godzinę<br/>
    <input type="time" name="Time"/>
      <br/><br/>Twój ulubiony kolor to: <br/>
    <input type="color" name="Farbe"/>
      <br/><br/>Prześlij jakiś swój plik<br/>
    <input type="file" name="File"/>
      <br/><br/>Twoja strona internetowa<br/>
    <input type="url" name="URL" placeholder="Link do twojej strony"/>
      <br/><br/>
    <input type="reset"/>
    <input type="submit" value="prześlij"/>
  </form>

</body>
</html>
