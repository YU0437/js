class Layer
{
	constructor(game, image, width, height, speedModify)
	{
		this.game = game;
		this.image = new Image();
		this.image.src = image;
		this.width = width;
		this.height = height;
		this.speedModify = speedModify;
		this.x = 0;
		this.y = 0;
	}

	draw()
	{
		this.game.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
		this.game.ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);

	}

	update()
	{

		if (this.x < -this.width) this.x = 0;
		else
		{
			this.x -= this.game.gameSpeed * this.speedModify;

		}

	}

}

export class BackGround
{
	constructor(game)
	{
		this.mapImagePaths = ["res/img/BackGround/WCP_1.png", "res/img/BackGround/WCP_2.png",
			"res/img/BackGround/WCP_3.png", "res/img/BackGround/WCP_4.png", "res/img/BackGround/WCP_5.png"];
		this.mapImageSpeed = [0, 0.2, 0.4, 0.6, 0.5];
		this.mapLayer = [];
		this.game = game;
		this.width = 1080;
		this.height = 500;
		for (let i = 0; i < this.mapImagePaths.length; i++)
		{
			this.mapLayer.push(new Layer(game, this.mapImagePaths[i], this.width, this.height, this.mapImageSpeed[i]))
		}


	}

	draw()
	{
		this.mapLayer.forEach(obj => {
			obj.draw();
		})

	}

	update()
	{
		this.mapLayer.forEach(obj => {
			obj.update();
		})
	}

}