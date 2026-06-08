import type { DivisionData } from '@/components/sections/DivisionOverview';
import type { ModuleData } from '@/components/sections/ModuleDetail';

export const advisoryDivision: DivisionData = {
  no: '02',
  slug: '/advisory',
  kicker: { ar: 'الوحدة 02 · استشارات الأندية والاتحادات', en: 'Unit 02 · Club & Federation Advisory' },
  title: { ar: 'نستشير المؤسسات — بأصولٍ خفيفة.', en: 'We advise institutions — asset-light.' },
  lead: {
    ar: 'ذكاءٌ وقرارٌ للأندية والاتحادات: نظام ذكاء الأندية، وتقييم المدربين والإدارة، واستراتيجية التوظيف والتشكيلة، والتحليل التنافسي وتصميم الأكاديميات — بنموذج عملٍ رشيق.',
    en: 'Intelligence and decision-making for clubs and federations: the Club Intelligence System, coach & management evaluation, recruitment & squad strategy, and competitive & academy advisory — on a lean, asset-light model.',
  },
  proposition: {
    title: { ar: 'القرار الصحيح، مدعوماً بالدليل.', en: 'The right decision, backed by evidence.' },
    body: {
      ar: 'لا نملك الأصول، بل نُحسّن قراراتها. نعمل كشريكٍ مُحتجَزٍ للمؤسسة: نُحوّل البيانات والعلاقات إلى قراراتٍ أفضل في التوظيف والتدريب والاستراتيجية.',
      en: 'We don’t own the assets — we improve the decisions around them. We work as a retained partner: turning data and relationships into better calls on recruitment, coaching, and strategy.',
    },
  },
  modulesHeader: {
    kicker: { ar: 'الخدمات', en: 'Services' },
    title: { ar: 'أربع قدراتٍ على عمودٍ فقريٍّ واحد.', en: 'Four capabilities on one shared spine.' },
    lead: {
      ar: 'كل قدرةٍ مُحتجَزة ومستقلّة، لكنها تستند إلى الذكاء والشبكة نفسها التي تخدم بقيّة المؤسسة.',
      en: 'Each capability is retained and standalone, yet draws on the same intelligence and network that serves the rest of the institution.',
    },
  },
  modules: [
    { no: '01', title: { ar: 'نظام ذكاء الأندية', en: 'Club Intelligence System' }, desc: { ar: 'ذكاء العلاقات والقرار — مُحتجَز.', en: 'Relationship & decision intelligence — retained.' }, href: '/advisory/intelligence' },
    { no: '02', title: { ar: 'تقييم المدربين والإدارة', en: 'Coach & Management Evaluation' }, desc: { ar: 'أُطر القدرات وتسجيل المرشّحين.', en: 'Capability frameworks and candidate scoring.' }, href: '/advisory/coaching' },
    { no: '03', title: { ar: 'التوظيف واستراتيجية التشكيلة', en: 'Recruitment & Squad Strategy' }, desc: { ar: 'تحليل احتياج الأدوار، تخطيط الحصص، وخرائط الأهداف.', en: 'Role-need analysis, quota planning, and target mapping.' }, href: '/advisory/recruitment' },
    { no: '04', title: { ar: 'التحليل التنافسي والأكاديميات', en: 'Competitive & Academy Advisory' }, desc: { ar: 'تحليل المنافس، وتصميم الأكاديميات والمسارات.', en: 'Opposition analysis; academy & pathway design.' }, href: '/advisory/analysis' },
  ],
  cta: {
    title: { ar: 'اطلب إحاطة.', en: 'Request a briefing.' },
    lead: { ar: 'محادثةٌ مُحتجَزة حول أين يمكن للذكاء أن يحسّن قراراتكم.', en: 'A retained conversation on where intelligence can improve your decisions.' },
    primary: { label: { ar: 'اطلب إحاطة', en: 'Request a briefing' }, href: '/advisory/engage' },
    secondary: { label: { ar: 'تواصل', en: 'Contact' }, href: '/contact' },
  },
};

