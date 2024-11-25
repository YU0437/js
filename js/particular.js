class Particular
{
	constructor(game)
	{
		this.game = game;
		this.ctx = this.game.ctx;
		this.player = this.game.player;
		this.markForDelete = false;
		this.speedX = 0;
		this.speedY = 0;
	}

	update()
	{
		this.x -= this.speedX + this.game.gameSpeed;
		this.y -= this.speedY + this.game.gameSpeed;
		this.size *= 0.95;
		if (this.size < 0.5) this.markForDelete = true;
	}
}

export class Dust extends Particular
{
	constructor(game)
	{
		super(game);
		this.x = this.player.x + Math.random() * 20 + this.player.width * 0.5;
		this.y = this.player.y + Math.random() * 20 + this.player.height * 0.9;
		this.size = 15;
		this.speedX = 1;
		this.speedY = -1 * this.game.gameSpeed;
	}

	draw()
	{
		this.ctx.beginPath();
		this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
		this.ctx.fillStyle = 'black';
		this.ctx.fill();

	}
}

export class Fire extends Particular
{
	constructor(game)
	{
		super(game);
		this.x = this.player.x + this.player.width * 0.5;
		this.y = this.player.y + this.player.height * 0.65;
		this.speedX = 1;
		this.speedY = 0.5;
		this.image = new Image();
		this.image.src = 'res/img/particular/fire/3.png';
		this.size = Math.random() * 25 + 50;
		this.angle = 0;
		this.va = Math.random() * 0.1 + 0.1;
	}

	draw()
	{
		this.ctx.save();
		this.ctx.translate(this.x, this.y);
		this.ctx.rotate(this.angle);
		this.ctx.drawImage(this.image, -this.size * 0.5, -this.size * 0.5, this.size, this.size);
		this.ctx.restore();
	}

	update()
	{
		super.update();
		this.y += Math.cos(this.angle);
		this.angle += this.va;
	}
}

export class Splash extends Particular
{
	constructor(game)
	{
		super(game);
		this.x = this.player.x + this.player.width * 0.5;
		this.y = this.player.y + this.player.height * 0.8;
		this.speedX = Math.random() * 30 - 15;
		this.speedY = Math.random() * 20 - 15;
		this.image = new Image();
		this.image.src = 'res/img/particular/fire/3.png';
		this.size = Math.random() * 80 + 50;
	}

	draw()
	{
		this.ctx.drawImage(this.image, this.x, this.y, this.size, this.size);
	}

	update()
	{
		super.update();
		this.size *= 0.90;
	}

}