//检验是否处于地面
export function IsGround(player)
{
	return player.game.cvs.height - player.y <= player.height;
}

//碰撞检测
export function IsCollision(game)
{
	[...game.enemies, ...game.effects].forEach(obj => {
		let dx = game.player.x - obj.x;
		let dy = game.player.y - obj.y;
		if (Math.sqrt(dx * dx + dy * dy) <= obj.radius + game.player.radius) obj.enter();
	})

}

//debug模式
export function Debug(game)
{
	[...game.enemies, ...game.effects, game.player].forEach(obj => {
		game.ctx.beginPath();
		game.ctx.arc(obj.x + obj.width * 0.5, obj.y + obj.height * 0.5, obj.radius, 0, Math.PI * 2);
		game.ctx.stroke();
		game.ctx.closePath();
	})
}

//游戏速度控制
export function SpeedCtrl(game)
{
	game.gameSpeed *= !game.intoStore;
	game.distance += game.gameSpeed * 0.01;
	if (game.distance.toFixed(0) % 10 === 0) game.MaxGameSpeed += 0.0005;
}