import routerConfig from './router';
import createStore from './redux/store';
import { renderRoutes } from 'react-router-config';

export default function(store = {}) {
    return {
        router: renderRoutes(routerConfig),
        store: createStore(store),
        routerConfig,
    }
}