const loader=document.getElementById('pageLoader');
window.addEventListener('load',()=>setTimeout(()=>loader.classList.add('hide'),350));
const header=document.getElementById('header');
window.addEventListener('scroll',()=>header.classList.toggle('scrolled',window.scrollY>30));
const menu=document.getElementById('menuToggle'); const nav=document.getElementById('mainNav');
menu.addEventListener('click',()=>nav.classList.toggle('open'));
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
const serviceData={
 construction:{title:'Construction',text:'ICL International supports construction needs from planning and coordination through practical project execution. Our focus is dependable delivery, quality and clear communication.'},
 consultation:{title:'Consultation',text:'Our consultation service provides practical guidance for planning, assessment, coordination and decision-making, helping you move from requirements to a clear action plan.'},
 logistics:{title:'Logistics',text:'We support transportation and supply-chain requirements with a focus on coordination, dependable movement of goods and materials, and efficient project support.'},
 labor:{title:'Labor Force Supply',text:'We help organizations meet workforce requirements by supporting the sourcing and coordination of skilled and reliable personnel for projects and operations.'}
};
const modal=document.getElementById('serviceModal'); const modalTitle=document.getElementById('modalTitle'); const modalText=document.getElementById('modalText');
document.querySelectorAll('[data-service]').forEach(btn=>btn.addEventListener('click',()=>{const d=serviceData[btn.dataset.service];modalTitle.textContent=d.title;modalText.textContent=d.text;modal.classList.add('open');modal.setAttribute('aria-hidden','false')}));
const closeModal=()=>{modal.classList.remove('open');modal.setAttribute('aria-hidden','true')};
document.getElementById('modalClose').addEventListener('click',closeModal);modal.querySelector('.modal-backdrop').addEventListener('click',closeModal);document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});
document.getElementById('modalContact').addEventListener('click',closeModal);
const form=document.getElementById('contactForm'); const note=document.getElementById('formNote');
form.addEventListener('submit',async e=>{
  e.preventDefault();
  note.textContent='Sending your request...';
  try {
    const response=await fetch('https://formsubmit.co/ajax/icl-international@icl-gov.com',{
      method:'POST',
      headers:{'Accept':'application/json'},
      body:new FormData(form)
    });
    if(!response.ok) throw new Error('Request failed');
    note.textContent='Thank you. Your request has been sent successfully.';
    form.reset();
  } catch(error) {
    note.textContent='Sorry, your request could not be sent. Please try again.';
  }
});
document.getElementById('year').textContent=new Date().getFullYear();
const sections=[...document.querySelectorAll('main section[id]')]; const links=[...nav.querySelectorAll('a[href^="#"]')];
window.addEventListener('scroll',()=>{let current='home';sections.forEach(s=>{if(window.scrollY>=s.offsetTop-160)current=s.id});links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+current))});
