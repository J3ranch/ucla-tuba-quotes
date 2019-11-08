var db = firebase.firestore();
var docid = document.location.href.split("=")[1];
loadQuote();

function loadQuote() {
	let quotee = document.getElementById("form-quotee");
	let quote = document.getElementById("form-quote");

	if (typeof docid !== "string") {
		return;
	}

	db.collection("quotes").doc(docid).get()
		.then(function(doc) {
			if (doc.exists) {
				quotee.value = doc.data().quotee;
				quote.value = doc.data().quote;
			}
		});
}

function editQuote() {
	event.preventDefault();
	
	let quotee = document.getElementById("form-quotee").value;
	let quote = document.getElementById("form-quote").value;

	db.collection("quotes").doc(docid).set({
		quotee: quotee,
		quote: quote
	}, {merge: true})
	.then(function() {
		window.location.href = "./index.html";
	})
	.catch(function() {
		return false;
	});
}