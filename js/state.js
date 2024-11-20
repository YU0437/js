const states = {
	Idle: 0,
	Run: 1,
	Jump: 2,
}

export class State
{
	constructor(state)
	{
		this.state = state;
	}
}

export class run extends State
{
	constructor(player)
	{
		super('Run');
		this.player = player;

	}

	enter()
	{
		this.player.FrameY = 3;
		this.player.MaxFrame = 8;

	}

	Input()
	{

	}

}