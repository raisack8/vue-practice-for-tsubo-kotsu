const app = Vue.createApp({
  data(){
    return{
      // 検索結果の件数
      const: 0,
      // セール対象のチェック(true:あり,false:無し)
      check1: false,
      // 送料無料のチェック(true:あり,false:無し)
      check2: false,
      // ソート順(0:未選択,1:標準,2:安い順)
      order: 0,
      // 商品リスト
      list:[
        {
          name: 'Michael<br>スマホケース',
          price: 1980,
          image: 'images/01.jpg',
          shipping: 0,
          isSale: true
        },
        {
          name: 'Raphael<br>スマホケース',
          price: 3980,
          image: 'images/02.jpg',
          shipping: 0,
          isSale: true
        },
        {
          name: 'Gabliel<br>スマホケース',
          price: 2980,
          image: 'images/03.jpg',
          shipping: 240,
          isSale: true
        },
        {
          name: 'Uriel<br>スマホケース',
          price: 1580,
          image: 'images/04.jpg',
          shipping: 0,
          isSale: true
        },
        {
          name: 'Ariel<br>スマホケース',
          price: 2580,
          image: 'images/05.jpg',
          shipping: 0,
          isSale: false
        },
        {
          name: 'Azreal<br>スマホケース',
          price: 1280,
          image: 'images/06.jpg',
          shipping: 0,
          isSale: false
        }
      ],
    }
  },
  computed:{
    filteredList(){
      const app = this;
      const filteredList = this.list.filter(function(item){
        let show = true;
        if(app.check1){
          if(!item.isSale){
            show = false;
          }
        }
        if(app.check2){
          if(item.shipping !== 0){
            show = false;
          }
        }
        return show;
      })
      filteredList.sort(function(a,b){
        if(app.order === 1){
          return 0;
        }
        else if(app.order === 2){
          return a.price - b.price;
        }
      });
      return filteredList
    }
  }
})

app.config.globalProperties.$filters = {
  // 数値を通貨書式「#.###.###」に変換するフィルター
  // Flaskでいうテンプレートフィルター
  number_format(val){
    return val.toLocaleString();
  }
}
const vm = app.mount('#app');