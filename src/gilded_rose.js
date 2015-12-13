function Item(name, sell_in, quality) {
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;
}

var items = [];

items.push(new Item('+5 Dexterity Vest', 10, 20));
items.push(new Item('Aged Brie', 2, 0));
items.push(new Item('Elixir of the Mongoose', 5, 7));
items.push(new Item('Sulfuras, Hand of Ragnaros', 0, 80));
items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20));
items.push(new Item('Conjured Mana Cake', 3, 6));

function updateItem(origItem) {
    var newSellIn = origItem.sell_in - 1;
    var quality;
    if (origItem.name === 'Aged Brie') {
        quality = Math.min(origItem.quality + 1, 50);
        return {
            name: origItem.name,
            sell_in: newSellIn,
            quality: quality
        };
    } else if (origItem.name === 'Sulfuras, Hand of Ragnaros') {
        return {
            name: origItem.name,
            sell_in: origItem.sell_in,
            quality: 80
        };
    } else if (origItem.name === 'Backstage passes to a TAFKAL80ETC concert') {
        quality = origItem.quality + 1;
        if (origItem.sell_in < 11) {quality += 1;}
        if (origItem.sell_in < 6) {quality += 1;}
        if (origItem.sell_in < 1) {quality = 0;}
        if (quality > 50) {quality = 50;}

        return {
            name: origItem.name,
            sell_in: newSellIn,
            quality: quality
        };
    } else {
        quality = origItem.quality - 1;
        if (origItem.sell_in < 1) {quality -= 1;}
        if (quality < 0) {quality = 0;}

        return {
            name: origItem.name,
            sell_in: newSellIn,
            quality: quality
        };
    }
}

function update_quality() {
    items = items.map(updateItem);
}
