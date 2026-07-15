-dontoptimize

-keepattributes *Annotation*
-keepattributes JavascriptInterface
-keepattributes SourceFile,LineNumberTable

-keep class org.stellarium.app.** { *; }
-keep class com.getcapacitor.** { *; }
-keep class * extends com.getcapacitor.Plugin { *; }

-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}

-keep class * {
    @com.getcapacitor.annotation.CapacitorPlugin <fields>;
}

-keep class org.stellarium.app.MainActivity { *; }
-keep class com.getcapacitor.BridgeActivity { *; }
-keep class com.getcapacitor.Plugin { *; }
-keepclassmembers class com.getcapacitor.** { *; }

# Keep WebView JavaScript interface methods
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}

# Prevent R8 stripping WebRTC / getUserMedia support
-keep class org.chromium.** { *; }
-dontwarn org.chromium.**
