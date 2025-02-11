import navConfig from '../../pages/nav.config.json';

const getMenu = (menu) => {
    let list = [];

    menu.forEach(ele => {
        if (!ele.isMenu) {
            return;
        }
        if (ele.children && ele.children.length > 0) {
            let child = {
                title: `idisMenu.${ele.name}`,
                children: []
            }
            ele.children.forEach(item => {
                item.isMenu && child.children.push({
                    title: `idisMenu.${item.name}`,
                    icon: item.icon || null,
                    img: item.img || null,
                    route: `/${ele.name}/${item.name}`,
                })
            })
            list.push(child);
        } else {
            list.push(
                {
                    title: `idisMenu.${ele.name}`,
                    children: [
                        {
                            title: `idisMenu.${ele.name}`,
                            icon: ele.icon || null,
                            img: ele.img || null,
                            route: `/${ele.name}`,
                        }
                    ]
                }
            )
        }
    });

    return list;
}


let menuList = getMenu(navConfig);



export default menuList;


