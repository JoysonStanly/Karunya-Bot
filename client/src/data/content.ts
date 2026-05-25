export const siteConfig = {
  name: "Karunya Institute of Technology and Sciences",
  tagline: "Arise and Shine",
  established: "Est. 1986",
};

// All images are real Karunya official URLs
export const images = {
  // ── Hero / Campus aerial ──────────────────────────────────────────────────
  hero:           "https://karunya.edu/sites/default/files/img/banners/Campus%20Ariel%20View_-min.JPG",

  // ── Campus buildings ──────────────────────────────────────────────────────
  campus1:        "https://karunya.edu/sites/default/files/img/banners/Karunya%20Main%20Block.jpg",   // Admin Block
  campus2:        "https://karunya.edu/sites/default/files/img/infra/webs/CST-WEB.jpg",               // CSE Block

  // ── Outdoor / civil ───────────────────────────────────────────────────────
  collegeOutdoor: "https://karunya.edu/sites/default/files/img/banners/civil%20outdoor.jpg",          // Civil outdoor

  // ── Classroom / library / students ───────────────────────────────────────
  collegeClassroom: "https://karunya.edu/sites/default/files/img/banners/library.jpg",                // Students in Library
  students:         "https://karunya.edu/sites/default/files/img/infra/webs/LIBRARY-WEB.jpg",         // Central Library building
  moreStudents:     "https://karunya.edu/sites/default/files/img/banners/library.jpg",                // Library (students)

  // ── Events / fest ────────────────────────────────────────────────────────
  fest:           "https://karunya.edu/sites/default/files/img/infra/webs/EMMANUEL-WEB_0.jpg",        // Emmanuel Auditorium (events)
  universityFest: "https://karunya.edu/sites/default/files/img/infra/webs/EL-SHADAI-WEB.jpg",         // Elshaddai Auditorium (cultural)

  // ── Placement / recruiter ────────────────────────────────────────────────
  recruiter1:     "https://karunya.edu/img/homepage/Newszone/Karunya-AI.jpg",                         // Industry/AI event
  recruiter2:     "https://karunya.edu/newszone/featured-9/img/1000163225.jpg",                       // Placement/MoU event

  // ── Labs / technology ────────────────────────────────────────────────────
  tech1:          "https://karunya.edu/sites/default/files/img/banners/lab%2001.jpg",                 // Biotechnology Lab
  tech2:          "https://karunya.edu/sites/default/files/img/banners/lab%2012.jpg",                 // ECE Lab
  tech3:          "https://karunya.edu/sites/default/files/img/banners/lab%2011.jpg",                 // Electrical Engineering Lab
  tech4:          "https://karunya.edu/sites/default/files/img/banners/lab%205.jpg",                  // Science Lab
  mechLab:        "https://karunya.edu/sites/default/files/img/banners/mech.jpg",                     // Mechanical Lab

  // ── Hostel / residences ──────────────────────────────────────────────────
  hostelGents:    "https://karunya.edu/sites/default/files/img/infra/webs/GH-1.jpg",
  hostelLadies:   "https://karunya.edu/sites/default/files/img/infra/webs/LH.jpg",
  mess:           "https://karunya.edu/sites/default/files/img/infra/webs/MESS.jpg",

  // ── Accreditation logos ──────────────────────────────────────────────────
  naac:      "https://karunya.edu/img/homepage/Accreditations/NAAC A++.png",
  nba:       "https://karunya.edu/img/homepage/Accreditations/NBA.png",
  aicte:     "https://karunya.edu/img/homepage/Approvals/AICTE.png",
  nirf:      "https://karunya.edu/img/homepage/India-Ranking/NIRF Ranking.png",
  ugc:       "https://karunya.edu/img/homepage/Accreditations/Category 1 UGC.png",
  qsIGauge:  "https://karunya.edu/img/homepage/India-Rating/QS I Gauge Platinum.png",

  // ── Ranking logos ────────────────────────────────────────────────────────
  theRanking:  "https://karunya.edu/img/homepage/International-Rankings/THE Ranking 1201-1500.png",
  qsAsia:      "https://karunya.edu/img/homepage/International-Rankings/QS Ranking Asia 694.png",
  greenMetric: "https://karunya.edu/img/homepage/International-Rankings/UI Green Metric Logo Rank Updated 346 Rank .png",

  // ── Chancellor ───────────────────────────────────────────────────────────
  chancellor:  "https://karunya.edu/img/homepage/Chancellor's-Image/Chancellor Image.png",

  // ── News / press ─────────────────────────────────────────────────────────
  news1: "https://karunya.edu/newszone/featured-9/img/1000163225.jpg",
  news2: "https://karunya.edu/newszone/featured-8/img/1000159636.jpg",
  news3: "https://karunya.edu/img/homepage/Newszone/Karunya-AI.jpg",
};

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
export const navLinks = [
  { label: "Home",        href: "/" },
  { label: "About",       href: "#about" },
  { label: "Courses",     href: "#courses" },
  { label: "Campus Life", href: "#campus" },
  { label: "Placements",  href: "#placements" },
  
  { label: "Contact",     href: "#contact" },
];

