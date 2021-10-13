<?php
$title = 'Nowa gra';
require 'src/structure/head.php';
?>
<link rel='stylesheet' href='src/styles/form.css'>
<style>
.content{
  display:flex;
  align-items:center;
  justify-content:center;
}
</style>
<head>
<body>
  <main>
    <?php require 'src/structure/nav.php'; ?>
    <section class = 'centered' >
      <div class = 'content' >
        <span class = 'left' >
          <p class = 'centered' >
            Info o grze



            
          </p>
        </span>
        <span class = 'right' >
          <h2 class = "heading" > NOWA GRA </h2>
          <form action = "play.php" method = "post" >
            <h2>Ilość początkowych rund bez walki:</h2>
            <input type = 'number' name = 'prep' value='2' ></br>

            <input type = 'submit' value = 'GRAJ' />
          </form>
        </span>
      </div>
    </section>
    <?php require 'src/structure/footer.php'; ?>
    </main>
  </body>
</html>
