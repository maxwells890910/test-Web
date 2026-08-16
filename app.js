// Li-Ho Auto (力賀汽車) Bilingual (zh/en) Engine & Complete 28 Real CarOk Vehicles with Scraped Exact Mileage

const i18nDict = {
  zh: {
    announcement: "全車系雙重權威檢驗（CarOk認證 + 第三方公正報告）",
    promo_badge: "誠信首選",
    promo: "力賀汽車 ‧ 實車實價 ‧ 全車系 CarOk 權威認證",
    phone_free: "賞車專線 07-6105229 / 0932-792-112",
    brand_slogan: "嚴選好車 ‧ 誠信賣車",
    nav_inventory: "嚴選車庫",
    nav_inspection: "142項檢驗",
    nav_locations: "門市據點",
    nav_admin: "車務後台",
    btn_book: "預約賞車",
    btn_line: "LINE 線上諮詢",
    hero_badge: "CarOk 順心優質車商聯盟 ‧ 高雄力賀汽車",
    hero_title_1: "力賀汽車",
    hero_title_2: "嚴選好車 ‧ 誠信賣車",
    hero_desc: "「力賀（Li-Ho!）」以台灣最熱情的問候，為您把關每一台好車。全車系通過第三方 CarOk 權威認證，142 項透明檢驗、CAROK內視鏡檢查、原廠等級保固與實車實價承諾。",
    stat_cars: "現場嚴選在庫車",
    stat_certified: "CarOk權威認證",
    stat_warranty: "三大/五大延長保固",
    stat_loan: "專人尊榮接待",
    quick_search_title: "快速搜尋嚴選車輛",
    quick_search_btn: "搜尋在庫車輛",
    transparent_price: "實車實價 ‧ 絕不拉抬",
    featured_tag: "本週熱門嚴選",
    inventory_title: "力賀嚴選車庫 (Li-Ho Verified Garage)",
    inventory_desc: "所有車輛均為高雄門市現場實車拍攝，通過 142 項專業檢測與 CarOk 權威認證",
    tab_all: "全部車款",
    inspection_title: "142 項透明車況檢驗 ｜ 力賀四大安心品質保證",
    locations_title: "力賀汽車 展示與服務中心",
    footer_copy: "© 2026 力賀汽車 (LI-HO AUTO) 版權所有 ｜ CarOk 順心優質車商聯盟推薦車商",
    sticky_online: "專人線上即時服務中",
    btn_call: "直撥電話"
  },
  en: {
    announcement: "CarOk Certified + 3rd Party Inspection Report",
    promo_badge: "Trusted Choice",
    promo: "Li-Ho Auto ‧ Real Cars Real Prices ‧ 100% CarOk Certified",
    phone_free: "Call Us: 07-6105229 / 0932-792-112",
    brand_slogan: "Verified Cars ‧ Honest Sales",
    nav_inventory: "Garage",
    nav_inspection: "142 Inspection",
    nav_locations: "Showroom",
    nav_admin: "Admin Portal",
    btn_book: "Book Drive",
    btn_line: "LINE Consult",
    hero_badge: "CarOk Alliance ‧ Kaohsiung Li-Ho Auto",
    hero_title_1: "LI-HO AUTO",
    hero_title_2: "Verified Cars ‧ Honest Sales",
    hero_desc: "Li-Ho! (Hello in Taiwanese) delivers warmth and trust. Every vehicle is certified by CarOk with 142 digital inspection items, CAROK Endoscopic Check, and transparent price guarantees.",
    stat_cars: "Vehicles in Stock",
    stat_certified: "CarOk Certified",
    stat_warranty: "Extended Warranty",
    stat_loan: "VIP Service",
    quick_search_title: "Quick Search Inventory",
    quick_search_btn: "Search Inventory",
    transparent_price: "Real Vehicles Real Prices",
    featured_tag: "Featured Hot Deal",
    inventory_title: "Li-Ho Verified Garage",
    inventory_desc: "All vehicles physically in stock at Kaohsiung store with 142-point inspection.",
    tab_all: "All Models",
    inspection_title: "142-Point Inspection ｜ 4 Core Quality Guarantees",
    locations_title: "Showroom & Service Center",
    footer_copy: "© 2026 LI-HO AUTO CO., LTD. All Rights Reserved.",
    sticky_online: "Support Online Now",
    btn_call: "Call Us"
  }
};

// Current language state
let currentLang = localStorage.getItem('liho_lang') || 'zh';

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('liho_lang', lang);

  // Update UI texts with data-i18n
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (i18nDict[lang] && i18nDict[lang][key]) {
      el.innerText = i18nDict[lang][key];
    }
  });

  // Highlight active lang buttons
  const zhBtns = document.querySelectorAll('#lang-btn-zh');
  const enBtns = document.querySelectorAll('#lang-btn-en');

  zhBtns.forEach(btn => {
    if (lang === 'zh') {
      btn.className = 'px-2 py-0.5 rounded bg-black text-brand-gold font-bold';
    } else {
      btn.className = 'px-2 py-0.5 rounded text-slate-400 hover:text-white font-bold';
    }
  });

  enBtns.forEach(btn => {
    if (lang === 'en') {
      btn.className = 'px-2 py-0.5 rounded bg-black text-brand-gold font-bold';
    } else {
      btn.className = 'px-2 py-0.5 rounded text-slate-400 hover:text-white font-bold';
    }
  });

  // Re-render inventory cards
  renderInventory(getStoredCars());
}

