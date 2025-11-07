// script.js

// تهيئة الصفحة عند التحميل
document.addEventListener('DOMContentLoaded', function() {
  // تهيئة تأثير الكتابة
  initTypingEffect();
  
  // تهيئة أشرطة التقدم
  initSkillBars();
  
  // تهيئة تأثيرات الظهور
  initScrollAnimations();
  
  // تهيئة القائمة المتنقلة
  initMobileMenu();
});

// تأثير الكتابة الآلية
function initTypingEffect() {
  const descriptionElement = document.getElementById('description');
  const texts = {
    en: [
      "Game Developer",
      "Programmer", 
      "Web Developer"
    ],
    ar: [
      "مطور ألعاب",
      "مبرمج",
      "مطور مواقع ويب"
    ]
  };
  
  let isEnglish = true;
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let currentText = '';
  
  function type() {
    const currentLanguage = isEnglish ? 'en' : 'ar';
    const fullText = texts[currentLanguage][textIndex];
    
    if (isDeleting) {
      currentText = fullText.substring(0, charIndex - 1);
      charIndex--;
    } else {
      currentText = fullText.substring(0, charIndex + 1);
      charIndex++;
    }
    
    descriptionElement.textContent = currentText;
    
    let typeSpeed = isDeleting ? 50 : 100;
    
    if (!isDeleting && charIndex === fullText.length) {
      typeSpeed = 2000; // انتظار في نهاية النص
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts[currentLanguage].length;
      typeSpeed = 500;
    }
    
    setTimeout(type, typeSpeed);
  }
  
  // بدء تأثير الكتابة
  setTimeout(type, 1000);
}

// أشرطة تقدم المهارات
function initSkillBars() {
  const skillProgressElements = document.querySelectorAll('.skill-progress');
  
  function animateSkillBars() {
    skillProgressElements.forEach(progress => {
      const level = progress.getAttribute('data-level');
      progress.style.width = level + '%';
    });
  }
  
  // تفعيل الرسوم المتحركة عند التمرير إلى القسم
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateSkillBars();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  const skillsSection = document.querySelector('.skills-section');
  if (skillsSection) {
    observer.observe(skillsSection);
  }
}

// تأثيرات الظهور عند التمرير
function initScrollAnimations() {
  const fadeElements = document.querySelectorAll('.fade-in');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });
  
  fadeElements.forEach(element => {
    observer.observe(element);
  });
}

// القائمة المتنقلة
function initMobileMenu() {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navbar = document.querySelector('.navbar');
  
  if (mobileMenuBtn && navbar) {
    mobileMenuBtn.addEventListener('click', function() {
      navbar.classList.toggle('active');
      mobileMenuBtn.classList.toggle('active');
    });
    
    // إغلاق القائمة عند النقر على رابط
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        navbar.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
      });
    });
  }
}

// تبديل اللغة
function toggleLanguage() {
  const isEnglish = document.documentElement.lang === 'en';
  
  if (isEnglish) {
    // التبديل إلى العربية
    document.documentElement.lang = 'ar';
    document.documentElement.dir = 'rtl';
    document.getElementById('language-toggle').textContent = 'En';
    
    // تحديث النصوص
    updateTexts('ar');
  } else {
    // التبديل إلى الإنجليزية
    document.documentElement.lang = 'en';
    document.documentElement.dir = 'ltr';
    document.getElementById('language-toggle').textContent = 'Ar';
    
    // تحديث النصوص
    updateTexts('en');
  }
  
  // إعادة تهيئة تأثير الكتابة
  initTypingEffect();
}

// تحديث النصوص بناءً على اللغة
function updateTexts(language) {
  const texts = {
    ar: {
      greeting: "مرحباً، اسمي هو",
      name: "البراء",
      games: "ألعابي",
      skills: "اللغات والتقنيات",
      projects: "مشاريعي المدرسية",
      certificates: "شهاداتي",
      cv: "السيرة الذاتية",
      favorites: "أشياءي المفضلة",
      color: "اللون المفضل",
      game: "اللعبة المفضلة",
      contact: "تواصل معي",
      browse: "استعرض مشاريعي",
      connect: "تواصل معي"
    },
    en: {
      greeting: "Hello, My Name Is",
      name: "ALBARAA",
      games: "My Games",
      skills: "Learned Languages",
      projects: "My School Projects",
      certificates: "My Certificates",
      cv: "CV",
      favorites: "Favorite Things",
      color: "Favorite Color",
      game: "Favorite Game",
      contact: "Contact Me",
      browse: "Browse My Projects",
      connect: "Connect With Me"
    }
  };
  
  // تحديث النصوص
  document.getElementById('greeting').textContent = texts[language].greeting;
  document.getElementById('name').textContent = texts[language].name;
  document.getElementById('games-title').textContent = texts[language].games;
  document.getElementById('skills-title').textContent = texts[language].skills;
  document.getElementById('projects-title').textContent = texts[language].projects;
  document.getElementById('certificates-title').textContent = texts[language].certificates;
  document.getElementById('cv-title').textContent = texts[language].cv;
  document.getElementById('favorites-title').textContent = texts[language].favorites;
  document.getElementById('color-title').textContent = texts[language].color;
  document.getElementById('game-title').textContent = texts[language].game;
  
  // تحديث أزرار القسم الرئيسي
  const heroButtons = document.querySelectorAll('.hero-buttons .btn');
  if (heroButtons.length >= 2) {
    heroButtons[0].textContent = texts[language].browse;
    heroButtons[1].textContent = texts[language].connect;
  }
}