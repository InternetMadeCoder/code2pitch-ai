export async function generatePitch(repoUrl: string) {
  // Use environment variable for API URL, fallback to localhost for development
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  
  const response = await fetch(`${apiUrl}/generate-pitch`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ repo_link: repoUrl }),
  });

  if (!response.ok) {
    throw new Error("Failed to generate pitch");
  }

  return response.json();
}
