/**
 * Some useful capsulated js data structures.
 * @autor ilian.iliev
 *
 * Date: 20145-10-16T20:07Z
 */

(function (root, factory) {
    if ( typeof define === 'function' && define.amd ) {
        define('Base', factory(root));
    } else if ( typeof exports === 'object' ) {
        module.exports = factory(root);
    } else {
        root.Base = factory(root);
    }
}(this, function (root) {

    'use strict';


    // ----------------------------------------------------- //
    // ------------------ Private helpers ------------------ //
    // ----------------------------------------------------- //


    function isArray(arr) {
        return arr instanceof Array;
    }

    function isObject(obj) {
        return obj.constructor === Object;
    }

    function isFunction(func) {
        return (typeof func).toLowerCase() === 'function';
    }

    function isString(func) {
        return (typeof func).toLowerCase() === 'string';
    }

    function indexOf(array, item) {
        for (var i = 0; i < array.length; i++) {
            if (array[i].toString() === item.toString()) return i;
        }
        return -1;
    }

    function mergeObjects(o1, o2) {

        var obj1 = (o1 && isObject(o1)) ? o1 : {};
        var obj2 = (o2 && isObject(o2)) ? o2 : {};
        var result = {};
        var prop;

        for (prop in obj1) {
            result[prop] = obj1[prop];
        }
        for (prop in obj2) {
            result[prop] = obj2[prop];
        }

        obj1 = null;
        obj2 = null;

        return result;
    }

    function parseArrayArguments(args) {
        args = Array.prototype.slice.call(args);
        if (args.length > 0) {
            if (isArray(args[0])) {
                return args[0];
            } else {
                return args;
            }
        } else {
            return [];
        }
    }


    // ----------------------------------------------------- //
    // ------------------ Base classes --------------------- //
    // ----------------------------------------------------- //


    /**
     * Basic hashset object
     */
    function HashSet() {

        var args = Array.prototype.slice.call(arguments);
        var initObject = args[0];

        // check for init object passed
        if (initObject && isObject(initObject)) {
            this.init(initObject);
        }
    }

    HashSet.prototype = {

        set: function (key, value) {
            this[key] = value;
        },

        remove: function (key) {
            delete this[key];
        },

        contains: function (key) {
            return this.hasOwnProperty(key);
        },

        each: function (func) {
            for (var i in this) {
                if (this.hasOwnProperty(i)) {
                    func(i, this[i]);
                }
            }
        },

        merge: function (set) {
            for (var i in set) {
                if (set.hasOwnProperty(i) && !this.contains(i)) {
                    this.set(i, set[i]);
                }
            }
            return this;
        },

        init: function (obj) {
            for (var i in obj) {
                if (obj.hasOwnProperty(i)) {
                    this.set(i, obj[i]);
                }
            }
            return this;
        }
    };


    /**
     * Extended array
     */
    function SmartArray() {

        this.value = parseArrayArguments(arguments);

        Object.defineProperty(this, 'length', {
            get: function () {
                return this.value.length;
            }
        });
    }

    SmartArray.prototype = {

        get: function (index) {
            return this.value[index];
        },

        pop: function () {
            return this.value.pop();
        },

        push: function (element) {
            return this.value.push(element);
        },

        shift: function () {
            return this.value.shift();
        },

        unshift: function (element) {
            return this.value.unshift(element);
        },

        remove: function (element) {
            if (indexOf(this.value, element) > -1) {
                this.value.splice(indexOf(this.value, element), 1);
            }
        },

        contains: function (element) {
            for (var i = 0, l = this.value.length; i < l; i++) {
                if (this.value[i] === element) return true;
            }
            return false;
        },

        first: function () {
            return this.value[0];
        },

        last: function () {
            return this.value[this.value.length - 1];
        },

        each: function (func) {
            for (var i = 0 ; i < this.value.length; i++) {
                func.call(this.value[i], i);
            }
        },

        shuffle: function () {
            for (var j, x, i = this.value.length;
            i; j = parseInt(Math.random() * i, 10), x = this.value[--i], this.value[i] = this.value[j], this.value[j] = x);
        },

        reverse: function () {
            this.value.reverse();
        },

        random: function () {
            return this.value[Math.floor(Math.random() * this.value.length)];
        },

        empty: function () {
            this.value.length = 0;
        }
    };


    /**
     * Objects list
     */
    function ObjectsList() {

        this.value = parseArrayArguments(arguments);

        // filter only object literal values on init
        this.value = ObjectsList.prototype.filter.call(this, function () {
            return isObject(this);
        });

        Object.defineProperty(this, 'length', {
            get: function () {
                return this.value.length;
            }
        });
    }

    ObjectsList.prototype = mergeObjects(SmartArray.prototype, {

        push: function (element) {
            if (isObject(element)) {
                return this.value.push(element);
            }
        },

        unshift: function (element) {
            if (isObject(element)) {
                return this.value.unshift(element);
            }
        },

        filter: function (func) {

            var result = [];

            if (!isFunction(func)) {
                return result;
            }

            this.each(function() {
                if (func.call(this)) {
                    result.push(this);
                }
            });

            return result;
        },

        findOne: function (func) {

            var result;

            if (!isFunction(func)) {
                return result;
            }

            for (var i = 0, len = this.value.length; i < len; i++) {
                if (func.call(this.value[i])) {
                    result = this.value[i];
                    break;
                }
            }

            return result;
        },

        contains: function (func) {
            return !!this.filter(func).length;
        }
    });


    /**
     * Simple options resolver
     */
    var Options = function (options, defaults) {

        var opt = (options && isObject(options)) ? options : {};
        var def = (defaults && isObject(defaults)) ? defaults : {};
        var prop;

        for (prop in opt) {
            if (opt.hasOwnProperty(prop)) {
                this[prop] = opt[prop];
            }
        }

        for (prop in def) {
            if (def.hasOwnProperty(prop) && !this.hasOwnProperty(prop)) {
                this[prop] = def[prop];
            }
        }
    };


    /**
     * Extend object and add optional methods to new objects prototype.
     * If string is passed for parent, it looks for inner class to extend from.
     */
    function extend(child, parent, optMethods) {

        if (isString(parent)) {
            child.prototype = new this[parent]();
        } else if (isFunction(parent)) {
            child.prototype = new parent();
        }

        child.prototype.constructor = child;

        if (optMethods && isObject(optMethods)) {
            for (var i in optMethods) {
                if (optMethods.hasOwnProperty(i) && isFunction(optMethods[i])) {
                    child.prototype[i] = optMethods[i];
                }
            }
        }
    }


    return {
        HashSet: HashSet,
        SmartArray: SmartArray,
        ObjectsList: ObjectsList,
        Options: Options,
        extend: extend
    };

}));
