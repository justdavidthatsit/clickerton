// hi! :3c

// base values ---------------------------------------------------- //
var fps = 30;
const Game = {
  "User": {
    "name": ""
  },
  "Info": {
    "clix": 0,
    "cps": 0,
    "clickpower": 500,
    "trueCps": 0 //THIS SHOULD ALWAYS START AS 0
  },
  "Buyables": {
    "mice": {
      "baseprice": 15,
      "price": 15,
      "count": 0,
      "basepower": 1,
      "multiplier": 1
    },
    "minimonitor": {
      "baseprice": 150,
      "price": 150,
      "count": 0,
      "basepower": 10,
      "multiplier": 1
    }
  }
};
console.log(localStorage);
console.log(Game);

// our loading of a presave --------------------------------------- //
if (localStorage.length>=1){
  var fixedupclix = localStorage.getItem('clix');
  Game.Info.clix += parseInt(fixedupclix, 10);
  Game.User.name = localStorage.getItem('name');
};
// dialogue ------------------------------------------------------- //
var welcomedialogue = [
  { d: "kat: \"hey! i'm kat. all settled in?\"",
    r: "yea"
  },
  { d: "kat: \"that's good, purrhaps you'll be a better roommate than my last one! what's your name?\"",
    r: "[enter name]"
  },
  { d: `kat: "well hey ${Game.User.name}, heard you're doin some kinda self employment thing? that's pretty neat"`,
    r: `"mhm! all from my room haha"`
  },
  { d: "kat: \"that's pawsomee, anyway i'll cya for now but good luck with all that!\"",
    r: `"cya"`
  }
];
var current_line = 0;
var unaccepted_clicks = 0; //add later when unaccepted clicks get to like, 50, it gives a hidden achievement named like "te·na·cious: not readily relinquishing a position, principle, or course of action; determined."
function changedialogue(thingtosay){
  document.getElementById("dialogue").innerHTML = thingtosay;
};

if (Game.User.name) {
  changedialogue(`kat: "welcome back ${Game.User.name}! i'd say how much you earned here but i havent been programmed to say that yet :DD"`);
  document.getElementById("dialogueR").innerHTML = "lol hey";
  current_line = 'welcome';
};

function remove(){
  document.getElementById('modal_container').classList.remove('show');
};
function next(){
  if (current_line='welcome') {
    remove();
  };

  current_line+=1;
  var current_step = welcomedialogue[current_line];
  var chosenuser = document.getElementById("chosenuser").value;
  
  if(current_step==undefined){
    document.getElementById("user").innerHTML=Game.User.name;
    remove();
  };
  console.log(current_step);
  changedialogue(current_step.d);
  document.getElementById("dialogueR").innerHTML = current_step.r;
  // input name handling (put 'current_line-=1;' if you wanna invalidate an input ;)
  if (current_line == 1) {
    document.getElementById('chosenuser').classList.add('show');
  } else if (current_line > 1) {
    document.getElementById('chosenuser').classList.remove('show');
  };

  switch (current_line) {
    case 2: //ASKING FOR NAME LINE
      if (chosenuser.length < 1) {
        current_line-=1;
        changedialogue(`kat: "...you got a name, right?"`);
        document.getElementById("dialogueR").innerHTML = "[enter name]";
        document.getElementById('chosenuser').classList.add('show');
        unaccepted_clicks+=1;
      };
      if (chosenuser.length < 1 && unaccepted_clicks >= 49) {
        changedialogue(`kat: "i dunno what you think clicking that more will do"`);
        //give an achievement here when u can
      };
      if (chosenuser.length >= 1) {
        Game.User.name=chosenuser;
        localStorage.setItem("name", chosenuser);
        changedialogue(`kat: "well hey ${Game.User.name}, heard you're doin some kinda self employment thing? that's pretty neat"`);
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

console.log(localStorage);

// THE SAVE BOX!!!!!!!!!!!!!!!!!!!!!!
setInterval(function(){
  localStorage.setItem("clix", Math.floor(Game.Info.clix));
  console.log(`saved progress`);
  console.log(localStorage);
}, 10000)
// THE SAVE BOX!!!!!!!!!!!!!!!!!!!!!!
function changecolorbyid(thing, color){
  document.getElementById(thing).style.color = color;
};

function updateClixthings() {
  document.getElementById("clixcount").innerHTML=abbreviateNumber(Math.floor(Game.Info.clix));
  document.getElementById("fpstrack").innerHTML=fps;
  document.getElementById("miceD").innerHTML=Game.Buyables.mice.count;
  document.getElementById("mpriceD").innerHTML=Game.Buyables.mice.price;
  document.getElementById("minimonD").innerHTML=Game.Buyables.minimonitor.count;
  document.getElementById("minimonpD").innerHTML=Game.Buyables.minimonitor.price;
  document.getElementById("cpsShower").innerHTML=Game.Info.trueCps;

  // console.log(`you're on case ${current_line} and have ${unaccepted_clicks} invalid 'next's`);
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
};

// clix production 😈 -------------------------------------------- //

function click(){
  Game.Info.clix+=Game.Info.clickpower;
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
  updateClixthings();
}, 1000/fps);