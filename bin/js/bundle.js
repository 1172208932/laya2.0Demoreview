var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**This class is automatically generated by LayaAirIDE, please do not make any modifications. */


var _homeView = require("./home/homeView");

var _homeView2 = _interopRequireDefault(_homeView);

var _controul = require("./home/controul");

var _controul2 = _interopRequireDefault(_controul);

var _boxDown = require("./home/boxDown");

var _boxDown2 = _interopRequireDefault(_boxDown);

var _zidan = require("./home/zidan");

var _zidan2 = _interopRequireDefault(_zidan);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameConfig = function () {
    function GameConfig() {
        _classCallCheck(this, GameConfig);
    }

    _createClass(GameConfig, null, [{
        key: "init",
        value: function init() {
            //注册Script或者Runtime引用
            var reg = Laya.ClassUtils.regClass;
            reg("home/homeView.js", _homeView2.default);
            reg("home/controul.js", _controul2.default);
            reg("home/boxDown.js", _boxDown2.default);
            reg("home/zidan.js", _zidan2.default);
        }
    }]);

    return GameConfig;
}();

exports.default = GameConfig;

GameConfig.width = 750;
GameConfig.height = 1334;
GameConfig.scaleMode = "fixedwidth";
GameConfig.screenMode = "none";
GameConfig.alignV = "top";
GameConfig.alignH = "left";
GameConfig.startScene = "homeView.scene";
GameConfig.sceneRoot = "";
GameConfig.debug = false;
GameConfig.stat = false;
GameConfig.physicsDebug = false;
GameConfig.exportSceneToJson = true;

GameConfig.init();

},{"./home/boxDown":3,"./home/controul":4,"./home/homeView":5,"./home/zidan":6}],2:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GameConfig = require("./GameConfig");

var _GameConfig2 = _interopRequireDefault(_GameConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Main = function () {
	function Main() {
		_classCallCheck(this, Main);

		//根据IDE设置初始化引擎		
		if (window["Laya3D"]) Laya3D.init(_GameConfig2.default.width, _GameConfig2.default.height);else Laya.init(_GameConfig2.default.width, _GameConfig2.default.height, Laya["WebGL"]);
		Laya["Physics"] && Laya["Physics"].enable();
		Laya["DebugPanel"] && Laya["DebugPanel"].enable();
		Laya.stage.scaleMode = _GameConfig2.default.scaleMode;
		Laya.stage.screenMode = _GameConfig2.default.screenMode;
		Laya.stage.alignV = _GameConfig2.default.alignV;
		Laya.stage.alignH = _GameConfig2.default.alignH;
		//兼容微信不支持加载scene后缀场景
		Laya.URL.exportSceneToJson = _GameConfig2.default.exportSceneToJson;

		//打开调试面板（通过IDE设置调试模式，或者url地址增加debug=true参数，均可打开调试面板）
		if (_GameConfig2.default.debug || Laya.Utils.getQueryString("debug") == "true") Laya.enableDebugPanel();
		if (_GameConfig2.default.physicsDebug && Laya["PhysicsDebugDraw"]) Laya["PhysicsDebugDraw"].enable();
		if (_GameConfig2.default.stat) Laya.Stat.show();
		Laya.alertGlobalError = true;

		//激活资源版本控制，version.json由IDE发布功能自动生成，如果没有也不影响后续流程
		Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
	}

	_createClass(Main, [{
		key: "onVersionLoaded",
		value: function onVersionLoaded() {
			//激活大小图映射，加载小图的时候，如果发现小图在大图合集里面，则优先加载大图合集，而不是小图
			Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
		}
	}, {
		key: "onConfigLoaded",
		value: function onConfigLoaded() {
			//加载IDE指定的场景
			_GameConfig2.default.startScene && Laya.Scene.open(_GameConfig2.default.startScene);
		}
	}]);

	return Main;
}();
//激活启动类


new Main();

},{"./GameConfig":1}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _homeView = require("./homeView");

