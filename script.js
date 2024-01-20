const canva = document.getElementById('canva');
const ctx = canva.getContext('2d');
canva.width =  window.innerWidth;
canva.height = window.innerHeight;
const pararray = [];
let hue = 0;
window.addEventListener("resize",function(event){
    canva.width = window.innerWidth;
    canva.height = window.innerHeight;

});
const mouse = {
    x:undefined,
    y:undefined
}
canva.addEventListener("mousemove",function(event){
    mouse.x = event.x;
    mouse.y = event.y
   for(let i = 0;i<2;i++){
    pararray.push(new Particle());
   }

});

class Particle{
    constructor(){
        this.x = mouse.x;
        this.y = mouse.y;
        // this.x = Math.random() * canva.width;
        // this.y = Math.random() * canva.height;
        this.size = Math.random()*25+1;
        this.speedX = Math.random()*3 - 1.5;
        this.speedY = Math.random()*3 - 1.5;
        this.color = 'hsl(' + hue + ', 100%,50%)';
    }
    update(){
        this.x += this.speedX;
        this.y += this.speedY;
        if(this.size > 0.2) this.size -= 0.1;
    }
    draw(){
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.size,0, Math.PI*2);
        ctx.fill();
    }
}


function handle(){
    for(let i = 0; i<pararray.length;i++){
        pararray[i].update();
        pararray[i].draw();
        for(let j = i;j<pararray.length;j++){
            const dx = pararray[i].x - pararray[j].x;
            const dy= pararray[i].y - pararray[j].y;
            const distance = Math.sqrt(dx*dx + dy*dy);
            if(distance<100){
                ctx.beginPath();
                ctx.strokeStyle = pararray[i].color;
                
                ctx.lineWidth = 0.5;

                ctx.moveTo(pararray[i].x,pararray[i].y);
                ctx.lineTo(pararray[j].x,pararray[j].y);
                ctx.stroke();
                ctx.closePath();
            }

        }
        if(pararray[i].size <= 0.3){
            pararray.splice(i,1);
            i--;
        }
    }
}
function animation(){

    ctx.fillStyle = 'rgba(0,0,0,0.1)';
    ctx.fillRect(0,0,canva.width,canva.height);
    handle();
    hue+=5;
    requestAnimationFrame(animation);
}
animation();