const request = require('superagent');
const stringHash = require('string-hash');

const URL = 'https://rickandmortyapi.com/api/episode';

module.exports = {
    async get(search, page) {
        page = page || 1;
        search = search || '';

        const response = await request
            .get(URL)
            .query({ page, search });

        return response.body.map(generateIdForQuote);
    }
};

function generateIdForQuote(quote) {
    quote.isFavorite = false;
    // This API does not give proper id's :(
    // So we make one based on hashing the quote
    quote.id = stringHash(quote.quote);
    return quote;
}
