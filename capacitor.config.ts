import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.happy.bento',
  appName: 'happy-bento',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
