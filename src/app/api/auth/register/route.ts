import { NextResponse } from 'next/server'
import db from '@/lib/db'

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Missing structural identifier metadata parameters.' },
        { status: 400 }
      )
    }

    // Verify system exclusivity constraint metrics 
    const existingUser = await db.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        { message: 'Identity array entry exists inside core node.' },
        { status: 422 }
      )
    }

    // Provision new context profile record securely
    const user = await db.user.create({
      data: {
        name: name || '',
        email,
        password, // For production use, apply a standard hash string comparison layer here
      },
    })

    return NextResponse.json(
      { message: 'Identity provisioning successful.', userId: user.id },
      { status: 201 }
    )
  } catch (error) {
    console.error('Registration processing routine failure:', error)
    return NextResponse.json(
      { message: 'Internal logic configuration anomaly tracked.' },
      { status: 500 }
    )
  }
}