<template>
    <Page>
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
