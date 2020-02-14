<template>
    <Page>
        <ActionBar title="Hello world!"/>
        <StackLayout>
            <Button text="Go to home" @tap="goToHome" />
        </StackLayout>
    </Page>
</template>

<script >
  import home from '@/components/App'
  export default {
    name: 'HelloWolrd',
    methods: {
      goToHome() {
        console.log('tapped button "go to home"');
        this.$navigateTo(home);
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
