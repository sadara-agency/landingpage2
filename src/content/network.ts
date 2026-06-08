import type { Bi } from '@/lib/i18n';
import type { ModuleData } from '@/components/sections/ModuleDetail';

export const networkHub = {
  kicker: { ar: 'الشبكة', en: 'The Network' } as Bi,
  title: { ar: 'شركاء، ومنصّات، وممرات.', en: 'Partners, platforms, and corridors.' } as Bi,
  lead: {
    ar: 'مدعومون بالمؤسسات التي تبني الرياضة السعودية، ومُمكَّنون بأفضل المنصّات، وموصولون عبر ثمانية ممرّاتٍ عالميّة.',
    en: 'Backed by the institutions building Saudi sport, enabled by best-in-class platforms, and connected across eight global corridors.',
  } as Bi,
  sections: [
    { title: { ar: 'الحكومة والاتحادات', en: 'Government & Federations' }, desc: { ar: 'وزارة الرياضة، والاتحاد السعودي لكرة القدم.', en: 'Ministry of Sport, SAFF.' }, href: '/network/government' },
    { title: { ar: 'المؤسسات والحلول', en: 'Institutions & Solutions' }, desc: { ar: 'شركاء ماليّون ومنصّات تقنيّة.', en: 'Financial partners and technical platforms.' }, href: '/network/partners' },
    { title: { ar: 'الممرات الدوليّة', en: 'International Corridors' }, desc: { ar: 'شبكة الوكلاء عبر ثمانية ممرّاتٍ عالميّة.', en: 'The agent network across eight global corridors.' }, href: '/network/corridors' },
  ],
};

export const government: ModuleData = {
  kicker: { ar: 'الشبكة · الحكومة والاتحادات', en: 'Network · Government & Federations' },
  title: { ar: 'مُتوائمون مع الجهات التي تبني القطاع.', en: 'Aligned with the bodies building the sector.' },
  lead: {
    ar: 'نعمل ضمن إطار وزارة الرياضة والاتحاد السعودي لكرة القدم — بامتثالٍ كامل وعلاقةٍ بنّاءة تخدم تطوير اللعبة.',
    en: 'We operate within the framework of the Ministry of Sport and SAFF — in full compliance and a constructive relationship that serves the development of the game.',
  },
  crumbs: [
    { label: { ar: 'الرئيسية', en: 'Home' }, href: '/' },
    { label: { ar: 'الشبكة', en: 'Network' }, href: '/network' },
    { label: { ar: 'الحكومة والاتحادات', en: 'Government & Federations' } },
  ],
  overview: {
    kicker: { ar: 'الإطار', en: 'The framework' },
    title: { ar: 'الامتثال أولاً.', en: 'Compliance first.' },
    body: {
      ar: 'كل ما نقوم به يتوافق مع أنظمة الجهات المنظّمة محليّاً ودوليّاً — لأن المصداقيّة المؤسسيّة تبدأ من الالتزام.',
      en: 'Everything we do aligns with local and international regulatory frameworks — because institutional credibility starts with compliance.',
    },
    tone: 'electric',
  },
  cta: {
    title: { ar: 'شراكةٌ تخدم القطاع.', en: 'A partnership that serves the sector.' },
    primary: { label: { ar: 'تواصل معنا', en: 'Contact us' }, href: '/contact' },
  },
};

export const partners: ModuleData = {
  kicker: { ar: 'الشبكة · المؤسسات والحلول', en: 'Network · Institutions & Solutions' },
  title: { ar: 'مُمكَّنون بأفضل المنصّات.', en: 'Enabled by best-in-class platforms.' },
  lead: {
    ar: 'شركاء ماليّون ومنصّات تقنيّة رائدة — من أدوات التحليل إلى حلول الأداء — تدعم كل قرارٍ نتّخذه.',
    en: 'Leading financial partners and technical platforms — from analytics tools to performance solutions — support every decision we make.',
  },
  crumbs: [
    { label: { ar: 'الرئيسية', en: 'Home' }, href: '/' },
    { label: { ar: 'الشبكة', en: 'Network' }, href: '/network' },
    { label: { ar: 'المؤسسات والحلول', en: 'Institutions & Solutions' } },
  ],
  overview: {
    kicker: { ar: 'الأدوات', en: 'The tools' },
    title: { ar: 'أفضل الأدوات لأفضل القرارات.', en: 'The best tools for the best decisions.' },
    body: {
      ar: 'نستخدم منصّاتٍ عالميّة للتحليل والأداء والبيانات، ونبني فوقها ذكاءنا المؤسسي الخاص — تكاملٌ يصنع الفرق.',
      en: 'We use global platforms for analytics, performance, and data, and build our own institutional intelligence on top — an integration that makes the difference.',
    },
  },
  cta: {
    title: { ar: 'شبكةٌ تُمكّن القيمة.', en: 'A network that enables value.' },
    primary: { label: { ar: 'اشترك معنا', en: 'Partner with us' }, href: '/markets/connect' },
  },
};

export const corridors: ModuleData = {
  kicker: { ar: 'الشبكة · الممرات', en: 'Network · Corridors' },
  title: { ar: 'الممرات الدوليّة — ثمانية ممرّات.', en: 'International corridors — eight corridors.' },
  lead: {
    ar: 'شبكة وكلاءٍ وعلاقاتٍ موثوقة عبر ثمانية ممرّاتٍ عالميّة، تربط المواهب والأصول والفرص بالسوق السعودي.',
    en: 'A network of agents and trusted relationships across eight global corridors, connecting talent, assets, and opportunity to the Saudi market.',
  },
  crumbs: [
    { label: { ar: 'الرئيسية', en: 'Home' }, href: '/' },
    { label: { ar: 'الشبكة', en: 'Network' }, href: '/network' },
    { label: { ar: 'الممرات', en: 'Corridors' } },
  ],
  overview: {
    kicker: { ar: 'الوصول', en: 'Reach' },
    title: { ar: 'علاقاتٌ تُنجِز الصفقات.', en: 'Relationships that get deals done.' },
    body: {
      ar: 'كل ممرٍّ علاقةٌ موثوقة تجعل الصفقة ممكنةً وسريعةً وآمنة — وصولٌ لا يُشترى، بل يُبنى مع الوقت.',
      en: 'Each corridor is a trusted relationship that makes a deal possible, fast, and safe — reach that isn’t bought but built over time.',
    },
    tone: 'electric',
  },
  cta: {
    title: { ar: 'ادخل الشبكة.', en: 'Enter the network.' },
    primary: { label: { ar: 'وجّه صفقة', en: 'Route a deal' }, href: '/markets/connect' },
  },
};
