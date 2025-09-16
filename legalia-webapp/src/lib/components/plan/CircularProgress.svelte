<script lang="ts">
  export let used: number = 0;
  export let max: number | string = 100;
  export let color: string = "indigo"; 
  export let size: number = 160;
  export let isBytes: boolean = false;

  // Percentuale
  $: percent = (typeof max === "number" && max > 0)
    ? Math.floor((used / max) * 100)
    : 0;

  // --- Formattazioni solo per Storage ---
  function formatUsed(bytes: number): string {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }

  function formatMax(val: number | string): string {
    if (val === "INF") return "∞";
    const bytes = Number(val);
    if (bytes >= 1024 ** 3) return Math.ceil(bytes / (1024 ** 3)) + " GB";
    if (bytes >= 900 * 1024 ** 2) return "1 GB";
    if (bytes >= 1024 ** 2) return Math.ceil(bytes / (1024 ** 2)) + " MB";
    if (bytes >= 1024) return Math.ceil(bytes / 1024) + " KB";
    return bytes + " B";
  }

  // 🎨 Mappa colori basata sulla palette Tailwind
  const tailwindColors: Record<string, { from: string, to: string }> = {
    indigo: { from: "#818cf8", to: "#4f46e5" },
    emerald: { from: "#34d399", to: "#059669" },
    pink: { from: "#f472b6", to: "#db2777" },
    yellow: { from: "#facc15", to: "#ca8a04" },
    purple: { from: "#a78bfa", to: "#7c3aed" },
    gray: { from: "#9ca3af", to: "#4b5563" } // fallback
  };
</script>

<div class="relative flex items-center justify-center" style="width:{size}px; height:{size}px;">
  <!-- Cerchio grigio base -->
  <svg class="absolute top-0 left-0 transform -rotate-90" width={size} height={size}>
    <circle
      cx={size/2}
      cy={size/2}
      r={(size/2) - 10}
      stroke="lightgray"
      stroke-width="15"
      fill="transparent"
    />
    <circle
      cx={size/2}
      cy={size/2}
      r={(size/2) - 10}
      stroke={`url(#grad-${color})`}
      stroke-width="15"
      fill="transparent"
      stroke-linecap="round"
      stroke-dasharray={`${2 * Math.PI * ((size/2) - 10)}`}
      stroke-dashoffset={`${2 * Math.PI * ((size/2) - 10) * (1 - percent/100)}`}
    />
    <defs>
      <linearGradient id={`grad-${color}`} x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color={tailwindColors[color]?.from || tailwindColors.gray.from}/>
        <stop offset="100%" stop-color={tailwindColors[color]?.to || tailwindColors.gray.to}/>
      </linearGradient>
    </defs>
  </svg>

  <!-- Testo centrale -->
  <div class="flex flex-col items-center">
    <span class="text-3xl font-bold text-gray-800">{percent}%</span>
    <span class="text-sm text-gray-500">
      {#if isBytes}
        {formatUsed(used)} / {formatMax(max)}
      {:else}
        {typeof max === "string" ? `${used}/${max}` : `${used}/${max}`}
      {/if}
    </span>
  </div>
</div>
