// Performs some functions when the page is loaded
const pageLoaded = async () => {
  
  const dados = await getDateAPI();
  const fish = dados[0];
  //console.log(fish)

  buildPage(fish);
  listHeight();

  const listFish = await fishNameList(dados);
  createFishListContainer(listFish);

  const listLinks = document.querySelectorAll('.list-links');
  removeTabindex(listLinks)

  const searchForm = document.getElementById('search-form');
  searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
  })

  const search = document.getElementById('search-fish')
  
  search.addEventListener('change', (element) => {

    const fish = element.target.value;
    if(fish != '') {
      console.log(fish)
      searchFish(fish, listFish);
    }

  })

  search.addEventListener('keydown', (element) => {
    if(element.target.value === '') {
      createFishListContainer(listFish);
    }
  })
  
}

// Get date from API
const getDateAPI = async () => {

  const url = "https://www.fishwatch.gov/api/species";

  const resposta = await fetch(url);
  const dados = await resposta.json();
  return dados
}

/* 
* Create a fish list
* @param array
*/
const fishNameList = (dados) => {

  const getFishNames = (fishList) => {
    let fishNames = fishList.map((fish) => {
      return fish['Species Name'];
    })
  
    return fishNames;
  }

  let fishNames = getFishNames(dados);

  return fishNames.sort();
}

/*
* Creat a container with the fish list
* @param array
*/
const createFishListContainer = (fishNames) => {
  
  const fishListContainer = document.getElementById('fish-list-container');

  let fishList = fishNames.map((fish) => {
    return '<li><a tabindex="0" class="list-links" href="'+fish+'" onclick="viewFish(this); return false">'+fish+'</a></li>'
  })
 
  fishListContainer.innerHTML = '<ul>'+fishList.join('')+'</ul>';
}

// Search fish
const searchFish = (fish, listFish) => {
  
  const pattern = new RegExp(fish, "i")

  const checkFish = (fishName) => {
    //return fishName.match(fish)
    return pattern.test(fishName)
  }
  
  const result = listFish.filter(checkFish)

  createFishListContainer(result)
}

// View the selected fish
const viewFish = async (e) => {
  const fishName = e.getAttribute('href');
  //toggleMask(true)
  //toggleLoader(true)

  const dados = await getDateAPI()

  for(let fish of dados) {
    if(fish['Species Name'] === fishName) {
      await buildPage(fish);
      //toggleLoader(false)
    }
  }
  toggleList();
  focusElement('species-illutration-photo');
  scrollToTop(window);
}

// Build the page with the API data
const buildPage = (fish) => {
  toggleLoader(true)
  toggleMask(true)
  const speciesIllutrationPhoto = document.getElementById('species-illutration-photo');
  speciesIllutrationPhoto.src = fish['Species Illustration Photo'].src;
  speciesIllutrationPhoto.alt = fish['Species Illustration Photo'].alt;

  speciesIllutrationPhoto.onload = function () {
    toggleLoader(false)
    toggleMask(false)
    document.getElementById('wrapper').style.display = 'block';
  }

  const speciesName = document.getElementById('species-name');
  speciesName.innerText = fish['Species Name'];

  const scientificName = document.getElementById('scientific-name');
  scientificName.innerText = fish['Scientific Name'];

  const speciesAliases = document.getElementById('species-aliases');
  const cleanText = fish['Species Aliases'].replace(/<\/?[^>]+(>|$)/g, "");
  speciesAliases.innerHTML = cleanText;

  const galleryWrapper = document.getElementById('gallery-wrapper');
  const enlargedImage = document.getElementById('enlarged-image');
  const imageGallery = fish['Image Gallery'];

  if(imageGallery) {
    
    galleryWrapper.style.display = "block";

    enlargedImage.src = Array.isArray(imageGallery) ? imageGallery[0].src : imageGallery.src;
    enlargedImage.alt = Array.isArray(imageGallery) ? imageGallery[0].alt : imageGallery.alt;

    const tumbGallery = document.getElementById('tumb-gallery');

    if(Array.isArray(imageGallery)) {
      tumbGallery.style.display = "flex";
      let thumbs = imageGallery.map((image) => {
        return '<a onclick="enlargeImage(this); return false" href="'+image.src+'"><img src="'+image.src+'" alt="'+image.alt+'"></a>';
      })
      
      const stringTumbs = thumbs.join('')
      tumbGallery.innerHTML = stringTumbs;
    }
    else {
      tumbGallery.style.display = "none";
    }
    
  } 
  else {
    galleryWrapper.style.display = "none";
  }
  
  const biologyWrapper = document.getElementById('biology-wrapper');
  
  if(fish['Biology']) {
    biologyWrapper.style.display = "block";
    const biology  = document.getElementById('biology');
    biology.innerHTML = fish['Biology'];
  } 
  else {
    biologyWrapper.style.display = "none";
  }

  const locationWrapper = document.getElementById('location-wrapper');
  
  if(fish['Location']) {
    locationWrapper.style.display= "block";
    const location  = document.getElementById('location');
    location.innerHTML = fish['Location'];
  }
  else {
    locationWrapper.style.display= "none";
  }
  
}

