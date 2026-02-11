
  const apiUrl = import.meta.env.VITE_API_URL;
export const downloadPolicyApi = async (policyId: string) => {
    const response = await fetch(`${apiUrl}/v1/downloadpolicy?id=${policyId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/pdf",
        },
    });
    if (!response.ok) {
        throw new Error("Failed to download policy");
    }
    const blob = await response.blob();

    // Download PDF in browser
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `policy_${policyId}.pdf`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);

    // return blob;
};