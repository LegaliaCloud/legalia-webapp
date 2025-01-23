<script>
    let formData = {
        nome: '',
        cognome: '',
        email: '',
        professione: ''
    };

    async function handleSubmit() {
        try {
            const response = await fetch('/api/salva-dati', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert('Dati salvati con successo!');
            } else {
                alert('Errore nel salvataggio' + response.status);
            }
        } catch (error) {
            console.error('Errore:', error);
        }
    }
</script>

<button class="btn bg-purple-950 text-white mt-4" onclick="my_modal_3.showModal()">Diventa beta tester</button>
<dialog id="my_modal_3" class="modal">
  <div class="modal-box bg-white">
    <form method="dialog">
      <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
    <h3 class="text-lg font-bold mt-4">Compila il form e ti contatteremo per diventare beta tester!</h3>
    <form on:submit|preventDefault={handleSubmit} method="dialog">
        <label class="input input-bordered flex items-center gap-2 bg-neutral-200 my-2">
            Nome
            <input bind:value={formData.nome} type="text" class="grow bg-neutral-200" placeholder="Mario" required/>
        </label>
        <label class="input input-bordered flex items-center gap-2 bg-neutral-200 my-2">
            Cognome
            <input bind:value={formData.cognome} type="text" class="grow bg-neutral-200" placeholder="Rossi" required/>
        </label>
        <label class="input input-bordered flex items-center gap-2 bg-neutral-200 my-2">
            Email
            <input bind:value={formData.email} type="email" class="grow bg-neutral-200" placeholder="mariorossi@mail.com" required/>
        </label>
        <label class="input input-bordered flex items-center gap-2 bg-neutral-200 my-2">
            Professione
            <input bind:value={formData.professione} type="text" class="grow bg-neutral-200" placeholder="Avvocato" required/>
        </label>
        <input type="submit" class="btn bg-purple-950 text-white mt-4">
    </form>
  </div>
</dialog>