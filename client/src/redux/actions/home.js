import * as homeActionTypes from '../constants/home';

export const fetchHome = (id) => ({
    types: [
        homeActionTypes.HOME_FETCH,
        homeActionTypes.HOME_SUCCESS,
        homeActionTypes.HOME_FAILURE
    ],
    sync: () => new Promise((resolve) => {
        resolve({items: [{title: '新闻1'}, {title: '新闻2'}, {title: '新闻3'}, {title: '新闻4'}]})
    }),
    payload: {items: {title: '占位符号'}}
})

export const fetchColumn = (page) => ({
    types: [
        homeActionTypes.COLUMN_FETCH,
        homeActionTypes.COLUMN_SUCCESS,
        homeActionTypes.COLUMN_FAILURE
    ],
    sync: () => new Promise((resolve) => {
        resolve({items: [{title: '分栏1'}, {title: '分栏2'}, {title: '分栏3'}, {title: '分栏4'}]})

    })
})