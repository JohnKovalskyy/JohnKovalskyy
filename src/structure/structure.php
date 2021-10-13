<?php
function renderBoard( $num ){//render pustej planszy, bez kart
  if( $num == 1 ){
    $t = 'A';
  }
  else if( $num == 2 ){
    $t = 'B';
  }
  $_SESSION[ 'board'.$t.'sd' ] = 0;
  $_SESSION[ 'board'.$t.'so' ] = 0;
  $_SESSION[ 'board'.$t.'def1' ] = 0;
  $_SESSION[ 'board'.$t.'def2' ] = 0;
  $_SESSION[ 'board'.$t.'off1' ] = 0;
  $_SESSION[ 'board'.$t.'off2' ] = 0;
  $_SESSION[ 'board'.$t.'core' ] = 0;
  $cardPlacingDelay = 100;
  $onclick = 'onclick = "var s = this; setTimeout( function() { game.changeCards( s.id ) }, '.$cardPlacingDelay.' )"';
  echo '<div class = "board" id = "b'.$num.'" ><div class = "superdef" id = "sd_'.$num.'" '.$onclick.' >';
  blankCard();
  echo '</div><div class = "def1" id = "def1_'.$num.'" '.$onclick.' >';
  blankCard();
  echo '</div><div class = "def2" id = "def2_'.$num.'" '.$onclick.' >';
  blankCard();
  echo '</div><div class = "core" id = "core_'.$num.'" '.$onclick.' >';
  blankCard();
  echo '</div><div class = "off1" id = "off1_'.$num.'" '.$onclick.' >';
  blankCard();
  echo '</div><div class = "off2" id = "off2_'.$num.'" '.$onclick.' >';
  blankCard();
  echo '</div><div class = "superoff" id = "so_'.$num.'" '.$onclick.' >';
  blankCard();
  echo '</div></div>';
}

function renderDeck(){//render 10 losowych kart w decku
  for( $i = 1; $i <= 10; $i++ ){
    echo '<div id = "deck'.$i.'" onclick = "game.onCardClick( this.id )" >';
    renderCard( $i );
    echo '</div>';
  }
}

function blankCard(){//pusta karta dla board na początku
  echo '<div class = "card_game" style = "background-image:url(src/img/default.png)" ><div class="card_stats"><div><p></p><p></p><p></p><p></p><p></p></div></div></div>';
}

function renderCard($id){//karty do decków graczy
  echo '<div class = "card_game" style = "background-image:url(src/img/default.png)" ><div class = "card_stats" >';
  getCardInfo($id);//default - deck pierwszego gracza
  echo '<script>document.getElementById( "deck'.$id.'" ).children[0].style.backgroundImage = "url(src/img/'.$_SESSION[ 'actual_image' ].' )";</script></div></div>';
}

function printSession(){//funkcja tymczasowa
  foreach($_SESSION as $key => $value){
echo<<<EOL
$key = $value

EOL;
  }
}
?>
