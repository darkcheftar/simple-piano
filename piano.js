let ctx = new AudioContext();
let frequencies = [
    261.626, 293.665,
    329.628, 349.228,
    391.995,     440,
    493.883, 523.251
  ]
let f = {
    "a": 261.626,
    "s": 293.665,
    "d": 329.628,
    "f": 349.228,
    "j": 391.995,
    "k": 440,
    "l": 493.883,
    ";": 523.251
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
