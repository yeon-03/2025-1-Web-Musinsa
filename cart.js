// const products = {
//   1: {
//     id: 1,
//     brand: "아디다스",
//     name: "울트라부스트 5 1E1111",
//     price: 125400,
//     img: ["https://image.msscdn.net/thumbnails/images/goods_img/20241105/4590231/4590231_17307985521556_500.jpg?w=390"]
//   },
//   2: {
//     id: 2,
//     brand: "푸마",
//     name: "포에버런 나이트로 2",
//     price: 112000,
//     img: ["https://image.msscdn.net/thumbnails/images/goods_img/20250304/4851555/4851555_17412526134413_500.jpg?w=390"]
//   },
//   3: {
//     id: 3,
//     brand: "리복",
//     name: "플로트라이드 에너지 X",
//     price: 99000,
//     img: ["https://image.msscdn.net/thumbnails/images/goods_img/20231113/3707001/3707001_17096161552089_500.jpg?w=390"]
//   }
// };

// if (!localStorage.getItem('product')) {
//   localStorage.setItem('product', JSON.stringify(products));
// }

function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

function update(total, count) {
  document.getElementById('sum-product').innerText = `${total.toLocaleString()}원`;
  document.getElementById('sum-total').innerText = `${total.toLocaleString()}원`;
  document.getElementById('total-count').innerText = String(count);
}

function goto(id) {
  window.location.href = 'product.html?id=' + id
}

function renderCart() {
  const wrapper = document.querySelector('.cart-wrapper');
  const cart = getCart();
  const cartHeaderTabs = document.getElementById('cart-header-tabs');
  const itemsEl = document.getElementById('cart-list');
  const sumEl = document.querySelector('.summary');

  if (cart.length === 0) {
    if (cartHeaderTabs) cartHeaderTabs.style.display = 'none';
    wrapper.classList.add('empty');
    let innerHTML = `
      <div class="cart-no-result-empty">
        <div class="cart-no-result-text">
          <strong class="cart-no-result__title">장바구니에 담은 상품이 없습니다.</strong>`
    if (localStorage.getItem('login') != 'true') {
      innerHTML += `<button class="cart-no-result__button" onclick="location.href='login.html?src=cart.html'">
            로그인하러 가기
          </button>`
    }
    innerHTML += `</div></div>`;
    itemsEl.innerHTML = innerHTML
    if (sumEl) sumEl.style.display = 'none';
    const selectAllBox = document.getElementById('select-all-box');
    if (selectAllBox) selectAllBox.style.display = 'none';
  } else {
    if (cartHeaderTabs) cartHeaderTabs.style.display = '';
    wrapper.classList.remove('empty');
    const selectAllBox = document.getElementById('select-all-box');
    if (selectAllBox) selectAllBox.style.display = '';
    if (sumEl) sumEl.style.display = '';

    itemsEl.innerHTML = '';
    let total = 0, count = 0;

    cart.forEach(item => {
      const prod = pinfo(item.id);
      if (!prod) return;
      total += prod.price * item.quantity;
      count += item.quantity;
      const div = document.createElement('div');
      div.className = 'cart-item';
      div.innerHTML = `
    <input type="checkbox" class="item-check" id='checkbox ${prod.id}' checked />
    <img onclick='goto(${prod.id})' src="${prod.image}" alt="${prod.name}" />
    <div class="cart-info">
      <p onclick='goto(${prod.id})'><strong>${prod.name}</strong></p>
      <p>가격: ${(prod.price * item.quantity).toLocaleString()}원</p>
      <div class="quantity-selector">
        <button onclick="changeQuantity(${item.id}, -1)">-</button>
        <input type="text" value="${item.quantity}" readonly>
        <button onclick="changeQuantity(${item.id}, 1)">+</button>
      </div>
      <button onclick="removeFromCart(${item.id})">삭제</button>
    </div>
  `;

      // 체크박스 감지 연결
      const checkbox = div.querySelector('.item-check');
      checkbox.addEventListener('change', function () {
        if (this.checked) {
          total += prod.price * item.quantity;
          count += item.quantity;
        } else {
          total -= prod.price * item.quantity;
          count -= item.quantity;
        }
        update(total, count);
        if (Array.from(document.querySelectorAll('input[type="checkbox"]')).slice(1).some(e => !e.checked))
          document.getElementById('select-all').checked = false
        else if (Array.from(document.querySelectorAll('input[type="checkbox"]')).slice(1).every(e => e.checked))
          document.getElementById('select-all').checked = true
      });

      itemsEl.appendChild(div);
    });

    update(total, count)
  }
  if (cart.length) document.querySelector('.badge').textContent = cart.length
  else document.querySelector('.badge').style.display = 'none'
  document.getElementById('select-all').checked = true
}

