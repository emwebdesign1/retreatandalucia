const $  = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => [...r.querySelectorAll(s)];


const header = $(".header");
const elevate = () => header?.setAttribute("data-scrolled", window.scrollY > 8);
document.addEventListener("scroll", elevate); elevate();


const navToggle = $("#navToggle");
const navMenu = $("#navMenu");
if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const open = navMenu.getAttribute("aria-expanded") === "true";
    navMenu.setAttribute("aria-expanded", String(!open));
    navToggle.setAttribute("aria-expanded", String(!open));
  });
  $$("#navMenu a").forEach(a =>
    a.addEventListener("click", () => {
      navMenu.setAttribute("aria-expanded","false");
      navToggle.setAttribute("aria-expanded","false");
    })
  );
}

const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); }
  });
},{threshold:.16});
$$("[data-animate]").forEach(el=>io.observe(el));

(function(){
  const wrap = $("[data-carousel]");
  if(!wrap) return;
  const track = $(".carousel__track", wrap);
  const prev  = $(".carousel__btn.prev", wrap);
  const next  = $(".carousel__btn.next", wrap);
  prev.addEventListener("click", ()=> track.scrollBy({left:-window.innerWidth*0.6, behavior:"smooth"}));
  next.addEventListener("click", ()=> track.scrollBy({left: window.innerWidth*0.6, behavior:"smooth"}));

  // Drag to scroll
  let down=false, start=0, scroll=0;
  track.addEventListener("pointerdown",e=>{down=true;start=e.pageX;scroll=track.scrollLeft;track.setPointerCapture(e.pointerId);});
  track.addEventListener("pointermove",e=>{if(!down)return; track.scrollLeft = scroll - (e.pageX-start);});
  track.addEventListener("pointerup",()=> down=false);
})();

/* ========= Footer year ========= */
$("#year") && ($("#year").textContent = new Date().getFullYear());

/* ========= Form validation ========= */
const form = $("#contactForm");
if(form){
  const ok = $("#formOk");
  form.addEventListener("submit", (e)=>{
    e.preventDefault();
    let valid = true;
    $$("input[required], textarea[required]", form).forEach(inp=>{
      const error = inp.nextElementSibling;
      const hasValue = inp.value.trim().length>0;
      error && (error.style.display = hasValue ? "none" : "block");
      valid = valid && hasValue;
      if(inp.type==="email"){
        const good = /\S+@\S+\.\S+/.test(inp.value);
        error && (error.style.display = good ? "none":"block");
        valid = valid && good;
      }
    });
    if(valid){
      ok.hidden = false;
      form.reset();
      setTimeout(()=> ok.hidden = true, 4000);
    }
  });
}

