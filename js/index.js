const allPostData = async (searchText) => {
  // console.log(searchText)
  if (searchText != undefined) {
    console.log(searchText)
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchText}`);
    const data = await res.json();
    // console.log(data.posts);
    const allPosts = data.posts;
    displayAllPosts(allPosts);
  }else{
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts');
    const data = await res.json();
    const allPosts = data.posts;
    displayAllPosts(allPosts);
  }
 
}


const displayAllPosts = (allPosts) => {
  // console.log(allPosts)
  const cardContainer = document.getElementById('card-container');

  // clear phone container cards before adding new cards
  cardContainer.textContent = '';
  

  allPosts.forEach(post => {
    // console.log(post)

    const postCard = document.createElement('div');
    postCard.classList = `my-5  flex flex-col lg:flex-row gap-4 p-4 lg:p-16 bg-[#7D7DFC1A] rounded-2xl`;
    postCard.innerHTML = `
        <!-- 1st -->
            <div class="indicator">
              <span id="isActive-field" class="${post.isActive? 'indicator-item badge bg-green-500'
                : 'indicator-item badge bg-orange-600'}"></span> 
              <div class="grid  w-32 h-32 bg-base-300 place-items-center">
                <img class="rounded-2xl" src="${post.image}" alt="">
              </div>
            </div>
            <!-- 2nd -->
            <div class="space-y-3">
               <div class="flex gap-3">
                <p># <span>${post.category}</span></p>
                <p>Authour : <span>${post.author.name}</span></p>
               </div>
               <h4 class="text-xl font-bold">${post.title}</h4>
               <p>${post.description}</p>
               <div class="border border-x-2 border-dashed border-[#12192D40]"></div>
               <div class="flex justify-between">
                  <div class="flex gap-3">
                    <!-- 1st -->
                      <div class="flex gap-2">
                        <img src="images/tabler-icon-message-2.svg" alt="">
                        <p>${post.comment_count}</p>
                      </div>
                    <!-- 2nd -->
                      <div class="flex gap-2">
                        <img src="images/tabler-icon-eye.svg" alt="">
                        <p>${post.view_count}</p>
                      </div>
                    <!-- 3rd -->
                      <div class="flex gap-2">
                        <img src="images/tabler-icon-clock-hour-9.svg" alt="">
                        <p>${post.posted_time} min </p>
                      </div>
                  </div>
                  <div>
                    <img onclick="markAsRead('${post.title}',${post.view_count})" src="images/email 1.svg" alt="">
                  </div>
               </div>
            </div> 
        `
    // 

    cardContainer.appendChild(postCard);
  })
  toggleLoadingSpinner(false)
}

let count = 0;
// allPostData();

const markAsRead = (title, viewCount) => {
  count++
  console.log(count)
  const counter = document.getElementById('counter');
  counter.innerText = count;
  const readContainer = document.getElementById('read-container');
  const cardDiv = document.createElement('div');
  cardDiv.classList = `my-4 p-4 flex items-center  justify-between bg-white rounded-2xl`;
  cardDiv.innerHTML = `
  <p class="w-1/2">${title}</p>
  <div class="flex items-center">
    <img src="images/tabler-icon-eye.svg" alt="">
    <p>${viewCount}</p>
  </div>
  `

  readContainer.appendChild(cardDiv)
}


const latestPost = async () => {
  const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts');
  const data = await res.json();
  displayLatestPost(data);
}




const displayLatestPost = (allPosts) => {
  // console.log(allPosts)
  const latestPostContainer = document.getElementById('latest-Post-Container');

  allPosts.forEach(post => {
    const latestCard = document.createElement('div');
    latestCard.classList = `card bg-base-100 shadow-xl`;
    latestCard.innerHTML = ` 

    <figure class="p-6"><img class="rounded-2xl" src="${post.cover_image}" alt="Shoes" /></figure>
              <div class="card-body">
                <div class="flex gap-2">
                  <img src="images/box.png" alt="">
                  <p>${post?.author?.posted_date
                    || 'No publish date'}</p>
                </div>
                <h2 class="card-title text-lg font-bold">${post.title}</h2>
                <p class="text-[#12132D99]">${post.description}</p>
                <div class="card-actions justify-start items-center">
                  <div class="w-8 h-8">
                    <img class="rounded-full" src="${post.profile_image
                    }" alt="">
                  </div>
                  <div>
                    <h4 class="font-bold">${post.author.name}</h4>
                    <p>${post?.author?.designation
                      || 'Unknown'}</p>
                  </div>
                </div>
              </div>
    `
    latestPostContainer.appendChild(latestCard);
  })
}








// handle search button
const handleSearch = () => {
  toggleLoadingSpinner(true);


  const cardContainer = document.getElementById('card-container');

  // clear phone container cards before adding new cards
  cardContainer.textContent = '';
  
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
  allPostData(searchText)     
}

// handle loading spinner
const toggleLoadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById('loading-spinner');
  console.log(loadingSpinner);
  if (isLoading) {
      loadingSpinner.classList.remove('hidden')
  }
  else{
      loadingSpinner.classList.add('hidden')
  }
}



latestPost();
allPostData();





