from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import ContactInquiry
from app.schemas import PublicContactCreate, PublicContactOut

router = APIRouter(prefix="/api/contact", tags=["contact"])


@router.post("", response_model=PublicContactOut, status_code=status.HTTP_201_CREATED)
def create_contact_inquiry(payload: PublicContactCreate, db: Session = Depends(get_db)):
    # Honeypot: acknowledge bot submissions without storing them.
    if payload.website.strip():
        return {"id": "", "status": "Received"}

    inquiry = ContactInquiry(
        name=payload.name.strip(),
        email=str(payload.email).lower(),
        company=payload.company.strip(),
        service=payload.service.strip(),
        message=payload.message.strip(),
    )
    db.add(inquiry)
    db.commit()
    db.refresh(inquiry)
    return {"id": inquiry.id, "status": inquiry.status}
