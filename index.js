fetch ('http://localhost:3000/flowers')
.then((res) => (res.json()))
.then((data) => data.forEach(populateList))

let flowerCard = document.querySelector('.flower-list');

function populateList(data) {
    console.log(data.image);
    let li = document.createElement('li');
    let pName = document.createElement('p');
    let pPrice = document.createElement('p');
    let img = document.createElement('img');
    let button = document.createElement('button');
    let pInventory = document.createElement('p');
    let ulComments = document.createElement('ul');

    pName.textContent = data.name;
    pPrice = data.price;
    img.src = data.image
    button.textContent = "Purchase"
    pInventory = data.pInventory
    li.className = "card"

    flowerCard.append(li)
    li.append(pName);
    li.append(pPrice);
    li.append(img);
    li.append(button);
    li.append(ulComments);

} 

