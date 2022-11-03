import fs from 'fs'
import path from 'path'
const fsPromises = fs.promises
import { NextApiResponse, NextApiRequest } from 'next'

const filePath = path.resolve(`${process.cwd()}/public/static/emoji`)

// async function readFilePath(filePath: string): Promise<string[] | undefined> {
//   try {
//     const dirs = await fsPromises.readdir(filePath)
//     return await Promise.all(
//       dirs.map(async (filename) => {
//         const filedir = path.join(filePath, filename)
//         const stats = await fsPromises.stat(filedir)
//         const isFile = stats.isFile()

//         if (isFile) {
//           return Promise.resolve(filedir)
//         }
//         return (await readFilePath(filedir)) as unknown as string
//       })
//     )
//   } catch (err) {
//     console.error('獲取檔案失敗!', err)
//   }
// }

// const tranferPath = (fullPath: string[]) => {
//   const splitPaths = fullPath.map((path) => {
//     const splitSymbol = path.includes('\\') ? '\\' : '/'
//     const splitName = path.split(splitSymbol)
//     const coverIndex = splitName.indexOf('emoji')
//     return splitName.slice(coverIndex + 1, splitName.length)
//   })

//   return splitPaths.map((path) => `/static/emoji/${path[0]}`)
// }

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   try {
//     if (req.method === 'GET') {
//       const { pageIndex, limit } = req.query
//       if (!pageIndex) throw new Error('Please provide pageIndex')
//       const paths = await readFilePath(filePath)
//       if (!paths) {
//         res.status(401).json({ status: 'fail', message: 'File path not found' })
//       }
//       const slicePage = Number(pageIndex) * Number(limit)
//       const pathMap = tranferPath(paths as string[])
//       const result = pathMap.slice(slicePage - Number(limit), slicePage)
//       const isEnd = slicePage >= pathMap.length

//       res
//         .status(200)
//         .json({ status: 'success', data: { emojiMap: [...result] }, isEnd })
//     } else res.status(400).json({ status: 'fail', message: 'Bad request' })
//   } catch (error) {
//     const { message } = error as Error
//     res.status(401).json({ status: 'fail', message: message })
//   }
// }
