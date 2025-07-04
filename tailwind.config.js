/** @type {import('tailwindcss').Config} */
import { JOBMATE_COLOR } from "./src/styles/theme";
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        mainBlue: JOBMATE_COLOR.mainBlue,
        subSkyBlue: JOBMATE_COLOR.subSkyBule,
        subDarkBlue: JOBMATE_COLOR.subDarkBlue,
        white: JOBMATE_COLOR.white,
        gray: {
          50: JOBMATE_COLOR.gray50,
          100: JOBMATE_COLOR.gray100,
          200: JOBMATE_COLOR.gray200,
          300: JOBMATE_COLOR.gray300,
          400: JOBMATE_COLOR.gray400,
          500: JOBMATE_COLOR.gray500,
          600: JOBMATE_COLOR.gray600,
          700: JOBMATE_COLOR.gray700,
          800: JOBMATE_COLOR.gray800,
          900: JOBMATE_COLOR.gray900,
        },
      },
      fontFamily: {
        sans: ['Pretendard', 'sans-serif'],
      },
      fontSize: {
        h1: ['32px', { lineHeight: '42px', fontWeight: '700' }], // Bold
        h2: ['24px', { lineHeight: '34px', fontWeight: '600' }], // Semibold
        h3: ['20px', { lineHeight: '28px', fontWeight: '600' }], // Semibold
        h4: ['18px', { lineHeight: '26px', fontWeight: '500' }], // Medium
        bodyLg: ['16px', { lineHeight: '24px', fontWeight: '400' }], // Regular
        bodyMd: ['14px', { lineHeight: '22px', fontWeight: '400' }],
        bodySm: ['12px', { lineHeight: '20px', fontWeight: '400' }],
        caption: ['10px', { lineHeight: '14px', fontWeight: '400' }],
      },
      spacing: {},
      maxWidth: {},
      minWidth: {},
      height: {},
      minHeight: {},
    },
  },
  plugins: [],
};