// ─── HERO ─────────────────────────────────────────────────────────────────────
export const heroContent = {
  title:        "Empowering Future Innovators & Leaders",
  subtitle:     "Karunya Institute of Technology and Sciences provides world-class education, research opportunities, industry collaborations, and innovation-driven learning experiences.",
  primaryBtn:   "Explore Courses",
  secondaryBtn: "Ask AI Assistant",
};

// ─── ABOUT ────────────────────────────────────────────────────────────────────
export const aboutContent = {
  title:    "About Karunya",
  subtitle: "A Leading Institution for Innovation & Excellence",
  description:
    "Karunya Institute of Technology and Sciences is a NAAC A++ accredited deemed university located in Coimbatore, Tamil Nadu. Established in 1986, the institution focuses on engineering, technology, research, entrepreneurship, and global education standards. The university aims to develop socially responsible leaders and innovators capable of solving real-world challenges.",
  highlights: [
    { value: "NAAC A++",  label: "Accredited Institution" },
    { value: "8000+",     label: "Active Students 2025" },
    { value: "720+ Acres", label: "Green Smart Campus" },
    { value: "50,000+",   label: "Alumni Across the Globe" },
  ],
};

// ─── STATS ────────────────────────────────────────────────────────────────────
export const achievementsContent = {
  stats: [
    { value: "2163+",  label: "Placement Offers 2025" },
    { value: "375+",   label: "Recruiting Companies" },
    { value: "100%",   label: "Scholarship up to" },
    { value: "39 Yrs", label: "Years & Counting" },
  ],
};

// ─── COURSES ──────────────────────────────────────────────────────────────────
export const coursesContent = {
  ug: {
    engineering: [
      {
        name: "B.Tech. Aerospace Engineering",
        specialization: [
          "Unmanned Aerial Vehicles",
          "Artificial Intelligence and Machine Learning",
          "Aircraft Maintenance",
        ],
      },

      {
        name: "B.Tech. Biotechnology",
        specialization: [
          "Artificial Intelligence",
          "Genome Engineering and Technology",
        ],
      },
    ],

    computerScience: [
      {
        name: "B.Tech. Computer Science and Engineering",
        specialization: [
          "Artificial Intelligence and Machine Learning",
          "Cyber Security",
          "Quantum Computing",
        ],
      },
    ],

    agriculture: [
      "B.Sc. (Hons.) Agriculture",
    ],

    artsScience: [
      "B.Sc. Artificial Intelligence and Data Science",
      "B.Sc. Forensic Science",
      "B.Sc. Semiconductor Technology",
    ],
  },

  pg: {
    engineering: [
      "M.Tech. Aerospace Engineering",
      "M.Tech. Robotics and Automation",
      "M.Tech. VLSI Design",
    ],

    science: [
      "M.Sc. Biotechnology",
      "M.Sc. Artificial Intelligence and Data Science",
    ],

    management: [
      "MBA",
    ],
  },
};

// ─── QUOTES ───────────────────────────────────────────────────────────────────
export const quotesContent = [
  {
    text:   "Karunya Institute of Technology and Sciences is an Institution with a social concern. Our mission is to raise scientists and entrepreneurs to find solutions by developing products in the areas of food, water, health care and energy with the best skills to solve the problems of Humanity.",
    author: "Dr. Paul Dhinakaran, Chancellor",
  },
];

// ─── CAMPUS LIFE ──────────────────────────────────────────────────────────────
export const campusFeatures = [
  {
    title: "Smart Green Campus",
    desc:  "720+ acre eco-friendly campus nestled in the Western Ghats with modern infrastructure and smart learning spaces.",
    image: images.hero, // Aerial view of campus
  },
  {
    title: "Innovation & Research Labs",
    desc:  "Advanced AI labs, robotics centers, startup incubation hubs, and cutting-edge research facilities.",
    image: images.tech2, // ECE Lab
  },
  {
    title: "Central Library",
    desc:  "Digital library with thousands of books, journals, research papers, and collaborative study spaces.",
    image: images.students, // Library building
  },
  {
    title: "Hostels",
    desc:  "Modern hostels with Wi-Fi, gym, food courts, medical support and round-the-clock care.",
    image: images.hostelGents, // Gents hostel
  },
  {
    title: "Cultural Events & Student Activities",
    desc: "Music performances, student clubs, cultural celebrations, leadership activities, hackathons, NSS, NCC, and campus events.",
    image: "https://karunya.edu/img/homepage/Slides/slide1.jpg",
  },

  { 
    title: "Sports & Outdoor Activities",
    desc: "Football, basketball, volleyball, athletics, fitness programs, outdoor activities, and annual university sports events.",
    image: "https://res.cloudinary.com/dw6eye2af/image/upload/v1779633709/Screenshot_2026-05-24_201025_uhfn12.png",
  },
];

