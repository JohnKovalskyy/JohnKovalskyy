class Card{
  constructor( id, att, pen, def, tho, hp ){
    this.databaseId = id;
    this.attack = att;
    this.penetration = pen;
    this.defense = def;
    this.thorns = tho;
    this.hp = hp;
  }
  attackEnemy( enemy ){
    let a = enemy.reduceHP( enemy.calcdmg( this.attack,this.penetration ) );
    let b = this.reflect( enemy.thorns );
    if( ( a == 1 ) && ( b == 1 ) ){
      return 3;
    }
    else if( a == 1 ){
      return 1;
    }
    else if( b == 1 ){
      return 2;
    }
  }
  calcdmg( enemyAttack, enemyPenetration ){
    let dmg;
    if( this.defense > enemyPenetration ){
      dmg = enemyAttack - ( this.defense - enemyPenetration );
    }
    else{
      dmg = enemyAttack;
    }
    if( dmg < 0 ){
      dmg = 0;
    }
    return dmg;
  }
  reflect( enemyThorns ){
    return this.reduceHP( enemyThorns );
  }
  reduceHP( value ){
    this.hp = this.hp - value;
    if( this.hp <= 0 ){
      this.hp = 0;
      return this.faint();
    }
    else{ return 0; }
  }
  faint(){
    return 1;
  }
}

class Game{
  constructor( firstRounds ){
    if( firstRounds < 2 ){
        this.preparationRounds = 2;
    }
    else{
      this.preparationRounds = firstRounds;
    }
    this.active_card = 0;
    this.deckP1 = [];
    this.deckP2 = [];
    this.boardP1 = {
      "sd" : 0, "def1" : 0, "def2" : 0, "core" : 0, "off1" : 0, "off2" : 0, "so" : 0
    };
    this.boardP2 = {
      "sd" : 0, "def1" : 0, "def2" : 0, "core" : 0, "off1" : 0, "off2" : 0, "so" : 0
    };
    this.currentPlayer = 1;
    this.roundCount = 1;
    this.winner = '';
  }

  changeCards( htmlIdBoard ){
    if( ( this.active_card != 0 ) && ( htmlIdBoard.slice( -1 ) == this.currentPlayer ) ){
      //jeśli jakaś karta jest aktywna i wybrano kartę board aktywnego gracza
      let htmlIdDeck = this.active_card;//karta w decku/talii
      let localBoardId = htmlIdBoard.slice( 0, -2 );

      if( ( localBoardId != 'core' && this.roundCount > 2) || ( this.roundCount <= 2 && localBoardId == 'core' ) ){
        let localDeckId = htmlIdDeck.slice( -1 );
        if( localDeckId == 0 ){//jeśli deck10, tymczasowe
          localDeckId = htmlIdDeck.slice( -2 );
        }
        animate( htmlIdBoard, 1 );
        this.swapStats( htmlIdBoard, htmlIdDeck );
        this.swapImages( htmlIdBoard, htmlIdDeck );

        this.swapLocalIds( localBoardId, localDeckId - 1 );
        this.deactivateCard();//wyłącz aktywną kartę decku
        this.nextRound();
      }
    }
  }

