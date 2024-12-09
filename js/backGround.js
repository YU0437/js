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
		else this.x -= this.game.gameSpeed * this.speedModify;
	}

}

export class BackGround
{
	constructor(game)
	{
		this.mapImagePaths = ["res/img/BackGround/WCP_1.png", "res/img/BackGround/WCP_2.png",
			"res/img/BackGround/WCP_3.png", "res/img/BackGround/WCP_4.png", "res/img/BackGround/WCP_5.png"];
		this.StoreImagePaths = ["res/img/BackGround/SacredLands/SacredLands_1.png", "res/img/BackGround/SacredLands/SacredLands_2.png",
			"res/img/BackGround/SacredLands/SacredLands_3.png", "res/img/BackGround/SacredLands/SacredLands_4.png", "res/img/BackGround/SacredLands/SacredLands_5.png"];
		this.width = 1080;
		this.height = 500;
		this.mapImageSpeed = [0, 0.2, 0.4, 0.6, 0.5];
		this.mapLayer = [];
		this.storeLayer = [];
		this.game = game;

		for (let i = 0; i < this.mapImagePaths.length; i++)
		{
			this.mapLayer.push(new Layer(this.game, this.mapImagePaths[i], this.width, this.height, this.mapImageSpeed[i]));
			this.storeLayer.push(new Layer(this.game, this.StoreImagePaths[i], this.width, this.height, this.mapImageSpeed[i]));
		}


	}

	draw()
	{
		const layer = this.game.intoStore ? this.storeLayer : this.mapLayer;
		layer.forEach(obj => {
			obj.draw();
		})
	}

	update()
	{
		const layer = this.game.intoStore ? this.storeLayer : this.mapLayer;
		layer.forEach(obj => {
			obj.update();
		})
	}

}
