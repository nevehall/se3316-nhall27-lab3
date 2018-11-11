//Neve Hall
//3316 lab 3
//script.js 
outPutData();//calling function

console.log('why');

function frenchLanguage(){
    document.getElementById("fruitShelf").innerHTML = "Plateau de Fruits";
    document.getElementById("pickFruit").innerHTML = "Cueillir un Fruit";
    document.getElementById("nameTitle").innerHTML = "Prénom";
    document.getElementById("addFruitTitle").innerHTML = "Ajouter un Fruit";
    document.getElementById("quantityTitle").innerHTML = "Quantité";
    document.getElementById("priceTitle").innerHTML = "Prix";
    document.getElementById("taxTitle").innerHTML = "Impôt";
    document.getElementById("addButton").innerHTML = "Ajouter";
}

function englishLanguage(){
    document.getElementById("fruitShelf").innerHTML = "Fruit Shelf";
    document.getElementById("pickFruit").innerHTML = "Pick a fruit";
    document.getElementById("nameTitle").innerHTML = "Name";
    document.getElementById("addFruitTitle").innerHTML = "Add a Fruit";
    document.getElementById("quantityTitle").innerHTML = "Quantity";
    document.getElementById("priceTitle").innerHTML = "Price";
    document.getElementById("taxTitle").innerHTML = "Tax";
    document.getElementById("addButton").innerHTML = "Add";
}

//GET -- get the specific id of each fruit
function getID(){
    var i = 0;
    var id =0;
    fetch('/products/')
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log('the data', data);
            console.log(data.length);
            if(data.length>0){
                id = data[i]._id;
                console.log(data[i]._id)
            }
            //console.log(id)
            return id;
        })
}
//var id1 = getID()

//GET -- find all the fruits in the database
fetch("https://se3316-nhall27-lab3-nhall27.c9users.io/products/findAll")
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
    })
    
function outPutData(){
    //console.log('first');
    deleteFrontFruit();
    //console.log('hello');
    fetch("https://se3316-nhall27-lab3-nhall27.c9users.io/products/findAll")
    .then(function(response){
        return response.json();
    })
    .then(function(data){
    
        for(var i=0;i<data.length;i++){
            
            var basketHeader = document.createElement("h3");
            basketHeader.setAttribute('id', 'bask');
            var basketText = document.createTextNode("Basket");
            basketHeader.appendChild(basketText);
            document.body.appendChild(basketHeader);
            var list = document.createElement("li");
            var nameToList = data[i].name; //document.getElementById("nameInput").value;
            var quantityToList = data[i].quantity; //document.getElementById("quantityInput").value;
            var priceToList = data[i].price; //document.getElementById("priceInput").value;
            var taxToList = data[i].tax; //document.getElementById("taxInput").value;
            list.appendChild(document.createTextNode("Name: "+nameToList+", Quantity: "+quantityToList+", Price: "+priceToList+", Tax: "+taxToList));
            basketHeader.appendChild(list);
            
            //adding a delete and update button beside each fruit
            var deleteBtn = document.createElement("button");
            deleteBtn.setAttribute('class','delete');
            deleteBtn.setAttribute('id',data[i]._id);
            var deleteText = document.createTextNode("Delete");
            deleteBtn.appendChild(deleteText);
            document.body.appendChild(deleteBtn);
            //list.appendChild((document.createElement("span")).deleteBtn)
            //^trying to get the button beside the added fruit
            deleteBtn.onclick = deleteFruit;
            deleteBtn.onclick = function(){deleteFruit(this.id); alert('Deleting item!'); deleteFrontFruit(); outPutData()};
            
            //adding an update button beside each fruit
            var updateBtn = document.createElement("button");
            updateBtn.setAttribute('class', 'update');
            updateBtn.setAttribute('id', data[i]._id);
            var updateText = document.createTextNode("Update");
            updateBtn.appendChild(updateText);
            document.body.appendChild(updateBtn);
            updateBtn.onclick = updateFruit;
            updateBtn.onclick = function(){updateFruit(this.id); outPutData()};
            
        }
    })
}    

//POST -- adding the fruit
function addFruit(){
    var urlPost = 'https://se3316-nhall27-lab3-nhall27.c9users.io/products/create';
    var data ={
        name: document.getElementById("nameInput").value,
        quantity: document.getElementById("quantityInput").value,
        price: document.getElementById("priceInput").value,
        tax: document.getElementById("taxInput").value
    
    };
    
    fetch(urlPost, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res)
    .then(response => console.log('Success:', JSON.stringify(response)))
    .catch(error => console.error('Error:', error)); 
    
    outPutData();
    var id = document.getElementsByTagName("li")[0].setAttribute('id', 'fruitID');
    console.log('id');
    
}


//DELETE BACKEND -- deleting specific selected fruit
function deleteFruit(id3){
    console.log(id3);
    var id3=id3;
    var urlDelete = 'https://se3316-nhall27-lab3-nhall27.c9users.io/products/delete/'+id3;
    console.log(urlDelete);
    fetch(urlDelete,{
        method: 'DELETE',
    })

}


//DELETE FRONTEND -- deleting specific selected fruit from the front end
function deleteFrontFruit(){
    var elem = document.querySelectorAll('#bask');
    console.log(elem);
    console.log(elem.length);

    for(i=0; i< elem.length;i++)
    {
        
        console.log(i, elem[i]);
        elem[i].remove();
        
    }
    
    var deleBtn = document.querySelectorAll('.delete');
    console.log(deleBtn);
    console.log(deleBtn.length);
    
    for(var i=0; i< deleBtn.length;i++){
        
        deleBtn[i].remove();
    }
    
   
}

//PUT -- update the fruit quantities
function updateFruit(id2){
    console.log(id2);
    var id2=id2;
    var urlPut = 'https://se3316-nhall27-lab3-nhall27.c9users.io/products/update/'+id2;
    var data ={
        quantity: document.getElementById("quantityUpdate").value,
        tax: document.getElementById("taxUpdate").value
    }
    
    var updBtn = document.querySelectorAll('.update');
    console.log(updBtn);
    console.log(updBtn.length);
    
    for(var i=0; i<updBtn.length;i++){
        updBtn[i].remove();
    }
    //console.log(data);
    
    fetch(urlPut, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res)
    .then(response => response.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', JSON.stringify(response)));
    //console.log('request sent');
}

//SEARCH function
function search(){
    console.log('searching');
    var nameToSearch = document.getElementById("searchInput").value.toLowerCase();
    //console.log(nameToSearch);

    fetch("https://se3316-nhall27-lab3-nhall27.c9users.io/products/findAll")
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            
            for(var i = 0; i<data.length; i++){
                if(data[i].name == nameToSearch){
                    console.log('Found it!');
                    console.log(document.getElementById("searchOutput"));
                    var searchOutput = document.getElementById("searchOutput");
                    var list = document.createElement("li");
                    list.appendChild(document.createTextNode("Name: "+data[i].name+", Quantity: "+data[i].quantity+", Price: "+data[i].price+", Tax: "+data[i].tax));
                    searchOutput.appendChild(list);
                    break;

                }
                if(i==data.length-1){
                    alert('The fruit you are looking for does not exist in this database. Sorry!');
                }
            }
        })
    
}

