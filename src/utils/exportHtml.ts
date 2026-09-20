import { MarketItem, LeakInfo, DayRecord, SiteConfig } from '../types';

export function generatePureCss(): string {
  return `/* ====================================================
   SATTA KING FAST LIVE RESULT - PURE CSS
   Shared Hosting & Local Ready (No Node/Vite needed)
   ==================================================== */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Hind", "Helvetica Neue", Arial, sans-serif;
}

body {
  background-color: #0b101b;
  color: #f1f5f9;
  line-height: 1.6;
  padding-bottom: 50px;
}

.container {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 15px;
}

/* Header & Marquee */
.top-bar {
  background: #060911;
  border-bottom: 1px solid #1e293b;
  padding: 10px 0;
  font-size: 14px;
}
.marquee-box {
  overflow: hidden;
  white-space: nowrap;
  background: #1e1b4b;
  color: #fbbf24;
  padding: 8px 12px;
  font-weight: 600;
  border-left: 4px solid #f59e0b;
  margin-bottom: 15px;
}

.site-header {
  text-align: center;
  padding: 25px 0 15px;
  background: linear-gradient(180deg, #131b2e 0%, #0b101b 100%);
  border-bottom: 2px solid #f59e0b;
}

.site-header h1 {
  font-size: 2.2rem;
  color: #fbbf24;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  margin-bottom: 6px;
  font-weight: 800;
  text-shadow: 0 2px 8px rgba(245, 158, 11, 0.3);
}

.site-header p {
  color: #94a3b8;
  font-size: 1rem;
}

.live-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #dc2626;
  color: #ffffff;
  padding: 4px 12px;
  border-radius: 9999px;
  font-weight: 700;
  font-size: 13px;
  animation: pulse 1.5s infinite;
  margin-bottom: 10px;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.85; transform: scale(1.04); }
}

/* Highlight Golden Box for Disawer / Super Fast */
.super-box {
  background: #1e293b;
  border: 2px solid #f59e0b;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  margin: 20px 0;
  box-shadow: 0 4px 20px rgba(245, 158, 11, 0.15);
}

.super-box h2 {
  color: #fbbf24;
  font-size: 1.5rem;
  margin-bottom: 15px;
}

.result-number-huge {
  font-size: 3.5rem;
  font-weight: 900;
  color: #10b981;
  letter-spacing: 2px;
  line-height: 1;
  text-shadow: 0 0 20px rgba(16, 185, 129, 0.4);
}

/* Results Grid */
.grid-results {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 15px;
  margin: 25px 0;
}

.market-card {
  background: #131c2e;
  border: 1px solid #1e293b;
  border-radius: 10px;
  padding: 16px;
  transition: transform 0.2s, border-color 0.2s;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.market-card:hover {
  border-color: #f59e0b;
  transform: translateY(-2px);
}

.market-card-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #23314d;
  padding-bottom: 8px;
  margin-bottom: 12px;
}

.market-title {
  font-size: 1.25rem;
  font-weight: 800;
  color: #f8fafc;
}

.market-time {
  font-size: 0.85rem;
  background: #0f172a;
  color: #fbbf24;
  padding: 3px 8px;
  border-radius: 4px;
  border: 1px solid #334155;
}

.market-body {
  display: flex;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  padding: 10px 0;
}

.yesterday-box, .today-box {
  flex: 1;
}

.num-label {
  font-size: 0.75rem;
  color: #94a3b8;
  text-transform: uppercase;
  margin-bottom: 4px;
}

.yesterday-num {
  font-size: 1.8rem;
  font-weight: 700;
  color: #94a3b8;
}

.today-num {
  font-size: 2.2rem;
  font-weight: 900;
  color: #f59e0b;
}

.today-num.waiting {
  color: #ef4444;
}

.status-badge {
  text-align: center;
  font-size: 0.8rem;
  padding: 4px 8px;
  border-radius: 6px;
  background: #0b101b;
  color: #cbd5e1;
  margin-top: 8px;
  border: 1px solid #1e293b;
}

/* Leak Jodi & Haruf Section */
.leak-section {
  background: linear-gradient(135deg, #172554 0%, #0f172a 100%);
  border: 2px solid #3b82f6;
  border-radius: 12px;
  padding: 20px;
  margin: 25px 0;
}

.leak-section h3 {
  color: #60a5fa;
  font-size: 1.35rem;
  margin-bottom: 12px;
  text-align: center;
}

.jodi-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-bottom: 15px;
}

.jodi-badge {
  background: #1e3a8a;
  color: #ffffff;
  font-size: 1.3rem;
  font-weight: 800;
  padding: 8px 18px;
  border-radius: 8px;
  border: 1px solid #60a5fa;
}

.jodi-badge.single {
  background: #b45309;
  color: #fef08a;
  border-color: #f59e0b;
}

/* Table Section */
.section-heading {
  font-size: 1.4rem;
  color: #fbbf24;
  margin: 30px 0 15px;
  padding-left: 10px;
  border-left: 4px solid #f59e0b;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.table-wrapper {
  overflow-x: auto;
  background: #131c2e;
  border: 1px solid #1e293b;
  border-radius: 10px;
  margin-bottom: 25px;
}

table {
  width: 100%;
  border-collapse: collapse;
  text-align: center;
}

th {
  background: #1e293b;
  color: #fbbf24;
  padding: 12px 10px;
  font-weight: 700;
  font-size: 0.95rem;
  border: 1px solid #334155;
  white-space: nowrap;
}

td {
  padding: 10px 8px;
  border: 1px solid #1e293b;
  font-size: 1rem;
}

tr:nth-child(even) {
  background: #0f172a;
}

tr:hover {
  background: #1e293b;
}

.date-col {
  font-weight: 700;
  color: #60a5fa;
}

.highlight-num {
  font-weight: 700;
  color: #10b981;
}

/* Disclaimer & Footer */
.disclaimer-box {
  background: #1c1917;
  border: 1px solid #78350f;
  border-radius: 8px;
  padding: 18px;
  margin-top: 35px;
  color: #d6d3d1;
  font-size: 0.85rem;
  line-height: 1.6;
}

.disclaimer-box h4 {
  color: #f59e0b;
  margin-bottom: 8px;
  font-size: 1rem;
}

.footer {
  text-align: center;
  padding: 25px 0;
  color: #64748b;
  font-size: 0.85rem;
  border-top: 1px solid #1e293b;
  margin-top: 40px;
}

/* Responsive */
@media (max-width: 640px) {
  .site-header h1 {
    font-size: 1.6rem;
  }
  .result-number-huge {
    font-size: 2.5rem;
  }
  th, td {
    padding: 8px 4px;
    font-size: 0.85rem;
  }
}
`;
}

