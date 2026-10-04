package com.vyaparos.app;

import android.print.PrintAttributes;
import android.print.PrintDocumentAdapter;
import android.print.PrintManager;
import android.webkit.WebView;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "Print")
public class PrintPlugin extends Plugin {

    @com.getcapacitor.PluginMethod
    public void print(PluginCall call) {
        getActivity().runOnUiThread(() -> {
            WebView webView = getBridge().getWebView();

            PrintManager printManager =
                    (PrintManager) getActivity().getSystemService(android.content.Context.PRINT_SERVICE);

            if (printManager == null) {
                call.reject("Print service is unavailable");
                return;
            }

            String jobName = "VyaparOS";
            PrintDocumentAdapter adapter =
                    webView.createPrintDocumentAdapter(jobName);

            printManager.print(
                    jobName,
                    adapter,
                    new PrintAttributes.Builder()
                            .setMediaSize(PrintAttributes.MediaSize.ISO_A4)
                            .setColorMode(PrintAttributes.COLOR_MODE_COLOR)
                            .build()
            );

            call.resolve(new JSObject());
        });
    }
}
