import {ClassCommon} from "./classCommon.js";

class Enemy extends ClassCommon
{
	constructor(game)
	{
		super(game)
		this.EnemyInterval = 1000 / this.FPS;
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

	enter()
	{
		if (this.game.player.immunity === false)
		{
			this.game.player.SetState(7, 0);
			this.game.heart--;
		}
		else
		{
			this.game.gold++;
			this.game.death.push(new Slash(this.game, this.x, this.y, this.size));
		}
		this.markForDelete = true;
	}
}

export class Eye extends Enemy
{
	constructor(game)
	{
		super(game);
		this.image = new Image();
		this.image.src = 'res/img/beast/eye/eye_Sheet.png';
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
		this.image.src = 'res/img/beast/Frog/Frog.png';
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


class Death extends Enemy
{
	constructor(game, x, y, size)
	{
		super(game);
		this.x = x;
		this.y = y;
		this.size = size;
		this.markForDelete = false;
	}

	update(deltaTime)
	{
		if (this.FrameX >= this.MaxFrame) this.markForDelete = true;
		super.update(deltaTime);
	}
}

export class Slash extends Death
{
	constructor(game, x, y, size)
	{
		super(game, x, y, size);
		this.image.src = 'res/img/death/Slash.png';
		this.SpriteWidth = 64;
		this.SpriteHeight = 64;
		this.width = this.SpriteWidth * this.size;
		this.height = this.SpriteHeight * this.size;
		this.MaxFrame = 8;
		this.FrameX = 0;
		this.FrameY = 0;
	}

	draw()
	{
		this.game.ctx.drawImage(this.image, this.FrameY * this.SpriteWidth, this.FrameX * this.SpriteHeight, this.SpriteWidth, this.SpriteHeight, this.x, this.y, this.width, this.height);
	}
}