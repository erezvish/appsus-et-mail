

// Client Side State of the store
// Kind of caching...
let markers = [];

const getMarkers = () => {
  return new Promise(resolve => {
    // simple caching mechanism
    if (markers.length) {
      resolve(markers);
    }
    else {
      setTimeout(() => {
        markers = generateMarkers();
        resolve(markers);
      }, 500);
    }
  });
}

function getMarkerById(markerId) {
  return getMarkers().then(markers => {
    const marker = markers.find(marker => markerId === marker.id);
    return marker;
  });
}

function deleteMarker(marker) {
  console.log('Deleting the marker', marker)
  var idx = markers.indexOf(marker)
  markers.splice(idx, 1);
}

function getNext(marker) {
  // select next in a cyclic way
  var idx = markers.indexOf(marker);
  return (idx < marker.length - 1) ?
    markers[idx + 1] : markers[0];
}

function addEmptyMarker(position) {
  let id = markers.reduce(function (acc, marker) {
    return Math.max(acc, marker.id);
  }) + 1;
  let emptyMarker = generateMarker({title: null, position, tags:[], icon: null, content: null }, id)
  markers.push(emptyMarker);
}

function saveMarker(marker) {
  var idx = markers.findIndex(currmarker => currmarker.id === marker.id)
  if (idx > -1) {
    markers.splice(idx, 1, marker);
  } else {
    markers.push(marker);
  }
}

// Used to create local data with no AJAX
function generateMarkers() {
  // console.log('Generating markers!');
  const markers = [
    { title: 'school', lat: 32, lng: 33, tags: ['boring', 'far'] },
    { title: 'home', lat: 32, lng: 34 },
  ];
  return markers.map(generateMarker);
}

function generateMarker(data, i) {
  // console.log('Yes, I am generating!');
  return {
    id: i + 1,
    title: data.title || `no-title + ${i + 1}`,
    position: { lat: data.lat || null, lng: data.lng || null, },
    tags: data.tags || [],
    icon: { url: '../assets/img/home.png' },
    content: `<h4>${data.title} </h4> <p> this is just a fillup for the windowInfo stuff ect ect ect. 
    // We're filling up with text to see something on the map </p>`
  }
}

export default {
  getMarkers,
  getMarkerById,
  addEmptyMarker,
  deleteMarker,
  getNext,
  saveMarker
}
// function getProductsFromGenericAPI() {
//   const params = {
//     rows:       10,
//     id:        '{index}',
//     price:     '{number|1000}',
//     title: '{lorem|2}',
//     description: '{lorem|10}',
//     pretty: true
//   }

//   return $.getJSON('http://www.filltext.com', params);

// }

