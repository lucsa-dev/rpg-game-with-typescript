import * as PIXI from "pixi.js";
import { InputHandler } from "../../utils/input-handler";

export class Player extends PIXI.Container {
  appTicker: PIXI.Ticker;
  sprite: PIXI.AnimatedSprite;
  inputHandler: InputHandler;
  lastDirection: string;

  constructor(app: PIXI.Application) {
    super();
    this.appTicker = app.ticker;

    // Carregue a sprite sheet do jogador
    const spriteSheet = PIXI.BaseTexture.from(
      "../public/assets/spritesheet_player.webp"
    );

    // Defina os quadros para cada direção
    const framesUp = [
      new PIXI.Rectangle(0, 300, 200, 300),
      new PIXI.Rectangle(200, 300, 200, 300),
      new PIXI.Rectangle(400, 300, 200, 300),
      new PIXI.Rectangle(600, 300, 200, 300),
    ];
    const framesDown = [
      new PIXI.Rectangle(0, 0, 200, 300),
      new PIXI.Rectangle(200, 0, 200, 300),
      new PIXI.Rectangle(400, 0, 200, 300),
      new PIXI.Rectangle(600, 0, 200, 300),
    ];
    const framesLeft = [
      new PIXI.Rectangle(0, 600, 200, 300),
      new PIXI.Rectangle(200, 600, 200, 300),
      new PIXI.Rectangle(400, 600, 200, 300),
      new PIXI.Rectangle(600, 600, 200, 300),
    ];
    const framesRight = [
      new PIXI.Rectangle(600, 900, 200, 298),
      new PIXI.Rectangle(400, 900, 200, 298),
      new PIXI.Rectangle(200, 900, 200, 298),
      new PIXI.Rectangle(0, 900, 200, 298),
    ];

    // Crie as texturas do sprite a partir dos quadros
    const texturesUp = framesUp.map(
      (frame) => new PIXI.Texture(spriteSheet, frame)
    );
    const texturesDown = framesDown.map(
      (frame) => new PIXI.Texture(spriteSheet, frame)
    );
    const texturesLeft = framesLeft.map(
      (frame) => new PIXI.Texture(spriteSheet, frame)
    );
    const texturesRight = framesRight.map(
      (frame) => new PIXI.Texture(spriteSheet, frame)
    );

    // Crie o sprite animado
    this.sprite = new PIXI.AnimatedSprite(texturesDown);
    this.sprite.animationSpeed = 0.2;
    // Posicione o sprite no centro da tela
    this.sprite.x = app.renderer.width / 2;
    this.sprite.y = app.renderer.height / 2;

    this.sprite.scale.set(0.2, 0.2);

    // Defina a velocidade do jogador
    const speed = 5;

    // Crie um manipulador de entrada para detectar as teclas pressionadas
    this.inputHandler = new InputHandler();

    // Adicione o sprite e o texto ao contêiner do jogador
    this.addChild(this.sprite);

    // Inicie o último movimento com o sprite parado
    this.lastDirection = "idle";

    // Adicione o jogador ao palco
    app.stage.addChild(this);

    // Adicione uma função de atualização que verifica se o jogador se moveu e toca a animação apropriada
    this.appTicker.add(() => {
      let direction = "idle";

      if (this.inputHandler.isArrowRight()) {
        this.sprite.x += speed;
        direction = "right";
      }
      
      if (this.inputHandler.isArrowLeft()) {
        this.sprite.x -= speed;
        direction = "left";
      }

      if (this.inputHandler.isArrowUp()) {
        this.sprite.y -= speed;
        direction = "up";
      }

      if (this.inputHandler.isArrowDown()) {
        this.sprite.y += speed;
        direction = "down";
      }

      // Se o jogador estiver parado, volte para a animação idle
      if (direction === "idle") {
        this.sprite.gotoAndStop(0);
      }
      // Se o jogador mudou de direção, toque a animação apropriada
      else if (direction !== this.lastDirection) {
        switch (direction) {
          case "right":
           this.sprite.textures = texturesRight;
           break;
          case "left":
            this.sprite.textures = texturesLeft;
            break;
          case "up":
            this.sprite.textures = texturesUp;
            break;
          case "down":
            this.sprite.textures = texturesDown;
            break;
        }
        this.sprite.play();
      }
      
      // Atualize a última direção
      this.lastDirection = direction;
    });
  }
}
