import type { DivisionData } from '@/components/sections/DivisionOverview';
import type { ModuleData } from '@/components/sections/ModuleDetail';

export const marketsDivision: DivisionData = {
  no: '03',
  slug: '/markets',
  kicker: { ar: 'الوحدة 03 · الأسواق والشراكات', en: 'Unit 03 · Markets & Partnerships' },
  title: { ar: 'نتعامل ونربط — محرّك النقد.', en: 'We transact and connect — the cash engine.' },
  lead: {
    ar: 'مكتب صفقات الدوري السعودي، والشراكات المؤسسية والرعاية، والشبكة العالمية عبر ثمانية ممرات. هنا تتحوّل الشبكة والذكاء إلى قيمةٍ تجاريّة.',
    en: 'The SPL Deal Desk, corporate partnerships & sponsorship, and the global network across eight corridors. This is where network and intelligence convert into commercial value.',
  },
  proposition: {
    title: { ar: 'الشبكة كأصل.', en: 'The network as an asset.' },
    body: {
      ar: 'الوصول وحده لا يكفي؛ المهمّ القدرة على تنفيذ الصفقة الصحيحة في الوقت الصحيح. نربط الأصول الأجنبيّة بأندية الدوري السعودي، والعلامات بالفرص، والممرات ببعضها.',
      en: 'Access alone isn’t enough; what matters is executing the right deal at the right time. We connect foreign assets to SPL clubs, brands to opportunities, and corridors to one another.',
    },
  },
  modulesHeader: {
    kicker: { ar: 'القدرات', en: 'Capabilities' },
    title: { ar: 'مكتبٌ، وشراكات، وشبكةٌ عالمية.', en: 'A desk, partnerships, and a global network.' },
    lead: {
      ar: 'ثلاث قدراتٍ تجاريّة تشترك في الذكاء والعلاقات نفسها التي تبنيها بقيّة المؤسسة.',
      en: 'Three commercial capabilities drawing on the same intelligence and relationships the rest of the institution builds.',
    },
  },
  stats: [
    { value: 8, label: { ar: 'ممرات عالمية نشطة', en: 'Active global corridors' } },
    { value: 120, suffix: '+', label: { ar: 'وكيلاً وشريكاً في الشبكة', en: 'Agents & partners in the network' } },
    { value: 4, label: { ar: 'قطاعات شراكة مؤسسية', en: 'Corporate partnership sectors' } },
    { value: 1, label: { ar: 'مكتب صفقات للدوري السعودي', en: 'Deal desk for the SPL' } },
  ],
  modules: [
    { no: '01', title: { ar: 'مكتب صفقات الدوري السعودي', en: 'The SPL Deal Desk' }, desc: { ar: 'توطين الأصول الأجنبية الواردة في أندية الدوري السعودي.', en: 'Inbound foreign-asset placement into SPL clubs.' }, href: '/markets/deal-desk' },
    { no: '02', title: { ar: 'الشراكات المؤسسية', en: 'Corporate Partnerships' }, desc: { ar: 'الرعاية، حقوق التسمية، والاستشارات التجارية.', en: 'Sponsorship, naming, and commercial consulting.' }, href: '/markets/partnerships' },
    { no: '03', title: { ar: 'الشبكة العالمية', en: 'The Global Network' }, desc: { ar: 'الممرات الدوليّة وشبكة الوكلاء.', en: 'International corridors and the agent network.' }, href: '/markets/network' },
  ],
  cta: {
    title: { ar: 'اشترك معنا أو وجّه صفقة.', en: 'Partner with us or route a deal.' },
    lead: { ar: 'افتح قناةً مع مكتب الصفقات والشراكات.', en: 'Open a channel with the deal desk and partnerships team.' },
    primary: { label: { ar: 'اشترك معنا', en: 'Partner with us' }, href: '/markets/connect' },
    secondary: { label: { ar: 'الشبكة', en: 'The network' }, href: '/network' },
  },
};

export const dealDesk: ModuleData = {
  kicker: { ar: 'الأسواق · مكتب الصفقات', en: 'Markets · Deal Desk' },
  title: { ar: 'مكتب صفقات الدوري السعودي.', en: 'The SPL Deal Desk.' },
  lead: {
    ar: 'قناةٌ منظّمة لتوطين الأصول الأجنبية الواردة في أندية الدوري السعودي — من التعريف إلى الإغلاق، بحوكمةٍ وامتثال.',
    en: 'A structured channel for placing inbound foreign assets into SPL clubs — from introduction to close, with governance and compliance.',
  },
  crumbs: [
    { label: { ar: 'الرئيسية', en: 'Home' }, href: '/' },
    { label: { ar: 'الأسواق', en: 'Markets' }, href: '/markets' },
    { label: { ar: 'مكتب الصفقات', en: 'Deal Desk' } },
  ],
  overview: {
    kicker: { ar: 'كيف يعمل', en: 'How it works' },
    title: { ar: 'صفقةٌ صحيحة، في توقيتٍ صحيح.', en: 'The right deal, at the right time.' },
    body: {
      ar: 'نطابق احتياج النادي بالأصل المناسب، نُدير التفاوض والامتثال، ونغلق الصفقة عبر شبكةٍ من العلاقات الموثوقة في الممرات الثمانية.',
      en: 'We match the club’s need to the right asset, manage negotiation and compliance, and close the deal through a network of trusted relationships across the eight corridors.',
    },
    tone: 'electric',
  },
  detail: {
    kicker: { ar: 'لماذا مكتب', en: 'Why a desk' },
    title: { ar: 'انضباطٌ بدل الصدفة.', en: 'Discipline instead of chance.' },
    body: {
      ar: 'المكتب يحوّل الصفقات من أحداثٍ فرديّة إلى عمليّةٍ متكرّرة: مسارٌ واضح، معايير امتثال، وذاكرةٌ مؤسسيّة تتراكم مع كل صفقة.',
      en: 'The desk turns deals from one-off events into a repeatable process: a clear pipeline, compliance standards, and institutional memory that compounds with every transaction.',
    },
  },
  cta: {
    title: { ar: 'وجّه صفقتك القادمة.', en: 'Route your next deal.' },
    primary: { label: { ar: 'افتح قناة', en: 'Open a channel' }, href: '/markets/connect' },
  },
};

