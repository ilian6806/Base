
Base = require('../base');

describe('extend', function() {

    function UnitsSet() { }

    Base.extend(UnitsSet, 'HashSet', {
        set: function (type, field, garrison) {
            this[type] = {
                field: parseInt(field) || 0,
                garrison: parseInt(garrison) || 0
            };
        }
    });

    beforeEach(function () {
        this.i = new UnitsSet();
    });

    it('can override parent methods', function() {
        this.i.set('archers', 30, 55);
        expect(this.i.archers).toEqual({
            field: 30,
            garrison: 55
        });
    });

    it('should have all parent methods', function() {
        expect(this.i.remove).toBeDefined();
        expect(this.i.contains).toBeDefined();
        expect(this.i.each).toBeDefined();
        expect(this.i.merge).toBeDefined();
        expect(this.i.init).toBeDefined();
    });

    it('can extend custom object', function() {

        function Unit() {} // parent
        Unit.prototype.mobilize = function () {};

        function Archer() {} // child

        Base.extend(Archer, Unit, {
            shoot: function () {}
        });

        var archer = new Archer();
        expect(archer.mobilize).toBeDefined();
        expect(archer.shoot).toBeDefined();
    });
});