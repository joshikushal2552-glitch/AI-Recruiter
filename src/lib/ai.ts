import { generateObject } from 'ai'
import { google } from '@ai-sdk/google'
import { groq } from '@ai-sdk/groq'

const PRIMARY_MODEL = google('gemini-2.5-flash')
// Fixed: Swapped the decommissioned 'specdec' string for the active 'versatile' production model
const FALLBACK_MODEL = groq('llama-3.3-70b-versatile')

interface ResilientObjectOptions {
  system: string
  prompt: string
  schema: any
  temperature?: number
}

export async function generateResilientObject(options: ResilientObjectOptions) {
  try {
    return await generateObject({
      model: PRIMARY_MODEL,
      system: options.system,
      prompt: options.prompt,
      schema: options.schema,
      temperature: options.temperature ?? 0.15,
    })
  } catch (error: any) {
    if (error?.statusCode === 429 || error?.status === 429 || error?.name === 'AI_RetryError') {
      console.log('🔄 [API Quota Exhausted]: Primary engine limit reached. Seamlessly activating Groq backup tier...')
    } else {
      console.warn('⚠️ [API Channel Exception]: Non-quota error encountered on primary model:', error?.message || error)
    }
    
    // Execute fallback proxy processing block seamlessly using the updated versatile model
    try {
      return await generateObject({
        model: FALLBACK_MODEL,
        system: options.system,
        prompt: options.prompt,
        schema: options.schema,
        temperature: options.temperature ?? 0.15,
      })
    } catch (fallbackError) {
      console.error('❌ [Critical System Error]: Both primary and fallback AI engines failed:', fallbackError)
      throw fallbackError
    }
  }
}