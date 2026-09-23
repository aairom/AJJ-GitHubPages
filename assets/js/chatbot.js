/* =============================================================================
   Asnières Jujitsu — Chatbot Assistant
   Fichier : chatbot.js
   Auteur  : Club AJJ
   Licence : MIT
   Dépendances : aucune — JavaScript vanilla, zéro dépendance externe
   ============================================================================= */

'use strict';

/* ── § CONFIGURATION DU CLUB ─────────────────────────────────────────────────
   Métadonnées du club — point unique de mise à jour des URLs et infos clés.
   ─────────────────────────────────────────────────────────────────────────── */
const AJJ_CONFIG = {
  nomClub:       'Asnières Jujitsu',
  sigleClub:     'AJJ',
  email:         'asnieresjujitsu@gmail.com',
  adresse:       'Gymnase Laura Flessel, 91 boulevard Voltaire, 92600 Asnières-sur-Seine',
  facebook:      'https://www.facebook.com/asnieresjujitsu/',
  instagram:     'https://www.instagram.com/le_club_asnieres_ju_jitsu/',
  youtube:       'https://www.youtube.com/channel/UC1etKUzI4-Pd5fwSAFHumKQ',
  inscriptionNouveau:   'https://tally.so/r/3NDbKQ',
  inscriptionRenouveau: 'https://tally.so/r/mK56XA',
  urlFaq:        '/AJJ-GitHubPages/faq/',
  urlJujitsu:    '/AJJ-GitHubPages/quest-ce-que-le-ju-jitsu/',
  urlRaisons:    '/AJJ-GitHubPages/5-bonnes-raisons/',
  urlRemiseForme:'/AJJ-GitHubPages/remise-en-forme/',
  urlComite:     '/AJJ-GitHubPages/comite-directeur/',
  urlBlog:       '/AJJ-GitHubPages/blog/'
};

/* ── § BASE DE CONNAISSANCES ─────────────────────────────────────────────────
   Tableau ordonné d'entrées. Chaque entrée contient :
     id       : identifiant unique (débogage)
     patterns : mots-clés ou phrases déclencheurs (voir moteur de correspondance)
     response : texte de réponse (supporte le markdown léger)

   Ordre d'importance : les entrées les plus génériques sont placées en premier,
   les plus spécifiques ensuite. Le moteur s'arrête à la première correspondance.
   ─────────────────────────────────────────────────────────────────────────── */
