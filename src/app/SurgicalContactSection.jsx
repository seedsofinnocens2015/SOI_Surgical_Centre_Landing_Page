"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaPhone, FaEnvelope, FaClock, FaLocationDot, FaShieldHalved } from 'react-icons/fa6';
import { submitSurgicalConsultation } from '@/app/utils/websiteForms';
import { getThankYouUrl, THANK_YOU_TYPE } from '@/app/utils/thankYou';
import styles from './surgicalContact.module.scss';

const SURGICAL_CENTRES = ['Gurgaon', 'Lucknow', 'Delhi', 'Noida', 'Ghaziabad', 'Meerut', 'Kolkata'];

export default function SurgicalContactSection() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: formData.get('name'),
      phone: formData.get('phone'),
      center: formData.get('center'),
      message: formData.get('message') || '',
      captchaAccepted: formData.get('captchaAccepted') === 'on' || formData.get('captchaAccepted') === true,
      source: 'Surgical Center Contact Section',
    };

    if (!payload.center) {
      alert('Please select your nearest centre.');
      setErrorMessage('Please select your nearest centre.');
      setIsSubmitting(false);
      return;
    }

    try {
      const result = await submitSurgicalConsultation(payload);
      if (result.ok) {
        if (typeof window !== 'undefined') {
          localStorage.setItem('soi_appointment_submitted', 'true');
        }
        form.reset();
        router.push(getThankYouUrl(THANK_YOU_TYPE.appointment));
      } else {
        const errorText = result.data?.error || 'Failed to submit. Please try again.';
        alert(errorText);
        setErrorMessage(errorText);
        setIsSubmitting(false);
      }
    } catch (err) {
      console.error('Contact submission error:', err);
      alert('A network error occurred. Please try again.');
      setErrorMessage('A network error occurred. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.contactWrapper}>
      <div className="container">
        <div className={styles.sectionHeading}>
          <span className={styles.eyebrow}>GET IN TOUCH</span>
          <h2 className={styles.headingTitle}>
            Contact Seeds of Innocence <span className="cs_accent_color">Surgical Centre</span>
          </h2>
          <p className={styles.headingSubtitle}>
            Schedule an in-depth consultation with our senior laparoscopic & hysteroscopic surgeons. We provide confidential guidance, second opinions, and personalized surgical care.
          </p>
        </div>

        <div className="row cs_gap_y_40 align-items-stretch">
          {/* Left Column: Appointment Form */}
          <div className="col-lg-7">
            <div className={styles.formCard}>
              <div style={{ filter: isSubmitting ? 'blur(2px)' : 'none', transition: 'filter 0.2s ease', pointerEvents: isSubmitting ? 'none' : 'auto' }}>
                <div className={styles.formCardHeader}>
                  <h3 className={styles.formTitle}>
                    Book your <span className="cs_accent_color">Free Consultation</span>
                  </h3>
                  <p className={styles.formSubtitle}>
                    Fill in your details below and our medical surgical team will get in touch shortly.
                  </p>
                </div>

                {errorMessage && (
                  <div className={styles.errorAlert} role="alert">
                    {errorMessage}
                  </div>
                )}

                <form onSubmit={handleSubmit} className={styles.form}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className={styles.fieldLabel} htmlFor="contact-name">
                        Full Name <span className={styles.required}>*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        required
                        placeholder="Full Name *"
                        className={styles.inputField}
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className={styles.fieldLabel} htmlFor="contact-phone">
                        Phone Number <span className={styles.required}>*</span>
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        name="phone"
                        required
                        placeholder="Phone Number *"
                        maxLength={10}
                        inputMode="numeric"
                        pattern="[6-9][0-9]{9}"
                        className={styles.inputField}
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className={styles.fieldLabel} htmlFor="contact-centre">
                      Select Centre <span className={styles.required}>*</span>
                    </label>
                    <select
                      id="contact-centre"
                      name="center"
                      required
                      defaultValue=""
                      className={styles.selectField}
                    >
                      <option value="" disabled>Select Centre *</option>
                      {SURGICAL_CENTRES.map((centre) => (
                        <option key={centre} value={centre}>
                          {centre}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className={styles.fieldLabel} htmlFor="contact-message">
                      Message (Optional)
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={2}
                      placeholder="Message (Optional)"
                      className={styles.textareaField}
                    />
                  </div>

                  <div className="mb-3">
                    <label className={styles.consentCheck}>
                      <input type="checkbox" name="captchaAccepted" required defaultChecked />
                      <span>
                        By clicking &quot;Book Appointment&quot;, you agree to our{' '}
                        <Link href="/privacy-policy/">Privacy Policy</Link> and{' '}
                        <Link href="/terms-and-conditions/">T&amp;C</Link> *
                      </span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={styles.submitBtn}
                  >
                    <span>{isSubmitting ? 'Submitting...' : 'Book Appointment'}</span>
                  </button>
                </form>
              </div>

              {isSubmitting && (
                <div className={styles.processingOverlay}>
                  Processing your request...
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Direct Helpline & Centres */}
          <div className="col-lg-5">
            <div className={styles.infoCard}>
              <h3 className={styles.infoTitle}>Connect With Our Care Coordinators</h3>
              <p className={styles.infoDescription}>
                Reach out directly to book an immediate appointment or discuss insurance and daycare procedures.
              </p>

              <div className={styles.contactList}>
                <div className={styles.contactItem}>
                  <div className={styles.iconCircle}>
                    <FaPhone aria-hidden="true" />
                  </div>
                  <div>
                    <span className={styles.contactLabel}>Consultation & Helpline</span>
                    <a href="tel:+91-9711585411" className={styles.contactValue}>
                      +91-9711585411
                    </a>
                  </div>
                </div>

                <div className={styles.contactItem}>
                  <div className={styles.iconCircle}>
                    <FaEnvelope aria-hidden="true" />
                  </div>
                  <div>
                    <span className={styles.contactLabel}>Official Email</span>
                    <a href="mailto:info@seedsofinnocens.com" className={styles.contactValue}>
                      surgicalcentre@seedsofinnocence.com
                    </a>
                  </div>
                </div>

                <div className={styles.contactItem}>
                  <div className={styles.iconCircle}>
                    <FaClock aria-hidden="true" />
                  </div>
                  <div>
                    <span className={styles.contactLabel}>OPD & Surgery Timings</span>
                    <span className={styles.contactValueText}>
                      Mon – Sun: 9:00 AM – 6:00 PM
                    </span>
                  </div>
                </div>
              </div>

              <div className={styles.centresSection}>
                <h4 className={styles.centresHeading}>
                  <FaLocationDot aria-hidden="true" className={styles.locationIcon} />
                  <span>Key Surgical Centre Locations</span>
                </h4>
                <div className={styles.centresGrid}>
                  {SURGICAL_CENTRES.map((centre) => (
                    <div key={centre} className={styles.centreBadge}>
                      {centre}
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.insuranceBox}>
                <FaShieldHalved className={styles.shieldIcon} aria-hidden="true" />
                <div>
                  <strong>Cashless Mediclaim & Insurance</strong>
                  <p>All major TPAs and health insurance accepted with dedicated paperwork support.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
