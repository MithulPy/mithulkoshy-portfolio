// src/data/profile.js
// Single source of truth for portfolio content (kept free of private details such as phone numbers).
import risingStar from '../assets/rising-star.webp';
import risingStarThumb from '../assets/rising-star-thumb.webp';
import shiningStar from '../assets/shining-star.webp';
import shiningStarThumb from '../assets/shining-star-thumb.webp';

export const profile = {
  name: 'Mithul Titten Koshy',
  shortName: 'Mithul Koshy',
  title: 'Software Engineer in Test',
  location: 'Kochi, India',
  email: 'mithulofficial@gmail.com',
  linkedin: 'https://www.linkedin.com/in/mithulkoshy/',
  github: 'https://github.com/MithulPy',
  itch: 'https://mithulgrad.itch.io/',
  status: 'Building agentic QA workflows at UST',
  tagline:
    'I design test automation that teams trust, and agentic AI workflows that turn user stories into test packs, BDD scenarios and runnable Playwright scripts.',
};

export const focus = [
  { key: 'agents', title: 'Agentic QA workflows', text: 'Multi-step AI agents that plan, generate and validate tests.' },
  { key: 'gen', title: 'AI test generation', text: 'User stories → BDD/TDD scenarios → automation scripts.' },
  { key: 'pw', title: 'Playwright & TypeScript', text: 'Maintainable, cross-browser frameworks built to last.' },
  { key: 'ci', title: 'Quality in CI/CD', text: 'Suites wired into Jenkins and Azure DevOps pipelines.' },
];

export const about = [
  'I’m a Software Engineer in Test with 5+ years across financial services, insurance and eCommerce. I build test strategies and frameworks with Playwright and TypeScript, along with Java/Selenium and WebdriverIO.',
  'Most of my recent work is agentic: internal QA tools and AI agents that write BDD/TDD tests, assemble test packs and produce automation scripts, with engineers reviewing and owning the output. I use Claude, Copilot and Codex every day.',
  'I also lead automation work end to end. That means refining requirements with product teams, debugging frontend and backend issues, connecting suites to CI/CD and mentoring QA engineers.',
];

export const experience = [
  {
    role: 'Senior Quality Engineer',
    company: 'UST',
    location: 'Kerala, India',
    period: 'Nov 2024 – Present',
    current: true,
    points: [
      'Designed and implemented Playwright + TypeScript automation with AI agents for a financial services client, enabling automated test generation and regression execution.',
      'Developed an AI-driven QA tool for a credit reporting client, unifying user story generation, test pack creation and automation script generation in one workflow.',
      'Built agentic AI systems for an asset management client to automate BDD and TDD test generation.',
      'Engineered an agentic AI system for migration and contract testing, and delivered QE360 + GenAI automation across applications in a cloud migration project.',
      'Built multi-language web frameworks: Playwright and WebdriverIO (TypeScript) and Selenium/TestNG (Java), with BDD Cucumber and cross-browser coverage.',
      'Automation Lead for a health insurance client across SIT, UAT and E2E; mentored and led a team of QA engineers.',
      'Delivered a proof of concept for an OCR-based document translation tool.',
    ],
    tags: ['Playwright', 'TypeScript', 'AI Agents', 'WebdriverIO', 'Selenium', 'Cucumber'],
  },
  {
    role: 'Senior Full Stack Developer (Part-time)',
    company: 'productgrid.ai',
    location: 'Toronto, ON',
    period: 'Aug 2024 – Nov 2024',
    points: [
      'Automated eCommerce data extraction with Python and Selenium, storing large-scale data in MongoDB.',
      'Led a team of interns improving dynamic web scraping and AI-assisted data processing.',
      'Collaborated on backend design and optimized database performance.',
    ],
    tags: ['Python', 'Selenium', 'MongoDB'],
  },
  {
    role: 'Developer (Co-op)',
    company: 'WIMTACH, Centennial College',
    location: 'Toronto, ON',
    period: 'May 2023 – Sep 2023',
    points: [
      'Tested, automated, deployed and debugged an Unreal Engine game with thorough documentation, reducing bug reports by 30%.',
      'Created epics and user stories in Agile/Scrum with cross-functional teams.',
    ],
    tags: ['Unreal Engine', 'Agile'],
  },
  {
    role: 'QA Automation Specialist (Co-op)',
    company: 'Teranet Inc.',
    location: 'Mississauga, ON',
    period: 'Sep 2022 – Dec 2022',
    points: [
      'Automated regression tests in C# with Selenium and MSTest, cutting manual testing time by 40%.',
      'Created test plans and verified functionality against business requirements.',
      'Led cross-browser testing using Selenium Grid and virtual machines.',
    ],
    tags: ['C#', 'Selenium', 'MSTest', 'Selenium Grid'],
  },
  {
    role: 'Software Developer (Automation Engineer)',
    company: 'UST',
    location: 'Kerala, India',
    period: 'May 2019 – Dec 2021',
    points: [
      'Built automation frameworks in Python (pytest) and Java (TestNG) for web, API and mobile.',
      'Wrote Selenium, REST API and Android/iOS automation scripts; introduced Azure DevOps tooling to the QA process.',
      'Upskilled from Python to Angular to ship full-stack features for an optimizer product under tight timelines.',
      'Integrated Allure, Report Portal and Cucumber BDD; scaled execution on Selenium Grid, Selenoid and Zalenium.',
    ],
    tags: ['pytest', 'TestNG', 'Appium', 'REST API', 'Angular'],
  },
  {
    role: 'IT Intern',
    company: 'Qatargas (now QatarEnergy LNG)',
    location: 'Doha, Qatar',
    period: 'Jun 2017 – Jul 2017',
    points: ['Provided IT support: troubleshooting, encryption, software updates, network connectivity and certificates.'],
    tags: ['IT Support'],
  },
];

