import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'org.stellarium.app',
  appName: 'Stellarium Foundation App',
  webDir: 'dist',
  server: {
    androidScheme: 'http'
  },
  plugins: {
    StatusBar: {
      style: 'DARK',
      backgroundColor: '#0d0015',
      overlaysWebView: false
    }
  }
};

export default config;
