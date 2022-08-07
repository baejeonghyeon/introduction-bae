// 모바일 경고창
const mobile_caution = document.querySelector('.mobile-caution-modals');
const current_width = document.querySelector('.current-width');

// 메뉴 모달
const menu_button = document.querySelector('.menu-button');
const modal_menu = document.querySelector('.menu-modals');

// 스크롤에 따른 헤더창 변경
const header = document.querySelector('header');

// 스크롤에 따른 드래프트 이미지 위치 변경drafts_section
const about_section = document.getElementById('about');
const drafts_section = document.getElementById('drafts');
const my_creations = Array.from(document.querySelectorAll('.creation'));

//동그라미
const contact_section = document.querySelector('.my-circle');

// 내비게이션
const links = document.querySelectorAll('.nav-link');

// 모바일 경고창
window.addEventListener('resize', () => {
  let monitor_width = window.innerWidth;
  current_width.innerHTML = monitor_width;

  if (monitor_width < 900){
    mobile_caution.classList.add('isMobile');
  } else {
    mobile_caution.classList.remove('isMobile');
  }
})


// 메뉴 모달
let isMenuOpened = false;

menu_button.addEventListener('click', () => {
  if( !isMenuOpened ){
    document.body.classList.add('stopScrolling');
    modal_menu.classList.add('open');
    menu_button.classList.add('x-button');
    header.classList.remove('scrolled');
    isMenuOpened = true;
  } else {
    document.body.classList.remove('stopScrolling');
    modal_menu.classList.remove('open');
    menu_button.classList.remove('x-button');
    if (window.pageYOffset > 0){
      header.classList.add('scrolled');
    };
    
    isMenuOpened = false;
  }
  
})

// 스크롤 리빌
let sr = ScrollReveal({
  duration: 2500,
  distance: '100px'
});

sr.reveal('.home .container', {
  delay: 300
});

sr.reveal('.low-poly', {
  delay: 300,
  origin: 'top'
});

sr.reveal('.skills', {
  delay: 130,
  origin: 'top'
});

sr.reveal('.my-contact', {
  delay: 130,
});






// 스크롤에 따른 헤더창 변경
const stickyNavbar = () => {
  header.classList.toggle('scrolled', window.pageYOffset > 0);
  // window.pageYOffset이 0보다 크면 header에 'scrolled'라는 클래스 부착.
};

stickyNavbar();
// we also need to call the function once the page is reloaded
// 중간에서 새로고침하면 처음에 적용이 안 되는 문제를 해결할 수 있음.

window.addEventListener('scroll', stickyNavbar);

// 스크롤에 따른 드래프트 이미지 위치 변경

// offsetHeight: 요소의 내부 높이 - padding, border 포함. margin 제외
// window.pageYOffset: 문서가 수직으로 얼마나 스크롤됐는지 pixel 단위로 반환한다.
// window.innerHeight: 문서 창의 높이(메뉴 바 제외)
// getBoundingClientRect: 엘리먼트의 크기와 뷰포트에 상대적인 위치 정보를 제공하는 DOMRect 객체를 반환

window.addEventListener('scroll', () => {


  // console.log(window.pageYOffset);
  if(window.pageYOffset > window.innerHeight && window.pageYOffset < window.innerHeight * 3){
    for(let i = 0; i < my_creations.length; i++){
      my_creations[i].classList.remove('display-none');
      my_creations[i].style.transform = `translateY(${window.pageYOffset / (drafts_section.getBoundingClientRect().top + drafts_section.offsetHeight) * my_creations[i].dataset.rate}%)`;
    };
  } else {
    for(let i = 0; i < my_creations.length; i++){
      my_creations[i].classList.add('display-none');
    };
  }
    
});




// 내비게이션 활성화
activeLink();

window.addEventListener('scroll', () => {
  activeLink();
})

function activeLink(){
  let sections = document.querySelectorAll('section[id]');
  let passedSections = Array.from(sections).map((sct, i) => {
    return {
      y: sct.getBoundingClientRect().top,
      id: i
    }
  }).filter((sct) => sct.y <= 0);

  let currSectionId = passedSections.at(-1).id;
  links.forEach((link) => (link.classList.remove('current-location')));
  links[currSectionId].classList.add('current-location');
 
};





// 동그라미
const my_circle = document.querySelector('.my-circle');
const sk_counter = document.querySelector('.sk h2 span');
const progress_bar = document.querySelector('svg circle')

window.addEventListener('scroll',() => {
  if (!circlePlayed){
    circleCounter();
  }
})


// 동그라미 정리 전 코드
function hasReached(event){
  let topPosition = event.getBoundingClientRect().top;

  if(window.innerHeight >= topPosition + event.offsetHeight) return true;
  return false;
}



function updateCount(num, maxNum){
  let currentNum = +num.innerText;

  if(currentNum < maxNum){
    num.innerText = currentNum + 1;
    setTimeout(() => {
      updateCount(num, maxNum);
    }, 18);
  }
}

// sk_counter.style.transition = '18ms cubic-bezier(0.000, 0.035, 0.000, 0.990) forwards';

let circlePlayed = false;

function circleCounter(){
  if(!hasReached(my_circle)) return;

  circlePlayed = true;

  let target = +sk_counter.dataset.target;
  let strokeValue = 427 - 427 * (target / 100);
  progress_bar.style.setProperty('--target', strokeValue);
  setTimeout(() => {
    updateCount(sk_counter, target);
  }, 400);

  progress_bar.style.animation = 'progress 3s ease-out forwards';
}
