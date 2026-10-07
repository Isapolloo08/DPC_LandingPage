// Import real authentic photos from ministry folders
import streamKinder from "@/assets/Kinder Ministry/516368798_4004060663255125_3940156298598136062_n.webp";
import streamElem from "@/assets/Elementary Ministry/480577141_481392148377786_6333824624822562519_n.webp";
import streamElem2 from "@/assets/Elementary Ministry/696478001_828648963652101_5968731956145118473_n.webp";
import streamHs from "@/assets/High School Ministry/680044493_935616212628115_2898471636377619378_n.webp";
import streamYouthCamp from "@/assets/Youth Ministry/656680392_958771106489110_8611197159791022889_n.webp";
import streamYouthPraise from "@/assets/Youth Ministry/714759264_1015627274136826_7581065074620186600_n.webp";
import streamYouthFellowship from "@/assets/Youth Ministry/712445122_1016213600744860_322202296073548293_n.webp";
import streamYA from "@/assets/Young Adult Ministry/505320113_661118810260117_450252600683907860_n.webp";
import streamCouples from "@/assets/Junior Adult Minitry/615576920_889621683718381_8998977265371590367_n.webp";
import streamSeniors from "@/assets/Old Adult Ministry/722769534_122172250904944863_7045558778597727105_n.webp";

export interface ChurchPhotoItem {
  id: string;
  src: string;
  alt: string;
  tag: string;
  title: string;
  description: string;
}

// Curated authentic church family photos
export const CHURCH_PHOTOS: ChurchPhotoItem[] = [
  {
    id: "sanctuary-building",
    src: "/images/church-building.webp",
    alt: "Daet Presbyterian Church sanctuary building in Cobangbang, Daet",
    tag: "Sanctuary",
    title: "Our Church Home & Sanctuary",
    description: "Purok 2, Cobangbang, Daet, Camarines Norte",
  },
  {
    id: "youth-praise",
    src: streamYouthPraise,
    alt: "DPC Sanctuary acoustic praise and worship exaltation team leading congregation",
    tag: "Worship",
    title: "Christ-Exalting Sunday Praise",
    description: "Lifting our voices in biblical worship every Sunday",
  },
  {
    id: "youth-camp",
    src: streamYouthCamp,
    alt: "Camarines Norte Youth Camp & Retreat worship gathering",
    tag: "Youth Ministry",
    title: "Youth Camp & Retreat",
    description: "Growing together in faith, prayer, and discipleship",
  },
  {
    id: "kinder-ministry",
    src: streamKinder,
    alt: "Seeds of Grace Sunday School & Children Bible storytelling class",
    tag: "Seeds of Grace",
    title: "Kindergarten Sunday School",
    description: "Nurturing young hearts with God's Word and songs",
  },
  {
    id: "elem-vbs",
    src: streamElem,
    alt: "Covenant Kids Elementary Sunday School & Vacation Bible School class",
    tag: "Covenant Kids",
    title: "Elementary Bible Fellowship",
    description: "Learning Scripture through stories, crafts, and friendship",
  },
  {
    id: "hs-fellowship",
    src: streamHs,
    alt: "Ignite Teens High School Fellowship & Discipleship small group",
    tag: "Ignite Teens",
    title: "High School Discipleship",
    description: "Equipping young people with truth for life and school",
  },
  {
    id: "ya-roundtable",
    src: streamYA,
    alt: "Ambassadors for Christ Young Adults Roundtable & Fellowship meeting",
    tag: "Young Adults",
    title: "Ambassadors for Christ",
    description: "Young professionals and college students walking in faith",
  },
  {
    id: "couples-fellowship",
    src: streamCouples,
    alt: "Pillars of Faith Couples & Family Covenant Dinner Fellowship",
    tag: "Pillars of Faith",
    title: "Couples & Family Ministry",
    description: "Building strong, Christ-centered marriages and families",
  },
  {
    id: "seniors-devotion",
    src: streamSeniors,
    alt: "Golden Heritage Senior Saints Morning Devotions & Prayer gathering",
    tag: "Senior Saints",
    title: "Golden Heritage Fellowship",
    description: "A legacy of faithful prayer, encouragement, and wisdom",
  },
  {
    id: "youth-fellowship",
    src: streamYouthFellowship,
    alt: "Youth Ministry members smiling and sharing life together after Sunday service",
    tag: "Fellowship",
    title: "One Family in Christ",
    description: "Sharing genuine fellowship and love across generations",
  },
  {
    id: "elem-activities",
    src: streamElem2,
    alt: "Covenant Kids engaging in creative Sunday school learning activities",
    tag: "Sunday School",
    title: "Joyful Gospel Learning",
    description: "Building a solid biblical foundation from the earliest years",
  },
];
