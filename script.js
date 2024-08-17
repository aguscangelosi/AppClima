let lat
let lon

const temperaturaValor = document.getElementById('temperaturaValor');
const temperaturaDescripcion = document.getElementById('temperaturaDescripcion');
const ubicacion = document.getElementById('ubicacion');
const icono = document.getElementById('iconoAnimado');
const vientoVelocidad = document.getElementById('vientoVelocidad');


window.addEventListener('load', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(posicion => {
            lat = posicion.coords.latitude;
            lon = posicion.coords.longitude;

            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=es&appid=790bb19771e79daac71114e690130f21`;

            console.log(lat);
            console.log(lon);

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    let temp = Math.round(data.main.temp - 273.15);
                    temperaturaValor.textContent = temp + "°";

                    let ub = data.name;
                    ubicacion.textContent = ub;

                    let temperaturaDescr = data.weather[0].description;
                    temperaturaDescripcion.textContent = temperaturaDescr.toUpperCase();

                    let vientoVel = data.wind.speed;
                    vientoVelocidad.textContent = vientoVel + "m/s";


                    //icono
                    let codigoDescripcion = data.weather[0].main;
                    console.log(codigoDescripcion)

                    switch (codigoDescripcion) {
                        case 'Clear':
                            icono.src = 'Iconos/day.svg'
                            break;
                        case 'Thunderstorm':
                            icono.src = 'Iconos/thunder.svg'
                            break;
                        case 'Drizzle', 'Rainy':
                            icono.src = 'Iconos/rainy-5.svg'
                            break;
                        case 'Clouds':
                            icono.src = 'Iconos/cloudy.svg'
                            break;
                    }
                })
                .catch(error => console.log(error));



        })
    }
})

