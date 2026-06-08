import type { Bi } from '@/lib/i18n';

export type Athlete = {
  slug: string;
  name: Bi;
  sport: Bi;
  position: Bi;
  tier: 'A+' | 'A' | 'B+' | 'B';
  club: Bi;
  featured?: boolean;
  bio: Bi;
  trajectory: Bi;
  mediaValue: Bi;
  stats: { value: number; decimals?: number; suffix?: string; label: Bi }[];
  accent: string; // gradient hint
};

export const athletes: Athlete[] = [
  {
    slug: 'hammam-al-hammami',
    name: { ar: 'همّام الحمّامي', en: 'Hammam Al-Hammami' },
    sport: { ar: 'كرة القدم', en: 'Football' },
    position: { ar: 'وسط ميدان', en: 'Midfielder' },
    tier: 'A+',
    club: { ar: 'الدوري السعودي', en: 'Saudi Pro League' },
    featured: true,
    bio: {
      ar: 'وسط ميدانٍ صانعٌ للّعب، يجمع بين الرؤية والانضباط التكتيكي. القضية المميَّزة التي تُظهر نموذج صدارة وهو يعمل: من الاكتشاف إلى التمثيل إلى نموٍّ مُتسارعٍ في القيمة السوقية.',
      en: 'A playmaking midfielder combining vision with tactical discipline. The featured case that shows the Sadara model at work: from discovery to representation to accelerating market value.',
    },
    trajectory: {
      ar: 'دخل نظام Elite 360 في مرحلةٍ مبكّرة. خطّة تطويرٍ فرديّة عبر المسارات الأربعة رفعت مؤشّر الأداء وفتحت اهتماماً تجاريّاً.',
      en: 'Entered the Elite 360 system early. An individual development plan across the four tracks lifted the performance index and opened commercial interest.',
    },
    mediaValue: {
      ar: 'نموٌّ بمقدار 3.4× في القيمة السوقية خلال دورة تطويرٍ واحدة، مع حضورٍ إعلاميٍّ متصاعد.',
      en: '3.4× growth in market value across a single development cycle, with rising media presence.',
    },
    stats: [
      { value: 92, label: { ar: 'مؤشّر الأداء', en: 'Performance index' } },
      { value: 3.4, decimals: 1, suffix: '×', label: { ar: 'نمو القيمة', en: 'Value growth' } },
      { value: 18, label: { ar: 'مساهمات تهديفية', en: 'Goal contributions' } },
    ],
    accent: 'from-electric/40',
  },
  {
    slug: 'faisal-al-otaibi',
    name: { ar: 'فيصل العتيبي', en: 'Faisal Al-Otaibi' },
    sport: { ar: 'كرة القدم', en: 'Football' },
    position: { ar: 'مهاجم', en: 'Forward' },
    tier: 'A',
    club: { ar: 'الدوري السعودي', en: 'Saudi Pro League' },
    bio: { ar: 'مهاجمٌ سريعٌ بغريزةٍ تهديفية عالية، في مرحلة صعودٍ مُتسارع.', en: 'A quick forward with a sharp scoring instinct, on a fast rise.' },
    trajectory: { ar: 'مسار تطويرٍ يركّز على صناعة الفرص واتخاذ القرار في الثلث الأخير.', en: 'A development track focused on chance creation and final-third decisions.' },
    mediaValue: { ar: 'اهتمامٌ تجاريٌّ متنامٍ مع كل موسم.', en: 'Growing commercial interest each season.' },
    stats: [
      { value: 84, label: { ar: 'مؤشّر الأداء', en: 'Performance index' } },
      { value: 21, label: { ar: 'أهداف', en: 'Goals' } },
      { value: 2.1, decimals: 1, suffix: '×', label: { ar: 'نمو القيمة', en: 'Value growth' } },
    ],
    accent: 'from-cyan/40',
  },
  {
    slug: 'noura-al-saleh',
    name: { ar: 'نورة الصالح', en: 'Noura Al-Saleh' },
    sport: { ar: 'كرة القدم', en: 'Football' },
    position: { ar: 'مدافعة', en: 'Defender' },
    tier: 'A',
    club: { ar: 'الدوري السعودي للسيدات', en: 'Saudi Women’s League' },
    bio: { ar: 'مدافعةٌ قائدة، ركيزة دفاعٍ هادئة تحت الضغط.', en: 'A leading defender — a calm defensive anchor under pressure.' },
    trajectory: { ar: 'مسارٌ يجمع القيادة داخل الملعب ببناءٍ تجاريٍّ خارجه.', en: 'A track combining on-pitch leadership with off-pitch commercial building.' },
    mediaValue: { ar: 'صوتٌ بارزٌ في نموّ كرة القدم النسائية.', en: 'A prominent voice in the growth of women’s football.' },
    stats: [
      { value: 88, label: { ar: 'مؤشّر الأداء', en: 'Performance index' } },
      { value: 94, suffix: '%', label: { ar: 'دقّة التمرير', en: 'Pass accuracy' } },
      { value: 2.8, decimals: 1, suffix: '×', label: { ar: 'نمو القيمة', en: 'Value growth' } },
    ],
    accent: 'from-gold/40',
  },
  {
    slug: 'ziyad-al-harbi',
    name: { ar: 'زياد الحربي', en: 'Ziyad Al-Harbi' },
    sport: { ar: 'كرة القدم', en: 'Football' },
    position: { ar: 'حارس مرمى', en: 'Goalkeeper' },
    tier: 'B+',
    club: { ar: 'دوري يلو', en: 'First Division' },
    bio: { ar: 'حارسٌ شابٌّ بردود فعلٍ استثنائية، في مسار التطوير.', en: 'A young keeper with exceptional reflexes, on the development track.' },
    trajectory: { ar: 'تطويرٌ مُركّز على لعب القدم والقيادة الخلفية.', en: 'Focused development on distribution and commanding the line.' },
    mediaValue: { ar: 'موهبةٌ صاعدة بإمكاناتٍ عالية.', en: 'A rising talent with high potential.' },
    stats: [
      { value: 79, label: { ar: 'مؤشّر الأداء', en: 'Performance index' } },
      { value: 71, suffix: '%', label: { ar: 'تصدّيات', en: 'Save rate' } },
      { value: 19, label: { ar: 'شِباك نظيفة', en: 'Clean sheets' } },
    ],
    accent: 'from-electric/40',
  },
  {
    slug: 'majed-al-qahtani',
    name: { ar: 'ماجد القحطاني', en: 'Majed Al-Qahtani' },
    sport: { ar: 'كرة القدم', en: 'Football' },
    position: { ar: 'جناح', en: 'Winger' },
    tier: 'B+',
    club: { ar: 'دوري يلو', en: 'First Division' },
    bio: { ar: 'جناحٌ مراوغٌ يصنع الفارق في المساحات.', en: 'A dribbling winger who makes the difference in space.' },
    trajectory: { ar: 'مسارٌ يصقل اتخاذ القرار والمساهمة التهديفية.', en: 'A track sharpening decision-making and goal contribution.' },
    mediaValue: { ar: 'جاذبيّةٌ جماهيريّةٌ متنامية.', en: 'Growing fan appeal.' },
    stats: [
      { value: 81, label: { ar: 'مؤشّر الأداء', en: 'Performance index' } },
      { value: 12, label: { ar: 'تمريرات حاسمة', en: 'Assists' } },
      { value: 1.9, decimals: 1, suffix: '×', label: { ar: 'نمو القيمة', en: 'Value growth' } },
    ],
    accent: 'from-cyan/40',
  },
  {
    slug: 'sara-al-dossari',
    name: { ar: 'سارة الدوسري', en: 'Sara Al-Dossari' },
    sport: { ar: 'كرة القدم', en: 'Football' },
    position: { ar: 'وسط ميدان', en: 'Midfielder' },
    tier: 'B',
    club: { ar: 'أكاديمية', en: 'Academy' },
    bio: { ar: 'موهبةٌ ناشئةٌ في نقطة دخول النظام — اكتشافٌ وحماية مبكّرة.', en: 'An emerging talent at the system’s entry point — discovery and early safeguarding.' },
    trajectory: { ar: 'بداية رحلةٍ طويلة مع خطّة تطويرٍ موثّقة.', en: 'The start of a long journey with a documented development plan.' },
    mediaValue: { ar: 'إمكاناتٌ مبكّرةٌ واعدة.', en: 'Promising early potential.' },
    stats: [
      { value: 74, label: { ar: 'مؤشّر الأداء', en: 'Performance index' } },
      { value: 16, label: { ar: 'العمر', en: 'Age' } },
      { value: 8, label: { ar: 'مساهمات تهديفية', en: 'Goal contributions' } },
    ],
    accent: 'from-gold/40',
  },
];

export const rosterMeta = {
  kicker: { ar: 'لاعبونا', en: 'Our Athletes' } as Bi,
  title: { ar: 'القائمة المُمثَّلة.', en: 'The represented roster.' } as Bi,
  lead: {
    ar: 'مصداقيّةٌ في الصدارة. قائمةٌ منتقاة من المواهب، كلٌّ منها مشروعٌ متكامل تديره المؤسسة بالكامل.',
    en: 'Credibility front and centre. A curated roster of talent — each an integrated project managed by the whole institution.',
  } as Bi,
};

export function getAthlete(slug: string) {
  return athletes.find((a) => a.slug === slug);
}
