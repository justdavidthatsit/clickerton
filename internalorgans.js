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
      "multiplier": 1,
      "upgr1": 1,
      "upgr2": 1,
      "upgr1price": 100,
      "upgr2price": 500
    },
    "minimonitor": {
      "baseprice": 150,
      "price": 100,
      "count": 0,
      "basepower": 1,
      "multiplier": 1,
      "upgr1": 1,
      "upgr2": 1,
      "upgr1price": 1000,
      "upgr2price": 5000
    }
  }
};
console.log(localStorage);
console.log(Game);

// our loading of a presave --------------------------------------- //
if (localStorage.getItem('lifetimeclix')>=1){
  
  function savefix(n){
    var fix = localStorage.getItem(n);
    return parseInt(fix, 10);
  }//name
  
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
  Game.Buyables.mice.upgr1 = savefix('mouupgr1');
  Game.Buyables.mice.upgr2 = savefix('mouupgr2');
  Game.Buyables.minimonitor.count += parseInt(fxmoncount, 10);
  Game.Buyables.minimonitor.price = parseInt(fxmonprice, 10);
  Game.Buyables.minimonitor.upgr1 = savefix('monupgr1');
  Game.Buyables.minimonitor.upgr2 = savefix('monupgr2');
};
// shortcuts ------------------------------------------------------ //
// CBID = Change By ID
const cbid = function(wheretheidsgonnabe){
  return document.getElementById(wheretheidsgonnabe);
};
// more preloading ------------------------------------------------ //
function upgradeboughtcheck(u,l){
  if (u>1){
    cbid(l).classList.add('urnothere');
  };
};
upgradeboughtcheck(Game.Buyables.mice.upgr1,"mouup1");
upgradeboughtcheck(Game.Buyables.mice.upgr2,"mouup2");
upgradeboughtcheck(Game.Buyables.minimonitor.upgr1, "monup1");
upgradeboughtcheck(Game.Buyables.minimonitor.upgr2, "monup2");
// dialogue ------------------------------------------------------- //
var welcomedialogue = [
  { d: "kat: \"Hey! I'm Kat. All settled in?\"",
    r: "Yup"
  },
  { d: "Kat: \"That's good, what's your name?\"",
    r: "[enter name]"
  },
  { d: `Kat: "Well hey, just letting you know at the top of the screen there are two buttons, one for going back home and the other (the rabbit) for buying upgrades. You can get started by clicking on the rabbit at the computer and make some Clix!"`,
    r: `"...What??"`
  },
  { d: `Kat: "Don't worry about it, cya for now!"`,
    r: `"Cya I guess?"`
  }
];

var current_line = 0;
var unaccepted_clicks = 0; //add later when unaccepted clicks get to like, 50, it gives a hidden achievement named like "te·na·cious: not readily relinquishing a position, principle, or course of action; determined."
function changedialogue(thingtosay){
  cbid("dialogue").innerHTML = thingtosay;
};

if (Game.User.doneintro == 1) {
  changedialogue(`Kat: "Welcome back ${Game.User.name}! I'd say how much you earned here but I havent been programmed to say that yet, and offline cps isn't a thing at the moment. Sorry :("`);
  cbid("dialogueR").innerHTML = "That's okay I guess :(";
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

function wipesave(){
  localStorage.clear();
  location.reload();
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
  localStorage.setItem("mouupgr1", Game.Buyables.mice.upgr1);
  localStorage.setItem("mouupgr2", Game.Buyables.mice.upgr2);
  localStorage.setItem("monitorcount", Game.Buyables.minimonitor.count);
  localStorage.setItem("monitorprice", Game.Buyables.minimonitor.price);
  localStorage.setItem("monupgr1", Game.Buyables.minimonitor.upgr1);
  localStorage.setItem("monupgr2", Game.Buyables.minimonitor.upgr2);
  console.log(`saved progress`);
  console.log(localStorage);
}, 10000)
// THE SAVE BOX!!!!!!!!!!!!!!!!!!!!!!
function changecolorbyid(thing, color){
  cbid(thing).style.color = color;
};

function updateClixthings() {
  //making things show up on the html
  var mou = Game.Buyables.mice;
  var mon = Game.Buyables.minimonitor;
  cbid("clixcount").innerHTML=abbreviateNumber(Math.floor(Game.Info.clix));
  //cbid("fpstrack").innerHTML=fps; [DEPRICATED FOR NOW, NO NEED]
  cbid("miceD").innerHTML=mou.count;
  cbid("mpriceD").innerHTML=mou.price;
  cbid("miceup1p").innerHTML=mou.upgr1price;
  cbid("miceup2p").innerHTML=mou.upgr2price;
  cbid("minimonD").innerHTML=mon.count;
  cbid("minimonpD").innerHTML=mon.price;
  cbid("monup1p").innerHTML=mon.upgr1price;
  cbid("monup2p").innerHTML=mon.upgr2price;
  cbid("cpsShower").innerHTML=abbreviateNumber(Game.Info.trueCps.toFixed(1));
  cbid("clixmadebyhandwowcrazy").innerHTML=Game.Info.handmadeclix;
  cbid("allurclixevermade").innerHTML=abbreviateNumber(Math.floor(Game.Info.lifetimeclix));
  
  function calc(c){
    return ((c.basepower*c.count)*((c.multiplier*c.upgr1)*c.upgr2));
  }
  var cpsget;
  cpsget = 
  calc(Game.Buyables.mice)+
  calc(Game.Buyables.minimonitor);

  Game.Info.trueCps = getTrueCps(Game.Info.cps, cpsget);


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

  function upappear(c,u,i,t){
    if (c>=t&&u==1){
      cbid(i).classList.add('urhere');
      cbid(i).classList.remove('urnothere');
    };
  };//count, upgrade, id, threshold
  upappear(Game.Buyables.mice.count, Game.Buyables.mice.upgr1, "mouup1", 1);
  upappear(Game.Buyables.mice.count, Game.Buyables.mice.upgr2, "mouup2", 5);
  upappear(Game.Buyables.minimonitor.count, Game.Buyables.minimonitor.upgr1, "monup1", 1);
  upappear(Game.Buyables.minimonitor.count, Game.Buyables.minimonitor.upgr2, "monup2", 5);

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
function buygrade(thing){
  function deletethisup(x){
    cbid(x).classList.add('urnothere');
  }
  switch (thing) {
    case 'mouseupgrade1': //MICE UPGRADE START ------------------------------- //
      if (Game.Info.clix>=Game.Buyables.mice.upgr1price){
        Game.Buyables.mice.upgr1+=1;
        Game.Info.clix-=Game.Buyables.mice.upgr1price;
        deletethisup("mouup1");
      };
      break
    case 'mouseupgrade2':
      if (Game.Info.clix>=Game.Buyables.mice.upgr2price){
        Game.Buyables.mice.upgr2+=1;
        Game.Info.clix-=Game.Buyables.mice.upgr2price;
        deletethisup("mouup2");
      };
      break
    case 'monupgrade1': //MONITOR UPGRADE START ------------------------------ //
      if (Game.Info.clix>=Game.Buyables.minimonitor.upgr1price){
        Game.Buyables.minimonitor.upgr1+=1;
        Game.Info.clix-=Game.Buyables.minimonitor.upgr1price;
        deletethisup("monup1");
      };
      break
    case 'monupgrade2':
      if (Game.Info.clix>=Game.Buyables.minimonitor.upgr2price){
        Game.Buyables.minimonitor.upgr2+=1;
        Game.Info.clix-=Game.Buyables.minimonitor.upgr2price;
        deletethisup("monup2");
      };
      break
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