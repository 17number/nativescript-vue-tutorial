<template>
    <Page @swipe="onSwipe">
        <ActionBar title="Home"/>
        <StackLayout>
            <Label :text="`Access counter: ${access}`" />
            <Button text="Go to HelloWorld" @tap="goToHelloWorld" />
            <Button text="Show modal" @tap="showModal" />
            <Button text="Show modal(Full Screen)" @tap="showModalFullScreen" />
            <Button text="Scan QR Code" @tap="goToScanQR" />
            <Button text="Check biometric auth" @tap="goToBioAuth" />
            <Button text="Take or select a photo" @tap="takeOrSelectPhoto" />
            <Image :src="image" v-if="image" />
        </StackLayout>
    </Page>
</template>

<script >
  import HelloWorld from '@/pages/HelloWorld'
  import ScanQR from '@/pages/ScanQR'
  import BioAuth from '@/pages/BioAuth'
  import Modal from '@/pages/Modal'
  import * as camera from 'nativescript-camera';
  import * as imagepicker from 'nativescript-imagepicker';
  const appSettings = require("tns-core-modules/application-settings");

  export default {
    name: 'home',
    data() {
      return {
        access: 0,
        image: null,
      };
    },
    mounted() {
      this.access = appSettings.getNumber("access", 0) + 1;
      appSettings.setNumber("access", this.access);
    },
    methods: {
      goToHelloWorld() {
        console.log('tapped button "go to helloworld"');
        this.$navigateTo(HelloWorld, {
          transitionAndroid: { name: 'slide' },
        });
      },
      goToScanQR() {
        console.log('tapped button "go to scanQR"');
        this.$navigateTo(ScanQR, {
          transitionAndroid: { name: 'slide' },
        });
      },
      goToBioAuth() {
        console.log('tapped button "go to scanQR"');
        this.$navigateTo(BioAuth, {
          transitionAndroid: { name: 'slide' },
        });
      },
      showModal() {
        console.log('tapped button "show modal"');
        this.$showModal(Modal, {
          animated: true,
          stretched: true,
          props: { from: 'Home' },
        });
      },
      showModalFullScreen() {
        console.log('tapped button "show modal"');
        this.$showModal(Modal, {
          fullscreen: true,
          animated: true,
          stretched: true,
          props: { from: 'Home' },
        });
      },
      onSwipe(args) {
        // 1: 左から右, 2: 右から左, 4: 下から上, 8: 上から下
        let direction;
        switch (args.direction) {
          case 1:
            direction = 'left to right';
            break;

          case 2:
            direction = 'right to left';
            break;

          case 4:
            direction = 'down to up';
            break;

          case 8:
            direction = 'up to down';
            break;
        }
        console.log(`onSwipe, direction: ${direction}(${args.direction})`);
      },
      takeOrSelectPhoto() {
        action("Take or Select a Photo", "Cancel", ["Take a photo", "Select from library"])
          .then(result => {
            switch (result) {
              case "Take a photo":
                this.takePhoto();
                break;

              case "Select from library":
                this.selectPhoto();
                break;

              default:
                break;
            }
          });
      },
      takePhoto() {
        // 権限の要求
        camera.requestPermissions().then(
          () => {
            console.log('Permitted');
            camera.takePicture({
              keepAspectRatio: true,
              saveToGallery: false,
              allowsEditing: true,
              cameraFacing: 'rear',
            }).then(imageAsset => {
                console.log({imageAsset});
                this.image = imageAsset;
              })
              .catch(err => console.error({err}));
          },
          () => {
            console.log('Denied');
            alert({
              title: 'カメラ利用',
              message: 'カメラを利用するには「設定」→「プライバシー」から「写真」と「カメラ」の利用を許可してください',
              okButtonText: 'OK',
            })
          },
        );
      },
      selectPhoto() {
        const context = imagepicker.create({ mode: 'single' });
        context.authorize()
          .then(() => context.present())
          .then(selection => this.image = selection[0])
          .catch(err => console.error({err}));
      },
    },
  }
</script>

<style scoped>
    Label {
        vertical-align: center;
        text-align: center;
    }

    ActionBar {
        background-color: #53ba82;
        color: #ffffff;
    }

    Button {
        color: #53ba82;
    }
</style>
