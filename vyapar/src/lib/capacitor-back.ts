export async function installAndroidBackHandler(): Promise<void> {
  if (typeof window === 'undefined') return;
  try {
    const { Capacitor } = await import('@capacitor/core');
    if (!Capacitor.isNativePlatform()) return;
    const { App } = await import('@capacitor/app');
    await App.addListener('backButton', ({ canGoBack }) => {
      if (canGoBack || window.history.length > 1) {
        window.history.back();
      } else {
        void App.exitApp();
      }
    });
  } catch {
    // Browser/PWA mode: normal browser history handles Back.
  }
}
