# todoapp-fe
## purpose
a todo app in react native running on android smartphone.
The app uses react native expo instead of react native CLI for Developer Experience purposes. 
## initialize react native app with expo
```npx create-expo-app --template ```
## run app in IDE
start app in app directory: 
- ```npx expo --web or```
- for using Gitpod and testing app on smartphone (different network) via QR code and Expo Go app: ```npx expo --tunnel``` (enables connecting device/smartphone by using Expo Go App and Scannign QR Code)
-  if you encounter problems with babel config, make sure to put it in json format: babel.config.json with content
   ```
   {
   "presets": ["babel-preset-expo"]
   }
   ```
## Install app on smartphone
this todo app can be installed on a smartphone. It stores data only in frontend (fe) and does not require a dedicated backend.

1. Testing: 
2. Build the App as Stand-alone app: Production Release to be independet on Metro Bundler/ Server: ```eas build --platform android --profile production```
3. Output is aab file that needs to be converted to apks file with `bundletool`
4. install bundletool [Java Program from Android Studio](https://github.com/google/bundletool/releases)
   - install java sdk e.g. by using `chocolatey`: ```choco install jdk8```
   - prepare your keystore to sign .apks files: ```keytool -genkeypair -v -keystore your-keystore-name.keystore -alias your-key-alias -keyalg RSA -keysize 2048 -validity 10000```
5. Sign .apks with bundletool: ```java -jar bundletool-all-x.x.x.jar build-apks --bundle=/path/to/your/app.aab --output=/path/to/your/output.apks --mode=universal --ks=your-keystore-name.keystore --ks-pass=pass:your-keystore-password --ks-key-alias=your-key-alias --key-pass=pass:your-key-alias-password```
6. Connect Android Smartphone and enable developer tools
7. Install ADB (Android Developer Brdige, for connecting computer with smartphone)
   - installing Android Studio
   - Adding adb to PATH environment variable. Verify with ```adb version```
8. Install app: ```java -jar bundletool-all.jar install-apks --apks=path/to/your/file.apks```

