import type { CapacitorConfig } from '@capacitor/cli';

const appUrl = process.env.VYAPAROS_URL?.trim();

const config: CapacitorConfig = {
  appId: 'com.vyaparos.app',
  appName: 'VyaparOS',
  webDir: 'www',
  server: appUrl
    ? {
        url: appUrl,
        cleartext: false,
        androidScheme: 'https',
      }
    : undefined,
  android: {
    backgroundColor: '#F7F8F6',
  },
};

export default config;
