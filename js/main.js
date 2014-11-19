// ymaps.ready(init);
// var myMap,
//     myPlacemark;

// function init(){     
//     myMap = new ymaps.Map("map", {
//         center: [48, 135],
//         zoom: 8
//     });

//     myPlacemark = new ymaps.GeoObject({
//         // Описание геометрии.
//         geometry: {
//             type: "Point",
//             coordinates: [48, 135]
//         },
//         // Свойства.
//         properties: {
//             // Контент метки.
//             // iconContent: 'Я тащусь',
//             hintContent: 'Хинт'
//         }
//     }, {
//         // Опции.
//         // Необходимо указать данный тип макета.
//         iconLayout: 'default#image',
//         // Своё изображение иконки метки.
//         iconImageHref: 'img/main-map-point.png',
//         // Размеры метки.
//         iconImageSize: [208, 96],
//         // Смещение левого верхнего угла иконки относительно
//         // её "ножки" (точки привязки).
//         iconImageOffset: [-3, -42]
//         // Опции.
//         // Иконка метки будет растягиваться под размер ее содержимого.
//         // preset: 'islands#blackStretchyIcon',
//         // Метку можно перемещать.
//         // draggable: true
//     });

//     myMap.geoObjects
//         .add(myPlacemark)
//         .add(new ymaps.Placemark([48, 135], {
//             balloonContent: 'цвет <strong>воды пляжа бонди</strong>'
//         }, {
//             preset: 'islands#icon',
//             iconColor: '#ff0000'
//         }))
//         .add(new ymaps.Placemark([48.3, 135.3], {
//             balloonContent: '<strong>серобуромалиновый</strong> цвет'
//         }, {
//             preset: 'islands#dotIcon',
//             iconColor: '#735184'
//         }))
//         .add(new ymaps.Placemark([48.5, 135.5], {
//             balloonContent: 'цвет <strong>влюбленной жабы</strong>'
//         }, {
//             preset: 'islands#circleIcon',
//             iconColor: '#3caa3c'
//         }));
// }


// Создаем геообъект с типом геометрии "Точка".
// myGeoObject = new ymaps.GeoObject({
//     // Описание геометрии.
//     geometry: {
//         type: "Point",
//         coordinates: [55.8, 37.8]
//     },
//     // Свойства.
//     properties: {
//         // Контент метки.
//         iconContent: 'Я тащусь',
//         hintContent: 'Ну давай уже тащи'
//     }
// }, {
//     // Опции.
//     // Иконка метки будет растягиваться под размер ее содержимого.
//     preset: 'islands#blackStretchyIcon',
//     // Метку можно перемещать.
//     draggable: true
// });