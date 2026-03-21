/* ============================================= */
/* AI Use Case Discovery — PPTX Export           */
/* Praelexis-branded presentation generator      */
/* ============================================= */

const PX = {
  darkBlue:  '1B3A5C',
  orange:    'E87722',
  lightBlue: '4A90D9',
  white:     'FFFFFF',
  lightGrey: 'F5F5F5',
  text:      '333333',
  textLight: '888888',
  green:     '059669',
  greenBg:   'ECFDF5',
  orangeBg:  'FDF2EC',
  blueBg:    'EDF4FB',
  greyBg:    'F4F5F6',
};

const CHART_COLORS = ['CE5928', '104984', '059669', '7C3AED', 'D97706', '0891B2', 'BE185D', '4F46E5', '16A34A', 'DC2626'];

/* ---- Slide Masters ---- */
function defineMasters(pptx) {
  pptx.defineSlideMaster({
    title: 'PX_TITLE',
    background: { color: PX.darkBlue },
    objects: [
      { rect: { x: 0, y: 6.95, w: 10, h: 0.06, fill: { color: PX.orange } } },
      { text: { text: 'Praelexis  |  AI Assessment Platform', options: { x: 0.5, y: 7.1, w: 5, h: 0.3, fontSize: 8, color: PX.lightBlue, fontFace: 'Arial' } } },
    ],
  });

  pptx.defineSlideMaster({
    title: 'PX_CONTENT',
    background: { color: PX.white },
    objects: [
      { rect: { x: 0, y: 0, w: 10, h: 0.04, fill: { color: PX.orange } } },
      { rect: { x: 0, y: 7.08, w: 10, h: 0.02, fill: { color: PX.darkBlue } } },
      { text: { text: 'Praelexis  |  AI Assessment Platform', options: { x: 0.5, y: 7.12, w: 5, h: 0.3, fontSize: 8, color: PX.textLight, fontFace: 'Arial' } } },
    ],
  });
}

/* ---- Helpers ---- */
function getPriorityLabel(feas, imp) {
  if (feas > 7.5 && imp > 7.5) return 'Quick Win';
  if (feas <= 7.5 && imp > 7.5) return 'Strategic Bet';
  if (feas > 7.5 && imp <= 7.5) return 'Long-term Bet';
  return 'Reconsider';
}

function getPriorityColor(label) {
  switch (label) {
    case 'Quick Win': return PX.green;
    case 'Strategic Bet': return PX.orange;
    case 'Long-term Bet': return PX.darkBlue;
    default: return PX.textLight;
  }
}

function truncate(str, max) {
  if (!str) return '';
  return str.length > max ? str.substring(0, max) + '...' : str;
}

function formatDateSimple(timestamp) {
  if (!timestamp) return new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
  const d = timestamp.toDate ? timestamp.toDate() : new Date(timestamp.seconds * 1000);
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
}

/* ---- Slide 1: Title ---- */
function addTitleSlide(pptx, session, totalIdeas, totalGroups) {
  const slide = pptx.addSlide({ masterName: 'PX_TITLE' });

  slide.addText('AI Use Case Discovery', {
    x: 0.5, y: 1.5, w: 9, h: 0.8,
    fontSize: 36, fontFace: 'Arial', bold: true, color: PX.white,
    align: 'center',
  });

  slide.addText(session.name || 'Assessment Results', {
    x: 0.5, y: 2.4, w: 9, h: 0.6,
    fontSize: 24, fontFace: 'Arial', color: PX.lightBlue,
    align: 'center',
  });

  slide.addText(session.organisation || '', {
    x: 0.5, y: 3.1, w: 9, h: 0.5,
    fontSize: 18, fontFace: 'Arial', color: PX.white,
    align: 'center',
  });

  // Stats line
  slide.addText(`${totalGroups} Groups  ·  ${totalIdeas} Ideas  ·  ${formatDateSimple(session.createdAt)}`, {
    x: 0.5, y: 4.2, w: 9, h: 0.4,
    fontSize: 14, fontFace: 'Arial', color: PX.lightBlue,
    align: 'center',
  });

  // Orange accent bar
  slide.addShape(pptx.shapes.RECTANGLE, {
    x: 3.5, y: 3.8, w: 3, h: 0.04,
    fill: { color: PX.orange },
  });
}

