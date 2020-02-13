#content {
	font-family: var(--econ);
}

h1, h2, h3 {
	margin: 0px;
}

.expand, .reveal {
	max-height: 9999px !important;
}

.category {
	text-align: center;
}

.subcategory {
	text-align: center;
}

.listing {
	overflow: hidden;
	max-height: calc(var(--thumb) * 1.25);
	margin: 5px 0px;
}

.listing h3 {
	
}

.listing+hr {
	margin: 0px auto;
	border: 0px;
	border-bottom: .5px solid rgba(0,0,0,0.25);
	width: 90%;
}

.listingLeft {
	display: inline-block;
	height: calc(var(--thumb) * 1.25);
	width: calc(var(--thumb) * 1.25);
	vertical-align: top;
}

.listingLeft img {
	display: inline-block;
	height: calc(var(--thumb) * 1.25);
	width: calc(var(--thumb) * 1.25);
}

.listingMid {
	display: inline-block;
	width: calc(100% - (var(--thumb) * 2.25) - 20px);
	vertical-align: top;
	padding: 0px 10px 10px 10px;
}

.listingRight {
	display: inline-block;
	height: calc(var(--thumb) * 1.25);
	width: calc(var(--thumb) * 1);
	vertical-align: top;
}

.listingRight>span:nth-child(1) {
	width: 100%;
	height: calc(var(--thumb) * .75);
	line-height: calc(var(--thumb) * .75);
	font-size: calc(var(--thumb) * .5);
	display: block;
	text-align: center;
}

.bulkRates {
	position: relative;
}

.bulkRates>span {
	width: 100%;
	display: block;
	text-align: center;
	font-size: 75%;
}

.bulkRates div {
	max-height: 0px;
	overflow: hidden;
	position: absolute;
	top: calc(var(--thumb) * -0.5);
	width: 100%;
	height: calc(var(--thumb) * 1.25);
	text-align: center;
	background-color: white;
}

.bulkRates div span {
	
}

.keywords {
	font-size: 90%;
}
