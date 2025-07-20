/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx,css}'],
  theme: {
    extend: {
      colors: {
        mainBlue: '#1779FA',
        subSkyBlue: '#00B1FF',
        subDarkBlue: '#00228B',
        subLightBlue: '#E7F3FF',
        white: '#FFFFFF',
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
      },
      fontFamily: {
        sans: ['Pretendard', 'sans-serif'],
      },
      fontSize: {
        h1: [
          'clamp(20px, 1.67vw, 32px)',
          { lineHeight: 'clamp(26px, 2.19vw, 42px)', fontWeight: '700' },
        ],
        h2: [
          'clamp(18px, 1.25vw, 24px)',
          { lineHeight: 'clamp(24px, 1.77vw, 34px)', fontWeight: '600' },
        ],
        h3: [
          'clamp(16px, 1.04vw, 20px)',
          { lineHeight: 'clamp(22px, 1.46vw, 28px)', fontWeight: '600' },
        ],
        h4: [
          'clamp(14px, 0.94vw, 18px)',
          { lineHeight: 'clamp(20px, 1.35vw, 26px)', fontWeight: '500' },
        ],
        bodyLg: [
          'clamp(14px, 0.83vw, 16px)',
          { lineHeight: 'clamp(20px, 1.25vw, 24px)', fontWeight: '400' },
        ],
        bodyMd: [
          'clamp(12px, 0.73vw, 14px)',
          { lineHeight: 'clamp(18px, 1.15vw, 22px)', fontWeight: '400' },
        ],
        bodySm: [
          'clamp(10px, 0.63vw, 12px)',
          { lineHeight: 'clamp(16px, 1.04vw, 20px)', fontWeight: '400' },
        ],
        caption: [
          'clamp(8px, 0.52vw, 10px)',
          { lineHeight: 'clamp(12px, 0.73vw, 14px)', fontWeight: '400' },
        ],
      },
      height: {
        header: 'clamp(72px, 5.42vw, 104px)',
        sidebar: 'clamp(800px, 58.3vw, 1120px)',
        footer: 'clamp(36px, 2.6vw, 50px)',
      },
      width: {
        sidebar: 'clamp(180px, 12.5vw, 240px)',
        container: 'clamp(960px, 66.7vw, 1280px)',
      },
    },
  },
  plugins: [],
};