const KNOWLEDGE_BASE = [

  /* --- Salutation --------------------------------------------------------- */
  {
    id: 'salutation',
    patterns: [
      'bonjour', 'bonsoir', 'salut', 'coucou', 'hello', 'hey',
      'bonne journée', 'bonne soirée', '^hi$', 'yo'
    ],
    response: `👋 **Bonjour et bienvenue !** Je suis l'assistant virtuel du club **Asnières Jujitsu (AJJ)**.\n\nJe peux vous renseigner sur :\n🥋 Le Jujitsu et nos cours\n💶 Les tarifs et inscriptions\n🕐 Les horaires\n📍 L'adresse du dojo\n\nQue souhaitez-vous savoir ?`
  },

  /* --- Styles et formes pratiquées (AVANT l'entrée jujitsu générique) ----- */
  {
    id: 'styles',
    patterns: [
      'style', 'styles', 'brésilien', 'bresilien', 'bjj',
      'ne waza', 'newaza', 'pieds poings', 'pieds-poings',
      'self-défense', 'self defense', 'selfdefense', 'projection', 'projections',
      'clé articulaire', 'cles articulaires', 'strangulation', 'strangulations',
      'nage-waza', 'katame-waza', 'atemi-waza', 'kansetsu-waza', 'shime-waza'
    ],
    response: `🥋 **Les styles pratiqués au club AJJ :**\n\n🇯🇵 **Jujitsu traditionnel japonais**\nTechniques de combat debout : projections (nage-waza), clés articulaires (kansetsu-waza), strangulations (shime-waza), frappes (atemi-waza).\n\n🇧🇷 **Jujitsu brésilien (ne waza)**\nSpécialisé dans le combat au sol — garde, soumissions, passages.\n\n🥊 **Pieds/poings et self-défense**\nApplication pratique dans des situations réelles.\n\n👉 [Découvrir le Jujitsu](${AJJ_CONFIG.urlJujitsu})`
  },

  /* --- Qu'est-ce que le Jujitsu ? (entrée générique après styles) --------- */
  {
    id: 'jujitsu',
    patterns: [
      'jujitsu', 'ju jitsu', 'ju-jitsu', 'jiu jitsu', 'art martial', 'arts martiaux',
      'discipline', 'sport de combat', 'qu est-ce que',
      'c est quoi', 'kesako', 'definition', 'origine', 'histoire', 'samourai', 'samouraï',
      'budo', 'japonais'
    ],
    response: `🥋 **Le Jujitsu (柔術)** est l'un des arts martiaux japonais les plus anciens.\n\nLe terme signifie littéralement *« technique de la souplesse »*. Il repose sur l'utilisation de la force de l'adversaire plutôt que de lui opposer une force brute.\n\nAu club AJJ, nous pratiquons :\n• **Jujitsu traditionnel japonais** — projections, clés, strangulations\n• **Jujitsu brésilien (ne waza)** — spécialisation combat au sol\n• **Pieds/poings et self-défense** — applications pratiques\n\n👉 [En savoir plus sur le Jujitsu](${AJJ_CONFIG.urlJujitsu})`
  },

  /* --- Horaires des cours ------------------------------------------------- */
  {
    id: 'horaires',
    patterns: [
      'horaire', 'horaires', 'heure', 'heures', 'quand', 'planning',
      'emploi du temps', 'créneau', 'créneaux', 'creneau', 'creneaux',
      'mardi', 'jeudi', 'samedi', 'semaine', 'jours',
      'cours du soir', 'cours du matin'
    ],
    response: `🕐 **Horaires des cours — saison 2025-2026 :**\n\n📅 **Mardi** — 19h00 à 21h00\n• Tous niveaux (Adhérents Jujitsu)\n\n📅 **Jeudi** — 19h00 à 21h00\n• Tous niveaux (Adhérents Jujitsu)\n\n📅 **Samedi** — 09h00 à 10h30\n• Adhérents Jujitsu & Remise en forme\n\n💡 Soit **3 séances par semaine** pour un tarif imbattable !`
  },

  /* --- Tarifs ------------------------------------------------------------- */
  {
    id: 'tarifs',
    patterns: [
      'tarif', 'tarifs', 'prix', 'coût', 'cout', 'combien', 'cotisation',
      'abonnement', 'adhésion', 'montant', 'cher',
      'moins cher', 'pas cher', 'économique', 'budget'
    ],
    response: `💶 **Tarifs de la saison 2025-2026 :**\n\n🎁 **Cours d'essai** — *Gratuit* (sans engagement)\n👤 **Adulte** — 320 €\n🧒 **Mineur** — 270 €\n🥋 **Ceinture Noire** — 210 €\n🏃 **Remise en Forme uniquement** — 190 €\n\nLa cotisation comprend la **licence FFJDA** et l'accès à tous les cours.\n\n💳 Paiements acceptés : CB en ligne, chèques, chèques-vacances, coupons-sport, PASS+, PASS'SPORT, aides CAF.\n\n👉 [Voir tous les tarifs](${AJJ_CONFIG.urlRaisons})`
  },

  /* --- Inscription -------------------------------------------------------- */
  {
    id: 'inscription',
    patterns: [
      's inscrire', 's\'inscrire', 'inscrire', 'inscription', 'rejoindre',
      'adhérer', 'adherer', 'comment faire', 'démarche', 'formulaire',
      'tally', 'dossier', 'renouveler', 'réinscription', 'reinscription',
      'nouvelle inscription', 'comment adhérer', 'comment adherer'
    ],
    response: `📝 **Comment s'inscrire au club AJJ ?**\n\n**Option 1 — En ligne** (saisie + paiement) :\n• [Nouvelle inscription](${AJJ_CONFIG.inscriptionNouveau})\n• [Réinscription](${AJJ_CONFIG.inscriptionRenouveau})\n\n**Option 2 — Directement au dojo** :\nVenez lors d'un cours, signalez-vous auprès du sensei ou d'un membre du bureau.\n\n💡 Le club n'a pas de secrétariat. Pas besoin de rendez-vous préalable !\n\n🎁 **Cours d'essai gratuit disponible** — venez simplement en survêtement, sans engagement.`
  },

  /* --- Cours d'essai ----------------------------------------------------- */
  {
    id: 'essai',
    patterns: [
      'essai', 'essayer', 'tester', 'découverte', 'découvrir', 'gratuit',
      'cours d essai', 'seance d essai', 'séance gratuite', 'sans engagement',
      'premier cours', 'venir voir', 'free trial', 'cours gratuit',
      'séance découverte', 'seance decouverte'
    ],
    response: `🎁 **Cours d'essai gratuit !**\n\nVous pouvez venir tester le Jujitsu **sans engagement et gratuitement**.\n\n✅ Comment faire :\n1. Venez lors d'un cours (mardi, jeudi ou samedi)\n2. Présentez-vous au sensei ou à un membre du bureau\n3. Pas besoin de kimono — un survêtement suffit !\n\n📍 **Gymnase Laura Flessel**\n91 boulevard Voltaire, 92600 Asnières-sur-Seine\n\n✉️ [Nous contacter](mailto:${AJJ_CONFIG.email}) si vous avez des questions avant de venir.`
  },

  /* --- Lieu / Adresse ----------------------------------------------------- */
  {
    id: 'adresse',
    patterns: [
      'adresse', 'où', 'lieu', 'localisation', 'emplacement', 'gymnase',
      'dojo', 'asnières', 'asnieres', 'salle', 'trouver', 'se rendre',
      'comment venir', 'accès', 'acces', 'laura flessel', 'voltaire'
    ],
    response: `📍 **Notre dojo :**\n\n**Gymnase Laura Flessel**\n91 boulevard Voltaire\n92600 Asnières-sur-Seine\n\n🚇 *Accès :* Proche des transports en commun.\n\n🕐 *Horaires d'ouverture :*\n• Mardi & Jeudi : 19h00 – 21h00\n• Samedi : 09h00 – 10h30\n\n🗺️ [Voir sur la carte](https://maps.google.com/?q=91+Boulevard+Voltaire+92600+Asnières-sur-Seine)`
  },

  /* --- Contact ------------------------------------------------------------ */
  {
    id: 'contact',
    patterns: [
      'contact', 'contacter', 'joindre', 'question', 'renseignement',
      'email', 'mail', 'courrier', 'message', 'écrire', 'telephone',
      'téléphone', 'appeler', 'coordonnées', 'nous écrire'
    ],
    response: `📬 **Nous contacter :**\n\n✉️ **Email :** [${AJJ_CONFIG.email}](mailto:${AJJ_CONFIG.email})\n\n📱 **Réseaux sociaux :**\n• [Facebook](${AJJ_CONFIG.facebook})\n• [Instagram](${AJJ_CONFIG.instagram})\n• [YouTube](${AJJ_CONFIG.youtube})\n\n💬 Ou envoyez-nous un message depuis le [formulaire de contact](/#contact) sur le site.\n\nNous répondons dans les meilleurs délais ! 😊`
  },

  /* --- Age minimum / Enfants --------------------------------------------- */
  {
    id: 'age',
    patterns: [
      'age', 'âge', 'enfant', 'enfants', 'mineur', 'mineurs', 'junior',
      'quel age', 'partir de', 'ans', 'jeune', 'jeunes', 'ado', 'adolescent',
      'fils', 'fille', 'kid', 'préado', 'minimum'
    ],
    response: `👶 **Quel est l'âge minimum pour pratiquer ?**\n\nLe club AJJ accueille les pratiquants **à partir de 12 ans**.\n\n📌 Il n'y a pas de cours séparés par tranche d'âge : tous les cours sont **communs**, ce qui favorise les échanges et la convivialité entre générations.\n\n💡 Les adultes expérimentés veillent sur les débutants — c'est l'esprit de la « grande famille » AJJ !`
  },

  /* --- Grades / Ceintures (avant matériel car 'ceinture' est partagé) ---- */
  {
    id: 'grades',
    patterns: [
      'grade', 'grades', 'passage de ceinture', 'passage de grade', 'examen de grade',
      'examen de ceinture', 'progresser', 'ceinture noire', 'ceinture blanche',
      'ceinture jaune', 'ceinture orange', 'ceinture verte', 'ceinture bleue',
      'ceinture marron', 'dan', 'kyu', 'niveau', 'niveaux'
    ],
    response: `🎖️ **Les grades et passages de ceintures :**\n\nAu club AJJ, vous pouvez progresser **de la ceinture blanche à la ceinture marron** sous la supervision du sensei.\n\n📅 Les **examens de passage de grade** ont lieu **1 à 2 fois par saison**.\n\n🥋 La progression vers la **ceinture noire** est possible pour les pratiquants volontaires et assidus.\n\n💡 Le programme technique est progressif et adapté à tous les niveaux — la richesse des techniques vous accompagnera tout au long de votre pratique.`
  },

  /* --- Équipement / Matériel --------------------------------------------- */
  {
    id: 'materiel',
    patterns: [
      'matériel', 'materiel', 'équipement', 'equipement', 'kimono', 'gi',
      'judogi', 'ceinture', 'tenue', 'vêtement', 'vêtements', 'protège',
      'protection', 'mitaine', 'protège-tibia', 'survetemement', 'survêtement',
      'qu apporter', 'que mettre', 'quoi porter',
      'equipement pour debuter', 'équipement pour débuter', 'materiel necessaire'
    ],
    response: `👘 **Matériel nécessaire pour pratiquer le Jujitsu :**\n\n✅ **Obligatoire :**\n• Kimono type Judo (judogi)\n• Ceinture blanche pour débuter\n• Bouteille d'eau\n\n🛡️ **Recommandé :**\n• Protège-tibias\n• Mitaines\n\n💡 **Pour le cours d'essai :** un simple **survêtement** suffit, pas besoin de kimono !\n\nPour tout renseignement sur l'équipement, rapprochez-vous du sensei ou d'un membre du bureau.`
  },

  /* --- Compétition ------------------------------------------------------- */
  {
    id: 'competition',
    patterns: [
      'compétition', 'competition', 'tournoi', 'tournois', 'championnat',
      'compétiteur', 'concours', 'se battre', 'combattre', 'adversaire',
      'match', 'résultat', 'podium', 'médaille'
    ],
    response: `🏆 **La compétition au club AJJ :**\n\nLa **compétition n'est pas notre priorité**, mais elle n'est pas exclue ! Elle reste **réservée aux pratiquants volontaires**.\n\n✅ Les participations aux tournois interclubs sont possibles pour ceux qui le souhaitent.\n\n📰 Retrouvez les résultats de nos compétiteurs dans la section [Blog / Actualités](${AJJ_CONFIG.urlBlog}) du site.\n\n💡 Notre philosophie : *« travailler sérieusement sans se prendre au sérieux »*.`
  },

  /* --- Remise en forme ---------------------------------------------------- */
  {
    id: 'remise_forme',
    patterns: [
      'remise en forme', 'remise-en-forme', 'fitness', 'renforcement musculaire',
      'cardio', 'étirements', 'etirements', 'musculation',
      'forme physique', 'senior', 'seniors',
      'sénior', 'séniors', 'échauffement', 'souplesse physique',
      'cours du samedi matin', 'samedi matin'
    ],
    response: `🏃 **Cours de Remise en Forme — Samedi 09h00 à 10h30**\n\nCe cours est idéal pour **retrouver ou maintenir une bonne condition physique**, aussi bien pour les jeunes que pour les séniors.\n\n📌 **Structure de chaque séance :**\n1. **Échauffement** — préparer le corps, activer les filières énergétiques\n2. **Corps de séance** — renforcement musculaire avec mezins balls, bâtons, élastiques\n3. **Étirements** — récupération et assouplissement\n\n💶 **Tarif :** 190 € la saison\n\n👉 [En savoir plus](${AJJ_CONFIG.urlRemiseForme})\n\n💡 Ce cours est **inclus** dans l'inscription au Jujitsu (tarif Jujitsu seul).`
  },

  /* --- Fédération --------------------------------------------------------- */
  {
    id: 'federation',
    patterns: [
      'fédération', 'federation', 'ffjda', 'affilié', 'affiliation',
      'licence', 'licencié', 'assurance', 'officiel', 'reconnu',
      'judo', 'disciplines associées'
    ],
    response: `🏅 **Affiliation fédérale :**\n\nLe club Asnières Jujitsu est affilié à la **Fédération Française de Judo et Disciplines Associées (FFJDA)**.\n\n✅ La licence FFJDA est **incluse** dans votre cotisation annuelle.\n\n💡 Elle vous couvre pour la pratique et les compétitions officielles, et inclut une assurance responsabilité civile et une garantie individuelle accident.`
  },

  /* --- Bienfaits / Santé -------------------------------------------------- */
  {
    id: 'bienfaits',
    patterns: [
      'bienfait', 'bienfaits', 'santé', 'sante', 'bénéfice', 'bénéfices',
      'bien-être', 'bien être', 'condition physique', 'souplesse', 'réflexes',
      'confiance en soi', 'anti-stress', 'maigrir', 'minceur', 'perdre du poids',
      'coordination', 'pourquoi pratiquer', 'avantage', 'avantages',
      'bénéfices du sport', 'bienfaits du sport', 'apports du jujitsu'
    ],
    response: `💪 **Les bienfaits du Jujitsu :**\n\n🏃 **Physiques :**\n• Améliore la condition physique et la souplesse\n• Développe la coordination et les réflexes\n• Excellent remède anti-stress\n\n🧠 **Mentaux :**\n• Renforce la confiance en soi\n• Améliore l'estime de soi\n• Discipline et dépassement de soi\n\n👥 **Sociaux :**\n• Ambiance conviviale et familiale\n• Mixité des niveaux et des âges\n• Intégration dans une communauté soudée\n\n👉 [5 bonnes raisons de pratiquer](${AJJ_CONFIG.urlRaisons})`
  },

  /* --- Comité directeur / Bureau ----------------------------------------- */
  {
    id: 'comite',
    patterns: [
      'comite', 'bureau', 'benevole', 'équipe',
      'dirigeant', 'président', 'tresorier', 'secretaire', 'responsable',
      'encadrant', 'encadrement', 'sensei', 'enseignant', 'instructeur',
      'professeur', 'prof', 'qui enseigne',
      'comité directeur', 'equipe dirigeante', 'membres du club'
    ],
    response: `👥 **L'équipe du club AJJ :**\n\n🏛️ **Le Bureau** — composé de bénévoles élus en assemblée générale :\n• Président, Vice-Président, Trésorier, Secrétaire, Membres actifs\n\n🥋 **L'équipe technique** — enseignants diplômés d'État :\n• Ils assurent la progression de chaque adhérent en toute sécurité\n\n🤝 **Bénévolat** : Le club recherche des bénévoles motivés — [nous contacter](mailto:${AJJ_CONFIG.email}) pour s'impliquer.\n\n👉 [Notre comité directeur](${AJJ_CONFIG.urlComite})`
  },

  /* --- Réseaux sociaux ---------------------------------------------------- */
  {
    id: 'reseaux',
    patterns: [
      'facebook', 'instagram', 'youtube', 'réseau', 'réseaux', 'reseau',
      'reseaux', 'social', 'sociaux', 'page', 'follow', 'suivre', 'abonner',
      'vidéo', 'video', 'chaîne', 'chaine', 'publication', 'post', 'story'
    ],
    response: `📱 **Suivez-nous sur les réseaux sociaux :**\n\n👍 **Facebook :** [Club Asnières Jujitsu](${AJJ_CONFIG.facebook})\n📸 **Instagram :** [@le_club_asnieres_ju_jitsu](${AJJ_CONFIG.instagram})\n🎬 **YouTube :** [Notre chaîne](${AJJ_CONFIG.youtube})\n\nRetrouvez actualités, photos et vidéos de nos entraînements et événements !`
  },

  /* --- Paiement ----------------------------------------------------------- */
  {
    id: 'paiement',
    patterns: [
      'paiement', 'payer', 'moyen de paiement', 'chèque', 'cheque',
      'cb', 'carte bancaire', 'virement', 'chèque-vacances', 'cheque-vacances',
      'coupon-sport', 'pass sport', 'caf', 'pass+', 'facilité de paiement'
    ],
    response: `💳 **Moyens de paiement acceptés :**\n\n✅ CB (paiement en ligne)\n✅ Chèques\n✅ Chèques-vacances\n✅ Coupons-sport\n✅ PASS+\n✅ PASS'SPORT\n✅ Aides de la CAF\n\n💡 De nombreuses aides sont disponibles pour réduire le coût de l'inscription. N'hésitez pas à nous contacter pour plus d'informations !\n\n✉️ [${AJJ_CONFIG.email}](mailto:${AJJ_CONFIG.email})`
  },

  /* --- Blog / Actualités -------------------------------------------------- */
  {
    id: 'blog',
    patterns: [
      'blog', 'actualité', 'actualités', 'actualite', 'news', 'article',
      'articles', 'publication', 'lire', 'résultat tournoi', 'conseil',
      'conseils', 'astuce', 'astuces', 'nouveauté', 'nouveautés'
    ],
    response: `📰 **Blog & Actualités du club :**\n\nRetrouvez sur notre blog :\n• Les **résultats** de nos tournois et compétitions\n• Des **conseils** pour progresser en Jujitsu\n• Les **actualités** et événements du club\n\n👉 [Voir tous les articles](${AJJ_CONFIG.urlBlog})\n\nDerniers articles publiés :\n• *Résultats du tournoi — juin 2025*\n• *5 conseils pour progresser en Jujitsu*\n• *Bienvenue sur notre nouveau site !*`
  },

  /* --- FAQ ---------------------------------------------------------------- */
  {
    id: 'faq',
    patterns: [
      'faq', 'questions fréquentes', 'question fréquente', 'questions frequentes',
      'foire aux questions', 'toutes les questions', 'réponse',
      'réponses', 'en savoir plus', 'trouver une réponse'
    ],
    response: `❓ **FAQ — Questions fréquentes :**\n\nNotre [page FAQ](${AJJ_CONFIG.urlFaq}) répond aux questions les plus courantes :\n\n• Quels styles de Jujitsu sont pratiqués ?\n• Y a-t-il des cours pour débutants ?\n• Quel est l'âge minimum ?\n• Comment s'inscrire ?\n• Quels moyens de paiement ?\n• Peut-on passer les grades au club ?\n\n👉 [Consulter la FAQ complète](${AJJ_CONFIG.urlFaq})`
  },

  /* --- Aide / Menu des sujets --------------------------------------------- */
  {
    id: 'aide',
    patterns: [
      '^aide$', '^help$', 'menu', 'sujets', 'que puis-je demander', 'que pouvez-vous',
      'que peux-tu', 'que sais-tu', 'informations disponibles', 'topics',
      'options', 'liste des sujets', 'tous les sujets'
    ],
    response: `🗺️ **Voici les sujets sur lesquels je peux vous aider :**\n\n🥋 **Le Jujitsu** — histoire, techniques, styles pratiqués\n🕐 **Horaires** — mardi, jeudi, samedi\n💶 **Tarifs** — adulte, mineur, ceinture noire, remise en forme\n📝 **Inscription** — en ligne ou au dojo\n📍 **Adresse** — Gymnase Laura Flessel, Asnières\n👶 **Âge minimum** — à partir de 12 ans\n👘 **Matériel** — kimono, équipement\n🎖️ **Grades** — passages de ceintures\n💪 **Bienfaits** — santé, bien-être\n🏃 **Remise en forme** — cours du samedi\n📱 **Réseaux sociaux** — Facebook, Instagram, YouTube\n📬 **Contact** — email et formulaire\n\nTapez votre question ou cliquez sur un bouton ci-dessous !`
  },

  /* --- Merci / Appréciation ----------------------------------------------- */
  {
    id: 'merci',
    patterns: [
      'merci', 'super', 'excellent', 'parfait', 'génial', 'top', 'cool',
      'impeccable', 'nickel', 'bravo', 'très bien', 'bien', 'ok merci',
      'thanks', 'thank you', 'd accord', 'compris', 'noté'
    ],
    response: `😊 **Avec plaisir !** N'hésitez pas à poser d'autres questions.\n\nÀ bientôt sur les tatamis du club **Asnières Jujitsu** ! 🥋\n\n*« Travailler sérieusement sans se prendre au sérieux »*`
  },

  /* --- Au revoir ---------------------------------------------------------- */
  {
    id: 'aurevoir',
    patterns: [
      'au revoir', 'aurevoir', 'à bientôt', 'bientôt', 'bye', 'ciao',
      'bonne nuit', 'bonne soirée fin', 'adieu', 'à plus', 'a plus',
      'tchao', 'bonne continuation'
    ],
    response: `👋 **À bientôt !** N'hésitez pas à revenir si vous avez d'autres questions.\n\nOn espère vous voir bientôt sur nos tatamis ! 🥋\n\n✉️ [${AJJ_CONFIG.email}](mailto:${AJJ_CONFIG.email})`
  }

];

