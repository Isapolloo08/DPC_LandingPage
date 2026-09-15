import { Ministry } from '../types/church';

// --- Kindergarten Ministry Photos ---
import kinder1 from '../assets/Kinder Ministry/516368798_4004060663255125_3940156298598136062_n.jpg';
import kinder2 from '../assets/Kinder Ministry/728951324_122175506078930669_1302733184598992361_n.jpg';
import kinder3 from '../assets/Kinder Ministry/754936307_122179487474930669_1777378976676395677_n.jpg';
import kinder4 from '../assets/Kinder Ministry/779266768_122183506274930669_3501010079158056945_n.jpg';
import kinder5 from '../assets/Kinder Ministry/780981404_122183506370930669_5423111782680396998_n.jpg';
import kinder6 from '../assets/Kinder Ministry/784351130_122184551582930669_4276604463356943367_n.jpg';

// --- Elementary Ministry Photos ---
import elem1 from '../assets/Elementary Ministry/480577141_481392148377786_6333824624822562519_n.jpg';
import elem2 from '../assets/Elementary Ministry/696478001_828648963652101_5968731956145118473_n.jpg';
import elem3 from '../assets/Elementary Ministry/737422339_874215309095466_1606506382904725503_n.jpg';
import elem4 from '../assets/Elementary Ministry/795644009_928842926966037_5150057302117564802_n.jpg';
import elem5 from '../assets/Elementary Ministry/799224843_928844726965857_6065735132368469794_n.jpg';

// --- High School Ministry Photos ---
import hs1 from '../assets/High School Ministry/680044493_935616212628115_2898471636377619378_n.jpg';
import hs2 from '../assets/High School Ministry/710746185_963948939794842_623334035736010395_n.jpg';
import hs3 from '../assets/High School Ministry/796426561_1048179688038433_4617103635744998378_n.jpg';
import hs4 from '../assets/High School Ministry/796527703_1048178428038559_3748025892055604993_n.jpg';
import hs5 from '../assets/High School Ministry/799143002_1048180528038349_2765333488138193180_n.jpg';

// --- Youth / College Ministry Photos ---
import youth1 from '../assets/Youth Ministry/656680392_958771106489110_8611197159791022889_n.jpg';
import youth2 from '../assets/Youth Ministry/712445122_1016213600744860_322202296073548293_n.jpg';
import youth3 from '../assets/Youth Ministry/714759264_1015627274136826_7581065074620186600_n.jpg';
import youth4 from '../assets/Youth Ministry/714955504_1016212557411631_4274729500767112906_n.jpg';
import youth5 from '../assets/Youth Ministry/715331357_1015629344136619_1242035705707588863_n.jpg';
import youth6 from '../assets/Youth Ministry/717067034_891611547288431_5177310937572915941_n.jpg';
import youth7 from '../assets/Youth Ministry/784025624_1083340277365525_1609884367141469746_n.jpg';
import youth8 from '../assets/Youth Ministry/785944586_1083340190698867_8844997979530727943_n.jpg';

// --- Young Adult Ministry Photos ---
import ya1 from '../assets/Young Adult Ministry/505320113_661118810260117_450252600683907860_n.jpg';
import ya2 from '../assets/Young Adult Ministry/690603367_927892950249367_8826331412381259866_n.jpg';
import ya3 from '../assets/Young Adult Ministry/719532750_956690060702989_7373299191000118107_n.jpg';
import ya4 from '../assets/Young Adult Ministry/719789654_956689864036342_2095763987152963926_n.jpg';
import ya5 from '../assets/Young Adult Ministry/721169757_956689977369664_8716597357679262405_n.jpg';

// --- Junior Adult / Couples Ministry Photos ---
import ja1 from '../assets/Junior Adult Minitry/615576920_889621683718381_8998977265371590367_n.jpg';
import ja2 from '../assets/Junior Adult Minitry/626386732_906329712047578_6172969032115822277_n.jpg';
import ja3 from '../assets/Junior Adult Minitry/723706238_2023262101883568_5866319006622625006_n.jpg';
import ja4 from '../assets/Junior Adult Minitry/724019843_1322877753302746_8993175069316953491_n.jpg';
import ja5 from '../assets/Junior Adult Minitry/724203661_994313309635368_1473330047075204322_n.jpg';

