// Contract template definitions for QDaria employment agreements

export interface ContractClause {
  id: string;
  title: string;
  category:
    | "employment"
    | "compensation"
    | "benefits"
    | "duties"
    | "equity"
    | "nda"
    | "non_compete"
    | "conflict"
    | "professional_dev"
    | "termination"
    | "severance"
    | "norwegian_law";
  content: string; // Template text with {{placeholders}}
  required: boolean;
  enabled: boolean; // default state
}

export interface ContractTemplate {
  id: string;
  name: string;
  description: string;
  clauses: ContractClause[];
}

// ---------------------------------------------------------------------------
// Role-specific duties - each title gets individually tailored responsibilities
// ---------------------------------------------------------------------------

export const roleDuties: Record<string, string> = {
  "CEO & Founder": `4. INDIVIDUAL DUTIES & RESPONSIBILITIES

As CEO & Founder, the Employee holds ultimate responsibility for all strategic, operational, and financial aspects of QDaria Holdings AS and its subsidiary companies.

4.1 Strategic Leadership:
  - Define and execute the company's long-term vision for topological quantum computing with Fibonacci anyons
  - Lead fundraising efforts across all funding rounds (Seed through IPO)
  - Maintain relationships with key investors, partners, and government stakeholders
  - Represent QDaria at industry conferences, speaking engagements, and media appearances

4.2 Technology Oversight:
  - Guide the technical roadmap for quantum hardware development and quantum-AI integration
  - Oversee intellectual property strategy including patent portfolio management
  - Ensure research output meets academic and commercial quality standards

4.3 Team & Operations:
  - Build and manage the executive team across 6 subsidiary companies (Zipminator, Qm9, QMikeAI, QNilaya, QDiana, QLillian)
  - Define company culture, values, and professional development standards
  - Approve all hiring decisions, compensation changes, and equity grants
  - Chair Board of Directors meetings and manage governance processes

4.4 Financial Governance:
  - Approve annual budgets and major expenditure decisions
  - Maintain fiduciary responsibility to shareholders and the Board
  - Ensure regulatory compliance across all operating entities`,

  COO: `4. INDIVIDUAL DUTIES & RESPONSIBILITIES

As Chief Operating Officer, the Employee is responsible for translating the CEO's strategic vision into operational execution across QDaria Holdings and all subsidiary companies.

4.1 Operations Management:
  - Design and implement operational processes, KPIs, and reporting structures across all 6 subsidiaries (Zipminator, Qm9, QMikeAI, QNilaya, QDiana, QLillian)
  - Manage day-to-day operations including resource allocation, project timelines, and delivery milestones
  - Establish and monitor operational budgets in coordination with the Finance Director
  - Implement quality management systems for quantum hardware development and software delivery

4.2 Organizational Development:
  - Build organizational structure including hiring plans, role definitions, and team composition
  - Develop and maintain standard operating procedures (SOPs) for all business functions
  - Drive cross-functional collaboration between subsidiary companies
  - Implement tools and systems for project management, communication, and knowledge sharing

4.3 Partnership & Business Development:
  - Identify and negotiate strategic partnerships with quantum hardware providers (Rigetti, IBM, Bluefors)
  - Manage relationships with government agencies for quantum technology grants and contracts
  - Develop go-to-market strategies for subsidiary products and services
  - Coordinate with the Sales Director on pipeline management and revenue targets

4.4 Compliance & Risk:
  - Ensure compliance with Norwegian labor law, GDPR, and industry regulations
  - Manage vendor relationships and procurement processes
  - Oversee facility management and IT infrastructure
  - Implement business continuity and disaster recovery plans

IMPORTANT: The COO is expected to fully commit to QDaria's operational framework, adopt company guidelines and culture, and align with the CEO's strategic direction. External advisory roles, board positions, or promotional activities for competing ventures are strictly prohibited per the Conflict of Interest clause.`,

  CFO: `4. INDIVIDUAL DUTIES & RESPONSIBILITIES

As Chief Financial Officer, the Employee is responsible for all financial strategy, reporting, and fiscal governance across QDaria Holdings AS and its subsidiary companies.

4.1 Financial Strategy:
  - Develop and execute the company's financial strategy aligned with growth objectives
  - Lead financial planning and analysis (FP&A) including multi-year projections and scenario modeling
  - Manage relationships with banks, auditors, and financial institutions
  - Advise the CEO and Board on capital allocation, investment decisions, and risk management

4.2 Fundraising & Investor Relations:
  - Lead financial due diligence processes for fundraising rounds (Seed through IPO)
  - Prepare financial models, pitch materials, and data rooms for investor presentations
  - Manage cap table administration, share registry, and shareholder communications
  - Coordinate grant reporting and financial compliance for research and innovation funding

4.3 Financial Operations:
  - Oversee accounting, payroll, accounts payable/receivable, and treasury management
  - Prepare monthly, quarterly, and annual financial statements in accordance with Norwegian GAAP
  - Manage cash flow forecasting and working capital optimization
  - Coordinate with external auditors for statutory audits and tax filings

4.4 Tax, Compliance & Procurement:
  - Ensure tax compliance across all Norwegian entities including VAT, corporate tax, and employer contributions
  - Manage transfer pricing documentation for inter-company transactions
  - Oversee procurement processes, vendor negotiations, and cost optimization initiatives
  - Maintain compliance with the Norwegian Accounting Act, Securities Act, and relevant EU regulations`,

  "Asst. CEO": `4. INDIVIDUAL DUTIES & RESPONSIBILITIES

As Assistant to the CEO, the Employee serves as the CEO's primary strategic partner, handling legal, regulatory, and IP matters while deputizing for the CEO as needed.

4.1 Legal & Regulatory:
  - Manage all legal affairs including contract review, corporate governance, and regulatory compliance
  - Oversee intellectual property strategy: patent filings, trade secret protection, and IP licensing
  - Coordinate with external legal counsel on corporate matters and employment law compliance
  - Ensure compliance with Norwegian Company Act, Securities Act, and relevant EU regulations

4.2 CEO Support & Governance:
  - Deputize for the CEO in meetings, negotiations, and public appearances when required
  - Prepare Board of Directors meeting agendas, materials, and minutes
  - Manage stakeholder communications including investor updates and annual reports
  - Coordinate executive team meetings and track strategic initiative progress

4.3 Corporate Development:
  - Support fundraising activities including due diligence, term sheet negotiation, and investor relations
  - Manage subsidiary incorporation processes and inter-company agreements
  - Oversee ESG (Environmental, Social, Governance) compliance and sustainability reporting

4.4 Human Resources Oversight:
  - Review and approve employment contracts and compensation changes
  - Ensure workplace policies comply with Norwegian Working Environment Act
  - Manage conflict resolution and employee relations matters`,

  "Chief Content Officer": `4. INDIVIDUAL DUTIES & RESPONSIBILITIES

As Chief Content Officer, the Employee is responsible for all external and internal communications, brand strategy, and content production across QDaria Holdings and subsidiaries.

4.1 Brand & Communications:
  - Develop and maintain QDaria's brand identity across all subsidiary companies
  - Create comprehensive content strategy for website, social media, press releases, and investor materials
  - Manage media relations and public communications
  - Produce video content, podcasts, and multimedia assets for marketing and education

4.2 Marketing:
  - Design and execute marketing campaigns for product launches across subsidiaries
  - Manage digital marketing channels including SEO, SEM, email marketing, and social media
  - Create investor pitch decks, product brochures, and sales collateral
  - Coordinate event marketing for conferences, trade shows, and speaking engagements

4.3 Internal Communications:
  - Develop internal communication channels and employee engagement content
  - Create onboarding materials and company culture documentation
  - Produce educational content explaining quantum computing concepts for non-technical audiences

4.4 Content Quality:
  - Maintain editorial standards and brand guidelines
  - Review all external publications for accuracy and brand consistency
  - Manage content calendar and production workflow`,

  "Chief Social Responsibility Officer": `4. INDIVIDUAL DUTIES & RESPONSIBILITIES

As Chief Social Responsibility Officer, the Employee leads QDaria's commitment to social impact, sustainability, and ethical business practices.

4.1 CSR Strategy:
  - Develop and implement QDaria's Corporate Social Responsibility framework
  - Align company operations with UN Sustainable Development Goals (SDGs)
  - Manage relationships with NGOs, educational institutions, and community organizations
  - Report on ESG metrics to the Board and external stakeholders

4.2 Sustainability:
  - Develop environmental sustainability targets and reduction strategies
  - Coordinate B Corp certification process and UN Global Compact membership
  - Implement responsible supply chain practices
  - Track and report carbon footprint across all operations

4.3 Community & Education:
  - Partner with educational institutions on quantum computing literacy programs
  - Develop diversity, equity, and inclusion (DEI) initiatives
  - Organize community engagement programs and volunteer opportunities
  - Manage QDaria's philanthropic activities and sponsorship programs

4.4 Governance:
  - Ensure ethical AI and quantum computing practices across all subsidiaries
  - Develop responsible technology guidelines and ethical review processes
  - Support whistleblower protection and ethical reporting mechanisms`,

  "Chief Strategy & Growth Officer": `4. INDIVIDUAL DUTIES & RESPONSIBILITIES

As Chief Strategy & Growth Officer, the Employee drives strategic planning, market expansion, and business growth across the QDaria portfolio.

4.1 Strategic Planning:
  - Develop multi-year strategic plans for QDaria Holdings and each subsidiary
  - Conduct market analysis, competitive intelligence, and industry trend assessment
  - Identify growth opportunities including new markets, partnerships, and M&A targets
  - Present quarterly strategic reviews to the CEO and Board

4.2 Business Development:
  - Build and maintain pipeline of strategic partnerships and customer relationships
  - Negotiate commercial agreements, licensing deals, and joint venture terms
  - Develop pricing strategies and revenue models for subsidiary products
  - Coordinate with sales team on enterprise account management

4.3 Market Expansion:
  - Identify and evaluate international expansion opportunities
  - Develop go-to-market strategies for new product verticals
  - Assess government contract opportunities (Norwegian, Nordic, EU quantum initiatives)
  - Manage application processes for research grants and innovation funding

4.4 Analytics & Reporting:
  - Define and track KPIs across all business units
  - Produce market intelligence reports and competitive analyses
  - Develop financial projections and business cases for new initiatives`,

  "Chief Admin Officer": `4. INDIVIDUAL DUTIES & RESPONSIBILITIES

As Chief Administrative Officer, the Employee manages all administrative operations, HR processes, and organizational support functions.

4.1 Human Resources:
  - Manage recruitment, onboarding, and offboarding processes
  - Administer payroll processing and benefits administration
  - Maintain employee records and ensure compliance with employment law
  - Coordinate performance review cycles and compensation reviews

4.2 Office & Facilities:
  - Manage office operations, supplies, and facility maintenance
  - Coordinate IT equipment procurement and distribution
  - Manage company cabin booking and maintenance
  - Oversee vendor relationships for office services

4.3 Administrative Operations:
  - Manage company calendar, meeting scheduling, and travel arrangements
  - Process expense reports and maintain financial documentation
  - Coordinate Board of Directors logistics and meeting preparation
  - Manage company insurance policies and renewals

4.4 Organizational Support:
  - Develop and maintain company policies and employee handbook
  - Coordinate team-building events, salary-day activities, and company retreats
  - Manage internal knowledge management systems and documentation
  - Support audit preparation and regulatory compliance documentation`,

  "Head of Networking": `4. INDIVIDUAL DUTIES & RESPONSIBILITIES

As Head of Networking, the Employee builds and maintains strategic relationships, business networks, and partnership ecosystems.

4.1 Network Development:
  - Build relationships with key decision-makers in quantum technology, AI, and related industries
  - Develop and manage QDaria's presence at industry events, conferences, and executive forums
  - Identify and engage potential investors, customers, and strategic partners
  - Maintain a CRM database of industry contacts and relationship status

4.2 Real Estate & Facilities:
  - Identify and negotiate office space, laboratory facilities, and data center locations
  - Manage property portfolio including leases, renovations, and expansions
  - Coordinate with architects and contractors on facility buildouts
  - Assess real estate opportunities for company growth

4.3 Government Relations:
  - Build relationships with Norwegian government agencies relevant to quantum technology
  - Coordinate with Innovation Norway, Research Council of Norway, and Nordic quantum initiatives
  - Support grant application processes and government contract bids
  - Represent QDaria in industry associations and standards bodies

4.4 Event Management:
  - Organize QDaria-hosted events, workshops, and networking sessions
  - Coordinate speaking engagements and panel appearances for leadership team
  - Manage sponsorship and exhibition presence at key industry events`,

  "Test Engineer": `4. INDIVIDUAL DUTIES & RESPONSIBILITIES

As Test Engineer, the Employee ensures quality and reliability across all quantum software, AI systems, and product deliveries.

4.1 Quality Assurance:
  - Design and implement comprehensive test strategies for quantum computing software
  - Develop automated testing frameworks for quantum circuit validation and simulation
  - Perform integration testing across quantum hardware interfaces and classical computing systems
  - Validate AI model performance, accuracy, and robustness across subsidiary products

4.2 Quantum-Specific Testing:
  - Test quantum circuit compilation, optimization, and execution pipelines
  - Validate quantum error correction implementations and fault tolerance metrics
  - Benchmark quantum algorithm performance against classical alternatives
  - Test quantum-classical hybrid workflows and data pipelines

4.3 CI/CD & DevOps:
  - Maintain continuous integration and deployment pipelines
  - Implement code quality gates, static analysis, and security scanning
  - Manage test environments including quantum simulator configurations
  - Document test procedures, results, and known issues

4.4 Reporting:
  - Produce test coverage reports and quality metrics for each sprint
  - Track and manage bug lifecycle from discovery through resolution
  - Participate in code reviews and architectural design discussions
  - Contribute to technical documentation and developer guidelines`,

  "Chief Data Officer": `4. INDIVIDUAL DUTIES & RESPONSIBILITIES

As Chief Data Officer, the Employee manages all data assets, analytics infrastructure, and data governance across QDaria subsidiaries.

4.1 Data Strategy:
  - Define and implement enterprise data strategy across all subsidiaries
  - Design data architectures for quantum computing workloads and AI training pipelines
  - Establish data governance policies including quality, privacy, and security standards
  - Manage data partnerships and external dataset licensing

4.2 Analytics & AI:
  - Build and maintain analytics dashboards for business intelligence
  - Develop data pipelines for quantum experiment results and performance metrics
  - Implement machine learning models for business optimization
  - Create data-driven insights for strategic decision-making

4.3 Data Engineering:
  - Design and operate data infrastructure (databases, data lakes, ETL pipelines)
  - Manage cloud computing resources and data storage optimization
  - Implement GDPR compliance processes and data protection measures
  - Ensure data backup, recovery, and business continuity for critical datasets

4.4 Research Support:
  - Support quantum computing research with data collection and analysis tools
  - Develop benchmark datasets for quantum algorithm evaluation
  - Collaborate with researchers on statistical analysis and results validation`,

  "Finance Director": `4. INDIVIDUAL DUTIES & RESPONSIBILITIES

As Finance Director, the Employee manages financial operations, budgeting, and financial reporting for QDaria Holdings and subsidiaries.

4.1 Financial Management:
  - Prepare and manage annual budgets for the holding company and all subsidiaries
  - Manage cash flow, accounts payable/receivable, and treasury operations
  - Coordinate with external auditors for annual financial statements
  - Prepare financial reports for Board meetings and investor updates

4.2 Funding & Investor Relations:
  - Support fundraising activities with financial models and projections
  - Prepare due diligence documentation for potential investors
  - Manage cap table administration and share registry
  - Coordinate grant reporting and financial compliance for research funding

4.3 Tax & Compliance:
  - Ensure tax compliance across all Norwegian entities
  - Manage VAT reporting, corporate tax returns, and employer contributions
  - Coordinate with tax advisors on transfer pricing and international tax matters
  - Maintain compliance with Norwegian Accounting Act and relevant financial regulations

4.4 Procurement:
  - Manage procurement processes for equipment, services, and supplies
  - Negotiate vendor contracts and payment terms
  - Track and report on cost optimization initiatives`,

  "Chief Sales Officer": `4. INDIVIDUAL DUTIES & RESPONSIBILITIES

As Chief Sales Officer, the Employee drives revenue generation across QDaria's subsidiary products and services.

4.1 Sales Strategy:
  - Develop and execute sales strategies for quantum computing products and services
  - Build and manage sales pipeline with enterprise and government customers
  - Define pricing strategies, discount frameworks, and deal structures
  - Set and track revenue targets and sales KPIs

4.2 Customer Management:
  - Manage key customer relationships and accounts
  - Conduct product demonstrations and technical presentations
  - Negotiate contracts and service-level agreements
  - Drive customer success and retention programs

4.3 Market Development:
  - Identify and qualify new market opportunities for quantum technology products
  - Develop channel partner relationships and reseller agreements
  - Support marketing team with customer case studies and testimonials
  - Represent QDaria at trade shows, conferences, and customer events

4.4 Team & Process:
  - Build and manage sales team as company grows
  - Implement CRM systems and sales process automation
  - Produce regular sales forecasts and pipeline reports
  - Collaborate with product teams on feature prioritization based on customer needs`,

  "Sales Director": `4. INDIVIDUAL DUTIES & RESPONSIBILITIES

As Sales Director, the Employee drives revenue generation across QDaria's subsidiary products and services.

4.1 Sales Strategy:
  - Develop and execute sales strategies for quantum computing products and services
  - Build and manage sales pipeline with enterprise and government customers
  - Define pricing strategies, discount frameworks, and deal structures
  - Set and track revenue targets and sales KPIs

4.2 Customer Management:
  - Manage key customer relationships and accounts
  - Conduct product demonstrations and technical presentations
  - Negotiate contracts and service-level agreements
  - Drive customer success and retention programs

4.3 Market Development:
  - Identify and qualify new market opportunities for quantum technology products
  - Develop channel partner relationships and reseller agreements
  - Support marketing team with customer case studies and testimonials
  - Represent QDaria at trade shows, conferences, and customer events

4.4 Team & Process:
  - Build and manage sales team as company grows
  - Implement CRM systems and sales process automation
  - Produce regular sales forecasts and pipeline reports
  - Collaborate with product teams on feature prioritization based on customer needs`,

  "Head of Culture & Events": `4. INDIVIDUAL DUTIES & RESPONSIBILITIES

As Head of Culture & Events, the Employee shapes QDaria's workplace culture and manages employee experience initiatives.

4.1 Company Culture:
  - Develop and maintain QDaria's company culture framework and values
  - Design and implement employee engagement programs and surveys
  - Create and manage the company's reading program and knowledge-sharing initiatives
  - Drive diversity, inclusion, and belonging initiatives across all teams

4.2 Events & Social:
  - Plan and execute monthly team-building activities and salary-day events
  - Organize annual company retreats and quarterly off-sites
  - Manage company cabin (hytte) bookings and maintenance
  - Coordinate holiday celebrations, milestone recognitions, and social gatherings

4.3 Wellness:
  - Manage the health and wellness bonus program (exercise, nutrition, sleep)
  - Coordinate with gym facilities and wellness providers for corporate programs
  - Organize wellness challenges and healthy lifestyle initiatives
  - Track and report on employee wellness participation metrics

4.4 Employer Branding:
  - Support recruitment efforts through employer branding initiatives
  - Create content showcasing QDaria's culture for social media and careers page
  - Manage internal communications and newsletter
  - Coordinate with marketing on external employer brand messaging`,

  "Chief of Agentic Systems": `4. INDIVIDUAL DUTIES & RESPONSIBILITIES

As Chief of Agentic Systems, the Employee leads the design, development, and deployment of AI agent architectures and autonomous systems across QDaria subsidiaries.

4.1 Technical Leadership:
  - Architect and implement multi-agent AI systems for quantum computing orchestration
  - Design neural-symbolic AI frameworks integrating classical ML with quantum algorithms
  - Lead development of autonomous agent swarms for research automation and code generation
  - Define technical standards for agentic system reliability, safety, and performance

4.2 Research & Development:
  - Conduct research on large language model integration with quantum computing workflows
  - Develop novel agent coordination protocols (hierarchical, mesh, consensus-based)
  - Publish research findings in peer-reviewed venues and contribute to open-source projects
  - Evaluate and integrate emerging AI technologies (transformers, diffusion models, reinforcement learning)

4.3 Product Development:
  - Lead engineering teams building QDaria's AI-powered products and services
  - Define product roadmaps for agentic AI tools across subsidiary companies
  - Ensure AI systems meet quality, safety, and ethical standards
  - Manage technical debt, code quality, and system architecture evolution

4.4 Team & Mentorship:
  - Recruit, mentor, and develop engineering talent in AI and quantum computing
  - Conduct code reviews and technical design reviews
  - Foster a culture of innovation, experimentation, and continuous learning
  - Collaborate with academic institutions on research partnerships and internship programs`,

  "Dev Intern & Board Member": `4. INDIVIDUAL DUTIES & RESPONSIBILITIES

As Development Intern & Board Member, the Employee combines hands-on quantum computing development with governance responsibilities.

4.1 Development:
  - Contribute to quantum software development under supervision of senior engineers
  - Implement and test quantum circuits, algorithms, and simulation tools
  - Participate in code reviews and documentation efforts
  - Learn and apply quantum-AI integration techniques across subsidiary projects

4.2 Research Support:
  - Assist with research paper preparation, literature reviews, and data analysis
  - Maintain research databases and experimental logs
  - Participate in journal clubs and internal research presentations
  - Support patent application preparation with technical documentation

4.3 Board Responsibilities:
  - Attend Board of Directors meetings and contribute to governance discussions
  - Review and provide input on strategic decisions and company direction
  - Represent the perspective of early-career employees and interns
  - Support Board committees as assigned

4.4 Learning & Development:
  - Complete mandatory reading program (1 book/month)
  - Pursue relevant quantum computing certifications and courses
  - Participate in hackathons, competitions, and industry events
  - Document learnings and share knowledge with the team`,
};

