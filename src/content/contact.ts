import type { Bi } from '@/lib/i18n';

export const contactMeta = {
  kicker: { ar: 'تواصل', en: 'Contact' } as Bi,
  title: { ar: 'لكل جمهورٍ طريقُه.', en: 'A path for every audience.' } as Bi,
  lead: {
    ar: 'اختر مسارك وسيصلك ردٌّ من الفريق المناسب. اللاعبون، الأندية، الشركات، الإعلام، والوظائف.',
    en: 'Choose your path and the right team will respond. Athletes, clubs, corporates, media, and careers.',
  } as Bi,
};

export const routes = [
  { key: 'athletes', label: { ar: 'لاعب / عائلة', en: 'Athlete / Family' } },
  { key: 'clubs', label: { ar: 'نادٍ / اتحاد', en: 'Club / Federation' } },
  { key: 'corporates', label: { ar: 'شركة / وكيل', en: 'Corporate / Agent' } },
  { key: 'media', label: { ar: 'إعلام', en: 'Media' } },
  { key: 'careers', label: { ar: 'وظائف', en: 'Careers' } },
] as const;

export const form = {
  name: { ar: 'الاسم', en: 'Name' } as Bi,
  email: { ar: 'البريد الإلكتروني', en: 'Email' } as Bi,
  org: { ar: 'الجهة (اختياري)', en: 'Organisation (optional)' } as Bi,
  routeLabel: { ar: 'أنا...', en: 'I am a...' } as Bi,
  message: { ar: 'رسالتك', en: 'Your message' } as Bi,
  submit: { ar: 'إرسال', en: 'Send' } as Bi,
  success: { ar: 'شكراً لك. سيتواصل معك الفريق المناسب قريباً.', en: 'Thank you. The right team will be in touch shortly.' } as Bi,
  required: { ar: 'هذا الحقل مطلوب', en: 'This field is required' } as Bi,
  invalidEmail: { ar: 'بريدٌ إلكترونيٌّ غير صالح', en: 'Invalid email address' } as Bi,
};

export const office = {
  city: { ar: 'الرياض، المملكة العربية السعودية', en: 'Riyadh, Saudi Arabia' } as Bi,
  email: 'hello@sadarasport.sa',
};
