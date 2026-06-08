import type { Bi } from '@/lib/i18n';
import type { ModuleData } from '@/components/sections/ModuleDetail';

export const careersHub = {
  kicker: { ar: 'الوظائف', en: 'Careers' } as Bi,
  title: { ar: 'ابنِ مؤسسةً، لا وظيفةً فقط.', en: 'Build an institution, not just a career.' } as Bi,
  lead: {
    ar: 'ثقافةٌ تعاونيّة تضع المؤسسة كاملةً خلف كل قرار. نبحث عن أشخاصٍ يرون الرياضة السعودية كما نراها — قطاعاً استراتيجيّاً يستحقّ الأفضل.',
    en: 'A collaborative, whole-institution culture. We look for people who see Saudi sport as we do — a strategic sector that deserves the best.',
  } as Bi,
};

export const culture: ModuleData = {
  kicker: { ar: 'الوظائف · الثقافة', en: 'Careers · Culture' },
  title: { ar: 'لماذا صدارة.', en: 'Why Sadara.' },
  lead: {
    ar: 'نعمل كمؤسسةٍ واحدة لا كأقسامٍ منعزلة. القرار الجيّد يأتي من تعاون التخصّصات، والقيمة طويلة الأمد تُبنى بالانضباط لا بالسرعة.',
    en: 'We work as one institution, not isolated departments. A good decision comes from cross-disciplinary collaboration, and long-term value is built with discipline, not speed.',
  },
  crumbs: [
    { label: { ar: 'الرئيسية', en: 'Home' }, href: '/' },
    { label: { ar: 'الوظائف', en: 'Careers' }, href: '/careers' },
    { label: { ar: 'الثقافة', en: 'Culture' } },
  ],
  overview: {
    kicker: { ar: 'كيف نعمل', en: 'How we work' },
    title: { ar: 'المؤسسة كاملةً خلف كل قرار.', en: 'The whole institution behind every decision.' },
    body: {
      ar: 'لا يعمل المحلّل بمعزلٍ عن الطبيب، ولا التجاري بمعزلٍ عن القانوني. نجمع التخصّصات حول اللاعب والنادي والصفقة — لأن أفضل القرارات تأتي من الصورة الكاملة.',
      en: 'The analyst doesn’t work apart from the doctor, nor commercial apart from legal. We bring disciplines together around the athlete, the club, and the deal — because the best decisions come from the whole picture.',
    },
    bullets: [
      { ar: 'تعاونٌ بين التخصّصات لا صوامع.', en: 'Cross-disciplinary collaboration, not silos.' },
      { ar: 'قيمةٌ طويلة الأمد قبل المكسب السريع.', en: 'Long-term value before quick gain.' },
      { ar: 'انضباطٌ وحوكمةٌ في كل خطوة.', en: 'Discipline and governance at every step.' },
      { ar: 'استثمارٌ في تطوير الأفراد.', en: 'Investment in developing our people.' },
    ],
    tone: 'electric',
  },
  cta: {
    title: { ar: 'هل تشاركنا الرؤية؟', en: 'Do you share the vision?' },
    primary: { label: { ar: 'استعرض الأدوار', en: 'See open roles' }, href: '/careers/roles' },
  },
};

export type Role = { title: Bi; team: Bi; type: Bi; location: Bi };

export const roles = {
  kicker: { ar: 'الوظائف · الأدوار', en: 'Careers · Open Roles' } as Bi,
  title: { ar: 'الأدوار المتاحة.', en: 'Open roles.' } as Bi,
  lead: {
    ar: 'فرصٌ عبر الوحدات الثلاث، إضافةً إلى مسارات المهنيّين المبتدئين والتدريب. لا ترى دورك؟ تواصل معنا على أيّ حال.',
    en: 'Opportunities across the three units, plus early-careers and internship tracks. Don’t see your role? Reach out anyway.',
  } as Bi,
  list: [
    { title: { ar: 'محلّل أداء', en: 'Performance Analyst' }, team: { ar: 'إدارة المواهب', en: 'Talent' }, type: { ar: 'دوام كامل', en: 'Full-time' }, location: { ar: 'الرياض', en: 'Riyadh' } },
    { title: { ar: 'مستشار ذكاء الأندية', en: 'Club Intelligence Advisor' }, team: { ar: 'الاستشارات', en: 'Advisory' }, type: { ar: 'دوام كامل', en: 'Full-time' }, location: { ar: 'الرياض', en: 'Riyadh' } },
    { title: { ar: 'مدير شراكات تجاريّة', en: 'Commercial Partnerships Manager' }, team: { ar: 'الأسواق', en: 'Markets' }, type: { ar: 'دوام كامل', en: 'Full-time' }, location: { ar: 'الرياض', en: 'Riyadh' } },
    { title: { ar: 'أخصائي طب رياضي', en: 'Sports Medicine Specialist' }, team: { ar: 'الفريق الفني', en: 'Technical' }, type: { ar: 'دوام كامل', en: 'Full-time' }, location: { ar: 'الرياض', en: 'Riyadh' } },
    { title: { ar: 'متدرّب — تحليل البيانات', en: 'Intern — Data Analysis' }, team: { ar: 'الفريق الفني', en: 'Technical' }, type: { ar: 'تدريب', en: 'Internship' }, location: { ar: 'الرياض', en: 'Riyadh' } },
    { title: { ar: 'متدرّب — العلاقات التجاريّة', en: 'Intern — Commercial' }, team: { ar: 'الأسواق', en: 'Markets' }, type: { ar: 'تدريب', en: 'Internship' }, location: { ar: 'الرياض', en: 'Riyadh' } },
  ] as Role[],
};
