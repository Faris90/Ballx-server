function EjectedMass(gameServer, x, y, size, color) {
	this.gameServer = gameServer;
	this.flag = 0;
	this.id = this.gameServer.createCellID++;
	this.type = 3;
	this.isVirus = 0;
	this.x = x;
	this.y = y;
	this.size = size;
	this.mass = size * size;
	this.color = color;
	this.killer = null;
	this.boostX = 0;
	this.boostY = 0;
	this.born = this.gameServer.tickCounter;
	this.quad = this.gameServer.quad[this.x * this.gameServer.invQuadSizeX >> 0][this.y * this.gameServer.invQuadSizeY >> 0];
	this.quadIndex = this.quad.length;
	this.index = this.gameServer.nodesEjected.length;
	this.quad.push(this);
	this.gameServer.nodesEjected.push(this);
}

module.exports = EjectedMass;

EjectedMass.prototype.getName = function() {
	return "";
}

EjectedMass.prototype.onEaten = function(cell) {
	cell.mass += this.mass;
	cell.size = Math.sqrt(cell.mass);
	this.killer = cell;
	this.quad[this.quadIndex] = this.quad[this.quad.length - 1];
	this.quad[this.quadIndex].quadIndex = this.quadIndex;
	this.quad.pop();
	this.gameServer.nodesEjected[this.index] = this.gameServer.nodesEjected[this.gameServer.nodesEjected.length - 1];
	this.gameServer.nodesEjected[this.index].index = this.index;
	this.gameServer.nodesEjected.pop();
}