var _homeView2 = _interopRequireDefault(_homeView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var boxDown = function (_Laya$Script) {
    _inherits(boxDown, _Laya$Script);

    function boxDown() {
        _classCallCheck(this, boxDown);

        return _possibleConstructorReturn(this, (boxDown.__proto__ || Object.getPrototypeOf(boxDown)).call(this));
    }

    _createClass(boxDown, [{
        key: "onUpdate",
        value: function onUpdate() {
            this.owner.rotation++;
        }
    }, {
        key: "onTriggerEnter",
        value: function onTriggerEnter(other, self, contact) {
            var owner = this.owner;
            owner.removeSelf();
            if (other.label === "groand") {
                owner.removeSelf();
                _homeView2.default.zhi.stopgame();
            }
        }
    }, {
        key: "onDisable",
        value: function onDisable() {
            Laya.Pool.recover("boxDown", this.owner);
        }
    }]);

    return boxDown;
}(Laya.Script);

exports.default = boxDown;

},{"./homeView":5}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _zidan = require('./zidan');

var _zidan2 = _interopRequireDefault(_zidan);

var _boxDown = require('./boxDown');

var _boxDown2 = _interopRequireDefault(_boxDown);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var controul = function (_Laya$Script) {
    _inherits(controul, _Laya$Script);

    /** @prop {name:zidan,tips:"子弹预制体对象",type:Prefab}*/
    /** @prop {name:boxDown,tips:"子弹预制体对象",type:Prefab}*/

    function controul() {
        _classCallCheck(this, controul);

        return _possibleConstructorReturn(this, (controul.__proto__ || Object.getPrototypeOf(controul)).call(this));
    }

    _createClass(controul, [{
        key: 'onEnable',
        value: function onEnable() {
            this._time = Date.now();
            this.createBoxInterval = 1000;
            this._gameBox = this.owner.getChildByName("gamebox");
        }
    }, {
        key: 'onUpdate',
        value: function onUpdate() {
            var now = Date.now();
            if (now - this._time > this.createBoxInterval) {
                this._time = now;
                this.createBox();
            }
        }
    }, {
        key: 'createBox',
        value: function createBox() {
            var box = Laya.Pool.getItemByCreateFun("boxDown", this.boxDown.create, this.boxDown);
            box.pos(Math.random() * (Laya.stage.width - 100), -100);
            this._gameBox.addChild(box);
        }
    }, {
        key: 'onStageClick',
        value: function onStageClick(e) {
            // this.enabled = true;        
            e.stopPropagation();
            var fly = Laya.Pool.getItemByCreateFun('zidan', this.zidan.create, this.zidan);
            fly.pos(Laya.stage.mouseX, Laya.stage.mouseY);
            this._gameBox.addChild(fly);
        }
    }]);

    return controul;
}(Laya.Script);

exports.default = controul;

},{"./boxDown":3,"./zidan":6}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _controul = require("./controul");

var _controul2 = _interopRequireDefault(_controul);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var homeView = function (_Laya$Scene) {
    _inherits(homeView, _Laya$Scene);

    function homeView() {
        _classCallCheck(this, homeView);

        return _possibleConstructorReturn(this, (homeView.__proto__ || Object.getPrototypeOf(homeView)).call(this));
    }

    _createClass(homeView, [{
        key: "onEnable",
        value: function onEnable() {
            homeView.zhi = this;
            this._control = this.getComponent(_controul2.default);
            this._control.enabled = false;
            this.beginGame.on(Laya.Event.MOUSE_DOWN, this, function () {

                console.log(this._control.enabled);
                this._control.enabled = true;
                console.log(this._control.enabled);
            });
        }
    }, {
        key: "stopgame",
        value: function stopgame() {
            this._control.enabled = false;
        }
    }]);

    return homeView;
}(Laya.Scene);

exports.default = homeView;

},{"./controul":4}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Zidan = function (_Laya$Script) {
    _inherits(Zidan, _Laya$Script);

    function Zidan() {
        _classCallCheck(this, Zidan);

        return _possibleConstructorReturn(this, (Zidan.__proto__ || Object.getPrototypeOf(Zidan)).call(this));
    }

    _createClass(Zidan, [{
        key: "onEnable",
        value: function onEnable() {
            var sudo = this.owner.getComponent(Laya.RigidBody);
            sudo.setVelocity({ x: 0, y: -10 });
        }
    }, {
        key: "onTriggerEnter",
        value: function onTriggerEnter(other, self, contact) {
            this.owner.removeSelf();
        }
    }, {
        key: "onUpdate",
        value: function onUpdate() {
            if (this.owner.y < -10) {
                this.owner.removeSelf();
            }
        }
    }, {
        key: "onDisable",
        value: function onDisable() {
            Laya.Pool.recover("zidan", this.owner);
        }
    }]);

    return Zidan;
}(Laya.Script);

