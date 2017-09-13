
Base = require('../base');

describe('SmartArray', function() {

    beforeEach(function () {
        this.i = new Base.SmartArray([2, 7, 'test', null, {}, false, 10]);
    });


    it('can be initialized with initial value', function() {
        this.i = new Base.SmartArray([2, 5, 6]);
        expect(this.i.value).toEqual([2, 5, 6]);
    });

    it('get method must return element by index', function() {
        expect(this.i.get(1)).toBe(7);
    });

    it('pop method must pop the last element', function() {
        var lastElement = this.i.pop();
        expect(lastElement).toBe(10);
        expect(this.i.length).toBe(6);
    });

    it('push method must push element to the end', function() {
        this.i.push(12);
        expect(this.i.last()).toBe(12);
        expect(this.i.length).toBe(8);
    });

    it('shift method must remove first element', function() {
        expect(this.i.shift()).toBe(2);
        expect(this.i.first()).toBe(7);
        expect(this.i.length).toBe(6);
    });

    it('unshift method must remove first element', function() {
        this.i.shift();
        expect(this.i.first()).toBe(7);
        expect(this.i.length).toBe(6);
    });

    it('remove method must remove given element (first match)', function() {
        this.i.remove(7);
        expect(this.i.contains(7)).toBe(false);
        expect(this.i.length).toBe(6);
    });

    it('contains method must check if element exists', function() {
        expect(this.i.contains('test')).toBe(true);
        expect(this.i.contains('mest')).toBe(false);
    });

    it('first method must return value at index 0', function() {
        expect(this.i.first()).toBe(2);
    });

    it('last method must return value at the last index', function() {
        expect(this.i.last()).toBe(10);
    });

    it('each method must iterate over it`s values', function() {
        var indexes = [];
        var first = null;
        this.i.each(function (idx) {
            indexes.push(idx);
            if (idx === 0) {
                first = this;
            }
        });
        expect(indexes).toEqual([0, 1, 2, 3, 4, 5, 6]);
        expect(first).toEqual(2);
    });

    it('shuffle method must shuffle it`s value', function() {
        expect(this.i.shuffle()).not.toEqual([2, 7, 'test', null, {}, false, 10]);
    });

    it('reverse method must reverse it`s value', function() {
        this.i.reverse()
        expect(this.i.value).toEqual([10, false, {}, null, 'test', 7, 2]);
    });

    it('random method must return value at random index', function() {
        var randoms = [];
        for (var i = 0; i < 30; i++) {
            randoms.push(this.i.random());
        }
        randoms.sort();
        expect(randoms[0]).not.toBe(randoms[randoms.length-1]);
    });

    it('empty method must empty it`s value', function() {
        this.i.empty()
        expect(this.i.value).toEqual([]);
    });

    it('length property must return it`s value length', function() {
        expect(this.i.length).toBe(7);
    });
});