/* ---- Slide 2: Overview ---- */
function addOverviewSlide(pptx, allIdeas, submissions) {
  const slide = pptx.addSlide({ masterName: 'PX_CONTENT' });

  slide.addText('Session Overview', {
    x: 0.5, y: 0.2, w: 9, h: 0.5,
    fontSize: 24, fontFace: 'Arial', bold: true, color: PX.darkBlue,
  });

  const totalGroups = submissions.length;
  const totalIdeas = allIdeas.length;
  const totalMembers = new Set(submissions.flatMap(s => s.members || [])).size;
  const avgScore = allIdeas.length > 0
    ? (allIdeas.reduce((s, i) => s + (i.combinedScore || 0), 0) / allIdeas.length).toFixed(1)
    : 0;

  const quickWins = allIdeas.filter(i => getPriorityLabel(i.feasibility?.total || 0, i.impact?.total || 0) === 'Quick Win').length;
  const strategic = allIdeas.filter(i => getPriorityLabel(i.feasibility?.total || 0, i.impact?.total || 0) === 'Strategic Bet').length;

  // Stat cards
  const stats = [
    { val: totalGroups, label: 'Groups', color: PX.darkBlue },
    { val: totalIdeas, label: 'Ideas', color: PX.lightBlue },
    { val: totalMembers, label: 'Participants', color: PX.orange },
    { val: avgScore, label: 'Avg Score /30', color: PX.darkBlue },
  ];

  stats.forEach((s, i) => {
    const x = 0.5 + i * 2.35;
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x: x, y: 1.0, w: 2.1, h: 1.3,
      fill: { color: PX.lightGrey },
      rectRadius: 0.1,
    });
    slide.addText(String(s.val), {
      x: x, y: 1.1, w: 2.1, h: 0.7,
      fontSize: 32, fontFace: 'Arial', bold: true, color: s.color,
      align: 'center', valign: 'middle',
    });
    slide.addText(s.label, {
      x: x, y: 1.8, w: 2.1, h: 0.4,
      fontSize: 11, fontFace: 'Arial', color: PX.textLight,
      align: 'center', valign: 'top',
    });
  });

  // Group breakdown table
  slide.addText('Group Breakdown', {
    x: 0.5, y: 2.7, w: 9, h: 0.4,
    fontSize: 14, fontFace: 'Arial', bold: true, color: PX.darkBlue,
  });

  const tableRows = [
    [
      { text: 'Group', options: { bold: true, fontSize: 10, color: PX.white, fill: { color: PX.darkBlue } } },
      { text: 'Department', options: { bold: true, fontSize: 10, color: PX.white, fill: { color: PX.darkBlue } } },
      { text: 'Members', options: { bold: true, fontSize: 10, color: PX.white, fill: { color: PX.darkBlue } } },
      { text: 'Ideas', options: { bold: true, fontSize: 10, color: PX.white, fill: { color: PX.darkBlue } } },
    ]
  ];

  submissions.forEach(s => {
    tableRows.push([
      { text: s.groupName || '', options: { fontSize: 10 } },
      { text: s.department || '', options: { fontSize: 10 } },
      { text: (s.members || []).join(', '), options: { fontSize: 9 } },
      { text: String((s.ideas || []).length), options: { fontSize: 10, align: 'center' } },
    ]);
  });

  slide.addTable(tableRows, {
    x: 0.5, y: 3.1, w: 9,
    colW: [2.5, 2.5, 3, 1],
    border: { type: 'solid', pt: 0.5, color: 'CCCCCC' },
    margin: [4, 8, 4, 8],
    fontFace: 'Arial',
  });
}

