// const apiKey = 'vXWwwxvhvoHHeqNhZhKmbkdAMoPAJe9T55pl2IS37YrB9UDaXpVvq91x '; // Replace 'YOUR_API_KEY' with your actual Pexels API key
// const searchQuery = "A panoramic view of Gangavathi's bustling marketplaces juxtaposed with the serene flow of the Tungabhadra River, capturing the city's dynamic energy and natural beauty."; // Replace 'nature' with any topic you are interested in
// const apiUrl = `https://api.pexels.com/v1/search?query=${encodeURIComponent(searchQuery)}&per_page=1`;

// async function fetchFirstPhoto() {
//   try {
//     const response = await fetch(apiUrl, {
//       method: 'GET',
//       headers: {
//         'Authorization': apiKey
//       }
//     });

//     if (!response.ok) {
//       throw new Error('Failed to fetch photo');
//     }

//     const data = await response.json();
//     return data.photos[0].src.original; // Returns the URL of the original size image of the first photo
//   } catch (error) {
//     console.error('Error:', error);
//   }
// }

// fetchFirstPhoto().then(photoUrl => console.log('Photo URL:', photoUrl));


let frameLenegthInSeconds = [
  0.53, 0.25, 0.25, 0.24, 0.27, 0.51, 0.75, 0.25, 0.24, 0.77, 0.25, 0.25,
  0.74, 0.77, 0.25, 0.25, 0.25, 0.76, 0.59, 0.22, 0.2, 0.24, 0.25, 0.24, 0.27,
  0.97, 0.29, 0.25, 0.51, 0.24, 0.27, 0.75, 0.25, 0.5, 0.5, 1.01, 0.24, 0.52,
  0.45, 0.2, 0.35, 0.25, 0.24, 0.26, 0.51, 0.25, 0.21, 0.29, 0.76, 0.24, 0.73,
  0.78, 0.53, 0.25, 0.46, 0.29, 0.25, 0.24, 0.24, 1.33, 0.28, 0.25, 0.25,
  0.49,
];

console.log(frameLenegthInSeconds.length)