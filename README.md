# Appium TypeScript Demo

ตัวอย่างโปรเจกต์ Automated Mobile Testing สำหรับ Android โดยใช้ WebdriverIO, Appium, TypeScript และ Mocha ทดสอบแอป Sauce Labs Sample App

## Prerequisites

- Node.js และ npm
- Java JDK
- Android SDK พร้อม `adb` และ Android Emulator
- สร้างและเปิด Android Emulator ที่มีชื่อ `Android Emulator`
- ตั้งค่า environment variables ของ Android SDK เช่น `ANDROID_HOME` หรือ `ANDROID_SDK_ROOT`

ตรวจสอบอุปกรณ์ที่เชื่อมต่ออยู่ด้วยคำสั่ง:

```bash
adb devices
```

ควรเห็น emulator ในสถานะ `device` ก่อนเริ่มรันเทสต์

## Installation

ติดตั้ง dependencies จากโฟลเดอร์รากของโปรเจกต์:

```bash
npm install
```

โปรเจกต์นี้ใช้ Appium server ที่พอร์ต `4723` ให้เปิด server ใน terminal แยกต่างหาก:

```bash
npx appium --port 4723
```

หาก Appium แจ้งว่ายังไม่มี Android driver ให้ติดตั้งด้วยคำสั่ง:

```bash
npx appium driver install uiautomator2
```

## Run Tests

ตรวจสอบว่า Appium server และ Android Emulator กำลังทำงานอยู่ จากนั้นรัน:

```bash
npm test
```

WebdriverIO จะค้นหาเทสต์ทั้งหมดใน `test/specs/**/*.ts` และติดตั้งแอปจากไฟล์:

```text
apps/Android.SauceLabs.Mobile.Sample.app.2.7.1.apk
```

## Allure Report

โปรเจกต์นี้ใช้ `@wdio/allure-reporter` สำหรับเก็บผลการรันเทสต์ และใช้ `allure-commandline` สำหรับสร้างและเปิดรายงาน โดยตั้งค่า reporter ไว้ใน `wdio.conf.ts` แล้ว

หลังจากรันเทสต์ด้วย `npm test` แล้ว ให้สร้างรายงานจากผลลัพธ์ใน `allure-results` และเปิดรายงานด้วยคำสั่ง:

```bash
npx allure generate allure-results --clean && npx allure open
```

คำสั่งนี้ทำงานดังนี้:

- `allure generate allure-results --clean`: สร้างรายงาน HTML จากผลการทดสอบ และลบรายงานเดิมก่อนสร้างใหม่
- `npx allure open`: เปิดรายงานล่าสุดใน browser ผ่าน local web server

ลำดับการใช้งานแบบเต็ม:

```bash
# Terminal 1: เปิด Appium server
npx appium --port 4723

# Terminal 2: รัน automated tests
npm test

# Terminal 2: สร้างและเปิด Allure report
npx allure generate allure-results --clean && npx allure open
```

หากต้องการสร้างรายงานไว้ในโฟลเดอร์ที่ระบุเอง สามารถใช้คำสั่ง:

```bash
npx allure generate allure-results --clean -o allure-report
npx allure open allure-report
```

ไฟล์ screenshot จากเทสต์ที่ไม่ผ่านจะถูกแนบไว้ใน Allure report โดยอัตโนมัติ

## Test Scenarios

ไฟล์ `test/specs/login.test.ts` ครอบคลุมกรณีหลักดังนี้:

- เข้าสู่ระบบด้วยข้อมูลไม่ถูกต้อง และตรวจสอบข้อความแจ้งเตือน
- เข้าสู่ระบบด้วยข้อมูลถูกต้อง และตรวจสอบว่าหน้า Products แสดงผล

ข้อมูลสำหรับแอปตัวอย่าง:

| Scenario | Username | Password |
| --- | --- | --- |
| Invalid login | `invalid_user` | `invalid_pass` |
| Valid login | `standard_user` | `secret_sauce` |

## Project Structure

```text
.
├── apps/
│   ├── Android-MyDemoAppRN.1.3.0.build-244.apk
│   └── Android.SauceLabs.Mobile.Sample.app.2.7.1.apk
├── test/
│   ├── pageobjects/
│   │   ├── page.ts             # Base page และ helper สำหรับรอ element
│   │   ├── login.page.ts       # Locators และ actions ของหน้า Login
│   │   └── inventory.page.ts   # Verification ของหน้า Products
│   └── specs/
│       ├── login.test.ts       # Authentication test cases
│       └── firstTest.test.ts   # ตัวอย่างเทสต์เพิ่มเติมที่ถูก comment ไว้
├── tsconfig.json               # TypeScript configuration
├── wdio.conf.ts                # WebdriverIO, Appium และ test runner configuration
└── package.json                # Dependencies และ npm scripts
```

## Configuration

แก้ไขค่าการรันเทสต์ได้ที่ `wdio.conf.ts` เช่น:

- `appium:deviceName`: ชื่อ Android Emulator
- `appium:app`: path ของไฟล์ APK
- `appium:appWaitActivity`: activity ที่ใช้รอหลังเปิดแอป
- `port`: พอร์ตของ Appium server
- `mochaOpts.timeout`: timeout สูงสุดของแต่ละเทสต์

## Troubleshooting

### ไม่พบ Appium server

ตรวจสอบว่าเปิด server ที่พอร์ต `4723` แล้ว:

```bash
npx appium --port 4723
```

### ไม่พบ Android device

```bash
adb devices
```

ถ้าไม่พบอุปกรณ์ ให้เปิด emulator และตรวจสอบ Android SDK หรือ USB debugging

### หา APK ไม่พบ

ตรวจสอบว่าไฟล์ APK ที่ระบุใน `wdio.conf.ts` มีอยู่จริงในโฟลเดอร์ `apps/`

### เทสต์ค้างระหว่างเปิดแอป

ตรวจสอบ `appium:appWaitActivity`, ชื่อ emulator และ driver `uiautomator2` ให้ตรงกับ environment ที่ใช้งาน
