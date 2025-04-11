<div class="imprint">
	<div class="wrapper">
		<h1>Imprint</h1>

		<p class="owner-info">
			Sebastian Ederer<br />
			Galgenbergstraße 11a<br />
			93053 Regensburg<br />
		</p>

		<p class="contact-info">
			Phone: <a href="tel:+4915161115905">(+49) 15161115905</a><br />
			E-Mail: <a href="mailto:sebi.ederer@gmx.de">sebi.ederer@gmx.de</a><br />
		</p>

		<section class="eu-dispute-resolution">
			<h2>EU Dispute Resolution</h2>
			<p>
				The European Commission provides a platform for online dispute resolution (ODR):
				<a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer"
					>https://ec.europa.eu/consumers/odr/</a
				>. Our e-mail address can be found above in the imprint.
			</p>
		</section>

		<section class="consumer-dispute-resolution">
			<h2>Consumer Dispute Resolution</h2>
			<p>
				We are neither willing nor obliged to participate in dispute resolution proceedings before a
				consumer arbitration board.
			</p>
		</section>
	</div>
</div>

<style lang="scss">
	.imprint {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 40px 20px; /* Increased padding for better spacing */
		background-color: #f9f9f9; /* Light background for better readability */
		flex: 1;
	}

	.wrapper {
		text-align: left;
		width: min(100%, 768px);
		padding: 30px; /* Padding inside the wrapper */
		background-color: #fff; /* White background for content area */
		border-radius: 8px; /* Slightly rounded corners */
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Subtle shadow */
	}

	h1 {
		font-size: 2.5em;
		margin-bottom: 20px;
		color: #333; /* Darker heading text */
	}

	h2 {
		font-size: 1.8em;
		margin-top: 30px;
		margin-bottom: 15px;
		color: #555; /* Slightly lighter heading text */
	}

	p {
		line-height: 1.6;
		margin-bottom: 15px;
		color: #666; /* Standard text color */
	}

	.owner-info {
		white-space: pre-line; /* Preserve line breaks */
	}

	.contact-info a {
		color: #007bff; /* Link color */
		text-decoration: none;
	}

	.contact-info a:hover {
		text-decoration: underline;
	}

	.eu-dispute-resolution a {
		color: #007bff;
		text-decoration: none;
	}

	.eu-dispute-resolution a:hover {
		text-decoration: underline;
	}

	section {
		margin-top: 25px;
	}
</style>
