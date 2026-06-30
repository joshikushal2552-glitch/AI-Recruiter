import { NextResponse } from 'next/server'
import { generateResilientObject } from '@/lib/ai'
import { z } from 'zod'
import pdf from 'pdf-parse'

const responseValidationSchema = z.object({
  matchScore: z.number().int(), // Forces clean whole integers (e.g., 92 instead of 0.92)
  estimatedSalaryUSD: z.string(), 
  strongPoints: z.array(z.string()),
  improvements: z.array(z.string()),
  structuralAdvice: z.string(),
  jobSpecificSkills: z.array(z.object({ 
    skill: z.string(),
    density: z.number().int(), // Must be 1-100 for proper chart bar rendering
    label: z.string()
  })),
  complianceFactors: z.array(z.object({
    category: z.string(),
    factor: z.number().int() // Must be 1-100
  }))
})

export async function POST(req: Request) {
  try {
    const data = await req.formData()
    const file = data.get('file') as File | null
    const targetRole = data.get('targetRole') as string

    if (!file || !targetRole) {
      return NextResponse.json({ message: 'Missing target file or profile parameters.' }, { status: 400 })
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    
    let extractedTextVector = ""
    try {
      const parsedPdf = await pdf(buffer)
      extractedTextVector = parsedPdf.text
    } catch (parseError) {
      console.error('Text extraction error:', parseError)
      extractedTextVector = `Candidate file name text parameters: ${file.name}`
    }

    const systemPrompt = `You are an elite corporate technical recruiter evaluating candidate qualifications.
    Compare the provided resume text against the requested target job profile track.
    
    CRITICAL SCALING INSTRUCTIONS:
    1. For 'matchScore', 'density', and 'factor', you MUST output whole integers between 1 and 100 (e.g., use 92, 85, 70). NEVER output decimal fractions like 0.92 or 0.8. If a value is 0.8, output 80.
    2. The 'jobSpecificSkills' and 'complianceFactors' arrays MUST change completely based on the target role profile. If the target profile changes, completely cycle the framework terminology to fit that explicit field.
    3. For 'estimatedSalaryUSD', output a clean range text block without a leading dollar sign symbol (e.g., use '110,000 - $140,000 / year') to prevent interface text collisions.`

    const userPrompt = `Target Designation Profile: ${targetRole} | Candidate Source Document Text: ${extractedTextVector}`

    const response = await generateResilientObject({
      system: systemPrompt,
      prompt: userPrompt,
      schema: responseValidationSchema,
      temperature: 0.2
    }) as { object: z.infer<typeof responseValidationSchema> }

    return NextResponse.json({ analysis: response.object }, { status: 200 })
  } catch (error) {
    console.error('Core analytical gateway failure tracked:', error)
    return NextResponse.json({ message: 'Internal analysis execution error.' }, { status: 500 })
  }
}