// --- Old Adult / Seniors Ministry Photos ---
import oa1 from '../assets/Old Adult Ministry/722769534_122172250904944863_7045558778597727105_n.jpg';
import oa2 from '../assets/Old Adult Ministry/723686534_122172251312944863_2969969421896590995_n.jpg';
import oa3 from '../assets/Old Adult Ministry/724408784_122172253130944863_6588021141249655795_n.jpg';
import oa4 from '../assets/Old Adult Ministry/724666165_122172254354944863_1398728098788348633_n.jpg';
import oa5 from '../assets/Old Adult Ministry/724937515_122172251114944863_6146316512934255477_n.jpg';

export const MINISTRIES_DATA: Ministry[] = [
  {
    id: 'kinder',
    name: 'Seeds of Grace',
    tagline: 'Little Hearts Treasuring Jesus',
    ageBracket: 'Kinder Ministry',
    ageRange: 'Ages 3 – 5',
    iconName: 'Sprout',
    color: 'from-amber-400 to-yellow-500',
    description: 'Nurturing our youngest covenant children with hands-on Gospel storytelling, scripture memory songs, gentle crafts, and caring safety supervision during worship services.',
    schedule: 'Sundays: 8:00 AM – 9:30 AM (Sunday School) & 9:30 AM+ (Supervised Playtime & Christian Animations)',
    location: 'Seeds of Grace Room, Ground Floor Church Annex',
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
        url: kinder1,
        caption: 'DPC Kinder Ministry Summer Activity group photo themed "God\'s Creation: A Summer of Worship and Prayer" with teachers and pastors',
        tag: 'Summer Activity 2025'
      },
      {
        url: kinder2,
        caption: 'Kinder children, teachers, and parents bowing heads with clasped hands in opening prayer before Sunday School',
        tag: 'Opening Prayer Time'
      },
      {
        url: kinder3,
        caption: 'Children holding hands in a joyful singing and praise circle during Sunday School fellowship',
        tag: 'Praise & Circle Time'
      },
      {
        url: kinder4,
        caption: 'Infant presentation and covenant dedication ceremony at the DPC sanctuary altar with pastors and family',
        tag: 'Child Dedication Service'
      },
      {
        url: kinder5,
        caption: 'Kinder section presenting their "Praise Him" special song and action dance in front of the congregation',
        tag: 'Special Praise Presentation'
      },
      {
        url: kinder6,
        caption: 'Sunday School teachers leading children in the "Deep, Deep, Deep" action song and praise',
        tag: 'Action Song Sing-Along'
      }
    ]
  },
  {
    id: 'elementary',
    name: 'Covenant Kids',
    tagline: 'Building Strong Biblical Foundations',
    ageBracket: 'Elementary Ministry',
    ageRange: 'Ages 6 – 12',
    iconName: 'BookOpen',
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
        url: elem1,
        caption: 'Elementary Sunday School children and teachers gathering for the month-end celebration photo',
        tag: 'Sunday Activity'
      },
      {
        url: elem2,
        caption: 'Elementary Summer Camp outdoors with the theme "Batang Kristyano sa Misyon, Pag-ibig ni Kristo ang Aksyon"',
        tag: 'Summer Camp 2026'
      },
      {
        url: elem3,
        caption: 'Elementary kids engaged in hands-on Bible crafts, sticker activities, and coloring with teachers',
        tag: 'Crafts & Activity Workshop'
      },
      {
        url: elem4,
        caption: 'Elementary students standing in solemn prayer and devotion led by their Sunday School teacher',
        tag: 'Prayer & Devotion'
      },
      {
        url: elem5,
        caption: 'Sunday School class sitting together completing Bible lesson activity sheets and coloring',
        tag: 'Activity Sheet Coloring'
      }
    ]
  },
  {
    id: 'high-school',
    name: 'Ignite Teens',
    tagline: 'Passionate for Truth, Bold for Christ',
    ageBracket: 'High School Ministry',
    ageRange: 'Junior & Senior High School',
    iconName: 'Flame',
    color: 'from-orange-500 to-red-600',
    description: 'Guiding junior high and senior high school students (Grades 7–12) through high school challenges, peer pressure, identity questions, and teenage life with unwavering Biblical truth, authentic mentors, and lively fellowship.',
    schedule: 'Sundays: 8:00 AM – 9:30 AM (Worship Service) & 9:30 AM – 11:30 AM (Bible Study)',
    location: 'Ignite Lounge, DPC 2nd Floor',
    leader: 'Pastor Robert',
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
        url: hs1,
        caption: 'High school students listening intently to Pastor Wonil Hong\'s closing remarks at the High School Ministry Summer Camp',
        tag: 'Summer Camp Activity'
      },
      {
        url: hs2,
        caption: 'High school youth gathered together for "Bee-Liever\'s Hive" Sunday School fellowship and Bible study',
        tag: 'Bee-Liever\'s Hive Fellowship'
      },
      {
        url: hs3,
        caption: 'High school students bowing in earnest prayer and heart reflection during Sunday youth service',
        tag: 'Youth Prayer & Devotion'
      },
      {
        url: hs4,
        caption: 'High school team proudly celebrating their "Overall Champion" trophy at the High School Ministry Sports Tournament',
        tag: 'Tournament Champions'
      },
      {
        url: hs5,
        caption: 'Churchwide group photo commemorating the DPC High School Ministry Tournament Series with coaches and pastors',
        tag: 'Tournament Series Assembly'
      }
    ]
  },
  {
    id: 'youth',
    name: 'College & Campus Fellowship',
    tagline: 'Collegiate Discipleship & Campus Light',
    ageBracket: 'Youth Ministry',
    ageRange: 'College, Graduates & Working (Up to 25)',
    iconName: 'GraduationCap',
    color: 'from-blue-500 to-indigo-600',
    description: 'Equipping college students, college graduates, and young working youth up to age 25 across local campuses and workplaces to stand firm in grace, grow in reformed theology, and lead as gospel lights.',
    schedule: 'Sundays: 9:40 AM – 11:30 AM (Main Worship) & Weekly Scheduled Small Group Discipleship',
    location: 'DPC Multi-Purpose Fellowship Hall, Daet',
    leader: 'Jayson Almadrones',
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
        url: youth1,
        caption: 'Youth and college students enjoying fun team-building games during Youth Ministry Friendship Day',
        tag: 'Youth Friendship Day'
      },
      {
        url: youth2,
        caption: 'Collegiate youth gathered around the Bible studying Scripture and writing reflections on Proverbs 16:3',
        tag: 'Summer Camp Activity'
      },
      {
        url: youth3,
        caption: 'Youth camp delegates gathered on the outdoor court for a group celebration under the morning sun',
        tag: 'Youth Camp Oudoor Dance Exercise'
      },
      {
        url: youth4,
        caption: 'Youth and college congregation lifting their hands together in sincere praise, surrender, and worship',
        tag: 'Praise & Worship'
      },
      {
        url: youth5,
        caption: 'Youth camp delegates surrounding the blazing campfire for an evening of devotion, songs, and testimonies',
        tag: 'Night Bonfire Activity'
      },
      {
        url: youth6,
        caption: 'Youth ministry students wearing "Completer" sashes during the discipleship graduation and recognition service',
        tag: 'Send Off Activity'
      },
      {
        url: youth7,
        caption: 'Youth ministry group gathering for "Reach Out & Connect: Special Gathering for Evangelism"',
        tag: 'Reach Out & Connect'
      },
      {
        url: youth8,
        caption: 'Youth and college attendees actively participating in group activities and interactive workshops',
        tag: 'Youth Fellowship Activity'
      }
    ]
  },
  {
    id: 'young-adult',
    name: 'Ambassadors for Christ',
    tagline: 'Gospel Faithfulness in the Workplace & Single Life',
    ageBracket: 'Young Adults Ministry',
    ageRange: 'Single Working Professionals (No Marriage)',
    iconName: 'Compass',
    color: 'from-cyan-500 to-blue-600',
    description: 'Connecting single working professionals and career men and women who are navigating career launches, personal finances, singles life, and workplace calling with gospel purpose—focused on single working adults before marriage.',
    schedule: 'Sundays: 9:40 AM – 11:30 AM (Main Worship) & Weekly Scheduled Discipleship Groups',
    location: 'DPC Conference Room & Local Cafes',
    leader: 'Engr. Daniel Alcantara & Dr. Alyssa Reyes',
    leaderTitle: 'Young Adult Ministry Coordinators',
    activities: [
      'Marketplace Faith & Ethics Masterclasses',
      'Singles Fellowship & Mentorship Cohorts',
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
        url: ya1,
        caption: 'Young adult panel discussion and talk show "Kape\'t Kwentuhan With Tito Jet" discussing life, faith, and career',
        tag: 'Kape\'t Kwentuhan'
      },
      {
        url: ya2,
        caption: 'Young adults doing morning exercise and praise workout during Summer Camp 2026: "Faith in Action"',
        tag: 'Summer Camp 2026 Morning Praise'
      },
      {
        url: ya3,
        caption: 'Young adults participating in an interactive music and numbered color card fellowship game',
        tag: 'Interactive Fellowship Game'
      },
      {
        url: ya4,
        caption: 'Young Adult Ministry welcoming gathering and fellowship photo for new members and young professionals',
        tag: 'YA Welcoming Gathering'
      },
      {
        url: ya5,
        caption: 'Young adult discipleship completers receiving their certificates of completion and recognition sashes',
        tag: 'YA Welcoming Gathering'
      }
    ]
  },
  {
    id: 'junior-adult',
    name: 'Pillars of Faith',
    tagline: 'Leading Families, Stewarding Kingdom Impact',
    ageBracket: 'Junior Adults Ministry',
    ageRange: 'Married Couples & Families',
    iconName: 'Shield',
    color: 'from-amber-600 to-yellow-600',
    description: 'Supporting married individuals, couples, and parents with families in building Christ-centered homes through covenant marriage enrichment, Biblical parenting, family discipleship, and community life.',
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
        url: ja1,
        caption: 'Junior adult couples and parents listening to a teaching session on family stewardship and Christian parenting',
        tag: 'Couples & Family Seminar'
      },
      {
        url: ja2,
        caption: 'Junior Adult section singing their special choral praise "Ikaw ang aking sandigan" during worship service',
        tag: 'Special Choral Praise'
      },
      {
        url: ja3,
        caption: 'Junior adults and families lifting hands in heartfelt praise during an outdoor retreat fellowship',
        tag: 'Outdoor Praise & Worship'
      },
      {
        url: ja4,
        caption: 'Junior adult ladies enjoying a fellowship meal and conversation at an outdoor ministry gathering',
        tag: 'Fellowship Meal & Bonding'
      },
      {
        url: ja5,
        caption: 'Junior Adult Ministry members posing together at the heart archway during their family retreat in Camarines Norte',
        tag: 'Family Retreat Heart Landmark'
      }
    ]
  },
  {
    id: 'old-adult',
    name: 'Golden Heritage (Simeon & Anna)',
    tagline: 'Finishing Well, Rich in Wisdom and Prayer',
    ageBracket: 'Old Adults Ministry',
    ageRange: 'Senior Adults (Golden Years)',
    iconName: 'Award',
    color: 'from-purple-500 to-indigo-700',
    description: 'Honoring our venerable elderly and senior members who anchor the church in ceaseless intercessory prayer, godly wisdom, legacy mentorship, and joyful fellowship in their golden years.',
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
        url: oa1,
        caption: 'Golden Heritage senior members gathering in the fellowship room for ministry orientation and registration',
        tag: 'Senior Ministry Briefing'
      },
      {
        url: oa2,
        caption: 'Seniors and church members singing worship songs together during a resort fellowship outing',
        tag: 'Resort Fellowship Praise'
      },
      {
        url: oa3,
        caption: 'Golden Heritage seniors and church members enjoying fun swimming and relaxation at the resort',
        tag: 'Resort Swimming & Fellowship'
      },
      {
        url: oa4,
        caption: 'Seniors ministry group photo in front of the heart arch during their church outing in Camarines Norte',
        tag: 'Golden Heritage Resort Outing'
      },
      {
        url: oa5,
        caption: 'Seniors clapping and singing praises together during morning worship at their fellowship retreat',
        tag: 'Outdoor Praise & Singing'
      }
    ]
  }
];