export const skills = [
  {
    group: 'Test Automation',
    items: ['Playwright', 'Cypress', 'Selenium', 'WebdriverIO', 'TestNG', 'JUnit', 'pytest', 'MSTest', 'Robot Framework', 'Cucumber (BDD)', 'Selenium Grid'],
  },
  { group: 'Languages', items: ['TypeScript', 'JavaScript', 'Java', 'Python', 'C#', 'SQL'] },
  {
    group: 'AI & QA Tooling',
    items: ['Agentic AI systems', 'AI agents', 'AI test generation (BDD/TDD)', 'Test pack generation', 'Claude', 'Copilot', 'Codex'],
  },
  {
    group: 'API & Backend',
    items: ['REST API testing', 'Postman', 'GraphQL', 'Contract testing', 'SQL Server', 'MongoDB'],
  },
  {
    group: 'CI/CD & Tools',
    items: ['Jenkins', 'Azure DevOps', 'Git', 'Maven', 'JIRA', 'Allure', 'Report Portal', 'Linux', 'PowerShell', 'AWS', 'Azure', 'GCP'],
  },
  { group: 'Mobile & Desktop', items: ['Appium', 'XCUITest', 'WinAppDriver', 'TestComplete'] },
  {
    group: 'QA Practices',
    items: ['Test strategy', 'Test plans', 'Regression', 'Smoke', 'E2E', 'Cross-browser', 'SIT/UAT', 'Defect triage', 'Agile/Scrum'],
  },
];

export const projects = [
  {
    title: 'AI-Driven QA Workbench',
    flow: ['Story', 'Agents', 'Test pack', 'Scripts'],
    kind: 'Agentic AI',
    description:
      'A single workflow that turns requirements into user stories, test packs and runnable automation scripts. Built for a credit reporting and data analytics client.',
    tags: ['AI Agents', 'Test Generation', 'Playwright'],
    featured: true,
  },
  {
    title: 'Agentic BDD/TDD Test Generator',
    flow: ['Spec', 'Agent', 'BDD', 'TDD'],
    kind: 'Agentic AI',
    description:
      'An agent system that drafts BDD scenarios and TDD tests for an asset management client, speeding up test design and growing automation coverage.',
    tags: ['Cucumber', 'TDD', 'LLMs'],
    featured: true,
  },
  {
    title: 'Migration & Contract Testing Agents',
    flow: ['Legacy', 'Agents', 'Contracts', 'Valid'],
    kind: 'Agentic AI',
    description: 'AI agents that create and validate migration and API contract tests for a cloud migration programme.',
    tags: ['Contract Testing', 'API', 'GenAI'],
  },
  {
    title: 'Multi-language Automation Frameworks',
    flow: ['TS / Java', 'Suites', 'CI/CD', 'Report'],
    kind: 'Framework',
    description:
      'Web automation in Playwright and WebdriverIO (TypeScript) and Selenium/TestNG (Java), with BDD and cross-browser coverage, running in CI/CD.',
    tags: ['TypeScript', 'Java', 'CI/CD'],
  },
  {
    title: 'OCR Translation PoC',
    flow: ['Document', 'OCR', 'Translate'],
    kind: 'Proof of Concept',
    description: 'A tool that extracts text from documents with OCR and translates it.',
    tags: ['OCR', 'Python'],
  },
  {
    title: 'Game Projects',
    flow: ['Idea', 'Build', 'Test', 'Play'],
    kind: 'Games',
    description: '2D, 3D and VR games built in Unity and Unreal Engine with C# and Blueprints.',
    tags: ['Unity', 'Unreal', 'VR'],
    link: { label: 'itch.io', href: 'https://mithulgrad.itch.io/' },
  },
];

