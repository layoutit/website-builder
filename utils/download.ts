export function downloadFile(data: Blob | ArrayBuffer, type: string) {
  const blob = data instanceof Blob ? data : new Blob([data]);
  const downloadUrl = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = downloadUrl;
  link.setAttribute("download", `layoutit.${type}`);
  document.body.appendChild(link);
  link.click();
  link.remove();
}
