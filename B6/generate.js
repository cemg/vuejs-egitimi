module.exports = function() {
    var faker = require('faker');
    var _ = require('lodash');

    return {
        products: _.times(100, function(n) {
            return {
                id: n,
                baslik: faker.lorem.sentence(),
                kategori: faker.lorem.sentence(2),
                tutar: faker.finance.amount(10, 100, 2, '₺'),
                resim: faker.image.imageUrl(320, 240, 'technics')
            }
        }),
        categories: _.times(20, function(n) {
            return {
                id: n,
                kategori_adi: faker.lorem.sentence(2)
            }
        })
    }
};