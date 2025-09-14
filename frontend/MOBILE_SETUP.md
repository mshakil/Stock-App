# 📱 Stock App - Mobile APK Setup Guide

## Prerequisites

### 1. Install Android Studio
- Download from: https://developer.android.com/studio
- Install Android SDK (API level 33 or higher)
- Set up Android emulator or connect physical device

### 2. Install Java Development Kit (JDK)
- Download JDK 17 or higher
- Set JAVA_HOME environment variable

### 3. Install Node.js (Already installed)
- Node.js 16+ required

## Building the Mobile App

### Step 1: Build the Web App
```bash
cd frontend
npm run mobile:build
```

### Step 2: Sync with Android
```bash
npm run mobile:sync
```

### Step 3: Open in Android Studio
```bash
npm run mobile:open
```

### Step 4: Build APK in Android Studio
1. Open Android Studio
2. Open the `android` folder
3. Wait for Gradle sync to complete
4. Go to Build → Build Bundle(s) / APK(s) → Build APK(s)
5. APK will be generated in `android/app/build/outputs/apk/debug/`

## Alternative: Command Line Build

### Using Gradle directly:
```bash
cd frontend/android
./gradlew assembleDebug
```

### APK Location:
- Debug APK: `android/app/build/outputs/apk/debug/app-debug.apk`
- Release APK: `android/app/build/outputs/apk/release/app-release.apk`

## Mobile Features Added

### ✅ Mobile Optimizations
- Touch-friendly button sizes (44px minimum)
- Mobile-optimized form inputs
- Responsive design for all screen sizes
- Safe area handling for notched devices
- Mobile-friendly scrollbars

### ✅ Mobile-Specific Styles
- Capacitor app class for mobile behavior
- Mobile animations and transitions
- Optimized typography for mobile screens
- Touch-optimized interactions

### ✅ Android Configuration
- HTTPS scheme for security
- Mixed content allowed for development
- Web contents debugging enabled
- Splash screen configuration
- Status bar styling

## Testing the App

### On Emulator:
1. Start Android emulator
2. Run: `npm run mobile:android`

### On Physical Device:
1. Enable Developer Options and USB Debugging
2. Connect device via USB
3. Run: `npm run mobile:android`

## Publishing to Google Play Store

### 1. Generate Signed APK
1. Open Android Studio
2. Go to Build → Generate Signed Bundle / APK
3. Create keystore and sign the APK
4. Generate release APK

### 2. Upload to Google Play Console
1. Go to Google Play Console
2. Create new app
3. Upload signed APK
4. Fill in store listing details
5. Submit for review

## Troubleshooting

### Common Issues:
1. **Gradle sync failed**: Check JDK installation and JAVA_HOME
2. **Build failed**: Ensure Android SDK is properly installed
3. **App crashes**: Check console logs in Android Studio
4. **Network issues**: Ensure backend is accessible from mobile

### Debug Commands:
```bash
# Check Capacitor status
npx cap doctor

# Sync changes
npx cap sync

# Run on specific device
npx cap run android --target="device_name"
```

## File Structure
```
frontend/
├── android/                 # Android project
├── src/
│   ├── mobile.css          # Mobile-specific styles
│   └── ...
├── capacitor.config.json   # Capacitor configuration
└── dist/                   # Built web app
```

## Next Steps
1. Test the app on different devices
2. Add mobile-specific features (camera, notifications, etc.)
3. Optimize performance for mobile
4. Add offline functionality
5. Implement push notifications
