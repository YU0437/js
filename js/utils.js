export function IsGround(player)
{
	return player.game.cvs.height - player.y <= player.height;
}

export function IsCollision(game)
{
	game.enemies.forEach(obj => {
		let dx = game.player.x - obj.x;
		let dy = game.player.y - obj.y;
		if (Math.sqrt(dx * dx + dy * dy) <= obj.radius + game.player.radius)
		{
			if (game.player.immunity === false)
			{
				game.player.SetState(7, 0);
			}
			else
			{
				game.gold++;
			}
			obj.markForDelete = true;
		}
	})
}

export function Debug(game)
{
	game.ctx.beginPath();
	game.ctx.arc(game.player.x + game.player.width * 0.5, game.player.y + game.player.height * 0.5, game.player.radius, 0, Math.PI * 2);
	game.ctx.stroke();
	game.ctx.closePath();
	game.enemies.forEach(obj => {
		game.ctx.beginPath();
		game.ctx.arc(obj.x + obj.width * 0.5, obj.y + obj.height * 0.5, obj.radius, 0, Math.PI * 2);
		game.ctx.stroke();
		game.ctx.closePath();
	})

}