/* ── § RÉPONSES DE REPLI ─────────────────────────────────────────────────────
   Trois réponses en rotation pour les questions sans correspondance.
   L'index _repliIndex persiste entre les appels (module-level).
   ─────────────────────────────────────────────────────────────────────────── */
const REPONSES_REPLI = [
  `🤔 Je n'ai pas bien compris votre question. Essayez de demander les **horaires**, les **tarifs**, l'**adresse** ou l'**inscription**. Tapez **aide** pour voir tous les sujets.`,
  `❓ Désolé, je ne suis pas sûr de comprendre. Vous pouvez me poser des questions sur le **Jujitsu**, les **cours**, les **grades** ou le **contact**. Tapez **aide** pour la liste complète.`,
  `🤷 Ce sujet dépasse mes connaissances ! Pour une question précise, contactez-nous directement : [${AJJ_CONFIG.email}](mailto:${AJJ_CONFIG.email}). Sinon, tapez **aide** pour voir tous les sujets disponibles.`
];

let _repliIndex = 0; // Compteur de rotation pour les réponses de repli

/* ── § BOUTONS DE RACCOURCI ──────────────────────────────────────────────────
   Cinq boutons proposés sous la zone de messages pour faciliter la navigation.
   ─────────────────────────────────────────────────────────────────────────── */
