describe("Gilded Rose", function() {

  beforeEach(function() {
    jasmine.addMatchers(customMatchers);
  });

  it("should update ", function() {
    update_quality();
    expect(items.length).toBe(6);
    expect(items[0]).toBeEqualItemTo({
      "name": "+5 Dexterity Vest",
      "sell_in": 9,
      "quality": 19
    });
    expect(items[1]).toBeEqualItemTo( {
      "name": "Aged Brie",
      "sell_in": 1,
      "quality": 1
    });
    expect(items[2]).toBeEqualItemTo({
      "name": "Elixir of the Mongoose",
      "sell_in": 4,
      "quality": 6
    });
    expect(items[3]).toBeEqualItemTo({
      "name": "Sulfuras, Hand of Ragnaros",
      "sell_in": 0,
      "quality": 80
    });
    expect(items[4]).toBeEqualItemTo({
      "name": "Backstage passes to a TAFKAL80ETC concert",
      "sell_in": 14,
      "quality": 21
    });
    expect(items[5]).toBeEqualItemTo({
      "name": "Conjured Mana Cake",
      "sell_in": 2,
      "quality": 5
    });
  });

});
