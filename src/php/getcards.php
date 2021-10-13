<?php
function getCardInfo( $id ){
  $_SESSION[ 'deckA'.$id ] = rand(1,7);
  $_SESSION[ 'deckB'.$id ] = rand(1,7);
  $con_file = 'src/php/connect.php';
  $dbidA = $_SESSION[ 'deckA'.$id ];
  $dbidB = $_SESSION[ 'deckB'.$id ];
  if( file_exists( $con_file ) != TRUE ){
    exit( 'Wystąpił błąd, brak pliku na serwerze' );
  }
  else{
    require $con_file;
    $connect = new mysqli( $host, $user, $password, $db );
    if( $connect->connect_error ){
      exit( 'Wystąpił błąd połączenia z serwerem' );
    }
    else{
      $sql = "SELECT * FROM cards WHERE id = ".$dbidA;
      $result = $connect->query( $sql );
      if( $result->num_rows > 0 ){
          $row = $result->fetch_assoc();
          $_SESSION[ 'actual_image' ] = $row[ 'image' ];
          echo '<div><p class = "stats" >ATK: '.$row[ 'atk' ].'</p><p class = "stats" > PEN: '.$row[ 'pen' ].'</p><p class = "stats" > DEF: '.$row[ 'def' ].'</p><p class = "stats" > THORN: '.$row[ 'thorns' ].'</p><p class = "stats" > HP: '.$row[ 'hp' ].'</p></div>';
          echo '<script>game.deckP1.push( card'.$_SESSION[ 'i' ].' = new Card('.$_SESSION[ "deckA".$id ].', '.$row[ 'atk' ].', '.$row[ 'pen' ].', '.$row[ 'def' ].', '.$row[ 'thorns' ].', '.$row[ 'hp' ].' ));';
          $_SESSION[ 'i' ] = $_SESSION[ 'i' ] + 1;
      }
      else{
        exit( 'Błąd danych w bazie' );
      }
      $sql = "SELECT * FROM cards WHERE id = ".$dbidB;
      $result = $connect->query( $sql );
      if( $result->num_rows > 0 ){
        $row = $result->fetch_assoc();
        echo 'game.deckP2.push( card'.$_SESSION[ 'i' ].' = new Card('.$_SESSION[ "deckB".$id ].', '.$row[ 'atk' ].', '.$row[ 'pen' ].', '.$row[ 'def' ].', '.$row[ 'thorns' ].', '.$row[ 'hp' ].' ));</script>';
        $_SESSION[ 'i' ] = $_SESSION[ 'i' ] + 1;
      }
      else{
        exit( 'Błąd danych w bazie' );
      }
      $connect->close();
    }
  }
}
?>