/**
 * Look up role-specific duties text for a given job title.
 * Falls back to the Test Engineer template if no match is found.
 */
export function getRoleDuties(title: string): string {
  return roleDuties[title] || roleDuties["Test Engineer"] || "";
}

// ---------------------------------------------------------------------------
// Main employment contract template
// ---------------------------------------------------------------------------

export const employmentContractTemplate: ContractTemplate = {
  id: "employment-standard-v2",
  name: "Standard Employment Agreement",
  description:
    "Comprehensive employment contract covering all standard terms for QDaria Holdings AS employees, compliant with Norwegian Working Environment Act (Arbeidsmiljoloven).",
  clauses: [
    // -----------------------------------------------------------------------
    // Section 1 - Employment Terms
    // -----------------------------------------------------------------------
    {
      id: "employment-terms",
      title: "1. Employment Terms",
      category: "employment",
      required: true,
      enabled: true,
      content: `1. EMPLOYMENT TERMS

The Employer, QDaria Holdings AS (Org. Nr. 932 163 378), hereby employs {{employeeName}} ("the Employee") under the following terms and conditions, effective as of the date of execution of this Agreement.

Position: {{title}}
Department: {{department}}
Employment Type: {{employmentType}}
Start Date: {{startDate}}
Reporting To: CEO, Daniel Mo Houshmand
Place of Work: Oslo, Norway (hybrid - combination of office and remote work as agreed with management)

Probationary Period: The first six (6) months of employment constitute a probationary period in accordance with the Norwegian Working Environment Act (arbeidsmiljoloven) Section 15-6. During this period, the notice period is one (1) month, and the Employee's performance, conduct, and suitability for the position will be evaluated.

The Employee shall perform duties consistent with the above position, as described in Section 4 (Individual Duties & Responsibilities), as well as any additional responsibilities reasonably assigned by the Employer. The Employee acknowledges that QDaria is an early-stage startup and that flexibility in role scope is expected.

This agreement is governed by the Norwegian Working Environment Act (arbeidsmiljoloven) and supersedes any prior agreements, whether written or oral, between the parties regarding the subject matter hereof. Any amendments to this Agreement must be made in writing and signed by both parties.`,
    },

    // -----------------------------------------------------------------------
    // Section 2 - Compensation
    // -----------------------------------------------------------------------
    {
      id: "compensation",
      title: "2. Compensation",
      category: "compensation",
      required: true,
      enabled: true,
      content: `2. COMPENSATION

2.1 Base Salary:
The Employee shall receive a gross annual base salary of EUR {{salaryEur}} (NOK {{salaryNok}}), paid monthly on the 25th of each calendar month. If the 25th falls on a weekend or public holiday, payment shall be made on the preceding business day. The accrual and disbursement of the Base Salary is subject to Section 2.2 below (Pre-Funding Salary Deferral).

2.2 Pre-Funding Salary Deferral:
Notwithstanding Section 2.1, no Base Salary, performance bonus, occupational pension contribution (OTP) under Section 3.3, wellness bonus under Section 3.4, or salary-day allowance under Section 3.8 shall accrue or be paid to the Employee until the first calendar month following the close of QDaria Holdings AS's first qualified equity funding round.

For purposes of this Section, a "qualified funding round" means a Seed round (or any subsequent round) closed by binding subscription agreement with aggregate gross proceeds of EUR 5,000,000 or more, evidenced by counter-signed subscription documentation and confirmed transfer of funds into the Company's designated escrow or operating account.

Upon close of the qualified funding round, Base Salary commences on the next regular pay date (the 25th of the following calendar month) at the gross annual rate set forth in Section 2.1. The Employee's vesting under Section 5 (Equity), seniority, accrued holiday entitlement (feriepenger), and statutory employment protections under arbeidsmiljøloven begin on the Employee's nominal Start Date and are unaffected by this deferral.

The Employee acknowledges that they work at risk during the pre-funding period and that the Company has no obligation to retroactively pay Base Salary, bonuses, or pension contributions for time worked prior to the qualified funding round close. Reasonable, pre-approved out-of-pocket business expenses (travel, software licences, hardware) remain reimbursable per Section 3.5 throughout the pre-funding period.

If a qualified funding round has not closed by 31 December 2027, the parties shall meet in good faith to revise the salary terms in this Agreement. Failure to reach revised terms shall not constitute breach by either party; the Employee retains the right to terminate at will under Section 8 without penalty during such review period.

2.3 Salary Progression by Funding Round:
Once Base Salary commences under Section 2.2, the Employee's Base Salary is expected to increase as the Company achieves successive funding milestones. The following salary progression schedule is indicative and subject to Board approval at each stage:

[SALARY_TABLE_PLACEHOLDER]

Salary adjustments take effect within thirty (30) days of confirmed funding round closure, subject to formal Board approval. The Company reserves the right to adjust these projections based on business performance and market conditions.

2.4 Annual Review:
Salary is reviewed annually each January, beginning the first January following Base Salary commencement under Section 2.2. A cost-of-living adjustment of 3-5% applies independently of funding round milestones, benchmarked against Norwegian Consumer Price Index (KPI) published by Statistics Norway (SSB). Additional merit-based increases may be awarded at the Board's discretion.

2.5 Performance Bonus:
The Employee is eligible for a performance bonus of 0-15% of annual base salary, evaluated quarterly by the CEO and Board of Directors. Bonus criteria include:
  (a) Delivery of assigned milestones and KPIs on time and to quality standards
  (b) Cross-functional collaboration and measurable contribution to team objectives
  (c) Innovation, initiative, and proactive problem-solving within area of responsibility
  (d) Alignment with company culture, values, and the QDaria Way

Bonus payments are discretionary and contingent on both individual performance and the Company's financial position. Bonuses are paid within 30 days of the end of each evaluation quarter, and accrue only after the qualified funding round close per Section 2.2.

2.6 Funding Milestone Bonuses:
The Employee is entitled to the following one-time bonuses upon the Company's successful completion of each funding round:

[FUNDING_BONUS_TABLE_PLACEHOLDER]

Milestone bonuses are paid within thirty (30) days of the triggering event. Equity acceleration applies to the Employee's total unvested equity across all QDaria companies. The Employee must be actively employed at the time of the triggering event to receive the bonus.

[MARKET_SALARY_BENCHMARK_TABLE_PLACEHOLDER]

[BENEFITS_TABLE_PLACEHOLDER]

2.7 Tax & Social Contributions:
The Employee is responsible for all personal taxes and social contributions as required by Norwegian law. The Employer shall withhold and remit statutory contributions (arbeidsgiveravgift) on behalf of the Employee in accordance with the National Insurance Act (folketrygdloven), beginning with the first Base Salary payment under Section 2.2.

2.8 Performance-Based Equity Increases:
Employees who materially contribute to securing funding rounds may receive additional equity grants, increasing total equity above their base tier allocation under Section 5 up to a maximum of 20.0% across all QDaria companies. Such grants are subject to Board approval and determined based on the employee's direct contribution to investor relations, due diligence support, fundraising activities, and strategic value creation. Performance equity is granted as additional spinoff shares and follows the same vesting schedule as the base equity grant.`,
    },

    // -----------------------------------------------------------------------
    // Section 2.5 - Compensation Philosophy
    // -----------------------------------------------------------------------
    {
      id: "compensation-philosophy",
      title: "2.5 Compensation Philosophy",
      category: "compensation",
      required: true,
      enabled: true,
      content: `2.5 Compensation Philosophy:
This compensation has been determined according to the QDaria Compensation Philosophy. The Employer evaluates each individual base salary against the following factors: (a) education and credentials, (b) prior professional experience, (c) demonstrable contribution to QDaria to date, (d) tenure with the Company and date of joining, (e) domain expertise relevant to the role, (f) market benchmarking against Norwegian and EU medians for equivalent roles, (g) role criticality and direct revenue or fundraising impact, (h) funding stage of the Company at the time of offer, (i) geographic anchor (Oslo/Norway cost-of-living and statutory benefits framework), (j) performance history during probation and after, (k) board approval at material thresholds. Norwegian medians are sourced from publicly available wage statistics published by Statistics Norway (SSB) and cross-referenced with Ravio, Sifted, Carta, and WTW Nordic compensation surveys; the underlying values used by QDaria are documented in QDaria Compensation, Equity and Contract Master Reference, Section 2.0a.

{{compensationPhilosophyParagraph}}
This Section 2.5 is informational and does not modify the base salary set forth in Section 2.1, the deferral terms in Section 2.2, the progression schedule in Section 2.3, the bonus framework in Section 2.4, or any other compensation-related provision of this Agreement. Annual review under Section 2.3 may revise the percentage above median assigned to the Employee, subject to Board approval.`,
    },

    // -----------------------------------------------------------------------
    // Section 3 - Benefits & Perks
    // -----------------------------------------------------------------------
    {
      id: "benefits",
      title: "3. Benefits & Perks",
      category: "benefits",
      required: false,
      enabled: true,
      content: `3. BENEFITS & PERKS

3.1 Vacation:
The Employee is entitled to six (6) weeks (30 working days) of annual paid leave, exceeding the Norwegian statutory minimum of five (5) weeks (25 days) under the Holiday Act (ferieloven). Holiday pay (feriepenger) is calculated at 14% of gross salary from the preceding calendar year, exceeding the statutory rates of 10.2% (under 60 years) and 12.0% (60 years and older). Holiday pay is disbursed in June of each year in accordance with standard Norwegian practice.

3.2 Working Hours:
The standard working day is six (6) hours, corresponding to a 30-hour work week. This is significantly below the Norwegian standard of 7.5 hours per day (37.5-hour week) and reflects QDaria's commitment to work-life balance and productivity-focused work culture. A hybrid working model applies, with flexibility for remote work as agreed with management. Core hours (when the Employee must be available) are 10:00-15:00 CET, Monday through Friday.

3.3 Pension:
The Employer contributes to an occupational pension scheme (tjenestepensjonsordning) at the mandatory minimum of 2% of salary between 1G and 12G (Obligatory Occupational Pension / OTP), in accordance with the OTP Act (lov om obligatorisk tjenestepensjon). Additionally, the Employer may provide voluntary employer contributions of up to 5% of salary based on company financial performance, communicated annually.

3.4 Health & Wellness Bonus:
The Employee is eligible for a monthly wellness bonus of up to NOK 2,000 for documented healthy lifestyle activities. Qualifying activities include gym memberships, sports club fees, fitness classes, nutrition programs, sleep optimization programs, mental health services, and similar wellness-related expenses. Annual wellness budget: NOK 24,000. Reimbursement requires submission of receipts via the company expense system by the 15th of each month.

3.5 Equipment:
The Company shall provide the Employee with:
  (a) A laptop computer suitable for the Employee's role (replaced every 3 years or as needed)
  (b) A mobile phone with company-paid subscription
  (c) Necessary software licenses and development tools
  (d) Ergonomic office equipment (monitor, keyboard, chair) for both office and home workspace
  (e) Company car may be offered when company finances allow, subject to Board approval

All company-provided equipment remains the property of QDaria Holdings AS and must be returned upon termination of employment.

3.6 Professional Development:
  (a) Mandatory Reading Program: The Employee shall complete a minimum of one (1) book per month from the QDaria reading program. The program includes foundational titles such as "Built to Last" by Jim Collins, "Good to Great" by Jim Collins, "The Innovator's Dilemma" by Clayton Christensen, and domain-specific quantum computing and AI literature appropriate to the Employee's role and level. Reading lists are updated quarterly by leadership.
  (b) Course & Certification Funding: Courses, certifications, and formal education directly relevant to the Employee's role are funded by the Company, including full salary continuation during approved study periods.
  (c) MBA Opportunity: The Company may sponsor MBA studies at accredited institutions under a separate learning agreement. A sliding-scale clawback applies: 100% repayment if the Employee leaves within 6 months of program completion, decreasing by 4.17% per month, reaching 0% after 24 months post-completion.
  (d) Annual Development Budget: EUR 5,000 per calendar year for conferences, workshops, online courses, certifications, and professional memberships. Unused budget does not carry over.

3.7 Facilities:
  (a) Company Cabin (Hytte): A company-owned cabin is available for employee use for recreation and team retreats, subject to a booking system managed by the Chief Admin Officer. Employees may book up to 2 weeks per year for personal use.
  (b) Daily Lunch: Free lunch is provided when working from the office, prepared by external catering or at partner restaurants.

3.8 Team Building:
  (a) Monthly Salary-Day Events: On each salary day (25th), the company hosts a team event including restaurant dinners, cultural activities, or social gatherings. Attendance is encouraged but voluntary.
  (b) Annual Company Retreat: A multi-day offsite retreat is organized annually for strategic planning, team bonding, and celebration of achievements. Travel and accommodation are covered by the Company.
  (c) Quarterly Off-Sites: Department-level team-building events are organized each quarter.

3.9 Insurance:
The Company provides the following insurance coverage in accordance with Norwegian statutory requirements and supplementary coverage:
  (a) Occupational injury insurance (yrkesskadeforsikring) as required by the Occupational Injury Insurance Act
  (b) Travel insurance covering business and private travel worldwide
  (c) Group life insurance (gruppelivsforsikring) providing coverage of minimum 10G (National Insurance base amount)
  (d) Supplementary health insurance enabling priority access to specialist consultations and treatment`,
    },

    // -----------------------------------------------------------------------
    // Section 4 - Individual Duties & Responsibilities
    // -----------------------------------------------------------------------
    {
      id: "duties",
      title: "4. Individual Duties & Responsibilities",
      category: "duties",
      required: true,
      enabled: true,
      content: `{{roleDuties}}

4.5 General Responsibilities (All Employees):

All QDaria employees, regardless of role or seniority, share the following responsibilities:

  (a) Actively participate in QDaria's mandatory reading program (1 book/month minimum) and apply insights to daily work
  (b) Attend and contribute to all scheduled team meetings, including weekly standups, monthly reviews, and quarterly strategy sessions
  (c) Maintain accurate time tracking and submit timesheets weekly via the company's project management system
  (d) Complete all mandatory training modules within 30 days of assignment, including information security, GDPR compliance, and workplace safety
  (e) Respond to internal communications within 24 business hours during core working hours (10:00-15:00 CET, Monday through Friday)
  (f) Document all work processes, decisions, and outcomes in the company's knowledge management system
  (g) Participate in quarterly OKR (Objectives and Key Results) setting and monthly progress reviews
  (h) Report any suspected security incidents, data breaches, or compliance violations immediately to the CEO or Chief Admin Officer
  (i) Contribute to a positive, inclusive, and collaborative workplace culture aligned with the QDaria Way
  (j) Mentor junior team members and share domain expertise through internal presentations and knowledge sharing sessions
  (k) Maintain professional competency through continuous learning in quantum computing, AI, and relevant technology domains
  (l) Comply with all company policies as documented in the Employee Handbook, including the Code of Conduct and Social Media Policy
  (m) Participate in company-organized events including salary-day gatherings, annual retreats, and quarterly off-sites
  (n) Protect company intellectual property and maintain confidentiality of all proprietary information
  (o) Support cross-functional initiatives and provide assistance to colleagues across subsidiary companies when requested`,
    },

    // -----------------------------------------------------------------------
    // Section 5 - Equity & Share Vesting
    // -----------------------------------------------------------------------
    {
      id: "equity",
      title: "5. Equity & Share Vesting",
      category: "equity",
      required: false,
      enabled: true,
      content: `5. EQUITY & SHARE VESTING

5.1 How Your Equity Is Structured:
The Employee's equity grant consists of multiple separate ownership stakes, one in QDaria Holdings AS and one in each registered spinoff (Zipminator AS, Qm9 AS, QMikeAI AS, QNilaya AS, QDiana AS, QLillian AS). These are legally distinct equity instruments in legally distinct companies. They are not aggregated into a single cap table.

The "Total" percentage shown in Section 5.4 is the SUM of the Employee's stakes across all entities, presented for compensation transparency only - it is not a single grant on a single cap table. Each stake vests independently per the schedule in Section 5.3.

Liquidity events flow as follows:
  (a) If a single spinoff has a liquidity event (acquisition, IPO, secondary), payout flows from that spinoff's cap table to the Employee for that spinoff's stake only. The Employee's holding stake and other spinoff stakes are unaffected.
  (b) If QDaria Holdings AS itself has a liquidity event, payout flows from the holding's cap table for the Employee's holding stake. Spinoff stakes remain in their respective entities.
  (c) The holding stake does NOT add to the individual spinoff cap tables. The "Total" is a sum across separate entities, not a single equity instrument.

The holding stake represents the Employee's "skin in the parent" - it pays out when the parent itself has a liquidity event or distributes profits. Each spinoff stake represents the Employee's "skin in that specific company" - it pays out when that company has its own liquidity event.

5.2 Equity Grant:
The Employee is granted {{equityPercentage}}% equity in QDaria Holdings AS via {{shareType}} shares (the "Holding Stake") and the per-spinoff stakes set forth in Section 5.4, all subject to the vesting schedule described below. This equity grant is made pursuant to the QDaria Equity Incentive Plan and the Company's Shareholders' Agreement.

5.3 Vesting Schedule:
  - Total Vesting Period: 48 months (4 years) from the Start Date
  - Cliff Period: {{cliffMonths}} months from the Start Date
  - Vesting Frequency: Monthly, pro rata, after successful completion of the cliff period
  - Acceleration: Standard single-trigger acceleration applies upon a Change of Control event (defined as acquisition of more than 50% of voting shares by a third party, or a merger where existing shareholders hold less than 50% of the surviving entity)

No shares shall vest prior to the completion of the cliff period. Upon termination of employment prior to full vesting, all unvested shares shall be forfeited automatically and returned to the Company's equity pool. Vesting begins on the Employee's nominal Start Date and is independent of the salary deferral in Section 2.2.

5.4 Equity Allocation Across QDaria Companies:
The Employee's equity allocation across QDaria companies is as follows:

[EQUITY_TABLE_PLACEHOLDER]

Total equity across all companies: {{totalEquityPct}}% (sum across separate cap tables, see Section 5.1).

[CAP_TABLE_PLACEHOLDER]

5.5 Contingent Spinoff Reallocation:
The Employee's per-spinoff equity grants in Section 5.4 are conditional upon QDaria Holdings AS incorporating each named subsidiary (Zipminator AS, Qm9 AS, QMikeAI AS, QNilaya AS, QDiana AS, QLillian AS) as a distinct legal entity registered with Brønnøysundregistrene (Foretaksregisteret) on or before 31 December 2029.

If, by 1 January 2030, one or more named spinoffs has not been formally registered, the per-spinoff equity grant allocated to each non-registered entity shall be REDISTRIBUTED PRO-RATA across the remaining registered spinoffs as of that date. The Employee's holding-level equity grant in QDaria Holdings AS (Section 5.2) shall not be affected by this redistribution under any circumstances.

The Employee's vesting schedule, cliff, and total cumulative equity grant remain unchanged following redistribution. Redistribution is computed as:

  bonus_per_survivor = (sum of lapsed per-spinoff grants) / (number of registered spinoffs as of 2030-01-01)

and added to each registered spinoff's existing per-employee grant. The cap table of each surviving spinoff shall be updated to reflect the new per-employee allocation, subject to Board approval and Shareholders' Agreement compliance.

Worked examples (Senior tier baseline 0.50% per spinoff, 0.75% holding, 3.75% total):

  - All 6 spinoffs incorporated by 2029-12-31:
    Holding 0.75% + 6 x 0.500% = 3.75% total

  - 1 spinoff fails to incorporate (5 surviving):
    Lapsed: 0.500% / 5 = +0.100% per survivor
    Holding 0.75% + 5 x 0.600% = 3.75% total (unchanged)

  - 2 spinoffs fail to incorporate (4 surviving):
    Lapsed: 1.000% / 4 = +0.250% per survivor
    Holding 0.75% + 4 x 0.750% = 3.75% total (unchanged)

The Employee's TOTAL equity is preserved across all reallocation scenarios. Reallocation takes effect on 1 January 2030.

5.6 CEO First-Refusal Right:
The CEO/Founder retains the right of first refusal to purchase any shares the Employee wishes to sell, at fair market value determined by the most recent independent valuation or the price per share established in the most recent funding round. This right applies for thirty (30) calendar days from written notice of the Employee's intended sale. If the CEO/Founder does not exercise this right within 30 days, the Company (QDaria Holdings AS) shall have a secondary right of first refusal for an additional 15 days. This right applies independently to the Holding Stake and to each per-spinoff stake.

5.7 Transfer Restrictions:
The Employee shall not sell, transfer, pledge, or otherwise dispose of any vested shares (whether in the holding or in any spinoff) without first offering them to the CEO/Founder and the Company as described above. Any transfer to a third party must be approved by the Board of Directors of the relevant entity and comply with existing pre-emption rights in the Shareholders' Agreement.

5.8 Regulatory Compliance:
Share issuance, vesting, and transfer in QDaria Holdings AS and each spinoff are subject to the relevant Shareholders' Agreement, the Norwegian Limited Liability Companies Act (aksjeloven), and applicable Norwegian securities regulations. The Employee acknowledges that shares may be subject to lock-up periods in connection with future financing rounds or an initial public offering of any QDaria entity.`,
    },

    // -----------------------------------------------------------------------
    // Section 6 - Confidentiality & Non-Disclosure
    // -----------------------------------------------------------------------
    {
      id: "nda",
      title: "6. Confidentiality & Non-Disclosure",
      category: "nda",
      required: true,
      enabled: true,
      content: `6. CONFIDENTIALITY & NON-DISCLOSURE

6.1 Confidential Information:
The Employee acknowledges that during the course of employment, they will have access to and become acquainted with Confidential Information belonging to QDaria Holdings AS and its subsidiaries ("the Company Group").

"Confidential Information" includes, but is not limited to:
  (a) Quantum computing methods, algorithms, circuit designs, and architectures, including but not limited to Fibonacci anyon braiding protocols, topological qubit implementations, and quantum error correction schemes
  (b) Proprietary source code, research data, experimental results, simulation outputs, and trade secrets
  (c) Machine learning models, training data, AI agent architectures, and neural network configurations
  (d) Customer and partner data, including contact information, contract terms, and business relationships
  (e) Business strategies, financial projections, fundraising activities, investor communications, and cap table information
  (f) Employee compensation, equity arrangements, vesting schedules, and internal policies
  (g) Patent applications (filed and in preparation), invention disclosures, and intellectual property strategies
  (h) Any information marked as confidential or that a reasonable person would understand to be confidential given the nature of the information and circumstances of disclosure

6.2 Obligations:
The Employee shall not, during or after employment, disclose, publish, or use any Confidential Information for any purpose other than performing their duties for the Company Group. The Employee shall take all reasonable precautions to prevent unauthorized disclosure, including securing physical documents, using strong passwords, and following company information security policies.

6.3 Dual-Duration Protection:

  (a) Trade Secrets (Perpetual Protection): Information classified as trade secrets - including but not limited to Fibonacci anyon protocols, topological braiding algorithms, qubit architectures, quantum error correction implementations, and proprietary quantum-AI integration methods - shall be protected in perpetuity, for as long as the information retains its character as a trade secret under the Norwegian Trade Secrets Act (forretningshemmelighetsloven) and applicable EU directives.

  (b) General Business Information (5-Year Protection): All other Confidential Information as defined in Section 6.1 shall be protected for a period of five (5) years following the termination of employment, regardless of the reason for termination.

6.4 Exceptions:
This obligation does not apply to information that:
  (a) Is or becomes publicly available through no fault of the Employee
  (b) Was already known to the Employee prior to employment, as documented in writing
  (c) Is independently developed by the Employee without use of Confidential Information
  (d) Is required to be disclosed by law, regulation, or court order, provided the Employee gives prompt written notice to the Company and cooperates in seeking protective measures

6.5 Scope:
This clause covers all entities within the QDaria Company Group, including QDaria Holdings AS and all current and future subsidiary and affiliated companies.

6.6 Return of Materials:
Upon termination of employment, or at any time upon the Company's request, the Employee shall immediately return all documents, files, data, devices, and materials containing Confidential Information and shall permanently delete all electronic copies from personal devices and cloud storage.`,
    },

    // -----------------------------------------------------------------------
    // Section 7 - Non-Compete
    // -----------------------------------------------------------------------
    {
      id: "non-compete",
      title: "7. Non-Compete",
      category: "non_compete",
      required: false,
      enabled: true,
      content: `7. NON-COMPETE

7.1 Restriction:
Upon termination of employment, the Employee agrees to a non-compete restriction for a period of twelve (12) months, which is the maximum permitted under Norwegian law (Arbeidsmiljoloven Chapter 14A, Sections 14A-1 through 14A-4).

7.2 Scope of Restriction:
During the non-compete period, the Employee shall not:
  (a) Be employed by, consult for, or provide services to any company, organization, or entity that directly competes with QDaria's core activities in topological quantum computing, quantum-AI integration, or related quantum technology products and services
  (b) Establish, co-found, or participate in the founding of a business that directly competes with QDaria's core activities
  (c) Solicit, recruit, or attempt to recruit any current employees, contractors, or consultants of QDaria Holdings AS or its subsidiaries
  (d) Solicit, divert, or attempt to divert any customers, partners, or suppliers of the Company Group

The geographic scope of this restriction is worldwide, limited to the topological quantum computing and quantum-AI industries.

7.3 Compensation During Non-Compete Period:
In accordance with Arbeidsmiljoloven Section 14A-3, the Employee shall receive compensation during the non-compete period as follows:
  - 100% of the Employee's annual base salary up to eight times the National Insurance base amount (8G)
  - 70% of the Employee's annual base salary for amounts between 8G and 12G
  - No compensation is payable on salary amounts exceeding 12G

Compensation is paid monthly during the non-compete period. The Employer may deduct income earned by the Employee from other sources during this period, up to a maximum of 50% of the compensation otherwise payable.

7.4 Written Form & Justification:
This non-compete clause is established in writing as required by law. Upon the Employee's written request, the Employer shall provide a written justification for invoking the non-compete restriction within four (4) weeks. The justification shall describe the particular circumstances that make the restriction necessary to protect the Company's legitimate business interests.

7.5 Employer's Right to Waive:
The Employer reserves the right to waive the non-compete restriction in whole or in part at the time of termination, by providing written notice to the Employee. If waived, the Employee is released from the restriction and the Employer's compensation obligation ceases, subject to a one-month wind-down period.

7.6 Enforceability:
If any provision of this non-compete clause is found to be unenforceable by a court of competent jurisdiction, the remaining provisions shall remain in full force and effect, and the unenforceable provision shall be modified to the minimum extent necessary to make it enforceable.

[NON_COMPETE_TABLE_PLACEHOLDER]`,
    },

    // -----------------------------------------------------------------------
    // Section 8 - Conflict of Interest
    // -----------------------------------------------------------------------
    {
      id: "conflict-of-interest",
      title: "8. Conflict of Interest",
      category: "conflict",
      required: true,
      enabled: true,
      content: `8. CONFLICT OF INTEREST

8.1 Disclosure Obligation:
The Employee must promptly disclose ALL outside interests to the CEO in writing, including but not limited to:
  (a) Directorships, board memberships, or advisory roles in any company or organization
  (b) Equity holdings, stock options, or financial interests in any company
  (c) Consulting, freelance, or part-time employment arrangements
  (d) Involvement in any business venture, whether compensated or voluntary
  (e) Family relationships with employees, customers, suppliers, or competitors of QDaria
  (f) Any situation that could reasonably be perceived as a conflict with QDaria's interests

Disclosure must be made at the time of signing this Agreement and within five (5) business days of any change in circumstances.

8.2 Prohibited Activities:
The Employee shall not, without prior written consent from the CEO:
  (a) Advise, consult for, or hold equity in any competing quantum computing, quantum-AI, or topological computing company or venture
  (b) Engage in any business activity that conflicts with, or could reasonably be perceived to conflict with, the interests of QDaria Holdings AS or its subsidiaries
  (c) Use QDaria resources, intellectual property, facilities, or business relationships for personal benefit or the benefit of any third party
  (d) Accept gifts, compensation, hospitality, or benefits from third parties in connection with QDaria business, except de minimis items (value under NOK 500)
  (e) Promote, endorse, or provide testimonials for competing ventures, whether publicly or privately
  (f) Serve as a spokesperson, brand ambassador, or public representative for any entity whose interests conflict with QDaria's

8.3 Exclusive Commitment:
The Employee agrees to dedicate their professional quantum computing and AI expertise exclusively to QDaria during the term of employment. Academic research, open-source contributions, and non-competing professional activities are permitted with prior CEO approval and subject to the IP and confidentiality provisions of this Agreement.

8.4 Consequences:
Violations of this clause may constitute grounds for immediate termination for cause, forfeiture of unvested equity, and potential legal action for damages. The Employee acknowledges that breach of this clause may cause irreparable harm to the Company, entitling QDaria to seek injunctive relief in addition to any other available remedies.`,
    },

    // -----------------------------------------------------------------------
    // Section 9 - Professional Development
    // -----------------------------------------------------------------------
    {
      id: "professional-development",
      title: "9. Professional Development",
      category: "professional_dev",
      required: false,
      enabled: true,
      content: `9. PROFESSIONAL DEVELOPMENT

QDaria is committed to the continuous growth and development of its team. The Employee agrees to participate in the following professional development initiatives:

9.1 Mandatory Reading Program:
The Employee shall complete a minimum of one (1) book per month from the QDaria curated reading program. The program is structured in tiers:

  (a) Foundational (all employees):
      - "Built to Last" by Jim Collins
      - "Good to Great" by Jim Collins
      - "The Innovator's Dilemma" by Clayton Christensen
      - "Zero to One" by Peter Thiel
      - "Thinking, Fast and Slow" by Daniel Kahneman

  (b) Leadership (C-Suite and Leadership tiers):
      - "The Hard Thing About Hard Things" by Ben Horowitz
      - "High Output Management" by Andy Grove
      - "Measure What Matters" by John Doerr
      - "Principles" by Ray Dalio

  (c) Domain-Specific (role-dependent):
      - Quantum computing, quantum information theory, and topological quantum computation texts
      - AI, machine learning, and neural network literature
      - Industry-specific texts relevant to the Employee's functional area

Reading lists are updated quarterly by leadership. The Employee is expected to share key insights with the team through monthly book discussions.

9.2 Courses, Certifications & Education:
  (a) The Company funds courses, certifications, and formal education directly relevant to the Employee's role, with full salary continuation during approved study periods.
  (b) Annual professional development budget: EUR 5,000 per calendar year for conferences, workshops, online courses, certifications, and professional association memberships.
  (c) Requests for development funding are submitted to the Employee's direct supervisor and approved by the CEO.

9.3 MBA Opportunity:
The Company may sponsor MBA studies at accredited institutions, subject to a separate learning agreement. Terms include:
  (a) Full or partial tuition coverage as determined by the Board
  (b) Salary continuation during approved study periods
  (c) Sliding-scale repayment obligation: 100% if the Employee leaves within 6 months of program completion, declining by 4.17% per month, reaching 0% after 24 months post-completion

9.4 Internal Training & Knowledge Sharing:
  (a) Mandatory participation in all company-organized training sessions, workshops, and seminars
  (b) The Employee shall deliver at least one (1) internal presentation per quarter, sharing domain expertise, project learnings, or industry insights
  (c) Participation in weekly journal clubs and research discussions is encouraged

9.5 Conferences & Publications:
The Company encourages participation in relevant conferences and academic publications, subject to:
  (a) Prior approval by the CEO or direct supervisor
  (b) Confidentiality review of all materials before submission or presentation
  (c) Compliance with IP assignment and publication policies`,
    },

    // -----------------------------------------------------------------------
    // Section 10 - Termination
    // -----------------------------------------------------------------------
    {
      id: "termination",
      title: "10. Termination",
      category: "termination",
      required: true,
      enabled: true,
      content: `10. TERMINATION

10.1 Termination for Cause (Immediate Termination / Avskjed):
The Employer may terminate this agreement immediately and without notice (avskjed) in accordance with Arbeidsmiljoloven Section 15-14 in the event of:
  (a) Fraud, embezzlement, theft, or other criminal conduct related to the employment
  (b) Breach of confidentiality or NDA obligations as set forth in Section 6
  (c) Gross misconduct or willful neglect of duties
  (d) Material violation of company policies, including the Conflict of Interest provisions
  (e) Criminal conviction relevant to the Employee's position or the Company's reputation
  (f) Repeated failure to meet performance standards after written warning and reasonable opportunity for improvement

The Employee's right to contest dismissal under Norwegian law is preserved.

10.2 Termination Without Cause (Oppsigelse):
Either party may terminate this agreement by providing written notice in accordance with the Norwegian Working Environment Act (Arbeidsmiljoloven Section 15-3):
  - During probationary period (first 6 months): 1 month notice
  - After probation, less than 5 years tenure: 1 month notice
  - 5-10 years tenure: 2 months notice
  - Over 10 years tenure: 3 months notice
  - Employee aged 50+ with 10+ years tenure: 4 months notice
  - Employee aged 55+ with 10+ years tenure: 5 months notice
  - Employee aged 60+ with 10+ years tenure: 6 months notice

Notice periods run from the first day of the month following delivery of notice.

10.3 Garden Leave:
The Employer reserves the right to place the Employee on garden leave (fritatt for arbeidsplikt) during the notice period, during which the Employee remains employed and fully compensated but is not required to perform duties. During garden leave, the Employee remains bound by all confidentiality, non-compete, and conflict of interest obligations.

10.4 Exit Procedures:
Upon termination, the Employee shall:
  (a) Return all company property, equipment, documents, and access credentials within 5 business days
  (b) Participate in a structured knowledge transfer and handover process
  (c) Complete an exit interview with the CEO or designated representative
  (d) Delete all company data from personal devices and cloud accounts
  (e) Confirm in writing that all obligations under this section have been fulfilled

[SEVERANCE_TABLE_PLACEHOLDER]

[NOTICE_PERIOD_TABLE_PLACEHOLDER]`,
    },

    // -----------------------------------------------------------------------
    // Section 11 - Severance
    // -----------------------------------------------------------------------
    {
      id: "severance",
      title: "11. Severance",
      category: "severance",
      required: false,
      enabled: true,
      content: `11. SEVERANCE

11.1 Severance Entitlement:
In the event of termination without cause by the Employer, the Employee shall be entitled to severance pay based on their tier classification:

  - Founder Tier (CEO):      12 months base salary
  - C-Suite Tier:             6 months base salary
  - Leadership Tier:          4 months base salary
  - Specialist Tier:          3 months base salary
  - Intern/Board Tier:        2 months base salary

11.2 Conditions:
Severance payment is conditional upon:
  (a) The Employee signing a full release and settlement agreement (sluttavtale) within 30 days of termination
  (b) Full compliance with all post-termination obligations including NDA, non-compete, and conflict of interest provisions
  (c) Return of all company property, documents, equipment, and access credentials
  (d) Completion of knowledge transfer and handover procedures
  (e) Written confirmation of deletion of company data from personal devices

11.3 Payment:
Severance shall be paid as a lump sum within thirty (30) days of executing the release agreement, less applicable tax withholding. Alternatively, the Employee may elect to receive severance in monthly installments over the severance period.

11.4 Statutory Entitlements:
This severance provision is in addition to any statutory entitlements under Norwegian law, including accrued but unpaid salary, holiday pay (feriepenger), and any other amounts legally owed to the Employee.

11.5 Change of Control:
In the event of a Change of Control (as defined in Section 5.2) followed by involuntary termination of the Employee within 12 months, the Employee shall receive an additional severance payment equal to 3 months base salary, in addition to the tier-based severance described above.`,
    },

    // -----------------------------------------------------------------------
    // Section 12 - Norwegian Law Specifics
    // -----------------------------------------------------------------------
    {
      id: "norwegian-law",
      title: "12. Norwegian Law & Employment Specifics",
      category: "norwegian_law",
      required: true,
      enabled: true,
      content: `12. NORWEGIAN LAW & EMPLOYMENT SPECIFICS

This Agreement is governed by and shall be construed in accordance with Norwegian law. The following provisions reflect QDaria's compliance with, and enhancements beyond, Norwegian statutory employment requirements.

12.1 Working Environment:
This employment relationship is governed by the Norwegian Working Environment Act (arbeidsmiljoloven) of 17 June 2005. The Employer is committed to maintaining a safe, healthy, and inclusive working environment as required by Chapters 4 and 4A of the Act.

12.2 Vacation & Holiday Pay:
  (a) Vacation: 6 weeks (30 working days) annual paid leave, exceeding the statutory minimum of 5 weeks (25 days) under the Holiday Act (ferieloven)
  (b) Holiday Pay (Feriepenger): 14% of gross salary from the preceding calendar year, exceeding the statutory rates of 10.2% (under 60) and 12.0% (60 and older)
  (c) Holiday pay is disbursed in June in accordance with standard Norwegian practice
  (d) The Employee is entitled to transfer up to 2 weeks (10 days) of unused vacation to the following year, in accordance with the Holiday Act

12.3 Working Hours:
  (a) Standard working day: 6 hours (30-hour work week), significantly below the Norwegian statutory normal of 7.5 hours per day (37.5 hours per week) under Arbeidsmiljoloven Section 10-4
  (b) Hybrid working model with flexibility for remote work as agreed with management
  (c) Core hours: 10:00-15:00 CET, Monday through Friday
  (d) Overtime is compensated in accordance with Arbeidsmiljoloven Section 10-6, with a minimum 40% supplement. However, given the reduced work hours, overtime should be rare and must be pre-approved by management.

12.4 Pension (OTP):
The Employer participates in an occupational pension scheme (obligatorisk tjenestepensjon / OTP) in accordance with the OTP Act. Minimum employer contribution is 2% of salary between 1G and 12G, with voluntary additional contributions as described in Section 3.3.

12.5 Sick Leave:
  (a) The Employee is entitled to sick pay (sykepenger) in accordance with the National Insurance Act (folketrygdloven Chapter 8)
  (b) Employer-paid sick leave period: 16 calendar days (arbeidsgiverperioden)
  (c) After the employer period, NAV (Norwegian Labour and Welfare Administration) assumes responsibility
  (d) Self-certification (egenmelding): up to 3 consecutive calendar days, maximum 4 times per 12-month period, in accordance with company policy

12.6 Parental Leave:
The Employee is entitled to parental leave in accordance with Arbeidsmiljoloven Chapter 12 and the National Insurance Act, including:
  (a) Pregnancy leave and maternity/paternity leave as per statutory entitlements
  (b) Parental benefit (foreldrepenger) at 100% coverage for 49 weeks or 80% for 59 weeks
  (c) QDaria supplements parental benefit to ensure 100% salary coverage for the full benefit period, subject to the Company's financial position

12.7 Anti-Discrimination:
QDaria is an equal opportunity employer. Discrimination based on gender, ethnicity, religion, disability, sexual orientation, age, or any other protected characteristic is prohibited in accordance with the Equality and Anti-Discrimination Act (likestillings- og diskrimineringsloven).

12.8 Data Protection:
Personal data relating to the Employee is processed in accordance with the General Data Protection Regulation (GDPR) and the Norwegian Personal Data Act (personopplysningsloven). The Employee's consent for necessary data processing is obtained through a separate data processing agreement.

12.9 Dispute Resolution:
Any disputes arising from this Agreement shall first be attempted resolved through good-faith negotiation between the parties. If negotiation fails, disputes shall be resolved in accordance with Norwegian law by the Oslo District Court (Oslo tingrett) as the agreed venue of first instance.

12.10 Severability:
If any provision of this Agreement is found to be invalid, illegal, or unenforceable by a court of competent jurisdiction, the remaining provisions shall continue in full force and effect. The invalid provision shall be modified to the minimum extent necessary to make it valid and enforceable while preserving the parties' original intent.

[STOCK_OPTION_TAX_TABLE_PLACEHOLDER]

[VESTING_NORMS_TABLE_PLACEHOLDER]`,
    },
    {
      id: "references",
      title: "13. References & Market Benchmarks",
      category: "norwegian_law",
      required: false,
      enabled: true,
      content: `13. REFERENCES & MARKET BENCHMARKS

13.1 Compensation Benchmarks:
The compensation structure in this Agreement has been benchmarked against the following industry sources:

  (a) XAnge / Coulter Partners 2024 European Deep-Tech Compensation Survey: Median executive compensation at Seed/Series A stage for quantum technology companies.
  (b) Glassdoor / Levels.fyi European startup data (2024-2025): Salary ranges for comparable roles at pre-seed to seed stage technology companies in the Nordic region.
  (c) Hunt Club 2024 Compensation Report: Non-founder executive equity benchmarks at venture-backed technology companies.
  (d) Y Combinator standard guidance: Industry-standard equity allocation practices for hired executives vs. co-founders.

13.2 Equity Benchmarks:
  (a) Non-founder C-Suite equity at Seed stage: 1-5% (industry standard)
  (b) Non-founder Leadership equity at Seed stage: 0.5-2% (industry standard)
  (c) Specialist equity at Seed stage: 0.1-1% (industry standard)
  (d) QDaria's equity allocations are positioned at approximately 50% above market top-end to reflect the early-stage risk premium and the Company's commitment to rewarding early team members.

13.3 Norwegian Market Context:
  (a) Norway's cost-of-living index: 69.0 (Numbeo, 2025), the highest in the Nordics
  (b) Norwegian tech salaries typically command a 10-20% premium above European averages
  (c) QDaria's salaries are positioned at 5-10% above Norwegian market median for comparable roles

13.4 Quantum Computing Industry Context:
  (a) Global quantum computing VC investment: USD 1.9 billion across 62 rounds in 2024
  (b) Average quantum seed round: ~USD 10 million in 2025 (up from USD 2 million in 2018)
  (c) Comparable company benchmarks: IQM (EUR 200M Series B), PsiQuantum (USD 7B valuation), QuEra (USD 230M), QuantWare (EUR 20M Series A)

[BONUS_COMPARISON_TABLE_PLACEHOLDER]`,
    },
  ],
};

