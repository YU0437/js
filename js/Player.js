export class Player
{
	constructor(game, keys)
	{
		this.game = game;
		this.keys = keys;
		this.image = new Image();
		this.image.src = 'res/img/dog/dog.png';
		this.size = 0.25;
		this.SpriteWidth = 573;
		this.SpriteHeight = 523;
		this.width = this.SpriteWidth * this.size;
		this.height = this.SpriteHeight * this.size;
		this.x = 100;
		this.y = this.game.cvs.height - this.height;
		this.Speed = 0;
		this.MaxSpeedX = 10;
		this.Vy = 0;
		this.MaxVy = -20;
		this.gravity = 1;
		this.FrameX = 0;
		this.FrameY = 0;
		this.MaxFrame = 0;
		this.FPS = 20;
		this.PlayerIterval = 1000 / this.FPS;
		this.PlayerTimer = 0;
		this.states = [];
		this.currentState = this.states[0];
	}


	draw()
	{
		this.game.ctx.drawImage(this.image, this.FrameX * this.SpriteWidth, this.FrameY * this.SpriteHeight, this.SpriteWidth, this.SpriteHeight, this.x, this.y, this.width, this.height);
	}

	update()
	{
		if (this.keys.includes('d')) this.Speed = this.MaxSpeedX;
		else if (this.keys.includes('a')) this.Speed = this.MaxSpeedX * -1;
		else this.Speed = 0;
		this.x += this.Speed;
		if (this.keys.includes('w') && IsGround(this)) this.Vy -= this.MaxVy;


		if (this.x >= this.game.cvs.width - this.width) this.x = this.game.cvs.width - this.width;
		if (this.x <= 0) this.x = 0;
	}
}
