ymaps.ready(init);

function init() {

    var myMap = new ymaps.Map('map', {
            center: [48.47458821, 135.06077406],
            zoom: 15.5,
            controls: []
        });
    
    var myPlacemark = new ymaps.Placemark([48.476443, 135.058188], {
            hintContent: 'Хабаровск Сити',
            balloonContent: 'г. Хабаровск ул.<br>Ленина<br>тел. +7(030)2324-423-14'
        }, {
            iconLayout: 'default#image',
            iconImageHref: 'img/main-mark.png',
            iconImageSize: [208, 96],
            iconImageOffset: [-104, -96]
        });

    var mapMenu = $('<ul class="map-menu"></ul>'); 
    
    var groupCount = [];

    for (var i = 0, l = groups.length; i < l; i++) {
        createSuperGroup(groups[i]);
        groupCount[i] = groups[i];
    }

    function createSuperGroup(group, title) {
        var superGroupItem = $('<li><a href="#" class="group-name">' + group.name + '</a></li>');
        var menuGroup = $('<ul class="map-submenu"></ul>');

        var showMenuFn = function () {
            menuGroup.css('display', 'block');
            superGroupItem.addClass('active');
        };

        var hideMenuFn = function() {
            menuGroup.hide();
            superGroupItem.removeClass('active');
        };

        superGroupItem
            .append(menuGroup)
            .appendTo(mapMenu)
            .find('a')
            .addClass(group.ico)
            .toggle( function () {
                if (typeof(group.open) !== 'undefined' && group.open) {
                    $(this).toggle( hideMenuFn, showMenuFn );
                }
                else {
                    $(this).toggle( showMenuFn, hideMenuFn );
                }
            });

        if (typeof(group.open) !== 'undefined' && group.open) {
            showMenuFn();
        }

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

        // myMap.geoObjects.add(collection);

        var addCollectionFn = function () {
            myMap.geoObjects.add(collection);
            menuItem.addClass('active');
        };
        
        var removeCollectionFn = function () {
            myMap.geoObjects.remove(collection);
            menuItem.removeClass('active');
        };

        menuItem
            .append(secondSubmenu)
            .appendTo(menuGroup)
            .find('a').toggle( function () {
                if (typeof(group.open) !== 'undefined' && group.open) {
                    $(this).toggle( removeCollectionFn, addCollectionFn );
                }
                else {
                    $(this).toggle( addCollectionFn, removeCollectionFn );
                }
            });

        if (typeof(group.open) !== 'undefined' && group.open) {
            addCollectionFn();
            // secondSubmenu.css('display', 'block');
        }

        for (var j = 0, m = group.items.length; j < m; j++) {
            createSubMenu(group.items[j], collection, secondSubmenu);
        }
    }

    function createSubMenu (item, collection, submenu) {
        var submenuItem = $('<li><a href="#">' + item.name + '</a></li>'),
            placemark = new ymaps.Placemark(item.center, { hintContent: item.name, balloonContent: item.content, });
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
    // myMap.setBounds(myMap.geoObjects.getBounds());
    myMap.geoObjects.add(myPlacemark);
}