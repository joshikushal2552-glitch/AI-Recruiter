import { NextResponse } from 'next/server'
import { generateResilientObject } from '@/lib/ai'
import { buildCourseSearchUrl } from '@/lib/external-links'
import { z } from 'zod'

const COURSE_PROVIDERS = ['Coursera', 'Udemy', 'edX', 'Pluralsight', 'LinkedIn Learning', 'Skillshare', 'DataCamp'] as const

const courseScrapeResponseSchema = z.object({
  courses: z.array(z.object({
    title: z.string(),
    provider: z.enum(COURSE_PROVIDERS),
    skillsCovered: z.array(z.string()),
    difficulty: z.string(),
    estimatedHours: z.string()
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
    The 'provider' field must be one of: ${COURSE_PROVIDERS.join(', ')}.

    Pagination Page Context: ${pageIndex}. Provide an alternative distribution of courses for counters greater than 1.`

    const userPrompt = `Target Technical Track: ${targetRole} | Page Block Index: ${pageIndex}`

    const response = await generateResilientObject({
      system: systemPrompt,
      prompt: userPrompt,
      schema: courseScrapeResponseSchema,
      temperature: 0.5
    }) as { object: z.infer<typeof courseScrapeResponseSchema> }

    const courses = response.object.courses.map((course) => ({
      ...course,
      // Real, working search-results link for this topic on the provider's site —
      // not a fabricated course slug.
      courseUrl: buildCourseSearchUrl(course.provider, targetRole),
    }))

    return NextResponse.json({ courses }, { status: 200 })
  } catch (error) {
    console.error('Upskilling advisor node transmission failure tracked:', error)
    return NextResponse.json({ message: 'Internal program compilation allocation error.' }, { status: 500 })
  }
}