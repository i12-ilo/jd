<template>
  <div class="wrapper">
     <div class="search">
      <div
        class="search__back iconfont"
        @click="handleBackClick"
      >&#xe6f2;</div>
       <div class="search__content">
         <span class="search__content__icon iconfont">&#xe62d;</span>
         <input
          class="search__content__input"
          placeholder="请输入商品名称"
        />
       </div>
    </div>
    <shop-info v-show="item.imgUrl" :item="item" :hideBorder="true"></shop-info>
    <Content/>
    <Cart/>
  </div>
</template>

<script>
import { useRouter, useRoute } from 'vue-router'
import { get } from '../../util/request'
import ShopInfo from '../../components/ShopInfo.vue'
import { reactive, toRefs } from 'vue'
import Content from './Content'
import Cart from './Cart'

// 获取当前商铺信息
const useShopInfoEffect = () => {
  const route = useRoute()
  console.log(route)
  const data = reactive({ item: {} })
  const getItemData = async () => {
    const result = await get(`/api/shop/${route.params.id}`)
    if (result?.errno === 0 && result?.data) {
      data.item = result.data
    }
  }
  const { item } = toRefs(data)
  return { item, getItemData }
}

// 点击回退逻辑
const useBackRouterEffect = () => {
  const router = useRouter()
  const handleBackClick = () => {
    router.back()
  }
  return handleBackClick
}

export default {
  name: 'Shop',
  components: { ShopInfo, Content, Cart },
  setup () {
    const { item, getItemData } = useShopInfoEffect()
    const handleBackClick = useBackRouterEffect()
    getItemData()
    return { item, handleBackClick }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 0 .18rem;
}
.search {
  display: flex;
  margin: .2rem 0 .16rem 0;
  line-height: .32rem;
  &__back {
    width: .3rem;
    font-size: .24rem;
    color: #B6B6B6;
  }
  &__content {
    display: flex;
    flex: 1;
    background: #F5F5F5;
    border-radius: .16rem;
    &__icon {
      width: .44rem;
      text-align: center;
      color: #B7B7B7;
    }
    &__input {
      display: block;
      width: 100%;
      padding-right: .2rem;
      border: none;
      outline: none;
      background: none;
      height: .32rem;
      font-size: .14rem;
      color: #333;
      &::placeholder {
        color: #333;
      }
    }
  }
}
</style>
