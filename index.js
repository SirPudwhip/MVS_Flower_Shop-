function showFlowers() { fetch ('http://localhost:3000/flowers')
.then((res) => (res.json()))
.then((data) => data.forEach(populateList))
}

showFlowers()

let flowerCard = document.querySelector('.flower-list');
let flowerSelector = document.querySelector('#flower-selector')
console.log(flowerSelector)

flowerSelector.addEventListener('change', (e) => {
    let flowerCheck = document.querySelectorAll('.card')
    if (flowerSelector.value === "rose") {
        flowerCheck.forEach(removeItem);
        showFlowers();
        flowerCheck.forEach()
        
    }
    else if (flowerSelector.value === "tulip") {
    
    }     
    else if (flowerSelector.value === "carnation") {
    
    }
    else if (flowerSelector.value === "assorted") {
    
    } 
    else if (flowerSelector.value === "lily") {
    
    }
})

function removeItem(element) {
    element.remove();
}

function populateList(data) {
    console.log(data.image);
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
    pInventory = data.inventory
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

    flowerCard.append(li)
    li.append(pName);
    li.append(pPrice);
    li.append(img);
    li.append(button);
    li.append(ulComments);
    li.append(pInventory)
    li.append(comment)


}



