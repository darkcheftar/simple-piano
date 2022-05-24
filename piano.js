window.addEventListener('paste',(e)=>{
    console.log(e)
    if(e?.clipboardData?.files.length > 0){
        if(e.clipboardData.files[0].type.startsWith('image/')){
            setPreviewImage(e.clipboardData.files[0]);
        }
    }
})
function setPreviewImage(file){
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload=()=>{
        document.querySelector('img').src = fileReader.result;
    }
}

let ctx = new AudioContext();
let frequencies = [
    130.813, 146.8325,  164.814,
    174.614, 195.9975,      220,
   246.9415, 261.6255,  261.626,
    293.665,  329.628,  349.228,
    391.995,      440,  493.883,
    523.251,  523.252,   587.33,
    659.256,  698.456,   783.99,
        880,  987.766, 1046.502
 ]

let keys = "qweruiopasdfjkl;zxcvnm,."
let f = {};
for(i of [...Array(keys.length).keys()]){
    f[keys[i]] = frequencies[i]
}

function Note(frequency){
    this.controller = ctx.createGain()
    this.controller.gain.setValueAtTime(0,ctx.currentTime);
    this.osc = ctx.createOscillator();
    this.osc.frequency.setValueAtTime(frequency,ctx.currentTime);
    this.osc.connect(this.controller);
    this.controller.connect(ctx.destination);
    this.osc.start();
    return this.controller
}
for(let i in f){
    f[i] = Note(f[i])
}
f.get = (k)=>{
    if (f[k]){return f[k];}
}
let body = document.querySelector('body');
body.addEventListener('keypress',(e)=>{
    if(ctx.state=="suspended"){ctx.resume();}
    f.get(e.key)?.gain.setTargetAtTime(1,ctx.currentTime,0.5);
    f.get(e.key)?.gain.setTargetAtTime(0,ctx.currentTime+0.1,0.5)

});