exports.default = Zidan;

},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL0xheWFCb3gyLjAvcmVzb3VyY2VzL2FwcC9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwic3JjL0dhbWVDb25maWcuanMiLCJzcmMvTWFpbi5qcyIsInNyYy9ob21lL2JveERvd24uanMiLCJzcmMvaG9tZS9jb250cm91bC5qcyIsInNyYy9ob21lL2hvbWVWaWV3LmpzIiwic3JjL2hvbWUvemlkYW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztxakJDVkE7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7OztJQUVxQixVOzs7Ozs7OytCQUNIO0FBQ1Y7QUFDQSxnQkFBSSxNQUFNLEtBQUssVUFBTCxDQUFnQixRQUExQjtBQUNOLGdCQUFJLGtCQUFKLEVBQXVCLGtCQUF2QjtBQUNBLGdCQUFJLGtCQUFKLEVBQXVCLGtCQUF2QjtBQUNBLGdCQUFJLGlCQUFKLEVBQXNCLGlCQUF0QjtBQUNBLGdCQUFJLGVBQUosRUFBb0IsZUFBcEI7QUFDRzs7Ozs7O2tCQVJnQixVOztBQVVyQixXQUFXLEtBQVgsR0FBbUIsR0FBbkI7QUFDQSxXQUFXLE1BQVgsR0FBb0IsSUFBcEI7QUFDQSxXQUFXLFNBQVgsR0FBc0IsWUFBdEI7QUFDQSxXQUFXLFVBQVgsR0FBd0IsTUFBeEI7QUFDQSxXQUFXLE1BQVgsR0FBb0IsS0FBcEI7QUFDQSxXQUFXLE1BQVgsR0FBb0IsTUFBcEI7QUFDQSxXQUFXLFVBQVgsR0FBd0IsZ0JBQXhCO0FBQ0EsV0FBVyxTQUFYLEdBQXVCLEVBQXZCO0FBQ0EsV0FBVyxLQUFYLEdBQW1CLEtBQW5CO0FBQ0EsV0FBVyxJQUFYLEdBQWtCLEtBQWxCO0FBQ0EsV0FBVyxZQUFYLEdBQTBCLEtBQTFCO0FBQ0EsV0FBVyxpQkFBWCxHQUErQixJQUEvQjs7QUFFQSxXQUFXLElBQVg7Ozs7Ozs7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QUwsQ0FBYyxPQUFkLEdBQXdCLElBQXhCO0FBQ0Esd0JBQVEsR0FBUixDQUFjLEtBQUssUUFBTCxDQUFjLE9BQTVCO0FBQ0gsYUFMRDtBQU1IOzs7bUNBQ1M7QUFDTixpQkFBSyxRQUFMLENBQWMsT0FBZCxHQUF3QixLQUF4QjtBQUNIOzs7O0VBakJpQyxLQUFLLEs7O2tCQUF0QixROzs7Ozs7Ozs7Ozs7Ozs7OztJQ0ZBLEs7OztBQUNqQixxQkFBYTtBQUFBOztBQUFBO0FBQVM7Ozs7bUNBQ1o7QUFDTixnQkFBSSxPQUFPLEtBQUssS0FBTCxDQUFXLFlBQVgsQ0FBd0IsS0FBSyxTQUE3QixDQUFYO0FBQ0EsaUJBQUssV0FBTCxDQUFpQixFQUFDLEdBQUUsQ0FBSCxFQUFLLEdBQUUsQ0FBQyxFQUFSLEVBQWpCO0FBQ0g7Ozt1Q0FDYyxLLEVBQU8sSSxFQUFNLE8sRUFBUztBQUNqQyxpQkFBSyxLQUFMLENBQVcsVUFBWDtBQUNIOzs7bUNBRVU7QUFDUCxnQkFBSSxLQUFLLEtBQUwsQ0FBVyxDQUFYLEdBQWUsQ0FBQyxFQUFwQixFQUF3QjtBQUNwQixxQkFBSyxLQUFMLENBQVcsVUFBWDtBQUNIO0FBQ0o7OztvQ0FDVztBQUNSLGlCQUFLLElBQUwsQ0FBVSxPQUFWLENBQWtCLE9BQWxCLEVBQTJCLEtBQUssS0FBaEM7QUFDSDs7OztFQWpCOEIsS0FBSyxNOztrQkFBbkIsSyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsidmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxuICAgIH07XHJcbn0pKCk7XHJcbihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvKipUaGlzIGNsYXNzIGlzIGF1dG9tYXRpY2FsbHkgZ2VuZXJhdGVkIGJ5IExheWFBaXJJREUsIHBsZWFzZSBkbyBub3QgbWFrZSBhbnkgbW9kaWZpY2F0aW9ucy4gKi9cclxuaW1wb3J0IGhvbWVWaWV3IGZyb20gXCIuL2hvbWUvaG9tZVZpZXdcIlxuaW1wb3J0IGNvbnRyb3VsIGZyb20gXCIuL2hvbWUvY29udHJvdWxcIlxuaW1wb3J0IGJveERvd24gZnJvbSBcIi4vaG9tZS9ib3hEb3duXCJcbmltcG9ydCB6aWRhbiBmcm9tIFwiLi9ob21lL3ppZGFuXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVDb25maWcge1xyXG4gICAgc3RhdGljIGluaXQoKSB7XHJcbiAgICAgICAgLy/ms6jlhoxTY3JpcHTmiJbogIVSdW50aW1l5byV55SoXHJcbiAgICAgICAgbGV0IHJlZyA9IExheWEuQ2xhc3NVdGlscy5yZWdDbGFzcztcclxuXHRcdHJlZyhcImhvbWUvaG9tZVZpZXcuanNcIixob21lVmlldyk7XG5cdFx0cmVnKFwiaG9tZS9jb250cm91bC5qc1wiLGNvbnRyb3VsKTtcblx0XHRyZWcoXCJob21lL2JveERvd24uanNcIixib3hEb3duKTtcblx0XHRyZWcoXCJob21lL3ppZGFuLmpzXCIsemlkYW4pO1xyXG4gICAgfVxyXG59XHJcbkdhbWVDb25maWcud2lkdGggPSA3NTA7XHJcbkdhbWVDb25maWcuaGVpZ2h0ID0gMTMzNDtcclxuR2FtZUNvbmZpZy5zY2FsZU1vZGUgPVwiZml4ZWR3aWR0aFwiO1xyXG5HYW1lQ29uZmlnLnNjcmVlbk1vZGUgPSBcIm5vbmVcIjtcclxuR2FtZUNvbmZpZy5hbGlnblYgPSBcInRvcFwiO1xyXG5HYW1lQ29uZmlnLmFsaWduSCA9IFwibGVmdFwiO1xyXG5HYW1lQ29uZmlnLnN0YXJ0U2NlbmUgPSBcImhvbWVWaWV3LnNjZW5lXCI7XHJcbkdhbWVDb25maWcuc2NlbmVSb290ID0gXCJcIjtcclxuR2FtZUNvbmZpZy5kZWJ1ZyA9IGZhbHNlO1xyXG5HYW1lQ29uZmlnLnN0YXQgPSBmYWxzZTtcclxuR2FtZUNvbmZpZy5waHlzaWNzRGVidWcgPSBmYWxzZTtcclxuR2FtZUNvbmZpZy5leHBvcnRTY2VuZVRvSnNvbiA9IHRydWU7XHJcblxyXG5HYW1lQ29uZmlnLmluaXQoKTtcclxuIiwiaW1wb3J0IEdhbWVDb25maWcgZnJvbSBcIi4vR2FtZUNvbmZpZ1wiO1xyXG5jbGFzcyBNYWluIHtcclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHRcdC8v5qC55o2uSURF6K6+572u5Yid5aeL5YyW5byV5pOOXHRcdFxyXG5cdFx0aWYgKHdpbmRvd1tcIkxheWEzRFwiXSkgTGF5YTNELmluaXQoR2FtZUNvbmZpZy53aWR0aCwgR2FtZUNvbmZpZy5oZWlnaHQpO1xyXG5cdFx0ZWxzZSBMYXlhLmluaXQoR2FtZUNvbmZpZy53aWR0aCwgR2FtZUNvbmZpZy5oZWlnaHQsIExheWFbXCJXZWJHTFwiXSk7XHJcblx0XHRMYXlhW1wiUGh5c2ljc1wiXSAmJiBMYXlhW1wiUGh5c2ljc1wiXS5lbmFibGUoKTtcclxuXHRcdExheWFbXCJEZWJ1Z1BhbmVsXCJdICYmIExheWFbXCJEZWJ1Z1BhbmVsXCJdLmVuYWJsZSgpO1xyXG5cdFx0TGF5YS5zdGFnZS5zY2FsZU1vZGUgPSBHYW1lQ29uZmlnLnNjYWxlTW9kZTtcclxuXHRcdExheWEuc3RhZ2Uuc2NyZWVuTW9kZSA9IEdhbWVDb25maWcuc2NyZWVuTW9kZTtcclxuXHRcdExheWEuc3RhZ2UuYWxpZ25WID0gR2FtZUNvbmZpZy5hbGlnblY7XHJcblx0XHRMYXlhLnN0YWdlLmFsaWduSCA9IEdhbWVDb25maWcuYWxpZ25IO1xyXG5cdFx0Ly/lhbzlrrnlvq7kv6HkuI3mlK/mjIHliqDovb1zY2VuZeWQjue8gOWcuuaZr1xyXG5cdFx0TGF5YS5VUkwuZXhwb3J0U2NlbmVUb0pzb24gPSBHYW1lQ29uZmlnLmV4cG9ydFNjZW5lVG9Kc29uO1xyXG5cclxuXHRcdC8v5omT5byA6LCD6K+V6Z2i5p2/77yI6YCa6L+HSURF6K6+572u6LCD6K+V5qih5byP77yM5oiW6ICFdXJs5Zyw5Z2A5aKe5YqgZGVidWc9dHJ1ZeWPguaVsO+8jOWdh+WPr+aJk+W8gOiwg+ivlemdouadv++8iVxyXG5cdFx0aWYgKEdhbWVDb25maWcuZGVidWcgfHwgTGF5YS5VdGlscy5nZXRRdWVyeVN0cmluZyhcImRlYnVnXCIpID09IFwidHJ1ZVwiKSBMYXlhLmVuYWJsZURlYnVnUGFuZWwoKTtcclxuXHRcdGlmIChHYW1lQ29uZmlnLnBoeXNpY3NEZWJ1ZyAmJiBMYXlhW1wiUGh5c2ljc0RlYnVnRHJhd1wiXSkgTGF5YVtcIlBoeXNpY3NEZWJ1Z0RyYXdcIl0uZW5hYmxlKCk7XHJcblx0XHRpZiAoR2FtZUNvbmZpZy5zdGF0KSBMYXlhLlN0YXQuc2hvdygpO1xyXG5cdFx0TGF5YS5hbGVydEdsb2JhbEVycm9yID0gdHJ1ZTtcclxuXHJcblx0XHQvL+a/gOa0u+i1hOa6kOeJiOacrOaOp+WItu+8jHZlcnNpb24uanNvbueUsUlEReWPkeW4g+WKn+iDveiHquWKqOeUn+aIkO+8jOWmguaenOayoeacieS5n+S4jeW9seWTjeWQjue7rea1geeoi1xyXG5cdFx0TGF5YS5SZXNvdXJjZVZlcnNpb24uZW5hYmxlKFwidmVyc2lvbi5qc29uXCIsIExheWEuSGFuZGxlci5jcmVhdGUodGhpcywgdGhpcy5vblZlcnNpb25Mb2FkZWQpLCBMYXlhLlJlc291cmNlVmVyc2lvbi5GSUxFTkFNRV9WRVJTSU9OKTtcclxuXHR9XHJcblxyXG5cdG9uVmVyc2lvbkxvYWRlZCgpIHtcclxuXHRcdC8v5r+A5rS75aSn5bCP5Zu+5pig5bCE77yM5Yqg6L295bCP5Zu+55qE5pe25YCZ77yM5aaC5p6c5Y+R546w5bCP5Zu+5Zyo5aSn5Zu+5ZCI6ZuG6YeM6Z2i77yM5YiZ5LyY5YWI5Yqg6L295aSn5Zu+5ZCI6ZuG77yM6ICM5LiN5piv5bCP5Zu+XHJcblx0XHRMYXlhLkF0bGFzSW5mb01hbmFnZXIuZW5hYmxlKFwiZmlsZWNvbmZpZy5qc29uXCIsIExheWEuSGFuZGxlci5jcmVhdGUodGhpcywgdGhpcy5vbkNvbmZpZ0xvYWRlZCkpO1xyXG5cdH1cclxuXHJcblx0b25Db25maWdMb2FkZWQoKSB7XHJcblx0XHQvL+WKoOi9vUlEReaMh+WumueahOWcuuaZr1xyXG5cdFx0R2FtZUNvbmZpZy5zdGFydFNjZW5lICYmIExheWEuU2NlbmUub3BlbihHYW1lQ29uZmlnLnN0YXJ0U2NlbmUpO1xyXG5cdH1cclxufVxyXG4vL+a/gOa0u+WQr+WKqOexu1xyXG5uZXcgTWFpbigpO1xyXG4iLCJpbXBvcnQgaG9tZVZpZXcgZnJvbSAnLi9ob21lVmlldydcclxuICAgIGV4cG9ydCBkZWZhdWx0IGNsYXNzIGJveERvd24gZXh0ZW5kcyBMYXlhLlNjcmlwdCB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpXHJcbiAgICB9XHJcbiAgICBvblVwZGF0ZSgpe1xyXG4gICAgICAgIHRoaXMub3duZXIucm90YXRpb24rKztcclxuICAgIH1cclxuICAgIG9uVHJpZ2dlckVudGVyKG90aGVyLCBzZWxmLCBjb250YWN0KSB7XHJcbiAgICAgICAgdmFyIG93bmVyID0gdGhpcy5vd25lcjtcclxuICAgICAgICBvd25lci5yZW1vdmVTZWxmKCk7XHJcbiAgICAgICAgaWYgKG90aGVyLmxhYmVsID09PSBcImdyb2FuZFwiKSB7XHJcbiAgICAgICAgICAgIG93bmVyLnJlbW92ZVNlbGYoKTtcclxuICAgICAgICAgICAgaG9tZVZpZXcuemhpLnN0b3BnYW1lKClcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBvbkRpc2FibGUoKSB7XHJcbiAgICAgICAgTGF5YS5Qb29sLnJlY292ZXIoXCJib3hEb3duXCIsIHRoaXMub3duZXIpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IFppZGFuIGZyb20gJy4vemlkYW4nO1xyXG5pbXBvcnQgQm94RG93biBmcm9tICcuL2JveERvd24nXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGNvbnRyb3VsIGV4dGVuZHMgTGF5YS5TY3JpcHQge1xyXG4gICAgLyoqIEBwcm9wIHtuYW1lOnppZGFuLHRpcHM6XCLlrZDlvLnpooTliLbkvZPlr7nosaFcIix0eXBlOlByZWZhYn0qL1xyXG4gICAgLyoqIEBwcm9wIHtuYW1lOmJveERvd24sdGlwczpcIuWtkOW8uemihOWItuS9k+WvueixoVwiLHR5cGU6UHJlZmFifSovXHJcbiAgICBcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKClcclxuICAgIH1cclxuICAgIG9uRW5hYmxlKCkge1xyXG4gICAgICAgIHRoaXMuX3RpbWUgPSBEYXRlLm5vdygpO1xyXG4gICAgICAgIHRoaXMuY3JlYXRlQm94SW50ZXJ2YWwgPSAxMDAwO1xyXG4gICAgICAgIHRoaXMuX2dhbWVCb3ggPSB0aGlzLm93bmVyLmdldENoaWxkQnlOYW1lKFwiZ2FtZWJveFwiKTtcclxuICAgIH1cclxuICAgIG9uVXBkYXRlKCkge1xyXG4gICAgICAgIGxldCBub3cgPSBEYXRlLm5vdygpO1xyXG4gICAgICAgIGlmIChub3cgLSB0aGlzLl90aW1lID4gdGhpcy5jcmVhdGVCb3hJbnRlcnZhbCkge1xyXG4gICAgICAgICAgICB0aGlzLl90aW1lID0gbm93O1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUJveCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVCb3goKSB7XHJcbiAgICAgICAgbGV0IGJveCA9IExheWEuUG9vbC5nZXRJdGVtQnlDcmVhdGVGdW4oXCJib3hEb3duXCIsIHRoaXMuYm94RG93bi5jcmVhdGUsIHRoaXMuYm94RG93bik7XHJcbiAgICAgICAgYm94LnBvcyhNYXRoLnJhbmRvbSgpICogKExheWEuc3RhZ2Uud2lkdGggLSAxMDApLCAtMTAwKTtcclxuICAgICAgICB0aGlzLl9nYW1lQm94LmFkZENoaWxkKGJveCk7XHJcbiAgICB9XHJcbiAgICBvblN0YWdlQ2xpY2soZSkge1xyXG4gICAgICAgIC8vIHRoaXMuZW5hYmxlZCA9IHRydWU7ICAgICAgICBcclxuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIGxldCBmbHkgPSBMYXlhLlBvb2wuZ2V0SXRlbUJ5Q3JlYXRlRnVuKCd6aWRhbicsIHRoaXMuemlkYW4uY3JlYXRlLCB0aGlzLnppZGFuKVxyXG4gICAgICAgIGZseS5wb3MoTGF5YS5zdGFnZS5tb3VzZVgsIExheWEuc3RhZ2UubW91c2VZKTtcclxuICAgICAgICB0aGlzLl9nYW1lQm94LmFkZENoaWxkKGZseSk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgQ29udHJvdWwgZnJvbSBcIi4vY29udHJvdWxcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGhvbWVWaWV3IGV4dGVuZHMgTGF5YS5TY2VuZSB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpXHJcbiAgICB9XHJcbiAgICBvbkVuYWJsZSgpIHtcclxuICAgICAgICBob21lVmlldy56aGkgPSB0aGlzXHJcbiAgICAgICAgdGhpcy5fY29udHJvbCA9IHRoaXMuZ2V0Q29tcG9uZW50KENvbnRyb3VsKTtcclxuICAgICAgICB0aGlzLl9jb250cm9sLmVuYWJsZWQgPSBmYWxzZVxyXG4gICAgICAgIHRoaXMuYmVnaW5HYW1lLm9uKExheWEuRXZlbnQuTU9VU0VfRE9XTiwgdGhpcywgZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgY29uc29sZS5sb2coICB0aGlzLl9jb250cm9sLmVuYWJsZWQpXHJcbiAgICAgICAgICAgIHRoaXMuX2NvbnRyb2wuZW5hYmxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCAgdGhpcy5fY29udHJvbC5lbmFibGVkKVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBzdG9wZ2FtZSgpe1xyXG4gICAgICAgIHRoaXMuX2NvbnRyb2wuZW5hYmxlZCA9IGZhbHNlXHJcbiAgICB9XHJcblxyXG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgWmlkYW4gZXh0ZW5kcyBMYXlhLlNjcmlwdHtcclxuICAgIGNvbnN0cnVjdG9yKCl7c3VwZXIoKX1cclxuICAgIG9uRW5hYmxlKCl7XHJcbiAgICAgICAgdmFyIHN1ZG8gPSB0aGlzLm93bmVyLmdldENvbXBvbmVudChMYXlhLlJpZ2lkQm9keSlcclxuICAgICAgICBzdWRvLnNldFZlbG9jaXR5KHt4OjAseTotMTB9KVxyXG4gICAgfVxyXG4gICAgb25UcmlnZ2VyRW50ZXIob3RoZXIsIHNlbGYsIGNvbnRhY3QpIHtcclxuICAgICAgICB0aGlzLm93bmVyLnJlbW92ZVNlbGYoKTtcclxuICAgIH1cclxuXHJcbiAgICBvblVwZGF0ZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5vd25lci55IDwgLTEwKSB7XHJcbiAgICAgICAgICAgIHRoaXMub3duZXIucmVtb3ZlU2VsZigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIG9uRGlzYWJsZSgpIHtcclxuICAgICAgICBMYXlhLlBvb2wucmVjb3ZlcihcInppZGFuXCIsIHRoaXMub3duZXIpO1xyXG4gICAgfVxyXG4gIFxyXG59Il19