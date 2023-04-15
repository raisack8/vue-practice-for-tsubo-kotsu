// const btnLoad = document.querySelector('#load');
// btnLoad.addEventListener('click',function(event){
//   const xmlHttpRequest = new XMLHttpRequest();
//   // 通信状態の変化を監視するイベントハンドラ
//   xmlHttpRequest.onreadystatechange = function(){
//     // レスポンスの受信が正常に終了したとき、受信したデータをコンソールに出力
//     if(this.readyState === 4 && this.status === 200){
//       console.log(this.readyState, this.response);
//     }
//   };
//   // レスポンスの形式を指定
//   xmlHttpRequest.responseType = 'json';
//   // リクエストメソッドと読み込むファイルパスを背体
//   xmlHttpRequest.open('GET', 'product.json');
//   // リクエストを送信(非同期通信を開始)
//   xmlHttpRequest.send();
// });


// 「コールバック関数」
//　…イベントハンドラのように予め登録しておけば自動的に呼びだされる関数
$('#load').on('click',clickHandler);
function clickHandler(event){
  const url = 'D:\\Download\\sample\\sample\\chapter4\\4-4\\products.js'
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
    console.log('Connecting is succeed.');
    let joinStr = '';
    $('#result').empty();
    data.forEach(element => {
      // console.log(element.name);
      joinStr += element.name + '\n'
    });
    $('#result').append(joinStr)
  })
  .fail(function(jqXHR, textStatus, errorThrown){
    console.log('Connecting is failed...');
  })
}