  autoAttack(){//dodać atakowanie superoff
    let player = this.currentPlayer;
    let chance, atk, obr, obrIndex;

    if(this.boardP1['off1'] instanceof Card){
      chance = ranChance();
      atk = 'off1';
      if( chance != 4 && this.boardP2['def1'] instanceof Card){
        obr = 'def1';
      }
      else if(this.boardP2['sd'] instanceof Card){
        obr = 'sd';
      }
      else if(this.boardP2['core'] instanceof Card){
        obr = 'core';
      }
      else{ return 0; }
      this.attack(atk, obr, 1)
    }
    if(this.boardP1['off2'] instanceof Card){
      chance = ranChance();
      atk = 'off2';
      if( chance != 4 && this.boardP2['def2'] instanceof Card){
        obr = 'def2';
      }
      else if(this.boardP2['sd'] instanceof Card){
        obr = 'sd';
      }
      else if(this.boardP2['core'] instanceof Card){
        obr = 'core';
      }
      else{ return 0; }
      this.attack(atk, obr, 1)
    }
    if(this.boardP2['off1'] instanceof Card){
      chance = ranChance();
      atk = 'off1';
      if( chance != 4 && this.boardP1['def1'] instanceof Card){
        obr = 'def1';
      }
      else if(this.boardP1['sd'] instanceof Card){
        obr = 'sd';
      }
      else if(this.boardP1['core'] instanceof Card){
        obr = 'core';
      }
      else{ return 0; }
      this.attack(atk, obr, 2)
    }
    if(this.boardP2['off2'] instanceof Card){
      chance = ranChance();
      atk = 'off2';
      if( chance != 4 && this.boardP1['def2'] instanceof Card){
        obr = 'def2';
      }
      else if(this.boardP1['sd'] instanceof Card){
        obr = 'sd';
      }
      else if(this.boardP1['core'] instanceof Card){
        obr = 'core';
      }
      else{ return 0; }
      this.attack(atk, obr, 2)
    }
    if(this.boardP1['so'] instanceof Card){
      chance = ranChance();
      atk = 'so';
      if( chance != 4 && this.boardP2['sd'] instanceof Card){
        obr = 'sd';
      }
      else if(this.boardP2['core'] instanceof Card){
        obr = 'core';
      }
      else{ return 0; }
      this.attack(atk, obr, 1)
    }
    if(this.boardP2['so'] instanceof Card){
      chance = ranChance();
      atk = 'so';
      if( chance != 4 && this.boardP1['sd'] instanceof Card){
        obr = 'sd';
      }
      else if(this.boardP1['core'] instanceof Card){
        obr = 'core';
      }
      else{ return 0; }
      this.attack(atk, obr, 2)
    }
  }

  attack(atkId, obrId, player){// atak kart ofensywej na kartę defensywną player - gracz atakujący
      let attackResult
      let playerB
      let atkHTMLId = atkId + "_" + player
      if(player == 1){
        playerB = 2
        let obrHTMLId = obrId + "_" + playerB
        attackResult = this.boardP1[atkId].attackEnemy(this.boardP2[obrId])
        animate(atkHTMLId,2)
        document.getElementById(atkHTMLId).children[0].children[0].children[0].children[4].innerHTML = "<b> HP: " + this.boardP1[atkId].hp + '</b>';
        document.getElementById(obrHTMLId).children[0].children[0].children[0].children[4].innerHTML = "<b> HP: " + this.boardP2[obrId].hp + '</b>';
      }
      else if(player == 2){
        playerB = 1
        let obrHTMLId = obrId + "_" + playerB
        attackResult = this.boardP2[atkId].attackEnemy(this.boardP1[obrId])
        animate(atkHTMLId,2)
        document.getElementById(atkHTMLId).children[0].children[0].children[0].children[4].innerHTML = "<b> HP: " + this.boardP2[atkId].hp + '</b>';
        document.getElementById(obrHTMLId).children[0].children[0].children[0].children[4].innerHTML = "<b> HP: " + this.boardP1[obrId].hp + '</b>';
      }
      //zmiana hp na karcie/statystyki

      if(attackResult == 1){
        if(player == 1){
          this.boardP2[obrId] = 0;
        }
        else if(player == 2){
          this.boardP1[obrId] = 0;
        }
        animate(obrId + "_" + playerB,4)
        this.removeFromBoard(obrId + "_" + playerB)
      }
      else if(attackResult == 2){
        if(player == 1){
          this.boardP1[atkId] = 0;
        }
        else if(player == 2){
          this.boardP2[atkId] = 0;
        }
        animate(atkId + "_" + player,4)
        this.removeFromBoard(atkId + "_" + player)
      }
      else if(attackResult == 3){
        if(player == 1){
          this.boardP1[atkId] = 0;
          this.boardP2[obrId] = 0;
        }
        else if(player == 2){
          this.boardP2[atkId] = 0;
          this.boardP1[obrId] = 0;
        }
        animate(obrId + "_" + playerB,4)
        animate(atkId + "_" + player,4)
        this.removeFromBoard(obrId + "_" + playerB)
        this.removeFromBoard(atkId + "_" + player)
      }
      else{
        animate(obrId + "_" + playerB,3)
      }
  }

  removeFromBoard( htmlId ){
    let element = document.getElementById( htmlId )
    element.children[0].style.backgroundImage = 'url("src/img/default.png")';
    element.children[0].children[0].innerHTML = '<div><p></p><p></p><p></p><p></p><p></p></div>';
  }