/* ---- Idea Slides ---- */
function addIdeaSlide(pptx, idea, index, total) {
  const slide = pptx.addSlide({ masterName: 'PX_CONTENT' });
  const feas = idea.feasibility?.total || 0;
  const imp = idea.impact?.total || 0;
  const combined = idea.combinedScore || 0;
  const priority = getPriorityLabel(feas, imp);

  // Dark blue header bar
  slide.addShape(pptx.shapes.RECTANGLE, {
    x: 0, y: 0.04, w: 10, h: 1.0,
    fill: { color: PX.darkBlue },
  });

  // Idea name
  slide.addText(idea.name || 'Untitled Idea', {
    x: 0.5, y: 0.1, w: 6.5, h: 0.5,
    fontSize: 20, fontFace: 'Arial', bold: true, color: PX.white,
  });

  // Group/dept subtitle
  slide.addText(`${idea.groupName || ''}${idea.department ? '  ·  ' + idea.department : ''}`, {
    x: 0.5, y: 0.6, w: 6.5, h: 0.3,
    fontSize: 10, fontFace: 'Arial', color: PX.lightBlue,
  });

  // Score badges in header
  slide.addText([
    { text: `F: ${feas}/15`, options: { fontSize: 11, color: PX.lightBlue, fontFace: 'Arial' } },
    { text: '   ', options: { fontSize: 11 } },
    { text: `I: ${imp}/15`, options: { fontSize: 11, color: PX.orange, fontFace: 'Arial' } },
    { text: '   ', options: { fontSize: 11 } },
    { text: `${combined}/30`, options: { fontSize: 13, bold: true, color: PX.white, fontFace: 'Arial' } },
  ], {
    x: 7.2, y: 0.15, w: 2.5, h: 0.35,
    align: 'right',
  });

  // Priority badge
  slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 7.8, y: 0.6, w: 1.8, h: 0.3,
    fill: { color: getPriorityColor(priority) },
    rectRadius: 0.15,
  });
  slide.addText(priority, {
    x: 7.8, y: 0.6, w: 1.8, h: 0.3,
    fontSize: 9, fontFace: 'Arial', bold: true, color: PX.white,
    align: 'center', valign: 'middle',
  });

  // Idea number
  slide.addText(`${index + 1} / ${total}`, {
    x: 8.5, y: 7.12, w: 1, h: 0.3,
    fontSize: 8, fontFace: 'Arial', color: PX.textLight,
    align: 'right',
  });

  // --- LEFT COLUMN (problem) ---
  let leftY = 1.3;

  if (idea.problemDescription) {
    slide.addText('THE PROBLEM', {
      x: 0.5, y: leftY, w: 5, h: 0.25,
      fontSize: 9, fontFace: 'Arial', bold: true, color: PX.orange,
    });
    leftY += 0.25;
    slide.addText(truncate(idea.problemDescription, 250), {
      x: 0.5, y: leftY, w: 5, h: 0.65,
      fontSize: 10, fontFace: 'Arial', color: PX.text,
      valign: 'top', shrinkText: true,
    });
    leftY += 0.65;
  }

  if (idea.processSteps && idea.processSteps.length > 0) {
    slide.addText('PROCESS STEPS', {
      x: 0.5, y: leftY, w: 5, h: 0.2,
      fontSize: 9, fontFace: 'Arial', bold: true, color: PX.orange,
    });
    leftY += 0.2;
    const stepsText = idea.processSteps.map((s, i) => `${i + 1}. ${s}`).join('\n');
    slide.addText(truncate(stepsText, 200), {
      x: 0.5, y: leftY, w: 5, h: 0.7,
      fontSize: 9, fontFace: 'Arial', color: PX.text,
      valign: 'top', shrinkText: true,
    });
    leftY += 0.7;
  }

  if (idea.whoAffected) {
    slide.addText([
      { text: 'Who affected:  ', options: { bold: true, fontSize: 9, color: PX.textLight } },
      { text: idea.whoAffected, options: { fontSize: 9, color: PX.text } },
    ], { x: 0.5, y: leftY, w: 5, h: 0.25 });
    leftY += 0.3;
  }

  if (idea.frequency || idea.timePerCycle) {
    const freqText = [idea.frequency, idea.timePerCycle].filter(Boolean).join('  ·  ');
    slide.addText([
      { text: 'Frequency:  ', options: { bold: true, fontSize: 9, color: PX.textLight } },
      { text: freqText, options: { fontSize: 9, color: PX.text } },
    ], { x: 0.5, y: leftY, w: 5, h: 0.25 });
    leftY += 0.3;
  }

  // --- RIGHT COLUMN (AI opportunity) ---
  let rightY = 1.3;

  if (idea.aiApproach) {
    slide.addText('AI OPPORTUNITY', {
      x: 5.8, y: rightY, w: 3.7, h: 0.25,
      fontSize: 9, fontFace: 'Arial', bold: true, color: PX.lightBlue,
    });
    rightY += 0.25;
    slide.addText(truncate(idea.aiApproach, 200), {
      x: 5.8, y: rightY, w: 3.7, h: 0.65,
      fontSize: 10, fontFace: 'Arial', color: PX.text,
      valign: 'top', shrinkText: true,
    });
    rightY += 0.65;
  }

  if (idea.dataAvailable) {
    slide.addText('DATA AVAILABLE', {
      x: 5.8, y: rightY, w: 3.7, h: 0.25,
      fontSize: 9, fontFace: 'Arial', bold: true, color: PX.lightBlue,
    });
    rightY += 0.25;
    slide.addText(truncate(idea.dataAvailable, 150), {
      x: 5.8, y: rightY, w: 3.7, h: 0.4,
      fontSize: 9, fontFace: 'Arial', color: PX.text,
      valign: 'top', shrinkText: true,
    });
    rightY += 0.45;
  }

  if (idea.successCriteria) {
    slide.addText('SUCCESS CRITERIA', {
      x: 5.8, y: rightY, w: 3.7, h: 0.25,
      fontSize: 9, fontFace: 'Arial', bold: true, color: PX.lightBlue,
    });
    rightY += 0.25;
    slide.addText(truncate(idea.successCriteria, 150), {
      x: 5.8, y: rightY, w: 3.7, h: 0.4,
      fontSize: 9, fontFace: 'Arial', color: PX.text,
      valign: 'top', shrinkText: true,
    });
    rightY += 0.45;
  }

  // --- SCORE BAR (compact inline layout) ---
  const scoreY = 4.7;
  const scoreItems = [
    { label: 'Data', val: idea.feasibility?.dataReadiness || 0, color: PX.darkBlue },
    { label: 'Tech', val: idea.feasibility?.technicalComplexity || 0, color: PX.darkBlue },
    { label: 'Org', val: idea.feasibility?.orgReadiness || 0, color: PX.darkBlue },
    { label: 'Time', val: idea.impact?.timeSaved || 0, color: PX.orange },
    { label: 'Errors', val: idea.impact?.errorReduction || 0, color: PX.orange },
    { label: 'Strategy', val: idea.impact?.strategicValue || 0, color: PX.orange },
  ];

  // Divider
  slide.addShape(pptx.shapes.RECTANGLE, {
    x: 0.5, y: scoreY - 0.1, w: 9, h: 0.01,
    fill: { color: 'DDDDDD' },
  });

  // Feasibility / Impact labels
  slide.addText('FEASIBILITY', {
    x: 0.5, y: scoreY, w: 4.2, h: 0.2,
    fontSize: 8, fontFace: 'Arial', bold: true, color: PX.darkBlue,
  });
  slide.addText('IMPACT', {
    x: 5.0, y: scoreY, w: 4.5, h: 0.2,
    fontSize: 8, fontFace: 'Arial', bold: true, color: PX.orange,
  });

  scoreItems.forEach((item, i) => {
    const x = 0.5 + i * 1.5;
    // Score circle (smaller)
    slide.addShape(pptx.shapes.OVAL, {
      x: x + 0.3, y: scoreY + 0.22, w: 0.42, h: 0.42,
      fill: { color: item.color },
    });
    slide.addText(`${item.val}/5`, {
      x: x + 0.3, y: scoreY + 0.22, w: 0.42, h: 0.42,
      fontSize: 9, fontFace: 'Arial', bold: true, color: PX.white,
      align: 'center', valign: 'middle',
    });
    // Label below
    slide.addText(item.label, {
      x: x, y: scoreY + 0.66, w: 1.1, h: 0.22,
      fontSize: 7, fontFace: 'Arial', color: PX.textLight,
      align: 'center', valign: 'top',
    });
  });

  // --- PITCH ---
  if (idea.pitch) {
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x: 0.5, y: 5.65, w: 9, h: 0.55,
      fill: { color: PX.lightGrey },
      rectRadius: 0.1,
    });
    slide.addText(`"${idea.pitch}"`, {
      x: 0.7, y: 5.68, w: 8.6, h: 0.48,
      fontSize: 9, fontFace: 'Arial', italic: true, color: PX.darkBlue,
      valign: 'middle', shrinkText: true,
    });
  }
}

