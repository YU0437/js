export class UI
{
	constructor(game)
	{
		this.game = game;
		this.ctx = this.game.ctx;
		this.fontSize = 30;
		this.fontFamily = 'Helvetica';
		this.gold = new Gold(this.game);
		this.heart = new Heart(this.game);
		this.shield = new Shield(this.game);
	}

	draw()
	{
		// this.ctx.font = this.fontSize + 'px ' + this.fontFamily;
		// this.ctx.textAlign = 'left';
		// this.ctx.fillStyle = this.game.FontColor;
		[this.gold, this.heart, this.shield].forEach(obj => {
			obj.draw();
		})

	}

}

class Icon
{
	constructor(game)
	{
		this.game = game;
		this.ctx = this.game.ctx;
		this.image = new Image();
		this.image.src = '';
		this.SpriteWidth = 16;
		this.SpriteHeight = 16;
		this.size = 2.5;
		this.width = this.SpriteWidth * this.size;
		this.height = this.SpriteHeight * this.size;
		this.FrameX = 0;
		this.FrameY = 0;
		this.x = 0;
		this.y = 0;
		this.fontSize = 30;
		this.fontFamily = 'Helvetica';

	}

	draw()
	{
		this.ctx.drawImage(this.image, this.SpriteWidth * this.FrameX, this.SpriteHeight * this.FrameY, this.SpriteWidth, this.SpriteHeight, this.x, this.y, this.width, this.height);
	}
}


export class Heart extends Icon
{
	constructor(game)
	{
		super(game);
		this.image.src = 'res/img/icon/heart_icon.png';
		this.x = 30;
		this.y = 20;
	}
}

export class Gold extends Icon
{
	constructor(game)
	{
		super(game);
		this.image.src = 'res/img/icon/coin_icon.png';
		this.x = 33;
		this.y = 83;
		this.size = 2;
		this.width = this.SpriteWidth * this.size;
		this.height = this.SpriteHeight * this.size;
	}

	draw()
	{
		super.draw();
		this.ctx.font = this.fontSize + 'px ' + this.fontFamily;
		this.ctx.fillStyle = this.game.FontColor;
		this.ctx.fillText('X ' + this.game.gold, this.x + 40, this.y + this.width * 0.5);
	}
}

export class Shield extends Icon
{
	constructor(game)
	{
		super(game);
		this.image.src = 'res/img/icon/shield_icon.png';
		this.x = 30;
		this.y = 140;
	}
}