  buffStats(stats,pos){
    let atk = Number( stats.children[0].innerHTML.trim().slice(4) )//atk
    let pen = Number( stats.children[1].innerHTML.trim().slice(4) )//pen
    let def = Number( stats.children[2].innerHTML.trim().slice(4) )//def
    let thorns = Number( stats.children[3].innerHTML.trim().slice(6) )//thorns
    let hp = Number( stats.children[4].innerHTML.trim().slice(3) )//hp
    let structAtk = ' ATK: ' + atk;
    let structPen = ' PEN: ' + pen;
    let structDef = ' DEF: ' + def;
    let structThorns = ' THORN: ' + thorns;
    let structHp = ' HP: ' + hp;
    switch(pos){
      case 'core':
        hp = hp * 5;
        structHp = '<b> HP: ' + hp + '</b>';
      break;
      case 'off1':
      case 'off2':
        atk = atk * 2;
        pen = pen * 2;
        structAtk = '<b> ATK: ' + atk + '</b>';
        structPen = '<b> PEN: ' + pen + '</b>';
      break;
      case 'def1':
      case 'def2':
        def = def * 2;
        hp = hp * 2;
        structDef = '<b> DEF: ' + def + '</b>';
        structHp = '<b> HP: ' + hp + '</b>';
      break;
      case 'so':
        atk = atk * 3;
        pen = pen * 3;
        structAtk = '<b> ATK: ' + atk + '</b>';
        structPen = '<b> PEN: ' + pen + '</b>';
      break;
      case 'sd':
        def = def * 3;
        thorns = thorns * 3;
        structDef = '<b> DEF: ' + def + '</b>';
        structThorns = '<b> THORN: ' + thorns + '</b>';
      break;
    }

    if( this.currentPlayer == 1 && this.deckP1[ this.active_card.slice( -1 ) - 1 ] instanceof Card){
      let obj = this.deckP1[ this.active_card.slice( -1 ) - 1 ];
      obj.attack = atk;
      obj.penetration = pen;
      obj.defense = def;
      obj.thorns = thorns;
      obj.hp = hp;
    }
    else if( this.currentPlayer == 2 && this.deckP2[ this.active_card.slice( -1 ) - 1 ] instanceof Card){
      let obj = this.deckP2[ this.active_card.slice( -1 ) - 1 ];
      obj.attack = atk;
      obj.penetration = pen;
      obj.defense = def;
      obj.thorns = thorns;
      obj.hp = hp;
    }

    let structure = '<div><p class="stats" >' + structAtk + '</p><p class="stats" >'
    + structPen + '</p><p class="stats" >' + structDef + '</p><p class="stats" >' +
    structThorns + '</p><p class="stats" >' + structHp + '</div>';
    return structure;
  }

  debuffStats( stats, pos ){
    let atk = Number( stats.children[0].innerHTML.trim().slice(4) )//atk
    let pen = Number( stats.children[1].innerHTML.trim().slice(4) )//pen
    let def = Number( stats.children[2].innerHTML.trim().slice(4) )//def
    let thorns = Number( stats.children[3].innerHTML.trim().slice(6) )//thorns
    let hp = Number( stats.children[4].innerHTML.trim().slice(3) )//hp
    let structAtk = ' ATK: ' + atk;
    let structPen = ' PEN: ' + pen;
    let structDef = ' DEF: ' + def;
    let structThorns = ' THORN: ' + thorns;
    let structHp = ' HP: ' + hp;
    switch( pos ){
      case 'core':
        hp = parseInt( hp / 5 );
        structHp = '<b> HP: ' + hp + '</b>';
      break;
      case 'off1':
      case 'off2':
        atk = parseInt( atk / 2 );
        pen = parseInt( pen / 3 );
        structAtk = '<b> ATK: ' + atk + '</b>';
        structPen = '<b> PEN: ' + pen + '</b>';
      break;
      case 'def1':
      case 'def2':
        def = parseInt( def / 2 );
        hp = parseInt( hp / 2 );
        structDef = '<b> DEF: ' + def + '</b>';
        structHp = '<b> HP: ' + hp + '</b>';
      break;
      case 'so':
        atk = parseInt( atk / 3 );
        pen = parseInt( pen / 4 );
        structAtk = '<b> ATK: ' + atk + '</b>';
        structPen = '<b> PEN: ' + pen + '</b>';
      break;
      case 'sd':
        def = parseInt( def / 3 );
        thorns = parseInt( thorns / 3 );
        structDef = '<b> DEF: ' + def + '</b>';
        structThorns = '<b> THORN: ' + thorns + '</b>';
      break;
    }

    if(this.currentPlayer == 1 && this.boardP1[pos] instanceof Card){
      let obj = this.deckP1[this.active_card.slice(-1)-1]
      obj.attack = atk;
      obj.penetration = pen;
      obj.defense = def;
      obj.thorns = thorns;
      obj.hp = hp;
    }
    else if(this.currentPlayer == 2 && this.boardP2[pos] instanceof Card ){
      let obj = this.deckP2[this.active_card.slice(-1)-1]
      obj.attack = atk;
      obj.penetration = pen;
      obj.defense = def;
      obj.thorns = thorns;
      obj.hp = hp;
    }

    let structure = '<div><p class="stats" >' + structAtk + '</p><p class="stats" >'
    + structPen + '</p><p class="stats" >' + structDef + '</p><p class="stats" >' +
    structThorns + '</p><p class="stats" >' + structHp + '</div>';
    return structure;
  }

