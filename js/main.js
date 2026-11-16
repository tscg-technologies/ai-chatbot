/* ==========================================================================
   AI CHATBOT DEVELOPMENT COMPANY — VANILLA JAVASCRIPT
   Frontend-only UI Interactions, Rule-Based Demo Chatbot & Form Validation
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileNav();
  initScrollReveal();
  initBackToTop();
  initFaqAccordion();
  initDemoChatbot();
  initContactForm();
});

/* --------------------------------------------------------------------------
   1. Sticky Header & Scroll State
   -------------------------------------------------------------------------- */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 24) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* --------------------------------------------------------------------------
   2. Mobile Hamburger Navigation
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    toggleBtn.setAttribute('aria-expanded', String(isOpen));
  });

  // Close mobile menu when clicking a link
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

/* --------------------------------------------------------------------------
   3. Scroll Reveal Animations
   -------------------------------------------------------------------------- */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  if (!('IntersectionObserver' in window)) {
    elements.forEach(el => el.classList.add('revealed'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  elements.forEach(el => observer.observe(el));
}

/* --------------------------------------------------------------------------
   4. Back-to-Top Button
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 420) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* --------------------------------------------------------------------------
   5. FAQ Accordion
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');
    if (!trigger || !content) return;

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close other items
      faqItems.forEach(other => {
        other.classList.remove('open');
        const otherContent = other.querySelector('.faq-content');
        const otherTrigger = other.querySelector('.faq-trigger');
        if (otherContent) otherContent.style.maxHeight = null;
        if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item.classList.add('open');
        content.style.maxHeight = content.scrollHeight + 'px';
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   6. Interactive Rule-Based Chatbot Demo (demo.html)
      IMPORTANT: Frontend-only simulation. No LLM API, no external backend.
   -------------------------------------------------------------------------- */
function initDemoChatbot() {
  const messagesContainer = document.getElementById('chatMessages');
  const chatInput = document.getElementById('chatUserInput');
  const sendBtn = document.getElementById('chatSendBtn');
  const clearBtn = document.getElementById('clearChatBtn');
  const suggestedButtons = document.querySelectorAll('[data-suggested-question]');

  if (!messagesContainer || !chatInput || !sendBtn) return;

  let isTyping = false;

  const welcomeMessageHTML = `
    <p>Hello! Welcome to the <strong>AI Chatbot Development Company</strong> interactive frontend demonstration.</p>
    <p>Ask a question below or click any suggested topic to see how a structured business chatbot can respond to customer enquiries, qualify leads, or guide users.</p>
  `;

  // Predefined Rule-Based Knowledge Responses
  const knowledgeRules = [
    {
      matchExact: 'what services do you offer?',
      keywords: ['service', 'offer', 'develop', 'what do you do', 'build'],
      reply: `
        <p>We specialize in six core <strong>AI Chatbot Development Services</strong>:</p>
        <p>1. <strong>Website AI Chatbots</strong> (visitor assistance &amp; FAQ automation)<br>
        2. <strong>WhatsApp Chatbots</strong> (conversational flows for WhatsApp Business)<br>
        3. <strong>Customer Support Chatbots</strong> (support routing &amp; issue classification)<br>
        4. <strong>Lead Generation Chatbots</strong> (requirement capture &amp; qualification)<br>
        5. <strong>AI Voice Chatbots</strong> (voice-based enquiry handling)<br>
        6. <strong>Custom AI Chatbots</strong> (internal knowledge &amp; custom workflows)</p>
      `,
      showCta: true
    },
    {
      matchExact: 'how can a chatbot help my business?',
      keywords: ['help my business', 'benefit', 'why chatbot', 'value', 'advantage', 'how can a chatbot'],
      reply: `
        <p>An intelligent business chatbot helps streamline daily customer and internal conversations by:</p>
        <p>• Providing <strong>faster responses</strong> to routine questions around the clock.<br>
        • Delivering <strong>consistent business information</strong> from approved documentation.<br>
        • Running <strong>automated enquiry collection</strong> to structure visitor requirements.<br>
        • Supporting <strong>smooth human handoff</strong> when complex enquiries need a live specialist.</p>
      `,
      showCta: true
    },
    {
      matchExact: 'can you build a whatsapp chatbot?',
      keywords: ['whatsapp', 'wa', 'messaging', 'mobile chat'],
      reply: `
        <p>Yes! We design and develop <strong>WhatsApp Chatbots</strong> tailored for business conversations and customer enquiries.</p>
        <p>Typical capabilities include automated greeting flows, product and service information lookup, interactive lead qualification questions, and structured escalation to a human support or sales agent.</p>
      `,
      showCta: true
    },
    {
      matchExact: 'can a chatbot collect leads?',
      keywords: ['lead', 'sales', 'qualify', 'capture', 'enquiry', 'contact details'],
      reply: `
        <p>Absolutely. Our <strong>AI Lead Generation Chatbots</strong> proactively engage website visitors, ask structured qualification questions, understand their project or service requirements, and collect contact details for your sales team.</p>
        <p>Instead of a static form, visitors experience a guided, conversational flow.</p>
      `,
      showCta: true
    },
    {
      matchExact: 'can i request a custom chatbot?',
      keywords: ['custom', 'bespoke', 'workflow', 'internal', 'knowledge', 'document', 'request', 'project', 'quote', 'price', 'cost'],
      reply: `
        <p>Yes — we build <strong>Custom AI Chatbots</strong> designed around your specific business workflows, approved knowledge base, or internal operations.</p>
        <p>You can share your preferred platform and project requirements using our demonstration enquiry form to start a project discussion.</p>
      `,
      showCta: true
    },
    {
      matchExact: 'appointment',
      keywords: ['book', 'appointment', 'schedule', 'calendar', 'meeting'],
      reply: `
        <p>Our <strong>Appointment &amp; Booking Assistance</strong> flows can ask visitors for their preferred dates, collect service requirements, and request human confirmation from your scheduling desk.</p>
        <p><em>Note: In this static frontend demonstration, no actual bookings are recorded.</em></p>
      `,
      showCta: true
    },
    {
      matchExact: 'human',
      keywords: ['human', 'agent', 'person', 'escalate', 'handoff', 'support staff'],
      reply: `
        <p>Every chatbot we design includes clear <strong>human escalation options</strong>. Whenever a question falls outside approved business information or requires personal consultation, the conversation is summarized and routed to your team.</p>
      `,
      showCta: true
    }
  ];

  const fallbackReply = `
    <p>Thank you for your message! Because this is an <strong>interactive frontend demonstration</strong> using predefined rule-based responses (not a live AI model), I didn't recognize that specific question.</p>
    <p>Try asking about our <strong>services</strong>, <strong>WhatsApp chatbots</strong>, <strong>lead generation</strong>, <strong>business benefits</strong>, or click below to request a project discussion.</p>
  `;

  function appendMessage(htmlContent, sender = 'bot', includeProjectAction = false) {
    const row = document.createElement('div');
    row.className = `msg-row ${sender}`;

    const avatar = document.createElement('div');
    avatar.className = 'msg-avatar';
    avatar.textContent = sender === 'bot' ? 'AI' : 'YOU';

    const bubble = document.createElement('div');
    bubble.className = 'msg-bubble';
    bubble.innerHTML = htmlContent;

    if (sender === 'bot' && includeProjectAction) {
      const actionLink = document.createElement('a');
      actionLink.href = 'contact.html';
      actionLink.className = 'msg-action-link';
      actionLink.innerHTML = `Request a Project Discussion &rarr;`;
      bubble.appendChild(actionLink);
    }

    row.appendChild(avatar);
    row.appendChild(bubble);
    messagesContainer.appendChild(row);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  function showTypingIndicator() {
    const row = document.createElement('div');
    row.className = 'msg-row bot';
    row.id = 'activeTypingRow';

    const avatar = document.createElement('div');
    avatar.className = 'msg-avatar';
    avatar.textContent = 'AI';

    const indicator = document.createElement('div');
    indicator.className = 'typing-bubble';
    indicator.setAttribute('aria-label', 'Chatbot is typing');
    indicator.innerHTML = `
      <span class="typing-dot"></span>
      <span class="typing-dot"></span>
      <span class="typing-dot"></span>
    `;

    row.appendChild(avatar);
    row.appendChild(indicator);
    messagesContainer.appendChild(row);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  function removeTypingIndicator() {
    const existing = document.getElementById('activeTypingRow');
    if (existing) existing.remove();
  }

  function findResponse(rawInput) {
    const cleaned = rawInput.trim().toLowerCase();

    // 1. Check exact suggested question match first
    for (const rule of knowledgeRules) {
      if (cleaned === rule.matchExact) {
        return { reply: rule.reply, showCta: rule.showCta };
      }
    }

    // 2. Check keyword inclusion
    for (const rule of knowledgeRules) {
      if (rule.keywords.some(kw => cleaned.includes(kw))) {
        return { reply: rule.reply, showCta: rule.showCta };
      }
    }

    // 3. Fallback
    return { reply: fallbackReply, showCta: true };
  }

  function handleUserMessage(text) {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;

    // Escape user HTML safely
    const safeUserText = trimmed
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    appendMessage(`<p>${safeUserText}</p>`, 'user', false);
    chatInput.value = '';
    isTyping = true;
    showTypingIndicator();

    const responseObj = findResponse(trimmed);

    setTimeout(() => {
      removeTypingIndicator();
      appendMessage(responseObj.reply, 'bot', responseObj.showCta);
      isTyping = false;
    }, 650);
  }

  // Send button click
  sendBtn.addEventListener('click', () => {
    handleUserMessage(chatInput.value);
  });

  // Enter key submission
  chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleUserMessage(chatInput.value);
    }
  });

  // Suggested question buttons
  suggestedButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const question = btn.getAttribute('data-suggested-question');
      if (question) {
        handleUserMessage(question);
      }
    });
  });

  // Clear conversation button
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      isTyping = false;
      messagesContainer.innerHTML = '';
      appendMessage(welcomeMessageHTML, 'bot', true);
    });
  }
}

