import {Player} from "./Player.js";
import {InputHandle} from "./handleInput.js";
import {Eye, Frog} from "./Enemy.js";
import {BackGround} from "./backGround.js";
import {Debug, IsCollision, SpeedCtrl} from "./utils.js";
import {UI} from "./UI.js";
import {Case, Heart, Portal} from "./material.js";
import {Trait} from "./trait.js";


const cvs = document.getElementById('canvas1');
const ctx = cvs.getContext('2d');
cvs.width = 1080;
cvs.height = 500;

class Game
{
	constructor(ctx, cvs)
	{
		this.ctx = ctx;
		this.cvs = cvs;
		this.width = this.cvs.width;
		this.height = this.cvs.height;
		this.enemies = [];
		this.particular = [];
		this.death = [];
		this.effects = [];
		this.gameSpeed = 0;
		this.MaxGameSpeed = 3;
		this.intoStore = false;

		this.inputHandle = new InputHandle(this);
		this.player = new Player(this, this.inputHandle.Keys);
		this.backGround = new BackGround(this);
		this.ui = new UI(this);

		this.EnemyInterval = 200;
		this.Timer = 0;
		this.debuger = true;
		this.gold = 0;
		this.heart = 10;
		this.distance = 0;
		this.award = 20;
		this.FontColor = 'black';
	}

	draw()
	{
		[this.backGround, this.ui, ...this.particular, ...this.enemies, ...this.death, ...this.effects, this.player].forEach(e => {
			e.draw();
		})
	}

	update(deltaTime)
	{
		[this.backGround, ...this.particular, ...this.enemies, ...this.death, ...this.effects, this.player].forEach(e => {
			e.update(deltaTime);
		})
		this.enemies = this.enemies.filter(obj => !obj.markForDelete);
		this.particular = this.particular.filter(obj => !obj.markForDelete);
		this.death = this.death.filter(obj => !obj.markForDelete);
		this.effects = this.effects.filter(obj => !obj.markForDelete);

		if (this.Timer > this.EnemyInterval)
		{
			this.#addNewEnemy();
			this.Timer = 0;
		}
		else this.Timer++;

		this.#addEffect();
		SpeedCtrl(this);
		IsCollision(this);
		if (this.debuger) Debug(this);
	}

	#addNewEnemy()
	{
		this.enemies.push(new Eye(this));
		if (Math.random() > 0.5 && this.gameSpeed > 0) this.enemies.push(new Frog(this));
	}

	#addEffect()
	{

		if (game.distance.toFixed(0) % game.award === 0 && game.distance > 10 && this.intoStore === false)
		{
			this.effects.push(new Heart(this, 0.5), new Portal(this), new Case(this));
			this.intoStore = true;
		}
		else if (Math.random() < 0.0005 && this.gameSpeed > 0 && this.effects.length === 0) this.effects.push(new Heart(this, 1));
	}
}

const game = new Game(ctx, cvs);
window.game = game;
let lastTime = 0;

function animate(timestamp)
{
	ctx.clearRect(0, 0, cvs.width, cvs.height);

	let deltaTime = timestamp - lastTime;
	lastTime = timestamp;
	game.draw();
	game.update(deltaTime);
	requestAnimationFrame(animate);
}

animate(0);

