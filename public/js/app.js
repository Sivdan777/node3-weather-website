  const weatherForm = document.querySelector('form');
  const search = document.querySelector('input');
  const messageOne = document.querySelector('#message-1');
  const messageTwo = document.querySelector('#message-2');

    weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;
    // console.log(location);

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    fetch('/weather?address=' + location)
    .then((response) => {
      response.json()
        .then((data) => {
          if(data.error) {
            messageOne.textContent = data.error;
          } else {
            // console.log(data);
            // console.log('Location: ' + data.location);
            // console.log('Temperature: ' + data.forecast.temperature);
            messageOne.textContent = data.location;
            messageTwo.textContent = data.forecast.temperature + ' degrees Celsius';
          }
        })
    });

  });