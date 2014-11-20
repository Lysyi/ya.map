ymaps.ready(init);

function init() {

    var myMap = new ymaps.Map('map', {
            center: [48.47458821, 135.06077406],
            zoom: 15.5,
            controls: []
        });
    
    var myPlacemark = new ymaps.Placemark([48.476443, 135.058188], {
            hintContent: 'Хабаровск Сити'
        }, {
            iconLayout: 'default#image',
            iconImageHref: 'img/main-mark.png',
            iconImageSize: [208, 96],
            iconImageOffset: [-104, -96]
        });

    var mapMenu = $('<ul class="map-menu"></ul>'); 
        
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
        var menuItem = $('<li><a href="#">' + group.name + '</a></li>'),
            collection = new ymaps.GeoObjectCollection(null, {
            iconLayout: group.style,
            iconImageHref: group.img,
            iconImageSize: [32, 37],
            iconImageOffset: [-16, -37]
            }),
            secondSubmenu = $('<ul class="map-second-submenu" style="display:none;"></ul>');

        // Добавляем коллекцию на карту.
        //myMap.geoObjects.add(collection);

        menuItem
            .append(secondSubmenu)
            .appendTo(menuGroup)
            .find('a')
            .toggle(
            function () {
                myMap.geoObjects.add(collection);
                menuItem.addClass('active');
            },
            function () {
                myMap.geoObjects.remove(collection);
                menuItem.removeClass('active');
            });
        for (var j = 0, m = group.items.length; j < m; j++) {
            createSubMenu(group.items[j], collection, secondSubmenu);
        }
    }

    function createSubMenu (item, collection, submenu) {
        var submenuItem = $('<li><a href="#">' + item.name + '</a></li>'),
            placemark = new ymaps.Placemark(item.center, { hintContent: item.name });

        collection.add(placemark);
        submenuItem
            .appendTo(submenu)
            .find('a')
            .toggle(function () {
                placemark.balloon.open();
            }, function () {
                placemark.balloon.close();
            });
    }

    mapMenu.appendTo($('.left-side'));

    myMap.setBounds(myMap.geoObjects.getBounds());
    myMap.geoObjects.add(myPlacemark);
}