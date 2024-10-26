const All_Player = () => {
    const searchInput = document.getElementById("player-search").value.trim();
    const playerContainer = document.getElementById("player-container1");
    
    playerContainer.innerHTML = "";
    if (searchInput != "") 
    {
        fetch(`https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${searchInput}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.player) {
                    displayPlayers(data.player);
                } else {
                    playerContainer.innerHTML = `
                    <p class="player-p">The Player is not found</p>
                    `;
                }
            });
    } 
    else 
    {
        fetch(`https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${searchInput}`)
            .then((res) => res.json())
            .then((data) => {
                displayPlayers1(data.player);
            });
    }
};


let allPlayers = [];
const displayPlayers = (players) => {
    const playerContainer = document.getElementById("player-container1");
    
    allPlayers = players;
    playerContainer.innerHTML = ""; 


    players.forEach((player,index) => {
        const div = document.createElement("div");
        div.classList.add("card");
        div.innerHTML = `
            <img src="${player.strThumb}" alt="${player.strPlayer}" class="cart-img" >
            <h3>Name : ${player.strPlayer}</h3>
            <p>Nationality : ${player.strNationality}</p>
            <p>Team : ${player.strTeam}</p>
            <p>Sports : ${player.strSport}</p>
            <p>Gender : ${player.strGender}</p>
            <p>Salary : ${player.strSalary}</p>
            <p>Description : ${player.strDescriptionEN ? player.strDescriptionEN.slice(0, 10) : "No description available."}</p>
            <div class="social-icons">
                <a href="${player.strFacebook}" target="_blank" class="social-icon"><i class="fa-brands fa-facebook-f"></i></a>
                <a href="${player.strInstragram}" target="_blank" class="social-icon"><i class="fa-brands fa-instagram"></i></a>
            </div>
            <div class="btn-icon" >
                <button  class="btn-details" onclick="singleProduct('${index}')">Details</button>
                <button onclick="handleAddToCart('${player.strPlayer}',this)">Add to Card</button>
            </div>
        `;
        playerContainer.appendChild(div);
    });
};

const displayPlayers1 = (players) => {
    const playerContainer = document.getElementById("player-container1");
    
    allPlayers = players;


    players.forEach((player,index) => {
        const div = document.createElement("div");
        div.classList.add("card");
        div.innerHTML = `
            <img src="${player.strThumb}" alt="${player.strPlayer}" class="cart-img">
            <h3>Name : ${player.strPlayer}</h3>
            <div class="btn-icon" >
                <button class="btn-details"  onclick="singleProduct('${index}')">Details</button>
                <button onclick="handleAddToCart('${player.strPlayer}',this)">Add to Card</button>
            </div>
        `;
        playerContainer.appendChild(div);
    });
};


const singleProduct = (index) => {
    const player = allPlayers[index];

    
    document.getElementById("modalTitle").innerText = player.strPlayer;
    document.getElementById("modalBody").innerHTML = `
        <p><strong>Nationality:</strong> ${player.strNationality}</p>
        <p><strong>Team:</strong> ${player.strTeam}</p>
        <p><strong>Sports:</strong> ${player.strSport}</p>
        <p><strong>Salary:</strong> ${player.strSalary}</p>
        <p><strong>Description:</strong> ${player.strDescriptionEN}</p>
    `;

    
    const modal = new bootstrap.Modal(document.getElementById("playerModal"));
    modal.show();
};



let addedPlayers = [];
const handleAddToCart = (player,buttonElement) => {
    const cartCountElement = document.getElementById("count");
    let convertedCount = parseInt(cartCountElement.innerText);
    

    if(convertedCount<11)
    {
        convertedCount++;
        const container = document.getElementById("cart-main-container");
        const div = document.createElement("div");
        div.classList.add("cart-info");
        div.innerHTML = `
            <p>Name : ${player} </p>
        `;
        container.appendChild(div);

        addedPlayers.push(player);


        buttonElement.innerText = "Already added";
    }
    else
    {
        alert("Cart is full");
    }
    cartCountElement.innerText = convertedCount;

};


document.getElementById("search-btn").addEventListener("click", All_Player);
All_Player();