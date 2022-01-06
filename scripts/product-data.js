const ALREADY_LIKED_BY_ME = 'style-scope ytd-comment-action-buttons-renderer style-text size-default';
const LIKED = 'style-scope ytd-comment-action-buttons-renderer style-default-active size-default';

async function coverArticles() {
  let products = [...document.querySelectorAll("li.s-item:not([articleCovered])")];
  products = products.slice(0, 15);


  if (products.length) {
    clearInterval(interval);
    products?.forEach(async (uncoveredArticle, index) => {
      setTimeout(async () => {
        const id = uncoveredArticle?.querySelector('a').href;
        if (!id.includes('01920391')) {
          const getData = await fetch(id);
          const response = await getData.text();
          const domParser = new DOMParser();
          const doc = domParser.parseFromString(response, 'text/html');
          const sellerSection = doc.querySelector('div[data-testid="ux-seller-section__item--seller"]');
          const sellerName = sellerSection.querySelectorAll('a')[0]?.querySelector('span')?.innerText;
          const feedBackNumbers = sellerSection.querySelectorAll('a')[1]?.querySelector('span')?.innerText;
          const itemCondition = doc.querySelector('div[itemprop="itemCondition"]')?.innerText;
          const stock = doc.querySelector('span[id="qtySubTxt"]')?.innerText.replaceAll("[\\n\\r\\t]+", "");
          const detailsGrid = uncoveredArticle.querySelector("div.s-item__details");

          if (stock) {
            const stockDiv = document.createElement('div');
            stockDiv.className = 's-item__detail s-item__detail--secondary';
            stockDiv.innerHTML = `<strong><span>Stock: </span></strong><span>${stock}</span>`;
            detailsGrid.insertBefore(stockDiv, detailsGrid.firstChild);
          }
          const conditionDiv = document.createElement('div');
          conditionDiv.className = 's-item__detail s-item__detail--secondary';
          conditionDiv.innerHTML = `<strong><span>Condition: </span></strong><span>${itemCondition}</span>`;
          detailsGrid.insertBefore(conditionDiv, detailsGrid.firstChild);

          const feedBackNumbersDiv = document.createElement('div');
          feedBackNumbersDiv.className = 's-item__detail s-item__detail--secondary';
          feedBackNumbersDiv.innerHTML = `<strong><span>Feedback Count: </span></strong><span>${feedBackNumbers}</span>`;
          detailsGrid.insertBefore(feedBackNumbersDiv, detailsGrid.firstChild);


          const sellerDiv = document.createElement('div');
          sellerDiv.className = 's-item__detail s-item__detail--secondary';
          sellerDiv.innerHTML = `<strong><span>Seller Name: </span></strong><span>${sellerName}</span>`;
          detailsGrid.insertBefore(sellerDiv, detailsGrid.firstChild);
          
        }
  
      }, (index+1)*1000);
      uncoveredArticle.setAttribute('articleCovered', true)

    });
  }
}
const interval = setInterval(coverArticles, 1000);


  //[...document.querySelectorAll("[id='comment']")][0].querySelector("[id='like-button']").click()
  //[...document.querySelectorAll("[id='comment']")][0].querySelector("[id='reply-button-end']").querySelector("[role='button']").click()

