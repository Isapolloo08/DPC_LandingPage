import { VideoOrientation } from '../types/church';

// Import authentic photos from ministry assets for orientation video thumbnails
import kinderThumb from '../assets/Kinder Ministry/516368798_4004060663255125_3940156298598136062_n.jpg';
import elemThumb from '../assets/Elementary Ministry/480577141_481392148377786_6333824624822562519_n.jpg';
import hsThumb from '../assets/High School Ministry/680044493_935616212628115_2898471636377619378_n.jpg';
import youthThumb from '../assets/Youth Ministry/714759264_1015627274136826_7581065074620186600_n.jpg';
import yaThumb from '../assets/Young Adult Ministry/505320113_661118810260117_450252600683907860_n.jpg';
import jaThumb from '../assets/Junior Adult Minitry/615576920_889621683718381_8998977265371590367_n.jpg';
import oaThumb from '../assets/Old Adult Ministry/722769534_122172250904944863_7045558778597727105_n.jpg';

// Import authentic local MP4 video assets
import elemVideo from '../assets/Elementary Ministry.mp4';
import hsVideo from '../assets/Highschool Ministry.mp4';
import jaVideo from '../assets/Junior Adult Ministry.mp4';
import kinderVideo from '../assets/Kinder ministry.mp4';
import oaVideo from '../assets/Old adult ministry.mp4';
import yaVideo from '../assets/Young Adult Ministry.mp4';
import youthVideo from '../assets/youth ministry.mp4';

