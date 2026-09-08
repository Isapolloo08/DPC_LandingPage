import { Ministry } from '../types/church';

export const MINISTRIES_DATA: Ministry[] = [
  {
    id: 'kinder',
    name: 'Seeds of Grace',
    tagline: 'Little Hearts Treasuring Jesus',
    ageBracket: 'Kindergarten',
    ageRange: 'Ages 3 – 5',
    iconName: 'Baby',
    color: 'from-amber-400 to-yellow-500',
    description: 'Nurturing our youngest covenant children with hands-on Gospel storytelling, scripture memory songs, gentle crafts, and caring safety supervision during worship services.',
    schedule: 'Sundays: 8:00 AM – 9:30 AM (Sunday School) & 9:30 AM+ (Supervised Playtime & Christian Animations)',
    location: 'Seeds of Grace Room, Ground Floor CNYC Annex',
    leader: 'Teacher Mary Grace Villamater',
    leaderTitle: 'Children’s Ministry Coordinator',
    activities: [
      'Interactive Bible Story Theater & Puppetry',
      'The Gospel Project for Little Learners',
      'Scripture Memory Sing-Alongs',
      'Parent Pager Safe Check-In & Sanitized Play Zone'
    ],
    keyVerse: 'Let the little children come to me, and do not hinder them, for the kingdom of heaven belongs to such as these.',
    keyVerseRef: 'Matthew 19:14',
    stats: {
      membersCount: 35,
      activeGroups: 3,
    },
    eventPhotos: [
      {
        url: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=900&auto=format&fit=crop',
        caption: 'Hands-on Sunday Gospel crafts and interactive puppet storytelling',
        tag: 'Sunday School'
      },
      {
        url: 'https://images.unsplash.com/photo-1596464716127-f2a829822391?q=80&w=900&auto=format&fit=crop',
        caption: 'Joyful playtime & preschool scripture memorization songs',
        tag: 'Kids Fellowship'
      },
      {
        url: 'https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?q=80&w=900&auto=format&fit=crop',
        caption: 'Caring nursery supervision & Bible picture book circle',
        tag: 'Worship Care'
      }
    ]
  },
  {
    id: 'elementary',
    name: 'Covenant Kids',
    tagline: 'Building Strong Biblical Foundations',
    ageBracket: 'Elementary',
    ageRange: 'Ages 6 – 12',
    iconName: 'Sparkles',
    color: 'from-emerald-400 to-teal-500',
    description: 'Empowering grade-schoolers to discover God’s redemptive story from Genesis to Revelation. Features children’s catechism, biblical worldview lessons, and exciting Vacation Bible Schools.',
    schedule: 'Sundays: 8:00 AM – 9:30 AM (Sunday School) & 9:30 AM+ (Supervised Playtime & Christian Movies)',
    location: 'Covenant Kids Hall, 2nd Floor DPC Main',
    leader: 'Elder Ronald & Sis. Hannah De Vera',
    leaderTitle: 'Elementary Department Directors',
    activities: [
      'Westminster Children’s Catechism in English & Tagalog',
      'Annual Summer Vacation Bible School (VBS)',
      'Kids Choir & Scripture Memorization Tournaments',
      'Quarterly Character Outreach & Science-Faith Workshops'
    ],
    keyVerse: 'Start children off on the way they should go, and even when they are old they will not turn from it.',
    keyVerseRef: 'Proverbs 22:6',
    stats: {
      membersCount: 52,
      activeGroups: 4,
    },
    eventPhotos: [
      {
        url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=900&auto=format&fit=crop',
        caption: 'Vacation Bible School (VBS) games and creative learning workshops',
        tag: 'Summer VBS'
      },
      {
        url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=900&auto=format&fit=crop',
        caption: 'Children’s catechism recitation & Scripture tournament winners',
        tag: 'Catechism & Study'
      },
      {
        url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=900&auto=format&fit=crop',
        caption: 'Covenant Kids choir presentation during Resurrection Sunday service',
        tag: 'Kids Choir'
      }
    ]
  },
  {
    id: 'high-school',
    name: 'Ignite Teens',
    tagline: 'Passionate for Truth, Bold for Christ',
    ageBracket: 'High School / Junior High',
    ageRange: 'Ages 13 – 16',
    iconName: 'Flame',
    color: 'from-orange-500 to-red-600',
    description: 'Guiding teenagers through high school challenges, peer pressure, identity questions, and digital culture with unwavering Biblical truth, authentic mentors, and lively fellowship.',
    schedule: 'Sundays: 8:00 AM – 9:30 AM (Youth Worship) & 9:30 AM – 11:30 AM (Bible Study Circles)',
    location: 'Ignite Lounge, CNYC 2nd Floor',
    leader: 'Bro. Joshua Pimentel & Sis. Christine Tan',
    leaderTitle: 'High School Ministry Directors',
    activities: [
      'Apologetics & Worldview Discussions for Teens',
      'High School Campus Bible Study Circles',
      'Sports Fellowships (Basketball, Volleyball, Badminton)',
      'Annual Ignite Winter/Summer Teen Camps'
    ],
    keyVerse: 'Don’t let anyone look down on you because you are young, but set an example for the believers in speech, in conduct, in love, in faith and in purity.',
    keyVerseRef: '1 Timothy 4:12',
    stats: {
      membersCount: 68,
      activeGroups: 5,
    },
    eventPhotos: [
      {
        url: 'https://images.unsplash.com/photo-1526976668912-1a811878dd37?q=80&w=900&auto=format&fit=crop',
        caption: 'Ignite Teen Camp breakout sessions and outdoor team building',
        tag: 'Annual Camp'
      },
      {
        url: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?q=80&w=900&auto=format&fit=crop',
        caption: 'Saturday high school sports fellowship and 3-on-3 basketball league',
        tag: 'Sports Fellowship'
      },
      {
        url: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=900&auto=format&fit=crop',
        caption: 'Passionate teen acoustic praise & weekly discipleship circles',
        tag: 'Saturday Praise'
      }
    ]
  },
  {
    id: 'youth',
    name: 'CNYC Youth Fellowship',
    tagline: 'Camarines Norte Youth Center & Campus Outreach',
    ageBracket: 'Senior High & College Youth',
    ageRange: 'Ages 17 – 21',
    iconName: 'Zap',
    color: 'from-blue-500 to-indigo-600',
    description: 'The core student engine of CNYC! Equipping senior high and collegiate students across CNSC, Mabini Colleges, and local campuses to stand firm in grace and lead as campus lights.',
    schedule: 'Sundays: 9:40 AM – 11:30 AM (Main Worship) & Weekly Scheduled Small Group Discipleship',
    location: 'CNYC Main Multi-Purpose Hall, Daet',
    leader: 'Pastor Mark Arvin Lopez & Youth Council',
    leaderTitle: 'Youth Pastor & Student Council',
    activities: [
      'Vibrant Acoustic & Band Worship Fellowships',
      'Campus Evangelism & Free Study Lounge Ministry',
      'Leadership Training & Thematic Book Studies',
      'Annual Camarines Norte Youth Camp & Missions'
    ],
    keyVerse: 'Remember your Creator in the days of your youth, before the days of trouble come.',
    keyVerseRef: 'Ecclesiastes 12:1',
    stats: {
      membersCount: 110,
      activeGroups: 8,
    },
    eventPhotos: [
      {
        url: 'https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?q=80&w=900&auto=format&fit=crop',
        caption: 'Camarines Norte Youth Camp campfire praise night at Bagasbas Beach',
        tag: 'Bagasbas Youth Camp'
      },
      {
        url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=900&auto=format&fit=crop',
        caption: 'CNYC Free Campus Study Lounge & collegiate discipleship study group',
        tag: 'Campus Outreach'
      },
      {
        url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=900&auto=format&fit=crop',
        caption: 'Saturday evening student worship night and youth testimony sharing',
        tag: 'Youth Worship Night'
      }
    ]
  },
  {
    id: 'young-adult',
    name: 'Ambassadors for Christ',
    tagline: 'Gospel Faithfulness in the Workplace & Modern Life',
    ageBracket: 'Young Professionals & Graduates',
    ageRange: 'Ages 22 – 35',
    iconName: 'Compass',
    color: 'from-cyan-500 to-blue-600',
    description: 'Navigating career launches, singles, dating, courtship, finances, and early marriage with gospel clarity. We integrate faith with daily professional callings across Daet and Bicol.',
    schedule: 'Sundays: 9:40 AM – 11:30 AM (Main Worship) & Weekly Scheduled Discipleship Groups',
    location: 'CNYC Upper Conference Room & Local Cafes',
    leader: 'Engr. Daniel Alcantara & Dr. Alyssa Reyes',
    leaderTitle: 'Young Adult Ministry Coordinators',
    activities: [
      'Marketplace Faith & Ethics Masterclasses',
      'Singles & Pre-Marital Mentorship Cohorts',
      'Community Medical & Legal Outreach Drives',
      'Theological Book Clubs & Weekend Retreats'
    ],
    keyVerse: 'We are therefore Christ’s ambassadors, as though God were making his appeal through us.',
    keyVerseRef: '2 Corinthians 5:20',
    stats: {
      membersCount: 85,
      activeGroups: 6,
    },
    eventPhotos: [
      {
        url: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=900&auto=format&fit=crop',
        caption: 'Bi-weekly Friday dinner fellowship & marketplace ethics discussion',
        tag: 'Dinner Fellowship'
      },
      {
        url: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=900&auto=format&fit=crop',
        caption: 'Volunteer young doctors & professionals leading the Daet community medical outreach',
        tag: 'Medical Mission'
      },
      {
        url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=900&auto=format&fit=crop',
        caption: 'Theological book study cohort and career mentorship cafe circle',
        tag: 'Career Mentorship'
      }
    ]
  },
  {
    id: 'junior-adult',
    name: 'Pillars of Faith',
    tagline: 'Leading Families, Stewarding Kingdom Impact',
    ageBracket: 'Mid-Career, Parents & Couples',
    ageRange: 'Ages 36 – 55',
    iconName: 'Shield',
    color: 'from-amber-600 to-yellow-600',
    description: 'Supporting men and women in their prime seasons of family life, parenting, business leadership, and church stewardship through deep community, marriage enrichment, and accountability.',
    schedule: 'Sundays: 8:00 AM – 9:30 AM (Adult Bible Study) & 9:40 AM – 11:30 AM (Main Worship)',
    location: 'DPC Main Sanctuary & Home Fellowships',
    leader: 'Elder Victor & Deaconess Rachel Santos',
    leaderTitle: 'Family & Couples Ministry Heads',
    activities: [
      'Covenant Parenting & Biblical Marriage Seminars',
      'Men of the Word & Titus 2 Women’s Fellowships',
      'Community Relief, Benevolence & Livelihood Projects',
      'Home Discipleship Clusters in Daet, Vinzons, & Talisay'
    ],
    keyVerse: 'As for me and my house, we will serve the LORD.',
    keyVerseRef: 'Joshua 24:15',
    stats: {
      membersCount: 95,
      activeGroups: 7,
    },
    eventPhotos: [
      {
        url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=900&auto=format&fit=crop',
        caption: 'Annual Married Couples & Family Covenant Retreat in Camarines Norte',
        tag: 'Couples Retreat'
      },
      {
        url: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=900&auto=format&fit=crop',
        caption: 'Men of the Word Saturday breakfast & Titus 2 Women’s home discipleship',
        tag: 'Men & Women Circles'
      },
      {
        url: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=900&auto=format&fit=crop',
        caption: 'Community benevolence packaging & Bicol typhoon relief dispatch',
        tag: 'Benevolence Outreach'
      }
    ]
  },
  {
    id: 'old-adult',
    name: 'Golden Heritage (Simeon & Anna)',
    tagline: 'Finishing Well, Rich in Wisdom and Prayer',
    ageBracket: 'Senior Saints',
    ageRange: 'Ages 56 and Above',
    iconName: 'Crown',
    color: 'from-purple-500 to-indigo-700',
    description: 'Honoring our venerable seniors who anchor the church in ceaseless intercessory prayer, legacy mentorship, and joyful fellowship in the golden years of life.',
    schedule: 'Sundays: 8:00 AM – 9:30 AM (Senior Bible Study) & 9:40 AM – 11:30 AM (Main Worship)',
    location: 'DPC Fellowship Hall (Accessible Ground Floor)',
    leader: 'Elder Emeritus Benjamin & Sis. Luzviminda Cruz',
    leaderTitle: 'Senior Fellowship Advisors',
    activities: [
      'Morning Hymn Sing & Intercessory Prayer Hour',
      'Health, Wellness & Gentle Stretching Gatherings',
      'Grandparent & Legacy Mentorship Sessions',
      'Home & Hospital Visitation Ministry'
    ],
    keyVerse: 'They will still bear fruit in old age, they will stay fresh and green, proclaiming, “The LORD is upright; he is my Rock.”',
    keyVerseRef: 'Psalm 92:14-15',
    stats: {
      membersCount: 48,
      activeGroups: 3,
    },
    eventPhotos: [
      {
        url: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?q=80&w=900&auto=format&fit=crop',
        caption: 'Bi-monthly Thursday morning hymn singing & intercessory prayer breakfast',
        tag: 'Thursday Prayer'
      },
      {
        url: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=900&auto=format&fit=crop',
        caption: 'Senior fellowship tea, wellness check-in, and pastoral encouragement',
        tag: 'Senior Fellowship'
      },
      {
        url: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=900&auto=format&fit=crop',
        caption: 'Grandparent legacy celebration & churchwide Agape feast gathering',
        tag: 'Agape Celebration'
      }
    ]
  }
];