export function generatePureHtml(
  markets: MarketItem[],
  leakInfo: LeakInfo,
  records: DayRecord[],
  config: SiteConfig
): string {
  const currentDateStr = new Date().toLocaleDateString('hi-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  const currentTimeStr = new Date().toLocaleTimeString('hi-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  const cardsHtml = markets
    .map(
      (m) => `
      <div class="market-card">
        <div class="market-card-head">
          <div>
            <div class="market-title">${m.name}</div>
            <small style="color:#94a3b8;">${m.hindiName}</small>
          </div>
          <span class="market-time">⏰ ${m.openTime}</span>
        </div>
        <div class="market-body">
          <div class="yesterday-box">
            <div class="num-label">कल (Yesterday)</div>
            <div class="yesterday-num">${m.yesterdayResult || '--'}</div>
          </div>
          <div style="font-size:1.5rem; color:#475569;">|</div>
          <div class="today-box">
            <div class="num-label">आज (Today)</div>
            <div class="today-num ${m.todayResult === 'XX' || m.status === 'waiting' ? 'waiting' : ''}">
              ${m.todayResult || 'XX'}
            </div>
          </div>
        </div>
        <div class="status-badge">
          ${m.status === 'declared' ? '✅ परिणाम घोषित (' + (m.lastUpdated || 'Done') + ')' : '⏳ परिणाम का इंतजार...'}
        </div>
      </div>`
    )
    .join('\n');

  const rowsHtml = records
    .slice()
    .reverse()
    .map(
      (r) => `
      <tr>
        <td class="date-col">तारीख ${r.day}</td>
        <td class="highlight-num">${r.disawer}</td>
        <td>${r.faridabad}</td>
        <td>${r.ghaziabad}</td>
        <td>${r.gali}</td>
        <td>${r.delhiBazar || '-'}</td>
        <td>${r.shriGanesh || '-'}</td>
      </tr>`
    )
    .join('\n');

  return `<!DOCTYPE html>
<html lang="hi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${config.siteTitle} - Live Fast Results & Daily Chart</title>
  <meta name="description" content="Super fast live results, record charts, leak jodi and timing information.">
  <link rel="stylesheet" href="style.css">
  <style>
    /* Inline backup styling so it works even without external style.css */
    ${generatePureCss()}
  </style>
</head>
<body>

  <!-- Top Marquee Ticker -->
  <div class="top-bar">
    <div class="container">
      <div class="marquee-box">
        📢 <strong>लाइव अपडेट:</strong> ${config.helplineNotice} [समय: ${currentTimeStr} | दिनांक: ${currentDateStr}]
      </div>
    </div>
  </div>

  <!-- Header -->
  <header class="site-header">
    <div class="container">
      <div class="live-badge">● LIVE SUPER FAST RESULT</div>
      <h1>${config.siteTitle}</h1>
      <p>${config.tagline}</p>
      <p style="margin-top: 8px; color: #fbbf24; font-size: 0.9rem;">
        📅 आज की तारीख: <strong>${currentDateStr}</strong> | ऑटो रिफ्रेश एक्टिव
      </p>
    </div>
  </header>

  <main class="container">

    <!-- Super Highlight Box (Disawer Live Result) -->
    <section class="super-box">
      <h2>🔥 आज का दिसावर (DISAWER) सुपर लाइव रिजल्ट 🔥</h2>
      <div class="result-number-huge">${markets.find(m => m.id === 'disawer')?.todayResult || '89'}</div>
      <p style="color: #94a3b8; margin-top: 8px;">
        खुलने का समय: 05:00 AM | कल का रिजल्ट: ${markets.find(m => m.id === 'disawer')?.yesterdayResult || '74'}
      </p>
    </section>

    <!-- Live Market Results Grid -->
    <div class="section-heading">
      <span>⚡ सभी मुख्य बाज़ार लाइव रिजल्ट (Live Result Board)</span>
      <small style="font-size: 0.85rem; color: #94a3b8;">अपडेटेड: ${currentTimeStr}</small>
    </div>

    <div class="grid-results">
      ${cardsHtml}
    </div>

    <!-- Today's Lucky Leak Jodi / Haruf Info -->
    <section class="leak-section">
      <h3>🎯 आज का अनकट लीक नंबर व हरूफ (Daily Guessing Info)</h3>
      <p style="text-align: center; color: #cbd5e1; margin-bottom: 15px; font-size: 0.9rem;">
        ${leakInfo.noticeHindi}
      </p>

      <div style="text-align: center; margin-bottom: 8px;">
        <span style="color: #fde047; font-weight: 700;">★ सिंगल जोड़ी (Single Jodi):</span>
      </div>
      <div class="jodi-row">
        ${leakInfo.singleJodi.map((j) => `<span class="jodi-badge single">${j}</span>`).join(' ')}
      </div>

      <div style="text-align: center; margin-bottom: 8px;">
        <span style="color: #93c5fd; font-weight: 700;">★ सपोर्ट जोड़ी (Support Jodi):</span>
      </div>
      <div class="jodi-row">
        ${leakInfo.supportJodi.map((j) => `<span class="jodi-badge">${j}</span>`).join(' ')}
      </div>

      <div style="display: flex; justify-content: center; gap: 20px; margin-top: 15px; flex-wrap: wrap;">
        <div style="background: #0f172a; padding: 8px 16px; border-radius: 6px; border: 1px solid #334155;">
          <strong>अंदर हरूफ (Ander):</strong> <span style="color: #f59e0b; font-weight: 800; font-size: 1.2rem;">[ ${leakInfo.harufAnder} ]</span>
        </div>
        <div style="background: #0f172a; padding: 8px 16px; border-radius: 6px; border: 1px solid #334155;">
          <strong>बाहर हरूफ (Bahar):</strong> <span style="color: #10b981; font-weight: 800; font-size: 1.2rem;">[ ${leakInfo.harufBahar} ]</span>
        </div>
      </div>
    </section>

    <!-- Monthly Record Chart Table -->
    <div class="section-heading">
      <span>📊 मंथली रिकॉर्ड चार्ट (Monthly Record Chart 2026)</span>
      <small style="font-size: 0.85rem; color: #94a3b8;">दिसावर • फरीदाबाद • गाजियाबाद • गली</small>
    </div>

    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>दिनांक (DATE)</th>
            <th>दिसावर (DISAWER)</th>
            <th>फरीदाबाद (FARIDABAD)</th>
            <th>गाजियाबाद (GHAZIABAD)</th>
            <th>गली (GALI)</th>
            <th>दिल्ली बाज़ार</th>
            <th>श्री गणेश</th>
          </tr>
        </thead>
        <tbody>
          ${rowsHtml}
        </tbody>
      </table>
    </div>

    <!-- Time Table Section -->
    <div class="section-heading">
      <span>⏰ बाज़ार खुलने का समय (Official Opening Time Table)</span>
    </div>

    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>मार्केट का नाम</th>
            <th>ओपन टाइम (Open Time)</th>
            <th>स्थान / लोकेशन</th>
            <th>स्थिति (Status)</th>
          </tr>
        </thead>
        <tbody>
          ${markets.map(m => `
            <tr>
              <td><strong>${m.name}</strong> (${m.hindiName})</td>
              <td style="color:#fbbf24; font-weight:700;">${m.openTime}</td>
              <td>${m.city || 'NCR'}</td>
              <td>${m.status === 'declared' ? '<span style="color:#10b981;">सक्रिय / रिजल्ट आ गया</span>' : '<span style="color:#f59e0b;">प्रतीक्षारत</span>'}</td>
            </tr>
          `).join('\n')}
        </tbody>
      </table>
    </div>

    <!-- Statutory Legal Disclaimer -->
    <div class="disclaimer-box">
      <h4>⚖️ वैधानिक चेतावनी एवं अस्वीकरण (Legal Disclaimer)</h4>
      <p>${config.disclaimerText}</p>
    </div>

  </main>

  <footer class="footer">
    <div class="container">
      <p>© ${new Date().getFullYear()} ${config.siteTitle} - All Rights Reserved.</p>
      <p style="margin-top: 5px;">Pure HTML & CSS Template - Compatible with all Shared Hosting & Local Servers.</p>
    </div>
  </footer>

  <script>
    // Simple pure JS auto-refresh helper for users viewing on shared hosting
    console.log('Site loaded successfully. Shared hosting compatible.');
  </script>
</body>
</html>`;
}

export function downloadFile(filename: string, content: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
