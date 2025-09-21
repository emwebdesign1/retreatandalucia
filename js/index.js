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
  prev?.addEventListener("click", ()=> track.scrollBy({left:-window.innerWidth*0.6, behavior:"smooth"}));
  next?.addEventListener("click", ()=> track.scrollBy({left: window.innerWidth*0.6, behavior:"smooth"}));
  let down=false, start=0, scroll=0;
  track?.addEventListener("pointerdown",e=>{down=true;start=e.pageX;scroll=track.scrollLeft;track.setPointerCapture(e.pointerId);});
  track?.addEventListener("pointermove",e=>{if(!down||!track)return; track.scrollLeft = scroll - (e.pageX-start);});
  track?.addEventListener("pointerup",()=> down=false);
})();


$("#year") && ($("#year").textContent = new Date().getFullYear());


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

const I18N = {
  es: {
    nav:{services:"Qué hacemos por ti",about:"Conócenos",process:"Cómo trabajamos contigo",destinations:"Dónde trabajamos",why:"Por qué Andalucía",testimonials:"Opiniones",faq:"Preguntas frecuentes",contact:"Contacto"},
    hero:{
      title:"Compra o alquiler en Andalucía, sin estrés.",
      subtitle:"Nosotras nos encargamos de todo: búsqueda, visitas en vídeo, negociación y trámites. Tú solo llegas… y tus llaves ya te esperan.",
      cta1:"Hablar con un experto", cta2:"Ver servicios",
      badge:"Acompañamiento premium",
      badge1:"Visitas en vídeo en directo", badge2:"Red de profesionales de confianza", badge3:"Trámites legales simplificados"
    },
    services:{
      title:"Qué hacemos por ti",
      lead:"Te acompañamos de principio a fin en tu mudanza a Andalucía.",
      pre:{title:"🏡 Antes de comprar o alquilar (Preventa)", text:"• Búsqueda a medida según presupuesto y estilo de vida.\n• Visitas presenciales o en videollamada HD con reportes.\n• Tours para conocer barrios, colegios y servicios.\n• Apoyo con vuelos y alojamiento en tu viaje de exploración."},
      proc:{title:"🤝 Durante el proceso (Compra & Burocracia)", text:"• Estrategia y negociación de la oferta.\n• Revisión de contratos y documentos clave.\n• Tramitación de NIE, apertura de cuenta bancaria y seguros."},
      post:{title:"🛋️ Después de la compra (Postventa)", text:"• Alta de suministros (agua, luz, internet…).\n• Supervisión de obras y reformas.\n• Decoración y amueblamiento para entrar a vivir."}
    },
    about:{
      title:"Conócenos",
      lead:"Te acompañamos en cada paso de tu nueva vida en Andalucía.",
      m1:{name:"Monika Dittmar", text:"Como expatriada, sé lo desafiante que es empezar en un país extranjero: idioma, trámites y cultura pueden abrumar. Vivo en Andalucía desde hace seis años y conozco muy bien la burocracia española. Gracias a mi formación pedagógica y experiencia en coaching, acompaño de manera cercana, desde la búsqueda de vivienda hasta la integración. Mi objetivo: que tu nueva etapa comience con confianza, seguridad y bienestar."},
      m2:{name:"Antuanett Garibeh", text:"Llevo 16 años en Sevilla y, como doctora en Historia, conozco muy bien Andalucía y lo que implica instalarse aquí. Guío a clientes internacionales en cada paso —búsqueda, trámites e integración— con un servicio integral y cercano, apoyado en una amplia red (bancos, abogados, agencias). Quiero que tu llegada sea sencilla, segura y lo más placentera posible."}
    },
    process:{
      title:"Cómo trabajamos contigo",
      p1:{title:"Paso 1 – Contacto inicial y valoración 📝💰", text:"Formulario o mensaje, hablamos sin compromiso para objetivos, necesidades y presupuesto."},
      p2:{title:"Paso 2 – Firma de contrato ✍️", text:"Servicio exclusivo y personalizado con dedicación prioritaria a tu caso."},
      p3:{title:"Paso 3 – Búsqueda y visitas 🏡", text:"Selección de propiedades según tu estilo y presupuesto. Visitas presenciales o en vídeo con reportes."},
      p4:{title:"Paso 4 – Negociación y trámites", text:"Apoyo en oferta, revisión de documentos, notaría y otros trámites. Todo claro y sin estrés."},
      p5:{title:"Paso 5 – Postventa y acompañamiento 🛋️", text:"Obras, decoración, amueblamiento y seguimiento hasta tu instalación."},
      cta:"Quiero empezar mi proceso"
    },
    dest:{
      title:"Dónde trabajamos",
      seville:"Nuestra sede está en Sevilla, ciudad vibrante con cultura, historia y excelente conectividad. Ideal para combinar calidad de vida y servicios completos.",
      cadiz:"Trabajamos en toda la provincia, con especial foco en Sanlúcar de Barrameda (calidad de vida, playas y gastronomía). También Jerez de la Frontera: vino, flamenco y gran conexión.",
      huelva:"Servicio personalizado en Huelva, destacando su tranquilidad, naturaleza y conexión con otras ciudades andaluzas. Ideal para un entorno relajado sin perder servicios."
    },
    why:{
      title:"Por qué Andalucía",
      statsTitle:"📊 El mercado en cifras (Idealista, 2025)",
      s1:"• 93.000 viviendas compradas por extranjeros en España en 2024 (14,6%).",
      s2:"• En Málaga, el 27,1% de la demanda es extranjera.",
      s3:"• En Cádiz, el 11,9% de la demanda viene del exterior.",
      s4:"• En Huelva, el 12,4% de la demanda es internacional.",
      s5:"• En Sevilla, el 5,8% de los compradores son internacionales.",
      source:"Fuente: Idealista News, septiembre 2025.",
      uniqueTitle:"🌞 ¿Qué hace única a Andalucía?",
      u1:"Más de 300 días de sol al año",
      u2:"Aeropuertos internacionales (Sevilla, Jerez, Málaga)",
      u3:"Cultura y gastronomía reconocidas mundialmente",
      u4:"Ideal para jubilados y familias que buscan un nuevo comienzo",
      cta:"Descubre cómo trabajamos contigo"
    },
    testi:{
      title:"Opiniones"
    },
    faq:{
      title:"Preguntas frecuentes",
      q1:{title:"¿Cuánto cuesta el servicio?", text:"Servicios a medida. Los acompañamientos completos suelen comenzar alrededor de 3.000 €. Lo ajustamos en la primera reunión gratuita según tu caso."},
      q2:{title:"¿En qué zonas trabajáis?", text:"Especializadas en Sevilla, Cádiz y Huelva. Sede en Sevilla para estar cerca durante todo el proceso."},
      q3:{title:"¿Qué pasa después de comprar la casa?", text:"No termina en la notaría. Postventa: reformas, decoración, amueblamiento y apoyo en la adaptación."},
      q4:{title:"¿A quién va dirigido el servicio?", text:"Familias, personas jubiladas y quienes buscan trato cercano y personalizado."},
      q5:{title:"¿Cómo empiezo?", text:"Rellena el formulario gratuito o envíanos un mensaje. Si encajamos, diseñamos el plan a medida."}
    },
    contact:{
      title:"Contáctanos",
      lead:"Todo igual como está. Modifica el correo a info@retreatandalucia.com",
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

  fr: {
    nav:{services:"Services",about:"À propos",process:"Processus",destinations:"Destinations",why:"Pourquoi l’Andalousie",testimonials:"Avis",faq:"FAQ",contact:"Contact"},
    hero:{
      title:"Acheter ou louer en Andalousie, sans stress.",
      subtitle:"Je m’occupe de tout : recherche de biens, visites, négociation et formalités administratives. Vous arrivez, vos clés vous attendent.",
      cta1:"Parler à un expert", cta2:"Voir les services",
      badge:"Accompagnement premium",
      badge1:"Visites vidéo en direct", badge2:"Réseau de confiance", badge3:"Démarches simplifiées"
    },
    services:{
      title:"Ce que je fais pour vous",
      lead:"Un accompagnement clair et humain, de la première prise de contact jusqu’à l’installation.",
      pre:{title:"🏡 Avant (Prévente)", text:"Recherche à la carte, visites (présentielles/HD), tours de quartiers, aide au voyage d’exploration."},
      proc:{title:"🤝 Pendant (Achat & Bureaux)", text:"Stratégie d’offre, négociation, vérification des contrats, NIE, banque, assurances."},
      post:{title:"🛋️ Après (Post-achat)", text:"Mise en service (eau/lumière/internet), suivi de travaux, déco & ameublement."}
    },
    about:{
      title:"Qui vous accompagne",
      lead:"Deux profils complémentaires pour un accompagnement complet.",
      m1:{name:"Monika Dittmar", text:"Expatriée installée en Andalousie, experte des démarches et de l’accompagnement humain. Coaching individuel et approche structurée."},
      m2:{name:"Antuanett Garibeh", text:"Docteure en Histoire à Séville depuis 16 ans, réseau local (banques, juristes, agences) et accompagnement pas à pas."}
    },
    process:{
      title:"Un processus simple, en 5 étapes",
      p1:{title:"Découverte", text:"Appel gratuit pour clarifier vos besoins, budget et timing."},
      p2:{title:"Contrat", text:"Cadre clair et prioritaire pour votre dossier."},
      p3:{title:"Recherche & visites", text:"Short-list ciblée et visites (sur place / vidéo) avec rapports."},
      p4:{title:"Négociation & démarches", text:"Offres, contre-offres et documents jusqu’à la notaire."},
      p5:{title:"Post-achat", text:"Remise des clés, contrats et suivi après installation."},
      cta:"Commencer mon processus"
    },
    dest:{
      title:"Où nous opérons",
      seville:"Séville : culture, histoire et excellentes connexions.",
      cadiz:"Cadix : Sanlúcar de Barrameda, Jerez… qualité de vie & gastronomie.",
      huelva:"Huelva : nature, tranquillité et bonnes connexions."
    },
    why:{
      title:"Pourquoi l’Andalousie",
      statsTitle:"📊 Le marché en chiffres (Idealista, 2025)",
      s1:"93k achats par des étrangers en 2024 (14,6%).",
      s2:"Málaga : 27,1 % de demande étrangère.",
      s3:"Cádiz : 11,9 % de demande extérieure.",
      s4:"Huelva : 12,4 % de demande internationale.",
      s5:"Séville : 5,8 % d’acheteurs internationaux.",
      source:"Source : Idealista News, septembre 2025.",
      uniqueTitle:"🌞 Atouts uniques",
      u1:"300+ jours de soleil",
      u2:"Aéroports (Séville, Jerez, Málaga)",
      u3:"Culture & gastronomie",
      u4:"Idéale retraités & familles",
      cta:"Découvrir notre méthode"
    },
    testi:{title:"Avis"},
    faq:{
      title:"Questions fréquentes",
      q1:{title:"Combien ça coûte ?", text:"Services sur mesure. Accompagnements complets dès ~3 000 €, ajustés lors du premier rdv gratuit."},
      q2:{title:"Où intervenez-vous ?", text:"Séville, Cadix et Huelva, avec base à Séville."},
      q3:{title:"Après l’achat ?", text:"Post-achat : travaux, déco, ameublement et intégration."},
      q4:{title:"Pour qui ?", text:"Familles, retraités, accompagnement personnalisé."},
      q5:{title:"Comment commencer ?", text:"Formulaire gratuit → plan à la carte."}
    },
    contact:{
      title:"Contactez-nous",
      lead:"Écrivez-nous votre projet — réponse sous 24h.",
      badge1:"Réponse sous 24h", badge2:"Visio offerte", badge3:"Confidentialité"
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
    nav:{services:"Services",about:"About",process:"How we work",destinations:"Where we operate",why:"Why Andalusia",testimonials:"Reviews",faq:"FAQ",contact:"Contact"},
    hero:{
      title:"Buy or rent in Andalusia, stress-free.",
      subtitle:"We handle everything: search, live video tours, negotiation and paperwork. You arrive — your keys are waiting.",
      cta1:"Talk to an expert", cta2:"See services",
      badge:"Premium support",
      badge1:"Live video viewings", badge2:"Trusted network", badge3:"Simplified paperwork"
    },
    services:{
      title:"What we do for you",
      lead:"From the first call to move-in — end-to-end support.",
      pre:{title:"🏡 Before (Pre-sale)", text:"Tailored search, in-person/HD visits, area tours, trip support."},
      proc:{title:"🤝 During (Purchase & Admin)", text:"Offer strategy, negotiation, contract checks, NIE, bank, insurance."},
      post:{title:"🛋️ After (Aftercare)", text:"Utilities setup, works supervision, decoration & furnishing."}
    },
    about:{
      title:"Meet us",
      lead:"We guide you at every step.",
      m1:{name:"Monika Dittmar", text:"Expat in Andalusia with strong admin know-how and a human-first approach."},
      m2:{name:"Antuanett Garibeh", text:"PhD in History, 16 years in Seville, strong local network and clear guidance."}
    },
    process:{
      title:"How we work with you",
      p1:{title:"Step 1 – Intro call 📝💰", text:"Free chat to align goals, needs and budget."},
      p2:{title:"Step 2 – Contract ✍️", text:"Exclusive, personalized service with priority focus."},
      p3:{title:"Step 3 – Search & visits 🏡", text:"Handpicked options, in-person or video visits + reports."},
      p4:{title:"Step 4 – Negotiation & paperwork", text:"Offers, documents, notary and related steps."},
      p5:{title:"Step 5 – Aftercare 🛋️", text:"Works, decoration, furnishing and follow-up."},
      cta:"Start my process"
    },
    dest:{
      title:"Where we operate",
      seville:"Seville HQ — culture, history and connectivity.",
      cadiz:"Cádiz province focus: Sanlúcar de Barrameda and Jerez.",
      huelva:"Huelva — calm, nature and solid connections."
    },
    why:{
      title:"Why Andalusia",
      statsTitle:"📊 Market in numbers (Idealista, 2025)",
      s1:"93k foreign purchases in Spain in 2024 (14.6%).",
      s2:"Málaga: 27.1% foreign demand.",
      s3:"Cádiz: 11.9% foreign demand.",
      s4:"Huelva: 12.4% international demand.",
      s5:"Seville: 5.8% international buyers.",
      source:"Source: Idealista News, Sept 2025.",
      uniqueTitle:"🌞 What makes it unique",
      u1:"300+ sunny days/year",
      u2:"Airports in Seville, Jerez, Málaga",
      u3:"World-class culture & food",
      u4:"Great for retirees & families",
      cta:"See how we work"
    },
    testi:{title:"Reviews"},
    faq:{
      title:"FAQ",
      q1:{title:"How much does it cost?", text:"Tailored services. Full support typically from ~€3,000. We adjust in the free intro call."},
      q2:{title:"Where do you work?", text:"Seville, Cádiz and Huelva — HQ in Seville."},
      q3:{title:"After purchase?", text:"Aftercare: works, decor, furnishing and adaptation."},
      q4:{title:"Who is it for?", text:"Families and retirees seeking close, personalized service."},
      q5:{title:"How to start?", text:"Fill the form — we design a plan together."}
    },
    contact:{
      title:"Contact us",
      lead:"Share your project — reply within 24h.",
      badge1:"Reply in 24h", badge2:"Free video call", badge3:"Confidential"
    },
    form:{
      name:"Your name", email:"Your email", budget:"Your project",
      budgetRent:"Rent — monthly budget", budgetBuy:"Buy — total budget",
      message:"Your message", send:"Send", errRequired:"Required field",
      errEmail:"Invalid email", ok:"Thanks! Message received."
    },
    footer:{privacy:"Privacy", terms:"Terms"}
  },

  de: {
    nav:{services:"Leistungen",about:"Über uns",process:"So arbeiten wir",destinations:"Regionen",why:"Warum Andalusien",testimonials:"Erfahrungen",faq:"FAQ",contact:"Kontakt"},
    hero:{
      title:"Kaufen oder mieten in Andalusien – ohne Stress.",
      subtitle:"Wir übernehmen alles: Suche, Live-Video-Touren, Verhandlung und Formalitäten. Sie kommen an – die Schlüssel warten.",
      cta1:"Mit Expertin sprechen", cta2:"Leistungen ansehen",
      badge:"Premium-Begleitung",
      badge1:"Live-Video-Besichtigungen", badge2:"Vertrauensnetzwerk", badge3:"Einfachere Bürokratie"
    },
    services:{
      title:"Was wir für Sie tun",
      lead:"Begleitung von A bis Z – vom ersten Gespräch bis zum Einzug.",
      pre:{title:"🏡 Vorher (Pre-Sale)", text:"Gezielte Suche, Besichtigungen, Quartier-Touren, Reisesupport."},
      proc:{title:"🤝 Währenddessen (Kauf & Formalien)", text:"Angebotsstrategie, Verhandlung, Dokumenten-Check, NIE, Bank, Versicherung."},
      post:{title:"🛋️ Danach (Aftercare)", text:"Versorger, Bauaufsicht, Einrichtung & Möblierung."}
    },
    about:{
      title:"Lernen Sie uns kennen",
      lead:"Wir begleiten Sie Schritt für Schritt.",
      m1:{name:"Monika Dittmar", text:"Expat in Andalusien mit starkem Know-how zu Formalitäten und menschlicher Begleitung."},
      m2:{name:"Antuanett Garibeh", text:"PhD Geschichte, 16 Jahre in Sevilla, starkes Netzwerk und klare Führung."}
    },
    process:{
      title:"So arbeiten wir mit Ihnen",
      p1:{title:"Schritt 1 – Erstgespräch 📝💰", text:"Ziele, Bedürfnisse und Budget klären."},
      p2:{title:"Schritt 2 – Vertrag ✍️", text:"Exklusiver, personalisierter Service mit Priorität."},
      p3:{title:"Schritt 3 – Suche & Besichtigungen 🏡", text:"Auswahl, vor Ort oder per Video + Berichte."},
      p4:{title:"Schritt 4 – Verhandlung & Papierkram", text:"Angebote, Dokumente, Notar und Formalitäten."},
      p5:{title:"Schritt 5 – Aftercare 🛋️", text:"Bau/Einrichtung und Nachbetreuung."},
      cta:"Meinen Prozess starten"
    },
    dest:{
      title:"Wo wir tätig sind",
      seville:"Sevilla HQ – Kultur, Geschichte, Top-Anbindung.",
      cadiz:"Provinz Cádiz: Sanlúcar und Jerez im Fokus.",
      huelva:"Huelva: Ruhe, Natur, gute Verbindungen."
    },
    why:{
      title:"Warum Andalusien",
      statsTitle:"📊 Markt in Zahlen (Idealista, 2025)",
      s1:"93k Käufe durch Ausländer 2024 (14,6 %).",
      s2:"Málaga: 27,1 % Auslandsnachfrage.",
      s3:"Cádiz: 11,9 % Auslandsnachfrage.",
      s4:"Huelva: 12,4 % internationale Nachfrage.",
      s5:"Sevilla: 5,8 % internationale Käufer.",
      source:"Quelle: Idealista News, Sept 2025.",
      uniqueTitle:"🌞 Einzigartige Vorteile",
      u1:"300+ Sonnentage/Jahr",
      u2:"Flughäfen Sevilla, Jerez, Málaga",
      u3:"Kultur & Gastronomie",
      u4:"Ideal für Familien & Ruheständler",
      cta:"So arbeiten wir"
    },
    testi:{title:"Erfahrungen"},
    faq:{
      title:"Häufige Fragen",
      q1:{title:"Was kostet es?", text:"Maßgeschneiderte Leistungen. Komplettbegleitung ab ~3.000 € (Richtwert)."},
      q2:{title:"Regionen?", text:"Sevilla, Cádiz, Huelva – Basis in Sevilla."},
      q3:{title:"Nach dem Kauf?", text:"Aftercare: Arbeiten, Einrichtung, Integration."},
      q4:{title:"Für wen?", text:"Familien, Ruheständler, persönliche Begleitung."},
      q5:{title:"Start?", text:"Formular ausfüllen → individueller Plan."}
    },
    contact:{
      title:"Kontakt",
      lead:"Schreiben Sie uns – Antwort in 24h.",
      badge1:"Antwort in 24h", badge2:"Kostenloser Video-Call", badge3:"Vertraulich"
    },
    form:{
      name:"Ihr Name", email:"Ihre E-Mail", budget:"Ihr Vorhaben",
      budgetRent:"Miete — Monatsbudget", budgetBuy:"Kauf — Gesamtbudget",
      message:"Ihre Nachricht", send:"Senden", errRequired:"Pflichtfeld",
      errEmail:"Ungültige E-Mail", ok:"Danke! Nachricht erhalten."
    },
    footer:{privacy:"Datenschutz", terms:"Impressum"}
  }
};


const setLang = (lang = "es") => {
  const dict = I18N[lang] || I18N.es;
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

const saved = localStorage.getItem("lang") || "es";
setLang(["fr","en","es","de"].includes(saved) ? saved : "es");
$$(".lang__btn").forEach(b=> b.addEventListener("click", ()=> setLang(b.dataset.lang)));



$$(".card--dest").forEach(card=>{
  card.addEventListener("click", (e)=>{

    if(e.target.closest("a, button")) return;
    card.classList.toggle("open");
  });
});


I18N.es.dest.sevilleShort = "Ciudad vibrante, cultura e historia. Sede central.";
I18N.es.dest.seville = "Nuestra sede se encuentra en Sevilla, desde donde coordinamos todas nuestras operaciones. Ciudad vibrante con cultura, historia y excelente conectividad. Ideal para quienes buscan combinar calidad de vida con servicios completos y cercanía a todo.";

I18N.es.dest.cadizShort = "Provincia de Cádiz: Sanlúcar y Jerez.";
I18N.es.dest.cadiz = "Trabajamos en toda la provincia de Cádiz, con especial atención a Sanlúcar de Barrameda, conocida por su calidad de vida, playas y gastronomía local, y a Jerez de la Frontera.";
I18N.es.dest.cadizSnl = "Sanlúcar de Barrameda: Tranquilidad junto al mar, entorno histórico y cultural. Excelente gastronomía (mariscos y vinos) y eventos como la Carrera de Caballos en la playa.";
I18N.es.dest.cadizJrz = "Jerez de la Frontera: Famosa por su vino, flamenco y festivales; combina vida urbana con encanto histórico y gran conexión con la provincia y Andalucía.";

I18N.es.dest.huelvaShort = "Naturaleza, tranquilidad y buenas conexiones.";
I18N.es.dest.huelva = "Ofrecemos servicio personalizado en Huelva, destacando su tranquilidad, naturaleza y conexión con otras ciudades andaluzas. Ideal para quienes buscan un entorno relajado, rodeado de naturaleza, sin perder acceso a servicios y conexiones importantes.";

I18N.fr.dest.sevilleShort = "Séville — siège, culture & histoire.";
I18N.fr.dest.cadizShort = "Cadix — Sanlúcar & Jerez.";
I18N.fr.dest.huelvaShort = "Huelva — nature & calme.";

I18N.en.dest.sevilleShort = "Seville HQ — culture & history.";
I18N.en.dest.cadizShort = "Cádiz province — Sanlúcar & Jerez.";
I18N.en.dest.huelvaShort = "Huelva — nature & calm.";

I18N.de.dest.sevilleShort = "Sevilla HQ — Kultur & Geschichte.";
I18N.de.dest.cadizShort = "Provinz Cádiz — Sanlúcar & Jerez.";
I18N.de.dest.huelvaShort = "Huelva — Natur & Ruhe.";


I18N.es.testi = {
  title: "Opiniones",
  t1: { text:"“Todo fue fluido: visitas en vídeo en directo y oferta aceptada en 10 días.”", author:"Camille & Théo — París → Sanlucar de Barrameda" },
  t2: { text:"“Trámites simplificados y consejos muy precisos sobre el barrio.”", author:"Lucia — Ginebra → Sevilla" },
  t3: { text:"“Gran servicio para comprar a distancia. Honestidad y rapidez.”", author:"David — Bruselas → Huelva" }
};

I18N.fr.testi = {
  title: "Avis",
  t1: { text:"« Tout a été fluide : visios en direct, offre acceptée en 10 jours. »", author:"Camille & Théo — Paris → Sanlucar de Barrameda" },
  t2: { text:"« Démarches simplifiées et conseils parfaits sur le quartier. »", author:"Lucia — Genève → Séville" },
  t3: { text:"« Excellent service à distance. Honnêteté et réactivité. »", author:"David — Bruxelles → Huelva" }
};

I18N.en.testi = {
  title: "Reviews",
  t1: { text:"“Smooth throughout: live video tours and our offer accepted within 10 days.”", author:"Camille & Théo — Paris → Sanlucar de Barrameda" },
  t2: { text:"“Paperwork made easy and spot-on neighborhood advice.”", author:"Lucia — Geneva → Seville" },
  t3: { text:"“Great remote-buy experience. Honest and responsive.”", author:"David — Brussels → Huelva" }
};

I18N.de.testi = {
  title: "Erfahrungen",
  t1: { text:"„Reibungslos: Live-Touren und Angebot nach 10 Tagen akzeptiert.“", author:"Camille & Théo — Paris → Sanlucar de Barrameda" },
  t2: { text:"„Formalitäten vereinfacht und perfekte Tipps zum Quartier.“", author:"Lucia — Genf → Sevilla" },
  t3: { text:"„Top Fernkauf-Service. Ehrlich und schnell.“", author:"David — Brüssel → Huelva" }
};

// >>> Re-render après avoir injecté les textes des avis
(() => {
  const cur = localStorage.getItem("lang") || "es";
  setLang(["fr","en","es","de"].includes(cur) ? cur : "es");
})();