export const VIDEO_ORIENTATIONS_DATA: VideoOrientation[] = [
  {
    id: 'seeds-of-grace',
    title: 'Seeds of Grace: Kinder Ministry Orientation',
    subtitle: 'Nurturing tender hearts with Bible stories, joyful action songs, and safe supervision.',
    category: 'ministry',
    categoryLabel: 'Kinder Ministry',
    ministryId: 'kinder',
    duration: '1:45',
    thumbnail: kinderThumb,
    videoUrl: kinderVideo,
    targetAudience: 'Toddlers & Kindergarten (Ages 3–5)',
    leader: 'Teacher Hannah Perez & Kinder Faculty',
    description: 'Orientation for parents and guardians introducing our Kinder Ministry. Learn how our dedicated teachers provide a secure, joyful, and Scripture-filled environment during Sunday school and main worship.',
    keyHighlights: [
      'Child-safe, air-conditioned classroom environment with attentive teachers',
      'Interactive Bible stories, memorization verses, and coloring crafts',
      'Secure check-in and check-out procedures for parent peace of mind',
    ],
    chapters: [
      { timeSeconds: 0, timeLabel: '0:00', title: 'Welcome to Seeds of Grace' },
      { timeSeconds: 20, timeLabel: '0:20', title: 'Curriculum & Activity Flow' },
      { timeSeconds: 45, timeLabel: '0:45', title: 'Parent Guidelines & Child Safety' },
    ],
  },
  {
    id: 'covenant-kids',
    title: 'Covenant Kids: Elementary Ministry Orientation',
    subtitle: 'Building strong biblical foundations through engaging lessons, games, and catechism.',
    category: 'ministry',
    categoryLabel: 'Elementary Ministry',
    ministryId: 'elementary',
    duration: '2:00',
    thumbnail: elemThumb,
    videoUrl: elemVideo,
    targetAudience: 'Elementary Pupils (Ages 6–12, Grades 1–6)',
    leader: 'Teacher Grace Mendoza & Sunday School Faculty',
    description: 'Orientation on our Elementary Ministry curriculum and discipleship programs. We partner with parents to ground grade school children in redemptive history from Genesis to Revelation.',
    keyHighlights: [
      'Age-graded Sunday School classes led by trained Christian educators',
      'Weekly memory verse challenges, sword drills, and Bible crafts',
      'Annual Vacation Bible School (VBS) and Children\'s Praise presentations',
    ],
    chapters: [
      { timeSeconds: 0, timeLabel: '0:00', title: 'Elementary Ministry Overview' },
      { timeSeconds: 25, timeLabel: '0:25', title: 'Sunday School Structure & Catechism' },
      { timeSeconds: 50, timeLabel: '0:50', title: 'Annual Events & VBS Previews' },
    ],
  },
  {
    id: 'ignite-teens',
    title: 'Ignite Teens: High School Ministry Orientation',
    subtitle: 'Navigating junior and senior high school with bold biblical convictions and authentic mentors.',
    category: 'ministry',
    categoryLabel: 'High School Ministry',
    ministryId: 'high-school',
    duration: '2:30',
    thumbnail: hsThumb,
    videoUrl: hsVideo,
    targetAudience: 'Junior & Senior High Students (Grades 7–12)',
    leader: 'Pastor Robert',
    description: 'Orientation for high school teens and parents. Discover our youth worship services, campus Bible study circles, sports tournaments, and annual youth camps designed to build lifelong faith.',
    keyHighlights: [
      'Weekly High School Worship Service every Sunday at 8:00 AM & 9:30 AM Bible Study',
      'Relevant teen apologetics, identity in Christ, and peer pressure guidance',
      'Sports tournaments, campouts, and discipleship mentoring',
    ],
    chapters: [
      { timeSeconds: 0, timeLabel: '0:00', title: 'High School Ministry Vision' },
      { timeSeconds: 30, timeLabel: '0:30', title: 'Worship Service & Small Groups' },
      { timeSeconds: 60, timeLabel: '1:00', title: 'Sports Series & Summer Camps' },
    ],
  },
  {
    id: 'youth-fellowship',
    title: 'College & Campus: Youth Ministry Orientation',
    subtitle: 'Equipping college students, fresh graduates, and young working singles up to age 25.',
    category: 'ministry',
    categoryLabel: 'Youth Ministry',
    ministryId: 'youth',
    duration: '2:35',
    thumbnail: youthThumb,
    videoUrl: youthVideo,
    targetAudience: 'College Students, Graduates & Working Youth (Ages 18–25)',
    leader: 'Jayson Almadrones',
    description: 'Orientation for collegiate students and young working youth up to 25. Learn about our campus discipleship networks across CNSC and Mabini Colleges, acoustic worship fellowships, and leadership development.',
    keyHighlights: [
      'Sunday 9:40 AM Worship & mid-week collegiate discipleship cohorts',
      'Campus evangelism, study lounges, and Friendship Day activities',
      'Annual Camarines Norte Youth Camp & leadership retreats',
    ],
    chapters: [
      { timeSeconds: 0, timeLabel: '0:00', title: 'Youth Ministry Heart & Purpose' },
      { timeSeconds: 30, timeLabel: '0:30', title: 'Campus Circles & Friendship Days' },
      { timeSeconds: 65, timeLabel: '1:05', title: 'Youth Camps & Leadership Track' },
    ],
  },
  {
    id: 'ambassadors-ya',
    title: 'Ambassadors for Christ: Young Adults Ministry Orientation',
    subtitle: 'Faithfulness in the workplace, career stewardship, and single life before marriage.',
    category: 'ministry',
    categoryLabel: 'Young Adults Ministry',
    ministryId: 'young-adult',
    duration: '2:15',
    thumbnail: yaThumb,
    videoUrl: yaVideo,
    targetAudience: 'Single Working Professionals & Career Adults (No Marriage Yet)',
    leader: 'Engr. Daniel Alcantara & Dr. Alyssa Reyes',
    description: 'Orientation for single working professionals. Discover how our Young Adult Ministry tackles marketplace ethics, career stewardship, personal finance, and single adult fellowship anchored in God’s Word.',
    keyHighlights: [
      'Marketplace faith, professional ethics, and career mentoring',
      'Kape\'t Kwentuhan talk shows and thematic theological book studies',
      'Intentional community for single adults navigating life before marriage',
    ],
    chapters: [
      { timeSeconds: 0, timeLabel: '0:00', title: 'Living as Christ\'s Ambassadors at Work' },
      { timeSeconds: 25, timeLabel: '0:25', title: 'Kape\'t Kwentuhan & Book Studies' },
      { timeSeconds: 55, timeLabel: '0:55', title: 'Singles Community & Outreach' },
    ],
  },
  {
    id: 'pillars-ja',
    title: 'Pillars of Faith: Junior Adults Ministry Orientation',
    subtitle: 'Strengthening covenant marriages, biblical parenting, and Christ-centered homes.',
    category: 'ministry',
    categoryLabel: 'Junior Adults Ministry',
    ministryId: 'junior-adult',
    duration: '2:20',
    thumbnail: jaThumb,
    videoUrl: jaVideo,
    targetAudience: 'Married Couples, Parents & Young Families',
    leader: 'Elder Victor & Deaconess Rachel Santos',
    description: 'Orientation for married couples and parents. Learn how our Junior Adult Ministry supports husbands, wives, and families through marriage enrichment, parenting seminars, and home life groups.',
    keyHighlights: [
      'Biblical marriage seminars and covenant parenting workshops',
      'Home discipleship clusters and family retreat gatherings',
      'Choral praise, fellowship meals, and practical family support',
    ],
    chapters: [
      { timeSeconds: 0, timeLabel: '0:00', title: 'Ministry to Marriages & Families' },
      { timeSeconds: 30, timeLabel: '0:30', title: 'Family Discipleship & Seminars' },
      { timeSeconds: 60, timeLabel: '1:00', title: 'Home Clusters & Family Retreats' },
    ],
  },
  {
    id: 'golden-heritage',
    title: 'Golden Heritage: Old Adults Ministry Orientation',
    subtitle: 'Finishing the Christian race with joy, legacy wisdom, and ceaseless intercession.',
    category: 'ministry',
    categoryLabel: 'Old Adults Ministry',
    ministryId: 'old-adult',
    duration: '2:10',
    thumbnail: oaThumb,
    videoUrl: oaVideo,
    targetAudience: 'Senior Adults & Church Elders (Golden Years)',
    leader: 'Elder Emeritus Benjamin & Sis. Luzviminda Cruz',
    description: 'Orientation for our venerable seniors and elders. Learn about our weekly hymn sings, prayer circles, health and wellness check-ins, and refreshing resort fellowship outings.',
    keyHighlights: [
      'Sunday 8:00 AM Senior Bible Study and intercessory prayer vigils',
      'Grandparent mentoring, visitation ministry, and senior fellowship',
      'Annual senior resort outings and outdoor praise gatherings',
    ],
    chapters: [
      { timeSeconds: 0, timeLabel: '0:00', title: 'Honoring our Senior Saints' },
      { timeSeconds: 25, timeLabel: '0:25', title: 'Hymn Fellowship & Prayer Ministry' },
      { timeSeconds: 50, timeLabel: '0:50', title: 'Resort Outings & Community Life' },
    ],
  },
];
