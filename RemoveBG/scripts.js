let addCard = document.getElementById('addCard');
let displayCard = document.getElementById('displayCard');
let loadingCard = document.getElementById('loadingCard');
let downloadCard = document.getElementById('downloadCard');
let fileInput = document.getElementById('fileInput');
let imgBefore = document.getElementById('display-img')
let startBtn = document.getElementById('startBtn');
let imgAfter = document.querySelector('.image-after');
let imgSM = document.querySelector('.image-before')
let down = document.getElementById('downloadHref')
let uploadAnother = document.getElementById('uploadAnother');


const reader = new FileReader();
const formData = new FormData();
let file = null;


/* API */
const API_URL = 'https://api.remove.bg/v1.0/removebg';
const API_KAY = 'MaTfvWc7DX1QtRkbZpHkwEG7';
/*end API*/


function activeCard(screen) {
  addCard.style.display = 'none';
  displayCard.style.display = 'none';
  loadingCard.style.display = 'none';
  downloadCard.style.display = 'none';
  screen.style.display = 'flex';
}

activeCard(addCard)

fileInput.addEventListener('input', () => {
  file = fileInput.files[0];
  reader.readAsDataURL(file)
  reader.onloadend = () => {
    console.log('done')
    imgBefore.src = reader.result
    imgSM.src = reader.result
  }
  activeCard(displayCard)
})

startBtn.addEventListener('click', () => {
  formData.append('image_file', file)
  activeCard(loadingCard)
  fetch(API_URL, {
    method: 'POST',
    headers: {
      'X-API-Key': API_KAY,
    },
    body: formData,
  }).then((res) => res.blob()).then((blob) => {
    console.log(blob)
    reader.readAsDataURL(blob)
    reader.onloadend = () => {
      imgAfter.src = reader.result;
       down.setAttribute('href',reader.result)
    }
    activeCard(downloadCard)
  })
})
uploadAnother.addEventListener('click',()=>{
  window.location.reload()
})