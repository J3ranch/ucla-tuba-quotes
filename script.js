var db = firebase.firestore();

/*
db.collection("quotes").orderBy("timestamp").get()
	.then(function (querySnapshot) {
		querySnapshot.forEach(function (doc) {
			// console.log(doc.data());
			document.getElementById("container-quote-list").prepend(createQuote(doc));
		})
	});
//*/

///*
db.collection("quotes").orderBy("timestamp")
	.onSnapshot(function (querySnapshot) {
		let quotelist = document.getElementById("container-quote-list");
		let i = quotelist.childNodes.length - 1;
		querySnapshot.forEach(function (doc) {
			while (i >= 0 && quotelist.childNodes[i].getAttribute("data-docid") != doc.id) {
				quotelist.childNodes[i].style.display = "none";
				i--;
			}

			if (i < 0)
				document.getElementById("container-quote-list").prepend(createQuote(doc));
			else if (doc.data().flagged)
				quotelist.childNodes[i].style.display = "none";
			else if (!doc.data().flagged)
				quotelist.childNodes[i].style.display = "";

			i--;
		})

		while (i >= 0)
			quotelist.childNodes[i--].style.display = "none";
	});
//*/


function createQuote(doc) {
	// Retrieve document data if possible
	let data;
	if (doc != null)
		data = doc.data();
	else
		return document.createElement("div");

	// Create quote element
	let quote = document.createElement("div");

	// Check if quote is flagged as spam
	if (doc.data().flagged)
		quote.style.display = "none";

	// Set quote attributes (class, DocID)
	quote.setAttribute("class", "quote-single");
	quote.setAttribute("data-docid", doc.id);

	// Create quote body
	quote.innerHTML = 
	`
	<div class="quote-pfp">
		<div class="tuba">
			<img class="tuba-pic" src="https://firebasestorage.googleapis.com/v0/b/ucla-tuba-quotes.appspot.com/o/tuba.png?alt=media&token=441b540a-66aa-40a6-b0a6-64194bf00755">
		</div>
	</div>
	<div class="quote-info">
		<div class="quote-header">
			<h2 class="quotee">
				${data.quotee}
			</h2>
			<h3 class="quote-said">
				said
			</h3>
		</div>
		<div class="quote-text">
			<div class="quote-mark-left">
				<div class="quote-mark-single">
					<div class="quote-mark-body-left">
					</div>
					<div class="quote-mark-tail-left">
					</div>
				</div>
				<div class="quote-mark-single">
					<div class="quote-mark-body-left">
					</div>
					<div class="quote-mark-tail-left">
					</div>
				</div>
			</div>

		<p class="quote">
			${data.quote.replace("\n", "<br/>")}
		</p>

			<div class="quote-mark-right">
				<div class="quote-mark-single">
					<div class="quote-mark-body-right">
					</div>
					<div class="quote-mark-tail-right">
					</div>
				</div>
				<div class="quote-mark-single">
					<div class="quote-mark-body-right">
					</div>
					<div class="quote-mark-tail-right">
					</div>
				</div>
			</div>
		</div>
		<div class="container-actions">
			<div class="flag-button" onclick="flagQuote(this)">
			    <i class="fas fa-flag"></i>
				FLAG
			</div>
			<div class="edit-button" onclick="window.location.href = './edit.html?id=${doc.id}'">
				<i class="fas fa-pencil-alt"></i>
				EDIT
			</div>
		</div>
	</div>
	`;

	// Return assembled quote element
	return quote;
}

function flagQuote(element) {
	// Retrieve encapsulating quote element and DocID
	let quote = element.closest(".quote-single");
	let docid = quote.getAttribute("data-docid");

	// Flag quote as spam and hide clientside
	db.collection("quotes").doc(docid).set({
		flagged: true
	}, {merge: true});
	quote.style.display = "none";
}

/*
for (let i = 0; i < 10; i++)
	document.getElementById("container-quote-list").appendChild(createQuote());
//*/