# Base
Some useful js data structures

[![Code Climate](https://codeclimate.com/github/ilian6806/Base/badges/gpa.svg)](https://codeclimate.com/github/ilian6806/Base) [![Issue Count](https://codeclimate.com/github/ilian6806/Base/badges/issue_count.svg)](https://codeclimate.com/github/ilian6806/Base) ![](https://img.shields.io/badge/tests-38%2F38-green.svg) ![](https://img.shields.io/gemnasium/mathiasbynens/he.svg) ![](https://img.shields.io/npm/l/express.svg)



### HashSet
Basic dictionary

```javascript

var unitsSet = new Base.HashSet({
    swordsmen: 73
});
unitsSet.set('archers', 34);  // { archers: 34, swordsmen: 73 }
unitsSet.contains('archers'); // true
unitsSet.remove('archers');   // { swordsmen: 73 }
unitsSet.merge(/* another set */);
unitsSet.each(function (key, value) {
    console.log(key + ': ' + value);
});
```

### SmartArray
Encapsulated array with utility methods

```javascript

var arr = new Base.SmartArray([2, 6, 7, 3, 10]);
arr.value;       // [2, 6, 7, 3, 10]
arr.length;      // 5
arr.contains(6)  // true
arr.get(1);      // 6
arr.first();     // 2
arr.last();      // 10
arr.push(8);
arr.pop();
arr.unshift(8);
arr.shift();
arr.remove(7);
arr.random();
arr.reverse();
arr.shuffle();
arr.each(function () {
    console.log(this);
});
arr.empty();
```

### ObjectsList
It has all SmartArray methods plus more

```javascript
var units = new Base.ObjectsList([
    { type: 'archers', count: 34 },
    { type: 'swordsmen', count: 63 }
]);

units.push({ type: 'spies', count: 20 });
units.push(12); // silent fail and push nothing

units.filter(function () { return this.count > 30; });           // [{ type: 'archers', count: 34 }, { type: 'swordsmen', count: 63 }]
units.findOne(function () { return this.type === 'spies'; });    // { type: 'spies', count: 20 }
units.contains(function () { return this.type === 'archers'; }); // true
```

### extend option
Extend some class or custom one

```javascript

function UnitsSet() { }

Base.extend(UnitsSet, 'HashSet', {
    // override current methods
    set: function (type, field, garrison) {
        this[type] = {
            field: parseInt(field) || 0,
            garrison: parseInt(garrison) || 0
        };
    },
    // set new methods
    setField: function (type, value) {
        if (!this.contains(type)) {
            this[type] = {};
        }
        this[type].field = parseInt(value) || 0;
    },
    setGarrison: function (type, value) {
        if (!this.contains(type)) {
            this[type] = {};
        }
        this[type].garrison = parseInt(value) || 0;
    }
});

/**
 * Extend custom classes
 */
function Unit() {} // parent
Unit.prototype.mobilize = function () {};

function Archer() {} // child

Base.extend(Archer, Unit, {
    shoot: function () {}
});

var archer = new Archer();
archer.mobilize();
archer.shoot();
```
