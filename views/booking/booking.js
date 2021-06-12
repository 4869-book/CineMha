const container = document.querySelector('.col-9');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const total = document.getElementById('total');
const price2 = document.getElementById('price2');
const results2 = document.getElementById('results2');
const movieSelect = document.getElementById('movie');

// let ticketPrice = +movieSelect.value;

//Update total and count
function updateSelectedCount() {
  const selectedSeats1 = document.querySelectorAll('.premium.selected');
  const selectedSeats2 = document.querySelectorAll('.deluxe.selected');
  const selectedSeatsCount1 = (selectedSeats1.length);
  const selectedSeatsCount2 = (selectedSeats2.length);
  console.log(selectedSeatsCount1+' '+selectedSeatsCount2)
  $('#price').text((selectedSeatsCount1*160)+(selectedSeatsCount2*100));
  price2.value=(selectedSeatsCount1*160)+(selectedSeatsCount2*100)
  // total.innerText = selectedSeatsCount * 100;
}


//Seat click event
container.addEventListener('click', e => {
  var price;
  if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
    e.target.classList.toggle('selected');
    e.target.classList.toggle('fa-check-circle');
    e.target.classList.toggle('bg-danger');
  }
  if(e.target.classList.contains('premium')) {
    price = 160
    
  }else{
    price = 100;
  }
  updateSelectedCount();
});

var items = [];





$(".btn-group button").on('click', function(e){
  var indexOfElement = items.indexOf(e.target.value);
  //value is not in the array
  if (indexOfElement < 0) {
    items.push(e.target.value);
    
  } else {
    //value is in the array, remove it
    items.splice(indexOfElement, 1);
  }
  
  $('#results').text(items);
  results2.value=items;
});