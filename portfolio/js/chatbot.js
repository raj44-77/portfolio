/* ============ AI CHATBOT — Kumar Raj ============ */
(function () {
  // Knowledge base
  const knowledgeBase = {
    greeting: {
      keywords: ["hi", "hello", "hey", "namaste", "namaskar", "hola"],
      response: "Namaste! 🙏 Main Kumar Raj ka AI assistant hoon. Aap mujhse inke baare mein kuch bhi pooch sakte hain — skills, projects, pricing, college, contact — sab kuch! Kya jaanna chahenge?"
    },
    who: {
      keywords: ["who are you", "about you", "about kumar", "tum kaun", "aap kaun", "kumar raj kon", "yourself", "introduce"],
      response: "Main Kumar Raj hoon — ek Full Stack & SaaS Developer from Bhagalpur, Bihar. Main businesses ke liye modern websites, SaaS platforms aur AI-powered solutions build karta hoon. 4+ years ka experience hai aur 30+ projects ship kar chuka hoon."
    },
    college: {
      keywords: ["college", "university", "education", "study", "degree", "btech", "b.tech", "institute", "kcc", "qualification"],
      response: "🎓 Maine apni B.Tech in Computer Science & Engineering (AI & ML specialization) KCC Institute of Technology & Management, Greater Noida se 2022-2026 mein complete ki hai. First Division ke saath pass out hua hoon."
    },
    subjects: {
      keywords: ["subjects", "courses", "syllabus", "padhai", "subjects kya"],
      response: "📚 Meri core subjects the: Artificial Intelligence, Machine Learning, Deep Learning, Data Structures, DBMS, Cloud Computing, Python, Java, Operating Systems, Computer Networks, Software Engineering, IoT, aur Cyber Security."
    },
    skills: {
      keywords: ["skills", "technologies", "tech stack", "stack", "kya aata", "expertise", "tools", "languages"],
      response: "⚡ Meri core skills:\n\n• Python Backend: FastAPI, Flask\n• Data Science: Pandas, NumPy, Matplotlib\n• Database: MySQL, Redis\n• Frontend: JavaScript, HTML, CSS\n• DevOps: Docker, CI/CD, Cloud\n• AI/ML: LLMs, Machine Learning, Deep Learning, NLP"
    },
    projects: {
      keywords: ["projects", "work", "portfolio", "built", "banaya", "kaam", "creations"],
      response: "🚀 Maine 3 major projects build kiye hain:\n\n1. Apna Bhagalpur — Local discovery platform\n2. Bhagalpur Stays — Hotel booking system\n3. Yatra Planner — Travel planning app\n\nSab live hain — aap 'Featured Work' section mein dekh sakte hain!"
    },
    services: {
      keywords: ["services", "offer", "provide", "kya karte", "what do you do", "suvidha"],
      response: "💼 Main yeh services provide karta hoon:\n\n• Business Websites\n• E-commerce Websites\n• Custom Web Applications\n• Scalable SaaS Platforms\n• API Development\n• AI-Powered Solutions\n• Cloud & DevOps\n• Product Consulting"
    },
    pricing: {
      keywords: ["pricing", "price", "cost", "rate", "charge", "kitna", "paise", "fees", "amount"],
      response: "💰 Meri pricing bahut affordable hai:\n\n• Starter (1-3 pages): ₹1,499\n• Business (up to 10 pages): ₹2,999\n• Custom SaaS: ₹9,999+ starting\n\nDomain aur hosting separate hote hain. Free hosting guide main provide karta hoon!"
    },
    contact: {
      keywords: ["contact", "reach", "whatsapp", "email", "phone", "number", "call", "connect", "baat"],
      response: "📞 Aap mujhse directly connect kar sakte hain:\n\n• WhatsApp: +91 7061660668\n• Email: rajkr2240@gmail.com\n• LinkedIn: linkedin.com/in/kumar-raj-49589a275\n\nMain 24 hours ke andar reply karta hoon!"
    },
    location: {
      keywords: ["location", "where", "city", "bihar", "bhagalpur", "based", "kahan", "rehte", "address"],
      response: "📍 Main Bhagalpur, Bihar se hoon. Local businesses ke liye kaam karta hoon — Hindi/English dono mein baat kar sakte hain. Agar aap Bhagalpur ya nearby area se hain, toh hum mil bhi sakte hain!"
    },
    experience: {
      keywords: ["experience", "years", "journey", "background", "career", "history"],
      response: "📈 Mera journey:\n\n• 2023-24: AI & ML Engineer projects\n• 2024-25: Full Stack Developer (Freelance)\n• 2025-Present: Founder, Independent SaaS Studio\n\n30+ projects shipped, 4+ years building."
    },
    process: {
      keywords: ["process", "how do you work", "workflow", "kaise kaam", "method", "approach"],
      response: "🔧 Mera workflow simple hai:\n\n1. Discussion — aapki requirement samajhta hoon\n2. Planning — design aur architecture decide\n3. Development — code karta hoon\n4. Testing — quality check\n5. Deployment — site live karta hoon\n6. Support — baad mein bhi help available"
    },
    local: {
      keywords: ["local", "bhagalpur business", "bihar business", "nearby", "apna sheher"],
      response: "🏘️ Main especially Bhagalpur aur Bihar ke local businesses ke liye websites banata hoon — kirana store, hotel, clinic, parlor, restaurant, coaching — sab ke liye affordable prices mein. Chhota business, badi shuruwat!"
    },
    why: {
      keywords: ["why choose", "why you", "kyun", "difference", "special"],
      response: "⭐ Kyunki main local hoon aur aapki problem samajhta hoon:\n\n• Affordable pricing\n• Hindi/English communication\n• Kabhi bhi mil sakte hain\n• Pehle kaam, phir payment\n• Post-delivery support\n• Fast delivery (3-10 days)"
    },
    fallback: {
      keywords: [],
      response: "Maaf kijiye, main yeh sawaal samajh nahi paya. 🤔\n\nAap WhatsApp pe directly pooch sakte hain: +91 7061660668\n\nYa try karein: 'skills', 'projects', 'pricing', 'contact', 'college'"
    },
        business: {
      keywords: ["business improve", "improve business", "business kaise", "grow business", "business badhao", "online business", "apna business", "business ko", "improve kar", "growth", "expand business", "business growth"],
      response: "📈 Aap apne business ko online laakar bahut improve kar sakte hain! \n\nYeh rahe kuch ways:\n\n1️⃣ Professional Website — Trust build hoti hai, log aapko serious leta hai\n\n2️⃣ Google Maps — Local customers aapko easily dhundh sakte hain\n\n3️⃣ WhatsApp Integration — Customers direct baat kar sakte hain\n\n4️⃣ SEO — Google mein aapka business upar aata hai\n\n5️⃣ Social Media — Instagram/Facebook se naye customers\n\n6️⃣ Online Booking — Hotels/clinics ke liye 24/7 booking\n\n7️⃣ Reviews & Ratings — Achhe reviews naye customers laate hain\n\n8️⃣ Analytics — Customer behavior samajh kar business improve hota hai\n\nMain in sab mein aapki help kar sakta hoon — affordable prices mein! 💪\n\nWhatsApp karein: +91 7061660668"
    },

  };

  // Create chatbot DOM
  const chatbotHTML = `
    <button class="chatbot-toggle" id="chatbotToggle" aria-label="Chat with Kumar Raj">
      <span class="pulse-ring"></span>
      💬
    </button>
    <div class="chatbot-window" id="chatbotWindow">
      <div class="chatbot-header">
        <div class="bot-avatar">🤖</div>
        <div class="bot-info">
          <div class="bot-name">Kumar Raj <span class="online-dot"></span></div>
          <div class="bot-status">AI Assistant — Ask me anything!</div>
        </div>
        <button class="close-btn" id="chatbotClose">✕</button>
      </div>
      <div class="chatbot-messages" id="chatbotMessages">
        <div class="msg bot">
          Namaste! 🙏 Main Kumar Raj ka AI assistant hoon.
          <span class="msg-time">Just now</span>
        </div>
      </div>
      <div class="chatbot-chips" id="chatbotChips">
        <button class="chip-btn" data-question="What are your skills?">⚡ Skills</button>
        <button class="chip-btn" data-question="Show me your projects">🚀 Projects</button>
        <button class="chip-btn" data-question="What is your pricing?">💰 Pricing</button>
        <button class="chip-btn" data-question="How can I contact you?">📞 Contact</button>
        <button class="chip-btn" data-question="How can I improve my business?">📈 Business Improve</button>
       
      </div>
      <div class="chatbot-input-area">
        <input type="text" class="chatbot-input" id="chatbotInput" placeholder="Apna sawaal likhein..." />
        <button class="chatbot-send" id="chatbotSend">➤</button>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', chatbotHTML);

  // Get elements
  const toggle = document.getElementById('chatbotToggle');
  const window = document.getElementById('chatbotWindow');
  const close = document.getElementById('chatbotClose');
  const messages = document.getElementById('chatbotMessages');
  const input = document.getElementById('chatbotInput');
  const send = document.getElementById('chatbotSend');
  const chips = document.querySelectorAll('.chip-btn');

  // Toggle chat
  toggle.addEventListener('click', () => {
    window.classList.toggle('open');
    if (window.classList.contains('open')) {
      input.focus();
    }
  });

  close.addEventListener('click', () => {
    window.classList.remove('open');
  });

  // Add message to chat
  function addMessage(text, type) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `msg ${type}`;
    msgDiv.textContent = text;
    messages.appendChild(msgDiv);
    messages.scrollTop = messages.scrollHeight;
    return msgDiv;
  }

  // Show typing indicator
  function showTyping() {
    const typing = document.createElement('div');
    typing.className = 'typing-indicator';
    typing.id = 'typingIndicator';
    typing.innerHTML = '<span></span><span></span><span></span>';
    messages.appendChild(typing);
    messages.scrollTop = messages.scrollHeight;
  }

  // Remove typing indicator
  function removeTyping() {
    const typing = document.getElementById('typingIndicator');
    if (typing) typing.remove();
  }

  // Get bot response based on user input
  function getBotResponse(userInput) {
    const inputLower = userInput.toLowerCase();

    for (const [key, value] of Object.entries(knowledgeBase)) {
      if (key === 'fallback') continue;
      for (const keyword of value.keywords) {
        if (inputLower.includes(keyword)) {
          return value.response;
        }
      }
    }
    return knowledgeBase.fallback.response;
  }

  // Handle sending message
  function sendMessage() {
    const userText = input.value.trim();
    if (!userText) return;

    addMessage(userText, 'user');
    input.value = '';

    showTyping();

    setTimeout(() => {
      removeTyping();
      const botResponse = getBotResponse(userText);
      addMessage(botResponse, 'bot');
    }, 800 + Math.random() * 500);
  }

  // Event listeners
  send.addEventListener('click', sendMessage);
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
  });

  // Chip buttons
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const question = chip.getAttribute('data-question');
      input.value = question;
      sendMessage();
    });
  });
})();