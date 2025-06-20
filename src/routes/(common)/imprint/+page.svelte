<svelte:head>
	<title>Imprint</title>
</svelte:head>

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
			E-Mail: <a href="mailto:sebi.ederer@gmx.de">dev.sebastian.ederer@gmail.com</a><br />
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
		padding: 2.5em 1.25em;
		background-color: #f9f9f9;
		flex: 1;
	}

	.wrapper {
		text-align: left;
		width: min(100%, 48em);
		padding: 1.875em;
		background-color: #fff;
		border-radius: 0.5em;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	h1 {
		font-size: 2.5em;
		margin-bottom: 1.25em;
		color: #2c3e50;
	}

	h2 {
		font-size: 1.8em;
		margin-top: 1.875em;
		margin-bottom: 0.9375em;
		color: #2c3e50;
	}

	p {
		line-height: 1.6;
		margin-bottom: 0.9375em;
		color: #2c3e50;
	}

	.owner-info {
		white-space: pre-line;
	}

	.contact-info a {
		color: #2c3e50;
		text-decoration: none;
	}

	.contact-info a:hover {
		text-decoration: underline;
	}

	.eu-dispute-resolution a {
		color: #2c3e50;
		text-decoration: none;
	}

	.eu-dispute-resolution a:hover {
		text-decoration: underline;
	}

	section {
		margin-top: 1.625em;
	}
</style>
