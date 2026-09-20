export interface MarketItem {
  id: string;
  name: string;
  hindiName: string;
  openTime: string;
  yesterdayResult: string;
  todayResult: string;
  status: 'declared' | 'waiting' | 'upcoming';
  lastUpdated?: string;
  city?: string;
}

export interface LeakInfo {
  date: string;
  singleJodi: string[];
  supportJodi: string[];
  harufAnder: string;
  harufBahar: string;
  noticeHindi: string;
}

export interface DayRecord {
  day: number;
  disawer: string;
  faridabad: string;
  ghaziabad: string;
  gali: string;
  delhiBazar?: string;
  shriGanesh?: string;
}

export interface SiteConfig {
  siteTitle: string;
  tagline: string;
  helplineNotice: string;
  telegramLink?: string;
  whatsappNotice?: string;
  disclaimerText: string;
}
