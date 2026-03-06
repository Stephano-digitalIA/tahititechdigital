import type { ServiceCard, MetricCard, SolutionPanel, PillarCard, WhyCard, FaqItem, ContactCard } from '@/types'

export const SERVICES_DATA: ServiceCard[] = [
  {
    id: 'ai',
    icon: '🤖',
    colorVariant: 'violet',
    title: 'Automatisation IA',
    tag: 'Workflows & Intelligence Artificielle',
    description: "Automatisez vos processus métier avec n8n, Make et l'IA. De la facturation aux réponses clients, tout fonctionne en pilote automatique.",
    features: [
      'Workflows n8n sur mesure',
      'Réponses automatiques IA (email, chat)',
      'Génération de documents automatisée',
      'Intégrations API & connecteurs',
    ],
  },
  {
    id: 'web',
    icon: '🌐',
    colorVariant: 'blue',
    title: 'Développement Web & Marketplace',
    tag: 'React · Supabase · Architecture moderne',
    description: 'Sites vitrine, applications web et plateformes marketplace avec des technologies modernes, performantes et évolutives.',
    features: [
      'Sites web React / TypeScript',
      'Marketplace multi-vendeurs',
      'Backend Supabase sécurisé',
      'Hébergement & maintenance inclus',
    ],
  },
  {
    id: 'ecom',
    icon: '🛒',
    colorVariant: 'cyan',
    title: 'E-commerce & Paiement en Ligne',
    tag: 'Boutiques · PayPal · Intégrations',
    description: "Créez votre boutique en ligne avec gestion de stock, paiements sécurisés et expérience d'achat optimale pour vos clients.",
    features: [
      'Boutiques e-commerce complètes',
      'Intégration PayPal & paiements',
      'Gestion produits & stocks',
      "Interface multilingue (jusqu'à 9 langues)",
    ],
  },
  {
    id: 'consulting',
    icon: '📋',
    colorVariant: 'pink',
    title: 'Consulting Digital & Transformation',
    tag: 'Stratégie · Formation · Accompagnement',
    description: 'Audit stratégique, feuille de route digitale et accompagnement personnalisé pour accélérer votre transformation numérique.',
    features: [
      'Audit & feuille de route digitale',
      'Formation équipes & adoption',
      'Tableaux de bord & KPI',
      'Gestion du changement',
    ],
  },
]

export const METRICS_DATA: MetricCard[] = [
  { id: 'productivity', icon: '⚡', target: 85, suffix: '%', label: 'Gain de productivité' },
  { id: 'roi', icon: '💰', target: 3, suffix: 'x', label: 'ROI moyen' },
  { id: 'time', icon: '📅', target: 7, suffix: 'j', label: 'Délai de mise en œuvre' },
  { id: 'satisfaction', icon: '🎯', target: 100, suffix: '%', label: 'Satisfaction clients' },
]

