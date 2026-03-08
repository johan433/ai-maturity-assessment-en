/* ============================================= */
/* AI Maturity Assessment — Question Definitions */
/* ============================================= */

const ROUTING_QUESTION = {
  id: 'q1',
  section: 'Current AI Usage',
  text: 'Has your organisation already implemented AI?',
  type: 'single',
  options: [
    { value: 'novice',       label: 'No, we have not carried out any AI projects so far.' },
    { value: 'intermediate', label: 'Yes, we have started with initial pilots.' },
    { value: 'expert',       label: 'Yes, AI is integrated into some of our business processes.' }
  ]
};

/* -------------------------------------------------- */
/*  NOVICE — 12 follow-up questions                    */
/* -------------------------------------------------- */
const NOVICE_QUESTIONS = [
  {
    id: 'n2', section: 'AI Potential & Strategic Vision',
    text: 'If AI were free and easy to implement, how would you use it in your organisation?',
    type: 'multi',
    options: [
      { value: 'datenanalyse',      label: 'Data Analysis & Reporting' },
      { value: 'prozessauto',       label: 'Process Automation (e.g. invoice processing, data entry)' },
      { value: 'kundenkommunikation', label: 'Customer Communication & Chatbots' },
      { value: 'qualitaet',         label: 'Quality Control & Defect Detection' },
      { value: 'lieferkette',       label: 'Supply Chain & Inventory Optimisation' },
      { value: 'hr',                label: 'HR & Recruiting (e.g. CV analysis)' },
      { value: 'betrug',            label: 'Fraud Detection & Compliance' },
      { value: 'marketing',         label: 'Marketing & Personalisation' },
      { value: 'maintenance',       label: 'Predictive Maintenance' },
      { value: 'produktentwicklung', label: 'Product Development & Innovation' },
      { value: 'sonstiges',         label: 'Other', hasTextInput: true }
    ]
  },
  {
    id: 'n3', section: 'Organisational Direction',
    text: 'How important is AI for your business strategy over the next 3 years?',
    type: 'stars', maxStars: 5
  },
  {
    id: 'n4', section: 'Data Infrastructure',
    text: 'Which statement best describes your organisation\'s current data infrastructure?',
    type: 'single',
    options: [
      { value: 1, label: 'We do not collect or store structured data.' },
      { value: 2, label: 'We have some structured data, but it is not centralised or standardised.' },
      { value: 3, label: 'We have a well-managed data infrastructure with clear governance.' }
    ]
  },
  {
    id: 'n5', section: 'Leadership Support',
    text: 'Leadership Buy-in',
    type: 'compound',
    subQuestions: [
      {
        id: 'n5a',
        text: 'How would you describe leadership support for AI initiatives in your organisation?',
        type: 'stars', maxStars: 5
      },
      {
        id: 'n5b',
        text: 'Do you have clarity on AI direction from leadership, particularly regarding communication, resources and capacity?',
        type: 'single',
        options: [
          { value: 1, label: 'Support is sporadic and unpredictable.' },
          { value: 2, label: 'We have full support for dedicated projects.' },
          { value: 3, label: 'We have full support and can start discovering the areas with the greatest potential.' }
        ]
      }
    ]
  },
  {
    id: 'n6', section: 'Technical Readiness',
    text: 'Which statement best describes your organisation\'s technical readiness to adopt AI?',
    type: 'single',
    options: [
      { value: 1, label: 'We have no internal AI expertise or IT resources for AI projects.' },
      { value: 2, label: 'We have an IT team but no specific AI expertise.' },
      { value: 3, label: 'We have specialised talent in AI or Data Science.' }
    ]
  },
  {
    id: 'n7', section: 'AI Awareness & Training',
    text: 'What AI-related learning initiatives and knowledge sharing exist in your organisation?',
    type: 'single',
    options: [
      { value: 1, label: 'None.' },
      { value: 2, label: 'Some employees have attended AI-related conferences or webinars.' },
      { value: 3, label: 'We offer structured internal AI training programmes.' },
      { value: 4, label: 'We collaborate with universities or research institutions for AI knowledge exchange.' },
      { value: 5, label: 'We have a cross-functional AI initiative that explores, learns and disseminates knowledge across the organisation.' }
    ]
  },
  {
    id: 'n8', section: 'Industry Benchmark',
    text: 'How do you rate your AI readiness compared to your competitors?',
    type: 'single',
    options: [
      { value: 1, label: 'We are behind our competitors in AI adoption.' },
      { value: 2, label: 'We are roughly on par with our competitors.' },
      { value: 3, label: 'We are ahead of our competitors in AI adoption.' },
      { value: 0, label: 'We don\'t know how far our competitors have progressed with AI.' }
    ]
  },
  {
    id: 'n9', section: 'Budget Considerations',
    text: 'If AI were to be introduced in your organisation, what would be the biggest financial hurdle?',
    type: 'single',
    options: [
      { value: 1, label: 'We have no budget allocated for AI.' },
      { value: 2, label: 'We lack a clear understanding of AI ROI to justify investments.' },
      { value: 3, label: 'We invest in technology, but AI is not a priority.' }
    ]
  },
  {
    id: 'n10', section: 'Perceived AI Risks',
    text: 'What are the main concerns preventing AI adoption in your organisation?',
    type: 'multi',
    options: [
      { value: 'use_cases',    label: 'Lack of clear use cases.' },
      { value: 'kosten',       label: 'High implementation costs.' },
      { value: 'regulierung',  label: 'Regulatory or compliance concerns.' },
      { value: 'expertise',    label: 'Lack of internal expertise.' },
      { value: 'auswirkungen', label: 'Uncertainty about the business impact of AI.' },
      { value: 'vertraulich',  label: 'Uncertainty about protecting confidential content.' }
    ]
  },
  {
    id: 'n11', section: 'Readiness for AI Experimentation',
    text: 'How would you rate your organisation\'s readiness to experiment with AI in the next 12 months?',
    type: 'stars', maxStars: 5
  },
  {
    id: 'n12', section: 'Regulatory Knowledge',
    text: 'How familiar is your organisation with AI regulations such as the EU AI Act?',
    type: 'single',
    options: [
      { value: 1, label: 'Not familiar at all.' },
      { value: 2, label: 'We have heard of AI regulations but have no compliance strategy.' },
      { value: 3, label: 'We actively monitor and prepare for AI regulations.' }
    ]
  },
  {
    id: 'n13', section: 'Potential for AI Use Cases',
    text: 'How clearly can your organisation define potential AI use cases?',
    type: 'stars', maxStars: 5
  }
];

