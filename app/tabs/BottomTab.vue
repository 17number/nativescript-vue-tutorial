<template>
  <Page>
    <ActionBar :title="title">
      <NavigationButton text="Back" android.systemIcon="ic_menu_back" @tap="back"/>
    </ActionBar>
    <TabView :selectedIndex="selectedIndex" @selectedIndexChange="onIndexChange" androidTabsPosition="bottom">
      <TabViewItem title="Tab 1">
        <FirstTab/>
      </TabViewItem>
      <TabViewItem title="Tab 2">
        <SecondTab/>
      </TabViewItem>
      <TabViewItem title="Tab 3">
        <ThirdTab/>
      </TabViewItem>
    </TabView>
  </Page>
</template>

<script >
  import FirstTab from '@/tabs/FirstTab.vue'
  import SecondTab from '@/tabs/SecondTab.vue'
  import ThirdTab from '@/tabs/ThirdTab.vue'

  export default {
    components: {
      FirstTab,
      SecondTab,
      ThirdTab,
    },
    data() {
      return {
        selectedIndex: 0,
        title: 'Tab sample',
      };
    },
    methods: {
      back() {
        this.$navigateBack({
          transitionAndroid: { name: 'slide '},
        });
      },
      onIndexChange(args) {
        this.selectedIndex = args.value;
        this.title = `Tab sample - ${this.selectedIndex + 1}`;
      },
    },
  }
</script>

<style scoped></style>
