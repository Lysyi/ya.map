ymaps.ready(init);

function init() {

    // Создание экземпляра карты.
    var myMap = new ymaps.Map('map', {
            center: [48.47533343, 135.06479423],
            zoom: 16,
            controls: []
        });
    
    var myPlacemark = new ymaps.Placemark([48.477, 135.06], {
            hintContent: 'Собственный значок метки'
        }, {
            iconLayout: 'default#image',
            iconImageHref: 'img/img0.png',
            iconImageSize: [208, 96],
            iconImageOffset: [-15, -96]
        });

    var mapMenu = $('<ul class="map-menu"></ul>'); 
    
    myMap.geoObjects.add(myPlacemark);
        
    for (var i = 0, l = groups.length; i < l; i++) {
        createSuperGroup(groups[i]);
    }

    function createSuperGroup(group, title) {
        var superGroupItem = $('<li><a href="#" class="group-name">' + group.name + '</a></li>');
        var menuGroup = $('<ul class="map-submenu"></ul>');

        superGroupItem
            .append(menuGroup)
            .appendTo(mapMenu)
            .find('a')
            .addClass(group.ico)
            .toggle(
            function(){
                menuGroup.show();
                superGroupItem.addClass('active');
            },
            function(){
                menuGroup.hide();
                superGroupItem.removeClass('active');
            });

        for (var i = 0; i < group.items.length; i++) {
            createMenuGroup(group.items[i], menuGroup);
        }
    }

    function createMenuGroup (group, menuGroup) {
        // Пункт меню.
        var menuItem = $('<li><a href="#">' + group.name + '</a></li>'),
            // Коллекция для геообъектов группы.
            collection = new ymaps.GeoObjectCollection(null, {
            iconLayout: group.style,
            iconImageHref: group.img,
            iconImageSize: [32, 37],
            iconImageOffset: [-5, -37]
            }),
        // Контейнер для подменю.
            secondSubmenu = $('<ul class="map-second-submenu" style="display:none;"></ul>');

        // Добавляем коллекцию на карту.
        //myMap.geoObjects.add(collection);

        // Добавляем подменю.
        menuItem
            .append(secondSubmenu)
            // Добавляем пункт в меню.
            .appendTo(menuGroup)
            // По клику удаляем/добавляем коллекцию на карту и скрываем/отображаем подменю.
            .find('a')
            .toggle(
            function () {
                myMap.geoObjects.add(collection);
                // secondSubmenu.show();
                menuItem.addClass('active');
            },
            function () {
                myMap.geoObjects.remove(collection);
                // secondSubmenu.hide();
                menuItem.removeClass('active');
            });
        for (var j = 0, m = group.items.length; j < m; j++) {
            createSubMenu(group.items[j], collection, secondSubmenu);
        }
    }

    function createSubMenu (item, collection, submenu) {
        // Пункт подменю.
        var submenuItem = $('<li><a href="#">' + item.name + '</a></li>'),
        // Создаем метку.
            placemark = new ymaps.Placemark(item.center, { hintContent: item.name });

        // Добавляем метку в коллекцию.
        collection.add(placemark);
        // Добавляем пункт в подменю.
        submenuItem
            .appendTo(submenu)
            // При клике по пункту подменю открываем/закрываем баллун у метки.
            .find('a')
            .toggle(function () {
                placemark.balloon.open();
            }, function () {
                placemark.balloon.close();
            });
    }

    // Добавляем меню в тэг BODY.
    mapMenu.appendTo($('.left-side'));
    // Выставляем масштаб карты чтобы были видны все группы.
    // myMap.setBounds(myMap.geoObjects.getBounds());
}