export const SOLUTIONS_DATA: SolutionPanel[] = [
  {
    id: 'ecommerce',
    tabLabel: '🛒 E-commerce',
    title: 'Boutique e-commerce performante',
    description:
      'Vendez vos produits en ligne avec une boutique moderne, multilingue, intégrée PayPal et optimisée pour convertir. De la perle de Tahiti aux produits locaux.',
    stats: [
      { value: '9 langues', label: 'Interface multilingue' },
      { value: '+45%', label: 'Conversion moyenne' },
    ],
    ctaText: 'Créer ma boutique →',
    mockupHtml: `<div class="mockup-line"><span class="comment">// E-commerce Stack</span></div>
<div class="mockup-line"><span class="keyword">framework</span>: <span class="string">"React + TypeScript"</span></div>
<div class="mockup-line"><span class="keyword">backend</span>: <span class="string">"Supabase"</span></div>
<div class="mockup-line"><span class="keyword">payment</span>: <span class="func">PayPal.checkout</span>()</div>
<div class="mockup-line"><span class="keyword">i18n</span>: [<span class="string">"fr"</span>, <span class="string">"en"</span>, <span class="string">"zh"</span>, ...]</div>
<div class="mockup-line"><span class="keyword">features</span>: {</div>
<div class="mockup-line">&nbsp;&nbsp;catalog: <span class="string">"produits illimités"</span>,</div>
<div class="mockup-line">&nbsp;&nbsp;seo: <span class="string">"optimisé"</span>,</div>
<div class="mockup-line">&nbsp;&nbsp;analytics: <span class="string">"temps réel"</span></div>
<div class="mockup-line">}</div>`,
  },
  {
    id: 'facturation',
    tabLabel: '📄 Facturation',
    title: 'Facturation automatique intelligente',
    description:
      'Générez, envoyez et suivez vos factures automatiquement. Intégration comptable, rappels de paiement et tableaux de bord financiers en temps réel.',
    stats: [
      { value: '95%', label: 'Réduction des erreurs' },
      { value: '2h/jour', label: 'Temps économisé' },
    ],
    ctaText: 'Automatiser mes factures →',
    mockupHtml: `<div class="mockup-line"><span class="comment">// Auto-facturation</span></div>
<div class="mockup-line"><span class="keyword">trigger</span>: <span class="string">"prestation_terminée"</span></div>
<div class="mockup-line"><span class="func">générerFacture</span>({</div>
<div class="mockup-line">&nbsp;&nbsp;client: <span class="string">"auto-détecté"</span>,</div>
<div class="mockup-line">&nbsp;&nbsp;montant: <span class="func">calculer</span>(prestations),</div>
<div class="mockup-line">&nbsp;&nbsp;tva: <span class="string">"conforme PF"</span></div>
<div class="mockup-line">})</div>
<div class="mockup-line"><span class="func">envoyerEmail</span>(client)</div>
<div class="mockup-line"><span class="func">rappelPaiement</span>(<span class="string">"J+30"</span>)</div>
<div class="mockup-line"><span class="keyword">status</span>: <span class="string">"✅ Facture envoyée"</span></div>`,
  },
  {
    id: 'marketplace',
    tabLabel: '🏗️ Marketplace',
    title: 'Marketplace multi-vendeurs',
    description:
      'Lancez votre plateforme de mise en relation : BTP, services, commerce. Architecture scalable, gestion des prestataires et paiements intégrés.',
    stats: [
      { value: 'Multi-secteur', label: 'BTP, Digital, Services' },
      { value: 'Scalable', label: 'Architecture évolutive' },
    ],
    ctaText: 'Lancer ma marketplace →',
    mockupHtml: `<div class="mockup-line"><span class="comment">// Marketplace Platform</span></div>
<div class="mockup-line"><span class="keyword">database</span>: <span class="string">"Supabase PostgreSQL"</span></div>
<div class="mockup-line"><span class="keyword">auth</span>: <span class="func">GoogleOAuth</span>() + <span class="func">Email</span>()</div>
<div class="mockup-line"><span class="keyword">modules</span>: {</div>
<div class="mockup-line">&nbsp;&nbsp;vendors: <span class="string">"profils vérifiés"</span>,</div>
<div class="mockup-line">&nbsp;&nbsp;search: <span class="string">"filtres avancés"</span>,</div>
<div class="mockup-line">&nbsp;&nbsp;booking: <span class="string">"réservation intégrée"</span>,</div>
<div class="mockup-line">&nbsp;&nbsp;reviews: <span class="string">"avis clients"</span></div>
<div class="mockup-line">}</div>
<div class="mockup-line"><span class="keyword">deploy</span>: <span class="func">Netlify</span>() + <span class="func">VPS</span>()</div>`,
  },
]

export const PILLAR_CARDS_DATA: PillarCard[] = [
  {
    id: 'local',
    icon: '🏝️',
    title: 'Expertise Locale',
    description: 'Nous comprenons les défis uniques des entreprises polynésiennes et adaptons nos solutions au contexte local.',
  },
  {
    id: 'innovation',
    icon: '⚡',
    title: 'Innovation Technique',
    description: "Technologies de pointe en IA et automatisation, développées spécifiquement pour les PME du Pacifique.",
  },
  {
    id: 'ai',
    icon: '🧠',
    title: 'IA Adaptative',
    description: "Nos systèmes apprennent et s'améliorent continuellement pour optimiser vos processus métier.",
  },
  {
    id: 'human',
    icon: '🤝',
    title: 'Accompagnement Humain',
    description: 'Support personnalisé à chaque étape de votre transformation digitale.',
  },
]