/* ---- Priority Matrix Slide ---- */
function addMatrixSlide(pptx, allIdeas) {
  const slide = pptx.addSlide({ masterName: 'PX_CONTENT' });

  slide.addText('Priority Matrix', {
    x: 0.5, y: 0.15, w: 5, h: 0.4,
    fontSize: 22, fontFace: 'Arial', bold: true, color: PX.darkBlue,
  });
  slide.addText('Feasibility vs Impact — position use cases by priority', {
    x: 0.5, y: 0.55, w: 6, h: 0.3,
    fontSize: 10, fontFace: 'Arial', color: PX.textLight,
  });

  // Chart area dimensions (fits within slide with legend below)
  const CX = 0.8, CY = 0.9, CW = 5.5, CH = 4.8;

  // Build scatter data grouped by group name
  const groups = {};
  allIdeas.forEach(idea => {
    const gn = idea.groupName || 'Unknown';
    if (!groups[gn]) groups[gn] = [];
    groups[gn].push({
      x: idea.feasibility?.total || 0,
      y: idea.impact?.total || 0,
      name: idea.name,
    });
  });

  // Try PptxGenJS scatter chart
  const chartData = Object.entries(groups).map(([name, points], i) => ({
    name: name,
    values: points.map(p => [p.x, p.y]),
  }));

  try {
    slide.addChart(pptx.charts.SCATTER, chartData, {
      x: CX, y: CY, w: CW, h: CH,
      showTitle: false,
      showLegend: true,
      legendPos: 'b',
      legendFontSize: 9,
      catAxisMinVal: 0, catAxisMaxVal: 15,
      valAxisMinVal: 0, valAxisMaxVal: 15,
      catAxisTitle: 'FEASIBILITY (/15)',
      valAxisTitle: 'IMPACT (/15)',
      catAxisTitleColor: PX.darkBlue,
      valAxisTitleColor: PX.darkBlue,
      catAxisLabelColor: PX.textLight,
      valAxisLabelColor: PX.textLight,
      catGridLine: { color: 'EEEEEE', size: 0.5 },
      valGridLine: { color: 'EEEEEE', size: 0.5 },
      chartColors: CHART_COLORS.slice(0, Object.keys(groups).length),
      lineSize: 0,
      lineDataSymbolSize: 10,
    });
  } catch (e) {
    // Fallback: draw dots manually as shapes
    const colorArr = CHART_COLORS;
    const groupNames = Object.keys(groups);
    groupNames.forEach((gn, gi) => {
      groups[gn].forEach(p => {
        const dotX = CX + (p.x / 15) * CW;
        const dotY = CY + CH - (p.y / 15) * CH;
        slide.addShape(pptx.shapes.OVAL, {
          x: dotX - 0.12, y: dotY - 0.12, w: 0.24, h: 0.24,
          fill: { color: colorArr[gi % colorArr.length] },
        });
      });
    });
  }

  // Quadrant dashed lines (overlay)
  const midX = CX + CW / 2;
  const midY = CY + CH / 2;

  slide.addShape(pptx.shapes.LINE, {
    x: midX, y: CY, w: 0, h: CH,
    line: { color: '999999', width: 1, dashType: 'dash' },
  });
  slide.addShape(pptx.shapes.LINE, {
    x: CX, y: midY, w: CW, h: 0,
    line: { color: '999999', width: 1, dashType: 'dash' },
  });

  // Quadrant labels
  const qlabels = [
    { text: 'STRATEGIC BET', x: CX + 0.15, y: CY + 0.1, color: PX.orange },
    { text: 'QUICK WIN', x: midX + 0.15, y: CY + 0.1, color: PX.green },
    { text: 'RECONSIDER', x: CX + 0.15, y: midY + 0.1, color: PX.textLight },
    { text: 'LONG-TERM BET', x: midX + 0.15, y: midY + 0.1, color: PX.darkBlue },
  ];
  qlabels.forEach(q => {
    slide.addText(q.text, {
      x: q.x, y: q.y, w: 2.5, h: 0.25,
      fontSize: 8, fontFace: 'Arial', bold: true, color: q.color,
      transparency: 40,
    });
  });

  // Ranked list on the right
  slide.addText('Ranked by Score', {
    x: 6.8, y: 0.9, w: 2.8, h: 0.3,
    fontSize: 13, fontFace: 'Arial', bold: true, color: PX.darkBlue,
  });

  const sorted = [...allIdeas].sort((a, b) => (b.combinedScore || 0) - (a.combinedScore || 0));
  const listItems = sorted.slice(0, 12).map((idea, i) => {
    const priority = getPriorityLabel(idea.feasibility?.total || 0, idea.impact?.total || 0);
    return { text: `${i + 1}. ${truncate(idea.name, 22)} (${idea.combinedScore || 0}/30)`, options: { fontSize: 8, color: getPriorityColor(priority), fontFace: 'Arial', bullet: false } };
  });

  slide.addText(listItems, {
    x: 6.8, y: 1.2, w: 2.8, h: 4.5,
    valign: 'top',
    paraSpaceAfter: 5,
  });
}