// ─── RECRUITERS ───────────────────────────────────────────────────────────────
export const topRecruiters = [
  "Amazon", "Google", "TCS", "Infosys", "Accenture",
  "Cognizant", "Bosch", "Deloitte", "EY", "Wipro",
  "Zoho", "Microsoft", "Capgemini", "Federal Bank", "JPMorgan Chase",
];

// ─── DEPT PLACEMENTS ──────────────────────────────────────────────────────────
export const deptPlacements = [
  { dept: "AI & DS",       avg: "₹11.5 LPA", pct: 100 },
  { dept: "CSE",           avg: "₹10.5 LPA", pct: 92  },
  { dept: "ECE",           avg: "₹7.8 LPA",  pct: 80  },
  { dept: "MBA",           avg: "₹8.5 LPA",  pct: 76  },
  { dept: "Biotechnology", avg: "₹6.5 LPA",  pct: 68  },
  { dept: "Mechanical",    avg: "₹5.8 LPA",  pct: 60  },
  { dept: "Civil",         avg: "₹5.2 LPA",  pct: 55  },
];

// ─── PLACEMENTS ─────────────────────────────────────────────────────────────
export const placementHighlights = [
  { sno: 1, company: "JPMorgan Chase", salary: "19.75" },
  { sno: 2, company: "Juspay", salary: "15" },
  { sno: 3, company: "IDFC First Bank", salary: "14" },
  { sno: 4, company: "TCS", salary: "12" },
  { sno: 5, company: "Infosys", salary: "9.5" },
  { sno: 6, company: "Airport Authority of India", salary: "7.8" },
  { sno: 7, company: "Federal Bank", salary: "7.5" },
  { sno: 8, company: "Propel", salary: "7" },
  { sno: 9, company: "CTS", salary: "6.75" },
  { sno: 10, company: "Tamilnadu Mercantile Bank", salary: "6.7" },
];

export const elitePlacements = [
  { sno: 1, student: "Rhenius A", regNo: "URK21CS1073", company: "Shikra Engineering Pte Ltd", salary: "23.5" },
  { sno: 2, student: "Tara Ann Lukose", regNo: "URK21CS1022", company: "Google", salary: "21" },
  { sno: 3, student: "Jobej C", regNo: "URK21CS5053", company: "Sabre", salary: "13.5" },
  { sno: 4, student: "Chris Zionna A", regNo: "URK21CS7032", company: "Sabre", salary: "13.5" },
  { sno: 5, student: "Winston James Daniel B", regNo: "URK21A11044", company: "Sabre", salary: "13.5" },
  { sno: 6, student: "A. Joel Iman", regNo: "URK21CS5005", company: "Delight International LLC", salary: "12.5" },
  { sno: 7, student: "Jobin Shery Mathew", regNo: "URK21CS1033", company: "Alam Caray", salary: "10.2" },
  { sno: 8, student: "Sivabala", regNo: "URK21RA2004", company: "Tesseract Imaging Limited", salary: "10" },
  { sno: 9, student: "Bolem Vyshnavi", regNo: "PRK23EC1004", company: "ZF", salary: "9.5" },
  { sno: 10, student: "Aditi Sharma", regNo: "URK21BM2007", company: "Lek d.d", salary: "9.5" },
  { sno: 11, student: "Bewin Felix R A", regNo: "URK21CS1128", company: "Infosys", salary: "9.5" },
  { sno: 12, student: "Biswas D Babu", regNo: "PRK23MS1041", company: "Asian Paints", salary: "9.5" },
  { sno: 13, student: "Harish Siddarth S", regNo: "PRK23MS1044", company: "Asian Paints", salary: "9.5" },
  { sno: 14, student: "Jerlin George", regNo: "PRK23CS5003", company: "TCS", salary: "9" },
  { sno: 15, student: "Chirukuri Nirmal Prabhakar", regNo: "URK21CS2060", company: "HIT", salary: "9" },
  { sno: 16, student: "Varsha N", regNo: "PRK23CS1008", company: "Alstom", salary: "8.5" },
  { sno: 17, student: "Jonathan Thomas Mathews", regNo: "URK21CS2036", company: "Infinite Flowers, UAE", salary: "8.3" },
  { sno: 18, student: "Vignesh Sasikumar", regNo: "URK21CS2039", company: "Vibrant Group Trading and Contracting", salary: "8.2" },
  { sno: 19, student: "Jeevan Kuruvilla Sunil", regNo: "URK21CS2022", company: "Sheetla Car Transport", salary: "8" },
  { sno: 20, student: "Nithesh Kumar", regNo: "URK21CS7026", company: "Cybersecure", salary: "8" },
  { sno: 21, student: "Ajmal Askar", regNo: "URK21A11035", company: "Express Analytics India Pvt", salary: "8" },
];

