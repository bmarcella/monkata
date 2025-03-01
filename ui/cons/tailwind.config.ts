

// const config: any = {
//     content: [
//          "./app/**/*.{ts,tsx}",
//          "./app/app.css", 
//          "./.react-router/types/app/+types/*.{ts,tsx}"
//         ],
//     safelist: [
//         'bg-violet-600',
//         'group-hover:text-red-500',
//         'hover:bg-sky-500/75',
//         'bg-sky-500/100',
//         'bg-cyan-500',
//         'border-lime-400',
//         'border-red-400',
//         'border-cyan-400',
//         'hover:bg-lime-600',
//         'hover:bg-red-600',
//         'hover:bg-cyan-600',
//       ],
//     theme: {
//       extend: {
//         colors: {
//           'dark-200': '#your-color-value', // Define your custom color value here
//           // ...other custom colors...
//         },
//       },
//     },
//     plugins: [],
// };

// export default config;

import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"], // Make sure this includes all your files
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
