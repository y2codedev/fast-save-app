// import ImageKit from "imagekit";

// export const imagekit = new ImageKit({
//     publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || 'public_M3TwA6N95UyxJ+X5GMYB+PhZU/E=',
//     privateKey: process.env.IMAGEKIT_PRIVATE_KEY || 'private_a1dZZZMBcQvlMX465yiGJn2a0AA=',
//     urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || 'https://ik.imagekit.io/ap2lashrd'
// });

// export function getBgRemovedUrl(originalUrl: string, width: number = 600, height: number = 600): string {
//     try {
//         const url = new URL(originalUrl);
//         return imagekit.url({
//             path: url.pathname,
//             transformation: [{
//                 effect: "bg-remove",
//                 format: "png",
//                 quality: "90",
//                 width: "2000",
//                 height: "2000",
//                 effectExtend: {
//                     name: "bg-remove",
//                     options: {
//                         bg_color: "transparent",
//                         tolerance: 15
//                     }
//                 }
//             }]
//         });
//     } catch (error) {
//         console.error('Error generating URL:', error);
//         throw new Error('Failed to generate processed URL');
//     }
// }