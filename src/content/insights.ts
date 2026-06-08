import type { Bi } from '@/lib/i18n';

export type Article = {
  category: Bi;
  title: Bi;
  excerpt: Bi;
  date: string;
  type: 'news' | 'article';
};

export const insightsMeta = {
  kicker: { ar: 'رؤى وأخبار', en: 'Insights & News' } as Bi,
  title: { ar: 'الصوت المؤسسي.', en: 'The institutional voice.' } as Bi,
  lead: {
    ar: 'وجهة نظرٍ في السوق، وأخبارٌ ومحطّات، ومحرّك مصداقيّة يعكس كيف نفكّر — لا فقط ما نفعل.',
    en: 'Market point of view, news and milestones, and a credibility engine that reflects how we think — not just what we do.',
  } as Bi,
};

export const articles: Article[] = [
  {
    category: { ar: 'رؤية السوق', en: 'Market POV' },
    title: { ar: 'لماذا 2034 يعيد تعريف اقتصاد كرة القدم في المنطقة', en: 'Why 2034 redefines the region’s football economy' },
    excerpt: { ar: 'استضافة كأس العالم ليست حدثاً، بل تحوّلٌ في بنية القيمة الرياضية المحليّة.', en: 'Hosting the World Cup is not an event but a shift in the structure of local sporting value.' },
    date: '2026',
    type: 'article',
  },
  {
    category: { ar: 'أخبار', en: 'News' },
    title: { ar: 'صدارة توسّع مكتب الصفقات نحو ممرات جديدة', en: 'Sadara expands the deal desk into new corridors' },
    excerpt: { ar: 'إضافة ممرّين جديدين تعزّز قدرة المكتب على توطين الأصول.', en: 'Two new corridors strengthen the desk’s ability to place assets.' },
    date: '2026',
    type: 'news',
  },
  {
    category: { ar: 'الصوت المؤسسي', en: 'Institutional voice' },
    title: { ar: 'من وكالة إلى مؤسسة: منطق التحوّل', en: 'From agency to institution: the logic of the pivot' },
    excerpt: { ar: 'لماذا اخترنا بناء مؤسسةٍ بثلاث وحدات بدل توسيع قائمة الخدمات.', en: 'Why we chose to build a three-unit institution instead of expanding a service list.' },
    date: '2026',
    type: 'article',
  },
  {
    category: { ar: 'أخبار', en: 'News' },
    title: { ar: 'همّام الحمّامي ينضمّ إلى فئة A+ Elite', en: 'Hammam Al-Hammami joins the A+ Elite tier' },
    excerpt: { ar: 'محطّةٌ بارزة في مسارٍ يُظهر نموذج Elite 360 وهو يعمل.', en: 'A milestone in a journey that shows the Elite 360 model at work.' },
    date: '2026',
    type: 'news',
  },
  {
    category: { ar: 'رؤية السوق', en: 'Market POV' },
    title: { ar: 'الذكاء كميزةٍ تنافسيّة للأندية السعودية', en: 'Intelligence as a competitive edge for Saudi clubs' },
    excerpt: { ar: 'كيف يحوّل ذكاء القرار التوظيف من تخمينٍ إلى عمليّة.', en: 'How decision intelligence turns recruitment from a guess into a process.' },
    date: '2026',
    type: 'article',
  },
  {
    category: { ar: 'الصوت المؤسسي', en: 'Institutional voice' },
    title: { ar: 'الحوكمة ليست عبئاً، بل ميزة', en: 'Governance is not a burden — it’s an advantage' },
    excerpt: { ar: 'لماذا تبني الجدرانُ الواضحة ضدّ تضارب المصالح ثقةً تُترجَم إلى قيمة.', en: 'Why clear conflict walls build trust that translates into value.' },
    date: '2026',
    type: 'article',
  },
];

export const pressKit = {
  kicker: { ar: 'رؤى · الحقيبة الإعلامية', en: 'Insights · Press Kit' } as Bi,
  title: { ar: 'الحقيبة الإعلامية.', en: 'Press kit.' } as Bi,
  lead: {
    ar: 'أصول العلامة، وورقة الحقائق، وجهة الاتصال الإعلامي — كل ما يحتاجه الإعلام في مكانٍ واحد.',
    en: 'Brand assets, a fact sheet, and the media contact — everything the press needs in one place.',
  } as Bi,
  facts: [
    { label: { ar: 'التأسيس', en: 'Founded' }, value: { ar: 'الرياض، السعودية', en: 'Riyadh, Saudi Arabia' } },
    { label: { ar: 'النموذج', en: 'Model' }, value: { ar: 'ثلاث وحداتٍ استراتيجية', en: 'Three strategic units' } },
    { label: { ar: 'التركيز', en: 'Focus' }, value: { ar: 'كرة القدم', en: 'Football' } },
    { label: { ar: 'الترخيص', en: 'Licensing' }, value: { ar: 'متوافق مع FIFA وSAFF', en: 'FIFA & SAFF compliant' } },
  ],
};