export const WHY_CARDS_DATA: WhyCard[] = [
  {
    id: 'savings',
    icon: '💰',
    title: 'Économies Garanties',
    description: "Réduisez vos coûts opérationnels au maximum grâce à l'automatisation de vos processus répétitifs.",
  },
  {
    id: 'speed',
    icon: '🚀',
    title: "Rapidité d'Exécution",
    description: "Déploiement rapide avec des résultats visibles dès la première semaine. Pas de projets qui traînent.",
  },
  {
    id: 'support',
    icon: '🎓',
    title: 'Accompagnement Personnalisé',
    description: 'Support continu et formation de vos équipes pour une adoption réussie des nouvelles technologies.',
  },
]

export const FAQS_DATA: FaqItem[] = [
  {
    id: 'faq1',
    question: "Comment l'IA en entreprise permet-elle d'automatiser les tâches chronophages ?",
    answer:
      "L'IA analyse vos processus répétitifs et crée des workflows automatisés via des outils comme n8n. Par exemple, elle peut répondre automatiquement aux messages clients, générer des factures, mettre à jour des tableaux de bord ou synchroniser des calendriers — le tout sans intervention humaine. Cela libère votre temps pour des tâches à plus forte valeur ajoutée.",
  },
  {
    id: 'faq2',
    question: "L'intégration de l'IA dans mon entreprise est-elle compliquée ?",
    answer:
      "Pas du tout ! Nous prenons en charge l'intégralité du processus : audit de vos besoins, développement de la solution, déploiement et formation de vos équipes. La plupart de nos solutions sont opérationnelles en moins de 7 jours. Aucune compétence technique n'est requise de votre côté.",
  },
  {
    id: 'faq3',
    question: "L'IA ne risque-t-elle pas de remplacer mes équipes ?",
    answer:
      "L'IA ne remplace pas vos collaborateurs — elle les libère des tâches répétitives pour qu'ils se concentrent sur ce qui compte vraiment : la relation client, la stratégie et la créativité. C'est un outil d'augmentation, pas de substitution.",
  },
  {
    id: 'faq4',
    question: 'Quel retour sur investissement (ROI) puis-je espérer ?',
    answer:
      "Nos clients constatent en moyenne un ROI de 3x sur leur investissement, avec une réduction significative du temps passé sur les tâches administratives (jusqu'à 85% de gain de productivité). Les premiers résultats sont visibles dès la première semaine de mise en service.",
  },
  {
    id: 'faq5',
    question: "Mon entreprise est-elle trop petite pour bénéficier de l'IA ?",
    answer:
      "Au contraire ! Les petites entreprises sont souvent celles qui bénéficient le plus de l'automatisation. Chaque heure gagnée a un impact direct sur votre activité. Nos solutions sont dimensionnées et tarifées pour les PME polynésiennes.",
  },
]

export const CONTACT_CARDS_DATA: ContactCard[] = [
  { id: 'location', icon: '📍', title: 'Localisation', lines: ['Polynésie française', 'Service dans toutes les îles'] },
  { id: 'phone', icon: '📞', title: 'Télé-consultation', lines: ['Rendez-vous en ligne', 'Support technique réactif'] },
  { id: 'email', icon: '✉️', title: 'Email', lines: ['contact@tahititechdigital.com', 'Réponse sous 4h ouvrées'] },
  { id: 'hours', icon: '🕐', title: 'Disponibilité', lines: ['Lun-Ven 8h-17h', 'Support urgent 24/7'] },
]

export const TECH_STACK = ['React', 'TypeScript', 'Supabase', 'n8n', 'Intelligence Artificielle', 'Cloud', 'APIs', 'PayPal']
