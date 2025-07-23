// app/api/download-image/route.ts
import { NextResponse } from 'next/server'
import axios from 'axios'
import { createWriteStream } from 'fs'
import { pipeline } from 'stream/promises'
import { createReadStream, unlinkSync, existsSync, mkdirSync } from 'fs'
import path from 'path'

export async function GET(request: Request) {
    let filePath: string | null = null

    try {
        const { searchParams } = new URL(request.url)
        const imageUrl = searchParams.get('url')

        if (!imageUrl) {
            return NextResponse.json(
                { error: 'Image URL is required' },
                { status: 400 }
            )
        }

        // Validate URL format
        if (!isValidUrl(imageUrl)) {
            return NextResponse.json(
                { error: 'Invalid URL format' },
                { status: 400 }
            )
        }

        // For security, validate against allowed domains
        if (!isAllowedDomain(imageUrl)) {
            return NextResponse.json(
                { error: 'Domain not allowed' },
                { status: 403 }
            )
        }

        // Create temp directory if it doesn't exist
        const tempDir = path.join(process.cwd(), 'temp')
        if (!existsSync(tempDir)) {
            mkdirSync(tempDir, { recursive: true })
        }

        // Generate a unique filename
        const filename = `image-${Date.now()}.jpg`
        filePath = path.join(tempDir, filename)

        // Download the image
        const response = await axios({
            method: 'get',
            url: imageUrl,
            responseType: 'stream',
        })

        // Write the file
        await pipeline(response.data, createWriteStream(filePath))

        // Read the file into a Buffer
        const fileBuffer = await new Promise<Buffer>((resolve, reject) => {
            if (!filePath) {
                return reject(new Error('File path is not defined'))
            }

            const chunks: (Buffer | Uint8Array)[] = []
            const stream = createReadStream(filePath)

            stream.on('data', (chunk: Buffer | string) => {
                // Convert string chunks to Buffer if needed
                const bufferChunk = typeof chunk === 'string' ? Buffer.from(chunk) : chunk
                chunks.push(bufferChunk)
            })

            stream.on('error', reject)
            stream.on('end', () => resolve(Buffer.concat(chunks)))
        })

        // Return the image as a response
        return new NextResponse(fileBuffer, {
            headers: {
                'Content-Type': response.headers['content-type'] || 'image/jpeg',
                'Content-Disposition': `attachment; filename="${filename}"`,
                'Cache-Control': 'public, max-age=31536000, immutable',
            },
        })
    } catch (error) {
        console.error('Error downloading image:', error)
        return NextResponse.json(
            { error: 'Failed to download image' },
            { status: 500 }
        )
    } finally {
        // Clean up: delete the temp file if it exists
        if (filePath && existsSync(filePath)) {
            unlinkSync(filePath)
        }
    }
}

// Helper functions remain the same
function isValidUrl(url: string): boolean {
    try {
        new URL(url)
        return true
    } catch {
        return false
    }
}

function isAllowedDomain(url: string): boolean {
    const allowedDomains = [
        'via.placeholder.com',
        
    ]
    try {
        const domain = new URL(url).hostname
        return allowedDomains.some(allowed => domain.endsWith(allowed))
    } catch {
        return false
    }
}