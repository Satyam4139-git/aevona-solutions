from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.security import hash_password
from app.models import Admin, FAQ, BillingPlan, PortfolioItem

DEFAULT_PLANS = [
    {
        "name": "Starter",
        "price": "$199",
        "billing_period": "monthly",
        "features": ["1 active project", "5 GB storage", "2 team seats", "Email support"],
        "is_popular": False,
    },
    {
        "name": "Professional",
        "price": "$799",
        "billing_period": "monthly",
        "features": ["10 active projects", "100 GB storage", "15 team seats", "Priority support"],
        "is_popular": True,
    },
    {
        "name": "Business",
        "price": "$1,999",
        "billing_period": "monthly",
        "features": ["Unlimited projects", "500 GB storage", "50 team seats", "Dedicated account manager"],
        "is_popular": False,
    },
    {
        "name": "Enterprise",
        "price": "Custom",
        "billing_period": "monthly",
        "features": ["Unlimited everything", "Custom SLA", "Unlimited seats", "24/7 white-glove support"],
        "is_popular": False,
    },
]

DEFAULT_PORTFOLIO = [
    {
        "name": "Jap-Earthquake-ml",
        "category": "AI & ML",
        "description": "Graph Neural Networks and swarm intelligence for post-earthquake bridge damage assessment.",
        "project_url": "https://github.com/HarshRajSahu007/Jap-Earthquake-ml",
        "sort_order": 1,
    },
    {
        "name": "MultiAgent_Real_Estate_CB",
        "category": "AI & ML",
        "description": "A multi-agent real estate assistant with property issue detection and tenant FAQs.",
        "project_url": "https://github.com/HarshRajSahu007/MultiAgent_Real_Estate_CB",
        "sort_order": 2,
    },
    {
        "name": "AI-Powered Insurance Claim Analysis System",
        "category": "AI & ML",
        "description": "Insurance claim analysis using OCR, document parsing, NLP, embeddings, XGBoost, and FastAPI.",
        "project_url": "https://github.com/Dimple-11/Ai_claim_model_1",
        "sort_order": 3,
    },
    {
        "name": "Sentiment Analysis on Social Media Posts",
        "category": "AI & ML",
        "description": "An RNN sentiment classifier with NLTK preprocessing and Flask predictions.",
        "project_url": "https://github.com/Dimple-11/Sentimental-Analysis",
        "sort_order": 4,
    },
    {
        "name": "Smart Travel Reservation System",
        "category": "Web & Application Development",
        "description": "A full-stack bus and railway reservation platform with unified schedule management.",
        "project_url": "https://github.com/mukunda6751/JAVA-PROJECT",
        "sort_order": 5,
    },
    {
        "name": "Phishing URL Detection",
        "category": "Data & Analytics",
        "description": "A LightGBM pipeline that classifies phishing and legitimate URLs using engineered features.",
        "project_url": "https://github.com/Satyam4139-git/phishing_project",
        "sort_order": 6,
    },
    {
        "name": "Superstore Sales Dataset Analysis",
        "category": "Data & Analytics",
        "description": "Business intelligence analysis of profitability, ROI, and regional margins.",
        "project_url": "https://github.com/sanskarsinha677/superstore-sql-analysis",
        "sort_order": 7,
    },
    {
        "name": "Digital Onboarding System",
        "category": "Business Automation",
        "description": "KYC/KYB and CRM integration architecture with idempotent webhooks and compliance rules.",
        "project_url": "https://github.com/sanskarsinha677/digital-onboarding-kyc-kyb-crm-requirements-pack",
        "sort_order": 8,
    },
    {
        "name": "CascadeX – Early Information Cascade Prediction",
        "category": "AI & ML",
        "description": "A graph-based machine learning project for early information cascade prediction in social networks.",
        "project_url": "https://github.com/Dimple-11/CascadeX-Early-Information-Cascade-Prediction-in-Social-Networks",
        "sort_order": 9,
    },
    {
        "name": "EduFlow – Modern Educational Platform",
        "category": "Web & Application Development",
        "description": "A mobile-first education platform built with React, Vite, TypeScript, and Tailwind CSS.",
        "project_url": "https://github.com/Dimple-11/EduFlow",
        "sort_order": 10,
    },
]

DEFAULT_FAQS = [
    {
        "question": "How do I request a new service or project?",
        "answer": "Navigate to the Services page from your dashboard, choose the service you need, and submit a request with your budget and requirements.",
    },
    {
        "question": "How can I invite teammates to my workspace?",
        "answer": "Go to Team & Access Control, click Invite Team Member, and provide their name, email, role, and department.",
    },
    {
        "question": "Where can I download my invoices?",
        "answer": "All invoices are available under Billing & Subscription in the Billing History section as downloadable PDFs.",
    },
]
def seed_defaults(db: Session) -> None:
    if db.query(BillingPlan).count() == 0:
        for plan in DEFAULT_PLANS:
            db.add(BillingPlan(**plan))

    for item in DEFAULT_PORTFOLIO:
        existing = db.query(PortfolioItem).filter(PortfolioItem.name == item["name"]).first()
        if existing is None:
            db.add(PortfolioItem(**item))

    if db.query(FAQ).count() == 0:
        for faq in DEFAULT_FAQS:
            db.add(FAQ(**faq))

    # The password admin is only created when ADMIN_PASSWORD is set in the
    # environment. Never hard-code an admin password in a public repository.
    admin_username = settings.admin_username.strip() or "admin"
    admin_password = settings.admin_password
    if admin_password:
        admin = db.query(Admin).filter(Admin.username == admin_username).first()
        if admin is None:
            db.add(
                Admin(
                    username=admin_username,
                    name="Aevona Administrator",
                    hashed_password=hash_password(admin_password),
                )
            )

    db.commit()
