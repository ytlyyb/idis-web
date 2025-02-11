import routeConfig from './nav.config.json';


const resolvePath = (path, addPath) => {
    return resolve => require([`.${path}${addPath}.vue`], resolve)
}


const getRouter = (pathList) => {
    let route = [];
    getPath(pathList, null,null)

    function getPath(list, p,n) {
        list.forEach(ele => {
            let path = p ? (p + ele.path) : ele.path;
            let name = n ? (`${n}/${ele.name}`) : `/${ele.name}`;
            if (ele.children && ele.children.length > 0) {
                ele.isRoute && addRoute(ele.name, path, ele.path,name);
                getPath(ele.children, path,name)
            } else {
                addRoute(ele.name, path, ele.path,name);
            }
        });
    }


    function addRoute(name, path, addPath,pathName) {
        route.push({
            path: pathName,
            name: name,
            meta: { title: 'ytlMenu.' + name },
            component: resolvePath(path, addPath),
        })
    }

    return route;
}




let route = getRouter(routeConfig);


export default route;


