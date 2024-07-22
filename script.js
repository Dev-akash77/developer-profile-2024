let api= "https://api.github.com/users/";
let profilecard =document.querySelector(".profilecard");
let input=document.querySelector("input")
let search=document.querySelector(".search")

const appendData=(data)=>{
    // Given timestamp
const timestamp =data.created_at;

// Create a Date object from the timestamp
const date = new Date(timestamp);
const monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Extract and format the date components
const year = date.getUTCFullYear();
const day = String(date.getUTCDate()).padStart(2, '0');
const month=monthNames[date.getUTCMonth()]
// Format the date as YYYY-MM-DD
const formattedDate = `${day} ${month} ${year}`;
    const profilecard_cont=document.createElement("div");
    profilecard_cont.classList.add("profilecard_cont");
    profilecard_cont.classList.add("container");
  profilecard_cont.innerHTML=`
   <div class="dev_image b">
            <img src=${data.avatar_url} alt=${data.name}"images">
            </div>
                <div class="name_join_main b">
                    <p class="developer_neme">
                        ${data.name}
                    </p>
                    <div class="join_date">
                        Joined ${formattedDate}
                    </div>
                    <a href=https://github.com/${data.login} target="_blank">@${data.login}</a>
                </div>

                <p class="developer_bio b">
                   ${data.bio?data.bio:"This profile has no bio"}
                </p>

                <div class="repo_followers_following_main fcb b">
                    <div class="r_f_f cc">
                        <p class="rff">
                            Repos
                        </p>
                        <p class="rffc">${data.public_repos}</p>
                    </div>
                    <div class="r_f_f cc">
                        <p class="rff">
                            Followers
                        </p>
                        <p class="rffc"> ${data.followers}</p>
                    </div>
                    <div class="r_f_f cc">
                        <p class="rff">
                            Following
                        </p>
                        <p class="rffc">${data.following}</p>
                    </div>
                </div>

                <div class="social_link b">
                    <div class="icon_data">
                        <i class="fa-solid fa-location-dot"></i>
                        <p class="data_article">${data.location?data.location:"Not Available"}</p>
                    </div>
                    <div class="icon_data">
                        <i class="fa-solid fa-link"></i>
                        <a href=${data.blog} target="_blank">${data.blog?data.blog:"Not Available"}</a>
                    </div>
                    <div class="icon_data">
                        <i class="fa-brands fa-twitter"></i>
                        <a href=https://twitter.com/${data.twitter_username} target="_blank">${data.twitter_username?data.twitter_username:"Not Available"}</a>
                    </div>
                    <div class="icon_data">
                        <i class="fa-solid fa-building"></i>
                        <p class="data_article">${data.company?data.company:"Not Available"}</p>
                    </div>
                </div>
            </div>
  `;
  profilecard.appendChild(profilecard_cont);
}

const showData = async (user) =>{
  let res = await fetch(api+user);
  let data = await res.json();
  console.log(data)
  if (data.status=="404") {
    profilecard.innerHTML="Data not Found";
    profilecard.classList.add("err")
    return false
  }else{
    profilecard.classList.remove("err")
    appendData(data);
  }
}

showData("Dev-akash77");
search.addEventListener("click",()=>{
    if (!input.value) {
        return false
    }
    profilecard.innerHTML="";
    showData(input.value)
});

let mode = document.querySelector(".mode")
let mode_para = document.querySelector(".mode_para")
let icon = document.querySelector(".icon");
let body = document.querySelector("body");


mode.onclick=()=>{
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun')
    body.classList.toggle('dark')
    if (icon.classList.contains('fa-moon')) {
        mode_para.innerText = "DARK";
    }else{
        mode_para.innerText = "LIGHT";
    }
    let isDark=JSON.parse(localStorage.getItem("data")) || {dark:false};
    isDark.dark=!isDark.dark
    localStorage.setItem("data",JSON.stringify(isDark));
}
let darkMode=JSON.parse(localStorage.getItem("data"));
if (darkMode.dark) {
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
    mode_para.innerText = "LIGHT";
    body.classList.add("dark")
}else{
    icon.classList.add('fa-moon');
    icon.classList.remove('fa-sun');
    mode_para.innerText = "DARK";
    body.classList.remove("dark")
}