import {IsGround} from "./utils.js";
import {Dust, Fire, Splash} from "./particular.js";

const states = {
	Run: 0,
	Idle: 1,
	Jump: 2,
	Fall: 3,
	Sit: 4,
	Roll: 5,
	Dash: 6,
	Dizzy: 7,
}

class State
{
	constructor(state)
	{
		this.state = state;

	}
}

export class run extends State
{
	constructor(player, game)
	{
		super('Run');
		this.player = player;
		this.game = game;
	}

	enter()
	{
		this.player.FrameX = 0;
		this.player.FrameY = 3;
		this.player.MaxFrame = 8;
	}

	Input()
	{
		this.game.particular.push(new Dust(this.game));
		if (this.player.keys.includes('w')) this.player.SetState(states.Jump, 1);
		else if (this.player.keys.includes('s')) this.player.SetState(states.Sit, 0);
		else if (this.player.keys.includes('f')) this.player.SetState(states.Roll, 2.5);
		else if (this.player.keys.length === 0) this.player.SetState(states.Idle, 1);
	}
}

export class jump extends State
{
	constructor(player, game)
	{
		super('Jump');
		this.player = player;
		this.game = game;
	}

	enter()
	{
		this.player.FrameX = 0;
		this.player.FrameY = 1;
		this.player.MaxFrame = 6;
	}

	Input()
	{
		if (this.player.Vy >= 0) this.player.SetState(states.Fall, 1);
		if (this.player.keys.includes('s')) this.player.SetState(states.Dash, 1.5);
		if (this.player.keys.includes('f')) this.player.SetState(states.Roll, 2.5);

	}

}

export class fall extends State
{
	constructor(player, game)
	{
		super('Fall');
		this.player = player;
		this.game = game;
	}

	enter()
	{
		this.player.FrameX = 0;
		this.player.FrameY = 2;
		this.player.MaxFrame = 6;
	}

	Input()
	{
		if (IsGround(this.player)) this.player.SetState(states.Idle, 1);
		if (this.player.keys.includes('s')) this.player.SetState(states.Dash, 1.5);
		else if (this.player.keys.includes('f')) this.player.SetState(states.Roll, 2.5);

	}

}

export class roll extends State
{
	constructor(player, game)
	{
		super('Roll');
		this.player = player;
		this.game = game;
	}

	enter()
	{
		this.player.FrameX = 0;
		this.player.FrameY = 6;
		this.player.MaxFrame = 6;

	}

	Input()
	{
		this.player.immunity = true;
		this.game.particular.push(new Fire(this.game));
		if (IsGround(this.player)) this.game.particular.push(new Dust(this.game));
		if (this.player.keys.includes('s') && !IsGround(this.player)) this.player.SetState(states.Dash, 1.5);
		else if (this.player.keys.includes('f') && IsGround(this.player) && this.player.FrameX > 1) this.player.SetState(states.Idle, 1);
	}

}

export class idle extends State
{
	constructor(player, game)
	{
		super('Idle');
		this.player = player;
		this.game = game;
	}

	enter()
	{
		this.player.FrameX = 0;
		this.player.FrameY = 0;
		this.player.MaxFrame = 6;
	}

	Input()
	{
		if (this.player.keys.includes('w')) this.player.SetState(states.Jump, 1);
		else if (this.player.keys.includes('a')) this.player.SetState(states.Run, 1);
		else if (this.player.keys.includes('d')) this.player.SetState(states.Run, 1);
		else if (this.player.keys.includes('s')) this.player.SetState(states.Sit, 0);
		else if (this.player.keys.includes('f') && this.player.FrameX > 1) this.player.SetState(states.Roll, 2.5);
	}

}

export class sit extends State
{
	constructor(player, game)
	{
		super('Sit');
		this.player = player;
		this.game = game;
	}

	enter()
	{
		this.player.FrameX = 0;
		this.player.FrameY = 5;
		this.player.MaxFrame = 4;
	}

	Input()
	{
		if (this.player.keys.includes('w')) this.player.SetState(states.Jump, 1);
		else if ((this.player.keys.includes('a') || this.player.keys.includes('d')) && this.player.keys.indexOf('s') === -1) this.player.SetState(states.Run, 1);
		else
		{
			this.player.keys.splice('a', 1);
			this.player.keys.splice('d', 1);
		}
	}
}

export class dash extends State
{
	constructor(player, game)
	{
		super('Dash');
		this.player = player;
		this.game = game;
	}

	enter()
	{
		this.player.FrameX = 0;
		this.player.FrameY = 6;
		this.player.MaxFrame = 6;
		this.player.Vy += 10;


	}

	Input()
	{
		this.player.Vy += 3;
		this.game.particular.push(new Fire(this.game));
		this.player.immunity = true;
		if (IsGround(this.player))
		{
			for (let i = 0; i < 99; i++)
			{
				this.game.particular.push(new Splash(this.game));
			}
			this.player.SetState(states.Run, 1);
		}
	}

}

export class dizzy extends State
{
	constructor(player, game)
	{
		super('Dizzy');
		this.player = player;
		this.game = game;
	}

	enter()
	{
		this.player.FrameX = 0;
		this.player.FrameY = 4;
		this.player.MaxFrame = 10;
		this.player.Vy = 0;
	}

	Input()
	{
		this.player.immunity = true;
		this.player.keys.length = 0;
		if (this.player.FrameX >= this.player.MaxFrame && IsGround(this.player)) this.player.SetState(states.Idle, 1);
		else if (this.player.FrameX >= this.player.MaxFrame && !IsGround(this.player)) this.player.SetState(states.Fall, 1);
	}
}