const isNumeric = (n)=> {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

const getMessage = (status)=> {
    let message = new Object;
    switch(status) {
        case 404:
            message.message = 'No Data';
            break;
        case 500:
            message.message = 'The server encountered an unexpected!';
            break;
        case 403:
            message.message = 'The request is for something forbidden';
            break;
        default :
            message.message = 'Unknown error'
    }
    return message;
}

const checkData = (callback, data) => {
    if (data[0]) {
        callback(200, data);
    } else {
        callback(404, getMessage(404));
    }
}

const errorMessage = (callback,status)=>{
    callback(status, getMessage(status));
}


module.exports = {
    isNumeric,
    checkData,
    errorMessage
};


//Not found 404 داده ای نیست
//The server has not found

//OK 200 اوکیه
//

//CREATED 201 ایجاد شده
// 

//Internal Error 500 خطای غیر منتظره
//The server encountered an unexpected 

//Forbidden 403  خطای دسترسی
//The request is for something forbidden