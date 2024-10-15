// utils/Shape.ts
export class Shape {
  x: number;
  y: number;
  size: number;
  fallSpeed: number;
  color: string;
  level: number;

  constructor(
    size: number,
    fallSpeed: number,
    canvasWidth: number,
    color: string,
    level: number
  ) {
    this.size = size;
    this.fallSpeed = fallSpeed + (Math.random() * 1 - 0.5);
    this.x = Math.random() * (canvasWidth - size);
    this.y = -size;
    this.color = color;
    this.level = level;
  }

  update() {
    this.y += this.fallSpeed;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.size, this.size);

    // Display level number
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText(
      `Lv${this.level}`,
      this.x + this.size / 2 - ctx.measureText(`Lv${this.level}`).width / 2,
      this.y + this.size / 2 + 7
    );
  }
}

export class Outline {
  x: number;
  y: number;
  size: number;

  constructor(
    size: number,
    canvasWidth: number,
    canvasHeight: number,
    occupiedColumns: boolean[]
  ) {
    this.size = size;
    this.y = canvasHeight - size - 10;

    const availableColumns = occupiedColumns
      .map((occupied, index) => (!occupied ? index : null))
      .filter((index) => index !== null) as number[];

    if (availableColumns.length === 0) {
      // All columns are occupied; handle game over in game logic
      this.x = 0;
      return;
    }

    const randomIndex = Math.floor(Math.random() * availableColumns.length);
    const column = availableColumns[randomIndex];

    this.x = column * size;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.strokeStyle = "azure";
    ctx.lineWidth = 3;
    ctx.strokeRect(this.x, this.y, this.size, this.size);
  }
}
