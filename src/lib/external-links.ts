// The AI only ever knows a job title / course provider name, never a real
// listing ID. Rather than let it hallucinate deep links to specific postings
// (which never resolve), we point users at the real, working search-results
// page for that query on the relevant site.

export function buildIndeedSearchUrl(jobTitle: string, location?: string) {
  const params = new URLSearchParams({ q: jobTitle })
  const trimmedLocation = location?.trim()
  if (trimmedLocation) {
    params.set('l', trimmedLocation)
  }
  return `https://www.indeed.com/jobs?${params.toString()}`
}

const COURSE_PROVIDER_SEARCH_URLS: Record<string, (topic: string) => string> = {
  coursera: (topic) => `https://www.coursera.org/search?query=${encodeURIComponent(topic)}`,
  udemy: (topic) => `https://www.udemy.com/courses/search/?q=${encodeURIComponent(topic)}`,
  edx: (topic) => `https://www.edx.org/search?q=${encodeURIComponent(topic)}`,
  pluralsight: (topic) => `https://www.pluralsight.com/search?q=${encodeURIComponent(topic)}`,
  'linkedin learning': (topic) => `https://www.linkedin.com/learning/search?keywords=${encodeURIComponent(topic)}`,
  skillshare: (topic) => `https://www.skillshare.com/en/search?query=${encodeURIComponent(topic)}`,
  datacamp: (topic) => `https://www.datacamp.com/search?q=${encodeURIComponent(topic)}`,
}

export function buildCourseSearchUrl(provider: string, topic: string) {
  const builder = COURSE_PROVIDER_SEARCH_URLS[provider.trim().toLowerCase()]
  if (builder) return builder(topic)
  // Unrecognized provider name — fall back to a general web search rather than a dead link.
  return `https://www.google.com/search?q=${encodeURIComponent(`${topic} courses on ${provider}`)}`
}
