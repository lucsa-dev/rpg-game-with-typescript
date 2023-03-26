import * as PIXI from 'pixi.js';
import { Player } from './game/player';
import { gameConfig } from './config/gameConfig';

class Application {
  private app: PIXI.Application;
  private player: Player;

  constructor(config: PIXI.ContextOptions) {
    this.app = new PIXI.Application(config);
    this.player = new Player(this.app);
    this.app.stage.addChild(this.player);
  }

  public run() {
    document.body.appendChild(this.app.view as HTMLCanvasElement);
  }
}

const app = new Application(gameConfig);
app.run();
