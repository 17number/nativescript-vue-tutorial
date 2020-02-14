<template>
    <Page @swipe="onSwipe">
        <ActionBar title="Home"/>
        <StackLayout>
            <Button text="Go to HelloWorld" @tap="goToHelloWorld" />
            <Button text="Show modal" @tap="showModal" />
            <Button text="Show modal(Full Screen)" @tap="showModalFullScreen" />
        </StackLayout>
    </Page>
</template>

<script >
  import HelloWorld from '@/pages/HelloWorld'
  import Modal from '@/pages/Modal'
  export default {
    name: 'home',
    methods: {
      goToHelloWorld() {
        console.log('tapped button "go to helloworld"');
        this.$navigateTo(HelloWorld, {
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
    },
  }
</script>

<style scoped>
    ActionBar {
        background-color: #53ba82;
        color: #ffffff;
    }

    Button {
        color: #53ba82;
    }
</style>
