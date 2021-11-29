var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var diskColors = ['#ff0000', '#ffa500 ', '#ffff00', '#008000', '#0000ff', '#4b0082', '#ee82ee'];
var origen;
var destino;
var auxiliar;
var nivel;

$(document).ready(function(){

    $('#btnGenerar').click(function(){
        nivel = parseInt($('#selectNiveles').val());
        if (isNaN(nivel)) {
            alert("Por favor selecione un nivel");
            return;
        }
        init();
        return false;
    });

    $('#btnResolver').click(function(){
        if (isNaN(nivel)) {
            alert("Por favor selecione un nivel");
            return;
        }
        init();
        solve();
        return false;
    });
    drawBackground();
}); 

async function solve(){
    $("#btnGenerar").prop("disabled", true);
    $("#btnResolver").prop("disabled", true);
    await hanoi(nivel+1, origen, auxiliar, destino);
    $("#btnGenerar").removeAttr('disabled');
    $("#btnResolver").removeAttr('disabled');
}

function init(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();

    $('#log').html('');

    var nivel = parseInt($('#selectNiveles').val());

    origen = { name: 'A', loc: 0, stack: []};
    destino = { name: 'B', loc: 1, stack: []};
    auxiliar = { name: 'C', loc: 2, stack: []};

    for (var i = nivel + 1; i > 0; i--) {
        origen.stack.push(i);
    }
    drawDisks(origen, destino, auxiliar);
}
async function hanoi(disco, orig, dest, aux){
    if (disco > 0){ 
        await hanoi(disco-1, orig, aux, dest);
        $('#log').append('<p class="m-0 p-0">Mover disco ' + disco + ' de ' + orig.name + ' a ' + dest.name + '</p>');
        var elem = document.getElementById('log');
        elem.scrollTop = elem.scrollHeight;
        dest.stack.push(orig.stack.pop());
        drawDisks(orig, aux, dest);
        await hanoi(disco-1, aux, dest, orig);
    }
    return new Promise(resolve => setTimeout(resolve, 500));
}

function drawDisks(stack1, stack2, stack3){
    drawBackground();

    for (var i = 0; i < stack1.stack.length; i++) {
        drawDisk(stack1.loc, i, stack1.stack[i]);
    }
    for (var i = 0; i < stack2.stack.length; i++) {
        drawDisk(stack2.loc, i, stack2.stack[i]);
    }
    for (var i = 0; i < stack3.stack.length; i++) {
        drawDisk(stack3.loc, i, stack3.stack[i]);
    }
}

function drawBackground(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle  = '#37474F';
    ctx.fillStyle = '#B0BEC5';
    ctx.beginPath();
    ctx.rect(20,300,190,10);
    ctx.rect(115,100,10,200);
    ctx.rect(220,300,190,10);
    ctx.rect(315,100,10,200);
    ctx.rect(420,300,200,10);
    ctx.rect(515,100,10,200);
    ctx.fill();
    ctx.stroke();
}

function drawDisk(position, level, disk){
    ctx.beginPath();
    ctx.fillStyle = '#37474F';
    ctx.fillStyle = diskColors[disk - 1];
    ctx.rect((position * 200) + 120 - (disk * 25 / 2), 280 - (level * 20), disk * 25,20);
    ctx.fill();
    ctx.stroke();
}