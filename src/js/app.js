import '../index.html';
import '../css/style.css';

import { PassengerCar, Truck } from './modules/car.js';
import { Station } from './modules/station.js';

const open = document.querySelector('.open');
const car = document.querySelector('.car');

const testArray = {
  passengerCar: [
    ['Opel', 'Crossland', 45],
    ['Ford', 'Fusion', 45, 'gaz'],
    ['Ford', 'Fusion', 45, 'gaz'],
    ['Hyundai', 'Elantra', 47, 'gaz'],
    ['Opel', 'Grandland X', 53],
    ['Mazda', 'cx-5', 55],
    ['BMW', 'M5', 68],
    ['BMW', 'X5', 80],
    ['BMW', 'X3', 65],
    ['BMW', '5', 66],
    ['Toyota', 'Camry', 50, 'gaz'],
    ['Honda', 'Civic', 50, 'gaz'],
    ['Volkswagen', 'Jetta', 55, 'gaz'],
    ['Kia', 'Optima', 5, 'gaz'],
    ['Nissan', 'X-Trail', 65, 'gaz'],
  ],
  truck: [
    ['MAN', 'TGS', 400],
    ['MAN', 'TGX', 300],
    ['Mercedes-Benz', 'Actros', 450],
    ['Mercedes-Benz', 'Actros L', 650],
    ['Volvo', 'FH16', 700],
    ['Volvo', 'FM', 700],
    ['Volvo', 'FMX', 540],
    ['Scania', 'ODIN', 410, 'gaz'],
    ['Scania', 'B8X8HZ', 410, 'gaz'],
    ['Scania', 'A4X2NA', 410, 'gaz'],
  ],
};

const getTestCar = () => {
  const typeBool = Math.random() < 0.6;
  const listCar = typeBool ? testArray.passengerCar : testArray.truck;
  const randomCar = listCar[Math.floor(Math.random() * listCar.length)];
  return typeBool ? new PassengerCar(...randomCar) : new Truck(...randomCar);
};

const station = new Station(
  [
    {
      type: 'petrol',
      count: 2,
      speed: 5,
    },
    {
      type: 'diesel',
      count: 1,
      speed: 10,
    },
    {
      type: 'gaz',
      count: 1,
      speed: 10,
    },
  ],
  '.app',
);

open.addEventListener('click', () => {
  station.init();
  console.log(station);

  open.remove();
  car.style.display = 'block';
  car.addEventListener('click', () => {
    station.addCarQueue(getTestCar());
  });
});
