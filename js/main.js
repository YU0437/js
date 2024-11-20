import {Player} from "./Player.js";
import {InputHandle} from "./handleInput.js";
import {State} from "./state.js";

const cvs = document.getElementById('canvas1');
const ctx = cvs.getContext('2d');
cvs.width = 500;
cvs.height = 500;

class Game
{
	constructor(ctx, cvs)
	{
		this.ctx = ctx;
		this.cvs = cvs;
		this.enemies = [];
		this.inputHandle = new InputHandle();
		this.player = new Player(this, this.inputHandle.Keys);
		this.state = new State(this.player.currentState);


	}

	draw()
	{
		this.player.draw();

	}

	update()
	{
		this.player.update();

	}

	#addNewEnemy()
	{

	}
}

const game = new Game(ctx, cvs);

function animate(timestamp)
{
	ctx.clearRect(0, 0, cvs.width, cvs.height);
	game.draw();
	game.update();
	requestAnimationFrame(animate);
}

animate(0);