function selectAllCartItems(checkbox) {
  document.querySelectorAll('.item-check').forEach(cb => {
    cb.checked = checkbox.checked;
  });

  if (checkbox.checked) {
    let total = 0, count = 0;
    getCart().forEach(item => {
      const prod = pinfo(item.id);
      if (!prod) return;
      total += prod.price * item.quantity;
      count += item.quantity;
    })
    update(total, count)
  }
  else update(0, 0)
}

function removeSelectedItems() {
  let cart = getCart();
  const selectedIds = Array.from(document.querySelectorAll('.item-check:checked'))
    .map(cb => Number(cb.id.slice(9)));
  cart = cart.filter(item => !selectedIds.includes(+item.id));
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

function changeQuantity(id, delta) {
  const cart = getCart();
  const idx = cart.findIndex(i => i.id == id);
  if (idx < 0) return;
  cart[idx].quantity += delta;
  if (cart[idx].quantity <= 0) {
    if (confirm('정말 삭제하시겠습니까?')) {
      const newCart = getCart().filter(i => i.id != id);
      localStorage.setItem('cart', JSON.stringify(newCart));
      renderCart();
      cart.splice(idx, 1);
    }
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

function removeFromCart(id) {
  if (confirm('정말 삭제하시겠습니까?')) {
    const newCart = getCart().filter(i => i.id != id);
    localStorage.setItem('cart', JSON.stringify(newCart));
    renderCart();
  }
}

document.addEventListener('DOMContentLoaded', () => {

  const recSlider = document.getElementById('recommend-slider');
  const tpl = document.getElementById('recom-template');
  if (recSlider && tpl) {
    const items = tpl.content.querySelectorAll('.slide-item');
    items.forEach(item => {
      const info = pinfo(Object.keys(products[Object.keys(products)[Math.floor(Math.random() * (Object.keys(products).length))]])[Math.floor(Math.random() * 96)])
      const temp = item.cloneNode(true)
      const img = temp.querySelector('img')
      img.src = info.image
      img.alt = info.name
      temp.querySelector('.item-brand').innerText = info.brand
      temp.querySelector('.item-name').innerText = info.name
      temp.querySelector('.item-price').innerText = info.price.toLocaleString() + "원"
      temp.querySelector('.item-name').innerText = info.name
      temp.onclick = function () { window.location.href = 'product.html?id=' + info.id }
      recSlider.appendChild(temp);
    });
  }
  renderCart();
});

let currentX = 0;
const container = document.querySelector('.container');
const content = document.getElementById('recommend-slider');
let isDragging = false;
let dragStarted = false;
let startX;
let preventClick = false;

container.addEventListener('mousedown', (e) => {
  dragStarted = true;
  isDragging = false;
  preventClick = false;
  startX = e.clientX;
  container.style.cursor = 'grabbing';
});

document.addEventListener('mousemove', (e) => {
  if (!dragStarted) return;

  const diffX = e.clientX - startX;

  if (Math.abs(diffX) > 5) {
    isDragging = true;
    preventClick = true;
  }

  if (!isDragging) return;

  let newX = currentX + diffX;

  const containerRect = container.getBoundingClientRect();
  const contentRect = content.getBoundingClientRect();

  const minX = containerRect.width - contentRect.width - 20;
  const maxX = 0;

  if (newX < minX) newX = minX;
  if (newX > maxX) newX = maxX;

  content.style.transform = `translateX(${newX}px)`;

  currentX = newX;
  startX = e.clientX;
});


document.addEventListener('mouseup', (e) => {
  if (dragStarted) {
    const diffX = e.clientX - startX;
    if (isDragging) {
      currentX += diffX;
    }
    dragStarted = false;
    isDragging = false;
    container.style.cursor = 'grab';
  }
});

container.addEventListener('click', (e) => {
  if (preventClick) {
    e.preventDefault();
    e.stopImmediatePropagation();
    preventClick = false;
  }
}, true);

const buy = () => {
  let orders = JSON.parse(localStorage.getItem('orders')) || []
  let cart = getCart()
  const selectedIds = Array.from(document.querySelectorAll('.item-check:checked')).map(cb => Number(cb.id.slice(9)))
  cart.forEach(e => { if (selectedIds.includes(+e.id)) orders.unshift(e.id) })
  localStorage.setItem('orders', JSON.stringify(orders));
  removeSelectedItems()
  alert('구매가 완료되었습니다!');
}