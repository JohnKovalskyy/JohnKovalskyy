<?php
$con_file = 'src/php/connect.php';
if(file_exists( $con_file ) != TRUE){
  exit( 'Wystąpił błąd, brak pliku na serwerze' );
}
else{
  require $con_file;
  $connect = new mysqli($host, $user, $password, $db);
  if( $connect->connect_error ){
    exit( 'Wystąpił błąd połączenia z serwerem' );
  }
  else{
    $sql = 'SELECT * FROM cards';
    $result = $connect->query( $sql );
    if( $result->num_rows > 0 ){
      $cards = '';
      while( $row = $result->fetch_assoc() ){
        $cards = $cards.'<div class = "card_block" ><img style = "width:100%; height:40%;" src = "src/img/';
        $cards = $cards.$row[ 'image' ].'"/><b>Atak:</b> '.$row[ 'atk' ].'</br><b>Destrukcja:</b> ';
        $cards = $cards.$row[ 'pen' ].'</br><b>Obrona:</b> '.$row[ 'def' ].'</br><b>Kolce:</b> ';
        $cards = $cards.$row[ 'thorns' ].'</br><b>Zdrowie:</b> '.$row[ 'hp' ].'</div>';
      }
    }
    else{
      exit( 'Błąd danych w bazie' );
    }
    $connect->close();
  }
}
$title = 'Przegląd kart';
require 'src/structure/head.php';
?>
<link rel = 'stylesheet' href = 'src/styles/card.css' >
</head>
<body>
    <main>
      <?php require 'src/structure/nav.php'; ?>
      <section class = 'centered' >
        <div class = 'content' >
          <h1 class = "heading" > Oto spis dostępnych kart </h1>
          <?php echo $cards; ?>
        </div>
      </section>
      <?php require 'src/structure/footer.php' ?>
    </main>
  </body>
</html>
