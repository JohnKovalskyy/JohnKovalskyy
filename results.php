<?php
if( !isset($_GET['winner']) || ! ($_GET['rounds']) ){
  header('Location: index.php');
}
$winner = $_GET['winner'];
$rounds = $_GET['rounds'];
$title = 'Wyniki rozgrywki';
require 'src/structure/head.php';
?>
<style>
  .content{
    display:flex;
    align-items:center;
    justify-content:center;
  }
</style>
</head>
<body>
    <main>
      <?php require 'src/structure/nav.php'; ?>
      <section class = 'centered' >
        <div class = 'content' >
          <span class = "box">
            <?php
            echo '</br>Wynik rozgrywki: '.$winner.'</br>';
            echo 'Ilość rozegranych rund: '.$rounds;
            ?>
            <button class = 'button' onclick = 'window.location = "index.php" '> Powrót, nowa gra </button>
          </span>
        </div>
      </section>
      <?php require 'src/structure/footer.php'; ?>
    </main>
  </body>
</html>