const RACCOURCIS = [
  { label: '🕐 Horaires',    message: 'Quels sont les horaires des cours ?' },
  { label: '💶 Tarifs',      message: 'Quels sont les tarifs ?' },
  { label: '📝 Inscription', message: 'Comment s\'inscrire ?' },
  { label: '📍 Adresse',     message: 'Où se trouve le dojo ?' },
  { label: '🥋 Jujitsu',    message: 'Qu\'est-ce que le Jujitsu ?' }
];

/* ── § MOTEUR DE CORRESPONDANCE ──────────────────────────────────────────────
   Stratégie à trois niveaux (identique à l'implémentation de référence) :
     Niveau 1 — Regex brute  : patterns préfixés par '^'
     Niveau 2 — Sous-chaîne  : patterns contenant une espace (multi-mots)
     Niveau 3 — Mot entier   : patterns simples avec ancres \b...\b
   ─────────────────────────────────────────────────────────────────────────── */
function _ajjTrouverReponse(messageUtilisateur) {
  // Normaliser : minuscules + supprimer les espaces en début/fin
  const msg = messageUtilisateur.toLowerCase().trim();

  for (const entree of KNOWLEDGE_BASE) {
    if (entree.patterns.some(function (p) {

      // Niveau 1 : regex brute (pattern débutant par '^')
      if (p.startsWith('^')) {
        return new RegExp(p, 'i').test(msg);
      }

      // Niveau 2 : sous-chaîne multi-mots (pattern contenant une espace)
      if (p.includes(' ')) {
        return msg.includes(p);
      }

      // Niveau 3 : correspondance au mot entier avec \b (word boundary)
      return new RegExp(
        '\\b' + p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b',
        'i'
      ).test(msg);

    })) {
      return entree.response; // Première correspondance gagne
    }
  }

  // Aucune correspondance — réponse de repli en rotation
  const repli = REPONSES_REPLI[_repliIndex % REPONSES_REPLI.length];
  _repliIndex++;
  return repli;
}

