
Base = require('../base');

describe('Options', function() {

    it('must replace wrong params with empty object', function() {
        var opt = new Base.Options({ foo: 2, bar: 3 }, 'test');
        expect(opt.foo).toBe(2);
        expect(opt.bar).toBe(3);
    });

    it('must override default values', function() {
        var opt = new Base.Options({ bar: 5 }, { foo: 2, bar: 3 });
        expect(opt.foo).toBe(2);
        expect(opt.bar).toBe(5);
    });

    it('must add properties without given default value', function() {
        var opt = new Base.Options({ bazz: 7 }, { foo: 2, bar: 3 });
        expect(opt.foo).toBe(2);
        expect(opt.bar).toBe(3);
        expect(opt.bazz).toBe(7);
    });
});