/* ---- Roadmap Slide ---- */
function addRoadmapSlide(pptx, allIdeas) {
  const slide = pptx.addSlide({ masterName: 'PX_CONTENT' });

  slide.addText('Implementation Roadmap', {
    x: 0.5, y: 0.15, w: 9, h: 0.4,
    fontSize: 22, fontFace: 'Arial', bold: true, color: PX.darkBlue,
  });
  slide.addText('Suggested phasing based on feasibility and impact scores', {
    x: 0.5, y: 0.55, w: 8, h: 0.3,
    fontSize: 10, fontFace: 'Arial', color: PX.textLight,
  });

  // Categorise ideas
  const categories = {
    'Quick Win': { ideas: [], color: PX.green, bg: PX.greenBg, phase: 'Phase 1: Quick Wins', time: '0 – 3 months', desc: 'High feasibility, high impact. Start here.' },
    'Strategic Bet': { ideas: [], color: PX.orange, bg: PX.orangeBg, phase: 'Phase 2: Strategic Bets', time: '3 – 6 months', desc: 'High impact but needs feasibility work.' },
    'Long-term Bet': { ideas: [], color: PX.darkBlue, bg: PX.blueBg, phase: 'Phase 3: Long-term Investments', time: '6 – 12 months', desc: 'Feasible but lower immediate impact.' },
    'Reconsider': { ideas: [], color: PX.textLight, bg: PX.greyBg, phase: 'Parking Lot', time: 'Revisit later', desc: 'Low feasibility and impact. Park or redesign.' },
  };

  allIdeas.forEach(idea => {
    const label = getPriorityLabel(idea.feasibility?.total || 0, idea.impact?.total || 0);
    categories[label].ideas.push(idea);
  });

  // Sort each category by combined score
  Object.values(categories).forEach(cat => {
    cat.ideas.sort((a, b) => (b.combinedScore || 0) - (a.combinedScore || 0));
  });

  let yPos = 0.95;
  Object.entries(categories).forEach(([label, cat]) => {
    const boxH = 1.15;

    // Background box
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x: 0.5, y: yPos, w: 9, h: boxH,
      fill: { color: cat.bg },
      line: { color: cat.color, width: 1.5 },
      rectRadius: 0.1,
    });

    // Left color strip
    slide.addShape(pptx.shapes.RECTANGLE, {
      x: 0.5, y: yPos, w: 0.12, h: boxH,
      fill: { color: cat.color },
    });

    // Phase title + timeline
    slide.addText(cat.phase, {
      x: 0.8, y: yPos + 0.04, w: 4, h: 0.25,
      fontSize: 12, fontFace: 'Arial', bold: true, color: cat.color,
    });
    slide.addText(cat.time, {
      x: 7.5, y: yPos + 0.04, w: 1.8, h: 0.25,
      fontSize: 9, fontFace: 'Arial', color: cat.color,
      align: 'right',
    });

    // Description
    slide.addText(cat.desc, {
      x: 0.8, y: yPos + 0.3, w: 8.5, h: 0.18,
      fontSize: 8, fontFace: 'Arial', italic: true, color: PX.textLight,
    });

    // Idea names
    const ideaNames = cat.ideas.length > 0
      ? cat.ideas.map(i => `${i.name} (${i.combinedScore || 0}/30)`).join('    ·    ')
      : 'None identified';
    slide.addText(ideaNames, {
      x: 0.8, y: yPos + 0.5, w: 8.5, h: 0.55,
      fontSize: 9, fontFace: 'Arial', color: PX.text,
      valign: 'top', shrinkText: true,
    });

    yPos += boxH + 0.1;
  });

  // Next steps footer
  slide.addText('Next Steps: Validate Quick Wins with stakeholders, define pilot scope, assign owners, and set success metrics.', {
    x: 0.5, y: 6.05, w: 9, h: 0.35,
    fontSize: 9, fontFace: 'Arial', italic: true, color: PX.darkBlue,
  });
}