  swapImages( htmlId1, htmlId2 ){//zamiana obrazów kart
    let element1 = document.getElementById( htmlId1 ).children[0];//elementy przechowujące
    let element2 = document.getElementById( htmlId2 ).children[0];//obraz karty
    //element 1 - board, element 2 - deck
    let help = element1.style.backgroundImage;
    element1.style.backgroundImage = element2.style.backgroundImage;
    element2.style.backgroundImage = help;
    if( help == 'url("src/img/default.png")' ){
      document.getElementById( htmlId2 ).style.display = 'none';
    }
  }

  swapStats( htmlId1, htmlId2 ){//zamiana statystyk kart
    let posbuffId = htmlId1.slice( 0, -2 );
    let elementBoard = document.getElementById( htmlId1 ).children[0].children[0];//elementy przechowujące
    let elementDeck = document.getElementById( htmlId2 ).children[0].children[0];//statystyki karty
    let statsBoard = elementBoard.children[0];
    let statsDeck = elementDeck.children[0];
    let statsH = statsBoard;
    statsBoard = this.buffStats( statsDeck, posbuffId );
    statsDeck = this.debuffStats( statsH, posbuffId );
    elementBoard.innerHTML = statsBoard;
    elementDeck.innerHTML = statsDeck;
  }

  swapLocalIds( localBoardId, localDeckId ){
    if( this.currentPlayer == 1 ){
      let help = this.boardP1[ localBoardId ];
      this.boardP1[ localBoardId ] = this.deckP1[ localDeckId ];
      this.deckP1[ localDeckId ] = help;
    }
    else if( this.currentPlayer == 2 ){
      let help = this.boardP2[ localBoardId ];
      this.boardP2[ localBoardId ] = this.deckP2[ localDeckId ];
      this.deckP2[ localDeckId ] = help;
    }
  }

  onCardClick( id ){//po zaznaczeniu karty w decku
    if( this.active_card == 0 ){//jeśli nie ma aktywnej, aktywuj tą kartę
      this.activateCard( id );
    }
    else if( id != this.active_card ){//jeśli kliknięto nie aktywną kartę, dezaktywuj aktywną i aktywuj tą
      this.deactivateCard();
      this.activateCard( id );
    }
    else if( id == this.active_card ){//jeśli kliknięto teraz aktywną kartę, dezaktywuj ją
      this.deactivateCard();
    }
  }

  activateCard( htmlId ){//aktywuj kartę
    this.active_card = htmlId;//aktywuj kartę, potem dodanie stylów
    let element = document.getElementById( htmlId ).children[0];
    element.style.outline = '0.15em solid red';
    element.children[0].style.outline = '0.21em solid red';
  }

  deactivateCard(){
    let element = document.getElementById( this.active_card ).children[0];//usuń styl
    element.style.outline = '0';
    element.children[0].style.outline = '0';
    this.active_card = 0;//dezaktywuj
  }

