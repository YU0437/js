import {IsGround} from "./utils.js";
import {dash, dizzy, fall, idle, jump, roll, run, sit} from "./state.js";

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
		this.MaxSpeedX = 5;
		this.Vy = 0;
		this.MaxVy = 30;
		this.gravity = 1;
		this.FrameX = 0;
		this.FrameY = 0;
		this.MaxFrame = 0;
		this.FPS = 20;
		this.radius = this.width * 0.35;
		this.PlayerIterval = 1000 / this.FPS;
		this.PlayerTimer = 0;
		this.states = [new run(this, this.game), new idle(this, this.game), new jump(this, this.game), new fall(this, this.game), new sit(this, this.game), new roll(this, this.game), new dash(this, this.game), new dizzy(this, this.game)];
		this.currentState = this.states[1];
		this.currentState.enter();
		this.immunity = false;
	}


	draw()
	{

		this.game.ctx.drawImage(this.image, this.FrameX * this.SpriteWidth, this.FrameY * this.SpriteHeight, this.SpriteWidth, this.SpriteHeight, this.x, this.y, this.width, this.height);
	}

	update(deltaTime)
	{
		this.immunity = false;
		if (this.PlayerTimer > this.PlayerIterval)
		{
			if (this.FrameX >= this.MaxFrame) this.FrameX = 0;
			else this.FrameX++;
			this.PlayerTimer = 0;
		}
		else this.PlayerTimer += deltaTime;
		this.currentState.Input();

		if (this.keys.includes('d')) this.Speed = this.MaxSpeedX;
		else if (this.keys.includes('a')) this.Speed = this.MaxSpeedX * -1.55;
		else this.Speed = 0;
		this.x += this.Speed;
		if (this.keys.includes('w') && IsGround(this)) this.Vy -= this.MaxVy;
		else if (!IsGround(this)) this.Vy += this.gravity;
		else this.Vy = 0;
		this.y += this.Vy;

		if (this.x >= this.game.cvs.width - this.width) this.x = this.game.cvs.width - this.width;
		if (this.x <= 0) this.x = 0;
		if (this.y >= this.game.cvs.height - this.height) this.y = this.game.cvs.height - this.height;

	}

	SetState(NewState, speed)
	{
		this.game.gameSpeed = speed * this.game.MaxGameSpeed;
		this.currentState = this.states[NewState];
		this.currentState.enter();
	}


}
