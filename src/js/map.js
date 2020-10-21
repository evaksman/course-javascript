function mapInit() { 
    ymaps.ready(() => { 
        let map = new ymaps.Map('map', {
            center: [55.76, 37.64],
            zoom: 12,
            controls: ['zoomControl', 'searchControl'],
            behaviors: ['drag']
        }, {
            balloonMaxWidth: 200,
            searchControlProvider: 'yandex#search'
        });
        console.log(map);
        addListeners(map);
    });
}

function addListeners(map) {
    // map.events.add('click', event => openModal(event));
    map.events.add('click', e => {
        if (!map.balloon.isOpen()) {
            const coords = e.get('coords');
            map.balloon.open(coords, {
                contentHeader:'Событие!',
                contentBody:'<p>Кто-то щелкнул по карте.</p>' +
                    '<p>Координаты щелчка: ' + [
                    coords[0].toPrecision(6),
                    coords[1].toPrecision(6)
                    ].join(', ') + '</p>',
                contentFooter:'<sup>Щелкните еще раз</sup>'
            });
        } else map.balloon.close();
        // getClickCoords(e);
    });


    // map.events.add('balloonopen', function (e) {
    //     map.hint.close();
    // });
}

// function openModal(event) {
//     getClickCoords(event);
//     //
// }

async function getClickCoords(event) {
    const posX = event.getSourceEvent().originalEvent.domEvent.originalEvent.clientX;
    const posY = event.getSourceEvent().originalEvent.domEvent.originalEvent.clientY;

    const coords = event.get('coords');
    // console.log(coords);
    // console.log(posX, posY);

    const objectAddress = await getObjectAddress(coords);
    console.log(objectAddress);
    return objectAddress;
    // debugger;
}

function getObjectAddress(coords) {
    return new Promise((resolve, reject) => {
        ymaps
            .geocode(coords)
            .then(response => resolve(response.geoObjects.get(0).getAddressLine()))
            .catch(e => reject(e));
    });
}

export { 
    mapInit
}