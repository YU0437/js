import {ClassCommon} from "./classCommon.js";

export class UI
{
	constructor(game)
	{
		this.game = game;
		this.ctx = this.game.ctx;
		this.fontSize = 30;
		this.fontFamily = 'Helvetica';
		this.gold = new Gold(this.game);
		this.heart = new HeartIcon(this.game);
		this.shield = new Shield(this.game);


	}

	draw()
	{
		this.ctx.font = this.fontSize + 'px ' + this.fontFamily;
		this.ctx.textAlign = 'left';
		this.ctx.fillStyle = this.game.FontColor;
		this.ctx.fillText(this.game.distance.toFixed(2) + ' 米', 950, 100);
		[this.gold, this.heart, this.shield].forEach(obj => {
			obj.draw();
		})
	}

}

class Icon extends ClassCommon
{
	constructor(game)
	{
		super(game);
		this.game = game;
		this.image = new Image();
		this.SpriteWidth = 16;
		this.SpriteHeight = 16;
		this.size = 2.5;
		this.width = this.SpriteWidth * this.size;
		this.height = this.SpriteHeight * this.size;
		this.fontSize = 30;
		this.fontFamily = 'Helvetica';
	}
}


export class HeartIcon extends Icon
{
	constructor(game)
	{
		super(game);
		this.image.src = 'res/img/icon/heart_icon.png';
		this.x = 30;
		this.y = 20;
	}

	draw()
	{
		super.draw();
		this.ctx.font = this.fontSize + 'px ' + this.fontFamily;
		this.ctx.fillStyle = this.game.FontColor;
		this.ctx.fillText('X ' + this.game.heart, this.x + 40, this.y + this.width * 0.5);
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

export class TalentSelectUI extends ClassCommon
{
	constructor(game)
	{
		super(game);
		this.image.src = 'res/img/UI/Border and Panels Menu Part 3/07 Border 03.png';
		this.SpriteWidth = 64;
		this.SpriteHeight = 64;
		this.width = this.SpriteWidth * this.size * 3;
		this.height = this.SpriteHeight * this.size * 5;
		this.x = 150;
		this.y = 50;
		this.FrameX = 3;
		this.FrameY = 1;
	}

	update()
	{

	}

	enter()
	{

	}

}