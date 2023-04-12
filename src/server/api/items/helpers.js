
import config from '../../../../config'


export async function request(url) {
    const baseURL = `${config.apimel.url}`;

    const resp = await fetch(baseURL + url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    return await resp.json();
}

export function parseDecimal(value = '') {
    if (!String(value).includes('.')) return 0;
    return parseInt(String(value).split(".")[1]);
}


function normalizePicture(pictures = []) {
    if (!pictures) return undefined
    if (!pictures.length) return undefined
    return pictures[0].url;
}
export function normalizeItem(item) {
    return {
        id: item.id,
        title: item.title || '',
        price: {
            currency: item.currency_id,
            amount: parseInt(item.price),
            decimals: parseDecimal(item.price)
        },
        picture: normalizePicture(item.pictures) || item.thumbnail,
        condition: item.condition || '',
        free_shipping: !!item.shipping?.free_shipping,
        sold_quantity: item.sold_quantity || 0,
        description: item.description || undefined
    }
}

export function normalizeItems(resultItems) {
    if(!resultItems) return []
    return resultItems.results.map(normalizeItem)
}

export async function normalizeCategories(category_id) {
    if (!category_id) return []
    const responseCategories = await request(`/categories/${category_id}`);
    return responseCategories.path_from_root.map(category => category.name);
}
