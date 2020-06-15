import React from 'react';

import Detail from '../pages/Detail';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Order from '../pages/Order';
import Register from '../pages/Register';
import Resource from '../pages/Resource';
import Role from '../pages/Role';
import System from '../pages/System';
import User from '../pages/User';
import { arrayToTree } from '../utils/array2tree';

const routes = [
    {
        path: '/',
        component: Home,
        title: '仪表盘',
        name: 'Home',
        icon: 'HomeOutlined',
        isMenu: true,
        exact: true,
        id: '1',
        parentId: ''
    },
    {
        path: '/detail/:id',
        component: Detail,
        title: '详情',
        name: 'Detail',
        icon: 'InfoOutlined',
        isMenu: false,
        id: '2',
        parentId: ''
    },
    {
        path: '/login',
        component: Login,
        title: '登陆',
        name: 'Login',
        icon: 'InfoOutlined',
        isMenu: false,
        id: '3',
        parentId: ''
    },
    {
        path: '/register',
        component: Register,
        title: '注册',
        name: 'Register',
        icon: 'InfoOutlined',
        isMenu: false,
        id: '4',
        parentId: ''
    },
    {
        path: '/system',
        component: System,
        title: '系统管理',
        name: 'System',
        icon: 'InfoOutlined',
        isMenu: true,
        id: '5',
        parentId: '',
        exact: true,// 有下级路由必须匹配此属性，所有子路由均匹配不到
    },
    {
        path: '/system/user',
        component: User,
        title: '用户管理',
        name: 'User',
        icon: 'InfoOutlined',
        isMenu: true,
        id: '51',
        parentId: '5',
        exact: true,
    },
    {
        path: '/system/role',
        component: Role,
        title: '角色管理',
        name: 'Role',
        icon: 'InfoOutlined',
        isMenu: true,
        id: '52',
        parentId: '5'
    },
    {
        path: '/system/resource',
        component: Resource,
        title: '资源管理',
        name: 'Resource',
        icon: 'InfoOutlined',
        isMenu: true,
        id: '53',
        parentId: '5'
    },
]

/**
 * react-router-config中的matchRoutes无法匹配的嵌套的路由 嵌套路径比如/system/resource也匹配不到...
 * 而ssr中需要匹配到对应路由才能正常渲染页面
 * 同时，管理后台或者说菜单中本质上必然会有嵌套路由的情况，因此，
 * 做一层转换给客户端渲染出左侧菜单的属性结构
 * 
 * 
 * 提示：数据库中保存的资源菜单也是一维数据，而不是树形结构喔！！！！
 */

const routesTree = arrayToTree(routes)

export default routes;
export { routesTree }