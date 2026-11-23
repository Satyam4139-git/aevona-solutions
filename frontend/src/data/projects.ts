export interface ShowcaseProject {
  id: number;
  name: string;
  category: 'AI & ML' | 'Web & Application Development' | 'Data & Analytics' | 'Business Automation';
  summary: string;
  details: string;
  highlights: string[];
  tech: string[];
}

/* Single source of truth for the projects shown on the Home and Portfolio pages.
   Names only + details — no repository links. */
export const SHOWCASE_PROJECTS: ShowcaseProject[] = [
  {
    id: 1,
    name: 'Japanese Earthquake Model',
    category: 'AI & ML',
    summary: 'Post-earthquake bridge damage assessment',
    details:
      'An intelligent damage-assessment system that uses swarm-intelligence optimization to prioritize structurally vulnerable bridge regions. Graph Neural Networks model the connectivity between bridge components to pinpoint damage-prone sections.',
    highlights: ['Swarm-intelligence prioritization', 'Graph-based structural modelling', 'Faster inspection planning'],
    tech: ['Graph Neural Networks', 'Python', 'Optimization'],
  },
  {
    id: 2,
    name: 'Multi Agent Real Estate Chatbot',
    category: 'AI & ML',
    summary: 'Specialist AI agents for property and tenancy queries',
    details:
      'A multi-agent real estate assistant with an intelligent router that directs each query to a specialist agent for property issue detection or tenancy FAQs. Computer vision and NLP enable automated property assessment and tenant query resolution.',
    highlights: ['Intelligent query routing', 'Property issue detection from images', 'Automated tenancy support'],
    tech: ['Multi-Agent AI', 'Computer Vision', 'NLP'],
  },
  {
    id: 3,
    name: 'AI Insurance Claim Analysis System',
    category: 'AI & ML',
    summary: 'Automated claim reading, summarizing and risk scoring',
    details:
      'An AI pipeline combining OCR, PDF parsing, NLP summarization, embeddings and XGBoost to analyse insurance claims automatically. A FastAPI backend processes structured and unstructured claim data for risk classification.',
    highlights: ['OCR and document parsing', 'NLP claim summaries', 'Automated risk classification'],
    tech: ['OCR', 'XGBoost', 'FastAPI'],
  },
  {
    id: 4,
    name: 'Social Media Sentiment Analysis',
    category: 'AI & ML',
    summary: 'Real-time sentiment classification of posts',
    details:
      'A recurrent-neural-network sentiment classifier backed by an NLP preprocessing pipeline for tokenization, stop-word removal and stemming, delivering real-time predictions through a Flask service.',
    highlights: ['RNN-based classifier', 'Full text-cleaning pipeline', 'Real-time predictions'],
    tech: ['RNN', 'NLTK', 'Flask'],
  },
  {
    id: 5,
    name: 'Smart Travel Reservation System',
    category: 'Web & Application Development',
    summary: 'Unified bus and railway ticket booking',
    details:
      'A full-stack platform for booking bus and railway tickets in one place. Travellers search routes, check seat availability, book and manage reservations, while administrators manage schedules, vehicles, bookings and records.',
    highlights: ['Route search and seat availability', 'Booking and reservation management', 'Admin control panel'],
    tech: ['Java', 'Full-Stack', 'Database'],
  },
  {
    id: 6,
    name: 'Phishing URL Detection',
    category: 'Data & Analytics',
    summary: 'Machine-learning detection of malicious links',
    details:
      'A machine-learning pipeline that classifies URLs as phishing or legitimate using engineered URL features and a LightGBM classifier, with data analysis, model evaluation, exported predictions and a deployable trained-model bundle.',
    highlights: ['Engineered URL features', 'LightGBM classifier', 'Deployable model bundle'],
    tech: ['LightGBM', 'Python', 'Feature Engineering'],
  },
  {
    id: 7,
    name: 'Superstore Sales Analytics',
    category: 'Data & Analytics',
    summary: 'Profitability, ROI and regional margin insights',
    details:
      'A business analytics project covering profitability, ROI and regional margin analysis. Dynamic KPI dashboards and standardized metric definitions improve reporting consistency and reveal operational efficiency gaps.',
    highlights: ['Dynamic KPI dashboards', 'Regional margin analysis', 'Standardized metrics'],
    tech: ['SQL', 'Dashboards', 'KPI Design'],
  },
  {
    id: 8,
    name: 'Digital Onboarding & KYC Platform',
    category: 'Business Automation',
    summary: 'Compliant KYC/KYB and CRM onboarding workflow',
    details:
      'A KYC/KYB and CRM integration solution backed by full requirements documentation (BRD, FRS, RTM), use cases and structured test scenarios. It features an idempotent webhook architecture and a PASS / REVIEW / FAIL rule engine for audit traceability.',
    highlights: ['Idempotent webhook design', 'PASS / REVIEW / FAIL rule engine', 'Audit and compliance traceability'],
    tech: ['KYC / KYB', 'CRM Integration', 'Rule Engine'],
  },
  {
    id: 9,
    name: 'CascadeX Information Cascade Prediction',
    category: 'AI & ML',
    summary: 'Early prediction of how information spreads',
    details:
      'A machine-learning project that predicts information cascades at an early stage in social networks, exploring how content propagates through connected users and network structures.',
    highlights: ['Early cascade prediction', 'Network structure analysis', 'Propagation modelling'],
    tech: ['Machine Learning', 'Network Analysis', 'Python'],
  },
  {
    id: 10,
    name: 'EduFlow Learning Platform',
    category: 'Web & Application Development',
    summary: 'Mobile-first modern EdTech experience',
    details:
      'A modern, mobile-first educational platform built with React, Vite, TypeScript and Tailwind CSS, delivering an interactive learning experience across mobile, tablet and desktop.',
    highlights: ['Mobile-first responsive design', 'Interactive learning interface', 'Startup-grade EdTech UI'],
    tech: ['React', 'TypeScript', 'Tailwind CSS'],
  },
];

export const PROJECT_CATEGORIES = [
  'All',
  'AI & ML',
  'Web & Application Development',
  'Data & Analytics',
  'Business Automation',
];
