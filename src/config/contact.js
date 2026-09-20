/**
 * Tulasi Foundation - Central Contact Configuration
 * 
 * IMPORTANT:
 * Update the phone, WhatsApp, and email addresses below with the official Tulasi details.
 */

export const contactConfig = {
  // Display phone number shown on the website
  phone: '+91 94433 49064',

  // Raw digits for tel: links (country code + number, no spaces or special characters)
  phoneRaw: '919443349064',

  // =========================================================================
  // WHATSAPP SALES NUMBER
  // REPLACE '919443349064' with the actual Tulasi WhatsApp number (with country code, e.g. 91...)
  // =========================================================================
  whatsappNumber: '919443349064',

  // Official contact email
  email: 'contact@tulasifoundation.com',

  // Office address
  address: 'Nagercoil, Tamil Nadu, India',

  // Working hours
  workingHours: 'Monday – Saturday: 9:00 AM – 6:30 PM',
};

/**
 * Creates an encoded WhatsApp click-to-chat URL
 * @param {string} text - Message to prefill in WhatsApp
 * @returns {string} WhatsApp URL
 */
export const getWhatsAppUrl = (text = '') => {
  const cleanNumber = contactConfig.whatsappNumber.replace(/[^0-9]/g, '');
  const encodedText = encodeURIComponent(text);
  return `https://wa.me/${cleanNumber}?text=${encodedText}`;
};

/**
 * Prepares a formatted WhatsApp message for a site visit request
 */
export const formatSiteVisitMessage = ({ name, phone, project, date, time }) => {
  return [
    'Hello Tulasi Foundation,',
    '',
    'I would like to schedule a site visit.',
    '',
    `Name: ${name || 'Not provided'}`,
    `Phone: ${phone || 'Not provided'}`,
    `Project: ${project || 'Not specified'}`,
    `Preferred Date: ${date || 'Flexible'}`,
    `Preferred Time: ${time || 'Flexible'}`,
    '',
    'Please confirm availability. Thank you!',
  ].join('\n');
};

/**
 * Prepares a formatted WhatsApp message for general project inquiry
 */
export const formatProjectInquiryMessage = (projectName = '') => {
  return [
    'Hello Tulasi Foundation,',
    '',
    projectName
      ? `I am interested in knowing more about ${projectName}. Could you please share the pricing, availability and brochure?`
      : 'I would like to enquire about your available residential projects.',
    '',
    'Thank you!',
  ].join('\n');
};