export const awards = [
  {
    name: 'Shining Star',
    org: 'USTAR Recognition · UST',
    quote:
      'Delivered outstanding results completing QE360+GenAI automation across applications within a cloud migration project on schedule despite challenges. As an excellent mentor, he shared knowledge with juniors.',
    image: shiningStar,
    thumb: shiningStarThumb,
  },
  {
    name: 'Rising Star',
    org: 'USTAR Recognition · UST',
    quote:
      'Showcased that learning new things brings success to oneself and the team. His primary skill is Python; however, he upskilled himself to Angular and quickly became a full stack developer.',
    image: risingStar,
    thumb: risingStarThumb,
  },
];

export const education = [
  {
    degree: 'Advanced Diploma, Software Engineering Technology',
    school: 'Centennial College, Toronto, ON',
    period: 'Jan 2022 – Dec 2023',
    note: 'GPA 4.3 / 4.5',
  },
  {
    degree: 'B.Tech, Computer Science and Engineering',
    school: 'SRM Institute of Science and Technology, Chennai',
    period: 'Jun 2015 – May 2019',
  },
];

export const achievements = [
  { label: '1st Place', detail: 'BlueSalt x WIMTACH Hackathon (2023)' },
  { label: '3rd Place', detail: 'Marion Surgical x WIMTACH Hackathon (2023)' },
  { label: 'Publication', detail: '“Automated Car Parking System”, Journal of Physics: Conference Series (2019)' },
  { label: 'Toastmasters', detail: 'Centennial College, 2023 – 2024' },
];

export const certifications = [
  'pCloudy Certified Professional – Manual App Testing',
  'GenRocket GCE Certification Level 1',
  'Coursera: Python',
  'LinkedIn Learning: Agile Testing, Test Automation Foundations, Selenium, Cypress.io, Robot Framework, C#, .NET',
];

// Probe, the QA agent that walks around the page, says these lines.
// buddyLines: per section; the first line is the intro said on the first visit, the rest come up while idling there.
export const buddyLines = {
  hero: [
    'Hi, I’m Probe 👋 Mithul’s tiny QA agent. I live here. Click me, hover me, I don’t bite (much).',
    'That’s Mithul in the photo. I’m the cuter one.',
    'Fun job title fact: SDET means Software Development Engineer in Test. I just call him boss.',
  ],
  about: [
    'Agents building agents… I’m basically family.',
    'Hmm, “quality engineering, accelerated by AI”. That’s literally how I was born.',
    'Mithul’s rule: agents draft, humans own. I’m allowed to draft jokes.',
  ],
  experience: [
    'Scanning work history… 5+ years across fintech, insurance and eCommerce. No critical defects found ✓',
    'From Python to Angular to Playwright. This human keeps upgrading himself.',
    'Teranet, WIMTACH, productgrid.ai, UST… a well-tested career path.',
    'Toronto, Doha, Kerala. Even his résumé runs cross-browser 🌍',
  ],
  skills: [
    'Running a skills audit… Playwright + TypeScript is the daily driver.',
    'Selenium, WebdriverIO, Cypress, Playwright. He speaks fluent browser.',
    'Claude, Copilot and Codex are on this list. My cousins!',
  ],
  work: [
    'Ooh, the starred cards are the agentic systems. This is my favourite part!',
    'An AI QA workbench that turns user stories into test packs. Imagine me, but useful.',
    'Agents for migration and contract testing. Tiny bots, big pipelines.',
  ],
  recognition: [
    'Two USTAR awards from UST! 🌟 Shining Star and Rising Star.',
    '“Born to Learn” it says. Same, Mithul, same.',
    'Hackathon champion too. 1st place! Throw the confetti!',
  ],
  contact: [
    'Test run complete: all checks passed ✓ Go say hello!',
    'Hiring an SDET? This is the green build you’ve been waiting for.',
    'Psst… the email button works. I tested it. Obviously.',
  ],
};

