# todoapp-fe
this todo app can be installed on a smartphone. It stores data only in frontend (fe) and does not require a dedicated backend.

1. Build the App as Stand-alone app: Production Release to be independet on Metro Bundler/ Server: ```eas build --platform android --profile production```
2. Output is aab file that needs to be converted to apks file with `bundletool`
3. install bundletool [Java Program from Android Studio](https://github.com/google/bundletool/releases)
   - install java sdk e.g. by using `chocolatey`: ```choco install jdk8```
   - prepare your keystore to sign .apks files: ```keytool -genkeypair -v -keystore your-keystore-name.keystore -alias your-key-alias -keyalg RSA -keysize 2048 -validity 10000```
4. Sign .apks with bundletool: ```java -jar bundletool-all-x.x.x.jar build-apks --bundle=/path/to/your/app.aab --output=/path/to/your/output.apks --mode=universal --ks=your-keystore-name.keystore --ks-pass=pass:your-keystore-password --ks-key-alias=your-key-alias --key-pass=pass:your-key-alias-password```
5. Connect Android Smartphone and enable developer tools
6. Install ADB (Android Developer Brdige, for connecting computer with smartphone)
   - installing Android Studio
   - Adding adb to PATH environment variable. Verify with ```adb version```
7. Install app: ```java -jar bundletool-all.jar install-apks --apks=path/to/your/file.apks```

