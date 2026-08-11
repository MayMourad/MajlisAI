/* =========================================================
   Majlis AI — Site script
   - EN/AR translation + RTL toggle (persisted in localStorage)
   - Scroll-triggered reveal animations (IntersectionObserver)
   - Sample input copy-to-clipboard
   - Mobile nav toggle
   Non-developers: all visible copy lives in the TRANSLATIONS
   object below. Edit the "en" / "ar" strings to change text.
   ========================================================= */

(function () {
  "use strict";

  var TRANSLATIONS = {
    "nav.problem":   { en: "The Problem",     ar: "التحدي" },
    "nav.solution":  { en: "Our Solution",    ar: "الحل" },
    "nav.how":       { en: "How It Works",    ar: "كيف يعمل" },
    "nav.demo":      { en: "Live Demo",       ar: "التجربة الحية" },
    "nav.learned":   { en: "What We Learned", ar: "ماذا تعلمنا" },
    "nav.yof":       { en: "Year of Family",  ar: "عام الأسرة" },

    "hero.eyebrow": {
      en: "Sandooq Al Watan · Agentic AI Summer Program 2026 · Year of Family",
      ar: "صندوق الوطن · برنامج الذكاء الاصطناعي الوكيل الصيفي 2026 · عام الأسرة"
    },
    "hero.subtitle": {
      en: "Strengthening UAE Families Through Intelligent Coordination",
      ar: "تعزيز الروابط الأسرية الإماراتية من خلال التنسيق الذكي"
    },
    "hero.cta": { en: "Try the Live Demo", ar: "جرّب التجربة الحية" },

    "pitch.text": {
      en: "Our agent helps UAE families plan gatherings and visits by turning an Arabic or English request into a clear action plan with assigned tasks, translated instructions, timing alerts, and a meaningful family-connection prompt.",
      ar: "يساعد وكيلنا الأسر الإماراتية على تنظيم التجمعات والزيارات من خلال تحويل طلب باللغة العربية أو الإنجليزية إلى خطة عمل واضحة تتضمن مهامًا موزعة، وتعليمات مترجمة، وتنبيهات بالتوقيت، وفكرة هادفة لتعزيز الترابط الأسري."
    },

    "problem.lead": {
      en: "Parents spend too much time managing family logistics and too little time creating meaningful moments together.",
      ar: "يقضي الآباء والأمهات وقتًا طويلاً في تنظيم لوجستيات العائلة ووقتًا قليلاً جدًا في خلق لحظات هادفة معًا."
    },
    "problem.card1.title": { en: "The Thursday Evening Chaos", ar: "فوضى مساء الخميس" },
    "problem.card1.body": {
      en: "A mother in Al Dhafra is trying to organize Friday lunch at Grandma's house.",
      ar: "أم في منطقة الظفرة تحاول تنظيم غداء يوم الجمعة في منزل الجدة."
    },
    "problem.card2.title": { en: "Overlapping Moving Parts", ar: "تفاصيل متشابكة" },
    "problem.card2.body": {
      en: "Dad is working late, the teenage son finishes football practice at 12:30 PM, the household driver needs translated directions, and Grandma doesn't use WhatsApp and needs a direct phone call.",
      ar: "الأب يعمل حتى وقت متأخر، والابن المراهق ينهي تدريب كرة القدم في الساعة 12:30 ظهرًا، ويحتاج سائق المنزل إلى اتجاهات مترجمة، والجدة لا تستخدم واتساب وتحتاج إلى مكالمة هاتفية مباشرة."
    },
    "problem.card3.title": { en: "Cultural Friction", ar: "الفجوة الثقافية" },
    "problem.card3.body": {
      en: "What should be a warm, unifying weekend tradition becomes an exhausting web of missed messages, constant coordination, and household stress.",
      ar: "ما كان يجب أن يكون تقليدًا أسبوعيًا دافئًا وموحّدًا للعائلة، يتحول إلى شبكة مرهقة من الرسائل الفائتة، والتنسيق المستمر، وضغط الحياة المنزلية."
    },

    "solution.eyebrow": { en: "Our Solution", ar: "حلّنا" },
    "solution.testLabel": { en: "The Grandparent Test", ar: "اختبار الجدة" },
    "solution.testQuote": {
      en: "“If your grandmother could read the plan and immediately understand exactly what she needs to do — that's the Grandparent Test. Majlis AI writes for clarity first, technology second.”",
      ar: "“إذا استطاعت جدتك قراءة الخطة وفهمت فورًا بالضبط ما يتوجب عليها فعله — فهذا هو 'اختبار الجدة'. مجلس AI يكتب من أجل الوضوح أولاً، والتقنية ثانيًا.”"
    },

    "how.title": { en: "How It Works", ar: "كيف يعمل" },
    "how.subtitle": {
      en: "From a single family message to a complete, saved action plan — in under 15 seconds.",
      ar: "من رسالة عائلية واحدة إلى خطة عمل كاملة ومحفوظة — في أقل من 15 ثانية."
    },
    "how.step1.title": { en: "Trigger", ar: "الانطلاق" },
    "how.step1.body": {
      en: "A family member submits a coordination request through a simple Google Form — in Arabic or English.",
      ar: "يقوم أحد أفراد العائلة بإرسال طلب التنسيق عبر نموذج Google بسيط — باللغة العربية أو الإنجليزية."
    },
    "how.step2.title": { en: "AI Processing", ar: "المعالجة الذكية" },
    "how.step2.body": {
      en: "Google Apps Script sends the request to the Gemini API, which reasons over it using the Majlis AI system instruction.",
      ar: "يرسل Google Apps Script الطلب إلى واجهة Gemini API، التي تحلله باستخدام تعليمات نظام مجلس AI."
    },
    "how.step3.title": { en: "Output", ar: "الناتج" },
    "how.step3.body": {
      en: "The agent generates an organized bilingual event summary, task distribution, translated helper notes, and a family conversation prompt.",
      ar: "يُنشئ الوكيل ملخصًا ثنائي اللغة ومنظمًا للفعالية، وتوزيعًا للمهام، وملاحظات مساعدة مترجمة، وفكرة لحوار عائلي هادف."
    },
    "how.step4.title": { en: "Storage", ar: "الحفظ" },
    "how.step4.body": {
      en: "The complete plan logs automatically to the family Google Sheet in 10–13 seconds.",
      ar: "تُسجَّل الخطة الكاملة تلقائيًا في جدول بيانات Google الخاص بالعائلة خلال 10–13 ثانية."
    },

    "demo.eyebrow": { en: "The Functional Core", ar: "الجوهر الوظيفي" },
    "demo.title": { en: "Live Demo", ar: "التجربة الحية" },
    "demo.instructions": {
      en: "Submit a real family coordination request below. It's processed by our live Gemini-powered agent and instantly organized into a bilingual action plan. Responses currently land in the team's Google Sheet — this website doesn't read them back, but the form below is the live agent itself.",
      ar: "أرسل طلب تنسيق عائلي حقيقي أدناه. تتم معالجته بواسطة وكيلنا الحي المدعوم بـ Gemini، ويُنظَّم فورًا في خطة عمل ثنائية اللغة. تصل الردود حاليًا إلى جدول بيانات Google الخاص بالفريق — هذا الموقع لا يعرض الردود، لكن النموذج أدناه هو الوكيل الحي بذاته."
    },
    "demo.sampleLabel": { en: "Try a sample input", ar: "جرّب مثالاً" },
    "demo.copyBtn": { en: "Copy", ar: "نسخ" },
    "demo.sampleEn": {
      en: "Our family is planning a Friday lunch at my grandmother's house. My father will arrive after work, my younger brother finishes football at 12:30 PM, our driver needs directions, my grandmother prefers phone calls rather than messages, and we want to bring dessert. Please organize everything.",
      ar: "عائلتنا تخطط لغداء يوم الجمعة في منزل جدتي. سيصل والدي بعد العمل، وينهي أخي الأصغر تدريب كرة القدم في الساعة 12:30 ظهرًا، ويحتاج السائق إلى الاتجاهات، وتفضل جدتي المكالمات الهاتفية بدلاً من الرسائل، ونريد إحضار الحلوى. يرجى تنظيم كل شيء."
    },

    "learned.title": { en: "What We Learned", ar: "ماذا تعلمنا" },
    "learned.card1.title": { en: "What Broke", ar: "ما الذي تعطّل" },
    "learned.card1.body": {
      en: "Arabic inputs occasionally produced responses in English, and the model hallucinated unprovided details (such as inventing exact arrival times and specific directions).",
      ar: "أدت بعض المدخلات باللغة العربية أحيانًا إلى ردود باللغة الإنجليزية، كما كان النموذج يتخيّل أحيانًا تفاصيل غير مُقدَّمة (مثل اختلاق أوقات وصول دقيقة أو اتجاهات محددة)."
    },
    "learned.card2.title": { en: "How We Fixed It", ar: "كيف أصلحناها" },
    "learned.card2.body": {
      en: "Updated System Instruction v2 to strictly enforce 100% output language matching and explicitly list unprovided details under a \"Conflicts or Missing Information\" section rather than guessing.",
      ar: "تم تحديث تعليمات النظام إلى النسخة v2 لفرض تطابق صارم بنسبة 100% بين لغة الطلب ولغة الرد، وإدراج أي تفاصيل غير مُقدَّمة صراحةً ضمن قسم \"التعارضات أو المعلومات الناقصة\" بدلاً من التخمين."
    },
    "learned.card3.title": { en: "What We'd Do Next", ar: "الخطوة التالية" },
    "learned.card3.body": {
      en: "Build direct WhatsApp API integration to send automated task assignments and driver directions directly to family members' phones.",
      ar: "بناء تكامل مباشر مع واجهة WhatsApp API لإرسال المهام الموزعة تلقائيًا واتجاهات السائق مباشرة إلى هواتف أفراد العائلة."
    },

    "yof.title": { en: "Year of Family 2026", ar: "عام الأسرة 2026" },
    "yof.roots": { en: "Roots — Heritage & History", ar: "الجذور — التراث والتاريخ" },
    "yof.bonds": { en: "Bonds — Family Connection", ar: "الروابط — الترابط الأسري" },
    "yof.branches": { en: "Branches — Future Generations", ar: "الأغصان — الأجيال القادمة" },
    "yof.closing": {
      en: "By automating event logistics and transport directions, Majlis AI removes household planning stress so families across Al Dhafra and the UAE can spend their time sharing meals, honoring traditions, and strengthening intergenerational bonds.",
      ar: "من خلال أتمتة لوجستيات الفعاليات وتوجيهات النقل، يزيل مجلس AI ضغط التخطيط المنزلي لتتمكن العائلات في منطقة الظفرة وعموم الإمارات من قضاء وقتها في مشاركة الوجبات، وصون التقاليد، وتعزيز الروابط بين الأجيال."
    },

    "footer.tagline": { en: "Al Dhafra, Abu Dhabi", ar: "الظفرة، أبوظبي" },
    "footer.creditsTitle": { en: "Team", ar: "الفريق" },
    "footer.role.lead": { en: "Team Lead & Developer", ar: "قائدة الفريق والمطوّرة" },
    "footer.role.prompt": { en: "Prompt Designer", ar: "مصممة الأوامر" },
    "footer.role.knowledge": { en: "Knowledge Curator", ar: "أمينة المحتوى المعرفي" },
    "footer.role.tester": { en: "Tester & Pitch Designer", ar: "المختبِرة ومصممة العرض التقديمي" },
    "footer.role.mentor": { en: "Mentor", ar: "المرشدة" },
    "footer.attribution": {
      en: "Built for the Sandooq Al Watan Agentic AI Summer Program 2026 · Proudly part of the UAE's Year of Family.",
      ar: "بُني ضمن برنامج صندوق الوطن للذكاء الاصطناعي الوكيل الصيفي 2026 · بكل فخر ضمن فعاليات عام الأسرة الإماراتي."
    }
  };

  var LANG_KEY = "majlis-ai-lang";

  function getStoredLang() {
    try { return localStorage.getItem(LANG_KEY); } catch (e) { return null; }
  }
  function storeLang(lang) {
    try { localStorage.setItem(LANG_KEY, lang); } catch (e) { /* ignore */ }
  }

  function applyLanguage(lang) {
    var html = document.documentElement;
    html.setAttribute("lang", lang);
    html.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      var entry = TRANSLATIONS[key];
      if (entry && entry[lang]) {
        el.innerHTML = entry[lang];
      }
    });

    var toggle = document.getElementById("langToggle");
    if (toggle) {
      toggle.setAttribute(
        "aria-label",
        lang === "ar" ? "Switch to English" : "التبديل إلى العربية"
      );
    }
  }

  function initLanguage() {
    var stored = getStoredLang();
    var lang = stored === "ar" || stored === "en" ? stored : "en";
    applyLanguage(lang);

    var toggle = document.getElementById("langToggle");
    if (toggle) {
      toggle.addEventListener("click", function () {
        var current = document.documentElement.getAttribute("lang") || "en";
        var next = current === "ar" ? "en" : "ar";
        applyLanguage(next);
        storeLang(next);
      });
    }
  }

  function initMobileNav() {
    var burger = document.getElementById("navBurger");
    var links = document.getElementById("navLinks");
    if (!burger || !links) return;

    burger.addEventListener("click", function () {
      var isOpen = links.classList.toggle("open");
      burger.setAttribute("aria-expanded", String(isOpen));
    });

    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
      });
    });
  }

  function initScrollReveal() {
    var targets = document.querySelectorAll("[data-animate]");
    var arrows = document.querySelectorAll(".pipeline-arrow");
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      targets.forEach(function (el) { el.classList.add("in-view"); });
      arrows.forEach(function (el) { el.classList.add("in-view"); });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -60px 0px" }
    );

    targets.forEach(function (el) { observer.observe(el); });

    var arrowObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            arrowObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    arrows.forEach(function (el) { arrowObserver.observe(el); });
  }

  function initCopySample() {
    var btn = document.getElementById("copySampleBtn");
    var toast = document.getElementById("copyToast");
    if (!btn) return;

    btn.addEventListener("click", function () {
      var lang = document.documentElement.getAttribute("lang") || "en";
      var text = TRANSLATIONS["demo.sampleEn"][lang];

      function showToast(message) {
        if (!toast) return;
        toast.textContent = message;
        toast.classList.add("show");
        setTimeout(function () { toast.classList.remove("show"); }, 2200);
      }

      var successMsg = lang === "ar" ? "تم النسخ!" : "Copied!";
      var failMsg = lang === "ar" ? "تعذر النسخ" : "Copy failed";

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(
          function () { showToast(successMsg); },
          function () { showToast(failMsg); }
        );
      } else {
        var ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        try {
          document.execCommand("copy");
          showToast(successMsg);
        } catch (e) {
          showToast(failMsg);
        }
        document.body.removeChild(ta);
      }
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initLanguage();
    initMobileNav();
    initScrollReveal();
    initCopySample();
  });
})();
