class DrawingTool {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.coordinates = [];
    this.colour = "powderblue";
    this.lineWidth = 3;
  }
  clickHandler(xCoordinate, yCoordinate, connect) {
    const coordinate = {
      x: xCoordinate,
      y: yCoordinate,
      connect: connect,
      colour: this.colour
    };
    this.coordinates.push(coordinate);
  }
  redraw() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (var i = 0; i < this.coordinates.length; i++) {
      this.context.strokeStyle = this.coordinates[i].colour;
      this.context.lineWidth = this.lineWidth;
      this.context.beginPath();
      if (this.coordinates[i].connect) {
        this.context.moveTo(
          this.coordinates[i - 1].x,
          this.coordinates[i - 1].y
        );
      } else {
        this.context.moveTo(this.coordinates[i].x, this.coordinates[i].y - 1);
      }
      this.context.lineTo(this.coordinates[i].x, this.coordinates[i].y);
      this.context.closePath();
      this.context.stroke();
    }
  }
}
