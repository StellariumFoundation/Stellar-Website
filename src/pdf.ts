export async function openPdf(url: string, _filename: string) {
  window.open(url, '_blank');
}

export async function savePdf(url: string, filename: string) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch PDF: ${res.status}`);
  const blob = await res.blob();
  const blobUrl = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = blobUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(blobUrl);
}