/* ── § RENDU MARKDOWN LÉGER ─────────────────────────────────────────────────
   Convertit le balisage léger des réponses en HTML sûr.
   Uniquement appliqué aux messages du BOT — les saisies utilisateur
   sont toujours insérées via textContent (protection XSS).
   ─────────────────────────────────────────────────────────────────────────── */
function _ajjRendreMarkdown(texte) {
  return texte
    // **gras**
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // *italique*
    .replace(/\*([^*\n]+?)\*/g, '<em>$1</em>')
    // [texte](https://url)
    .replace(
      /\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
    )
    // [texte](mailto:email)
    .replace(
      /\[([^\]]+)\]\((mailto:[^\)]+)\)/g,
      '<a href="$2">$1</a>'
    )
    // Retour à la ligne
    .replace(/\n/g, '<br>');
}

/* ── § INTERFACE UTILISATEUR (IIFE) ─────────────────────────────────────────
   Construit et injecte tout le DOM, les styles CSS et les écouteurs d'événements
   en une seule exécution au chargement du script.
   Aucune structure HTML préexistante n'est requise.
   ─────────────────────────────────────────────────────────────────────────── */
(function buildChatbotUI() {

  /* ---------- Injection des styles CSS (scoped) ---------- */
  var style = document.createElement('style');
  style.textContent = `
    /* ── Bouton flottant (FAB) ── */
    #ajj-chat-fab {
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: var(--accent-color, #e94560);
      color: #fff;
      border: none;
      cursor: pointer;
      font-size: 1.6rem;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 18px rgba(233,69,96,0.45);
      z-index: 9000;
      transition: background .2s, transform .2s;
    }
    #ajj-chat-fab:hover { background: #c73652; transform: scale(1.08); }
    #ajj-chat-fab:focus-visible { outline: 3px solid var(--accent-color, #e94560); outline-offset: 3px; }

    /* Badge "nouveau message" */
    .ajj-fab-badge {
      position: absolute;
      top: -3px;
      right: -3px;
      background: #fff;
      color: var(--accent-color, #e94560);
      border-radius: 50%;
      width: 20px;
      height: 20px;
      font-size: .7rem;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid var(--accent-color, #e94560);
      pointer-events: none;
    }

    /* ── Fenêtre de chat ── */
    #ajj-chat-window {
      position: fixed;
      bottom: 6rem;
      right: 2rem;
      width: 370px;
      max-width: calc(100vw - 2rem);
      height: 540px;
      max-height: calc(100vh - 120px);
      background: var(--white, #fff);
      border-radius: 16px;
      box-shadow: 0 8px 40px rgba(0,0,0,0.18);
      display: flex;
      flex-direction: column;
      z-index: 8999;
      overflow: hidden;
      transition: opacity .22s ease, transform .22s ease;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
    #ajj-chat-window.ajj-hidden {
      opacity: 0;
      pointer-events: none;
      transform: translateY(14px) scale(.96);
    }

    /* ── En-tête ── */
    .ajj-chat-header {
      background: var(--primary-color, #1a1a2e);
      color: #fff;
      padding: .85rem 1rem;
      display: flex;
      align-items: center;
      gap: .7rem;
      flex-shrink: 0;
    }
    .ajj-chat-avatar {
      font-size: 1.6rem;
      flex-shrink: 0;
    }
    .ajj-chat-header-info { flex: 1; min-width: 0; }
    .ajj-chat-header-name {
      font-weight: 700;
      font-size: .95rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .ajj-chat-header-status {
      font-size: .75rem;
      opacity: .75;
      margin-top: 2px;
    }
    .ajj-chat-close {
      background: transparent;
      border: none;
      color: rgba(255,255,255,.7);
      font-size: 1.2rem;
      cursor: pointer;
      padding: .25rem .4rem;
      border-radius: 6px;
      flex-shrink: 0;
      transition: color .15s, background .15s;
    }
    .ajj-chat-close:hover { color: #fff; background: rgba(255,255,255,.12); }
    .ajj-chat-close:focus-visible { outline: 2px solid rgba(255,255,255,.6); outline-offset: 2px; }

    /* ── Zone de messages ── */
    .ajj-chat-messages {
      flex: 1;
      overflow-y: auto;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: .55rem;
      scroll-behavior: smooth;
    }
    .ajj-chat-messages::-webkit-scrollbar { width: 5px; }
    .ajj-chat-messages::-webkit-scrollbar-track { background: transparent; }
    .ajj-chat-messages::-webkit-scrollbar-thumb { background: #ddd; border-radius: 3px; }

    /* ── Bulles de message ── */
    .ajj-msg {
      max-width: 88%;
      padding: .55rem .85rem;
      border-radius: 14px;
      font-size: .875rem;
      line-height: 1.55;
      word-break: break-word;
    }
    .ajj-msg--bot {
      background: var(--light-gray, #f8f9fa);
      color: var(--text-color, #333);
      align-self: flex-start;
      border-bottom-left-radius: 4px;
    }
    .ajj-msg--user {
      background: var(--accent-color, #e94560);
      color: #fff;
      align-self: flex-end;
      border-bottom-right-radius: 4px;
    }
    .ajj-msg a {
      color: var(--accent-color, #e94560);
      text-decoration: underline;
    }
    .ajj-msg--user a { color: #fff; }

    /* ── Indicateur "en train d'écrire" ── */
    .ajj-typing-dots {
      display: inline-flex;
      gap: 4px;
      align-items: center;
      padding: 2px 0;
    }
    .ajj-typing-dots span {
      width: 7px;
      height: 7px;
      background: var(--gray, #666);
      border-radius: 50%;
      animation: ajj-dot .9s infinite ease-in-out;
    }
    .ajj-typing-dots span:nth-child(2) { animation-delay: .2s; }
    .ajj-typing-dots span:nth-child(3) { animation-delay: .4s; }
    @keyframes ajj-dot {
      0%, 60%, 100% { transform: translateY(0); opacity:.5; }
      30%           { transform: translateY(-5px); opacity:1; }
    }

    /* ── Boutons de raccourci ── */
    .ajj-quick-replies {
      padding: .5rem .75rem;
      display: flex;
      flex-wrap: wrap;
      gap: .4rem;
      border-top: 1px solid #eee;
      background: #fafafa;
      flex-shrink: 0;
    }
    .ajj-quick-btn {
      background: #fff;
      border: 1.5px solid var(--accent-color, #e94560);
      color: var(--accent-color, #e94560);
      border-radius: 20px;
      padding: .28rem .72rem;
      font-size: .78rem;
      cursor: pointer;
      transition: background .15s, color .15s;
      white-space: nowrap;
    }
    .ajj-quick-btn:hover {
      background: var(--accent-color, #e94560);
      color: #fff;
    }
    .ajj-quick-btn:focus-visible {
      outline: 2px solid var(--accent-color, #e94560);
      outline-offset: 2px;
    }

    /* ── Formulaire de saisie ── */
    .ajj-chat-form {
      display: flex;
      padding: .65rem .75rem;
      gap: .5rem;
      border-top: 1px solid #eee;
      background: #fff;
      flex-shrink: 0;
    }
    .ajj-chat-input {
      flex: 1;
      border: 1.5px solid #ddd;
      border-radius: 22px;
      padding: .45rem .9rem;
      font-size: .875rem;
      outline: none;
      font-family: inherit;
      transition: border-color .15s;
      color: var(--text-color, #333);
      background: #fff;
    }
    .ajj-chat-input:focus { border-color: var(--accent-color, #e94560); }
    .ajj-chat-input::placeholder { color: #aaa; }
    .ajj-chat-send {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background: var(--accent-color, #e94560);
      border: none;
      color: #fff;
      font-size: 1rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      transition: background .15s, transform .15s;
    }
    .ajj-chat-send:hover { background: #c73652; transform: scale(1.08); }
    .ajj-chat-send:focus-visible { outline: 2px solid var(--accent-color, #e94560); outline-offset: 2px; }

    /* ── Responsive mobile (< 420px) ── */
    @media (max-width: 420px) {
      #ajj-chat-window { right: .5rem; left: .5rem; width: auto; bottom: 5rem; }
      #ajj-chat-fab    { bottom: 1rem; right: 1rem; }
    }
  `;
  document.head.appendChild(style);

  /* ---------- Bouton flottant (FAB) ---------- */
  var fab = document.createElement('button');
  fab.id = 'ajj-chat-fab';
  fab.setAttribute('aria-label', 'Ouvrir l\'assistant du club');
  fab.setAttribute('aria-expanded', 'false');
  fab.setAttribute('aria-controls', 'ajj-chat-window');
  fab.innerHTML = '<span aria-hidden="true">💬</span><span class="ajj-fab-badge" aria-label="1 nouveau message">1</span>';
  document.body.appendChild(fab);

  /* ---------- Fenêtre de chat ---------- */
  var chatWindow = document.createElement('div');
  chatWindow.id = 'ajj-chat-window';
  chatWindow.setAttribute('role', 'dialog');
  chatWindow.setAttribute('aria-label', 'Assistant virtuel Asnières Jujitsu');
  chatWindow.classList.add('ajj-hidden');
  chatWindow.innerHTML = `
    <div class="ajj-chat-header">
      <div class="ajj-chat-avatar" aria-hidden="true">🤖</div>
      <div class="ajj-chat-header-info">
        <div class="ajj-chat-header-name">Assistant AJJ</div>
        <div class="ajj-chat-header-status">● En ligne · Posez votre question</div>
      </div>
      <button class="ajj-chat-close" aria-label="Fermer le chat">✕</button>
    </div>
    <div class="ajj-chat-messages" id="ajj-chat-messages"
         role="log" aria-live="polite" aria-label="Messages du chat"></div>
    <div class="ajj-quick-replies" id="ajj-quick-replies"></div>
    <form class="ajj-chat-form" id="ajj-chat-form" autocomplete="off" novalidate>
      <input type="text" class="ajj-chat-input" id="ajj-chat-input"
             maxlength="200"
             placeholder="Posez votre question…"
             aria-label="Saisir votre message" />
      <button type="submit" class="ajj-chat-send" aria-label="Envoyer le message">➤</button>
    </form>
  `;
  document.body.appendChild(chatWindow);

  /* ---------- Références DOM ---------- */
  var messagesEl = document.getElementById('ajj-chat-messages');
  var inputEl    = document.getElementById('ajj-chat-input');
  var formEl     = document.getElementById('ajj-chat-form');
  var closeBtn   = chatWindow.querySelector('.ajj-chat-close');
  var quickEl    = document.getElementById('ajj-quick-replies');

  /* ---------- Rendu des boutons de raccourci ---------- */
  RACCOURCIS.forEach(function (rc) {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'ajj-quick-btn';
    btn.textContent = rc.label;
    btn.addEventListener('click', function () {
      envoyerMessage(rc.message);
    });
    quickEl.appendChild(btn);
  });

  /* ---------- Fonctions d'état ---------- */

  /** Ouvre la fenêtre de chat */
  function ouvrirChat() {
    chatWindow.classList.remove('ajj-hidden');
    fab.setAttribute('aria-expanded', 'true');
    // Supprimer le badge "nouveau message" définitivement
    var badge = fab.querySelector('.ajj-fab-badge');
    if (badge) badge.remove();
    // Message de bienvenue si la zone est vide
    if (!messagesEl.firstChild) afficherBienvenue();
    inputEl.focus();
  }

  /** Ferme la fenêtre de chat */
  function fermerChat() {
    chatWindow.classList.add('ajj-hidden');
    fab.setAttribute('aria-expanded', 'false');
    fab.focus();
  }

  /** Affiche le message de bienvenue initial */
  function afficherBienvenue() {
    ajouterMessage(
      `👋 **Bonjour !** Je suis l'assistant virtuel du club **Asnières Jujitsu**.\n\nJe peux répondre à vos questions sur les cours, les tarifs, les horaires, l'inscription, et plus encore.\n\nUtilisez les boutons ci-dessous ou tapez directement votre question ! 😊`,
      'bot'
    );
  }

  /** Affiche l'indicateur « en train d'écrire » */
  function afficherEcriture() {
    var el = document.createElement('div');
    el.id = 'ajj-ecriture';
    el.className = 'ajj-msg ajj-msg--bot';
    el.innerHTML = '<span class="ajj-typing-dots"><span></span><span></span><span></span></span>';
    messagesEl.appendChild(el);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  /** Supprime l'indicateur « en train d'écrire » */
  function supprimerEcriture() {
    var el = document.getElementById('ajj-ecriture');
    if (el) el.remove();
  }

  /** Ajoute une bulle de message dans la zone de chat */
  function ajouterMessage(texte, role) {
    var el = document.createElement('div');
    el.className = 'ajj-msg ajj-msg--' + role;
    if (role === 'bot') {
      // Les réponses du bot supportent le markdown léger → innerHTML
      el.innerHTML = _ajjRendreMarkdown(texte);
    } else {
      // La saisie utilisateur est toujours en textContent (protection XSS)
      el.textContent = texte;
    }
    messagesEl.appendChild(el);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  /** Traite l'envoi d'un message (depuis le formulaire ou un raccourci) */
  function envoyerMessage(texteExplicite) {
    var texte = (texteExplicite !== undefined ? texteExplicite : inputEl.value).trim();
    if (!texte) return;

    // Vider le champ si le message vient du clavier
    if (texteExplicite === undefined) inputEl.value = '';

    // Afficher le message de l'utilisateur
    ajouterMessage(texte, 'user');

    // Simuler un délai de réponse naturel (550 ms)
    afficherEcriture();
    setTimeout(function () {
      supprimerEcriture();
      var reponse = _ajjTrouverReponse(texte);
      ajouterMessage(reponse, 'bot');
    }, 550);
  }

  /* ---------- Écouteurs d'événements ---------- */

  // Ouvrir/fermer via le FAB
  fab.addEventListener('click', function () {
    if (chatWindow.classList.contains('ajj-hidden')) {
      ouvrirChat();
    } else {
      fermerChat();
    }
  });

  // Fermer via le bouton ✕ dans l'en-tête
  closeBtn.addEventListener('click', fermerChat);

  // Fermer via la touche Échap
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !chatWindow.classList.contains('ajj-hidden')) {
      fermerChat();
    }
  });

  // Envoi du formulaire
  formEl.addEventListener('submit', function (e) {
    e.preventDefault();
    envoyerMessage();
  });

})(); // Fin du IIFE buildChatbotUI
