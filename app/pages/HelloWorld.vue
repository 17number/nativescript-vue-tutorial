<template>
    <Page>
        <ActionBar title="Hello world!"/>
        <StackLayout>
            <Button text="Go to home" @tap="goToHome" />
            <Button text="Show modal" @tap="showModal" />
            <Button text="Show modal(Full Screen)" @tap="showModalFullScreen" />
        </StackLayout>
    </Page>
</template>

<script >
  import home from '@/components/App'
  import Modal from '@/pages/Modal'
  export default {
    name: 'HelloWolrd',
    methods: {
      goToHome() {
        console.log('tapped button "go to home"');
        this.$navigateTo(home, {
          transitionAndroid: { name: 'slide' },
        });
      },
      showModal() {
        console.log('tapped button "show modal"');
        this.$showModal(Modal, {
          animated: true,
          stretched: true,
          props: { from: 'HelloWorld' },
        });
      },
      showModalFullScreen() {
        console.log('tapped button "show modal"');
        this.$showModal(Modal, {
          fullscreen: true,
          animated: true,
          stretched: true,
          props: { from: 'HelloWorld' },
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
