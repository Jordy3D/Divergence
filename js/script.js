const ip = fetch('https://api.ipify.org/?format=json');

const refreshRate = 3000; // 3 seconds
const numberOfDigits = 8;


var previousWorldLine = '';

var worldLineContainer = null;
var unlitDigitsArray = createUnlitDigits();

ip.then(response => {
    return response.json();
}).then(data => {
    console.log(data.ip);

    worldLineContainer = document.getElementById('worldline');
    worldLineContainer.innerHTML = createChildSpans(worldLineContainer);

    createUnlitDigits(worldLineContainer);

    // // repeat every 3 seconds
    displayWorldline(data.ip)
    setInterval(function () {
        displayWorldline(data.ip);
    }, refreshRate);


}).catch(err => {
    console.log(err);
});



function createChildSpans() {
    var spans = '';
    for (var i = 0; i < numberOfDigits; i++)
        spans += `<span class="tube"></span>`;
    return spans;
}

function createUnlitDigits() {
    // create a span with the class digit-unlit for every number from 0 to 9
    var digits = [];
    for (var i = 0; i < 10; i++)
        digits.push(`<span class="digit-unlit">${i}</span>`);

    return digits;
}



function displayWorldline(ipstring) {
    var worldLine = `0.${generateWorldline(ipstring)}`
    console.log(worldLine);

    scrollThroughDigits(worldLine);
}

function scrollThroughDigits(worldLine) {
    // loop 9 times, with 50ms delay between each loop, breaking out after 9 loops
    var i = 0;

    var interval = setInterval(function () {
        // set the content of each span to a random number
        for (var j = 0; j < worldLineContainer.children.length; j++)
        {
            var span = worldLineContainer.children[j];
            if (j != 1)
                span.innerHTML = `<span class="digit-lit">${Math.floor(Math.random() * 10)}</span>`;
            else
                span.innerHTML = `<span class="digit-lit">.</span>`;
            
            span.innerHTML += unlitDigitsArray.join('');
        }

        i++;
        if (i == 10)
        {
            clearInterval(interval);
            setWorldline(worldLine, worldLineContainer);
        }
    }, 50);
    
}

function setWorldline(string) {
    // set the content of each span to the corresponding character of the string
    for (var i = 0; i < string.length; i++) {
        var span = worldLineContainer.children[i];
        span.innerHTML = `<span class="digit-lit">${string[i]}</span>`

        unlitDigits = createUnlitDigits(span);
        span.innerHTML += unlitDigits.join('');
    }
}

function generateWorldline(ipstring) {
    // 1. Get IP 
    // 2. Pad each number to 3 digits 
    // 3. Join numbers 
    // 4. Split and add together the even and odd digits
    // 5. Get current time in unix time, trim to 6 digits
    // 6. Generate a random number between the added together digits and the current time
    // 7. Return the random number as a string

    var ipArray = ipstring.split('.');

    for (var i = 0; i < ipArray.length; i++)
        ipArray[i] = pad(ipArray[i], 3);

    var ip = ipArray.join('');

    var evenString = '';
    var oddString = '';

    for (var i = 0; i < ip.length; i++) {
        if (i % 2 == 0)
            evenString += ip[i];
        else
            oddString += ip[i];
    }

    ip = parseInt(evenString) + parseInt(oddString);

    var now = Math.floor(Date.now() / 1000);
    now = Math.floor(now / 1000000);

    ip = Math.floor(Math.random() * (ip + now - (ip - now) + 1)) + (ip - now);

    return ip.toString();
}

function pad(num, size) {
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
}