export const intelligence: ModuleData = {
  kicker: { ar: 'الاستشارات · ذكاء الأندية', en: 'Advisory · Club Intelligence' },
  title: { ar: 'نظام ذكاء الأندية — مُحتجَز ومستمر.', en: 'The Club Intelligence System — retained and continuous.' },
  lead: {
    ar: 'ذكاءٌ يجمع العلاقات والبيانات والسياق في قاعدة قرارٍ واحدة للنادي أو الاتحاد — لا تقريرٌ لمرّة، بل شراكةٌ مستمرّة.',
    en: 'Intelligence that brings relationships, data, and context into a single decision base for the club or federation — not a one-off report but a continuous partnership.',
  },
  crumbs: [
    { label: { ar: 'الرئيسية', en: 'Home' }, href: '/' },
    { label: { ar: 'الاستشارات', en: 'Advisory' }, href: '/advisory' },
    { label: { ar: 'ذكاء الأندية', en: 'Club Intelligence' } },
  ],
  overview: {
    kicker: { ar: 'ما هو', en: 'What it is' },
    title: { ar: 'قاعدة قرارٍ حيّة، لا أرشيف.', en: 'A living decision base, not an archive.' },
    body: {
      ar: 'يربط النظام بيانات الأداء بخريطة العلاقات والسياق التنظيمي، فيُجيب أسئلة القرار الحقيقية: من نوظّف، ومتى، وبأيّ مخاطرة.',
      en: 'The system links performance data to the relationship map and organizational context, answering the real decision questions: who to recruit, when, and at what risk.',
    },
    tone: 'electric',
  },
  cta: {
    title: { ar: 'حوّل الذكاء إلى ميزة.', en: 'Turn intelligence into advantage.' },
    primary: { label: { ar: 'اطلب إحاطة', en: 'Request a briefing' }, href: '/advisory/engage' },
  },
};

export const coaching: ModuleData = {
  kicker: { ar: 'الاستشارات · تقييم المدربين', en: 'Advisory · Coach Evaluation' },
  title: { ar: 'تقييم المدربين والإدارة — قراراتٌ بلا تخمين.', en: 'Coach & management evaluation — hiring without guesswork.' },
  lead: {
    ar: 'أُطر قدراتٍ موضوعيّة وتسجيل مرشّحين يجعلان تعيين المدرّب قراراً مدعوماً بالدليل لا بالانطباع.',
    en: 'Objective capability frameworks and candidate scoring that make a coaching hire an evidence-backed decision, not an impression.',
  },
  crumbs: [
    { label: { ar: 'الرئيسية', en: 'Home' }, href: '/' },
    { label: { ar: 'الاستشارات', en: 'Advisory' }, href: '/advisory' },
    { label: { ar: 'تقييم المدربين', en: 'Coach Evaluation' } },
  ],
  overview: {
    kicker: { ar: 'المنهج', en: 'The method' },
    title: { ar: 'قدراتٌ تُقاس، لا سُمعةٌ تُسمَع.', en: 'Capabilities measured, not reputation heard.' },
    body: {
      ar: 'نُقيّم المرشّحين على أُطرٍ واضحة — الأسلوب، التطوير، الإدارة، الملاءمة الثقافية — ونُسجّل النتائج لمقارنةٍ عادلة.',
      en: 'We assess candidates against clear frameworks — style, development, management, cultural fit — and score the results for a fair comparison.',
    },
  },
  cta: {
    title: { ar: 'عيّن على أساس الدليل.', en: 'Hire on evidence.' },
    primary: { label: { ar: 'اطلب إحاطة', en: 'Request a briefing' }, href: '/advisory/engage' },
  },
};

