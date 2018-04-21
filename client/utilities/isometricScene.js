'use strict';

class IsometricScene extends Phaser.Scene {
    constructor(configuration) {
        super(configuration);
        this.map = null;
    }


    /**
     * Constructs the tiles (from a single named tileset) for the given named map.
     * @param   {string} mapName the name of a map already loaded into the cache.
     * @param   {string} tilesetName the name of a tileset already loaded into the cache.
     * @param   {?array} objects an optional array into which to push created tiles.
     */
    buildMap(mapName, tilesetName) {
        this.map = null;

        try {
            var map = this.cache.json.get(mapName);

            if (!map) {
                throw Error(`Map not found in cache.`);
            }
            var tiles = [];
            var tileWidthHalf = map.tilewidth / 2;
            var tileHeightHalf = map.tileheight / 2;

            var layer = map.layers[0];
            var data = layer.data;
            var mapWidth = layer.width;
            var mapHeight = layer.height;

            var centreX = mapWidth * tileWidthHalf;
            var centreY = tileHeightHalf;
            
            for (var index = 0, y = 0; y < mapHeight; ++y) {
                for (var x = 0; x < mapWidth; ++x, ++index) {
                    var tileId = data[index] - 1;

                    var tileX = (x - y) * tileWidthHalf + centreX;
                    var tileY = (x + y) * tileHeightHalf + centreY;

                    var tile = this.add.image(tileX, tileY, tilesetName, tileId);

                    tile.depth = tileY;
                    tiles.push(tile);
                }
            }

            this.map = {
                centreX: centreX,
                centreY: centreY,
                data: map,
                mapHeight: mapHeight,
                mapWidth: mapWidth,
                tileHeightHalf: tileHeightHalf,
                tileWidthHalf: tileWidthHalf,
                tiles: tiles
            };
        } catch (error) {
            throw Error(`Failed to load map "${mapName}": ${error.message}`);
        }
    }


    hitTile(cameraX, cameraY, camera) {
        if (!this.map) {
            throw Error(`Map not yet built for scene.`);
        }
        var map = this.map;

        camera = camera || this.cameras.main;

        var x = (cameraX - (camera.x + map.centreX)) / map.tileWidthHalf;
        var y = (cameraY - (camera.y + map.centreY)) / map.tileHeightHalf;
       
        var tileX = Math.floor((1 + x + y) / 2);
        var tileY = Math.floor((1 + y - x) / 2);
        var tileIndex = tileX >= 0 && tileY >= 0 && tileX < map.mapWidth && tileY < map.mapHeight? map.mapWidth * tileY + tileX: -1;

        return tileIndex < 0 || tileIndex >= map.tiles.length? null: {
            sprite: map.tiles[tileIndex],
            tileX: tileX,
            tileY: tileY
        };
    }
}

export default IsometricScene;