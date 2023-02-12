function showFlowers() { fetch ('http://localhost:3000/flowers')
.then((res) => (res.json()))
.then((data) => data.forEach(populateList))
}

showFlowers()

let flowerCard = document.querySelector('.flower-list');
let flowerSelector = document.querySelector('#flower-selector')

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

    shopBtn.addEventListener('click', (e) => {
        console.log(e.target)
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
    let list = document.getElementById('cart-content');
    let trItem = document.createElement('tr');
    let trPrice = document.createElement('tr');
    trItem.textContent = data.name;
    trPrice.textContent = data.price;
    list.append(trItem);
    list.append(trPrice);
}

function openForm(formID) {
    // console.log(formID);

    // document.getElementById(    // console.log(document.getElementById(formID));'#myForm').closest(".form-container").style.display = "inline-grid";
  }

  function closeForm() {
    document.getElementById("myForm").style.display = "none";
  }

