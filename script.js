/* ============ DATA ============ */
const causes = [
  ["Bureaucratic Red Tape", "Excessive paperwork, multiple approval layers, and slow procedures create bottlenecks where officials can demand bribes simply to move a file forward."],
  ["Low Transparency", "Many decisions — from contract awards to transfers — are made behind closed doors, leaving little public record to check against."],
  ["Weak Enforcement", "Anti-corruption laws exist, but investigation and prosecution are often slow, understaffed, or politically influenced, so offenders rarely face real consequences."],
  ["Political Funding", "Elections are expensive, and opaque campaign financing creates informal debts between donors and elected officials that get repaid through favors."],
  ["Discretionary Power", "Officials often have wide personal discretion over licenses, permits, and inspections, which turns routine approvals into opportunities for extraction."],
  ["Social Tolerance", "In many contexts, small bribes are treated as a normal 'cost of doing business' rather than a crime, which normalizes the practice."],
];

const types = [
  ["Bribery", "Payment made to an official to speed up, secure, or influence a decision that should be made on merit alone."],
  ["Embezzlement", "Public officials diverting government funds or property meant for public projects into private accounts."],
  ["Nepotism & Favoritism", "Appointing or favoring relatives, friends, or political allies for jobs and contracts instead of the most qualified candidate."],
  ["Extortion", "Officials demanding money or favors by threatening delay, harassment, or denial of a service someone is legally entitled to."],
  ["Fraud", "Deliberate deception in procurement, billing, or reporting — such as inflated contracts or fake beneficiary lists in welfare schemes."],
  ["Crony Capitalism", "Close, mutually beneficial ties between business leaders and politicians that shape policy and contracts in favor of a select few."],
];

const effects = [
  ["Economic Loss", "Public funds meant for roads, schools, and hospitals are diverted, reducing the quality and reach of infrastructure and services."],
  ["Deters Investment", "Investors avoid unpredictable, bribery-dependent environments, which slows job creation and economic growth."],
  ["Deepens Inequality", "The poor, who can least afford bribes, are hit hardest when access to rations, permits, or justice depends on informal payments."],
  ["Erodes Public Trust", "Repeated exposure to corruption makes citizens cynical about institutions, weakening cooperation with the state and civic participation."],
  ["Undermines Justice", "When money or influence can affect investigations or court outcomes, the principle of equal treatment under law breaks down."],
  ["Environmental Damage", "Bribes to bypass environmental clearances enable illegal mining, deforestation, and unauthorized construction."],
];

const response = [
  ["Right to Information Act, 2005", "Lets any citizen formally request information from public authorities, exposing decisions that were once hidden from view."],
  ["Central Vigilance Commission", "An independent body that monitors corruption complaints against central government officials and advises on disciplinary action."],
  ["Lokpal & Lokayuktas", "Ombudsman institutions created to investigate corruption allegations against public officials, including elected representatives."],
  ["Prevention of Corruption Act", "The core criminal law defining bribery and abuse of office, amended in 2018 to also penalize those who give bribes."],
  ["Digital Governance", "Direct Benefit Transfers and e-governance portals reduce human middlemen in welfare delivery, cutting opportunities for petty bribery."],
];

const quizItems = [
  { text: "India's Corruption Perceptions Index score improved slightly from 2024 to 2025.", answer: true,
    explain: "Correct — India's score rose from 38 to 39, moving it from 96th to 91st out of 182 countries." },
  { text: "A higher CPI score means a country is perceived as more corrupt.", answer: false,
    explain: "Incorrect — a higher score (closer to 100) means a country is perceived as cleaner, not more corrupt." },
  { text: "The Right to Information Act allows any citizen to request government records.", answer: true,
    explain: "Correct — the RTI Act, 2005 gives citizens a legal right to request information from public authorities." },
  { text: "Corruption only affects a country's economy, not its social fabric.", answer: false,
    explain: "Incorrect — corruption also deepens inequality and erodes public trust in institutions." },
];

/* ============ RENDER ENTRIES ============ */
function renderEntries(containerId, items, prefix){
  const el = document.getElementById(containerId);
  el.innerHTML = items.map((item, i) => `
    <div class="entry">
      <button class="entry__head" aria-expanded="false">
        <span class="entry__num">${prefix}${String(i+1).padStart(2,'0')}</span>
        <span class="entry__title">${item[0]}</span>
        <span class="entry__icon">+</span>
      </button>
      <div class="entry__body"><p>${item[1]}</p></div>
    </div>
  `).join('');

  el.querySelectorAll('.entry').forEach(entry => {
    const head = entry.querySelector('.entry__head');
    const body = entry.querySelector('.entry__body');
    head.addEventListener('click', () => {
      const isOpen = entry.classList.contains('open');
      entry.classList.toggle('open', !isOpen);
      head.setAttribute('aria-expanded', String(!isOpen));
      body.style.maxHeight = isOpen ? '0px' : body.scrollHeight + 'px';
    });
  });
}

renderEntries('causes-list', causes, 'A.');
renderEntries('types-list', types, 'B.');
renderEntries('effects-list', effects, 'C.');
renderEntries('response-list', response, 'D.');

/* ============ QUIZ ============ */
let correctCount = 0;
let answeredCount = 0;
const quizEl = document.getElementById('quiz');
const scoreEl = document.getElementById('quiz-score');

quizEl.innerHTML = quizItems.map((q, i) => `
  <div class="q" data-index="${i}">
    <p class="q__text">${i+1}. ${q.text}</p>
    <div class="q__actions">
      <button class="q__btn" data-choice="true">TRUE</button>
      <button class="q__btn" data-choice="false">FALSE</button>
    </div>
    <p class="q__result"></p>
  </div>
`).join('');

quizEl.querySelectorAll('.q').forEach(qDiv => {
  const idx = Number(qDiv.dataset.index);
  const item = quizItems[idx];
  const buttons = qDiv.querySelectorAll('.q__btn');
  const result = qDiv.querySelector('.q__result');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const choice = btn.dataset.choice === 'true';
      const isCorrect = choice === item.answer;
      buttons.forEach(b => b.disabled = true);
      result.textContent = (isCorrect ? 'STAMPED: CORRECT — ' : 'STAMPED: INCORRECT — ') + item.explain;
      result.classList.add('show', isCorrect ? 'correct' : 'wrong');
      answeredCount++;
      if(isCorrect) correctCount++;
      scoreEl.textContent = `${correctCount} of ${answeredCount} verified correctly`;
    });
  });
});

/* ============ TAB NAV: click-to-scroll + scroll-spy ============ */
const tabs = document.querySelectorAll('.tab');
const sections = ['overview','causes','types','effects','response'].map(id => document.getElementById(id));

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = document.getElementById(tab.dataset.target);
    if(target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

const spy = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      const id = entry.target.id;
      tabs.forEach(t => t.classList.toggle('active', t.dataset.target === id));
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });

sections.forEach(s => s && spy.observe(s));

/* ============ REDACTION REVEAL ON SCROLL ============ */
const redactObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('revealed');
      redactObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });

document.querySelectorAll('[data-redact]').forEach(el => redactObserver.observe(el));
