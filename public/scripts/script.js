const path = window.location.pathname;
 const navLinks = document.querySelectorAll('.navLink');
function markActive(){
    console.log("path:", path);
  navLinks.forEach(elem =>{
    if(elem.href.includes(path)){
        elem.classList.add('active');
    }
    else{
        elem.classList.remove('active');
    }
  });
  
   
}
