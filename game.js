class Game {
    constructor(){
  
    }
  
    getState(){
      var gameStateRef  = database.ref('gameState');
      gameStateRef.on("value",function(data){
         gameState = data.val();
      })
  
    }

    update(state){
        database.ref('/').update({
          gameState: state
        });
      }

      async start(){
        if(gameState === 0){
          player = new Player();
          var playerCountRef = await database.ref('playerCount').once("value");
          if(playerCountRef.exists()){
            playerCount = playerCountRef.val();
            player.getCount();
          }
          form = new Form()
          form.display();
        }

        hero1 = createSprites();
        hero1.addImage(hero1img);

        hero2 = createSprites();
        hero2.addImage(hero2img);

        hero = [hero1, hero2]

        zombie = createSprites(displayWidth/2, displayHeight/2);
        zombie.addImage(zombieimg);
        zombie.velocityX = 3;
        zombie.velocityY = 3;

        bomb = createSprites(120,200);
        bomb.addImage(bombimg);

        arrow = createSprites(130,500);
        arrow.addImage(arrowimg);

    }
    play(){
        form.hide();
        
        Player.getPlayerInfo();
        player.getCarsAtEnd();
        
        if(allPlayers !== undefined){
          background(rgb(198,135,103));

          var index = 0;

          var x = 175 ;
          var y;

          for(var plr in allPlayers){
            index = index + 1 ;

            /* y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;*/

            if (index === player.index){

              camera.position.x = hero[index-1].x
              camera.position.y = hero[index-1].y;
            }
        }
    }
       
        if(keyIsDown(UP_ARROW) && player.index !== null){
            player.distance +=10
            player.update();
          }

        if(keyIsDown(DOWN_ARROW) && player.index !== null){
            player.distance +=10
            player.update();
          }

        if(keyIsDown(LEFT_ARROW) && player.index !== null){
            player.distance +=10
            player.update();
          }

        if(keyIsDown(RIGHT_ARROW) && player.index !== null){
            player.distance +=10
            player.update();
          }

        if(hero1.isTouching(trophie_part1)||hero2.isTouching(trophie_part1)){
          parts += 1;
          trophie_part1.destroy();
        }

        if(hero1.isTouching(trophie_part2)||hero2.isTouching(trophie_part2)){
          parts += 1;
          trophie_part2.destroy();
        }

        if(hero1.isTouching(trophie_part3)||hero2.isTouching(trophie_part3)){
          parts += 1;
          trophie_part3.destroy();
        }

        if(hero1.isTouching(zombie)||hero2.isTouching(zombie)){
          life -= 1;
        }

        if(parts === 3){
          zombieKing = createSprites();
          zombieking.addImage(zombieKingimg);
          zombieKing.velocityX = 7;
          zombieKing.velocityY = 7;
        }

        if(parts === 3 && hero1.isTouching(trophie) && hero2.isTouching(trophie)){
          gameState = 2;
          text("You Win", displayWidth/2, displayHeight/2)
        }

        if(life === 0 || hero1.isTouching(zombieKing) || hero2.isTouching(zombieKing)){
          gameState = 2;
          text("You Lose", displayWidth/2, displayHeight/2);
        }

        for(var x = 10 ; x <= displayWidth ; x += 50){
          var wall1 = createSprites(x, 100, 10, 100);
          var wall2 = createSprites(x, 450, 10, 100);
          
        }

        for(var i = 30 ; i <= displayHeight ; i += 50){
          var wall3 = createSprites(70, i, 100, 10);
          var wall4 = createSprites(370, i, 100, 10);
        }

          drawSprites();
        }
        end(){
            console.log("Game Ended");
          }
}