const app = document.querySelector('#app');

// チェックボックスのイベントハンドラを登録
const check = app.querySelectorAll('input[type="checkbox"]');
check[0].addEventListener('change', onCheckChanged, false);
check[1].addEventListener('change', onCheckChanged, false);

// セレクトボックスのイベントハンドラを登録
const order  = app.querySelector('.search_order');
order.addEventListener('change', onOrderChanged, false);

// チェック状態変更のイベントハンドラ
function onCheckChanged(event){
  const nodeCount = app.querySelector('.search_count');
  const products = Array.from(app.querySelectorAll('.products'));
  const filteredList = products.filter(function(item){
    console.log("test")
    let show =true;
    if(check[0].checked){
      if(!isSale(item)){
        show = false;
      }
    }
    if(check[1].checked){
      if(!isFreeShipping(item)){
        show = false;
      }
    }

    setDisplay(item, show);

    return show;
  })
  nodeCount.textContent = filteredList.length + '件';
}

// ソート順変更イベントハンドラ
function onOrderChanged(event){
  const nodeList = app.querySelector('.products');
  const products = Array.from(app.querySelector('.product'));
  products.sort(function(a, b){
    if(event.target.value == '1'){
      return parseInt(a.getAttibute('id') - parseInt(b.getAttibute('id')));
    }
    else if(event.target.value == '2'){
      const price1 = parseInt(a.querySelector('product_price span').textContent.replace(',',''));
      const price2 = parseInt(a.querySelector('product_price span').textContent.replace(',',''));
      return price1 - price2
    }
  });
  while(nodeList.firstChild){
    nodeList.removeChild(nodeList.firstChild);
  }
  products.forEach(function(item){
    nodeList.appendChild(item);
  });
}

function isSale(item){
  const node = item.querySelector('.product_status');
  return (node && node.textContent === 'SALE');
}

function isFreeShipping(item){
  const node = item.querySelector('.product_shipping');
  return (node && node.textContent === '送料無料');
}

function setDisplay(node, show){
  if(show){
    node.setAttribute('style', 'display:block;');
  }else{
    node.setAttribute('style', 'display:none;');
  }
}

