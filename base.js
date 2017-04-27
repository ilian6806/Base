/**
 * Some useful capsulated js data structures.
 * @autor ilian.iliev
 * 
 * Date: 20145-10-16T20:07Z
 */
 
Base = (function () {

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

        if (isObject(optMethods)) {
            for (var i in optMethods) {
                if (optMethods.hasOwnProperty(i) && isFunction(optMethods[i])) {
                    child.prototype[i] = optMethods[i];
                }
            }
        }
    }

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
    };

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

        var args = Array.prototype.slice.call(arguments);

        if (args.length > 0) {
            if (isArray(args[0])) {
                this.value = args[0];
            } else {
                this.value = args;
            }
        } else {
            this.value = [];
        }

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
                if (this.value[i] == element) return true;
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
            i; j = parseInt(Math.random() * i), x = this.value[--i], this.value[i] = this.value[j], this.value[j] = x);
        },
        reverse: function () {
            this.value.reverse();
        },
        random: function () {
            return this.value[Math.floor(Math.random() * this.value.length)];
        },
        empty: function () {
            this.value.length = 0;
        },
        length: function () {
            return this.value.length;
        }
    };

    /**
     * Simple options resolver
     */
    var Options = function (options, defaults) {

        var opt = (options && isObject(options)) ? options : {};
        var def = (defaults && isObject(defaults)) ? defaults : {};

        for (var prop in opt) {
            if (opt.hasOwnProperty(prop)) {
                this[prop] = opt[prop];
            }
        }

        for (var prop in def) {
            if (def.hasOwnProperty(prop) && !this.hasOwnProperty(prop)) {
                this[prop] = def[prop];
            }
        }
    };

    return {
        extend: extend,
        HashSet: HashSet,
        SmartArray: SmartArray,
        Options: Options
    };
}());