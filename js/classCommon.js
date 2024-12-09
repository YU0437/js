export class ClassCommon
{
	constructor(game)
	{
		this.game = game;
		this.FPS = 20;

		this.Timer = 0;
		this.MaxFrame = 0;
		this.markForDelete = false;
		this.image = new Image();
		this.FrameX = 0;
		this.FrameY = 0;
		this.size = 1;
		this.SpriteWidth = 0;
		this.SpriteHeight = 0;
		this.width = this.SpriteWidth * this.size;
		this.height = this.SpriteHeight * this.size;
		this.x = 0;
		this.y = 0;
		this.radius = this.width * 0.35;
		this.ctx = this.game.ctx;
	}

	draw()
	{
		this.game.ctx.drawImage(this.image, this.FrameX * this.SpriteWidth, this.FrameY * this.SpriteHeight, this.SpriteWidth, this.SpriteHeight, this.x, this.y, this.width, this.height);
	}
}