// Function that capture the viewport size and determine the list size
const listHeight = () => {
  const list = document.getElementById('list');
  const windowHeight = window.innerHeight;
  list.style.height = windowHeight+'px';
}

const hiddenList = () => {
  toggleList()
  toggleMask(false)
}

// Function that toggles the opened and closed list
const toggleList = () => {
  
  const list = document.getElementById('list')
  const listButton = document.getElementById('list-button');
  const listLinks = document.querySelectorAll('.list-links');
  let status = list.getAttribute('aria-hidden');
  
  if(status === "true") {
    for(let i = 0; i < listLinks.length; i++) {
      listLinks[i].setAttribute('tabindex', '0')
    }

    const searchFish = document.getElementById('search-fish');
    searchFish.setAttribute('tabindex', '0')

    const closeListButton = document.getElementById('close-list-button');
    closeListButton.setAttribute('tabindex', '0')

    list.setAttribute('aria-hidden', 'false');
    list.style.left = "0px";
    toggleMask(true)
    focusElement('container-close-button');
    scrollToTop(list)
  } 
  else {
    removeTabindex(listLinks)
    /*
    for(let i = 0; i < listLinks.length; i++) {
      listLinks[i].setAttribute('tabindex', '-1')
    }
    */
    list.setAttribute('aria-hidden', 'true');
    list.style.left = "-300px";
  }
}

const removeTabindex = (listLinks) => {
  for(let i = 0; i < listLinks.length; i++) {
    listLinks[i].setAttribute('tabindex', '-1')
  }
  const searchFish = document.getElementById('search-fish');
  searchFish.setAttribute('tabindex', '-1')

  const closeListButton = document.getElementById('close-list-button');
  closeListButton.setAttribute('tabindex', '-1')
}

/*
* Toggle the mask to opened or closed
* @param boolean
*/
const toggleMask = (bool) => {
  
  const mask = document.getElementById('mask');

  if(bool) {
    mask.style.display = "block";
  }
  else {
    mask.style.display = "none";
  }
}

/*
* Toggle the loading to opened or closed
* @param boolean
*/
const toggleLoader = (bool) => {
  const loader = document.getElementById('loading')

  if(bool) {
    loader.style.display = "block";
  }
  else {
    loader.style.display = "none";
  }
}

// Give focus on fish illustration
const focusElement = (id) => {
  document.getElementById(id).focus();
}

// Move vertical scroll to the top
const scrollToTop = (object) => {
  object.scrollTo(0, 0);
}

const enlargeImage = (src) => {

  const source = src.firstChild;
  const enlargedImage = document.getElementById('enlarged-image');
  enlargedImage.setAttribute('src', source.src)

  return false;
}
pageLoaded();
window.addEventListener("resize", listHeight);