import { NextApiResponse, NextApiRequest } from 'next'
import { json } from 'stream/consumers'
import { z, ZodError } from 'zod'
import prisma from '../../../src/lib/prisma'
import validateUser from '../../../src/utils/validate'
import formidable, { File } from 'formidable'
import fs, { mkdirSync } from 'fs'
import path from 'path'

const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
]

const MAX_FILE_SIZE = 2048000

const MySchema = z.object({
  image: z
    .instanceof(formidable.File)
    .refine(
      async (file) =>
        ACCEPTED_IMAGE_TYPES.includes(
          (file as unknown as File).mimetype as string
        ),
      '.jpg, .jpeg, .png and .webp files are accepted.'
    )
    .refine(
      async (file) => (file as unknown as File).size <= MAX_FILE_SIZE,
      `Max file size is 2MB.`
    ),
})

const IdSchema = z.string().cuid()

// console.log(process.cwd())

// const filePath = path.resolve(`${process.cwd()}/public/static/custom/${listId}`)

const saveFile = async (file: File, listId: string) => {
  const { filepath, newFilename } = file as unknown as File
  const imageFile = fs.readFileSync(filepath)
  const newPath = `${process.cwd()}/public/static/custom/${listId}`
  try {
    if (fs.existsSync(newPath)) {
      fs.writeFileSync(`${newPath}/${newFilename}`, imageFile)
      fs.unlinkSync(filepath)
      return `${newPath}/${newFilename}`.replace(`${process.cwd()}/public`, '')
    } else {
      mkdirSync(newPath)
      fs.writeFileSync(`${newPath}/${newFilename}`, imageFile)
      fs.unlinkSync(filepath)
      return `${newPath}/${newFilename}`.replace(`${process.cwd()}/public`, '')
    }
  } catch (err) {
    console.log(err)
    return
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await validateUser(req, res, async (user) => {
    try {
      if (req.method === 'POST') {
        const form = formidable({ keepExtensions: true })
        form.parse(req, async function (err, fields, files) {
          if (err) {
            throw new Error('Something went error')
          }
          const file = await MySchema.parseAsync(files)
          const listId = IdSchema.parse(fields.id)
          const resData = await prisma.list.findUnique({
            where: {
              id: listId,
            },
          })

          if (resData?.authorId !== user.id)
            throw new Error("You can't be updating this file")

          const path = await saveFile(file.image as unknown as File, listId)
          const data = await prisma.cover.update({
            where: {
              listId,
            },
            data: {
              image: path,
            },
          })

          return res.status(201).json({ message: 'success', data })
        })
      }
    } catch (error) {
      console.log(error)
      const { issues } = error as ZodError
      throw new Error(issues.map((err) => err.message).join(','))
    }
  })
}

export const config = {
  api: {
    bodyParser: false,
  },
}
