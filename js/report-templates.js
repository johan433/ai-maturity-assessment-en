/* ============================================= */
/* AI Maturity Assessment — Report Templates     */
/* English template text + report generation     */
/* ============================================= */

// =====================
// Path Descriptions
// =====================
const PATH_DESCRIPTIONS = {
  novice: {
    title: 'Novice',
    emoji: '\uD83D\uDFE1',
    description: 'Your organisation is at the beginning of its AI journey. You have not yet implemented any AI projects, but there is valuable potential to be discovered. Many organisations are in this phase — the crucial step is to start building knowledge and conducting initial experiments.',
    peerIntro: 'Your results are compared with other participants who are also in the novice phase. This allows you to see where you stand compared to similarly positioned organisations.',
    nextSteps: [
      'Build a foundational understanding of AI across the organisation — e.g. through workshops or webinars.',
      'Identify 2–3 concrete use cases where AI could deliver the greatest value.',
      'Assess your data infrastructure and begin structuring your data.',
      'Secure leadership support and define an initial AI pilot project.',
      'Familiarise yourself with relevant AI regulations (e.g. EU AI Act) and their implications.'
    ]
  },
  intermediate: {
    title: 'Intermediate',
    emoji: '\uD83D\uDFE0',
    description: 'Your organisation has already taken initial steps towards AI and begun pilot projects. You are at a critical phase: transitioning from experiments to systematic scaling requires clear processes, governance and leadership support.',
    peerIntro: 'Your results are compared with other participants who are also in the intermediate phase — organisations that have already conducted initial AI pilots.',
    nextSteps: [
      'Develop a structured framework for AI governance, including ethical guidelines.',
      'Create measurable KPIs for your AI pilot projects to demonstrate ROI.',
      'Invest in building internal AI competencies and upskilling existing teams.',
      'Scale successful pilot projects into operational deployment.',
      'Establish regular communication about AI progress to leadership.'
    ]
  },
  expert: {
    title: 'Expert',
    emoji: '\uD83D\uDFE2',
    description: 'Your organisation has already integrated AI into business processes and has extensive experience. In this phase, the focus is on continuously optimising AI systems, systematically measuring ROI and ensuring a sustainable AI strategy for the future.',
    peerIntro: 'Your results are compared with other participants who also deploy AI operationally. This comparison shows where your organisation stands among the most advanced adopters.',
    nextSteps: [
      'Embed AI metrics firmly into your company-wide KPIs and strategic processes.',
      'Invest in continuous model improvement and MLOps practices.',
      'Ensure company-wide AI literacy — not just within technical teams.',
      'Build a robust AI risk management and compliance framework.',
      'Regularly evaluate new AI technologies and approaches for strategic advantage.'
    ]
  }
};

// =====================
// Dimension Interpretations
// =====================
// Each scored dimension gets low/mid/high interpretation text.
// Keys match question IDs from questions.js.

