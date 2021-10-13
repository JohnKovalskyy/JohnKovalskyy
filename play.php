<?php
session_start();
if(isset($_POST['prep'])){
  $prep = (int)$_POST['prep'];
}
else{
  header('Location: index.php');
}
$_SESSION[ 'i' ] = 0;//używane do tworzenia obiektów Card, numer seryjny
$title = 'Strona - gra';//tytuł strony
?>
<script src = 'src/script/game.js' ></script>
<?php
require 'src/structure/head.php';
require 'src/php/getcards.php';
require 'src/structure/structure.php';
echo '<script>var game = new Game('.$prep.');</script>';
?>
  <link rel = 'stylesheet' href = 'src/styles/game.css' >
</head>
<body>
    <main>
      <?php require 'src/structure/nav.php'; ?>
      <section class = 'centered' >
        <div class = 'content' >
          <header id = 'player' ><h1 class = "centered" >Gracz 1</h1><div class = "centered"><button id = "skip" onclick="game.nextRound()">Pomiń swoją turę</button></div></header>
          <?php
            renderBoard(1);
            renderBoard(2);
          ?>
          <div class = 'deck' style='clear:both;' >
            <?php renderDeck(); ?>
          </div>
        </div>
      </section>
      <?php require 'src/structure/footer.php'; ?>
    </main>
  </body>
</html>
