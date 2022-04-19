export const utilService = {
    debounce,
    getRandomIntInclusive,
    getDate,
    getDay,
    celsiusToFahrenheit,

}


function debounce(func, wait) { // function foo(){console.log} , 1000
console.log('func, wait:', func, wait);

    let timeout;

    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };

        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};



function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}


function getDate(timestamp) {
   
    const date = new Date(+timestamp *1000);
    const day = date.getDate();
    const month = date.toLocaleString('en', { month: 'short' });

    return month + ' ' + day;
}


function getDay (date){    
    return new Date(date*1000).toLocaleDateString('en-US', { weekday: 'long' });

}


function celsiusToFahrenheit(deg){
    const fixedDegree = +(deg *1.8+32)
    return fixedDegree.toFixed(1) // Turn Celsius to Fahrenheit by mult in 1.8 and adding 32
}