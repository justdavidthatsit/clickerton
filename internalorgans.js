// hi! :3c

// base values ---------------------------------------------------- //
var fps = 30;
const Game = {
  "User": {
    "doneintro": 0,
    "name": ""
  },
  "Info": {
    "clix": 0,
    "cps": 0,
    "clickpower": 1,
    "trueCps": 0, //THIS SHOULD ALWAYS START AS 0
    "handmadeclix": 0,
    "lifetimeclix": 0
  },
  "Buyables": {
    "mice": {
      "baseprice": 15,
      "price": 15,
      "count": 0,
      "basepower": .1,
      "multiplier": 1
    },
    "minimonitor": {
      "baseprice": 150,
      "price": 100,
      "count": 0,
      "basepower": 1,
      "multiplier": 1
    }
  }
};
console.log(localStorage);
console.log(Game);

// our loading of a presave --------------------------------------- //
if (localStorage.getItem('lifetimeclix')>=1){
  Game.User.doneintro = localStorage.getItem('done with intro');

  var fixedupclix = localStorage.getItem('clix');
  var fxdhandmade = localStorage.getItem('handmadeclix');
  var fixeduplifetimeclix = localStorage.getItem('lifetimeclix');
  var fxdmicecount = localStorage.getItem('micecount');
  var fxdmiceprice = localStorage.getItem('miceprice');
  var fxmoncount = localStorage.getItem("monitorcount");
  var fxmonprice = localStorage.getItem("monitorprice");

  Game.Info.clix += parseInt(fixedupclix, 10);
  Game.Info.handmadeclix += parseInt(fxdhandmade, 10);
  Game.Info.lifetimeclix += parseInt(fixeduplifetimeclix, 10);
  Game.User.name = localStorage.getItem('name');
  Game.Buyables.mice.count += parseInt(fxdmicecount, 10);
  Game.Buyables.mice.price = parseInt(fxdmiceprice, 10);
  Game.Buyables.minimonitor.count += parseInt(fxmoncount, 10);
  Game.Buyables.minimonitor.price = parseInt(fxmonprice, 10);
};
// shortcuts ------------------------------------------------------ //
// CBID = Change By ID
const cbid = function(wheretheidsgonnabe){
  return document.getElementById(wheretheidsgonnabe);
};
// dialogue ------------------------------------------------------- //
var welcomedialogue = [
  { d: "kat: \"hey! i'm kat. all settled in?\"",
    r: "yea"
  },
  { d: "kat: \"that's good, purrhaps you'll be a better roommate than my last one! what's your name?\"",
    r: "[enter name]"
  },
  { d: `kat: "well hey, heard you're doin some kinda new 'clix' thing? heard a bit about that online."`,
    r: `"same here, wanted to try it out"`
  },
  { d: "kat: \"that's neat, anyway i'll cya for now but good luck with all that!\"",
    r: `"cya"`
  }
];

var current_line = 0;
var unaccepted_clicks = 0; //add later when unaccepted clicks get to like, 50, it gives a hidden achievement named like "te·na·cious: not readily relinquishing a position, principle, or course of action; determined."
function changedialogue(thingtosay){
  cbid("dialogue").innerHTML = thingtosay;
};

if (Game.User.doneintro == 1) {
  changedialogue(`kat: "welcome back ${Game.User.name}! i'd say how much you earned here but i havent been programmed to say that yet :DD"`);
  cbid("dialogueR").innerHTML = "lol hey";
  cbid("user").innerHTML = Game.User.name;
  current_line = 'welcome';
};

function remove(){
  Game.User.doneintro = 1;
  cbid('modal_container').classList.remove('show');
};
function next(){
  if (Game.User.doneintro == 1) {
    remove();
  };

  current_line+=1;
  var current_step = welcomedialogue[current_line];
  var chosenuser = cbid("chosenuser").value;
  
  if(current_step==undefined){
    cbid("user").innerHTML=Game.User.name;
    remove();
  };
  changedialogue(current_step.d);
  cbid("dialogueR").innerHTML = current_step.r;
  // input name handling (put 'current_line-=1;' if you wanna invalidate an input ;)
  if (current_line == 1) {
    cbid('chosenuser').classList.add('show');
  } else if (current_line > 1) {
    cbid('chosenuser').classList.remove('show');
  };

  switch (current_line) {
    case 2: //ASKING FOR NAME LINE
      if (chosenuser.length < 1) {
        current_line-=1;
        changedialogue(`kat: "...you got a name, right?"`);
        cbid("dialogueR").innerHTML = "[enter name]";
        cbid('chosenuser').classList.add('show');
        unaccepted_clicks+=1;
      };
      if (chosenuser.length < 1 && unaccepted_clicks >= 49) {
        changedialogue(`kat: "i dunno what you think clicking that more will do"`);
        //give an achievement here when u can
      };
      if (chosenuser.length >= 1) {
        Game.User.name=chosenuser;
        localStorage.setItem("name", chosenuser);
        current_step == 3;
      };
    default:
      break;
  };
};

// meta ---------------------------------------------------------- //
function abbreviateNumber(value) {
  if (value>9999) {
    let newValue = value;
    const suffixes = ["", "k", "m", "b", "t", "q", "Q", "s", "S", "o", "n", "d", "U"];
    let suffixNum = 0;
    while (newValue >= 1000) {
      newValue /= 1000;
      suffixNum++;
    };
  
    newValue = newValue.toPrecision(3);
  
    newValue += suffixes[suffixNum];
    return newValue;
  } else {
    return value;
  };
};