export const recruitment: ModuleData = {
  kicker: { ar: 'الاستشارات · التوظيف والتشكيلة', en: 'Advisory · Recruitment & Squad' },
  title: { ar: 'التوظيف واستراتيجية التشكيلة.', en: 'Recruitment & squad strategy.' },
  lead: {
    ar: 'تحليل احتياج الأدوار، وتخطيط الحصص، وخرائط الأهداف — حتى يبني النادي تشكيلةً متوازنةً ومستدامة.',
    en: 'Role-need analysis, quota planning, and target mapping — so the club builds a balanced, sustainable squad.',
  },
  crumbs: [
    { label: { ar: 'الرئيسية', en: 'Home' }, href: '/' },
    { label: { ar: 'الاستشارات', en: 'Advisory' }, href: '/advisory' },
    { label: { ar: 'التوظيف والتشكيلة', en: 'Recruitment & Squad' } },
  ],
  overview: {
    kicker: { ar: 'المقاربة', en: 'The approach' },
    title: { ar: 'ابنِ التشكيلة، لا تجمع اللاعبين.', en: 'Build the squad, don’t collect players.' },
    body: {
      ar: 'نبدأ من احتياج الأدوار والقيود (الحصص، الميزانية، المرحلة)، ثم نرسم خريطة أهدافٍ واقعيّة بأولوياتٍ واضحة وبدائل.',
      en: 'We start from role needs and constraints (quotas, budget, stage), then map realistic targets with clear priorities and alternatives.',
    },
  },
  cta: {
    title: { ar: 'خطّط تشكيلتك القادمة.', en: 'Plan your next squad.' },
    primary: { label: { ar: 'اطلب إحاطة', en: 'Request a briefing' }, href: '/advisory/engage' },
  },
};

export const analysis: ModuleData = {
  kicker: { ar: 'الاستشارات · التحليل والأكاديميات', en: 'Advisory · Analysis & Academy' },
  title: { ar: 'التحليل التنافسي وتصميم الأكاديميات.', en: 'Competitive analysis & academy design.' },
  lead: {
    ar: 'تحليل المنافس على مستوى المباراة، وتصميم أكاديميّاتٍ ومساراتٍ تُنتِج لاعبين، لا حضوراً فقط.',
    en: 'Match-level opposition analysis, and academy & pathway design that produces players, not just attendance.',
  },
  crumbs: [
    { label: { ar: 'الرئيسية', en: 'Home' }, href: '/' },
    { label: { ar: 'الاستشارات', en: 'Advisory' }, href: '/advisory' },
    { label: { ar: 'التحليل والأكاديميات', en: 'Analysis & Academy' } },
  ],
  overview: {
    kicker: { ar: 'بُعدان', en: 'Two dimensions' },
    title: { ar: 'افهم المنافس، وابنِ المستقبل.', en: 'Understand the opponent, build the future.' },
    body: {
      ar: 'على المدى القصير نُحلّل المنافس بدقّة؛ وعلى المدى الطويل نُصمّم الأكاديمية والمسار الذي يضمن تدفّق المواهب.',
      en: 'Short-term, we analyze the opponent in detail; long-term, we design the academy and pathway that secures a flow of talent.',
    },
  },
  cta: {
    title: { ar: 'استثمر في الميزة طويلة الأمد.', en: 'Invest in the long-term edge.' },
    primary: { label: { ar: 'اطلب إحاطة', en: 'Request a briefing' }, href: '/advisory/engage' },
  },
};

export const engage: ModuleData = {
  kicker: { ar: 'الاستشارات · تواصل', en: 'Advisory · Engage' },
  title: { ar: 'للأندية والاتحادات — اطلب إحاطة.', en: 'For clubs & federations — request a briefing.' },
  lead: {
    ar: 'محادثةٌ مُحتجَزة وسريّة حول أين يمكن للذكاء أن يحسّن قراراتكم — بلا التزامٍ مسبق.',
    en: 'A retained, confidential conversation on where intelligence can improve your decisions — with no prior commitment.',
  },
  crumbs: [
    { label: { ar: 'الرئيسية', en: 'Home' }, href: '/' },
    { label: { ar: 'الاستشارات', en: 'Advisory' }, href: '/advisory' },
    { label: { ar: 'تواصل', en: 'Engage' } },
  ],
  overview: {
    kicker: { ar: 'كيف نبدأ', en: 'How we begin' },
    title: { ar: 'إحاطةٌ أولى، ثم نطاقُ عملٍ واضح.', en: 'A first briefing, then a clear scope.' },
    body: {
      ar: 'نستمع إلى التحدّي، نعرض كيف نقاربه، ونتّفق على نطاقٍ مُحتجَزٍ بمخرجاتٍ ومؤشّراتٍ واضحة.',
      en: 'We listen to the challenge, show how we’d approach it, and agree a retained scope with clear deliverables and metrics.',
    },
    tone: 'electric',
  },
  cta: {
    title: { ar: 'ابدأ بإحاطة.', en: 'Start with a briefing.' },
    primary: { label: { ar: 'تواصل معنا', en: 'Contact us' }, href: '/contact' },
  },
};
