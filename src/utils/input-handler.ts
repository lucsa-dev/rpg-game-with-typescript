export class InputHandler {
    private arrowDown = false;
    private arrowUp = false;
    private arrowLeft = false;
    private arrowRight = false;
  
    constructor() {
      document.addEventListener("keydown", this.onKeyDown.bind(this));
      document.addEventListener("keyup", this.onKeyUp.bind(this));
    }
  
    private onKeyDown(event: KeyboardEvent) {
      switch (event.keyCode) {
        case 37: // Left arrow
          this.arrowLeft = true;
          break;
        case 38: // Up arrow
          this.arrowUp = true;
          break;
        case 39: // Right arrow
          this.arrowRight = true;
          break;
        case 40: // Down arrow
          this.arrowDown = true;
          break;
      }
    }
  
    private onKeyUp(event: KeyboardEvent) {
      switch (event.keyCode) {
        case 37: // Left arrow
          this.arrowLeft = false;
          break;
        case 38: // Up arrow
          this.arrowUp = false;
          break;
        case 39: // Right arrow
          this.arrowRight = false;
          break;
        case 40: // Down arrow
          this.arrowDown = false;
          break;
      }
    }
  
    public isArrowDown(): boolean {
      return this.arrowDown;
    }
  
    public isArrowUp(): boolean {
      return this.arrowUp;
    }
  
    public isArrowLeft(): boolean {
      return this.arrowLeft;
    }
  
    public isArrowRight(): boolean {
      return this.arrowRight;
    }
  }
  