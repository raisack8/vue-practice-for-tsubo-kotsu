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
      list:[],
      // エラーの有無
      isError: false,
      // エラーメッセージ
      message: ''
    }
  },
  // ライフサイクルフック(?)
  created(){
    const url = 'http://raisack.hacca.jp/test-vue-elements/target_products.js'
    $.ajax({
      url : url,
      type : 'GET',
      dataType : 'jsonp',
      jsonp: 'callback',
      jsonpCallback: 'products'
    })
    // $ajax()を実行すると、Promiseオブジェクトが返される。
    // .doneとすることでPromiseオブジェクトにコールバック関数を指定している
    // この「.(ドット)」は続いていたのか...[ $ajax().done(※コールバック関数) ]

    // メソッドがオブジェクトを返し、
    // そのオブジェクトを利用して連続的にメソッドを追加することを
    // 「メソッドチェーン」と呼ぶ
    .done(function(data, textStatus, jqXHR){
      console.log('Connecting is succeeded.');
      this.list = data;
    }.bind(this))
    .fail(function(jqXHR, textStatus, errorThrown){
      console.log('Connecting is failed...');
      this.isError = true;
      this.message = '商品リストの読み込みに失敗しました。';
    }.bind(this));
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