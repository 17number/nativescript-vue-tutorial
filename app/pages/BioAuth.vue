<template>
  <Page>
    <ActionBar title="Bio Auth" />
    <ScrollView>
      <StackLayout>
        <Button text="Go to Home" @tap="goToHome" />
        <Label :text="status" class="status" textWrap="true" style="text-align: center"/>
        <Label text="Checking availability" class="title"/>
        <Button text="available?" @tap="doCheckAvailable" class="button" />

        <Label text="Detect changes in the device biometric database. For best security you want to have the user reauth whenever this method returns true." textWrap="true"/>
        <Button text="Biometric ID changed?" @tap="doCheckFingerprintsChanged" class="button" />

        <Label text="Scanning the fingerprint / face" class="title"/>
        <Label text="When scanning fails or is not possible, you can either use the built-in passcode fallback or handle it yourself (custom fallback)." textWrap="true"/>
        <Button text="verify with passcode fallback" @tap="doVerifyFingerprint" class="button" />
        <!-- iOS only -->
        <Button text="verify with custom fallback(no 2nd arg)" @tap="doVerifyFingerprintWithCustomFallback" class="button" v-if="isIOS"/>
        <Button text="verify with custom fallback(set 2nd arg to 'true')" @tap="doVerifyFingerprintWithCustomFallback(true)" class="button" v-if="isIOS"/>
        <!-- Android only -->
        <Label text="Note that this will fail if you previously cancelled authentication with the button above. Try reinstalling the app if funny things happen." textWrap="true" v-if="isAndroid"/>
        <Button text="verify with custom UI" @tap="doVerifyFingerprintWithCustomUI" class="button" v-if="isAndroid" />
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script>
  import { isIOS, isAndroid } from "tns-core-modules/platform";
  import { FingerprintAuth } from "nativescript-fingerprint-auth";
  import home from '@/components/App'

  export default {
    name: 'BioAuth',
    data() {
      return {
        isIOS,
        isAndroid,
        fingerprintAuth: FingerprintAuth,
        status: "Tap a button below..",
        CONFIGURED_PASSWORD: "MyPassword",
      };
    },
    created() {
      this.fingerprintAuth = new FingerprintAuth();
    },
    methods: {
      goToHome() {
        console.log('tapped button "go to home"');
        this.$navigateTo(home, {
          transitionAndroid: { name: 'slide' },
        });
      },
      doCheckAvailable() {
        this.fingerprintAuth
          .available()
          .then((result) => {
            console.log("doCheckAvailable result: " + JSON.stringify(result));
            this.status = "Biometric ID available? - " +
              (result.any ? (result.face ? "Face" : "Touch") : "NO");
          })
          .catch(err => {
            console.log("doCheckAvailable error: " + err);
            this.status = "Error: " + err;
          });
      },
      doCheckFingerprintsChanged() {
        this.fingerprintAuth
          .didFingerprintDatabaseChange()
          .then(changed => {
            this.status = "Biometric ID changed? - " + (changed ? "YES" : "NO");
          });
      },
      doVerifyFingerprint() {
        this.fingerprintAuth
          .verifyFingerprint({
            title: "Enter your password",
            message: "Scan yer finger", // optional
            authenticationValidityDuration: 10 // Android
          })
          .then(() => {
            this.status =  "Biometric ID / passcode OK";
          })
          .catch(err => {
            alert({
              title: "Biometric ID NOT OK / canceled",
              message: JSON.stringify(err),
              okButtonText: "Mmkay"
            });
          });
      },
      doVerifyFingerprintWithCustomUI() {
        this.fingerprintAuth
          .verifyFingerprint({
            message: "Scan yer finger", // optional
            useCustomAndroidUI: true // Android
          })
          .then(enteredPassword => {
            if (enteredPassword === undefined) {
              this.status = "Biometric ID OK";
            } else {
              // compare enteredPassword to the one the user previously configured for your app (which is not the users system password!)
              if (enteredPassword === this.CONFIGURED_PASSWORD) {
                this.status = "Biometric ID OK, using password";
              } else {
                this.status = `Wrong password. Try '${this.CONFIGURED_PASSWORD}' 😉`;
              }
            }
          })
          .catch(err =>
            this.status = `Biometric ID NOT OK: " + ${JSON.stringify(err)}`
          );
      },
      doVerifyFingerprintWithCustomFallback(usePasscode = false) {
        this.fingerprintAuth
          .verifyFingerprintWithCustomFallback({
            message: "Scan yer finger", // optional
            fallbackMessage: "Enter PIN", // optional
            authenticationValidityDuration: 10 // Android
          }, usePasscode)
          .then(() => {
            this.status = "Biometric ID OK";
          })
          .catch(error => {
            this.status = "Biometric ID NOT OK: " + JSON.stringify(error);
            alert({
              title: "Biometric ID NOT OK",
              message: error.code === -3 ? "Show custom fallback" : error.message,
              okButtonText: "Mmkay"
            });
          });
      },
    },
  }
</script>

<style scoped>
Page {
  color: #ffffff;
}

Label {
  font-size: 14;
  color: #53ba82;
}

.title {
  font-size: 18;
  margin: 0 0 10 0;
  color: #53ba82;
}

.status {
  border-radius: 8;
  font-size: 16;
  margin: 20;
  padding: 18 12;
  color: #53ba82;
  background-color: #cccccc;
  border-color: #aaaaaa;
  border-width: 1px;
}

Button {
  background-color: #3598db;
  color: #ccc;
  padding: 8 0;
  margin: 10;
  margin-bottom: 20;
  font-size: 16;
  border-radius: 4;
}

.button {
  /* don't add this class to 'button' above since it will make 'alert/actionsheet' buttons white as well */
  color: #53ba82;
  background-color: #111;
}
</style>