const DIMENSION_INTERPRETATIONS = {
  // ---- NOVICE ----
  n3: {
    label: 'Strategic Importance of AI',
    low: 'AI currently has a low strategic priority in your organisation. This may mean that other business areas take precedence or that the potential of AI has not yet been fully recognised.',
    mid: 'AI is recognised as relevant to your business strategy but is not yet firmly anchored in corporate planning. There is room to integrate AI more strongly into strategic considerations.',
    high: 'AI is a central component of your future strategy. Your organisation recognises the transformative potential of AI and is actively planning with it.'
  },
  n4: {
    label: 'Data Infrastructure',
    low: 'Your data infrastructure is barely existent or unstructured. Without a solid data foundation, it is difficult to implement AI projects successfully.',
    mid: 'You have basic data structures that are not yet optimally organised. Improving data management would significantly facilitate AI initiatives.',
    high: 'Your data infrastructure is well positioned and provides a solid foundation for AI projects.'
  },
  n5a: {
    label: 'Leadership Support',
    low: 'Leadership shows little commitment to AI initiatives. Without top-level support, it is difficult to secure resources and budget for AI projects.',
    mid: 'There is basic leadership support, but no clear strategic prioritisation of AI yet.',
    high: 'Leadership is fully behind AI initiatives and actively supports the necessary investments.'
  },
  n5b: {
    label: 'Clarity of AI Direction',
    low: 'AI direction from leadership is unclear and sporadic. Consistent communication and resource allocation are lacking.',
    mid: 'There is clear support for individual projects, but an overarching AI vision is still missing.',
    high: 'Leadership has communicated a clear AI vision and provides resources for exploration.'
  },
  n6: {
    label: 'Technical Readiness',
    low: 'There is no internal AI expertise or dedicated IT resources. Building technical capacity is an important first step.',
    mid: 'You have an IT team but no specific AI expertise. Targeted upskilling or external partnerships could close this gap.',
    high: 'Your organisation has specialised AI or Data Science talent.'
  },
  n7: {
    label: 'AI Awareness & Training',
    low: 'There are no AI-related learning initiatives. Awareness of AI capabilities is limited.',
    mid: 'Initial steps towards AI education have been taken, but a structured programme is lacking.',
    high: 'Your organisation actively invests in AI education and knowledge sharing.'
  },
  n8: {
    label: 'Industry Benchmark',
    low: 'You assess your AI readiness as below average compared to your industry.',
    mid: 'You are at a similar level to your competitors.',
    high: 'You see yourself as a frontrunner in AI adoption in your industry.'
  },
  n9: {
    label: 'Budget Readiness',
    low: 'There is no dedicated budget for AI. Financial hurdles are a significant barrier.',
    mid: 'The ROI of AI is still unclear, which makes investments difficult. Clear business case development could help.',
    high: 'Investments are already being made in technology, even if AI is not yet the highest priority.'
  },
  n11: {
    label: 'Experimentation Readiness',
    low: 'Willingness to experiment with AI is low. Possible causes could be uncertainty or lack of resources.',
    mid: 'There is some openness to AI experimentation, but no clear roadmap yet.',
    high: 'Your organisation is ready and motivated to experiment with AI in the near future.'
  },
  n12: {
    label: 'Regulatory Knowledge',
    low: 'AI regulations such as the EU AI Act are still unknown. It is important to familiarise yourself with them early.',
    mid: 'You have heard of AI regulations but lack a concrete compliance strategy.',
    high: 'Your organisation actively monitors and proactively prepares for AI regulations.'
  },
  n13: {
    label: 'Use Case Clarity',
    low: 'Your organisation struggles to define concrete AI use cases. A structured discovery workshop could help.',
    mid: 'There are initial ideas for AI use cases, but they are not yet clearly developed.',
    high: 'Your organisation can clearly define where AI would deliver the greatest value.'
  },

  // ---- INTERMEDIATE ----
  i2a: {
    label: 'AI Adoption Success',
    low: 'AI adoption so far is rated as not very successful. It is worth analysing the causes and adjusting the approach.',
    mid: 'AI adoption shows mixed results. Some projects were successful, others less so.',
    high: 'AI adoption so far is rated as very successful — a strong foundation for scaling.'
  },
  i4: {
    label: 'AI Data Maturity',
    low: 'Data is not yet prepared for AI projects. Investments in data quality and structure are required.',
    mid: 'Data is partially structured but there is room for improvement for AI applications.',
    high: 'Your data is high-quality, well-managed and ready for AI projects.'
  },
  i5: {
    label: 'AI Development Process',
    low: 'AI projects are conducted ad hoc without a structured approach. A framework could help.',
    mid: 'AI projects are housed in IT teams but lack strategic alignment.',
    high: 'Your organisation follows a structured framework for AI development and governance.'
  },
  i6: {
    label: 'Scaling Capability',
    low: 'The ability to scale AI experiments is rated as low. The transition from pilots to operations is a key challenge.',
    mid: 'There are initial approaches to scaling, but the process is not yet systematic.',
    high: 'Your organisation is well positioned to move AI experiments into production.'
  },
  i7: {
    label: 'Leadership Support',
    low: 'Leadership barely supports AI projects beyond the experimentation phase. Greater engagement is needed.',
    mid: 'There is basic leadership support, but long-term commitment is still lacking.',
    high: 'Leadership fully supports the scaling of AI projects.'
  },
  i8: {
    label: 'AI Governance',
    low: 'There are no formal AI governance policies. This can lead to risks during scaling.',
    mid: 'Initial ethical guidelines exist, but a dedicated governance team is missing.',
    high: 'Your organisation has a dedicated AI governance team with clear policies.'
  },
  i9: {
    label: 'AI Talent',
    low: 'Internal AI engineers are lacking. Building or recruiting talent is crucial.',
    mid: 'There are Data Scientists or AI engineers, but experience in production deployment is limited.',
    high: 'Your organisation has experienced AI experts who work closely with business units.'
  },
  i11: {
    label: 'Success Measurement',
    low: 'The success of AI pilot projects is barely measured. Without clear metrics, it is hard to demonstrate the value of AI.',
    mid: 'There are initial approaches to success measurement, but systematic practice is missing.',
    high: 'Your organisation effectively measures the success of AI projects and can demonstrate ROI.'
  },
  i12: {
    label: 'Budget & Investment',
    low: 'Leadership is not convinced of the ROI of AI. Stronger business cases are required.',
    mid: 'AI projects compete with other priorities. Clearer scaling strategies could help.',
    high: 'There are dedicated AI investments with clear scaling strategies.'
  },
  i13: {
    label: 'Use Case Definition',
    low: 'AI use cases are still poorly defined. Clearer prioritisation would help.',
    mid: 'There are defined use cases, but their evaluation and prioritisation could be improved.',
    high: 'Your AI use cases are clearly defined, prioritised and ready for scaling.'
  },

  // ---- EXPERT ----
  e3: {
    label: 'AI Integration',
    low: 'AI is not yet deeply integrated into core processes. There is potential for stronger embedding.',
    mid: 'AI is integrated into some processes, but end-to-end integration is still pending.',
    high: 'AI is comprehensively integrated into your organisation\'s core processes.'
  },
  e4: {
    label: 'Data Infrastructure for AI',
    low: 'Data is fragmented. Consolidation and centralisation are necessary for advanced AI operations.',
    mid: 'Structured data is available, but adjustments for AI operations are required.',
    high: 'Your data infrastructure is centralised and optimised for real-time AI operations.'
  },
  e5: {
    label: 'AI ROI Measurement',
    low: 'AI ROI is not systematically measured. This makes it difficult to strategically justify AI investments.',
    mid: 'Cost savings and efficiency gains from AI are tracked, but measurement could be more comprehensive.',
    high: 'AI ROI is linked to strategic business objectives and company-wide KPIs.'
  },
  e6: {
    label: 'AI Compliance & Ethics',
    low: 'There is no formal AI ethics policy. Given your maturity level, this is an important area for development.',
    mid: 'AI models are checked for bias or comply with regulatory requirements, but systematic integration is still missing.',
    high: 'AI ethics and compliance are fully integrated into your governance frameworks.'
  },
  e7: {
    label: 'Continuous Improvement',
    low: 'Processes for continuously improving AI models are not yet established.',
    mid: 'There are initial approaches to model improvement, but the process is not yet fully mature.',
    high: 'Your organisation has mature processes for continuously optimising AI models.'
  },
  e8: {
    label: 'Workforce Training',
    low: 'There are no AI upskilling initiatives. This can limit acceptance and effective use of AI.',
    mid: 'AI training is available but not accessible to all employees.',
    high: 'Company-wide AI literacy programmes ensure that all employees understand and can use AI.'
  },
  e9: {
    label: 'AI Infrastructure & Cloud',
    low: 'AI models are deployed exclusively on-premise. Cloud or hybrid solutions could improve flexibility and scalability.',
    mid: 'A hybrid or cloud-based infrastructure is in use but still offers optimisation potential.',
    high: 'Your AI infrastructure is modern and optimally tailored to your requirements.'
  },
  e10: {
    label: 'AI Risk Management',
    low: 'AI-related risks are barely actively managed. Structured risk management is essential for expert-level maturity.',
    mid: 'There are initial approaches to AI risk management, but the process could be more systematic.',
    high: 'Your organisation manages AI-related risks effectively and proactively.'
  }
};

