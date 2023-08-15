const button = document.getElementById('button');
const audioElement = document.getElementById('audio');
const jokeText = document.getElementById('joke');
const loader = document.getElementById('loader');
const Container = document.getElementById('container');

function toggleButton(){
    button.disabled = !button.disabled;
}

function tellMe(joke){
    const jokeString = joke.trim().replace(/ /g, '%20');
    VoiceRSS.speech( {
        key: 'e1d6dc1b3d5d4b2ba63320c4f577cfcf',
        src: jokeString,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo', 
        ssml: false
    });
    jokeText.innerText = joke;
}

    


async function getJokes(){
    let joke = '';
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
    try{
        const response = await fetch(apiUrl);
        const data = await response.json();
        if(data.setup){
            joke = `${data.setup} ... ${data.delivery}`;

        }else{
            joke = data.joke;
        }
        
        tellMe(joke);
        toggleButton();
    }catch(error){
        
    }
}

button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);