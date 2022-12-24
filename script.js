//NOTE - Targeting the elements we gonna need
const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

const showLoadingSpinner = () => {
	loader.hidden = false;
	quoteContainer.hidden = true;
};

const removeLoadingSpinner = () => {
	loader.hidden = true;
	quoteContainer.hidden = false;
};

//NOTE - getting quotes from APi
const getQuotes = async () => {
	showLoadingSpinner();
	const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
	try {
		const response = await fetch(apiUrl);
		apiQuotes = await response.json();
		newQuote();
	} catch (error) {
		alert("ops... Something went wrong, try again later");
	}
};

//NOTE - show New Quote - called on event listener
const newQuote = () => {
	showLoadingSpinner();
	//pick a ramdom quote from api
	const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
	!quote.author
		? (authorText.textContent = "Unknown")
		: (authorText.textContent = quote.author);
	//check quote lenght for styling
	quote.text.length > 120
		? quoteText.classList.add("long-quote")
		: quoteText.classList.remove("long-quote");
	//NOTE - set Quote / Hide Loader
	quoteText.textContent = quote.text;
	removeLoadingSpinner();
};

//NOTE - Tweet Quote - called on event listener
const tweetQuote = () => {
	const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
	window.open(twitterUrl, "_blank");
};

//NOTE - Event Listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

//NOTE - On load
getQuotes();
