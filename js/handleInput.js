export class InputHandle
{
	constructor(game)
	{
		this.game = game;
		this.Keys = [];
		window.addEventListener('keydown', ev => {
			if ((ev.key === 'w' || ev.key === 'a' || ev.key === 's' || ev.key === 'd' || ev.key === 'f') && this.Keys.indexOf(ev.key) === -1) this.Keys.push(ev.key);
			if (ev.key === 'x') this.game.debuger = !this.game.debuger;
		})
		window.addEventListener('keyup', ev => {
			this.Keys.splice(this.Keys.indexOf(ev.key), 1);
		})
	}
}