/* ========= i18n dictionaries ========= */
const I18N = {
  fr: {
    nav:{services:"Services",about:"À propos",process:"Processus",destinations:"Destinations",testimonials:"Avis",faq:"FAQ",contact:"Contact"},
    hero:{
      title:"Acheter ou louer en Andalousie, sans stress.",
      subtitle:"Je m’occupe de tout : recherche de biens, visites, négociation et formalités administratives. Vous arrivez, vos clés vous attendent.",
      cta1:"Parler à un expert", cta2:"Voir les services",
      badge:"Accompagnement premium",
      badge1:"Visites vidéo en direct", badge2:"Réseau d’intermédiaires de confiance", badge3:"Dossiers & démarches simplifiés"
    },
    services:{
      title:"Ce que je fais pour vous",
      lead:"Un accompagnement clair, humain et transparent, de la première prise de contact jusqu’à l’installation.",
      s1:{title:"Recherche sur mesure", text:"Ciblage précis selon votre budget, votre style de vie et vos délais. Sélection courte, annonces triées, alertes privées."},
      s2:{title:"Visites & rapports", text:"Visites en votre présence ou à distance (visio HD), rapports complets, quartiers et commodités passés au peigne fin."},
      s3:{title:"Négociation & offre", text:"Conseils sur la stratégie d’offre, négociation auprès des agents/propriétaires, vérification des documents clés."},
      s4:{title:"Administratif & installation", text:"NIE, ouverture de compte, contrats eau/électricité/internet, assurance habitation, et check-in le jour J."}
    },
    about:{
      title:"Qui vous accompagne",
      badge:"Accompagnement humain",
      lead:"Antuanett Garibeh Louze met au service des familles son expertise académique et son sens du relationnel pour rendre votre installation simple et sereine.",
      stat1:{value:"PhD Histoire", label:"Parcours académique"},
      stat2:{value:"200+ familles", label:"Accompagnées avec succès"},
      stat3:{value:"8+ ans", label:"d’expérience terrain"},
      p1:"Docteure en histoire, Antuanett allie rigueur et empathie pour guider des clients internationaux à travers chaque étape — de la recherche du bien à l’intégration locale — avec une attention particulière aux démarches et au financement.",
      p2:"Sa connaissance du contexte andalou, son réseau (banques, juristes, agences) et sa proximité humaine garantissent un service complet et sensible aux différences culturelles, avec un focus marqué sur Sanlúcar de Barrameda et la région.",
      cta1:"Discuter de votre situation",
      cta2:"Voir la FAQ"
    },
    process:{
      title:"Un processus simple, en 5 étapes",
      p1:{title:"Découverte", text:"Appel gratuit pour clarifier vos besoins, budget et timing."},
      p2:{title:"Sélection", text:"Short-list de biens + agenda de visites (sur place / vidéo)."},
      p3:{title:"Évaluation", text:"Rapports, estimation des charges, risques et potentiel."},
      p4:{title:"Négociation", text:"Offre, contre-offres, et sécurisation du dossier."},
      p5:{title:"Installation", text:"Remise des clés, contrats, et suivi après installation."}
    },
    dest:{
      title:"Où j’opère",
      seville:"Historique, vivante et bien connectée. Idéale pour familles et télétravail.",
      malaga:"Soleil, plages et aéroport international. Marché dynamique toute l’année.",
      granada:"Charme andalou, montagnes proches, excellents rendements locatifs."
    },
    testi:{
      title:"Ils racontent leur expérience",
      t1:{text:"Tout a été fluide : visites en visio, offre acceptée en 10 jours, et les contrats déjà prêts à notre arrivée.", author:"Camille & Théo — Paris → Málaga"},
      t2:{text:"Démarches administratives simplifiées et conseils précieux sur le quartier. On recommande à 100%.", author:"Lucia — Genève → Sevilla"},
      t3:{text:"Super service pour un achat à distance. Honnêteté et réactivité, c’est rare !", author:"David — Bruxelles → Granada"}
    },
    faq:{
      title:"Questions fréquentes",
      q1:{title:"Travaillez-vous avec des agences ou des particuliers ?", text:"Avec les deux. Mon réseau d’intermédiaires permet d’accéder à des biens publiés et off-market."},
      q2:{title:"Quels sont vos honoraires ?", text:"Un forfait transparent selon la mission (location/achat) + options si besoin (installation, ameublement)."},
      q3:{title:"Pouvez-vous m’aider pour le NIE et un compte bancaire ?", text:"Oui, je coordonne les démarches et je vous accompagne si nécessaire."}
    },
    contact:{
      title:"Parlez-moi de votre projet",
      lead:"Dites-moi où vous en êtes et votre budget — je reviens vers vous sous 24h.",
      badge1:"Réponse sous 24h", badge2:"Rendez-vous visio offert", badge3:"Confidentialité"
    },
    form:{
      name:"Votre nom", email:"Votre e-mail", budget:"Votre projet",
      budgetRent:"Location — budget mensuel", budgetBuy:"Achat — budget total",
      message:"Votre message", send:"Envoyer", errRequired:"Champ requis",
      errEmail:"E-mail invalide", ok:"Merci ! Votre message est bien reçu."
    },
    footer:{privacy:"Confidentialité", terms:"Mentions légales"}
  },

  en: {
    nav:{services:"Services",about:"About",process:"Process",destinations:"Areas",testimonials:"Reviews",faq:"FAQ",contact:"Contact"},
    hero:{
      title:"Buy or rent in Andalusia, stress-free.",
      subtitle:"I handle everything: property search, viewings, negotiation and paperwork. You land, your keys are ready.",
      cta1:"Talk to an expert", cta2:"See services",
      badge:"Premium support",
      badge1:"Live video viewings", badge2:"Trusted local network", badge3:"Paperwork made easy"
    },
    services:{
      title:"What I do for you",
      lead:"Clear, human and transparent support, from first call to move-in.",
      s1:{title:"Tailored search", text:"Precise targeting by budget & lifestyle. Short-listed properties and private alerts."},
      s2:{title:"Viewings & reports", text:"On-site or remote HD tours, detailed reports and area checks."},
      s3:{title:"Negotiation & offer", text:"Offer strategy, negotiations, and document checks."},
      s4:{title:"Paperwork & move-in", text:"NIE, bank, utilities, insurance and smooth key handover."}
    },
    about:{
      title:"Meet your guide",
      badge:"Human-first guidance",
      lead:"Antuanett Garibeh Louze blends academic rigor with people skills to make relocation to Andalusia simple and reassuring.",
      stat1:{value:"PhD in History", label:"Academic background"},
      stat2:{value:"200+ families", label:"Successfully supported"},
      stat3:{value:"8+ years", label:"hands-on experience"},
      p1:"With a doctorate in history, Antuanett helps international clients navigate every step — from home search to local integration — with special care for paperwork and financing.",
      p2:"Her deep understanding of Andalusia, strong network (banks, lawyers, agencies) and warm approach ensure comprehensive, culturally aware support, with a special focus on Sanlúcar de Barrameda and the region.",
      cta1:"Discuss your case",
      cta2:"Read the FAQ"
    },
    process:{
      title:"A simple 5-step journey",
      p1:{title:"Discovery", text:"Free call to clarify goals, budget and timing."},
      p2:{title:"Selection", text:"Short-list + visit schedule (in person / video)."},
      p3:{title:"Assessment", text:"Reports, charges estimate, risks and potential."},
      p4:{title:"Negotiation", text:"Offers, counter-offers and securing the deal."},
      p5:{title:"Move-in", text:"Keys, contracts and after-care."}
    },
    dest:{
      title:"Where I operate",
      seville:"Historic, lively and well connected. Great for families and remote work.",
      malaga:"Sun, beaches and an international airport. Strong year-round market.",
      granada:"Andalusian charm, mountains nearby, great rental yields."
    },
    testi:{
      title:"Client stories",
      t1:{text:"Everything was smooth: live tours, offer accepted in 10 days, contracts ready when we arrived.", author:"Camille & Théo — Paris → Málaga"},
      t2:{text:"Paperwork simplified and spot-on advice on the neighborhood. Highly recommend.", author:"Lucia — Geneva → Sevilla"},
      t3:{text:"Great service for buying remotely. Honest and responsive!", author:"David — Brussels → Granada"}
    },
    faq:{
      title:"FAQ",
      q1:{title:"Do you work with agencies or private sellers?", text:"Both. My network gives access to listed and off-market properties."},
      q2:{title:"What are your fees?", text:"A clear flat fee depending on the mission plus optional add-ons."},
      q3:{title:"Can you help with NIE and a bank account?", text:"Yes, I coordinate and can accompany you if needed."}
    },
    contact:{
      title:"Tell me about your project",
      lead:"Share your stage and budget—I'll get back within 24h.",
      badge1:"Reply in 24h", badge2:"Free video call", badge3:"Confidential"
    },
    form:{
      name:"Your name", email:"Your email", budget:"Your project",
      budgetRent:"Rent — monthly budget", budgetBuy:"Buy — total budget",
      message:"Your message", send:"Send", errRequired:"Required field",
      errEmail:"Invalid email", ok:"Thanks! Your message has been received."
    },
    footer:{privacy:"Privacy", terms:"Terms"}
  },

  es: {
    nav:{services:"Servicios",about:"Sobre mí",process:"Proceso",destinations:"Zonas",testimonials:"Opiniones",faq:"FAQ",contact:"Contacto"},
    hero:{
      title:"Compra o alquiler en Andalucía, sin estrés.",
      subtitle:"Me encargo de todo: búsqueda, visitas, negociación y trámites. Llegas y tus llaves te esperan.",
      cta1:"Hablar con un experto", cta2:"Ver servicios",
      badge:"Acompañamiento premium",
      badge1:"Visitas en vídeo en directo", badge2:"Red de confianza", badge3:"Trámites simplificados"
    },
    services:{
      title:"Qué hago por ti",
      lead:"Acompañamiento claro y cercano, desde la primera llamada hasta tu mudanza.",
      s1:{title:"Búsqueda a medida", text:"Selección precisa según presupuesto y estilo de vida."},
      s2:{title:"Visitas & informes", text:"Tours presenciales o en HD a distancia y reportes detallados."},
      s3:{title:"Negociación & oferta", text:"Estrategia, negociación y revisión de documentos."},
      s4:{title:"Trámites & alta", text:"NIE, banco, suministros, seguro y entrega de llaves."}
    },
    about:{
      title:"Conóceme",
      badge:"Acompañamiento humano",
      lead:"Antuanett Garibeh Louze combina rigor académico y calidez personal para que tu traslado a Andalucía sea sencillo y seguro.",
      stat1:{value:"PhD Historia", label:"Formación"},
      stat2:{value:"200+ familias", label:"Acompañadas con éxito"},
      stat3:{value:"8+ años", label:"de experiencia"},
      p1:"Con doctorado en historia, Antuanett guía a clientes internacionales en cada paso — desde la búsqueda de vivienda hasta la integración — con especial atención a trámites y financiación.",
      p2:"Su conocimiento de Andalucía, su red (bancos, abogados, agencias) y su trato cercano aseguran un servicio integral y sensible a la cultura local, con foco especial en Sanlúcar de Barrameda.",
      cta1:"Hablar de tu caso",
      cta2:"Ver FAQ"
    },
    process:{
      title:"Un camino simple en 5 pasos",
      p1:{title:"Descubrimiento", text:"Llamada gratuita para definir objetivos."},
      p2:{title:"Selección", text:"Short-list y agenda de visitas (presencial / vídeo)."},
      p3:{title:"Evaluación", text:"Informes, gastos estimados y potencial."},
      p4:{title:"Negociación", text:"Ofertas y cierre seguro."},
      p5:{title:"Mudanza", text:"Llaves, contratos y seguimiento."}
    },
    dest:{
      title:"Dónde trabajo",
      seville:"Histórica y bien conectada. Ideal para familias y teletrabajo.",
      malaga:"Sol, playa y aeropuerto internacional. Mercado activo todo el año.",
      granada:"Encanto andaluz, montañas cercanas y buena rentabilidad."
    },
    testi:{
      title:"Historias reales",
      t1:{text:"Todo fluido: tours en vivo, oferta aceptada en 10 días y contratos listos al llegar.", author:"Camille & Théo — París → Málaga"},
      t2:{text:"Trámites simplificados y consejos perfectos sobre el barrio.", author:"Lucia — Ginebra → Sevilla"},
      t3:{text:"Excelente servicio para comprar a distancia. ¡Honestos y rápidos!", author:"David — Bruselas → Granada"}
    },
    faq:{
      title:"Preguntas frecuentes",
      q1:{title:"¿Trabajas con agencias o particulares?", text:"Con ambos. Acceso a propiedades publicadas y off-market."},
      q2:{title:"¿Honorarios?", text:"Tarifa fija clara según el servicio + extras si hace falta."},
      q3:{title:"¿Ayuda con NIE y banco?", text:"Sí, coordino y acompaño si es necesario."}
    },
    contact:{
      title:"Cuéntame tu proyecto",
      lead:"Dime tu situación y presupuesto — respondo en 24h.",
      badge1:"Respuesta en 24h", badge2:"Videollamada gratis", badge3:"Confidencialidad"
    },
    form:{
      name:"Tu nombre", email:"Tu email", budget:"Tu proyecto",
      budgetRent:"Alquiler — presupuesto mensual", budgetBuy:"Compra — presupuesto total",
      message:"Tu mensaje", send:"Enviar", errRequired:"Campo obligatorio",
      errEmail:"Email inválido", ok:"¡Gracias! Recibí tu mensaje."
    },
    footer:{privacy:"Privacidad", terms:"Aviso legal"}
  },

  de: {
    nav:{services:"Leistungen",about:"Über mich",process:"Ablauf",destinations:"Regionen",testimonials:"Erfahrungen",faq:"FAQ",contact:"Kontakt"},
    hero:{
      title:"Kaufen oder mieten in Andalusien – ohne Stress.",
      subtitle:"Ich übernehme alles: Immobiliensuche, Besichtigungen, Verhandlung und Formalitäten. Sie landen – die Schlüssel warten schon.",
      cta1:"Mit Expertin sprechen", cta2:"Leistungen ansehen",
      badge:"Premium-Begleitung",
      badge1:"Live-Video-Besichtigungen", badge2:"Vertrauenswürdiges Netzwerk", badge3:"Einfache Bürokratie"
    },
    services:{
      title:"Was ich für Sie tue",
      lead:"Klare, menschliche und transparente Begleitung – vom ersten Gespräch bis zum Einzug.",
      s1:{title:"Gezielte Suche", text:"Exakte Auswahl nach Budget & Lebensstil. Kurze Shortlist und private Alerts."},
      s2:{title:"Besichtigungen & Reports", text:"Vor Ort oder per HD-Video, detaillierte Berichte und Umfeld-Check."},
      s3:{title:"Verhandlung & Angebot", text:"Angebotsstrategie, Verhandlungen, Dokumenten-Check."},
      s4:{title:"Formalitäten & Einzug", text:"NIE, Bank, Versorger, Versicherung und reibungslose Schlüsselübergabe."}
    },
    about:{
      title:"Ihre Begleiterin",
      badge:"Menschlich & zuverlässig",
      lead:"Antuanett Garibeh Louze verbindet akademische Genauigkeit mit Empathie und macht Ihren Umzug nach Andalusien einfach und sicher.",
      stat1:{value:"PhD Geschichte", label:"Akademischer Werdegang"},
      stat2:{value:"200+ Familien", label:"Erfolgreich begleitet"},
      stat3:{value:"8+ Jahre", label:"Erfahrung vor Ort"},
      p1:"Als promovierte Historikerin begleitet Antuanett internationale Kund:innen durch alle Schritte – von der Immobiliensuche bis zur Integration – mit besonderem Fokus auf Formalitäten und Finanzierung.",
      p2:"Dank tiefem Andalusien-Know-how, starkem Netzwerk (Banken, Jurist:innen, Agenturen) und nahbarer Art erhalten Sie eine umfassende, kultursensible Betreuung – mit Schwerpunkt Sanlúcar de Barrameda und Umgebung.",
      cta1:"Fall besprechen",
      cta2:"FAQ lesen"
    },
    process:{
      title:"So läuft es ab – in 5 Schritten",
      p1:{title:"Kennenlernen", text:"Kostenloses Gespräch: Ziele, Budget, Timing."},
      p2:{title:"Auswahl", text:"Shortlist & Terminplan (vor Ort / Video)."},
      p3:{title:"Prüfung", text:"Berichte, Kostenabschätzung, Chancen & Risiken."},
      p4:{title:"Verhandlung", text:"Angebote, Gegenangebote, Absicherung des Deals."},
      p5:{title:"Einzug", text:"Schlüssel, Verträge und After-Care."}
    },
    dest:{
      title:"Wo ich tätig bin",
      seville:"Historisch, lebendig, gut angebunden – ideal für Familien & Remote-Work.",
      malaga:"Sonne, Strände und internationaler Flughafen – starker Jahresmarkt.",
      granada:"Andalusischer Charme, Berge in der Nähe, sehr gute Renditen."
    },
    testi:{
      title:"Erfahrungsberichte",
      t1:{text:"Alles lief reibungslos: Live-Touren, Angebot nach 10 Tagen akzeptiert, Verträge bei Ankunft fertig.", author:"Camille & Théo — Paris → Málaga"},
      t2:{text:"Formalitäten vereinfacht und perfekte Quartier-Tipps. Sehr empfehlenswert.", author:"Lucia — Genf → Sevilla"},
      t3:{text:"Top-Service für den Fernkauf. Ehrlich und reaktionsschnell!", author:"David — Brüssel → Granada"}
    },
    faq:{
      title:"Häufige Fragen",
      q1:{title:"Arbeiten Sie mit Agenturen oder Privatverkäufer:innen?", text:"Mit beiden. Mein Netzwerk bietet Zugang zu gelisteten und Off-Market-Objekten."},
      q2:{title:"Wie hoch sind die Gebühren?", text:"Transparente Pauschale je nach Auftrag plus optionale Zusatzleistungen."},
      q3:{title:"Hilfe bei NIE und Bankkonto?", text:"Ja – ich koordiniere und begleite bei Bedarf."}
    },
    contact:{
      title:"Erzählen Sie mir von Ihrem Projekt",
      lead:"Teilen Sie Status und Budget – Antwort innerhalb von 24 Stunden.",
      badge1:"Antwort in 24h", badge2:"Kostenloser Video-Call", badge3:"Vertraulich"
    },
    form:{
      name:"Ihr Name", email:"Ihre E-Mail", budget:"Ihr Vorhaben",
      budgetRent:"Miete — Monatsbudget", budgetBuy:"Kauf — Gesamtbudget",
      message:"Ihre Nachricht", send:"Senden", errRequired:"Pflichtfeld",
      errEmail:"Ungültige E-Mail", ok:"Danke! Ihre Nachricht ist eingegangen."
    },
    footer:{privacy:"Datenschutz", terms:"Impressum"}
  }
};

const setLang = (lang = "fr") => {
  const dict = I18N[lang] || I18N.fr;
  $$("[data-i18n]").forEach(el=>{
    const path = el.getAttribute("data-i18n").split(".");
    let cur = dict;
    for(const p of path){ cur = cur?.[p]; }
    if(typeof cur === "string"){ el.textContent = cur; }
  });
  $$(".lang__btn").forEach(b=>{
    b.setAttribute("aria-current", b.dataset.lang===lang ? "true":"false");
  });
  localStorage.setItem("lang", lang);
};

const saved = localStorage.getItem("lang") || (navigator.language||"fr").slice(0,2);
setLang(["fr","en","es","de"].includes(saved) ? saved : "fr");

$$(".lang__btn").forEach(b=> b.addEventListener("click", ()=> setLang(b.dataset.lang)));
