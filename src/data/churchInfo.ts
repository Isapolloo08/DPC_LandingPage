import { ServiceSchedule } from '../types/church';

export const CHURCH_INFO = {
  name: 'Daet Presbyterian Church',
  shortName: 'DPC',
  centerName: 'Camarines Norte Youth Center',
  centerShort: 'CNYC',
  tagline: 'Rooted in Grace, Growing in Faith, United in Christ',
  verseText: 'So in Christ we, though many, form one body, and each member belongs to all the others.',
  verseRef: 'Romans 12:5',
  stewardshipVerse: 'Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver.',
  stewardshipRef: '2 Corinthians 9:7',
  foundedYear: 1982,
  address: {
    street: 'Camarines Norte Youth Center Bldg., F. Pimentel Avenue',
    barangay: 'Barangay II',
    municipality: 'Daet',
    province: 'Camarines Norte',
    zipCode: '4600',
    landmark: 'Near Provincial Capitol Complex & Agro Sports Center',
    mapCoordinates: {
      lat: 14.1167,
      lng: 122.9556,
      googleMapsUrl: 'https://maps.google.com/?q=Daet+Presbyterian+Church+Camarines+Norte',
      embedUrl: 'https://maps.google.com/maps?q=Daet,+Camarines+Norte,+Philippines&t=&z=16&ie=UTF8&iwloc=&output=embed',
    },
  },
  contact: {
    phone: '+63 (54) 721-2845',
    mobile: '+63 917 842 1982',
    pastoralHotline: '+63 928 554 9920',
    email: 'info@daetpresbyterian.org',
    officeHours: 'Tuesday to Saturday: 8:30 AM – 5:00 PM | Sunday: 7:30 AM – 3:00 PM',
    facebook: 'https://facebook.com/DaetPresbyterianChurchCNYC',
    youtube: 'https://youtube.com/@DaetPresbyterianLive',
  },
  giving: {
    gcash: {
      accountName: 'DAET PRESBYTERIAN CHURCH INC.',
      accountNumber: '0917-842-1982',
      qrPlaceholder: 'GCASH-DPC-STEWARDSHIP-2025',
    },
    bankBDO: {
      bankName: 'Banco De Oro (BDO) - Daet Branch',
      accountName: 'Daet Presbyterian Church Inc.',
      accountNumber: '0039-4801-9234',
      swiftCode: 'BNORPHMM',
    },
    bankBPI: {
      bankName: 'Bank of the Philippine Islands (BPI) - Daet Vinzons',
      accountName: 'Daet Presbyterian Church',
      accountNumber: '8825-1049-72',
    },
    funds: [
      { id: 'general', name: 'General Church & Pastoral Fund', desc: 'Daily operations, pulpit ministry, utilities, and staffing.' },
      { id: 'youth', name: 'Camarines Norte Youth Center (CNYC)', desc: 'Campus ministry, student feeding, youth camps, and study center facilities.' },
      { id: 'building', name: 'Sanctuary & Youth Center Building Fund', desc: 'Facility maintenance, audio-visual gear, and classroom expansions.' },
      { id: 'missions', name: 'Missions & Bicol Outreach (Benevolence)', desc: 'Church planting in Basud, Talisay, Vinzons, and community food drives.' },
    ]
  },
  services: [
    {
      name: 'Sunday Divine Worship',
      day: 'Every Sunday',
      time: '9:00 AM – 11:30 AM',
      description: 'Our primary Lord’s Day gathering centered on the exposition of Scripture, the Lord’s Supper, choral and modern hymns, and corporate prayer.',
      targetAudience: 'All Generations, Families & Visitors',
      badge: 'Main Lord’s Day Gathering',
      isMainWorship: true,
    },
    {
      name: 'Sunday School & Bible Foundations',
      day: 'Every Sunday',
      time: '8:00 AM – 8:50 AM',
      description: 'Age-graded biblical instruction, Westminster Shorter Catechism for youth, and interactive adult theological discussions.',
      targetAudience: 'Children, Teens, Adults',
      badge: 'Discipleship Hour',
      isMainWorship: false,
    },
    {
      name: 'Midweek Prayer & Bible Exposition',
      day: 'Every Wednesday',
      time: '6:30 PM – 8:00 PM',
      description: 'An intimate evening of corporate intercession for Camarines Norte, congregational needs, and verse-by-verse inductive study.',
      targetAudience: 'Congregation & In-person/Hybrid',
      badge: 'Prayer Engine',
      isMainWorship: false,
    },
    {
      name: 'CNYC Saturday Youth Fellowship',
      day: 'Every Saturday',
      time: '3:00 PM – 5:30 PM',
      description: 'Vibrant student-led praise, acoustic worship, contemporary worldview discussions, table games, and discipleship circles.',
      targetAudience: 'High School, College & Young Professionals',
      badge: 'Youth & Campus Outreach',
      isMainWorship: false,
    }
  ] as ServiceSchedule[],
};