// Complete 28 Real Vehicles with Scraped Exact Mileage from CarOk Backend
const realCarOkInventory = [
  {
    id: 'corolla_cross_2021',
    title: 'Toyota COROLLA CROSS 1.8 汽油尊爵',
    brand: 'Toyota',
    type: 'SUV',
    year: 2021,
    mileage: '6.4 萬公里 (64,000 km)',
    price: 56.8,
    engine: '1.8L 自然進氣 (1798.cc)',
    power: '140 hp / 17.5 kgm',
    transmission: 'CVT 無段變速',
    image: 'images/corolla_cross_2021.jpg',
    certified: 'CarOk 認證',
    guarantee: '三大保證 ‧ 實車實價',
    tags: ['熱門休旅', '非計程車', '里程保證'],
    description: '熱門省油跨界休旅！配備 TSS 2.0 智駕巡航、LED 頭燈、盲點偵測、Apple CarPlay。車況極優，CarOk 權威認證！',
    inspection: [
      { item: '車體大樑與結構骨架', status: 'CarOk 認證無鈑修合格' },
      { item: 'CAROK 內視鏡檢查', status: '引擎內部無積碳極乾淨' },
      { item: '1.8L 引擎與 CVT 變速箱', status: '運作極順無異音' },
      { item: 'TSS 智駕與安全防護', status: '感應鏡頭掃描正常' }
    ]
  },
  {
    id: 'rav4_2020',
    title: 'Toyota RAV4 2.0 豪華型',
    brand: 'Toyota',
    type: 'SUV',
    year: 2020,
    mileage: '13.0 萬公里 (130,000 km)',
    price: 59.8,
    engine: '2.0L 自然進氣 (1987.cc)',
    power: '173 hp / 20.7 kgm',
    transmission: 'Direct Shift-CVT',
    image: 'images/rav4_2020.jpg',
    certified: 'CarOk 認證',
    guarantee: '三大保證 ‧ 實車實價',
    tags: ['進口神車', '非計程車', '里程保證'],
    description: '日本原裝進口霸主休旅！新車價破百萬，現只要 59.8 萬！配備 TSS 系統、電動座椅、自動頭燈，室內車車況極佳。',
    inspection: [
      { item: '日本原裝進口車骨架', status: 'CarOk 檢驗合格' },
      { item: 'CAROK 內視鏡檢查', status: '氣門與火星塞清潔通過' },
      { item: '底盤避震與懸吊', status: '無洩氣無異音' }
    ]
  },
  {
    id: 'forester_2019',
    title: 'Subaru FORESTER 2.0 i-L EyeSight',
    brand: 'Subaru',
    type: 'SUV',
    year: 2019,
    mileage: '20.0 萬公里 (200,000 km)',
    price: 28.5,
    engine: '2.0L 水平對臥四缸 (1995.cc)',
    power: '156 hp / 20.0 kgm',
    transmission: 'Lineartronic CVT 8速手自排',
    image: 'images/forester_2019.jpg',
    certified: 'CarOk 認證',
    guarantee: '三大保證 ‧ 實車實價',
    tags: ['全時四驅', 'EyeSight智駕', '戶外神器'],
    description: 'SAWD 對稱式全時四輪驅動 + 獨家 EyeSight 智慧駕駛輔助！安全防護極高，高CP值進口家庭休旅車。',
    inspection: [
      { item: '水平對臥引擎結構', status: '無滲油怠速穩健' },
      { item: 'CAROK 內視鏡檢查', status: '內部汽缸狀態良好' },
      { item: 'SAWD 四輪傳動差速器', status: '扭力分配測試正常' }
    ]
  },
  {
    id: 'veryca_2022',
    title: 'Mitsubishi VERYCA 菱利 1.5 廂型車',
    brand: 'Mitsubishi',
    type: 'MPV',
    year: 2022,
    mileage: '8.0 萬公里 (79,729 km)',
    price: 32.8,
    engine: '1.5L 直列四缸 (1488.cc)',
    power: '97.9 hp / 13.7 kgm',
    transmission: '5速手排 / 4速自排',
    image: 'images/veryca_2022.jpg',
    certified: 'CarOk 認證',
    guarantee: '三大保證 ‧ 實車實價',
    tags: ['生財利器', '優質商用', '里程保證'],
    description: '發財首選！2022 年極新菱利 VERYCA，底盤引擎保養極佳，耐操省油大空間，買到直接開去賺大錢。',
    inspection: [
      { item: '車架底盤與載重樑', status: '無變形無鏽蝕' },
      { item: 'CAROK 內視鏡檢查', status: '汽缸頂部積碳檢驗合格' }
    ]
  },
  {
    id: 'civic_2013',
    title: 'Honda CIVIC 1.8 VTi-S 9代喜美',
    brand: 'Honda',
    type: 'Sedan',
    year: 2013,
    mileage: '18.7 萬公里 (187,000 km)',
    price: 26.5,
    engine: '1.8L i-VTEC (1798.cc)',
    power: '141 hp / 17.8 kgm',
    transmission: '5速手自排',
    image: 'images/civic_2013.jpg',
    certified: 'CarOk 認證',
    guarantee: '三大保證 ‧ 實車實價',
    tags: ['熱血房車', '非計程車', '實車實價'],
    description: '經典 9 代 Civic！配備方向盤換檔快撥、天窗、自動恆溫空調。操控極佳，耗材皆已更換完畢。',
    inspection: [
      { item: 'i-VTEC 引擎與換檔快撥', status: '高轉速VTEC開啟正常' },
      { item: 'CAROK 內視鏡檢查', status: '燃燒室狀態優良' }
    ]
  },
  {
    id: 'juke_2014',
    title: 'Nissan JUKE 1.6 英國原裝跨界跑旅',
    brand: 'Nissan',
    type: 'SUV',
    year: 2014,
    mileage: '11.9 萬公里 (119,000 km)',
    price: 25.8,
    engine: '1.6L 自然進氣 (1618.cc)',
    power: '117 hp / 16.1 kgm',
    transmission: 'X-CVT 無段變速',
    image: 'images/juke_2014.jpg',
    certified: 'CarOk 認證',
    guarantee: '三大保證 ‧ 實車實價',
    tags: ['英倫進口', '獨特造型', '非計程車'],
    description: '英國原裝進口潮流跑旅！獨特前衛外型，內裝重機排檔座設計，好開靈巧好停車，高安全性鋼樑。',
    inspection: [
      { item: '英製鋼樑車體結構', status: 'CarOk 檢驗合格' },
      { item: 'CAROK 內視鏡檢查', status: '氣門無異物零積碳' }
    ]
  },
  {
    id: 'cx3_2015',
    title: 'Mazda CX-3 2.0 Skyactiv-G 頂級型',
    brand: 'Mazda',
    type: 'SUV',
    year: 2015,
    mileage: '16.0 萬公里 (160,000 km)',
    price: 26.8,
    engine: '2.0L Skyactiv-G (1499.cc)',
    power: '156 hp / 20.8 kgm',
    transmission: '6速手自排',
    image: 'images/cx3_2015.jpg',
    certified: 'CarOk 認證',
    guarantee: '三大保證 ‧ 實車實價',
    tags: ['魂動設計', 'BOSE音響', '非計程車'],
    description: '魂動紅美學跨界休旅！配備抬頭顯示器、BOSE 喇叭、BSM 盲點偵測、LED 魂動頭燈，質感極佳。',
    inspection: [
      { item: 'Skyactiv 魂動車體', status: '大樑完整無修復痕跡' },
      { item: 'CAROK 內視鏡檢查', status: '高壓縮比引擎內部無異常' }
    ]
  },
  {
    id: 'smart_2016',
    title: 'SMART FORFOUR 1.0 賓士血統時尚掀背',
    brand: 'Smart',
    type: 'Sedan',
    year: 2016,
    mileage: '3.9 萬公里 (39,339 km)',
    price: 35.8,
    engine: '1.0L 三缸自然進氣 (999.cc)',
    power: '71 hp / 9.3 kgm',
    transmission: 'Twinamic 6速雙離合器',
    image: 'images/smart_2016.jpg',
    certified: 'CarOk 認證',
    guarantee: '三大保證 ‧ 實車實價',
    tags: ['賓士血統', '超小迴轉', '省稅金'],
    description: '賓士集團旗下 SMART 四人座！迴轉半徑超小，市區迴轉停車超靈巧，年稅金只要 4,320 元！',
    inspection: [
      { item: 'Tridion 安全車體籠', status: '完全無碰撞損傷' },
      { item: 'CAROK 內視鏡檢查', status: '1.0L 引擎機件運轉平穩' }
    ]
  },
  {
    id: 'benz_e200_2010',
    title: 'Benz E200 1.8 CGI 經典豪車',
    brand: 'Benz',
    type: 'Sedan',
    year: 2010,
    mileage: '10.9 萬公里 (108,856 km)',
    price: 29.0,
    engine: '1.8L 渦輪增壓 (1796.cc)',
    power: '184 hp / 27.5 kgm',
    transmission: '5速手自排',
    image: 'images/benz_e200_2010.jpg',
    certified: 'CarOk 認證',
    guarantee: '三大保證 ‧ 實車實價',
    tags: ['德國豪車', '氣派外型', '實車實價'],
    description: '經典賓士 E-Class！1.8L 低稅金渦輪動力，底盤極穩，內裝皮椅質感極佳，不到 30 萬圓賓士夢！',
    inspection: [
      { item: '賓士 W212 車體底盤', status: '底盤紮實無異音' },
      { item: 'CAROK 內視鏡檢查', status: '1.8L 渦輪引擎無積碳' }
    ]
  },
  {
    id: 'benz_glk220_2011',
    title: 'Benz GLK220 CDI 2.2 柴油四驅休旅',
    brand: 'Benz',
    type: 'SUV',
    year: 2011,
    mileage: '22.3 萬公里 (223,000 km)',
    price: 36.5,
    engine: '2.2L 柴油渦輪 (2143.cc)',
    power: '170 hp / 40.8 kgm',
    transmission: '7G-Tronic 7速手自排',
    image: 'images/benz_glk220_2011.jpg',
    certified: 'CarOk 認證',
    guarantee: '三大保證 ‧ 實車實價',
    tags: ['柴油大扭力', '4MATIC四驅', '賓士休旅'],
    description: '賓士方正硬派 SUV！40.8 kgm 超大扭力柴油引擎，爬坡超省油超有力，4MATIC 全時四輪驅動！',
    inspection: [
      { item: '4MATIC 全時四驅', status: '差速器與傳動軸無異音' },
      { item: 'CAROK 內視鏡檢查', status: '柴油噴油嘴與引擎良好' }
    ]
  },
  {
    id: 'zinger_2020',
    title: 'Mitsubishi ZINGER 2.4 商旅大空間',
    brand: 'Mitsubishi',
    type: 'MPV',
    year: 2020,
    mileage: '15.5 萬公里 (154,715 km)',
    price: 29.8,
    engine: '2.4L 自然進氣 (2378.cc)',
    power: '136 hp / 21.0 kgm',
    transmission: '5速自排',
    image: 'images/zinger_2020.jpg',
    certified: 'CarOk 認證',
    guarantee: '三大保證 ‧ 實車實價',
    tags: ['商旅王者', '超大後廂', '非計程車'],
    description: '多功能商旅霸主！後廂空間超巨大，兼具休旅車快適感與商用車高載貨能力。',
    inspection: [
      { item: '強韌大樑車架', status: '無重大事故變形' },
      { item: 'CAROK 內視鏡檢查', status: '2.4L 引擎內部乾淨' }
    ]
  },
  {
    id: 'vios_2014',
    title: 'Toyota VIOS 1.5 經典耐操省油車',
    brand: 'Toyota',
    type: 'Sedan',
    year: 2014,
    mileage: '14.3 萬公里 (142,505 km)',
    price: 19.8,
    engine: '1.5L 自然進氣 (1497.cc)',
    power: '109 hp / 14.4 kgm',
    transmission: '4速自排',
    image: 'images/vios_2014.jpg',
    certified: 'CarOk 認證',
    guarantee: '三大保證 ‧ 實車實價',
    tags: ['省油神器', '好維修', '非計程車'],
    description: '國民省油神車！維修保養極度便宜，冷氣凍人，通勤與代步最佳經濟選擇。',
    inspection: [
      { item: '1.5L VVTi 引擎', status: '運轉平穩省油無虞' },
      { item: 'CAROK 內視鏡檢查', status: '積碳檢測合格' }
    ]
  },
  {
    id: 'march_2002',
    title: 'Nissan MARCH 1.3 代步小車首選',
    brand: 'Nissan',
    type: 'Sedan',
    year: 2002,
    mileage: '19.1 萬公里 (191,467 km)',
    price: 8.8,
    engine: '1.3L 直列四缸 (1275.cc)',
    power: '75 hp / 10.5 kgm',
    transmission: '4速自排',
    image: 'images/march_2002.jpg',
    certified: 'CarOk 認證',
    guarantee: '三大保證 ‧ 實車實價',
    tags: ['極致省錢', '新手練習', '省油靈巧'],
    description: '超省錢新手練車神器！免 10 萬開回家，冷氣冷、保養便宜、故障率超低，代步首選！',
    inspection: [
      { item: '小巧敏捷車體', status: '無重大碰撞修復' },
      { item: 'CAROK 內視鏡檢查', status: '汽缸狀態良好' }
    ]
  },
  {
    id: 'camry_2011',
    title: 'Toyota CAMRY 2.4 氣派主管座駕',
    brand: 'Toyota',
    type: 'Sedan',
    year: 2011,
    mileage: '24.7 萬公里 (247,000 km)',
    price: 11.8,
    engine: '2.4L 直列四缸 (2362.cc)',
    power: '167 hp / 22.9 kgm',
    transmission: '5速手自排',
    image: 'images/camry_2011.jpg',
    certified: 'CarOk 認證',
    guarantee: '三大保證 ‧ 實車實價',
    tags: ['寬敞舒適', '主管座駕', '非計程車'],
    description: '經典寬敞舒適神車 Camry！靜音效果極佳、後座超大空間、引擎有力，長途旅行無壓力。',
    inspection: [
      { item: '2.4L 引擎結構', status: '運轉靜音平穩' },
      { item: 'CAROK 內視鏡檢查', status: '引擎內部清潔良好' }
    ]
  },
  {
    id: 'wish_2009',
    title: 'Toyota WISH 2.0 7人座國民休旅',
    brand: 'Toyota',
    type: 'MPV',
    year: 2009,
    mileage: '21.1 萬公里 (210,985 km)',
    price: 18.5,
    engine: '2.0L 4缸引擎 (1998.cc)',
    power: '141 hp / 19.3 kgm',
    transmission: '4速自排',
    image: 'images/wish_2009.jpg',
    certified: 'CarOk 認證',
    guarantee: '三大保證 ‧ 實車實價',
    tags: ['七人座', '國民神車', '靈活大空間'],
    description: '超高保值 7 人座休旅王！二三排座椅可全平躺，露營、載貨、全家出遊一部搞定。',
    inspection: [
      { item: '七人座空間車體', status: '結構完整無變形' },
      { item: 'CAROK 內視鏡檢查', status: '引擎機件運作流暢' }
    ]
  },
  {
    id: 'wish_2013',
    title: 'Toyota WISH 2.0 黑內裝二代小改款',
    brand: 'Toyota',
    type: 'MPV',
    year: 2013,
    mileage: '21.0 萬公里 (209,587 km)',
    price: 22.8,
    engine: '2.0L Dual VVT-i (1987.cc)',
    power: '146 hp / 19.1 kgm',
    transmission: 'CVT 7速手自排',
    image: 'images/wish_2013.jpg',
    certified: 'CarOk 認證',
    guarantee: '三大保證 ‧ 實車實價',
    tags: ['二代WISH', 'CVT無段變速', '黑內裝'],
    description: '改款黑內裝二代 WISH！搭配 7 速 CVT 變速箱，省油度更大幅提升，車況維持極佳！',
    inspection: [
      { item: 'CVT 7速手自排', status: '換檔銜接平順' },
      { item: 'CAROK 內視鏡檢查', status: '引擎燃燒室無過多積碳' }
    ]
  },
  {
    id: 'rav4_2014',
    title: 'Toyota RAV4 2.5 4WD 頂級四驅',
    brand: 'Toyota',
    type: 'SUV',
    year: 2014,
    mileage: '18.0 萬公里 (180,000 km)',
    price: 29.8,
    engine: '2.5L 自然進氣 (2494.cc)',
    power: '180 hp / 23.8 kgm',
    transmission: '6速手自排',
    image: 'images/rav4_2014.jpg',
    certified: 'CarOk 認證',
    guarantee: '三大保證 ‧ 實車實價',
    tags: ['四輪驅動', '天窗電動尾門', '日本進口'],
    description: '四代 RAV4 2.5 四驅頂級版！配備全景天窗、電動尾門、4WD 系統，動能充沛配備滿載。',
    inspection: [
      { item: '日本原裝底盤與 4WD', status: '底盤無異音防鏽良好' },
      { item: 'CAROK 內視鏡檢查', status: '2.5L 引擎狀態優良' }
    ]
  },
  {
    id: 'rav4_2013',
    title: 'Toyota RAV4 2.0 尊爵型',
    brand: 'Toyota',
    type: 'SUV',
    year: 2013,
    mileage: '18.0 萬公里 (180,000 km)',
    price: 32.8,
    engine: '2.0L 自然進氣 (1987.cc)',
    power: '146 hp / 19.1 kgm',
    transmission: 'CVT 無段變速',
    image: 'images/rav4_2013.jpg',
    certified: 'CarOk 認證',
    guarantee: '三大保證 ‧ 實車實價',
    tags: ['日本原裝', '恆溫空調', '非計程車'],
    description: '經典熱銷進口 SUV！好開空間大，配備多功能影音主機、恆溫空調、定速巡航。',
    inspection: [
      { item: '進口車體結構', status: 'CarOk 檢驗合格' },
      { item: 'CAROK 內視鏡檢查', status: '氣門與汽缸狀況良好' }
    ]
  },
  {
    id: 'mazda5_2013',
    title: 'Mazda MAZDA5 2.0 雙滑門 7人座',
    brand: 'Mazda',
    type: 'MPV',
    year: 2013,
    mileage: '17.0 萬公里 (170,000 km)',
    price: 19.8,
    engine: '2.0L MZR引擎 (1999.cc)',
    power: '147 hp / 18.8 kgm',
    transmission: '5速手自排',
    image: 'images/mazda5_2013.jpg',
    certified: 'CarOk 認證',
    guarantee: '三大保證 ‧ 實車實價',
    tags: ['側滑門神器', 'Karakuri七人座', '家庭首選'],
    description: '家庭客最愛雙側滑門 7 人座馬 5！上下車極度便利，座椅可彈態收折變化，操控優異。',
    inspection: [
      { item: '雙側滑門機構', status: '滑軌順暢開關正常' },
      { item: 'CAROK 內視鏡檢查', status: '引擎內部機件運作良好' }
    ]
  },
  {
    id: 'veryca_2018',
    title: 'Mitsubishi VERYCA 1.3 菱利好幫手',
    brand: 'Mitsubishi',
    type: 'MPV',
    year: 2018,
    mileage: '13.0 萬公里 (130,000 km)',
    price: 19.8,
    engine: '1.3L 直列四缸 (1299.cc)',
    power: '87 hp / 11.4 kgm',
    transmission: '5速手排',
    image: 'images/veryca_2018.jpg',
    certified: 'CarOk 認證',
    guarantee: '三大保證 ‧ 實車實價',
    tags: ['頭家最愛', '載貨首選', '非計程車'],
    description: '經濟實惠生財工具！底盤冷氣正常，買回去創業做生意賺大錢的最高 CP 值首選。',
    inspection: [
      { item: '貨車底盤大樑', status: '無腐蝕無重大修復' },
      { item: 'CAROK 內視鏡檢查', status: '積碳狀況極少良好' }
    ]
  },
  {
    id: 'coltplus_2014',
    title: 'Mitsubishi COLT PLUS 1.5 彈性空間掀背',
    brand: 'Mitsubishi',
    type: 'Sedan',
    year: 2014,
    mileage: '5.0 萬公里 (50,000 km)',
    price: 16.8,
    engine: '1.5L 直列四缸 (1499.cc)',
    power: '112 hp / 15.0 kgm',
    transmission: 'CVT 無段變速',
    image: 'images/coltplus_2014.jpg',
    certified: 'CarOk 認證',
    guarantee: '三大保證 ‧ 實車實價',
    tags: ['超大行李廂', '遙控電動尾門', '省油小車'],
    description: '小車身大空間！配備遙控電動尾門、 One-Touch 快倒後座椅，市區通勤購物載物超便利。',
    inspection: [
      { item: '掀背尾門與車體', status: '電控馬達開關正常' },
      { item: 'CAROK 內視鏡檢查', status: '1.5L 引擎內部乾淨' }
    ]
  },
  {
    id: 'vw_t4_2002',
    title: 'Volkswagen T4 2.5 經典露營包車',
    brand: 'Volkswagen',
    type: 'MPV',
    year: 2002,
    mileage: '13.5 萬公里 (135,000 km)',
    price: 8.8,
    engine: '2.5L 5缸引擎 (2461.cc)',
    power: '115 hp / 20.4 kgm',
    transmission: '5速手排',
    image: 'images/vw_t4_2002.jpg',
    certified: 'CarOk 認證',
    guarantee: '三大保證 ‧ 實車實價',
    tags: ['經典T4', '車頂露營', '大空間包車'],
    description: '德系經典 T4 箱型車！超大後廂空間，適合車宿露營改裝或載貨接送，花少少錢享受大車樂趣。',
    inspection: [
      { item: '德系鋼骨車架', status: '結構完好無事故' },
      { item: 'CAROK 內視鏡檢查', status: '2.5L 五缸引擎馬力順暢' }
    ]
  },
  {
    id: 'veryca_2017',
    title: 'Mitsubishi VERYCA 1.3 廂型車',
    brand: 'Mitsubishi',
    type: 'MPV',
    year: 2017,
    mileage: '15.9 萬公里 (159,275 km)',
    price: 23.5,
    engine: '1.3L 直列四缸 (1299.cc)',
    power: '5速手排',
    transmission: '5速手排',
    image: 'images/veryca_2017.jpg',
    certified: 'CarOk 認證',
    guarantee: '三大保證 ‧ 實車實價',
    tags: ['實用商用', '超大載重', '非計程車'],
    description: '生財生財工具再加一！低里程、車況維持極佳，適合物流配送與店家載貨。',
    inspection: [
      { item: '廂型車體與底盤', status: '結構完好檢驗通過' },
      { item: 'CAROK 內視鏡檢查', status: '汽缸檢測合格' }
    ]
  },
  {
    id: 'canter_2004',
    title: 'Mitsubishi CANTER 堅達 3.49噸 貨車',
    brand: 'Mitsubishi',
    type: 'MPV',
    year: 2004,
    mileage: '29.0 萬公里 (290,000 km)',
    price: 26.8,
    engine: '2.8L 柴油引擎 (2835.cc)',
    power: '110 hp / 26.0 kgm',
    transmission: '5速手排',
    image: 'images/canter_2004.jpg',
    certified: 'CarOk 認證',
    guarantee: '三大保證 ‧ 實車實價',
    tags: ['3.49噸貨車', '柴油大扭力', '賺大錢工具'],
    description: '堅達 3.49 噸經典柴油貨車！耐操耐磨大載重，內外保養得宜，生意開工必備好車。',
    inspection: [
      { item: '3.49噸強固大樑', status: '無裂痕無過載變形' },
      { item: 'CAROK 內視鏡檢查', status: '2.8L 柴油引擎狀態良好' }
    ]
  },
  {
    id: 'delica_2016',
    title: 'Mitsubishi DELICA 得利卡 2.4 綠巨人',
    brand: 'Mitsubishi',
    type: 'MPV',
    year: 2016,
    mileage: '6.6 萬公里 (66,000 km)',
    price: 31.8,
    engine: '2.4L 自然進氣 (2351.cc)',
    power: '116 hp / 19.2 kgm',
    transmission: '5速手排',
    image: 'images/delica_2016.jpg',
    certified: 'CarOk 認證',
    guarantee: '三大保證 ‧ 實車實價',
    tags: ['得利卡經典', '工程載貨', '已收訂熱門'],
    description: '國寶級工程車得利卡！底盤超高耐操耐勞，空間無敵大。',
    inspection: [
      { item: '得利卡高底盤', status: '懸吊紮實運轉正常' },
      { item: 'CAROK 內視鏡檢查', status: '引擎積碳檢驗合格' }
    ]
  },
  {
    id: 'zace_2001',
    title: 'Toyota ZACE 瑞獅 1.8 堅固商用車',
    brand: 'Toyota',
    type: 'MPV',
    year: 2001,
    mileage: '21.3 萬公里 (212,551 km)',
    price: 6.8,
    engine: '1.8L 7K引擎 (1781.cc)',
    power: '84 hp / 14.5 kgm',
    transmission: '5速手排',
    image: 'images/zace_2001.jpg',
    certified: 'CarOk 認證',
    guarantee: '三大保證 ‧ 實車實價',
    tags: ['瑞獅神車', '超低預算', '耐操耐磨'],
    description: '6.8 萬免十萬入手豐田瑞獅！故障率極低，冷氣冷，工地載工具材料第一名。',
    inspection: [
      { item: '瑞獅高強度車架', status: '無重大事故' },
      { item: 'CAROK 內視鏡檢查', status: '汽缸機件良好' }
    ]
  },
  {
    id: 'mini_countryman_2014',
    title: 'Mini COUNTRYMAN 1.6 英倫休旅',
    brand: 'Smart',
    type: 'SUV',
    year: 2014,
    mileage: '10.5 萬公里 (105,089 km)',
    price: 42.8,
    engine: '1.6L 自然進氣 (1598.cc)',
    power: '122 hp / 16.3 kgm',
    transmission: '6速手自排',
    image: 'images/mini_countryman_2014.jpg',
    certified: 'CarOk 認證',
    guarantee: '三大保證 ‧ 實車實價',
    tags: ['MINI英倫風', '圓形儀表', '跨界休旅'],
    description: '英倫時尚跨界休旅 MINI Countryman！質感絕佳，經典賽車線條與圓形復古儀表設計。',
    inspection: [
      { item: 'MINI 車體剛性', status: 'CarOk 認證無鈑修' },
      { item: 'CAROK 內視鏡檢查', status: '1.6L 引擎狀態優良' }
    ]
  },
  {
    id: 'civic_2.0_2013',
    title: 'Honda CIVIC 2.0 S 9代頂級旗艦',
    brand: 'Honda',
    type: 'Sedan',
    year: 2013,
    mileage: '15.0 萬公里 (150,000 km)',
    price: 29.8,
    engine: '2.0L i-VTEC (1997.cc)',
    power: '155 hp / 19.4 kgm',
    transmission: '5速手自排',
    image: 'images/civic_2.0_2013.jpg',
    certified: 'CarOk 認證',
    guarantee: '三大保證 ‧ 實車實價',
    tags: ['2.0大馬力', 'VSA車身動態控制', '快撥手自排'],
    description: '稀有 9 代 2.0 旗艦款！155 匹強勁馬力，配備 VSA 車身動態穩定系統與 6 气囊，操控性能兼具。',
    inspection: [
      { item: '2.0L i-VTEC 引擎', status: '高轉速運轉極順手' },
      { item: 'CAROK 內視鏡檢查', status: '燃燒室與氣門清潔度優異' }
    ]
  }
];

