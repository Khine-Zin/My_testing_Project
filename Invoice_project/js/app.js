let recordForm=document.getElementById("recordForm");
let calc=document.getElementById("Calc");
let selectProduct=document.getElementById("selectProduct");
let quantity=document.getElementById("quantity");
let record=document.getElementById("record");
let costTotal=document.getElementById("costTotal");
let printrecord=document.getElementById("printrecord");
let list=document.getElementById("list");
let createNewItem=document.getElementById("createNewItem");

const products=[
    {
        id:1,
        name:"apple",
        price:100,
    },
    {
        id:2,
        name:"orange",
        price:150,
    },
    {
        id:3,
        name:"mango",
        price:200,
    },
    {
        id:4,
        name:"banana",
        price:250,
    }
];

const itemList=(product)=>{
    let li=document.createElement("li");
    li.classList.add("list-group-item");
    li.innerHTML=`
    <div class="d-flex justify-content-between">
      <p class="mb-0">${product.name}</p>
    <p class="mb-0 text-black-50">${product.price}</p>
    </div>
    `;
    return li;
}


const recordFormhandle=(event)=>{
    event.preventDefault();
    let formdata=new FormData(recordForm);
    // console.log(formdata.get("selected"));
    // console.log(formdata.get("quantity"));
    const currentProduct=products.find(
       product=>product.id==formdata.get("selected")
    );
    // console.log(currentProduct);

    let currentRow=document.querySelector(`[product-row-id='${currentProduct.id}']`)
    // console.log(currentRow)

    if(currentRow){
      updateRow(currentRow,currentProduct,formdata.get("quantity"));

    }else{
       newRow(currentProduct,formdata.get("quantity"));
    }

    recordForm.reset();
    costtotal();

}

const newRow=(product,quantity)=>{
    record.append(createSubmitRow(product,quantity));
}

const updateRow=(row,product,quantity)=>{
    let currentQuantity=row.querySelector(".row-quantity");
    let currentCost=row.querySelector(".row-cost");
    currentQuantity.innerText = parseFloat(currentQuantity.innerText)+parseFloat(quantity);
    currentCost.innerText=currentQuantity.innerText*product.price;
}

const createSubmitRow=(product,quantity)=>{
   let tr=document.createElement("tr");
   let Cost=product.price *quantity;
   tr.setAttribute("product-row-id",product.id)
   tr.innerHTML=` 
    <td class="rowNum"></td>
   <td class="">${product.name}</td>
   <td class="text-end row-quantity">${quantity}</td>
   <td class="text-end">${product.price}</td>
   <td class="text-end row-cost" >${Cost}</td>` 

   return tr;
};

const newItem=(event)=>{
    event.preventDefault();
    let newProduct={}
    let newItem=new FormData(createNewItem);
     newProduct.id=products[products.length-1].id +1;
    newProduct.name=newItem.get("New-Item-Name");
    newProduct.price=newItem.get("New-Item-Price");
    list.append(itemList(newProduct));
    selectProduct.append(new Option(newProduct.name,newProduct.id));
    products.push(newProduct);
    createNewItem.reset();
}

const createRow=(product) =>{
    let option=document.createElement("option");
    option.value=product.id;
    option.innerText=product.name;
    return option;
}

const costtotal=()=>{
    let rowCost=document.querySelectorAll(".row-cost");
    costTotal.innerText=[...rowCost].reduce((pv,cv)=>pv+parseFloat(cv.innerText),0);
}


products.forEach(product=>{
    
    selectProduct.append(new Option(product.name,product.id));
    list.append(itemList(product));
   
});


recordForm.addEventListener("submit",recordFormhandle);
createNewItem.addEventListener("submit",newItem);
printrecord.addEventListener("click",()=>{
    print();
    document.querySelectorAll("#record").forEach(el=>el.remove());
})
 


