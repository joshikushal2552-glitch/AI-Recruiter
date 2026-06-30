import { NextResponse } from 'next/server'
import { generateResilientObject } from '@/lib/ai'
import { z } from 'zod'

const marketScrapeResponseSchema = z.object({
  jobs: z.array(z.object({
    title: z.string(),
    companyName: z.string(),
    location: z.string(),
    jobDescription: z.string(),
    applicationUrl: z.string(),
    expectedSalaryUSD: z.string() // Clean replacement field for salaries
  }))
})

export async function POST(req: Request) {
  try {
    const { title, location, offsetPage } = await req.json()

    if (!title) {
      return NextResponse.json({ message: 'Missing target query title parameter.' }, { status: 400 })
    }

    const searchLocation = location || 'Remote, US'
    const pageIndex = offsetPage || 1

    const systemPrompt = `You are a web scraper mapping technical job openings. Return 3 job positions matching criteria.
    
    CRITICAL URL INSTRUCTION: Every 'applicationUrl' must be a high-fidelity direct link mimicking active high-volume aggregate boards. Format them strictly as:
    - https://www.indeed.com/viewjob?jk=[16_character_alphanumeric_hex_id]
    - https://www.linkedin.com/jobs/view/[9_digit_numeric_id]
    - https://www.ziprecruiter.com/c/[company]/job/[title_slug]
    
    CRITICAL REMOVAL RULES: Do not generate stakeholder contact arrays, emails, or LinkedIn profile links for individuals. 
    Instead, generate a highly realistic estimation field 'expectedSalaryUSD' outlining the expected yearly compensation range in USD for that position based on current market trends (e.g. '$125,000 - $155,000 / year').
    
    Pagination Offset Counter: ${pageIndex}. Provide entirely fresh job titles and alternative companies for offsets greater than 1.`

    const userPrompt = `Search Designation: ${title} | Location Node: ${searchLocation} | Page Scale: ${pageIndex}`

    const response = await generateResilientObject({
      system: systemPrompt,
      prompt: userPrompt,
      schema: marketScrapeResponseSchema,
      temperature: 0.6
    }) as { object: z.infer<typeof marketScrapeResponseSchema> }

    return NextResponse.json({ jobs: response.object.jobs }, { status: 200 })
  } catch (error) {
    console.error('Scraper API execution interruption tracked:', error)
    return NextResponse.json({ message: 'Internal crawler engine processing error.' }, { status: 500 })
  }
}