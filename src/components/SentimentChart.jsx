// // src/components/SentimentChart.jsx

// import React from 'react';
// import './SentimentChart.css';

// /**
//  * props.sentiment: object of { label: score, … }
//  * We'll pick the `Positive` score and compute the remainder as `Other`
//  */
// export default function SentimentChart({ sentiment }) {
//   const positive  = sentiment.Positive ?? 0;
//   const posDeg    = positive * 360;

//   return (
//     <div className="sentiment-chart--netflix">
//       <div
//         className="circle"
//         style={{
//           background: `conic-gradient(
//             #0d6efd ${posDeg}deg,
//             #444 ${posDeg}deg 360deg
//           )`
//         }}
//       />
//       <div className="circle-label">
//         {(positive * 100).toFixed(1)}%
//       </div>
//       <ul className="sentiment-legend">
//         <li>
//           <span className="legend-dot positive" /> Positive
//         </li>
//         <li>
//           <span className="legend-dot other" /> Other
//         </li>
//       </ul>
//     </div>
//   );
// }