export const partnerships: ModuleData = {
  kicker: { ar: 'الأسواق · الشراكات', en: 'Markets · Partnerships' },
  title: { ar: 'الشراكات المؤسسية والرعاية.', en: 'Corporate partnerships & sponsorship.' },
  lead: {
    ar: 'الرعاية، وحقوق التسمية، والاستشارات التجارية — نربط العلامات بالفرص الرياضيّة الصحيحة بعائدٍ قابلٍ للقياس.',
    en: 'Sponsorship, naming rights, and commercial consulting — connecting brands to the right sporting opportunities with measurable return.',
  },
  crumbs: [
    { label: { ar: 'الرئيسية', en: 'Home' }, href: '/' },
    { label: { ar: 'الأسواق', en: 'Markets' }, href: '/markets' },
    { label: { ar: 'الشراكات', en: 'Partnerships' } },
  ],
  overview: {
    kicker: { ar: 'للعلامات', en: 'For brands' },
    title: { ar: 'رعايةٌ بعائد، لا ظهورٌ فقط.', en: 'Sponsorship with return, not just exposure.' },
    body: {
      ar: 'نُصمّم الشراكة حول هدف العلامة، نطابقها بالأصل الرياضي المناسب، ونقيس الأثر — من الوعي إلى التحويل.',
      en: 'We design the partnership around the brand’s objective, match it to the right sporting asset, and measure impact — from awareness to conversion.',
    },
  },
  cta: {
    title: { ar: 'ابنِ شراكةً ذات معنى.', en: 'Build a partnership that means something.' },
    primary: { label: { ar: 'تحدّث إلى فريق الشراكات', en: 'Talk to the partnerships team' }, href: '/markets/connect' },
  },
};

export const globalNetwork: ModuleData = {
  kicker: { ar: 'الأسواق · الشبكة العالمية', en: 'Markets · Global Network' },
  title: { ar: 'الشبكة العالمية — ثمانية ممرات.', en: 'The global network — eight corridors.' },
  lead: {
    ar: 'شبكةٌ من الوكلاء والعلاقات عبر ثمانية ممراتٍ عالميّة، تربط المواهب والأصول والفرص بالسوق السعودي.',
    en: 'A network of agents and relationships across eight global corridors, connecting talent, assets, and opportunity to the Saudi market.',
  },
  crumbs: [
    { label: { ar: 'الرئيسية', en: 'Home' }, href: '/' },
    { label: { ar: 'الأسواق', en: 'Markets' }, href: '/markets' },
    { label: { ar: 'الشبكة العالمية', en: 'Global Network' } },
  ],
  overview: {
    kicker: { ar: 'الوصول', en: 'Reach' },
    title: { ar: 'الوصول الموثوق هو الميزة.', en: 'Trusted reach is the advantage.' },
    body: {
      ar: 'الممرات الثمانية ليست خطوطاً على خريطة، بل علاقاتٌ موثوقة تجعل الصفقة ممكنةً وسريعةً وآمنة.',
      en: 'The eight corridors are not lines on a map but trusted relationships that make a deal possible, fast, and safe.',
    },
    tone: 'electric',
  },
  cta: {
    title: { ar: 'ادخل الشبكة.', en: 'Enter the network.' },
    primary: { label: { ar: 'اشترك معنا', en: 'Partner with us' }, href: '/markets/connect' },
    secondary: { label: { ar: 'الممرات الدوليّة', en: 'International corridors' }, href: '/network/corridors' },
  },
};

export const connect: ModuleData = {
  kicker: { ar: 'الأسواق · تواصل', en: 'Markets · Connect' },
  title: { ar: 'للشركات والوكلاء — اشترك أو وجّه صفقة.', en: 'For corporates & agents — partner or route a deal.' },
  lead: {
    ar: 'افتح قناةً مباشرة مع مكتب الصفقات والشراكات. الصفقة الصحيحة تبدأ بمحادثةٍ صحيحة.',
    en: 'Open a direct channel with the deal desk and partnerships team. The right deal starts with the right conversation.',
  },
  crumbs: [
    { label: { ar: 'الرئيسية', en: 'Home' }, href: '/' },
    { label: { ar: 'الأسواق', en: 'Markets' }, href: '/markets' },
    { label: { ar: 'تواصل', en: 'Connect' } },
  ],
  overview: {
    kicker: { ar: 'ما نتعامل معه', en: 'What we handle' },
    title: { ar: 'صفقاتٌ، ورعاية، وشراكاتٌ في الممرات.', en: 'Deals, sponsorship, and corridor partnerships.' },
    body: {
      ar: 'سواء كنت وكيلاً يبحث عن وجهةٍ لأصل، أو علامةً تبحث عن شراكةٍ رياضيّة — نفتح القناة الصحيحة بسرعةٍ وانضباط.',
      en: 'Whether you’re an agent seeking a destination for an asset, or a brand seeking a sporting partnership — we open the right channel with speed and discipline.',
    },
  },
  cta: {
    title: { ar: 'لنبدأ.', en: 'Let’s begin.' },
    primary: { label: { ar: 'تواصل معنا', en: 'Contact us' }, href: '/contact' },
  },
};
