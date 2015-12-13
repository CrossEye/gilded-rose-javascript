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

var GildedRose = (function() {
    var types = [];
    var normal = {};
    return {
        setBaseline: function(type) {normal = type;},
        register: function (type) {types.push(type);},
        fetch: function (item) {
            return util.merge(normal, util.find(function (type) {return type.match(item)}, types) || {});
        }
    };
}());

GildedRose.setBaseline({ // Normal
    match: function() {return true;},
    sell_in: function(item) {return item.sell_in - 1;},
    quality: function(item) {
        var qual = item.quality - 1;
        if (item.sell_in < 1) {qual -= 1;}
        if (qual < 0) {qual = 0;}
        return qual;
    }
});

GildedRose.register({ // Brie
    match: util.nameEq('Aged Brie'),
    quality: function(item) {return  Math.min(item.quality + 1, 50);}
});

GildedRose.register({ // Sulfuras
    match: util.nameEq('Sulfuras, Hand of Ragnaros'),
    sell_in: function(item) {return item.sell_in;},
    quality: function() {return  80;}
});

GildedRose.register({ // Backstage
    match: util.nameEq('Backstage passes to a TAFKAL80ETC concert'),
    quality: function(item) {
        var qual = item.quality + 1;
        if (item.sell_in < 11) {qual += 1;}
        if (item.sell_in < 6) {qual += 1;}
        if (item.sell_in < 1) {qual = 0;}
        if (qual > 50) {qual = 50;}
        return qual;        
    }
});


function updateItem(origItem) {
    var type = GildedRose.fetch(origItem);
    return {
        name: origItem.name,
        sell_in: type.sell_in(origItem),
        quality: type.quality(origItem)
    };
}

function update_quality() {
    items = items.map(updateItem);
}