// =====================
// Report Generation
// =====================

/**
 * Generate a structured report for one participant.
 * @param {Object} response — the participant's response document
 * @param {Array} peerResponses — all responses from same maturity path in this session
 * @returns {Object} report data ready for rendering
 */
function generateReport(response, peerResponses) {
  const path = response.path;
  const pathDesc = PATH_DESCRIPTIONS[path];
  const questions = getQuestionsForPath(path);

  // 1. Get individual dimension scores
  const individualDimensions = getDimensionScores(response.answers, path);

  // 2. Calculate peer averages for each dimension
  const peerDimensionAverages = individualDimensions.map((dim, i) => {
    const peerVals = peerResponses.map(pr => {
      const peerDims = getDimensionScores(pr.answers, pr.path);
      const match = peerDims[i];
      return match ? (match.score / match.max) * 5 : null;
    }).filter(v => v !== null);

    const avg = peerVals.length > 0
      ? peerVals.reduce((a, b) => a + b, 0) / peerVals.length
      : 0;

    return avg;
  });

  // 3. Build dimension report entries
  const dimensionEntries = individualDimensions.map((dim, i) => {
    const normalized = (dim.score / dim.max) * 5;
    const peerAvg = peerDimensionAverages[i];
    const delta = normalized - peerAvg;
    const interp = DIMENSION_INTERPRETATIONS[dim.id];

    let level, interpText;
    if (normalized <= 2) {
      level = 'low';
      interpText = interp ? interp.low : '';
    } else if (normalized <= 3.5) {
      level = 'mid';
      interpText = interp ? interp.mid : '';
    } else {
      level = 'high';
      interpText = interp ? interp.high : '';
    }

    return {
      id: dim.id,
      label: interp ? interp.label : dim.label,
      score: parseFloat(normalized.toFixed(2)),
      peerAvg: parseFloat(peerAvg.toFixed(2)),
      delta: parseFloat(delta.toFixed(2)),
      level,
      interpretation: interpText
    };
  });

  // 4. Sort for strengths and growth areas
  const sorted = [...dimensionEntries].sort((a, b) => b.score - a.score);
  const strengths = sorted.slice(0, 3);
  const growthAreas = sorted.slice(-3).reverse(); // lowest 3, worst first

  // 5. Overall scores
  const individualScore = parseFloat(response.maturityScore || calculateMaturityScore(response.answers, path));
  const peerScores = peerResponses.map(pr => parseFloat(pr.maturityScore || 0));
  const peerAvgScore = peerScores.length > 0
    ? parseFloat((peerScores.reduce((a, b) => a + b, 0) / peerScores.length).toFixed(2))
    : 0;

  return {
    respondentName: response.respondentName,
    email: response.email,
    path,
    pathDescription: pathDesc,
    individualScore,
    peerAvgScore,
    peerCount: peerResponses.length,
    dimensions: dimensionEntries,
    strengths,
    growthAreas,
    createdAt: response.createdAt
  };
}
