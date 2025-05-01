<script>
	let formData = {
		nome: '',
		cognome: '',
		email: '',
		professione: '',
		ordine: "Non sono iscritto all'ordine"
	};

	let listaOrdini = [
		'ACQUI TERME',
		'AGRIGENTO',
		'ALBA',
		'ALESSANDRIA',
		'ANCONA',
		'AOSTA',
		'AREZZO',
		'ARIANO IRPINO',
		'ASCOLI PICENO',
		'ASTI',
		'AVELLINO',
		'AVEZZANO',
		'BARCELLONA POZZO DI GOTTO',
		'BARI',
		'BASSANO DEL GRAPPA',
		'BELLUNO',
		'BENEVENTO',
		'BERGAMO',
		'BIELLA',
		'BOLOGNA',
		'BOLZANO',
		'BRESCIA',
		'BRINDISI',
		'BUSTO ARSIZIO',
		'CAGLIARI',
		'CALTAGIRONE',
		'CALTANISSETTA',
		'CAMERINO',
		'CAMPOBASSO',
		'CASALE MONFERRATO',
		'CASSINO',
		'CASTROVILLARI',
		'CATANIA',
		'CATANZARO',
		'CHIAVARI',
		'CHIETI',
		'CIVITAVECCHIA',
		'COMO',
		'COSENZA',
		'CREMA',
		'CREMONA',
		'CROTONE',
		'CUNEO',
		'ENNA',
		'FERMO',
		'FERRARA',
		'FIRENZE',
		'FOGGIA',
		"FORLI'",
		'FROSINONE',
		'GELA',
		'GENOVA',
		'GORIZIA',
		'GROSSETO',
		'IMPERIA',
		'ISERNIA',
		'IVREA',
		"L'AQUILA",
		'LA SPEZIA',
		'LAGONEGRO',
		'LAMEZIA TERME',
		'LANCIANO',
		'LANUSEI',
		'LARINO',
		'LATINA',
		'LECCE',
		'LECCO',
		'LIVORNO',
		'LOCRI',
		'LODI',
		'LUCCA',
		'LUCERA',
		'MACERATA',
		'MANTOVA',
		'MARSALA',
		'MASSACARRARA',
		'MATERA',
		'MELFI',
		'MESSINA',
		'MILANO',
		'MISTRETTA',
		'MODENA',
		'MODICA',
		"MONDOVI'",
		'MONTEPULCIANO',
		'MONZA',
		'NAPOLI',
		'NAPOLI NORD',
		'NICOSIA',
		'NOCERA INFERIORE',
		'NOLA',
		'NOVARA',
		'NUORO',
		'ORISTANO',
		'ORVIETO',
		'PADOVA',
		'PALERMO',
		'PALMI',
		'PAOLA',
		'PARMA',
		'PATTI',
		'PAVIA',
		'PERUGIA',
		'PESARO',
		'PESCARA',
		'PIACENZA',
		'PINEROLO',
		'PISA',
		'PISTOIA',
		'PORDENONE',
		'POTENZA',
		'PRATO',
		'RAGUSA',
		'RAVENNA',
		'REGGIO CALABRIA',
		'REGGIO EMILIA',
		'RIETI',
		'RIMINI',
		'ROMA',
		'ROSSANO',
		'ROVERETO',
		'ROVIGO',
		'S. ANGELO DEI LOMBARDI',
		'SALA CONSILINA',
		'SALERNO',
		'SALUZZO',
		'SANREMO',
		'SANTA MARIA CAPUA VETERE',
		'SASSARI',
		'SAVONA',
		'SCIACCA',
		'SIENA',
		'SIRACUSA',
		'SONDRIO',
		'SPOLETO',
		'SULMONA',
		'TARANTO',
		'TEMPIO PAUSANIA',
		'TERAMO',
		'TERMINI IMERESE',
		'TERNI',
		'TIVOLI',
		'TOLMEZZO',
		'TORINO',
		'TORRE ANNUNZIATA',
		'TORTONA',
		'TRANI',
		'TRAPANI',
		'TRENTO',
		'TREVISO',
		'TRIESTE',
		'UDINE',
		'URBINO',
		'VALLO DELLA LUCANIA',
		'VARESE',
		'VASTO',
		'VELLETRI',
		'VENEZIA',
		'VERBANIA',
		'VERCELLI',
		'VERONA',
		'VIBO VALENTIA',
		'VICENZA',
		'VIGEVANO',
		'VITERBO',
		'VOGHERA'
	];

	/**
	 * @type {HTMLDialogElement}
	 */
	let modelElement;

	async function handleSubmit() {
		let values = Object.values(formData);
		let correctData = true;
		for (let value of values) {
			if (value == '') {
				correctData = false;
				break;
			}
		}
		if (correctData) {
			try {
				const response = await fetch('/api/salva-dati', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(formData)
				});

				if (response.ok) {
					alert('Dati inviati con successo! Ti contatteremo.');
				} else {
					alert("Errore nell'invio dei dati: " + response.status);
				}
			} catch (error) {
				console.error('Errore:', error);
				alert("Errore nell'invio dei dati: " + error);
			}
		} else {
			alert('Compilare tutti i campi richiesti!');
		}
	}
</script>

<button class="btn mt-4 bg-purple-950 text-white" on:click={() => modelElement.showModal()}
	>Diventa beta tester</button
>
<dialog bind:this={modelElement} class="modal">
	<div class="modal-box bg-white text-black">
		<form method="dialog">
			<button class="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">✕</button>
		</form>
		<h3 class="mt-4 text-lg font-bold">
			Compila il form e ti contatteremo per diventare beta tester!
		</h3>
		<form on:submit|preventDefault={handleSubmit} method="dialog">
			<label class="input input-bordered my-2 flex items-center gap-2 bg-neutral-200">
				Nome
				<input
					bind:value={formData.nome}
					type="text"
					class="grow bg-neutral-200"
					placeholder="Mario"
					required
				/>
			</label>
			<label class="input input-bordered my-2 flex items-center gap-2 bg-neutral-200">
				Cognome
				<input
					bind:value={formData.cognome}
					type="text"
					class="grow bg-neutral-200"
					placeholder="Rossi"
					required
				/>
			</label>
			<label class="input input-bordered my-2 flex items-center gap-2 bg-neutral-200">
				Email
				<input
					bind:value={formData.email}
					type="email"
					class="grow bg-neutral-200"
					placeholder="mariorossi@mail.com"
					required
				/>
			</label>
			<label class="input input-bordered my-2 flex items-center gap-2 bg-neutral-200">
				Professione
				<input
					bind:value={formData.professione}
					type="text"
					class="grow bg-neutral-200"
					placeholder="Avvocato"
					required
				/>
			</label>
			<label class="input input-bordered my-2 flex items-center gap-2 bg-neutral-200">
				Ordine
				<select class="w-full bg-neutral-200" name="Ordine" bind:value={formData.ordine}>
					<option value="Non sono iscritto all'ordine" selected>Non sono iscritto all'ordine</option
					>
					{#each listaOrdini as ordine}
						<option value={ordine}>{ordine}</option>
					{/each}
				</select>
			</label>
			<input type="submit" class="btn mt-4 bg-purple-950 text-white" />
		</form>
	</div>
</dialog>
