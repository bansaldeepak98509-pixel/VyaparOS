import { Capacitor, registerPlugin } from "@capacitor/core";

interface PrintPlugin {
  print(): Promise<void>;
}

const Print = registerPlugin<PrintPlugin>("Print");

export async function printDocument(): Promise<void> {
  if (Capacitor.isNativePlatform()) {
    await Print.print();
    return;
  }

  window.print();
}
