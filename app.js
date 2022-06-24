// Get Elements
const product_form = document.getElementById('product_form');
const msg = document.querySelector('.msg');
const single_product = document.querySelector('.single-product');
const product_list = document.getElementById('product_list');
const product_update_form = document.getElementById('product_update_form');



// Get all Products
const getAllProducts = () =>{

    // Get all LS Data
    const data = readLSData('product');

    // Check LS Exists
    if( !data ){
        product_list.innerHTML = `
            <tr>
                <td colspan="7" class="text-center">No Product Found</td>
            </tr>
        `
    }

    // Show all data to List
    if( data ){

        // init Val
        let list = '';
        let final_amount = 0;

        // loop for data
        data.map((item, index) => {
            final_amount += ( item.price * item.quantity );
            list += `
            <tr>
                <td>${ index + 1 }</td>
                <td><img style="width:50px; height:50px; object-fit:cover; border-radius:5px;" src="${ item.photo }" alt=""></td>
                <td>${item.name}</td>
                <td>${item.price}</td>
                <td>${item.quantity}</td>
                <td>${item.price * item.quantity} BDT</td>
                <td>
                    <a class="btn btn-info btn-sm product-view" data-bs-toggle="modal" product_index="${index}" href="#shop_single_modal"><i class="fas fa-eye"></i></a>
                    <a class="btn btn-warning btn-sm product-edit" data-bs-toggle="modal" product_index="${index}" href="#shop_edit_modal"><i class="fas fa-edit"></i></a>
                    <a class="btn btn-danger btn-sm product-delete" product_index="${index}" href=""><i class="fas fa-trash"></i></a>
                </td>
            </tr>
            `
        });

        list += `
            <tr>
                <td colspan="6" class="text-end">Final Amount = ${final_amount} BDT</td>
                <td></td>
            </tr>
        `

        product_list.innerHTML = list;

    }

}

getAllProducts();


// Submit Product Form
product_form.onsubmit = (e) =>{
    e.preventDefault();

    // Get form data from FormData Object
    let form_data = new FormData(e.target);
    let productData = Object.fromEntries(form_data.entries());
    let { name, price, quantity, photo } = Object.fromEntries(form_data.entries());


    

    // form Validation
    if( !name || !price || !photo || !quantity ){
        msg.innerHTML = setAlert('All Fields are Required !');
    }else {

        createLSData('product', productData);


        msg.innerHTML = setAlert('Data Stable', 'success');
        e.target.reset();
        getAllProducts();
    }



}


// Single Product Show
product_list.onclick = (e) => {

    e.preventDefault();

    // product single view
    if(e.target.classList.contains('product-view')){

        // get single product data ID
        let index = e.target.getAttribute('product_index');
        let data = readLSData('product');

        // get data key
        const { name, price, photo, quantity } = data[index];

        // send data to modal
        single_product.innerHTML = `
            <img class="shadow" src="${ photo }" alt="">
            <h2>${ name }</h2>
            <p>Price : ${ price } BDT</p>
        `;

    } 
    
    // product edit
    if( e.target.classList.contains('product-edit') ){
        // get product index
        let index = e.target.getAttribute('product_index');

        // get product value
        let data = readLSData('product');
        const { name, price, photo, quantity } = data[index];

        // value set
        product_update_form.innerHTML = `
        <div class="my-3">
            <label for="">Name</label>
            <input name="name" type="text" value="${ name }" class="form-control">
        </div>
        <div class="my-3">
            <label for="">Price</label>
            <input name="price" type="text" value="${ price }" class="form-control">
        </div>
        <div class="my-3">
            <label for="">Quantity</label>
            <input name="quantity" type="text" value="${ quantity }" class="form-control">
        </div>
        <div class="my-3">
            <input name="index" type="hidden" value="${ index }" class="form-control">
        </div>
        <div class="my-3">
            <img class="w-100 m-auto d-block" src="${ photo }" alt="">
        </div>
        <div class="my-3">
            <label for="">Photo</label>
            <input name="photo" type="text" value="${ photo }" class="form-control">
        </div>
        <div class="my-3">
            <input type="submit" class="btn btn-primary w-100" value="Update" >
        </div>
        `;
    }
    
    // product delete
    if( e.target.classList.contains('product-delete') ){

        // get index data
        let index = e.target.getAttribute('product_index');
        let data = readLSData('product');

        // delete index data
        data.splice(index, 1);

        // now update latest record
        updateLSData('product', data);

        // now reload data
        getAllProducts();

    }

}

// Single Edit Product Show
// product_list.onclick = (e) => {

//     e.preventDefault();

    

// }


// product update form submit
product_update_form.onsubmit = (e) => {

    e.preventDefault();

    // get form data
    const form_data = new FormData(e.target);
    const { name, price, quantity, photo, index } = Object.fromEntries(form_data.entries());

    // get all data
    let all_data = readLSData('product');
    all_data[index] = { name, price, quantity, photo };

    // update data
    updateLSData('product', all_data);

    // now reload data
    getAllProducts();


} 