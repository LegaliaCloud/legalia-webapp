import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export async function POST({ request }) {
    try {
        // Leggi i dati dal corpo della richiesta
        const dati = await request.json();
        
        // Definisci il percorso dove salvare il file
        const cartella = join(process.cwd(), 'dati');
        const percorsoFile = join(cartella, `${Date.now()}_dati.json`);

        // Crea la cartella se non esiste
        await mkdir(cartella, { recursive: true });

        // Scrivi il file JSON
        await writeFile(percorsoFile, JSON.stringify(dati, null, 2));

        // Rispondi con successo
        return new Response(JSON.stringify({ messaggio: 'Dati salvati' }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error('Errore nel salvataggio:', error);
        return new Response(JSON.stringify({ errore: 'Salvataggio fallito' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}