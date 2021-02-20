/**************************************************************************
                      ------Additional (2) fiture-----
(1) Added a (Check Out) button:
  Activities: When user click (Check Out) button, user can see which type of
  images select before for the slider this image went to user favourite list 
  and this list under a divission. Finaly,this divission is control by (Check Out)
  and his child (Close) button.

(2) Added New divission under the slider divission:
  User can see slider duration in here 
***************************************************************************/



//  select all type of element Id
const imagesArea = document.querySelector('.images');
const gallery = document.querySelector('.gallery');
const galleryHeader = document.querySelector('.gallery-header');
const searchBtn = document.getElementById('search-btn');
const sliderBtn = document.getElementById('create-slider');
const sliderContainer = document.getElementById('sliders');
const imagePushDiv=document.getElementById('imagePushDiv');
const checkOutBtn=document.getElementById('checkOutBtn');
const imageWraper=document.getElementById('imageWraper');
const closeBtn=document.getElementById('closeBtn');
const parentZoomer=document.getElementById('parentZoomer');
const durationTimeShow=document.getElementById('durationTimeShow');
const key = '15674931-a9d714b6e9d654524df198e00&q';
let sliders = [];
let timer;



// data load 
const getImages = (query) => {
  fetch(`https://pixabay.com/api/?key=${key}=${query}&image_type=photo&pretty=true`)
    .then(response => response.json())
    .then(data => showImages(data.hits))
    .catch(err => console.log("no internet"))
}


// show images 
const showImages = (images) => {
  imagesArea.style.display = 'block';
  gallery.innerHTML = '';
  // show gallery title
  galleryHeader.style.display = 'flex';
  images.forEach(image => {
    let div = document.createElement('div');
    div.className = 'col-lg-3 col-md-4 col-xs-6 img-item mb-2';
    div.innerHTML = ` 
    <img class="img-fluid img-thumbnail" onclick=selectItem(event,"${image.webformatURL}") src="${image.webformatURL}" alt="${image.tags}">`;
    gallery.appendChild(div)
  })

}

// select item 
let slideIndex = 0;
const selectItem = (event, img) => {
  let element = event.target;
  element.classList.add('added');
  element.style="display:none;";
 
  let item = sliders.indexOf(img);
  if (item === -1) {
    sliders.push(img);
    pushImage(img);
    
  } else {
    alert('Hey, Already added !')
  }
}


// check slider image length
const createSlider = () => {
  if (sliders.length < 2) {
    alert('Select at least 2 image.')
    return;
  }

  // crate slider previous next area
  sliderContainer.innerHTML = '';
  const prevNext = document.createElement('div');
  prevNext.className = "prev-next d-flex w-100 justify-content-between align-items-center";
  prevNext.innerHTML = ` 
  <span class="prev" onclick="changeItem(-1)"><i class="fas fa-chevron-left"></i></span>
  <span class="next" onclick="changeItem(1)"><i class="fas fa-chevron-right"></i></span>
  `;
  sliderContainer.appendChild(prevNext)
  document.querySelector('.main').style.display = 'block';
  // hide image aria
  imagesArea.style.display = 'none';
  const duration = document.getElementById('duration').value||1000;
  sliders.forEach(slide => {
    let item = document.createElement('div')
    item.className = "slider-item";
    item.innerHTML = `<img class="w-100"
    src="${slide}"
    alt="">`;
    sliderContainer.appendChild(item)
  })
  changeSlide(0)
  if(duration>0){
    timer = setInterval(function () {
      slideIndex++;
      changeSlide(slideIndex);
    }, duration);

  }
  else{
    document.querySelector('.main')
    .innerHTML
    ="Please include a Positive slider duration <br>Try again! ";

  }
  
}


// change slider index 
const changeItem = index => {
  changeSlide(slideIndex += index);
}


// change slide item
const changeSlide = (index) => {

  const items = document.querySelectorAll('.slider-item');
  if (index < 0) {
    slideIndex = items.length - 1
    index = slideIndex;
  };

  if (index >= items.length) {
    index = 0;
    slideIndex = 0;
  }

  items.forEach(item => {
    item.style.display = "none"
  })

  items[index].style.display = "block"
}


// user choice list function
const pushImage=(pushImage)=>{
  let div = document.createElement('div');
  div.className = 'col-lg-3 col-md-3 col-xs-6 img-item mb-2';
  div.innerHTML = `
  <img class="img-fluid img-thumbnail" src="${pushImage}" >
  `
  imageWraper.appendChild(div);
}


// search buttton activities
searchBtn.addEventListener('click', function () {
  document.querySelector('.main').style.display = 'none';
  clearInterval(timer);
  const search = document.getElementById('search');
  getImages(search.value)
  sliders.length = 0;
})


//search buttton keypress activities
const search = document.getElementById("search");
search.addEventListener("keypress", function(event) {
    if (event.key==='Enter')
    searchBtn.click();
});


// create slider button activities
sliderBtn.addEventListener('click', function () {
  createSlider();
  durationTimePreview();
  
})


// check out button activities
checkOutBtn.addEventListener("click",()=>{
  imagePushDiv.style="display:block;transition:all 1s"

})

// close button activities
closeBtn.addEventListener("click",()=>{
  imagePushDiv.style.display="none";

})


// show duration time
function durationTimePreview(){
  const duration = document.getElementById('duration').value||1000;
  durationTimeShow.innerHTML=duration+" ms";
}


// Thank you