/* -------------------------------------------------- */
/*  INTERMEDIATE — 12 follow-up questions              */
/* -------------------------------------------------- */
const INTERMEDIATE_QUESTIONS = [
  {
    id: 'i2', section: 'Key Challenges in AI Adoption',
    text: 'AI Adoption: Success & Challenges',
    type: 'compound',
    subQuestions: [
      {
        id: 'i2a',
        text: 'How successful has AI adoption been so far?',
        type: 'stars', maxStars: 5
      },
      {
        id: 'i2b',
        text: 'What challenges have you encountered in adopting AI?',
        type: 'multi',
        options: [
          { value: 'einsatzfelder',    label: 'Unclear areas of application' },
          { value: 'widerstand',       label: 'Resistance and scepticism' },
          { value: 'budget',           label: 'Lack of budget and/or resources' },
          { value: 'kompetenzen',      label: 'Lack of AI competencies' },
          { value: 'unterstuetzung',   label: 'Lack of support' },
          { value: 'mehrwerte',        label: 'Lack of awareness of benefits' },
          { value: 'kommunikation',    label: 'Lack of communication' },
          { value: 'risikenwissen',    label: 'Lack of knowledge about risks' },
          { value: 'sonstige',         label: 'Other', hasTextInput: true }
        ]
      }
    ]
  },
  {
    id: 'i3', section: 'Current AI Use Cases',
    text: 'Which of the following AI applications has your organisation already experimented with?',
    type: 'multi',
    options: [
      { value: 'agenten',        label: 'AI Agents' },
      { value: 'generative',     label: 'Generative AI (Chatbots & Virtual Assistants)' },
      { value: 'predictive',     label: 'Data-Driven Forecasting (Predictive Analytics)' },
      { value: 'prozessauto',    label: 'Process Automation' },
      { value: 'computervision', label: 'AI-Powered Image Recognition (Computer Vision)' },
      { value: 'betrug',         label: 'Intelligent Fraud Detection & Risk Analysis' },
      { value: 'empfehlung',     label: 'Intelligent Recommendation Logic & Systems' },
      { value: 'keine',          label: 'We have not conducted any AI experiments yet.' }
    ]
  },
  {
    id: 'i4', section: 'AI Data Maturity',
    text: 'How well prepared is your organisation\'s data for AI projects?',
    type: 'single',
    options: [
      { value: 1, label: 'We lack the necessary structured data for AI.' },
      { value: 2, label: 'Our data is partially structured, but improvements are needed.' },
      { value: 3, label: 'We have high-quality, well-managed data that is AI-ready.' }
    ]
  },
  {
    id: 'i5', section: 'AI Development Process',
    text: 'How are AI projects currently developed in your organisation?',
    type: 'single',
    options: [
      { value: 1, label: 'Ad-hoc experiments without a structured approach.' },
      { value: 2, label: 'AI projects are handled within IT or data teams but lack strategic alignment.' },
      { value: 3, label: 'We follow a structured framework for AI development and governance.' }
    ]
  },
  {
    id: 'i6', section: 'Scaling AI',
    text: 'How would you rate your organisation\'s ability to scale AI experiments?',
    type: 'stars', maxStars: 5
  },
  {
    id: 'i7', section: 'Leadership Support',
    text: 'How strong is leadership in supporting AI projects beyond the experimentation phase?',
    type: 'stars', maxStars: 5
  },
  {
    id: 'i8', section: 'AI Governance & Compliance',
    text: 'What level of AI governance exists in your organisation?',
    type: 'single',
    options: [
      { value: 1, label: 'No formal AI governance policies.' },
      { value: 2, label: 'Some ethical guidelines but no dedicated governance team.' },
      { value: 3, label: 'Dedicated AI governance team with clear policies and risk management.' }
    ]
  },
  {
    id: 'i9', section: 'AI Talent & Capabilities',
    text: 'What internal AI capabilities does your organisation currently possess?',
    type: 'single',
    options: [
      { value: 1, label: 'No internal AI engineers.' },
      { value: 2, label: 'Data Scientists but no dedicated AI engineers.' },
      { value: 3, label: 'AI engineers but limited deployment experience.' },
      { value: 4, label: 'AI experts working in collaboration with business units.' },
      { value: 5, label: 'AI team with extensive experience in production AI systems.' }
    ]
  },
  {
    id: 'i10', section: 'AI Technology Stack',
    text: 'Which AI-related technologies does your organisation use?',
    type: 'multi',
    options: [
      { value: 'keine',      label: 'No specific AI technologies in use.' },
      { value: 'onpremise',  label: 'On-premise AI infrastructure.' },
      { value: 'cloud',      label: 'Cloud-based AI platforms.' },
      { value: 'opensource',  label: 'Open-source AI frameworks.' },
      { value: 'automl',     label: 'Automated ML platforms (AutoML).' }
    ]
  },
  {
    id: 'i11', section: 'Measuring Success',
    text: 'How effectively does your organisation measure the success of AI pilot projects?',
    type: 'stars', maxStars: 5
  },
  {
    id: 'i12', section: 'Budget & Investment',
    text: 'What is the primary challenge in securing AI funding for scalable projects?',
    type: 'single',
    options: [
      { value: 1, label: 'Leadership is not convinced of the ROI of AI.' },
      { value: 2, label: 'AI projects compete with other business priorities for funding.' },
      { value: 3, label: 'Lack of AI business cases with measurable financial benefits.' },
      { value: 4, label: 'We have dedicated AI investments but need clearer scaling strategies.' }
    ]
  },
  {
    id: 'i13', section: 'AI Experiment Use Cases',
    text: 'How well defined are the AI use cases your organisation is currently testing?',
    type: 'stars', maxStars: 5
  }
];

