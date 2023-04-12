
import { normalizeCategories, normalizeItems, normalizeItem, request } from './helpers';

async function getItems(req, res) {
    try {
        const term = req.query.q ? `q=${req.query.q}` : '';
        const resultItems = await request(`/sites/MLA/search?${term}&limit=4`);
        const category_id = resultItems.results?.length ? resultItems.results[0].category_id : '';

        const data = {
            author: res.author,
            categories: await normalizeCategories(category_id),
            items: normalizeItems(resultItems)
        }

        if (req.returnJSON) return data;
        res.send(data);

    } catch (error) {
        console.error(error);
        res.send({ error: error.message });
    }
}

async function getItem(req, res) {
    if(!req.headers.accept.includes('text/html') && !req.headers.accept.includes('json')){
        if (req.returnJSON) return '';
        res.send('');
        return
    }
    const idParamFrontend= String(req.params['0']).split('/').pop();
    const id = req.params.id || idParamFrontend;
    const responseitem = request(`/items/${id}`);
   
    const responseDescription = request(`/items/${id}/description`);
    const [item, description] = await Promise.all([responseitem, responseDescription]);
    item.description = description.plain_text;

    const data = {
        author: res.author,
        item: normalizeItem(item)
    }

    if (req.returnJSON) return data;
    res.send(data);


}

module.exports = {
    getItems,
    getItem,
}