  swapDecks(){
    if( this.currentPlayer == 1 ){
      let content = '', i;
      for( i = 1; i <= this.deckP2.length; i++ ){
        if( this.deckP2[ i-1 ] instanceof Card ){
          content = content + '<div id = "deck' + i + '" onclick = "game.onCardClick( this.id )" >';
          this.loadCard( 'deck' + i, this.deckP2[ i-1 ].databaseId );
          content = content + '</div>';
        }
      }
      document.getElementsByClassName( 'deck' )[0].innerHTML = content;
    }
    else if( this.currentPlayer == 2 ){
      let content = '', i;
      for( i = 1; i <= this.deckP1.length; i++ ){
        if( this.deckP1[ i-1 ] instanceof Card ){
          content = content + '<div id = "deck' + i + '" onclick = "game.onCardClick( this.id )" >';
          this.loadCard( 'deck' + i, this.deckP1[ i-1 ].databaseId );
          content = content + '</div>';
        }
      }
      document.getElementsByClassName( 'deck' )[0].innerHTML = content;
    }
  }

  nextRound(){
    if( this.roundCount > 2 * this.preparationRounds && this.roundCount % 2 == 0 ){
      //10 'rund' = 5 rund gdzie obaj gracze wykonali ruch
      this.autoAttack();
      if( (this.boardP1['core'] == 0) && (this.boardP2['core'] == 0)){
        this.winner = 'Remis!';
        this.endGame();
        return;
      }
      else if(this.boardP1['core'] == 0){
        this.winner = 'Zwycięża gracz 2';
        this.endGame();
        return;
      }
      else if(this.boardP2['core'] == 0){
        this.winner = 'Zwycięża gracz 1';
        this.endGame();
        return;
      }
    }
    this.active_card = 0;
    this.swapDecks();//zmiana kart w decku, ruch drugiego gracza
    this.swapPlayers();
    this.roundCount ++;
  }

  swapPlayers(){
    if( this.currentPlayer == 1 ){
      this.currentPlayer = 2;
    }
    else if( this.currentPlayer == 2 ){
      this.currentPlayer = 1;
    }
    document.getElementById( 'player' ).innerHTML = '<h1 class = "centered" >Gracz ' + this.currentPlayer + '</h1><div class = "centered"><button class = "centered" id = "skip" onclick="game.nextRound()">Pomiń swoją turę</button></div>';
  }

  loadCard( htmlId, databaseId ){
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function(){
      if( this.readyState == 4 && this.status == 200 ){
        if( this.responseText == 0 ){
          document.getElementById( htmlId ).style.display = 'none';
        }
        else{
          document.getElementById( htmlId ).innerHTML = this.responseText;
        }
      }
    };
    ajax.open( "POST", "src/php/loadcard.php", true );
    ajax.setRequestHeader( "Content-type", "application/x-www-form-urlencoded" );
    ajax.send( 'id=' + databaseId );
  }

  endGame(){
    setTimeout(function(){
        window.location = "results.php?winner=" + game.winner +'&rounds=' + game.roundCount;
    }, 3000);
  }

}

function ranChance(){
  Math.floor( ( Math.random() * 4 ) + 1 );
}

function animate(htmlId, type){
    let cardElement = document.getElementById(htmlId).children[0]
    let statsElement = cardElement.children[0]
    let specs, prop;
    if(type == 1){//swap
      specs = [ { width:'7vw', height:'12vw', outline:'none', },
      { width:'7.9vw', height:'13.5vw', outline:'green 0.4vw solid' },
      { width:'7vw', height:'12vw', outline:'none', } ];
      prop = { duration: 1000, iterations:1, easing:'ease-out' };
    }
    if(type == 2){//attack
      specs = [ { outline:'none', opacity:'1' },
       { outline:'black 0.9vw solid', opacity:'0.7' },
        { outline:'none', opacity:'1' } ];
      prop = { duration: 1600, iterations:1, easing:'ease' };
    }
    if(type == 3){//take damage
      specs = [ { outline:'none', width:'7vw', height:'12vw' },
       { outline:'red 0.6vw solid', width:'5.5vw', height:'10vw' },
        { outline:'none', width:'7vw', height:'12vw' } ];
      prop = { duration: 1400, iterations:1, easing:'ease' };
    }
    if(type == 4){//faint
      specs = [ { outline:'none', width:'7vh', height:'12vw', opacity:'1' },
       { outline:'black 0.3vw solid', width:'5vw', height:'8vw', opacity:'0.7' },
       { outline:'red 0.6vw solid', width:'2vw', height:'4vw', opacity:'0.4' },
        { outline:'none', width:'0', height:'0', opacity:'0.1' } ];
      prop = { duration: 1000, iterations:1, easing:'ease' };
    }
    cardElement.animate( specs, prop );
    statsElement.animate( specs, prop );
}
