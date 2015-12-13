describe("updateItem for Gilded Rose", function () {

    it('retains the name of the item', function() {
        var updated = updateItem(new Item('+5 Dexterity Vest', 10, 20));
        expect(updated.name).toBe('+5 Dexterity Vest');
    });

    it('reduces sell_in by 1', function() {
        var updated = updateItem(new Item('+5 Dexterity Vest', 10, 20));
        expect(updated.sell_in).toBe(9);
    });

    describe('normal', function () {
        it('reduces quality by 1', function() {
            var updated = updateItem(new Item('+5 Dexterity Vest', 10, 20));
            expect(updated.quality).toBe(19);
        });

        it('reduces quality by 2, once sell_in down to zero', function() {
            var updated = updateItem(new Item('+5 Dexterity Vest', 0, 20));
            expect(updated.quality).toBe(18);
        });

        it('does not allow quality to fall below 0', function() {
            var updated = updateItem(new Item('+5 Dexterity Vest', 10, 0));
            expect(updated.quality).toBe(0);
        });

        it('... even past the sell_in date', function() {
            var updated = updateItem(new Item('+5 Dexterity Vest', -3, 0));
            expect(updated.quality).toBe(0);
        });
    });

    describe('brie', function() {
        it('increases quality by 1', function() {
            var updated = updateItem(new Item('Aged Brie', 2, 0));
            expect(updated.quality).toBe(1);
        });

        it('does not allow quality to exceed 50', function() {
            var updated = updateItem(new Item('Aged Brie', 2, 50));
            expect(updated.quality).toBe(50);
        });

        it('... even past the sell_in date', function() {
            var updated = updateItem(new Item('Aged Brie', -3, 50));
            expect(updated.quality).toBe(50);
        });
    });

    describe('sulfuras', function() {
        it('does not change sell_in', function() {
            var updated = updateItem(new Item('Sulfuras, Hand of Ragnaros', 0, 80));
            expect(updated.sell_in).toBe(0);
        });

        it('does not change quality', function() {
            var updated = updateItem(new Item('Sulfuras, Hand of Ragnaros', 0, 80));
            expect(updated.quality).toBe(80);
        });
    });

    describe('backstage', function() {
        it('increases quality by 1 in normal circumstances', function() {
            var updated = updateItem(new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20));
            expect(updated.quality).toBe(21);
        });

        it('increases quality by 2 when there are 6 - 10 days remaining', function() {
            var updated = updateItem(new Item('Backstage passes to a TAFKAL80ETC concert', 10, 20));
            expect(updated.quality).toBe(22);
            updated = updateItem(new Item('Backstage passes to a TAFKAL80ETC concert', 6, 30));
            expect(updated.quality).toBe(32);
        });

        it('increases quality by 3 when there are 1 - 5 days remaining', function() {
            var updated = updateItem(new Item('Backstage passes to a TAFKAL80ETC concert', 5, 20));
            expect(updated.quality).toBe(23);
            updated = updateItem(new Item('Backstage passes to a TAFKAL80ETC concert', 1, 30));
            expect(updated.quality).toBe(33);
        });

        it('does not increase quality over 50, when there are more than 10 days remaining', function() {
            var updated = updateItem(new Item('Backstage passes to a TAFKAL80ETC concert', 15, 50));
            expect(updated.quality).toBe(50);
        });

        it('does not increase quality over 50, when there are 6 - 10 days remaining', function() {
            var updated = updateItem(new Item('Backstage passes to a TAFKAL80ETC concert', 7, 50));
            expect(updated.quality).toBe(50);
        });

        it('does not increase quality over 50, when there are 1 - 5 days remaining', function() {
            var updated = updateItem(new Item('Backstage passes to a TAFKAL80ETC concert', 3, 50));
            expect(updated.quality).toBe(50);
        });

        it('drops quality to 0 when there are no days remaining', function() {
            var updated = updateItem(new Item('Backstage passes to a TAFKAL80ETC concert', 0, 20));
            expect(updated.quality).toBe(0);
            updated = updateItem(new Item('Backstage passes to a TAFKAL80ETC concert', -7, 50));
            expect(updated.quality).toBe(0);
        });
    });

    describe('conjured', function() {
        it('reduces quality by 2', function() {
            var updated = updateItem(new Item('Conjured Mana Cake', 3, 6));
            expect(updated.quality).toBe(4);
        });

        it('reduces quality by 4, once sell_in down to zero', function() {
            var updated = updateItem(new Item('Conjured Mana Cake', 0, 6));
            expect(updated.quality).toBe(2);
        });

        it('does not allow quality to fall below 0', function() {
            var updated = updateItem(new Item('Conjured Mana Cake', 2, 0));
            expect(updated.quality).toBe(0);
        });

        it('... even past the sell_in date', function() {
            var updated = updateItem(new Item('Conjured Mana Cake', -2, 0));
            expect(updated.quality).toBe(0);
        });
    });
});

describe("update_quality for Gilded Rose", function() {
    var orig = items;
    beforeEach(function() {
        items = orig;
    });

    it('clones and replaces items', function() {
        update_quality();
        expect(items).not.toBe(orig);
        expect(items.length).toBe(orig.length);
    });

    it('Does the appropriate update on the individual elements', function() {
        var updatedFirst = updateItem(items[0]);
        update_quality();
        expect(items[0].name).toBe(updatedFirst.name);
        expect(items[0].sell_in).toBe(updatedFirst.sell_in);
        expect(items[0].quality).toBe(updatedFirst.quality);
    });

});