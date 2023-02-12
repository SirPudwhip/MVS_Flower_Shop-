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

    pName.textContent = data.name;
    pPrice = data.price;
    img.src = data.image
    button.textContent = "Purchase"
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

    img.addEventListener("click", clickMe);
    function clickMe(){
        let newName = pName.
        window.open(pName)
    }

    button.addEventListener('click', () => {
        let invenArray = pInventory.textContent.split(' ')
        let shopBtn = document.getElementById('shopping-cart')
        let shopBtnArray = shopBtn.textContent.split(' ')
        console.log(shopBtnArray)
        if (invenArray [0] >0) {
            invenArray[0] -= 1
            let test = `${invenArray[0]} in stock`
            pInventory.textContent = test
            // shopBtnArray[0] += 1
            // let test2 = shopBtnArray[0]
            // shopBtn.textContent = test2
            updateLikes(li, invenArray);
        }
        else {
            alert ("We are all out of these! ")
            document.querySelector('button').disabled = true;
            button.style.background = 'grey'
            button.textContent = 'Sold Out'
            li.style.background = 'red'
        }
    })

    flowerCard.append(li)
    li.append(pName);
    li.append(pPrice);
    li.append(img);
    li.append(button);
    //li.append(newButton)
    li.append(pInventory)

    li.append(comment)
    li.append(ulComments);
    li.append(createForm());


}

function updateLikes(li, invenArray) {
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
    .then ((json) => console.log(json))
}

function createForm() {
    let div = document.createElement('div');
    div.innerHTML =
    `<button class="open-button" onclick="openForm()">Open Form</button>

    <div class="form-popup" id="myForm">
      <form action="/action_page.php" class="form-container">
        <h1>Purchase Information</h1>

        <label for="card-number"><b>Card Number</b></label>
        <input type="text" placeholder="Enter card number" name="card number" required>

        <label for="expiration-date"><b>Expiration Date</b></label>
        <input type="text" placeholder="ex. 05/26" name="expiration-date" required>

        <label for="security-code"><b>Security Code</b></label>
        <input type="text" placeholder="ex. 059" name="security-code" required>

        <button type="submit" class="btn">Purchase</button>
        <button type="button" class="btn cancel" onclick="closeForm()">Close</button>
      </form>
    </div>`
    return div;
}

function openForm() {
    document.getElementById("myForm").style.display = "inline-grid";
  }

function closeForm() {
    document.getElementById("myForm").style.display = "none";
  }
