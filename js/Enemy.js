class Enemy
{
	constructor(game)
	{
		this.game = game;
		this.FPS = 20;
		this.EnemyInterval = 1000 / this.FPS;
		this.Timer = 0;
		this.MaxFrame = 0;
		this.markForDelete = false;

		this.image = new Image();
		this.FrameX = 0;
		this.FrameY = 0;
		this.size = 0;
		this.SpriteWidth = 0;
		this.SpriteHeight = 0;
		this.width = 0;
		this.height = 0;
		this.x = 0;
		this.y = 0;
		this.radius = this.width * 0.35;
	}

	draw()
	{
		this.game.ctx.drawImage(this.image, this.FrameX * this.SpriteWidth, this.FrameY * this.SpriteHeight, this.SpriteWidth, this.SpriteHeight, this.x, this.y, this.width, this.height);
	}


	update(deltaTime, rotate)
	{
		if (this.Timer > this.EnemyInterval)
		{
			if (!rotate)
			{
				if (this.FrameX >= this.MaxFrame) this.FrameX = 0;
				else this.FrameX++;
			}
			else
			{
				if (this.FrameX === 1) this.FrameX = this.MaxFrame;
				else this.FrameX--;
			}
			this.Timer = 0;
		}
		else this.Timer += deltaTime;
		if (this.x + this.width < 0) this.markForDelete = true;


	}

}

export class Eye extends Enemy
{
	constructor(game)
	{
		super(game);
		this.image = new Image();
		this.image.src = 'res/img/eye/eye_Sheet.png';
		this.size = 1.5;
		this.SpriteWidth = 156;
		this.SpriteHeight = 128;
		this.width = this.SpriteWidth * this.size;
		this.height = this.SpriteHeight * this.size;
		this.FrameX = 0;
		this.FrameY = 1;
		this.MaxFrame = 19;
		this.x = this.game.width + this.width
		this.y = (this.game.height - this.height) * Math.random();
		this.angle = 0;
		this.radius = 0.1 * this.width;
	}

	update(deltaTime)
	{
		super.update(deltaTime);
		this.x -= this.game.gameSpeed + 1;
		this.y += Math.sin(this.angle) * 5;
		this.angle += 0.1;
	}
}


export class Frog extends Enemy
{
	constructor(game)
	{
		super(game);
		this.image = new Image();
		this.image.src = 'res/img/Frog/Frog.png';
		this.size = 3;
		this.SpriteWidth = 48;
		this.SpriteHeight = 48;
		this.width = this.SpriteWidth * this.size;
		this.height = this.SpriteHeight * this.size;
		this.MaxFrame = 8;
		this.FrameX = this.MaxFrame;
		this.FrameY = 0;
		this.x = this.game.width;
		this.y = this.game.height - this.height + this.size * 15;
		this.rotate = true;
		this.radius = 0.35 * this.width;
	}

	update(deltaTime)
	{
		this.x -= this.game.gameSpeed;

		super.update(deltaTime, this.rotate);
	}
}