$f = "node_modules/@capacitor/filesystem/android/build.gradle"
$c = Get-Content $f -Raw
$c = $c -replace "'apply plugin: 'kotlin-android''", ""
$c = $c -replace "'compileSdk = project.hasProperty\('compileSdkVersion'\) \? rootProject.ext.compileSdkVersion : 36'", "compileSdk = project.hasProperty('compileSdkVersion') ? rootProject.ext.compileSdkVersion : 37"
$c = $c -replace "'targetSdkVersion project.hasProperty\('targetSdkVersion'\) \? rootProject.ext.targetSdkVersion : 36'", "targetSdkVersion project.hasProperty('targetSdkVersion') ? rootProject.ext.targetSdkVersion : 37"
Set-Content $f $c
