<script lang="ts" context="module">
	/**
	 * Interface representing a court sentence/decision
	 */
	export interface Sentenza {
		position_index: number;
		content: string;
		number: string;
		dep_date: string;
		description: string;
		url: string;
		massima: string;
		keywords: string;
	}

	/**
	 * Interface representing a legal norm/article
	 */
	export interface Norma {
		id: number;
		codice: string;
		articolo: string;
		content: string;
		libro: string;
		url: string;
		rubrica: string;
		active: boolean;
		note: string;
		spiegazione: string;
		massime: string;
	}

	/**
	 * Mapping of code identifiers to their full names
	 */
	export const decodeCodici: Record<string, string> = {
		cp: 'Codice Penale',
		cc: 'Codice Civile',
		cpp: 'Codice di procedura Penale',
		cpc: 'Codice di Procedura Civile'
	};
</script>