// What Probe tells you when you click it: info about the section you're in comes first.
export const buddyInfo = {
  hero: [
    'Mithul is a Software Engineer in Test at UST, building agentic QA workflows with Playwright and TypeScript.',
    'Scroll on and I’ll show you around: experience, skills, work and awards.',
  ],
  about: [
    'Mithul has 5+ years in QA and test automation across financial services, insurance and eCommerce.',
    'His focus: AI agents that write BDD/TDD tests, test packs and scripts, with engineers reviewing every output.',
  ],
  experience: [
    'Current role: Senior Quality Engineer at UST since Nov 2024, leading automation and building agentic AI systems.',
    'Before that: productgrid.ai, WIMTACH and Teranet in Toronto, and an automation engineer role at UST.',
    'Highlights: C# + Selenium regression suites at Teranet and Unreal Engine game QA at WIMTACH.',
  ],
  skills: [
    'Daily stack: Playwright + TypeScript, plus Selenium, WebdriverIO and Cypress.',
    'AI tooling: Claude, Copilot and Codex, used to build agents that generate tests.',
    'Also on the list: REST and GraphQL API testing, Appium for mobile, Jenkins and Azure DevOps for CI/CD.',
  ],
  work: [
    'The starred projects are agentic systems: an AI QA workbench and a BDD/TDD test generator.',
    'Watch the pipelines on each card. They show how each system flows, like Story → Agents → Test pack → Scripts.',
  ],
  recognition: [
    'Shining Star: QE360 + GenAI automation in a cloud migration project. Hit “View certificate” for proof!',
    'Rising Star: went from Python to Angular and shipped full-stack features fast.',
    'Also: 1st place at the BlueSalt × WIMTACH hackathon and a 2019 journal publication.',
  ],
  contact: [
    'Best way to reach Mithul: the email button, or LinkedIn.',
    'He’s open to SDET, QA automation and AI-for-testing roles.',
  ],
};

// Probe hyping up Mithul while you hang around.
export const buddyHype = [
  'Honestly? 5+ years of making software not break. Mithul’s kind of a big deal.',
  'Agents that write tests, built by a human who writes great tests. Peak QA.',
  'Two USTAR awards. I’d give him a third if I had thumbs.',
  'Fintech, insurance, eCommerce… he’s tested the stuff your money runs on.',
  'He mentors QA engineers too. I like to think I’m one of his students.',
  'Python → Angular → Playwright → AI agents. He levels up like a game character.',
  'Hiring managers, take notes: this is what an Automation Lead looks like.',
  'Toronto, Doha, Kerala. Tested across continents, never flaky.',
];

export const buddyReactions = {
  tickle: ['Hehe, that tickles!', 'Careful, I’m ticklish!', 'Boop received 💗'],
  dizzy: ['Whoa, slow down! I’m only crawling here 😵‍💫', 'Speed-scrolling detected… my legs!'],
  wake: ['Huh? Oh! I’m awake, I’m awake 👀', 'Zzz… wha… I was just running a background job.'],
  sleep: ['Nobody’s scrolling… time for a quick nap.'],
  return: ['Welcome back! I kept your place warm.'],
};

export const buddyFacts = [
  'Did you know? Playwright ships test agents: a planner, a generator and a healer that explore an app, write tests and fix broken ones.',
  '2026 trend: agents drive real browsers through MCP using the accessibility tree, not screenshots. Fast and less flaky.',
  'MCP (Model Context Protocol) is now the common way to plug tools into agents: browsers, test runners, Jira, databases.',
  'QA tip: getByRole locators survive redesigns far better than CSS or XPath because they test what users actually see.',
  'Testing AI features? Exact-match asserts break on LLM output. Teams use evals and LLM-as-judge graders instead.',
  'Agentic QA works best with a human in the loop: agents draft the tests, engineers review and own them.',
  'Self-healing locators are handy, but review every heal. A silent fix can hide a real bug.',
  'Shift-left with AI: generate BDD scenarios straight from user stories so the tests exist before the code does.',
  'Contract tests catch breaking API changes between services long before slow end-to-end suites do.',
  'A lot of flaky UI tests come down to timing. Auto-waiting and web-first assertions remove most hard-coded sleeps.',
  'Fun fact: in 1947 Grace Hopper’s team taped a real moth into the Harvard Mark II logbook as the “first actual case of bug being found”.',
];
