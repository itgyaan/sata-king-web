import { MarketItem, LeakInfo, DayRecord, SiteConfig } from '../types';

export const INITIAL_MARKETS: MarketItem[] = [
  {
    id: 'disawer',
    name: 'DISAWER',
    hindiName: 'दिसावर',
    openTime: '05:00 AM',
    yesterdayResult: '74',
    todayResult: '89',
    status: 'declared',
    lastUpdated: '05:05 AM',
    city: 'Delhi NCR'
  },
  {
    id: 'faridabad',
    name: 'FARIDABAD',
    hindiName: 'फरीदाबाद',
    openTime: '06:15 PM',
    yesterdayResult: '32',
    todayResult: '64',
    status: 'declared',
    lastUpdated: '06:18 PM',
    city: 'Haryana'
  },
  {
    id: 'ghaziabad',
    name: 'GHAZIABAD',
    hindiName: 'गाजियाबाद',
    openTime: '08:30 PM',
    yesterdayResult: '91',
    todayResult: '15',
    status: 'declared',
    lastUpdated: '08:32 PM',
    city: 'UP'
  },
  {
    id: 'gali',
    name: 'GALI',
    hindiName: 'गली',
    openTime: '11:30 PM',
    yesterdayResult: '48',
    todayResult: 'XX',
    status: 'waiting',
    lastUpdated: 'Coming Soon',
    city: 'Delhi NCR'
  },
  {
    id: 'delhi_bazar',
    name: 'DELHI BAZAR',
    hindiName: 'दिल्ली बाज़ार',
    openTime: '03:00 PM',
    yesterdayResult: '05',
    todayResult: '22',
    status: 'declared',
    lastUpdated: '03:04 PM',
    city: 'Delhi'
  },
  {
    id: 'shri_ganesh',
    name: 'SHRI GANESH',
    hindiName: 'श्री गणेश',
    openTime: '04:30 PM',
    yesterdayResult: '59',
    todayResult: '78',
    status: 'declared',
    lastUpdated: '04:33 PM',
    city: 'Rajasthan'
  },
  {
    id: 'taj',
    name: 'TAJ',
    hindiName: 'ताज',
    openTime: '03:15 PM',
    yesterdayResult: '83',
    todayResult: '41',
    status: 'declared',
    lastUpdated: '03:20 PM',
    city: 'Agra'
  },
  {
    id: 'kashipur',
    name: 'KASHIPUR',
    hindiName: 'काशीपुर',
    openTime: '04:15 PM',
    yesterdayResult: '19',
    todayResult: '37',
    status: 'declared',
    lastUpdated: '04:17 PM',
    city: 'Uttarakhand'
  }
];

export const INITIAL_LEAK_INFO: LeakInfo = {
  date: new Date().toLocaleDateString('hi-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
  singleJodi: ['42', '97'],
  supportJodi: ['18', '63', '75', '80'],
  harufAnder: '4, 9',
  harufBahar: '2, 7',
  noticeHindi: 'आज की सॉलिड अनकट जोड़ियां और सिंगल हरूफ केवल मनोरंजन और सूचना हेतु उपलब्ध कराए गए हैं।'
};

export const INITIAL_CHART_RECORDS: DayRecord[] = [
  { day: 1, disawer: '45', faridabad: '21', ghaziabad: '87', gali: '90', delhiBazar: '12', shriGanesh: '44' },
  { day: 2, disawer: '18', faridabad: '69', ghaziabad: '04', gali: '33', delhiBazar: '78', shriGanesh: '19' },
  { day: 3, disawer: '92', faridabad: '53', ghaziabad: '71', gali: '16', delhiBazar: '35', shriGanesh: '82' },
  { day: 4, disawer: '60', faridabad: '84', ghaziabad: '39', gali: '58', delhiBazar: '91', shriGanesh: '60' },
  { day: 5, disawer: '37', faridabad: '02', ghaziabad: '95', gali: '27', delhiBazar: '46', shriGanesh: '03' },
  { day: 6, disawer: '81', faridabad: '47', ghaziabad: '12', gali: '74', delhiBazar: '63', shriGanesh: '25' },
  { day: 7, disawer: '24', faridabad: '76', ghaziabad: '58', gali: '09', delhiBazar: '80', shriGanesh: '71' },
  { day: 8, disawer: '59', faridabad: '38', ghaziabad: '66', gali: '85', delhiBazar: '17', shriGanesh: '94' },
  { day: 9, disawer: '03', faridabad: '90', ghaziabad: '23', gali: '41', delhiBazar: '52', shriGanesh: '38' },
  { day: 10, disawer: '76', faridabad: '15', ghaziabad: '80', gali: '62', delhiBazar: '29', shriGanesh: '57' },
  { day: 11, disawer: '49', faridabad: '62', ghaziabad: '47', gali: '19', delhiBazar: '73', shriGanesh: '10' },
  { day: 12, disawer: '88', faridabad: '08', ghaziabad: '31', gali: '94', delhiBazar: '04', shriGanesh: '86' },
  { day: 13, disawer: '15', faridabad: '73', ghaziabad: '98', gali: '50', delhiBazar: '68', shriGanesh: '42' },
  { day: 14, disawer: '67', faridabad: '41', ghaziabad: '25', gali: '77', delhiBazar: '95', shriGanesh: '65' },
  { day: 15, disawer: '30', faridabad: '85', ghaziabad: '70', gali: '03', delhiBazar: '31', shriGanesh: '28' },
  { day: 16, disawer: '94', faridabad: '29', ghaziabad: '16', gali: '88', delhiBazar: '87', shriGanesh: '73' },
  { day: 17, disawer: '52', faridabad: '96', ghaziabad: '63', gali: '35', delhiBazar: '40', shriGanesh: '99' },
  { day: 18, disawer: '06', faridabad: '50', ghaziabad: '42', gali: '61', delhiBazar: '14', shriGanesh: '51' },
  { day: 19, disawer: '74', faridabad: '32', ghaziabad: '91', gali: '48', delhiBazar: '05', shriGanesh: '59' },
  { day: 20, disawer: '89', faridabad: '64', ghaziabad: '15', gali: 'XX', delhiBazar: '22', shriGanesh: '78' }
];

export const INITIAL_CONFIG: SiteConfig = {
  siteTitle: 'SATTA KING FAST LIVE RESULT',
  tagline: 'भारत का नंबर 1 सुपर फास्ट लाइव रिजल्ट और चार्ट पोर्टल',
  helplineNotice: 'सुपर फास्ट लाइव रिजल्ट अपडेट सबसे पहले यहाँ देखें! रिजल्ट रिफ्रेश करने के लिए बटन दबाएं।',
  disclaimerText: 'वैधानिक चेतावनी (Legal Disclaimer): यह वेबसाइट केवल सूचना, गणितीय विश्लेषण एवं मनोरंजन के उद्देश्य से बनाई गई है। भारत के कई राज्यों में सट्टा व जुआ खेलना कानूनन अपराध है। हमारी वेबसाइट किसी भी प्रकार की सट्टेबाजी को बढ़ावा नहीं देती। किसी भी लाभ-हानि के लिए उपभोक्ता स्वयं जिम्मेदार होगा।'
};
