window.onload = () => {
  const t = document.querySelector('.transition');
  const a = document.querySelectorAll('a');

  setTimeout(() => {
    t.classList.remove('is-active');
  }, 600)

  for (let i=0; i<a.length; i++){
    const as=a[i];

    as.addEventListener('click', e=>{
      e.preventDefault();
      let target = e.target.href;

      t.classList.add('is-active');

      setTimeout(() => {
        window.location.href = target;
      }, 400);
    });
  }
}

function elinker(){
  window.location.href="mailto:justdavidthatsall@gmail.com";
  window.location.href="index.html";
}

function portfixer(s){
  const sp = document.querySelector(s);
  sp.style.zIndex = "3";
};
function portunfixer(s){
  const sp = document.querySelector(s);
  setTimeout(() => {
    sp.style.zIndex = "1";
  }, 100)
};