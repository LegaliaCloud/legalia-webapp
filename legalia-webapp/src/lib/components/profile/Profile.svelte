<script lang="ts">
	let name: string = 'Paolo';
	let surname: string = 'Rossi';
	let job: string = 'Avvocato';
	let email: string = 'avv.paolorossi@libero.it';
</script>

<div class="grid grid-rows-5 gap-3 pt-6">
	<div class="row-span-2 place-items-center">
		<div class="grid grid-cols-3 gap-1">
			<div class="col-span-1 mx-auto">
				<div class="avatar">
					<div class="w-48 rounded">
						<img
							src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
							alt="Profile"
						/>
					</div>
				</div>
			</div>
			<div class="col-span-1 mx-auto my-auto">
				<button class="btn bg-purple-950 text-white">Modifica foto</button>
			</div>
			<div class="col-span-1 mx-auto my-auto">
				<button class="btn bg-gray-300 text-black hover:bg-gray-400">Elimina foto</button>
			</div>
		</div>
	</div>
	<div class="wrap row-span-1 place-items-center">
		<div class="grid grid-cols-2 gap-8">
			<div class="col-span-1">
				<label class="form-control w-full max-w-xs">
					<div class="label">
						<span class="label-text font-bold text-black">Nome</span>
					</div>
					<input
						type="text"
						placeholder="Type here"
						class="input input-bordered w-full max-w-xs border-black bg-white text-black"
						value={name}
					/>
				</label>
			</div>
			<div class="col-span-1">
				<label class="form-control w-full max-w-xs">
					<div class="label">
						<span class="label-text font-bold text-black">Cognome</span>
					</div>
					<input
						type="text"
						placeholder="Type here"
						class="input input-bordered w-full max-w-xs border-black bg-white text-black"
						value={surname}
					/>
				</label>
			</div>
		</div>
	</div>
	<div class="row-span-1 place-items-center">
		<div class="grid grid-cols-2 gap-8">
			<div class="col-span-1">
				<label class="form-control w-full max-w-xs">
					<div class="label">
						<span class="label-text font-bold text-black">E-mail</span>
					</div>
					<input
						type="text"
						placeholder="Type here"
						class="input input-bordered w-full max-w-xs border-black bg-white"
						value={email}
						disabled
					/>
				</label>
			</div>
			<div class="col-span-1">
				<label class="form-control w-full max-w-xs">
					<div class="label">
						<span class="label-text font-bold text-black">Professione</span>
					</div>
					<input
						type="text"
						placeholder="Type here"
						class="input input-bordered w-full max-w-xs border-black bg-white text-black"
						value={job}
					/>
				</label>
			</div>
		</div>
	</div>
	<div class="row-span-1 mx-auto">
		<button class="btn btn bg-purple-950 text-white">Salva modifiche</button>
	</div>
</div>