/* -------------------------------------------------- */
/*  EXPERT — 9 follow-up questions                     */
/* -------------------------------------------------- */
const EXPERT_QUESTIONS = [
  {
    id: 'e2', section: 'Measuring AI Success',
    text: 'How does your organisation measure the success of AI initiatives?',
    type: 'multi',
    options: [
      { value: 'finanziell',      label: 'Financial impact' },
      { value: 'produktivitaet',  label: 'Employee productivity' },
      { value: 'kundenerfahrung', label: 'Customer experience' },
      { value: 'strategisch',     label: 'Strategic contribution' }
    ]
  },
  {
    id: 'e3', section: 'AI Integration in Business Processes',
    text: 'How well is AI integrated into your organisation\'s core processes?',
    type: 'stars', maxStars: 5
  },
  {
    id: 'e4', section: 'Data Infrastructure for AI',
    text: 'What best describes your organisation\'s data infrastructure for AI operations?',
    type: 'single',
    options: [
      { value: 1, label: 'Data is fragmented and not centralised.' },
      { value: 2, label: 'Structured data available but needs adjustments for AI use.' },
      { value: 3, label: 'Centralised, high-quality data infrastructure.' },
      { value: 4, label: 'Integrated data pipelines optimised for real-time AI operations.' }
    ]
  },
  {
    id: 'e5', section: 'Measuring AI ROI',
    text: 'How does your organisation measure the Return on Investment (ROI) of AI projects?',
    type: 'single',
    options: [
      { value: 1, label: 'We do not measure AI ROI.' },
      { value: 2, label: 'We track cost savings and efficiency gains from AI.' },
      { value: 3, label: 'AI success is measured by revenue impact and customer experience.' },
      { value: 4, label: 'AI ROI is linked to strategic business objectives and company-wide KPIs.' }
    ]
  },
  {
    id: 'e6', section: 'AI Compliance & Ethics',
    text: 'What AI compliance and ethics considerations does your organisation follow?',
    type: 'single',
    options: [
      { value: 1, label: 'No formal AI ethics policy.' },
      { value: 2, label: 'AI models are checked for bias but not systematically audited.' },
      { value: 3, label: 'AI projects comply with GDPR, the EU AI Act or similar regulations.' },
      { value: 4, label: 'AI ethics and compliance are integrated into governance frameworks.' }
    ]
  },
  {
    id: 'e7', section: 'Continuous Improvement',
    text: 'How mature is your process for continuously improving AI models?',
    type: 'stars', maxStars: 5
  },
  {
    id: 'e8', section: 'Workforce Training',
    text: 'What initiatives for upskilling employees in AI exist?',
    type: 'single',
    options: [
      { value: 1, label: 'No AI upskilling initiatives.' },
      { value: 2, label: 'Basic AI awareness training for employees.' },
      { value: 3, label: 'AI training available only for technical staff.' },
      { value: 4, label: 'Company-wide AI literacy programmes for all employees.' }
    ]
  },
  {
    id: 'e9', section: 'AI Vendors & Cloud Usage',
    text: 'Where does your organisation primarily deploy AI models?',
    type: 'single',
    options: [
      { value: 1, label: 'On-premise infrastructure.' },
      { value: 2, label: 'Hybrid (on-premise and cloud).' },
      { value: 3, label: 'Cloud-based AI platforms (AWS, Azure, Google Cloud).' },
      { value: 4, label: 'Fully outsourced AI solutions via third-party providers.' }
    ]
  },
  {
    id: 'e10', section: 'AI Risk Management',
    text: 'How effectively does your organisation manage AI-related risks?',
    type: 'stars', maxStars: 5
  }
];

/* -------------------------------------------------- */
/*  Helper: get questions for a maturity path          */
/* -------------------------------------------------- */
function getQuestionsForPath(path) {
  switch (path) {
    case 'novice':       return NOVICE_QUESTIONS;
    case 'intermediate': return INTERMEDIATE_QUESTIONS;
    case 'expert':       return EXPERT_QUESTIONS;
    default:             return [];
  }
}

function getPathLabel(path) {
  switch (path) {
    case 'novice':       return 'Novice';
    case 'intermediate': return 'Intermediate';
    case 'expert':       return 'Expert';
    default:             return path;
  }
}

function getPathEmoji(path) {
  switch (path) {
    case 'novice':       return '\uD83D\uDFE1';
    case 'intermediate': return '\uD83D\uDFE0';
    case 'expert':       return '\uD83D\uDFE2';
    default:             return '\u26AA';
  }
}
