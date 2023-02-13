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
        else if (flowerSelector.value === "carnation" && element.classList.contains("carnation")) {
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
    pInventory.textContent = data.inventory
    li.className = "card";
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

    button.addEventListener('click', () => {
        if (pInventory.textContent > 0 ) {
        pInventory.textContent = pInventory.textContent-1;
        return pInventory;
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
    li.append(ulComments);
    li.append(pInventory)
    li.append(comment)

    
}



