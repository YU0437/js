function IsGround(player)
{
	return player.game.cvs.height - player.y <= player.height;
}