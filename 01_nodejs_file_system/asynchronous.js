// asynchronous js
alert();
async function getProducts() {
  const blob = await fetch(`https://dummyjson.com/products`);
  const data = await blob.json();
  console.log(data);
}

// getProducts();

// with try and catch

async function logProducts() {
  try {
    const response = await fetch(`https://dummyjson.com/products`);
    if (!response.ok) {
      throw new Error("not fetched");
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// logProducts();