// ─── EVENTS & HIGHLIGHTS ─────────────────────────────────────────────────────
export const eventsGallery = [
  {
    title: "Cultural Performance",
    image: "https://karunya.edu/img/homepage/Slides/slide1.jpg",
  },

  {
    title: "Student Interaction",
    image: "https://karunya.edu/img/homepage/Slides/slide2.jpg",
  },

  {
    title: "Campus Life",
    image: "https://karunya.edu/img/homepage/Slides/slide18.jpg",
  },

  {
    title: "Research Laboratory",
    image: "https://karunya.edu/img/homepage/Slides/slide4.jpg",
  },

  {
    title: "Technology & Coding",
    image: "https://karunya.edu/img/homepage/Slides/slide6.jpg",
  },

  {
    title: "Biotechnology Research",
    image: "https://karunya.edu/img/homepage/Slides/slide8.jpg",
  },

  {
    title: "Innovation & Learning",
    image: "https://karunya.edu/img/homepage/Slides/slide10.jpg",
  },

  {
    title: "Scientific Exploration",
    image: "https://karunya.edu/img/homepage/Slides/slide11.jpg",
  },
];

// ─── ACCREDITATIONS ───────────────────────────────────────────────────────────
export const accreditations = [
  { label: "NAAC A++",            image: images.naac        },
  { label: "NBA Accredited",      image: images.nba         },
  { label: "AICTE Approved",      image: images.aicte       },
  { label: "NIRF Ranked",         image: images.nirf        },
  { label: "UGC Category 1",      image: images.ugc         },
  { label: "QS I·GAUGE Platinum", image: images.qsIGauge    },
  { label: "THE Rankings",        image: images.theRanking  },
  { label: "QS Asia 694",         image: images.qsAsia      },
  { label: "UI GreenMetric #346", image: images.greenMetric },
];

// ─── NOTABLE ALUMNI ───────────────────────────────────────────────────────────
export const notableAlumni = [
  { name: "Mr. Senthil Muthiah",  role: "Partner, McKinsey & Company",     batch: "ECE 1994",        image: "https://karunya.edu/img/homepage/Alumni/Mr. Sethil Muthiah (McKinsey & Company).png" },
  { name: "Mr. K R Moses",        role: "MD, Allison Transmission",         batch: "ECE 1994",        image: "https://karunya.edu/img/homepage/Alumni/Mr. K.R. Moses (Allison Transmission).png" },
  { name: "Mr. Vijin Jenius",     role: "Group Director, ISRO",             batch: "ECE 1995",        image: "https://karunya.edu/img/homepage/Alumni/Mr. Vijin Jenius.png" },
  { name: "Mr. Newin Durai",      role: "Executive VP, Oracle Services",    batch: "Mechanical 1993", image: "https://karunya.edu/img/homepage/Alumni/Mr. Newin Durai (Oracle Services).png" },
  { name: "Mr. John Anand Kumar", role: "Senior VP, Bank of America",       batch: "CSE 1998",        image: "https://karunya.edu/img/homepage/Alumni/Mr. John Anand Kumar (Bank of America).png" },
  { name: "Mr. Jonathan Samuel",  role: "President & CEO, KSB GIW Inc",    batch: "Mechanical 1990", image: "https://karunya.edu/img/homepage/Alumni/Mr. Jonathan Samuel (KSB GIW, Inc).png" },
];

// ─── CONTACT ──────────────────────────────────────────────────────────────────
export const contactInfo = {
  email:   "admissions@karunya.edu",
  phone:   "1800 889 9888",
  general: "info@karunya.edu",
  address: "Karunya Nagar, Coimbatore, Tamil Nadu 641114, India",
};

// ─── AI CHATBOT SUGGESTIONS ───────────────────────────────────────────────────
export const chatbotQuestions = [
  "What courses are available?",
  "What is the admission process?",
  "What are the hostel facilities?",
  "What is the highest placement package?",
  "Do you provide scholarships?",
  "What are the campus facilities?",
  "How can I contact admissions?",
  "What are the placement statistics?",
];