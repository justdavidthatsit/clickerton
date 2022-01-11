const modal_container = document.getElementById('modal_container');

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
    "clickpower": 1,
    "trueCps": 0 //THIS SHOULD ALWAYS START AS 0
  },
  "mice": {
    "price": 15,
    "count": 0,
    "basepower": 1,
    "multiplier": 1
  }
};
console.log(localStorage);
console.log(Game);

if (localStorage.length>=1){
  var fixedupclix = localStorage.getItem('clix');
  Game.Info.clix += parseInt(fixedupclix, 10);
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
function remove(){
  document.getElementById('modal_container').classList.remove('show');
};
function next(){
  current_line+=1;
  var current_step = welcomedialogue[current_line];
  var chosenuser = document.getElementById("chosenuser").value;
  function changedialogue(thingtosay){
    document.getElementById("dialogue").innerHTML = thingtosay;
  };
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
        changedialogue(`kat: "well hey ${Game.User.name}, heard you're doin some kinda self employment thing? that's pretty neat"`);
      };
    default:
      break;
  };
};

// meta ---------------------------------------------------------- //
console.log(localStorage);

// THE SAVE BOX!!!!!!!!!!!!!!!!!!!!!!
setInterval(function(){
  localStorage.setItem("clix", Math.floor(Game.Info.clix));
  console.log(`saved progress`);
  console.log(localStorage);
}, 10000)
// THE SAVE BOX!!!!!!!!!!!!!!!!!!!!!!

function updateClixthings() {
  document.getElementById("clixcount").innerHTML=Math.floor(Game.Info.clix);
  document.getElementById("fpstrack").innerHTML=fps;
  document.getElementById("miceD").innerHTML=Game.mice.count;
  document.getElementById("mpriceD").innerHTML=Game.mice.price;
  document.getElementById("cpsShower").innerHTML=Game.Info.trueCps;

  // console.log(`you're on case ${current_line} and have ${unaccepted_clicks} invalid 'next's`);

  Game.Info.trueCps = getTrueCps(Game.Info.cps, (Game.mice.basepower*Game.mice.count)*Game.mice.multiplier)
};

// clix production 😈 -------------------------------------------- //

function click(){
  Game.Info.clix+=Game.Info.clickpower;
  updateClixthings();
};


function mgrade(){
  if (Game.Info.clix >= Game.mice.price) {
    Game.Info.clix-=Game.mice.price;
    Game.mice.count+=1;
  }
  updateClixthings();
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