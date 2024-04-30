const allPostData=async ()=>{
    const res=await fetch('https://openapi.programming-hero.com/api/retro-forum/posts');
    const data=await res.json();
    const allPosts = data.posts;
    displayAllPosts(allPosts);
}

const displayAllPosts=(allPosts) =>{
    console.log(allPosts);
    const cardContainer=document.getElementById('card-container');

    allPosts.forEach(post =>{
        const newPost=JSON.stringify(post);
        

        const postCard = document.createElement('div');
        postCard.classList = `my-5  flex flex-col lg:flex-row gap-4 p-16 bg-[#7D7DFC1A] rounded-2xl`;
        postCard.innerHTML=`
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
                    <img onclick="markAsRead(${newPost})" src="images/email 1.svg" alt="">
                  </div>
               </div>
            </div> 
        `
        // 
        
        cardContainer.appendChild(postCard);    
    })
}

allPostData();

const markAsRead=(post) =>{
    console.log(post);
}
