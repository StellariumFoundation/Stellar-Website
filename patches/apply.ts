import { copyFileSync, existsSync } from "fs";

const src = "patches/capacitor-filesystem-build.gradle";
const dst = "node_modules/@capacitor/filesystem/android/build.gradle";
if (existsSync(dst)) {
  copyFileSync(src, dst);
}
