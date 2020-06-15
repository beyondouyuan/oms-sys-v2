import * as detailActionTypes from '../constants/detail';

export const fetchDetail = id => ({
    types: [
        detailActionTypes.DETAIL_FETCH,
        detailActionTypes.DETAIL_SUCCESS,
        detailActionTypes.DETAIL_FAILURE
    ],
    sync: () => new Promise((resolve) => {
        resolve({data: {name: 'irving'}})
    })
})

export const reset = () => ({ type: detailActionTypes.DETAIL_RESET })