/* --------------------------------------------------------------------------
   7. Contact & Project Enquiry Form Validation (contact.html)
      IMPORTANT: Frontend-only validation. Does not transmit or store data.
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('projectEnquiryForm');
  const successBanner = document.getElementById('formSuccessBanner');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    const requiredFields = [
      { id: 'fullName', validate: val => val.trim().length >= 2 },
      { id: 'emailAddress', validate: val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim()) },
      { id: 'phoneNumber', validate: val => /^[0-9+\-\s()]{7,18}$/.test(val.trim()) },
      { id: 'companyName', validate: val => val.trim().length >= 2 },
      { id: 'chatbotType', validate: val => val.trim() !== '' },
      { id: 'preferredPlatform', validate: val => val.trim() !== '' },
      { id: 'projectRequirements', validate: val => val.trim().length >= 10 }
    ];

    requiredFields.forEach(fieldInfo => {
      const input = document.getElementById(fieldInfo.id);
      if (!input) return;
      const group = input.closest('.form-group');
      const ok = fieldInfo.validate(input.value);

      if (!ok) {
        isValid = false;
        input.classList.add('invalid');
        if (group) group.classList.add('has-error');
      } else {
        input.classList.remove('invalid');
        if (group) group.classList.remove('has-error');
      }
    });

    if (isValid && successBanner) {
      const submittedType = document.getElementById('chatbotType')?.value || 'AI Chatbot';
      const submittedPlatform = document.getElementById('preferredPlatform')?.value || 'Digital Platform';
      const summaryEl = document.getElementById('demoSubmissionSummary');
      if (summaryEl) {
        summaryEl.textContent = `Selected Configuration: ${submittedType} for ${submittedPlatform}.`;
      }
      successBanner.classList.add('visible');
      form.reset();
      successBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });

  // Live clear error on input
  form.querySelectorAll('.form-control').forEach(control => {
    control.addEventListener('input', () => {
      control.classList.remove('invalid');
      const group = control.closest('.form-group');
      if (group) group.classList.remove('has-error');
    });
  });
}
