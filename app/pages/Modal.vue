<template>
    <Page>
        <ActionBar :title="title"/>
        <StackLayout>
            <Button :text="text" @tap="closeModal" />
        </StackLayout>
    </Page>
</template>

<script >
  export default {
    name: 'Modal',
    props: {
      from: '',
    },
    data() {
      return {
        title: 'This is modal',
        text: 'Close modal',
      }
    },
    methods: {
      closeModal() {
        console.log('tapped button "close modal"');
        this.$modal.close();
      },
    },
    mounted() {
      if (this.from !== '') {
        this.title += ` from ${this.from}`
        this.text += ` from ${this.from}`
      }
    },
  }
</script>

<style scoped>
    ActionBar {
        background-color: #53ba82;
        color: #ffffff;
    }

    .message {
        text-align: center;
        color: #53ba82;
    }
</style>
