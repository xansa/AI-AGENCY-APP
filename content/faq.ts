export interface FAQItem {
  question: string;
  question_en: string;
  answer: string;
  answer_en: string;
  category?: string;
  category_en?: string;
}

export const faqItems: FAQItem[] = [
  {
    question: "Wat kost jullie dienstverlening?",
    question_en: "What does your service cost?",
    answer:
      "Onze packages beginnen vanaf \u20AC1.000 per maand. Starter (websites + SEO): vanaf \u20AC1.000/mnd. Professional (+ AI + branding): vanaf \u20AC2.750/mnd. Enterprise (alle 6 diensten): vanaf \u20AC5.500/mnd. Vergelijk dat met een fulltime digitale medewerker: die kost al snel \u20AC3.000\u2013\u20AC5.000/mnd all-in.",
    answer_en:
      "Our packages start from \u20AC1,000 per month. Starter (websites + SEO): from \u20AC1,000/mo. Professional (+ AI + branding): from \u20AC2,750/mo. Enterprise (all 6 services): from \u20AC5,500/mo. Compare that to a full-time digital employee: easily \u20AC3,000\u2013\u20AC5,000/mo all-in.",
    category: "Investering",
    category_en: "Investment",
  },
  {
    question: "Kan ik stoppen wanneer ik wil?",
    question_en: "Can I cancel whenever I want?",
    answer:
      "Het Starter pakket heeft een minimale looptijd van 3 maanden, daarna maandelijks opzegbaar. Professional en Enterprise hebben een minimale looptijd van 6 maanden, daarna maandelijks opzegbaar. We werken bewust met een minimale periode omdat resultaten tijd nodig hebben. Niet omdat we je willen vasthouden.",
    answer_en:
      "The Starter package has a minimum term of 3 months, then monthly cancellable. Professional and Enterprise have a minimum term of 6 months, then monthly cancellable. We deliberately work with a minimum period because results take time. Not to lock you in.",
    category: "Contract",
    category_en: "Contract",
  },
  {
    question: "Garanderen jullie resultaten?",
    question_en: "Do you guarantee results?",
    answer:
      "Nee, en pas op voor partijen die dat wel doen. Resultaten hangen af van jouw markt, product en timing. Wat ik wel garandeer: volledige transparantie over wat ik doe, regelmatige rapportages, en dooroptimaliseren totdat het werkt.",
    answer_en:
      "No, and be cautious of parties who do. Results depend on your market, product, and timing. What I do guarantee: full transparency about what I do, regular reports, and continuous optimization until it works.",
    category: "Resultaten",
    category_en: "Results",
  },
  {
    question: "Hoe snel zie ik de eerste resultaten?",
    question_en: "How quickly will I see results?",
    answer:
      "Dat verschilt per dienst. Een website is doorgaans in 2\u20134 weken klaar. Een AI chatbot in 1\u20132 weken. SEO-resultaten bouwen zich op in 2\u20133 maanden. Dashboards en automatiseringen: 2\u20133 weken.",
    answer_en:
      "That varies per service. A website is typically ready in 2\u20134 weeks. An AI chatbot in 1\u20132 weeks. SEO results build up over 2\u20133 months. Dashboards and automations: 2\u20133 weeks.",
    category: "Resultaten",
    category_en: "Results",
  },
  {
    question: "Wie blijft de eigenaar van de content en systemen?",
    question_en: "Who retains ownership of the content and systems?",
    answer:
      "Jij. Alle websites, code, content, designs en automatiseringen zijn van jou. Als je stopt met samenwerken, lever ik alles netjes over. Ik bouw niets waar je van afhankelijk bent.",
    answer_en:
      "You do. All websites, code, content, designs and automations are yours. If you stop working with us, I hand everything over. I never build anything that locks you in.",
    category: "Ownership",
    category_en: "Ownership",
  },
  {
    question: "Moeten we zelf nog iets doen?",
    question_en: "Do we need to do anything ourselves?",
    answer:
      "Minimaal. Bij de start vraag ik om een kennismakingsgesprek van 1\u20132 uur. Daarna is jouw tijdsinvestering minder dan 1 uur per week voor feedback en goedkeuringen.",
    answer_en:
      "Minimal. At the start I ask for an introductory meeting of 1\u20132 hours. After that, your time investment is less than 1 hour per week for feedback and approvals.",
    category: "Werkwijze",
    category_en: "Process",
  },
  {
    question: "Voor welk type bedrijf werkt Arka?",
    question_en: "What type of business is Arka for?",
    answer:
      "MKB-bedrijven, ZZP'ers en scale-ups die hun digitale aanwezigheid willen professionaliseren. Van lokale ondernemers in de regio Dordrecht tot B2B-bedrijven die landelijk opereren. Bij de kennismaking ben ik eerlijk als ik denk dat ik niet de juiste fit ben.",
    answer_en:
      "SMBs, freelancers and scale-ups looking to professionalize their digital presence. From local entrepreneurs in the Dordrecht area to B2B companies operating nationwide. During the introduction I'm honest if I don't think we're the right fit.",
    category: "Geschiktheid",
    category_en: "Suitability",
  },
  {
    question: "Hoe ziet het onboardingproces eruit?",
    question_en: "What does the onboarding process look like?",
    answer:
      "Week 1: kennismakingsgesprek en strategiesessie. Week 2\u20133: opzet en eerste oplevering. Week 4: review, feedback en bijsturing. Daarna draaien we in een vast maandelijks ritme.",
    answer_en:
      "Week 1: introductory meeting and strategy session. Weeks 2\u20133: setup and first delivery. Week 4: review, feedback and adjustment. After that we run on a fixed monthly rhythm.",
    category: "Werkwijze",
    category_en: "Process",
  },
  {
    question: "Werken jullie met vaste contracten?",
    question_en: "Do you work with fixed contracts?",
    answer:
      "Ik werk met maandelijkse facturen, geen jaarcontract. Wel een minimale looptijd (zie vraag over stoppen). Geen verborgen kosten of opzegboetes.",
    answer_en:
      "I work with monthly invoices, no annual contract. There is a minimum term (see the question about cancelling). No hidden costs or cancellation fees.",
    category: "Contract",
    category_en: "Contract",
  },
  {
    question: "Wat maakt Arka anders dan andere bureaus?",
    question_en: "What makes Arka different from other agencies?",
    answer:
      "Drie dingen: (1) Je werkt direct met de persoon die het werk doet, geen tussenlagen of juniors. (2) De breedte van een compleet digitaal team, zonder de overhead van een groot bureau. (3) Alles is meetbaar: elke actie is gekoppeld aan een concreet resultaat.",
    answer_en:
      "Three things: (1) You work directly with the person doing the work, no middlemen or juniors. (2) The breadth of a complete digital team, without the overhead of a large agency. (3) Everything is measurable: every action is linked to a concrete result.",
    category: "Positionering",
    category_en: "Positioning",
  },
  {
    question: "Kan ik eerst iets kleins proberen?",
    question_en: "Can I start with something small?",
    answer:
      "Ja, plan een gratis kennismakingsgesprek (30 minuten). Daarna beslissen we samen of en hoe we samenwerken. Er is geen verplichting.",
    answer_en:
      "Yes, schedule a free introductory call (30 minutes). After that we decide together if and how we'll work together. No obligations.",
    category: "Investering",
    category_en: "Investment",
  },
  {
    question: "Hoe bereikbaar is Arka?",
    question_en: "How accessible is Arka?",
    answer:
      "Direct via e-mail (info@arkadigital.nl) of telefoon (+31 6 46140986). Je werkt altijd met dezelfde persoon, geen doorverwijzingen. Enterprise-klanten hebben prioriteit support met een reactietijd van < 4 uur op werkdagen.",
    answer_en:
      "Directly via email (info@arkadigital.nl) or phone (+31 6 46140986). You always work with the same person, no referrals. Enterprise clients have priority support with a response time of < 4 hours on business days.",
    category: "Werkwijze",
    category_en: "Process",
  },
  {
    question: "Hoe werkt Arka zo effici\u00EBnt met een klein team?",
    question_en: "How does Arka work so efficiently with a small team?",
    answer:
      "Door slim gebruik te maken van moderne tools en automatisering. Alles wordt persoonlijk gereviewed en goedgekeurd. De strategie, het oordeel en de klantrelatie zijn altijd menselijk. De kwaliteit bewaak ik zelf.",
    answer_en:
      "By making smart use of modern tools and automation. Everything is personally reviewed and approved. Strategy, judgment and the client relationship are always human. I personally ensure quality.",
    category: "Werkwijze",
    category_en: "Process",
  },
  {
    question: "Wat als het niet werkt?",
    question_en: "What if it doesn't work?",
    answer:
      "Dan analyseren we de data, passen de aanpak aan en testen nieuwe oplossingen. Ik stop nooit zomaar met optimaliseren. Als het na 3 maanden echt niet de juiste fit is, be\u00EBindigen we de samenwerking in goed overleg en lever ik alles over.",
    answer_en:
      "Then we analyze the data, adjust the approach and test new solutions. I never just stop optimizing. If after 3 months it's really not the right fit, we end the collaboration amicably and I hand everything over.",
    category: "Resultaten",
    category_en: "Results",
  },
];
