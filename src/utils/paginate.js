import _ from 'lodash';

export function paginate(items, pageNumber, pageSize) {
    // Calculate the starting index of the items in the page
    const startIndex = (pageNumber - 1) * pageSize;
    return _(items).slice(startIndex).take(pageSize).value();
}