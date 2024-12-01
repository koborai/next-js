//kata kata hari ini
const quotes = [
      "Jangan banyak drama, fokus ke tujuan. Paham 🖐🏻",
      "Hidup ini santai saja, asal tetap ada usaha. Paham 🖐🏻",
      "Jangan lupa bahagia, masalah bisa diselesaikan nanti. Paham 🖐🏻",
      "Kalau ada yang bilang kamu nggak bisa, buktikan saja. Paham 🖐🏻",
      "Rejeki itu nggak kemana, asal usaha jalan terus. Paham 🖐🏻"
];

function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    document.getElementById('quote').textContent = quotes[randomIndex];
}

// Show a random quote on page load
showRandomQuote();