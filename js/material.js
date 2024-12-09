import {ClassCommon} from "./classCommon.js";
import {TalentSelectUI} from "./UI.js";


class MaterialAnimate extends ClassCommon
{
	constructor(game)
	{
		super(game);
		this.game = game;
		this.image = new Image();
		this.IconInterval = 1000 / this.FPS;
	}

	update(deltaTime)
	{
		if (this.Timer > this.IconInterval)
		{
			if (this.FrameX >= this.MaxFrame) this.FrameX = 0;
			else this.FrameX++;
			this.Timer = 0;
		}
		else this.Timer += deltaTime;
	}
}

export class Portal extends MaterialAnimate
{
	constructor(game)
	{
		super(game);
		this.image.src = 'res/img/particular/Portal/Portal.png';
		this.SpriteWidth = 100;
		this.SpriteHeight = 100;
		this.size = 3;
		this.width = this.SpriteWidth * this.size;
		this.height = this.SpriteHeight * this.size;
		this.MaxFrame = 6;
		this.FrameX = 0;
		this.FrameY = 0;
		this.x = this.game.width - this.width * 0.7;
		this.y = this.game.height - this.height * 0.7;
		this.radius = 0.5 * this.width;

	}

	update(deltaTime)
	{

		if (this.FrameX >= this.MaxFrame)
		{
			this.FrameY++;
			this.FrameY === 5 ? this.MaxFrame = 5 : this.MaxFrame = 6;
			if (this.FrameY >= 6) this.FrameY = 0;
			this.FrameX = 0;
		}
		super.update(deltaTime);
	}

	enter()
	{

		if (this.game.player.keys.includes('e'))
		{
			if (game.intoStore) game.player.SetState(0, 1);
			this.game.distance += 2;
			this.game.intoStore = false;
			this.markForDelete = true;
		}

	}
}

export class Heart extends MaterialAnimate
{
	constructor(game, position)
	{
		super(game);
		this.position = position;
		this.image.src = 'res/img/icon/heart/heart.rotate.png';
		this.size = 2;
		this.SpriteWidth = 32;
		this.SpriteHeight = 32;
		this.width = this.SpriteWidth * this.size;
		this.height = this.SpriteHeight * this.size;
		this.MaxFrame = 11;
		this.FrameX = 0;
		this.x = this.game.width * this.position - this.width;
		this.y = this.game.height - this.height;
		this.FPS = 10;
		this.IconInterval = 1000 / this.FPS;
		this.radius = 0.4 * this.width;
	}

	update(deltaTime)
	{
		super.update(deltaTime);
		if (this.x + this.width < 0) this.markForDelete = true;
		this.x -= this.game.gameSpeed;
	}

	enter()
	{
		this.game.heart++;
		this.markForDelete = true;
	}

}

export class Case extends MaterialAnimate
{
	constructor(game)
	{
		super(game);
		this.image.src = 'res/img/material/Crafted Odyssey - Cursed Chest/Cursed_Chest_Idle.png';
		this.size = 2;
		this.SpriteWidth = 64;
		this.SpriteHeight = 64;
		this.width = this.SpriteWidth * this.size;
		this.height = this.SpriteHeight * this.size;
		this.MaxFrame = 5;
		this.FrameX = 0;
		this.x = this.game.width * 0.6 - this.width;
		this.y = this.game.height - this.height * 0.75;
		this.FPS = 5;
		this.IconInterval = 1000 / this.FPS;
		this.radius = 0.2 * this.width;
	}

	enter()
	{
		if (this.game.player.keys.includes('e'))
		{
			this.game.effects.push(new TalentSelectUI(this.game));
			this.markForDelete = true;
		}
	}

}

