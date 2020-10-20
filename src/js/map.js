function mapInit() { 
    ymaps.ready(() => { 
        let map = new ymaps.Map('map', {
            center: [55.76, 37.64],
            zoom: 12,
            controls: ['zoomControl'],
            behaviours: ['drag']
        });
    })
}

export { 
    mapInit
}