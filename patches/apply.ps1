$src = Join-Path $PSScriptRoot "capacitor-filesystem-build.gradle"
$dst = "node_modules/@capacitor/filesystem/android/build.gradle"
if (Test-Path $dst) {
    Copy-Item $src $dst
}
