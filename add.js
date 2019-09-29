var db = firebase.firestore();

function addQuote() {
	event.preventDefault();
	
	let timestamp = firebase.firestore.Timestamp.fromMillis(Date.now());
	let quotee = document.getElementById("form-quotee").value;
	let quote = document.getElementById("form-quote").value;

	db.collection("quotes").add({
		quotee: quotee,
		quote: quote,
		timestamp: timestamp,
		flagged: false
	})
	.then(function() {
		window.location.href = "./index.html";
	})
	.catch(function() {
		return false;
	});
}

//document.getElementById("add-form").addEventListener("submit", addQuote);