
Base = require('../base');

describe('HashSet', function() {

    beforeEach(function () {
        this.i = new Base.HashSet();
    });


    it('can be initialized with initial value', function() {
        this.i = new Base.HashSet({ 'foo': 2 });
        expect(this.i).toEqual({ 'foo': 2 });
        this.i = new Base.HashSet(123);
        expect(this.i).toEqual({});
    });

    it('init method must assign initial value', function() {
        this.i.init({ 'foo': 2, 'bar': 3 });
        expect(this.i).toEqual({ 'foo': 2, 'bar': 3 });
    });

    it('set method must add key/value pair', function() {
        this.i.set('foo', 2);
        expect(this.i).toEqual({ 'foo': 2 });
    });

    it('remove method must remove value by key', function() {
        this.i.init({ 'foo': 2, 'bar': 3 });
        expect(this.i).toEqual({ 'foo': 2, 'bar': 3 });
        this.i.remove('foo');
        expect(this.i).toEqual({ 'bar': 3 });
    });

    it('contains method must check if key exists', function() {
        this.i.set('foo', 2);
        expect(this.i.contains('foo')).toBe(true);
        expect(this.i.contains('bar')).toBe(false);
    });

    it('merge method must merge it with another set', function() {
        this.i.set('foo', 2);
        this.i.merge(new Base.HashSet({ 'bar': 5, 'foo': 3 }));
        expect(this.i).toEqual({ 'bar': 5, 'foo': 2 });
    });

    it('each method must iterate over it`s values', function() {
        var result = 0;
        this.i.init({ 'foo': 2, 'bar': 3 });
        this.i.each(function (key, value) {
            result += value;
        });
        expect(result).toBe(5);
    });
});