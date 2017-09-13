
Base = require('../base');

describe('ObjectsList', function() {

    beforeEach(function () {
        this.i = new Base.ObjectsList([
            { 'foo': 7 },
            { 'foo': 2 },
            { 'foo': 4 }
        ]);
    });


    it('must filter initial values and left only objects', function() {
        this.i = new Base.ObjectsList([
            2,
            { 'foo': 2 },
            'test',
            { 'foo': 4 },
            false
        ]);
        expect(this.i.value).toEqual([
            { 'foo': 2 },
            { 'foo': 4 }
        ]);
    });

    it('push method must except only object', function() {
        this.i.push(2);
        this.i.push('test');
        this.i.push([]);
        expect(this.i.length).toBe(3);
        this.i.push({});
        expect(this.i.length).toBe(4);
    });

    it('unshift method must except only object', function() {
        this.i.unshift(2);
        this.i.unshift('test');
        this.i.unshift([]);
        expect(this.i.length).toBe(3);
        this.i.unshift({});
        expect(this.i.length).toBe(4);
    });

    it('filter method must return only matched values', function() {
        expect(this.i.filter(function () {
            return this.foo > 3;
        })).toEqual([
            { 'foo': 7 },
            { 'foo': 4 }
        ]);
    });

    it('findOne method must return first matched value', function() {
        expect(this.i.findOne(function () {
            return this.foo == 2;
        })).toEqual({ 'foo': 2 });
    });

    it('contains method must check if there is a matched value', function() {
        expect(this.i.contains(function () {
            return this.foo == 5;
        })).toBe(false);
        expect(this.i.contains(function () {
            return this.foo == 4;
        })).toBe(true);
    });

    it('must have all SmartArray methods', function() {

        expect(this.i.get(0)).toEqual({ 'foo': 7 });
        expect(this.i.first()).toEqual({ 'foo': 7 });
        expect(this.i.last()).toEqual({ 'foo': 4 });

        this.i.reverse();
        expect(this.i.value).toEqual([
            { 'foo': 4 },
            { 'foo': 2 },
            { 'foo': 7 }
        ]);

        expect(this.i.pop()).toEqual({ 'foo': 7 });

        this.i.empty()
        expect(this.i.value).toEqual([]);
    });
});