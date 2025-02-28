import img_src from "../assets/images/saahitt.png";
import prabasi from "../assets/images/prabasi.png";
// export const projects = [
//   {
//     id: "1",
//     title: "Saahitt",
//     description:
//       "Saahitt is Dobaato's cutting-edge data project that transforms Nepal’s events and wedding industry, leveraging insights to streamline bookings and enhance user experiences. Using a tech stack that includes Python, Flask, PostgreSQL, and custom data parsing tools, Saahitt simplifies tasks from filling booked dates to managing unavailability, ensuring precision in every detail.",
//     image: img_src,
//     category: "all",
//     demoUrl: "https://saahitt.com/",
//   },
// ];


export const projects: { id: string; title: string; description: string; image: string; category: 'web' | 'mobile' | 'analytics'| 'all'; demoUrl: string; }[] = [

  {
    id: "1",
    title: "Saahitt",
    description:
      "Saahitt is Dobaato's cutting-edge data project that transforms Nepal’s events and wedding industry, leveraging insights to streamline bookings and enhance user experiences. Using a tech stack that includes Python, Flask, PostgreSQL, and custom data parsing tools, Saahitt simplifies tasks from filling booked dates to managing unavailability, ensuring precision in every detail.",
    image: img_src,
    category: "all",
    demoUrl: "https://saahitt.com/",
  },

  {

    id: '2',

    title: 'Prabasi(Foreign Job Portal)*Demo*',

    description: "Prabasi is Dobaato's another pioneering aggregation project transforming the overseas job market for workers and job seekers. By providing up-to-date information on international hiring trends, agency offerings, and curated foreign job listings from blogs and newsletters, Prabasi empowers individuals to make informed career decisions. Built using a modern tech stack that includes Python, React, PostgreSQL, and web-scraping tools, Prabasi ensures seamless access to reliable opportunities. From connecting workers with reputable agencies to delivering the latest job openings, Prabasi simplifies the overseas employment journey for a brighter future.",

    image: prabasi,

    category: 'web',

    demoUrl: 'https://superlative-monstera-7c8a0e.netlify.app/',

  },

  // {

  //   id: '3',

  //   title: 'Project 3',

  //   description: 'Description 3',

  //   image: 'image3.jpg',

  //   category: 'analytics',

  //   demoUrl: 'http://example.com',

  // },

];
