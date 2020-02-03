const headerImage = document.querySelector('#headerImage');
const btnTamam = document.querySelector('#btnTamam');
const inputPlace = document.querySelector('#inputPlace');
const infoPlace = document.querySelector('#infoPlace');
const infoWeather1 = document.querySelector('#infoWeather1');
const imgFlag = document.querySelector('#imgFlag');
const imgWeather = document.querySelector('#imgWeather');
const divResult1 = document.querySelector('#divResult1');
const divResult2 = document.querySelector('#divResult2');
const loader = document.querySelector('.loader');

var days = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
var d = new Date();
var dayNumber = d.getDay() + 1;
console.log(dayNumber);

inputPlace.addEventListener('keyup', function (event) {
    if (event.key == 'Enter') {
        start();
    }
});

function start() {
    // inputPlace.value = 'paris';
    if (inputPlace.value === '') {
        alert('Şehir giriniz!');
    }
    else {
        bringResult1();
        setTimeout(function () {
            // loader.style.visibility = 'hidden';
            divResult1.style.visibility = 'visible';
            divResult1.classList.remove('divResult1');
            divResult1.clientHeight;
            divResult1.classList.add('divResult1');
        }, 200);
        fillDivResult2();
    }
}

function fillDivResult2() {
    var xhr = new XMLHttpRequest();
    var URL1 = 'https://api.openweathermap.org/data/2.5/forecast?appid=6ba3cc27ff26cfb1f436bdf90d7bf032&q=' + inputPlace.value + '&units=metric&cnt=5&lang=tr';
    xhr.open('GET', URL1);
    xhr.onload = function(){
        if(this.status == 200){
            var resp = JSON.parse(this.response);
            console.log(resp)
            console.log(resp.list.length)
            while(divResult2.firstChild){
                divResult2.removeChild(divResult2.firstChild);
            }
            dayNumber = d.getDay() + 1;
            resp.list.forEach(element => {
                var iconCode = element.weather[0].icon.replace('n', 'd');
                var temp = element.main.temp;
                var hum = element.main.humidity;


                var div = document.createElement('DIV');
                var dayName = document.createElement('P');
                var desc = document.createElement('P');
                var img = document.createElement('IMG');
                var hr = document.createElement('HR');
                
                div.style = 'margin-bottom: 10px';
                dayName.innerHTML = days[(dayNumber++) % 7];
                dayName.style = 'margin-bottom: 10px;';

                
                desc.innerHTML = 'Sıcaklık: ' + temp + ' °C <br>' +
                    'Nem: ' + hum + ' % <br>' +
                    ' ' + element.weather[0].description.charAt(0).toUpperCase() +
                    element.weather[0].description.slice(1);
                desc.style = 'display: inline-block;transform:translateY(-50%)';

                img.src = 'http://openweathermap.org/img/wn/' + iconCode + '@2x.png';
                img.style = 'border-radius:50px;background-color:grey;';
                hr.classList.add('verticalHr');
                
                div.appendChild(dayName);
                div.appendChild(img);
                div.appendChild(hr);
                div.appendChild(desc);

                console.log('child sayısı: ' + (divResult2.childNodes.length-1));
                divResult2.appendChild(div);
                
            });
            divResult2.style.visibility = 'visible';
            divResult2.classList.remove('divResult2');
            divResult2.clientHeight;
            divResult2.classList.add('divResult2');
        }
    }
    xhr.send();
}

function bringResult1() {
    var xhr = new XMLHttpRequest();
    var URL1 = 'https://api.openweathermap.org/data/2.5/weather?q=' + inputPlace.value + '&APPID=6ba3cc27ff26cfb1f436bdf90d7bf032&units=metric&lang=tr';
    xhr.open('GET', URL1);
    xhr.onload = function () {
        if (this.status == 200) {

            var resp = JSON.parse(this.response);
            imgFlag.src = 'https://www.countryflags.io/' + resp.sys.country + '/shiny/64.png';
            imgWeather.src = 'http://openweathermap.org/img/wn/' + resp.weather[0].icon + '@2x.png';
            // console.log(resp);
            infoPlace.innerHTML = resp.name + ', ' + resp.sys.country;
            infoWeather1.innerHTML = 'Sıcaklık: ' + resp.main.temp + ' °C <br>' +
                'Nem: ' + resp.main.humidity + ' % <br>' +
                ' ' + resp.weather[0].description.charAt(0).toUpperCase() +
                resp.weather[0].description.slice(1);

        }
        else if (this.status == 404) {
            loader.style.visibility = 'hidden';
            divResult1.style.visibility = 'hidden';
            alert('Şehir Bulunamadı!');
            return;
        }
    }
    xhr.send();
}

function imageLoad() {
    console.log('resim yüklendi');
    headerImage.classList.remove('image');
    headerImage.clientHeight;
    headerImage.classList.add('image');
}

btnTamam.onmouseover = function () {
    btnTamam.classList.remove('btnAnim2');
    btnTamam.classList.add('btnAnim1');
};

btnTamam.onmouseout = function () {
    btnTamam.classList.remove('btnAnim1');
    btnTamam.classList.add('btnAnim2');
};

btnTamam.addEventListener('click', function () {
    start();
})