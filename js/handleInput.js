export class InputHandle
{
	constructor()
	{
		this.Keys = [];
		window.addEventListener('keydown', ev => {
			if ((ev.key === 'w' || ev.key === 'a' || ev.key === 's' || ev.key === 'd') && this.Keys.indexOf(ev.key) === -1) this.Keys.push(ev.key);
		})
		window.addEventListener('keyup', ev => {
			this.Keys.splice(this.Keys.indexOf(ev.key), 1);
		})
	}
}