/* ---- Thank You Slide ---- */
function addThankYouSlide(pptx, session) {
  const slide = pptx.addSlide({ masterName: 'PX_TITLE' });

  slide.addText('Thank You', {
    x: 0.5, y: 2.0, w: 9, h: 0.8,
    fontSize: 36, fontFace: 'Arial', bold: true, color: PX.white,
    align: 'center',
  });

  slide.addShape(pptx.shapes.RECTANGLE, {
    x: 3.5, y: 3.0, w: 3, h: 0.04,
    fill: { color: PX.orange },
  });

  slide.addText('Let\'s turn these ideas into action.', {
    x: 0.5, y: 3.3, w: 9, h: 0.5,
    fontSize: 18, fontFace: 'Arial', color: PX.lightBlue,
    align: 'center',
  });

  slide.addText([
    { text: 'www.praelexis.com', options: { fontSize: 12, color: PX.lightBlue } },
  ], {
    x: 0.5, y: 4.5, w: 9, h: 0.4,
    align: 'center',
  });
}

/* ---- Main Export Function ---- */
function generateUseCasePPTX(session, allIdeas, submissions) {
  const pptx = new PptxGenJS();

  pptx.author = 'Praelexis AI Assessment Platform';
  pptx.company = 'Praelexis';
  pptx.subject = `AI Use Case Discovery — ${session.name}`;
  pptx.title = `${session.organisation} — ${session.name}`;

  defineMasters(pptx);

  // 1. Title
  addTitleSlide(pptx, session, allIdeas.length, submissions.length);

  // 2. Overview
  addOverviewSlide(pptx, allIdeas, submissions);

  // 3. One slide per idea (sorted by combined score)
  const sorted = [...allIdeas].sort((a, b) => (b.combinedScore || 0) - (a.combinedScore || 0));
  sorted.forEach((idea, i) => addIdeaSlide(pptx, idea, i, sorted.length));

  // 4. Priority matrix
  addMatrixSlide(pptx, allIdeas);

  // 5. Roadmap
  addRoadmapSlide(pptx, allIdeas);

  // 6. Thank you
  addThankYouSlide(pptx, session);

  // Download
  const filename = `AI-UseCases_${(session.organisation || '').replace(/[^a-zA-Z0-9]/g, '_')}_${(session.name || '').replace(/[^a-zA-Z0-9]/g, '_')}_${new Date().toISOString().slice(0, 10)}`;
  pptx.writeFile({ fileName: filename });
}
