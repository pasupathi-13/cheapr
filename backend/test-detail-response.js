const { scrapeProductDetails } = require('./scraper');

async function testDetailResponse() {
  const amazonUrl = 'https://www.amazon.in#';
  const flipkartUrl = 'https://www.flipkart.com/apple-iphone-15-plus-green-256-gb/p/itm9784729def342?pid=MOBGTAGPRSYPVZXR&lid=LSTMOBGTAGPRSYPVZXRROQ2QF';

  console.log("Calling scrapeProductDetails...");
  try {
    const details = await scrapeProductDetails(amazonUrl, flipkartUrl);
    console.log("\nDetails Result:");
    console.log(JSON.stringify(details, null, 2));
  } catch (err) {
    console.error("Error:", err);
  }
}

testDetailResponse();