/**
 * Fill template placeholders with actual values.
 * Placeholders are in the format {{key}}.
 */
export function fillTemplatePlaceholders(
  template: string,
  values: Record<string, string>,
): string {
  return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return values[key] !== undefined ? values[key] : match;
  });
}

/**
 * NOK to EUR approximate conversion rate.
 * Updated periodically; for display purposes only.
 */
const NOK_TO_EUR = 0.085;

/**
 * Format NOK amount to a readable string.
 */
export function formatNok(amount: number): string {
  return new Intl.NumberFormat("nb-NO", {
    style: "decimal",
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Convert NOK to EUR (approximate).
 */
export function nokToEur(nok: number): number {
  return Math.round(nok * NOK_TO_EUR);
}

/**
 * Map share type labels for display.
 */
export function getShareTypeLabel(tier: string): string {
  switch (tier) {
    case "Founder":
      return "Common (Class A)";
    case "C-Suite":
      return "Preferred (Class B)";
    case "Leadership":
      return "Preferred (Class B)";
    case "Specialist":
      return "Options (ESOP)";
    case "Intern/Board":
      return "Phantom";
    default:
      return "Common";
  }
}

/**
 * Get severance months based on tier.
 */
export function getSeveranceMonths(tier: string): number {
  switch (tier) {
    case "Founder":
      return 12;
    case "C-Suite":
      return 6;
    case "Leadership":
      return 4;
    case "Specialist":
      return 3;
    case "Intern/Board":
      return 2;
    default:
      return 3;
  }
}

/**
 * Role-specific appendix content for non-COO employees.
 * Each tier gets tailored appendix text about their equity rationale.
 */
export const roleAppendices: Record<string, string> = {
  "C-Suite": `APPENDIX C: EQUITY & COMPENSATION RATIONALE

C.1 Market Benchmark
This Agreement provides the Employee with a total equity allocation of 5.0% across QDaria Holdings and eight subsidiary companies (1.0% holding + 0.5% x 8 spinoffs). This allocation is positioned well above the market top-end of 2.5% for non-founder C-Suite executives at seed-stage deep-tech companies, reflecting the early-stage risk premium and the Employee's senior leadership responsibilities across the QDaria portfolio.

C.2 Total Compensation Value
When considering base salary (EUR 108,000 at pre-seed, progressing to EUR 300,000 at IPO), equity (5.0% total), funding milestone bonuses, performance bonuses (0-15%), and benefits (6 weeks vacation, 30-hour work week, wellness bonus, professional development), the total compensation package is well above market for a hired C-Suite executive at a pre-seed deep-tech company.`,

  Leadership: `APPENDIX C: EQUITY & COMPENSATION RATIONALE

C.1 Market Benchmark
This Agreement provides the Employee with a total equity allocation of 2.0% across QDaria Holdings and eight subsidiary companies. This allocation is positioned at approximately 33% above the market top-end of 1.5% for non-founder leadership roles at seed-stage deep-tech companies, reflecting the early-stage risk premium and the Employee's leadership responsibilities.

C.2 Total Compensation Value
When considering base salary (EUR 97,000 at pre-seed, progressing to EUR 1,000,000 at IPO), equity (2.0% total), funding milestone bonuses, performance bonuses (0-15%), and benefits (6 weeks vacation, 30-hour work week, wellness bonus, professional development), the total compensation package is well above market for a leadership role at a pre-seed deep-tech company.`,

  Specialist: `APPENDIX C: EQUITY & COMPENSATION RATIONALE

C.1 Market Benchmark
This Agreement provides the Employee with a total equity allocation of 1.5% (Senior) or 0.6% (Mid-level) across QDaria Holdings and eight subsidiary companies. These allocations are positioned at approximately 50% above the respective market top-ends, reflecting the early-stage risk premium and QDaria's commitment to rewarding early team members.

C.2 Total Compensation Value
When considering base salary, equity, funding milestone bonuses, performance bonuses (0-15%), and benefits (6 weeks vacation, 30-hour work week, wellness bonus, professional development), the total compensation package is competitive for specialist roles at a pre-seed deep-tech company.`,

  "Intern/Board": `APPENDIX C: EQUITY & COMPENSATION RATIONALE

C.1 Market Benchmark
This Agreement provides the Employee with a total equity allocation of 0.2% across QDaria Holdings and eight subsidiary companies, plus Board membership responsibilities. This allocation reflects the early-stage nature of the role combined with governance duties.

C.2 Total Compensation Value
When considering base salary (EUR 55,000 at pre-seed, progressing to EUR 580,000 at IPO), equity (0.2% total), funding milestone bonuses, Board compensation, and benefits (6 weeks vacation, 30-hour work week, wellness bonus, professional development), the total compensation package exceeds market norms for intern-level positions.`,
};
