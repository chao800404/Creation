import { NextApiResponse, NextApiRequest } from 'next'
import { z, ZodError } from 'zod'
import prisma from '../../../src/lib/prisma'
import validateUser from '../../../src/utils/validate'
import formidable, { File } from 'formidable'
import fs, { mkdirSync } from 'fs'
import { v2 as cloudinary } from 'cloudinary'

const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
]

const MAX_FILE_SIZE = 2048000

type Image = {
  image: File
}

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

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
})

// const saveFile = async (file: File, listId: string) => {
//   const { filepath, newFilename } = file as unknown as File
//   const imageFile = fs.readFileSync(filepath)
//   const newPath = `${process.cwd()}/public/static/custom/${listId}`
//   try {
//     if (fs.existsSync(newPath)) {
//       fs.writeFileSync(`${newPath}/${newFilename}`, imageFile)
//       fs.unlinkSync(filepath)
//       return `${newPath}/${newFilename}`.replace(`${process.cwd()}/public`, '')
//     } else {
//       mkdirSync(newPath)
//       fs.writeFileSync(`${newPath}/${newFilename}`, imageFile)
//       fs.unlinkSync(filepath)
//       return `${newPath}/${newFilename}`.replace(`${process.cwd()}/public`, '')
//     }
//   } catch (err) {
//     console.log(err)
//     return
//   }
// }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await validateUser(req, res, async (user) => {
    try {
      if (req.method === 'POST') {
        const form = formidable({ keepExtensions: true, multiples: true })
        form.parse(req, async function (err, fields, files) {
          if (err) {
            throw new Error('Something went error')
          }
          const file = (await MySchema.parseAsync(files)) as unknown as Image
          const pageId = IdSchema.parse(fields.id)
          const resData = await prisma.page.findUnique({
            where: {
              id: pageId,
            },
          })

          if (resData?.authorId !== user.id)
            throw new Error("You can't be updating this file")

          const result = await cloudinary.uploader.upload(file.image.filepath, {
            secret: true,
            folder: `${user.email}/${pageId}`,

            transformation: {
              width: 1350,
              crop: 'scale',
            },
          })

          // const path = await saveFile(file.image as unknown as File, listId)
          const data = await prisma.cover.update({
            where: {
              pageId,
            },
            data: {
              image: result.secure_url,
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
