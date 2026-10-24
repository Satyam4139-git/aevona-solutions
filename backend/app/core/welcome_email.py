import logging
import smtplib
import ssl
from email.message import EmailMessage
from email.utils import formataddr

from app.core.config import settings

logger = logging.getLogger(__name__)

# Aevona brand palette (dark plum + orange/coral, matching the website)
BRAND_DARK = "#100810"
BRAND_ORANGE = "#e08858"
BRAND_PEACH = "#f8e8d8"
BRAND_CREAM = "#fbf4ee"
BRAND_BORDER = "#ebdacd"
BRAND_TEXT = "#1c1019"
BRAND_MUTED = "#5e4650"


def send_client_welcome_email(name: str, recipient: str) -> bool:
    """Send a welcome message for a newly created client account."""
    username = settings.smtp_username.strip()
    password = settings.smtp_password.strip()
    sender = settings.smtp_from_email.strip() or username
    if not username or not password or not sender:
        logger.warning("Welcome email skipped: Gmail SMTP credentials are not configured.")
        return False

    first_name = (name or "there").strip().split()[0]
    message = EmailMessage()
    message["Subject"] = "Welcome to Aevona Solutions"
    message["From"] = formataddr((settings.smtp_from_name, sender))
    message["To"] = recipient
    message.set_content(
        f"""Hi {first_name},

Welcome to Aevona Solutions. Your client account is ready.

Sign in to your client portal: {settings.frontend_url.rstrip("/")}/login

If you did not create this account, please contact our support team.

The Aevona Solutions team
"""
    )
    login_url = f"{settings.frontend_url.rstrip('/')}/login"
    message.add_alternative(
        f"""<!DOCTYPE html>
<html><body style="margin:0;padding:0;background:{BRAND_CREAM};font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:{BRAND_CREAM};padding:24px 0;">
    <tr><td align="center">
      <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid {BRAND_BORDER};">
        <tr><td style="background:{BRAND_DARK};padding:28px 32px;text-align:center;">
          <span style="font-size:26px;letter-spacing:10px;font-weight:700;color:{BRAND_PEACH};">AEVONA</span>
        </td></tr>
        <tr><td style="padding:32px;color:{BRAND_TEXT};font-size:15px;line-height:1.6;">
          <p style="margin:0 0 16px;">Hi {first_name},</p>
          <p style="margin:0 0 16px;">Welcome to Aevona Solutions. Your client account is ready.</p>
          <p style="margin:24px 0;"><a href="{login_url}" style="background:{BRAND_ORANGE};color:{BRAND_DARK};text-decoration:none;font-weight:700;padding:12px 24px;border-radius:8px;display:inline-block;">Sign in to your client portal</a></p>
          <p style="margin:0;color:{BRAND_MUTED};font-size:13px;">If you did not create this account, please contact our support team.</p>
        </td></tr>
        <tr><td style="background:{BRAND_DARK};padding:16px 32px;text-align:center;color:{BRAND_PEACH};font-size:12px;">The Aevona Solutions team</td></tr>
      </table>
    </td></tr>
  </table>
</body></html>""",
        subtype="html",
    )

    try:
        if settings.smtp_use_ssl:
            with smtplib.SMTP_SSL(
                settings.smtp_host, settings.smtp_port, timeout=15,
                context=ssl.create_default_context(),
            ) as server:
                server.login(username, password)
                server.send_message(message)
        else:
            with smtplib.SMTP(settings.smtp_host, settings.smtp_port, timeout=15) as server:
                server.starttls(context=ssl.create_default_context())
                server.login(username, password)
                server.send_message(message)
        return True
    except (OSError, smtplib.SMTPException) as exc:
        logger.warning("Welcome email could not be sent: %s", exc)
        return False