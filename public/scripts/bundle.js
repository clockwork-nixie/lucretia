// [AIV_SHORT]  Build version: 0.0.6 - Wednesday, April 4th, 2018, 11:09:27 AM  
 /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./client/application.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./client/application.js":
/*!*******************************!*\
  !*** ./client/application.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _main = __webpack_require__(/*! ./scenes/main */ \"./client/scenes/main.js\");\n\nvar _main2 = _interopRequireDefault(_main);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nconsole.log('%c Clockwork Nixie v0.0.6 %c https://github.com/clockwork-nixie', 'background: linear-gradient(yellow, red); color: white; border-radius: 7px', 'background: white; color: black;');\n\nvar configuration = {\n    type: Phaser.AUTO,\n    backgroundColor: '#ababab',\n    parent: 'content',\n    width: 800,\n    height: 600,\n    scene: [_main2.default]\n};\n\nvar game = new Phaser.Game(configuration);\n\n//# sourceURL=webpack:///./client/application.js?");

/***/ }),

/***/ "./client/scenes/main.js":
/*!*******************************!*\
  !*** ./client/scenes/main.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _isometricScene = __webpack_require__(/*! ../utilities/isometricScene */ \"./client/utilities/isometricScene.js\");\n\nvar _isometricScene2 = _interopRequireDefault(_isometricScene);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar MainScene = function (_IsometricScene) {\n    _inherits(MainScene, _IsometricScene);\n\n    function MainScene() {\n        _classCallCheck(this, MainScene);\n\n        var _this = _possibleConstructorReturn(this, (MainScene.__proto__ || Object.getPrototypeOf(MainScene)).call(this, { key: 'MainScene' }));\n\n        _this.mouse = { x: 0, y: 0 };\n        _this.currentTile = null;\n        return _this;\n    }\n\n    _createClass(MainScene, [{\n        key: 'create',\n        value: function create() {\n            this.buildMap('map', 'tiles');\n            this.cameras.main.setSize(1600, 800);\n\n            this.input.on('pointermove', function (pointer) {\n                this.mouse.x = pointer.x;\n                this.mouse.y = pointer.y;\n            }, this);\n\n            this.input.on('pointerdown', function (pointer) {\n                var hit = this.hitTile(this.mouse.x, this.mouse.y);\n\n                if (hit) {\n                    if (this.currentTile) {\n                        this.currentTile.sprite.clearTint();\n\n                        if (this.currentTile.sprite !== hit.sprite) {\n                            hit.sprite.setTint(0xFF0000);\n                            this.currentTile = hit;\n                        } else {\n                            this.currentTile = null;\n                        }\n                    } else {\n                        hit.sprite.setTint(0xFF0000);\n                        this.currentTile = hit;\n                    }\n                }\n            }, this);\n        }\n    }, {\n        key: 'preload',\n        value: function preload() {\n            this.load.json('map', '../assets/isometric-grass-and-water.json');\n            this.load.spritesheet('tiles', '../assets/isometric-grass-and-water.png', { frameWidth: 64, frameHeight: 64 });\n        }\n    }, {\n        key: 'update',\n        value: function update() {\n            if (this.input.activePointer.isDown) {\n                if (this.origDragPoint) {\n                    this.cameras.main.x -= this.origDragPoint.x - this.input.activePointer.position.x;\n                    this.cameras.main.y -= this.origDragPoint.y - this.input.activePointer.position.y;\n                }\n                this.origDragPoint = this.input.activePointer.position.clone();\n            } else {\n                this.origDragPoint = null;\n            }\n        }\n    }]);\n\n    return MainScene;\n}(_isometricScene2.default);\n\nexports.default = MainScene;\n\n//# sourceURL=webpack:///./client/scenes/main.js?");

/***/ }),

/***/ "./client/utilities/isometricScene.js":
/*!********************************************!*\
  !*** ./client/utilities/isometricScene.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar IsometricScene = function (_Phaser$Scene) {\n    _inherits(IsometricScene, _Phaser$Scene);\n\n    function IsometricScene(configuration) {\n        _classCallCheck(this, IsometricScene);\n\n        var _this = _possibleConstructorReturn(this, (IsometricScene.__proto__ || Object.getPrototypeOf(IsometricScene)).call(this, configuration));\n\n        _this.map = null;\n        return _this;\n    }\n\n    /**\r\n     * Constructs the tiles (from a single named tileset) for the given named map.\r\n     * @param   {string} mapName the name of a map already loaded into the cache.\r\n     * @param   {string} tilesetName the name of a tileset already loaded into the cache.\r\n     * @param   {?array} objects an optional array into which to push created tiles.\r\n     */\n\n\n    _createClass(IsometricScene, [{\n        key: \"buildMap\",\n        value: function buildMap(mapName, tilesetName) {\n            this.map = null;\n\n            try {\n                var map = this.cache.json.get(mapName);\n\n                if (!map) {\n                    throw Error(\"Map not found in cache.\");\n                }\n                var tiles = [];\n                var tileWidthHalf = map.tilewidth / 2;\n                var tileHeightHalf = map.tileheight / 2;\n\n                var layer = map.layers[0];\n                var data = layer.data;\n                var mapWidth = layer.width;\n                var mapHeight = layer.height;\n\n                var centreX = mapWidth * tileWidthHalf;\n                var centreY = tileHeightHalf;\n\n                for (var index = 0, y = 0; y < mapHeight; ++y) {\n                    for (var x = 0; x < mapWidth; ++x, ++index) {\n                        var tileId = data[index] - 1;\n\n                        var tileX = (x - y) * tileWidthHalf + centreX;\n                        var tileY = (x + y) * tileHeightHalf + centreY;\n\n                        var tile = this.add.image(tileX, tileY, tilesetName, tileId);\n\n                        tile.depth = tileY;\n                        tiles.push(tile);\n                    }\n                }\n\n                this.map = {\n                    centreX: centreX,\n                    centreY: centreY,\n                    data: map,\n                    mapHeight: mapHeight,\n                    mapWidth: mapWidth,\n                    tileHeightHalf: tileHeightHalf,\n                    tileWidthHalf: tileWidthHalf,\n                    tiles: tiles\n                };\n            } catch (error) {\n                throw Error(\"Failed to load map \\\"\" + mapName + \"\\\": \" + error.message);\n            }\n        }\n    }, {\n        key: \"hitTile\",\n        value: function hitTile(cameraX, cameraY, camera) {\n            if (!this.map) {\n                throw Error(\"Map not yet built for scene.\");\n            }\n            var map = this.map;\n\n            camera = camera || this.cameras.main;\n\n            var x = (cameraX - (camera.x + map.centreX)) / map.tileWidthHalf;\n            var y = (cameraY - (camera.y + map.centreY)) / map.tileHeightHalf;\n\n            var tileX = Math.floor((1 + x + y) / 2);\n            var tileY = Math.floor((1 + y - x) / 2);\n            var tileIndex = tileX >= 0 && tileY >= 0 && tileX < map.mapWidth && tileY < map.mapHeight ? map.mapWidth * tileY + tileX : -1;\n\n            return tileIndex < 0 || tileIndex >= map.tiles.length ? null : {\n                sprite: map.tiles[tileIndex],\n                tileX: tileX,\n                tileY: tileY\n            };\n        }\n    }]);\n\n    return IsometricScene;\n}(Phaser.Scene);\n\nexports.default = IsometricScene;\n\n//# sourceURL=webpack:///./client/utilities/isometricScene.js?");

/***/ })

/******/ }); 