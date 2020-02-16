import request from 'superagent';


function getRandomXkcd() {
  return request.get(`http://localhost:5000/api/xkcd`);
}

export function getImages() {
  return Promise.all([
    getRandomXkcd(),
  ])
  .then(responses => responses.map(res => res.body))
  .then(images => {
    console.log('imgz', images);

    return [
      {source: 'Unsplash', src: 'https://picsum.photos/200'},
      {source: 'XKCD', src: images[0].img, alt: images[0].alt, desc: images[0].transcript, date: `${images[0].day}/${images[0].month}/${images[0].year}`},
    ];
  });
}


export function login(email, password) {
  return request
    .post('http://localhost:5000/api/login')
    .send({email, password})
    .set('accept', 'json')
    .then((err, res) => {
      console.log('OK', err, res);
      return true;
    }, reason => {
      console.log('ERROR', reason);
      return false;
    });
}