function goto(here, notthere){
  //in the situation you need to add multiple "notthere"s, maybe find a way to add all the places ur not at in the variables area
  //what im trynna say is this is a bandaid fix for now
  var whereugoin
  var whereufrom
  whereugoin=here;
  whereufrom=notthere;
  cbid(whereugoin).classList.add('urhere');
  cbid(whereugoin).classList.remove('urnothere');
  cbid(whereufrom).classList.remove('urhere');
  cbid(whereufrom).classList.add('urnothere');

  if (here=='room'){
    setTimeout(function(){
      cbid('LUhome').style.width = '100%';
      cbid('LUjak').style.width = '2px';
    }, 1);
  }else{
    setTimeout(function(){
      cbid('LUhome').style.width = '2px';
      cbid('LUjak').style.width = '100%';
    }, 1);
  };
};

console.log(localStorage);

// THE SAVE BOX!!!!!!!!!!!!!!!!!!!!!!
setInterval(function(){
  localStorage.setItem("done with intro", Game.User.doneintro);
  localStorage.setItem("clix", Math.floor(Game.Info.clix));
  localStorage.setItem("handmadeclix", Math.floor(Game.Info.handmadeclix));
  localStorage.setItem("lifetimeclix", Math.floor(Game.Info.lifetimeclix));
  localStorage.setItem("micecount", Game.Buyables.mice.count);
  localStorage.setItem("miceprice", Game.Buyables.mice.price);
  localStorage.setItem("monitorcount", Game.Buyables.minimonitor.count);
  localStorage.setItem("monitorprice", Game.Buyables.minimonitor.price);
  console.log(`saved progress`);
  console.log(localStorage);
}, 10000)
// THE SAVE BOX!!!!!!!!!!!!!!!!!!!!!!
function changecolorbyid(thing, color){
  cbid(thing).style.color = color;
};

function updateClixthings() {
  //making things show up on the html
  cbid("clixcount").innerHTML=abbreviateNumber(Math.floor(Game.Info.clix));
  cbid("fpstrack").innerHTML=fps;
  cbid("miceD").innerHTML=Game.Buyables.mice.count;
  cbid("mpriceD").innerHTML=Game.Buyables.mice.price;
  cbid("minimonD").innerHTML=Game.Buyables.minimonitor.count;
  cbid("minimonpD").innerHTML=Game.Buyables.minimonitor.price;
  cbid("cpsShower").innerHTML=abbreviateNumber(Game.Info.trueCps.toFixed(1));
  cbid("clixmadebyhandwowcrazy").innerHTML=Game.Info.handmadeclix;
  cbid("allurclixevermade").innerHTML=abbreviateNumber(Math.floor(Game.Info.lifetimeclix));
  

  var cpsget
  cpsget = 
  ((Game.Buyables.mice.basepower*Game.Buyables.mice.count)*Game.Buyables.mice.multiplier)+
  ((Game.Buyables.minimonitor.basepower*Game.Buyables.minimonitor.count)*Game.Buyables.minimonitor.multiplier)

  Game.Info.trueCps = getTrueCps(Game.Info.cps, cpsget)


  //stylistic things
  if (Game.Info.clix>=Game.Buyables.mice.price){
    changecolorbyid("affordmouse", '#000000');
  } else if (Game.Info.clix<Game.Buyables.mice.price){
    changecolorbyid("affordmouse", '#545454');
  };
  if (Game.Info.clix>=Game.Buyables.minimonitor.price){
    changecolorbyid("affordmon", '#000000');
  } else if (Game.Info.clix<Game.Buyables.minimonitor.price){
    changecolorbyid("affordmon", '#545454');
  };

  var L = Game.Info.lifetimeclix;
  if (L<15){
    cbid("flavor").innerHTML="you're a bit behind on rent, but maybe this clix stuff'll take off. (click on the rabbit at the desk to the right to get started)";
  } else if (L>15&&L<300){
    cbid("flavor").innerHTML="made a bit on the side so far! still not much but you can afford like, a mouse or something now.";
  } else if (L>300){
    cbid("flavor").innerHTML="this is really getting somewhere, could be a full time thing.";
  };
};

// clix production 😈 -------------------------------------------- //

function click(){
  Game.Info.clix+=Game.Info.clickpower;
  Game.Info.lifetimeclix+=Game.Info.clickpower;
  Game.Info.handmadeclix+=Game.Info.clickpower;
  updateClixthings();
};

function buy(thing){
  //SELECTING WHAT YOU'RE BUYING
  var currentfella
  switch (thing) {
    case 'mice':
      console.log('read: u wanna buy a mouse');
      currentfella = Game.Buyables.mice;
      break
    case 'minimonitor':
      console.log('read: u wanna buy a mini monitor');
      currentfella = Game.Buyables.minimonitor;
      break
    default:
      console.log(`I DON'T KNOW WHAT YOU'RE TRYING TO BUY LMAO`);
  };
  //BUYING SELECTED THING
  if (Game.Info.clix>=currentfella.price) {
    Game.Info.clix-=currentfella.price;
    currentfella.count+=1;
    currentfella.price=Math.round(currentfella.baseprice*(1.15**currentfella.count));
    console.log(currentfella.price);
  };
};

document.addEventListener("visibilitychange", function() {
  if (document.visibilityState === 'visible') {
    fps = 30;
  } else {
    fps = 1;
  }
})

// getting cps here ------------------------------------------------ //
function getTrueCps(a, b) {
  return a + b;
}
// getting cps here ------------------------------------------------ //

setInterval(function(){
  Game.Info.clix+=Game.Info.trueCps/fps;
  Game.Info.lifetimeclix+=Game.Info.trueCps/fps;
  updateClixthings();
}, 1000/fps);