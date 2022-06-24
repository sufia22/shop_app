/**
 * Alert Functions
 */
 const setAlert = ( msg, type = 'danger' ) => {
    return `<p class="alert alert-${type} d-flex justify-content-between">${msg}<button data-bs-dismiss='alert' class="btn-close"></button></p>`;
}

/**
 * Email Check
 */

const emailCheck = ( email ) => {
    let emailpattern = /^[a-z0-9\._]{1,}@[a-z0-9]{1,}\.[a-z]{2,5}$/;
    return emailpattern.test(email);
}

/**
 * Phone Number Check
 */

const cellCheck = ( cell ) => {
    let cellpattern = /^(01|8801|\+8801)[0-9]{9}$/;
    return cellpattern.test(cell);
}



/**
 * Get all LS Data
 */
const readLSData = (key) =>{

    if(localStorage.getItem(key)){
        return JSON.parse(localStorage.getItem(key));
    }else {
        return false;
    }
    

}


/**
 * Set LS Data
 */
const createLSData = (key, value) => {

    // init Values
    let data = [];

    // Check key exists or not
    if( localStorage.getItem(key) ){
        data = JSON.parse(localStorage.getItem(key));
    }

    // push data to LS
    data.push(value);
    // Set Data
    localStorage.setItem(key, JSON.stringify(data));

}


// update our LS data
const updateLSData = (key, array) => {
    localStorage.setItem(key, JSON.stringify(array));
}
