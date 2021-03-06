/**
 * This module provide the basic class inheritance.
 * @namespace webvn.class
 */
webvn.module('Class', function (util, exports) {
    var ObjCreate = Object.create;

    /**
     * Create a New Class
     * @function webvn.class.create
     * @param {object} px prototype methods or attributes
     * @param {object=} sx static methods or attributes
     */
    exports.create = function (px, sx) {
        return Base.extend(px, sx);
    };

    /**
     * @function webvn.class.module
     */
    exports.module = function (requires, fn) {
        var exports = {};

        if (util.isFunction(requires) && fn === undefined) {
            fn = requires;
            requires = [];
        }

        webvn.use(requires, function() {
            var args = util.toArray(arguments);
            args.splice(args.length - 1, 0, exports);
            var ret = fn.apply(null, args);
            if (ret) exports = ret;
        });

        return exports;
    };

    /* Create a new class using px's constructor if exists.
     * Also set static method of the class
     */
    function create(px, sx) {
        var _class;
        px = px || {};
        sx = sx || {};
        // Whether a constructor is defined
        if (px.hasOwnProperty('constructor')) {
            _class = px.constructor;
        } else {
            _class = function () {};
            px.constructor = _class;
        }
        // Atach __name__ and __owner__ to each prototype method
        util.each(px, function (obj, key) {
            if (util.isFunction(obj)) {
                obj.__name__ = key;
                obj.__owner__ = _class;
            }
        });

        // Set statics
        util.each(sx, function (value, p) {
            _class[p] = value;
        });

        _class.extend = function (px, sx) {
            return extend.apply(null, [_class, px, sx]);
        };

        _class.prototype = px;

        return _class;
    }

    var Empty = function() {};
    /* Create a new object with prototype
     * equals to object.create
     */
    function createObj(proto, constructor) {
        var newProto;
        if (ObjCreate) {
            newProto = ObjCreate(proto);
        } else {
            Empty.prototype = proto;
            newProto = new Empty();
        }
        newProto.constructor = constructor;
        return newProto;
    }

    /* Extend a class that already exist.
     * All it does is just to set the superClass's prototype into px's __proto__.
     */
    function extend(superClass, px, sx) {
        var _class = create(px, sx),
            newPx = createObj(superClass.prototype, _class);
        var keys = util.keys(px), key;
        for (var i = 0, len = keys.length; i < len; i++) {
            key = keys[i];
            newPx[key] = px[key];
        }
        _class.superclass = superClass.prototype;

        _class.extendFn = function (obj) {
            util.mix(newPx, obj);
        };

        // fn: Short name for prototype
        _class.fn = newPx;
        _class.prototype = newPx;

        return _class;
    }

    /**
     * A Basic Class Inherited by All Classes
     * @class webvn.class.Base
     */
    var Base = exports.Base = create({

        constructor: function Base () {},

        /**
         * Call Parent Function <br>
         * It will get the current method which is calling it,
         * then get the constructor, then the superclass prototype.
         * Finally execute function with the same name in superclass's prototype
         * @method webvn.class.Base#callSuper
         */
        callSuper: function () {
            var method, obj,
                self = this,
                args = arguments;
            method = arguments.callee.caller;
            obj = self;
            var name = method.__name__;
            if (!name) {
                return undefined;
            }
            var member = method.__owner__.superclass[name];
            if (!member) {
                return undefined;
            }

            return member.apply(obj, args || []);
        }

    });
});