// LocalStorage & Remote JSON Helper Functions
function getStoredCars() {
  const stored = localStorage.getItem('liho_cars_data');
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (parsed && parsed.length > 0) {
        return parsed;
      }
    } catch (e) {
      console.error(e);
    }
  }
  return realCarOkInventory;
}

function saveStoredCars(cars) {
  localStorage.setItem('liho_cars_data', JSON.stringify(cars));
}

// Fetch GitHub Actions Scraped JSON if available
async function loadLatestInventoryJson() {
  try {
    const resp = await fetch('data/inventory.json?t=' + Date.now());
    if (resp.ok) {
      const remoteData = await resp.json();
      if (remoteData && Array.isArray(remoteData) && remoteData.length > 0) {
        // 每日爬蟲資料一律為準；localStorage 只作為離線／fetch 失敗時的備援快取
        saveStoredCars(remoteData);
        renderInventory(remoteData);
      }
    }
  } catch (e) {
    // Fallback gracefully to default local data
  }
}

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  setLanguage(currentLang);
  loadLatestInventoryJson();
  if (window.lucide) {
    lucide.createIcons();
  }
});

// Render Inventory Cards with Scraped Real Mileage Data
function renderInventory(cars) {
  const container = document.getElementById('car-grid');
  if (!container) return;

  const isEn = currentLang === 'en';

  if (cars.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-12 text-center text-slate-400 bg-brand-cardBg/50 rounded-2xl border border-slate-800">
        <i data-lucide="car" class="w-12 h-12 mx-auto mb-3 opacity-40"></i>
        <p class="text-base font-bold text-slate-300">${isEn ? 'No matching vehicles found' : '未搜尋到符合條件的嚴選車款'}</p>
      </div>
    `;
    if (window.lucide) lucide.createIcons();
    return;
  }

  container.innerHTML = cars.map(car => `
    <div class="bg-brand-cardBg rounded-2xl border border-slate-800 overflow-hidden glass-card-hover flex flex-col justify-between group">
      <div>
        <!-- Car Image Header with bg-slate-900 protection -->
        <div class="relative overflow-hidden h-52 bg-slate-900">
          <img src="${car.image}" alt="${car.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 bg-slate-900" onerror="this.src='images/corolla_cross_2021.jpg'">
          <div class="absolute inset-0 bg-gradient-to-t from-brand-cardBg via-transparent to-black/30"></div>
          
          <!-- Badges without A+ -->
          <div class="absolute top-3 left-3 flex flex-wrap gap-1.5">
            <span class="bg-black/80 backdrop-blur-md text-brand-gold text-[11px] px-2.5 py-0.5 rounded font-bold border border-brand-gold/40 whitespace-nowrap">
              ${isEn ? 'CarOk Certified' : 'CarOk 認證'}
            </span>
            <span class="bg-emerald-600/90 text-white text-[11px] px-2.5 py-0.5 rounded font-bold whitespace-nowrap">
              ${isEn ? 'Guaranteed' : '三大保證'}
            </span>
          </div>

          <div class="absolute bottom-3 left-3 right-3 flex justify-between items-end text-xs text-slate-300">
            <span class="bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded text-[11px] border border-slate-700 font-bold whitespace-nowrap text-emerald-400">${car.year} 年 ｜ ${car.mileage}</span>
            <span class="bg-brand-gold/20 text-brand-gold font-bold px-2 py-1 rounded text-[11px] border border-brand-gold/30 whitespace-nowrap">${car.type}</span>
          </div>
        </div>

        <!-- Car Info Body -->
        <div class="p-5 space-y-3">
          <div class="flex items-center gap-1.5 flex-wrap">
            ${(car.tags || ['實車實價']).map(tag => `<span class="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700 font-medium whitespace-nowrap">${tag}</span>`).join('')}
          </div>

          <h3 class="text-lg font-bold text-white group-hover:text-brand-gold transition-colors whitespace-nowrap overflow-hidden text-ellipsis">${car.title}</h3>
          
          <div class="text-xs text-slate-400 space-y-1">
            <div class="flex items-center gap-1 whitespace-nowrap"><i data-lucide="zap" class="w-3.5 h-3.5 text-brand-gold shrink-0"></i> <span>${isEn ? 'Engine' : '動力'}：${car.engine || '自然進氣'}</span></div>
            <div class="flex items-center gap-1 whitespace-nowrap"><i data-lucide="cog" class="w-3.5 h-3.5 text-slate-400 shrink-0"></i> <span>${isEn ? 'Trans.' : '變速'}：${car.transmission || '手自排'}</span></div>
          </div>
        </div>
      </div>

      <!-- Car Footer & Price -->
      <div class="p-5 pt-0 space-y-3">
        <div class="pt-3 border-t border-slate-800 flex items-baseline justify-between gap-2">
          <div>
            <span class="text-[11px] text-slate-400 whitespace-nowrap">${isEn ? 'Cash Price' : '力賀實車專案價'}</span>
            <div class="text-2xl font-black text-brand-gold whitespace-nowrap">NT$ ${car.price} <span class="text-xs font-normal">${isEn ? '10k TWD' : '萬'}</span></div>
          </div>
          <div class="text-right">
            <span class="text-[11px] text-emerald-400 font-bold bg-emerald-950/60 px-2 py-1 rounded border border-emerald-500/30 whitespace-nowrap">${isEn ? 'In Stock' : '門市在庫'}</span>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-2">
          <button onclick="viewCarDetail('${car.id}')" class="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors flex items-center justify-center gap-1 whitespace-nowrap">
            <i data-lucide="file-text" class="w-3.5 h-3.5 text-brand-gold"></i> ${isEn ? 'Report' : '檢驗報告'}
          </button>
          <button onclick="openBookingModalById('${car.id}')" class="w-full py-2.5 rounded-xl bg-gradient-to-r from-brand-gold to-brand-goldDark hover:brightness-110 text-slate-950 text-xs font-bold transition-all flex items-center justify-center gap-1 whitespace-nowrap">
            <i data-lucide="calendar" class="w-3.5 h-3.5"></i> ${isEn ? 'Book Drive' : '預約賞車'}
          </button>
        </div>
      </div>
    </div>
  `).join('');

  if (window.lucide) lucide.createIcons();
}

// Filter Cars
function filterCars(category) {
  const buttons = document.querySelectorAll('#filter-tabs button');
  buttons.forEach(btn => {
    btn.classList.remove('active', 'bg-brand-gold', 'text-slate-950');
    btn.classList.add('text-slate-300');
  });

  event.currentTarget.classList.add('active', 'bg-brand-gold', 'text-slate-950');

  const cars = getStoredCars();
  if (category === 'all') {
    renderInventory(cars);
  } else {
    const filtered = cars.filter(c => c.brand === category || c.type === category);
    renderInventory(filtered);
  }
}

// Handle Quick Search
function handleQuickSearch() {
  const brand = document.getElementById('quick-brand').value;
  const type = document.getElementById('quick-type').value;

  const cars = getStoredCars();
  let filtered = cars;
  if (brand) filtered = filtered.filter(c => c.brand === brand);
  if (type) filtered = filtered.filter(c => c.type === type);

  renderInventory(filtered);
  document.getElementById('inventory').scrollIntoView({ behavior: 'smooth' });
}

// Car Detail Modal View
function viewCarDetail(carId) {
  const cars = getStoredCars();
  const car = cars.find(c => c.id === carId);
  if (!car) return;

  const isEn = currentLang === 'en';
  const modal = document.getElementById('detail-modal');
  const titleArea = document.getElementById('modal-title-area');
  const modalBody = document.getElementById('modal-body');

  titleArea.innerHTML = `
    <div class="flex items-center gap-2 flex-wrap">
      <span class="bg-brand-gold text-slate-950 text-xs px-2.5 py-0.5 rounded font-extrabold whitespace-nowrap">${isEn ? 'CarOk Certified' : 'CarOk 認證'}</span>
      <h3 class="text-xl font-bold text-white whitespace-nowrap">${car.title}</h3>
    </div>
    <p class="text-xs text-slate-400 mt-1 whitespace-nowrap">${car.year} ｜ ${car.engine || '自然進氣'} ｜ ${car.guarantee || '三大保證'}</p>
  `;

  const inspections = car.inspection || [
    { item: '車體大樑與結構骨架', status: 'CarOk 認證無鈑修合格' },
    { item: 'CAROK 內視鏡檢查', status: '氣門與引擎內部清潔合格' }
  ];

  modalBody.innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="w-full h-64 bg-slate-900 rounded-2xl overflow-hidden border border-slate-800">
        <img src="${car.image}" class="w-full h-full object-cover bg-slate-900" onerror="this.src='images/corolla_cross_2021.jpg'">
      </div>
      
      <div class="space-y-4">
        <div class="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-1">
          <div class="text-xs text-slate-400 whitespace-nowrap">${isEn ? 'Special Cash Price' : '力賀實車專案價'}</div>
          <div class="text-3xl font-black text-brand-gold whitespace-nowrap">NT$ ${car.price} ${isEn ? '10k TWD' : '萬元'}</div>
          <div class="text-xs text-emerald-400 font-semibold pt-1">${isEn ? 'Transparent Pricing Guarantee' : '實車實價 ‧ 透明無暗陷阱'}</div>
        </div>

        <div class="space-y-2 text-xs text-slate-300">
          <div class="flex justify-between py-1 border-b border-slate-800">
            <span class="text-slate-400 whitespace-nowrap">${isEn ? 'Power' : '動力排氣'}</span>
            <span class="font-bold text-white whitespace-nowrap">${car.engine || '標準排氣量'}</span>
          </div>
          <div class="flex justify-between py-1 border-b border-slate-800">
            <span class="text-slate-400 whitespace-nowrap">${isEn ? 'Transmission' : '變速系統'}</span>
            <span class="font-bold text-white whitespace-nowrap">${car.transmission || '手自排'}</span>
          </div>
          <div class="flex justify-between py-1 border-b border-slate-800">
            <span class="text-slate-400 whitespace-nowrap">${isEn ? 'Exact Mileage' : 'CarOk 實測行駛里程'}</span>
            <span class="font-bold text-emerald-400 whitespace-nowrap">${car.mileage}</span>
          </div>
        </div>

        <button onclick="closeDetailModal(); openBookingModalById('${car.id}');" class="w-full py-3 rounded-xl bg-gradient-to-r from-brand-gold to-brand-goldDark text-slate-950 font-bold text-sm whitespace-nowrap">
          ${isEn ? 'Book Test Drive Now' : '預約現場實車試駕'}
        </button>
      </div>
    </div>

    <div class="space-y-3">
      <h4 class="text-sm font-bold text-white flex items-center gap-2 whitespace-nowrap">
        <i data-lucide="shield-check" class="w-4 h-4 text-emerald-400"></i> ${isEn ? '142-Point CarOk Inspection Summary' : '142項 CarOk 權威檢驗與 CAROK內視鏡檢查報告'}
      </h4>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
        ${inspections.map(insp => `
          <div class="bg-slate-900 p-3 rounded-xl border border-slate-800 flex justify-between items-center">
            <span class="text-slate-300 font-medium whitespace-nowrap">${insp.item}</span>
            <span class="text-emerald-400 font-bold whitespace-nowrap">${insp.status}</span>
          </div>
        `).join('')}
      </div>
    </div>

    <div class="bg-slate-900/60 p-4 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
      <span class="font-bold text-white block mb-1">${isEn ? 'Vehicle Description:' : '車輛詳細描述：'}</span>
      ${car.description || '高雄門市現場實車實價展示，車況極優！'}
    </div>
  `;

  modal.classList.remove('hidden');
  if (window.lucide) lucide.createIcons();
}

function closeDetailModal() {
  document.getElementById('detail-modal').classList.add('hidden');
}

// Booking Modal Logic
// 用車輛 id 查標題再開預約視窗——id 只含安全字元；
// 爬蟲來的 title 不可內插進 inline onclick（含引號會壞、且屬性解碼會還原跳脫）
function openBookingModalById(carId) {
  const car = getStoredCars().find(c => c.id === carId);
  openBookingModal(car ? car.title : '');
}

function openBookingModal(carTitle = '') {
  const modal = document.getElementById('booking-modal');
  if (carTitle) {
    document.getElementById('booking-target-car').value = carTitle;
  }
  modal.classList.remove('hidden');
}

function closeBookingModal() {
  document.getElementById('booking-modal').classList.add('hidden');
}

function handleBookingSubmit(e) {
  e.preventDefault();
  const isEn = currentLang === 'en';
  alert(isEn ? 'Thank you for your reservation! Li-Ho Auto team will contact you shortly.' : '感謝您的預約！力賀汽車專員（陳力裫老闆 0932-792-112）將於 10 分鐘內撥打電話與您確認賞車時間與地點。');
  closeBookingModal();
}

// Mobile Menu Toggle
function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  menu.classList.toggle('hidden');
}
