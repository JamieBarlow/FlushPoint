<div align="center">
  <h1>FlushPoint (in development) :closed_book:</h1>
  <strong>By Jamie Barlow</strong>
</div>

## Purpose / Background :bulb:

I have found many people report difficulties easily finding a local public bathroom, and that helpful, up-to-date information is notably and surprisingly absent from many current apps and location services. While the need for this amenity is universal, it's particularly of concern to anyone with accessibility needs - such as wheelchair access, changing tables, or provisions for different genders. 

I therefore wanted to build something which could fulfil that need, and provide an interface allowing users to contribute their own local knowledge in a helpful, meaningful way. 

Rather than starting from a blank slate, I opted to use existing data services where appropriate, while considering the ability to feed any additional data back into the open database for others to use (even outside this app). After considering a number of geocoding services, I opted for [OpenStreetMap](https://www.openstreetmap.org/), accessed via the [Overpass API](https://wiki.openstreetmap.org/wiki/Overpass_API), and edited or updated via the [OSM API](https://wiki.openstreetmap.org/wiki/API). This was chosen specifically because I found it to have rich and well-considered tagging information, covering a range of accessibility cases, as well as being free to access, and community-driven.

So far I have focused on:
- Familiarising myself with the 𝗢𝗦𝗠 𝗱𝗮𝘁𝗮 𝘀𝘁𝗿𝘂𝗰𝘁𝘂𝗿𝗲 and the 𝗾𝘂𝗲𝗿𝘆 𝗹𝗮𝗻𝗴𝘂𝗮𝗴𝗲 used to fetch from the Overpass API;
- Building a 𝗱𝗮𝘁𝗮 𝗺𝗼𝗱𝗲𝗹 (using 𝗠𝗼𝗻𝗴𝗼𝗗𝗕 / Mongoose schemas) which aligns with this, and seeding my db with randomised test 'fake' data;
- Setting up an 𝗘𝘅𝗽𝗿𝗲𝘀𝘀 𝗯𝗮𝗰𝗸𝗲𝗻𝗱 with API routes for displaying/posting data, user login/authorization and sessions;
- Hooking this up to a 𝗥𝗲𝗮𝗰𝘁 𝗮𝗻𝗱 𝗖𝗵𝗮𝗸𝗿𝗮 𝗨𝗜 𝗳𝗿𝗼𝗻𝘁𝗲𝗻𝗱. Currently this includes a form allowing users to post a new bathroom to the database, including a validated series of accessibility data/fields. Where information isn't known, this is flagged and buttons are provided enabling other users to update this info:

![bathroom display card](https://github.com/user-attachments/assets/19721f1a-2d6a-4370-8faf-dff77497223e)

Through the app's backend design I have approached handling data fetch requests in a modular and maintainable way, using RESTful API architecture and MVC (Model-View-Controller) patterns. I also offer loading and error feedback and fallback states, which present a better user experience. I have written a series of blog articles to document my progress, exploring and implementing good practices for:
  - [Handling async requests](https://jamiebarlow-blog.vercel.app/error-handling-async-requests-in-my-full-stack-application-contd);
  - [Graceful error handling](https://jamiebarlow-blog.vercel.app/react-error-boundaries) using appropriate error boundaries and React Router's error elements;
  - Loading states at the [component level](https://jamiebarlow-blog.vercel.app/react-loading-suspense) as well as at the [route level](https://jamiebarlow-blog.vercel.app/route-level-suspense-with-react-router) using suspense boundaries and React Router's `defer` and `Await`;

## Proposed Features :heavy_check_mark:

- Register / login functionality, with server-side authentication;
- User session data handled via Express-Session and MongoDB;
- CRUD (Create, Read, Update/Edit, Destroy) functionality for bathrooms;
- Image uploading / handling via cloud-hosted CDN;
- Geo-coded, interactive cluster map displaying all bathrooms;

## Technologies :floppy_disk:

- TypeScript
- MongoDB
- Express
- React
- Chakra UI
- Node.js
- React Router (routing, data loaders, loading states with React Suspense, error elements/boundaries)
- OpenStreetMap API

## License :scroll:

- [GNU GPLv3](https://www.gnu.org/licenses/gpl-3.0.en.html)
