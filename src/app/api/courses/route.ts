import { NextResponse } from 'next/server'
import { generateResilientObject } from '@/lib/ai'
import { z } from 'zod'

const courseScrapeResponseSchema = z.object({
  courses: z.array(z.object({
    title: z.string(),
    provider: z.string(), // e.g. Coursera, edX, Udemy
    skillsCovered: z.array(z.string()),
    difficulty: z.string(),
    estimatedHours: z.string(),
    courseUrl: z.string()
  }))
})

export async function POST(req: Request) {
  try {
    const { targetRole, offsetPage } = await req.json()

    if (!targetRole) {
      return NextResponse.json({ message: 'Missing target upskilling validation designation.' }, { status: 400 })
    }

    const pageIndex = offsetPage || 1

    const systemPrompt = `You are an automated professional education advisor mapping curriculum logs. 
    Analyze the provided target user career role, and return an array of 3 highly specialized online training courses designed to bridge skill gaps.
    
    CRITICAL DEEP LINKING RULE: Every 'courseUrl' must be an absolute external web path leading directly to a well-known course platform page. Format them exactly as:
    - https://www.coursera.org/learn/[course-name-slug]
    - https://www.udemy.com/course/[topic-slug-identifier]/
    - https://www.edx.org/learn/[subject]/[course-title]
    Do not output incomplete domains or hashtag placeholders.
    
    Pagination Page Context: ${pageIndex}. Provide an alternative distribution of courses for counters greater than 1.`

    const userPrompt = `Target Technical Track: ${targetRole} | Page Block Index: ${pageIndex}`

    const response = await generateResilientObject({
      system: systemPrompt,
      prompt: userPrompt,
      schema: courseScrapeResponseSchema,
      temperature: 0.5
    }) as { object: z.infer<typeof courseScrapeResponseSchema> }

    return NextResponse.json({ courses: response.object.courses }, { status: 200 })
  } catch (error) {
    console.error('Upskilling advisor node transmission failure tracked:', error)
    return NextResponse.json({ message: 'Internal program compilation allocation error.' }, { status: 500 })
  }
}