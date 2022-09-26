let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let count = document.getElementById('count');
let discount = document.getElementById('discount');
let create = document.getElementById('submit');
let search = document.getElementById('search');
let category = document.getElementById('category');
let titleSearch = document.getElementById('titleSearch');
let categorySearch = document.getElementById('categorySearch');
let update = document.getElementById('update');
let del = document.getElementById('delete');
let total = document.getElementById('total');

let mood = 'create';
let tmp ;

// get total
function getTotal (){

    if (price.value != ''){
        let result = ( +price.value + +taxes.value + +ads.value )- +discount.value ;
        total.innerHTML = result;
        total.style.backgroundColor = "#040"
    }
    else{
        total.innerHTML="";
        total.style.backgroundColor = "tomato"
    }
}


// create
// let dataprd = [];

let dataprd = JSON.parse(localStorage.getItem('product')) || [];

submit.onclick = function (){
   if ( title.value !="" &&
        price.value !="" &&
        category.value !="" &&
        +count.value < 101 )
    { 
        let prod = {
            title:title.value.toLowerCase(),
            price:price.value,
            taxes:taxes.value,
            ads:ads.value,
            discount:discount.value,
            total:total.innerHTML,
            count:count.value,
            category:category.value.toLowerCase()
        };

        if (mood == 'create'){
            if (prod.count > 1 ){
                for (let i =0; i< prod.count ; i++)
                {
                    dataprd.push(prod);
                }
            }else{
                dataprd.push(prod);     
            }
        
        }else{
            dataprd [tmp] = prod;
            mood = 'create';
            submit.innerHTML='create';
            count.style.display='block';
        }

        window.localStorage.setItem('product',JSON.stringify(dataprd));
        clearInputs();
        showdata();
    }
}


// localstorage
// clear inputs

function clearInputs (){
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML = "";
    count.value = "";
    category.value = "";
}

// read

function showdata (){
    
    getTotal()
    let table='';
    for (let i = 0 ; i < dataprd.length ; i++){
 
        table += ` 
        <tr>
            <td>${i+1}</td>
            <td>${dataprd[i].title}</td>
            <td>${dataprd[i].price}</td>
            <td>${dataprd[i].taxes}</td>
            <td>${dataprd[i].ads}</td>
            <td>${dataprd[i].discount}</td>
            <td>${dataprd[i].total}</td>
            <td>${dataprd[i].category}</td>
            <td><button id="update" onclick= "updateData(${i})">Update</button></td>
            <td><button id="delete" onclick= "deleteData(${i})">Delete</button></td>
        </tr>`; 
    }
    document.getElementById('tbody').innerHTML=table;
    let delbtn =  document.getElementById("deleteAll");
    len=dataprd.length;
    if (dataprd.length > 0){
       delbtn.innerHTML =`
       <button onclick="deleteAll()">Delete All (${len})</button>
       `
    }else{
        delbtn.innerHTML ="";
    }
    
}

showdata();


// delete 

function deleteData (i){
    dataprd.splice(i,1);
    localStorage.setItem('product',JSON.stringify(dataprd));
    showdata();
}

function deleteAll (){
    localStorage.clear();
    dataprd.splice(0);
    showdata();
}

// update

function updateData (i){
    title.value = dataprd [i].title; 
    price.value = dataprd [i].price; 
    ads.value = dataprd [i].ads; 
    discount.value = dataprd [i].discount; 
    category.value = dataprd [i].category; 
    taxes.value = dataprd [i].taxes; 
    count.style.display = 'none';
    getTotal();
    submit.innerHTML='update';
    mood = 'update';
    tmp = i;
    scroll({
        top:0,
        behavior:"smooth"
    }) 
}

// search

let searchMood = 'title'

function searchMod (id){
    if (id == 'titlesearch'){
        searchMood = 'title';
        search.placeholder = "Search by Title"
    }else{
        searchMood = 'category';
        search.placeholder = "Search by Category"
    }
    search.focus();
    search.value='';
    showdata();
}

function searching (chars){
    
    table = '';
    
    for (let i =0; i < dataprd.length ; i++)
        {
            if (searchMood == 'title')
            {
                if (dataprd[i].title.includes(chars.toLowerCase())){
                    table += ` 
                    <tr>
                        <td>${i+1}</td>
                        <td>${dataprd[i].title}</td>
                        <td>${dataprd[i].price}</td>
                        <td>${dataprd[i].taxes}</td>
                        <td>${dataprd[i].ads}</td>
                        <td>${dataprd[i].discount}</td>
                        <td>${dataprd[i].total}</td>
                        <td>${dataprd[i].category}</td>
                        <td><button id="update" onclick= "updateData(${i})">Update</button></td>
                        <td><button id="delete" onclick= "deleteData(${i})">Delete</button></td>
                    </tr>`; 
                
                }
            }
            else 
            {
                if (dataprd[i].category.includes(chars.toLowerCase())){
                    table += ` 
                    <tr>
                        <td>${i+1}</td>
                        <td>${dataprd[i].title}</td>
                        <td>${dataprd[i].price}</td>
                        <td>${dataprd[i].taxes}</td>
                        <td>${dataprd[i].ads}</td>
                        <td>${dataprd[i].discount}</td>
                        <td>${dataprd[i].total}</td>
                        <td>${dataprd[i].category}</td>
                        <td><button id="update" onclick= "updateData(${i})">Update</button></td>
                        <td><button id="delete" onclick= "deleteData(${i})">Delete</button></td>
                    </tr>`; 
                
                }  
            }
        }
    document.getElementById('tbody').innerHTML=table;
}


// clean data