<?php
session_start();
$con_file = 'connect.php';
if( file_exists( $con_file ) != TRUE ){
  exit( 'Wystąpił błąd, brak pliku na serwerze' );
}
else{
  require $con_file;
  $id = $_POST[ 'id' ];
  if( $id != 0 ){
    $connect = new mysqli( $host, $user, $password, $db );
    if( $connect->connect_error ){
      exit( 'Wystąpił błąd połączenia z serwerem' );
    }
    else{
      $sql = "SELECT * FROM cards WHERE id = ".$id;
        $result = $connect->query( $sql );
        if( $result->num_rows > 0 ){
            $row = $result->fetch_assoc();
            $effect = '<div class = "card_game" style = "background-image:url(src/img/'.$row[ 'image' ].' )" ><div class = "card_stats" ><div>';
            $effect = $effect.'<p class="stats" > ATK: '.$row[ 'atk' ].'</p><p class="stats" > PEN: '.$row[ 'pen' ].'</p><p class="stats" > DEF: '.$row[ 'def' ].'</p><p class="stats" > THORN: '.$row[ 'thorns' ].'</p><p class="stats" > HP: '.$row[ 'hp' ].'</p>';
            $effect = $effect.'</div></div></div>';
            echo $effect;
      }
      else{
        exit( 'Brak karty' );
      }
      $connect->close();
    }
  }
  else{
    return 0;
  }
}
