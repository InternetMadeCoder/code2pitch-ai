export async function generatePitch(repoUrl: string) {
  const response = await fetch("http://localhost:5000/generate-pitch", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ repo_link: repoUrl }),
  });

  if (!response.ok) {
    throw new Error("Failed to generate pitch");
  }

  return response.json();
}
