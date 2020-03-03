<template>
  <Page>
    <ActionBar :title="title">
      <NavigationButton text="Back" android.systemIcon="ic_menu_back" @tap="back" />
    </ActionBar>
    <BottomNavigation :selectedIndex="selectedIndex" @selectedIndexChanged="onIndexChange">

      <!-- ボトムタブバーの表示内容 -->
      <TabStrip>
        <TabStripItem>
          <Label text="Home"/>
          <Image src="font://&#xf015;"/>
        </TabStripItem>

        <TabStripItem class="special">
          <Label text="Account"/>
          <Image src="font://&#xf007;"/>
        </TabStripItem>

        <!-- Shorthand: title, iconSource で Label, Image を指定したのと同じ結果になる -->
        <TabStripItem title="Search" iconSource="font://&#xf00e;"/>
      </TabStrip>

      <!-- タブごとのコンテンツ -->
      <TabContentItem>
        <FirstTab />
      </TabContentItem>
      <TabContentItem>
        <SecondTab />
      </TabContentItem>
      <TabContentItem>
        <ThirdTab />
      </TabContentItem>

    </BottomNavigation>
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
        console.log({args});
        this.selectedIndex = args.newIndex;
        this.title = `Tab sample - ${this.selectedIndex + 1}`;
      },
    },
  }
</script>

<style scoped></style>
