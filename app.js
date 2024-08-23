// recuperam produsele din localStorage sau initializam lista daca nu exista; array pentru stocarea produselor
let products = JSON.parse(localStorage.getItem('products')) || [];

// functie pentru salvarea produselor in localStorage
function saveProducts() {
    localStorage.setItem('products', JSON.stringify(products));
}

// Funcție pentru adăugarea unui produs
function addProduct() {
    const name = document.getElementById('product-name').value;
    const quantity = document.getElementById('product-quantity').value;
    const price = document.getElementById('product-price').value;
   

    if (name && quantity > 0 && price >= 0 ) {
        // Adăugăm produsul la listă cu pret inclus
        products.push({ name, quantity: parseInt(quantity), price: parseFloat(price) });
        document.getElementById('product-name').value = '';
        document.getElementById('product-quantity').value = '';
        document.getElementById('product-price').value = '';
        saveProducts(); // salvam produsele in localStorage
        renderProducts();
    } else {
        alert('Introduceți un nume valid și o cantitate mai mare decât 0 si un pret valid');
    }
}

// Funcție pentru ștergerea unui produs
function deleteProduct(index) {
    products.splice(index, 1);
    saveProducts(); //salvam produsel in localStorage dupa stergere
    renderProducts();
}

// Funcție pentru actualizarea cantității unui produs
function editProduct(index) {
    const newQuantity = prompt('Introduceți noua cantitate pentru produs:', products[index].quantity);
    const newPrice = prompt('Introduceți noul preț pentru produs:', products[index].price);
    
    if (newQuantity !== null && newQuantity > 0 && newPrice !== null && newPrice >= 0 ) {
        products[index].quantity = parseInt(newQuantity);
        products[index].price = parseFloat(newPrice);
        saveProducts(); // Salvăm produsele în localStorage după actualizare
        renderProducts();
    } else {
        alert('Introduceți o cantitate validă mai mare decât 0 si un pret valid');
    }
}

// functia de sortare dupa pret
function sortProductsByPrice(order) {
    if (order === 'asc') {
        products.sort((a, b) => a.price - b.price);
    } else if (order === 'desc') {
        products.sort((a, b) => b.price - a.price);
    }
    renderProducts(); // Reafișăm lista de produse după sortare
}


// Funcție pentru căutarea produselor după nume
function searchProducts() {
    const searchQuery = document.getElementById('search-input').value.toLowerCase();
    const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchQuery));
    renderProducts(filteredProducts);
}


//functie pentru exportul in pdf
function exportToPDF() {
    const docDefinition = {
        content: [
            { text: 'Raport Stocuri', style: 'header' },
            {
                table: {
                    headerRows: 1,
                    body: [
                        ['Produs', 'Cantitate', 'Preț'],
                        ...products.map(product => [product.name, product.quantity, product.price.toFixed(2)])
                    ]
                }
            }
        ]
    };

    pdfMake.createPdf(docDefinition).download('raport_stocuri.pdf');
}

// Funcție pentru actualizarea listei de produse pe ecran
function renderProducts(filteredProducts = products) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    filteredProducts.forEach((product, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.quantity}</td>
            <td>${product.price.toFixed(2)} RON</td>
            <td>
             <button onclick="editProduct(${index})">Editează <i class="fa-solid fa-pen-to-square"></i></button>
                <button onclick="deleteProduct(${index})">Șterge <i class="fa-solid fa-trash"></i></button>
            </td>
        `;
        productList.appendChild(row);
    });
}

// Inițializăm aplicația cu produsele din localStorage 
renderProducts();
