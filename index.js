function showFlowers() { fetch ('http://localhost:3000/flowers')
.then((res) => (res.json()))
.then((data) => data.forEach(populateList))
}

showFlowers()

let totalCost = 0; 
let flowerCard = document.querySelector('.flower-list');
let flowerSelector = document.querySelector('#flower-selector')
let shopBtn = document.querySelector('#shopping-cart')

flowerSelector.addEventListener('change', (e) => {
    let flowerCheck = document.querySelectorAll('.card');
    flowerCheck.forEach(function(element) {
        if (flowerSelector.value === "rose" && element.classList.contains("rose")) {
            element.style.display = "inline-grid";
        }
        else if (flowerSelector.value === "tulip" && element.classList.contains("tulip")) {
            element.style.display = "inline-grid";
        }
        else if (flowerSelector.value === "carnations" && element.classList.contains("carnations")) {
            element.style.display = "inline-grid";
        }
        else if (flowerSelector.value === "assorted" && element.classList.contains("assorted")) {
            element.style.display = "inline-grid";
        }
        else if (flowerSelector.value === "lily" && element.classList.contains("lily")) {
            element.style.display = "inline-grid";
        }
        else if (flowerSelector.value === "all") {
            element.style.display = "inline-grid";
        }
        else {
            element.style.display = "none";
        }
    });
});


function removeItem(element) {
    element.remove();
}

function populateList(data) {
    let li = document.createElement('li');
    let pName = document.createElement('p');
    let pPrice = document.createElement('p');
    let img = document.createElement('img');
    let button = document.createElement('button');
    let pInventory = document.createElement('p');
    let ulComments = document.createElement('ul');
    let comment = document.createElement('form');
    let shopBtn = document.getElementById('shopping-cart')
    pName.textContent = data.name;
    pPrice = data.price;
    img.src = data.image
    button.textContent = "Add to cart"
    pInventory.textContent = `${data.inventory} in stock`
    li.className = "card";
    li.id = data.id;
    li.classList.add(data.type);
    comment.innerHTML =
    `<label for="comment">Tell us your thoughts!</label><br>
    <input type="text" id="comment" name="comment" value=""><br>
    <input type="submit" value="Submit">`

    comment.addEventListener('submit', (e) => {
        e.preventDefault();
        let newComment = document.createElement('li');
        newComment.textContent = e.target.comment.value;
        ulComments.append(newComment);
        comment.reset();
    })


    button.addEventListener('click', (e) => {
        console.log(e.target)
        let invenArray = pInventory.textContent.split(' ')

        let shopBtnArray = shopBtn.textContent.split(' ')
        if (invenArray [0] >0) {
            invenArray[0] -= 1
            let test = `${invenArray[0]} in stock`
            pInventory.textContent = test
            let newNumItem = parseInt(shopBtnArray[0]) + 1
            if (newNumItem < 2) {
                let test2 =  `${newNumItem} item`
                shopBtn.textContent= test2
            }
            else {
                let test2 = `${newNumItem} items`
                shopBtn.textContent= test2
            }

            updateInventory(li, invenArray);
        }
        else {
            alert ("We are all out of these! ")
        }
    })




    flowerCard.append(li)
    li.append(pName);
    li.append(pPrice);
    li.append(img);
    li.append(button);

    li.append(pInventory)

    li.append(comment)
    li.append(ulComments);

}

shopBtn.addEventListener('click', (e) => {
    if (e.target.class != "open") {
        openForm();
        e.target.class = "open";
    } else {
        closeForm(); 
        e.target.class = "closed"
    }
})

function updateInventory(li, invenArray) {
    fetch(`http://localhost:3000/flowers/${li.id}`, {
        method: 'PATCH',
        body: JSON.stringify ({
            inventory: invenArray[0]
        }),
        headers: {
            'Content-type': 'application/json'
        }
    })
    .then ((res => res.json()))
    .then ((data) => {
        populateCart(data)
    })
}

function populateCart(data){
    let namePlace = document.getElementById('item-name')
    let namePrice = document.getElementById('item-price')
    let costTotal = document.getElementById('cost-total')
    let trItem = document.createElement('tr');
    let trPrice = document.createElement('tr');
    addTotalCost(data.price); 

    costTotal.textContent = `Your total cost is ${parseFloat(totalCost).toFixed(2)}`
    trItem.textContent = data.name;
    trPrice.textContent = data.price;
    namePlace.append(trItem);
    namePrice.append(trPrice);
    console.log(totalCost);
    return totalCost
}

function addTotalCost(cost) {
    let newCost = parseFloat(cost.replace("$", ""), 2);
    totalCost = parseFloat(totalCost + newCost, 2);
    totalCost = parseFloat(totalCost, 2)
}




function closeForm() {
  document.getElementById("checkout-form").style.display = "none";
}

function openForm() {
    document.getElementById("checkout-form").style.display = "block";
  }
