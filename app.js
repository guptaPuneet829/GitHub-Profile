const APIURL="https://api.github.com/users/";
const main=document.querySelector("#main");
const searchBox=document.querySelector("#search");

const getUser = async(username)=>{
    const response = await fetch(APIURL+username);
    const data = await response.json();
    console.log(data);

    const card = `
        <div class="card">
            <div>
                <img src="${data.avatar_url}" alt="Florin Pop" class="avatar">
            </div>
            <div class="userInfo">
                <h2>${data.name}</h2>
                <p>${data.bio}</p>
                <ul class="info">
                    <li>${data.followers}<strong>Followers</strong></li>
                    <li>${data.following}<strong>Following</strong></li>
                    <li>${data.public_repos}<strong>Repository</strong></li>
                </ul>
                <div class="repos"></div>
            </div>
        </div>   
    `
    main.innerHTML=card;
    getRepos(username);
}

// getUser("");

const getRepos = async(username) => {
    const repos=document.querySelector(".repos");
    const response = await fetch(APIURL+username+"/repos");
    const data = await response.json();
    console.log(data);
    data.forEach((item) => {
        const elem=document.createElement("a");
        elem.classList.add("repo")
        elem.href=item.html_url;
        elem.target="_blank";
        elem.innerText=item.name;
        repos.appendChild(elem);
    });

}

const formSubmit = () => {
    if(searchBox.value != ""){
        getUser(searchBox.value);
        searchBox.value = "";
    }
    return false;
}

searchBox.addEventListener("focusout",()=>{
    formSubmit();
})