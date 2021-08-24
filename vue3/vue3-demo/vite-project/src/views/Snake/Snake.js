import {directionEnums} from "./main";

class Snake {
  constructor(speed, direction,count = 1,startPosition) {
    this.speed = speed;
    this.direction = direction;
    this.count = count || 1;
    this.position = [startPosition];
  }

  // 移动
  move () {
    const snakeHead = this.position[0]
  }

  // 吃食物
  eat () {

  }

  // 设置方向
  setDirection (direction) {
    switch (direction) {
      case directionEnums.down:
        if(this.direction !== directionEnums.up) {
          this.direction = direction
        }
        break;
      case directionEnums.up:
        if(this.direction !== directionEnums.down) {
          this.direction = direction
        }
        break;
      case directionEnums.left:
        if(this.direction !== directionEnums.right) {
          this.direction = direction
        }
        break;
      case directionEnums.right:
        if(this.direction !== directionEnums.left) {
          this.direction = direction
        }
        break;
    }
  }
}
