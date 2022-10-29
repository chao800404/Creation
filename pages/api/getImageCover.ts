import fs from 'fs'
import path from 'path'
const fsPromises = fs.promises
import { NextApiResponse, NextApiRequest } from 'next'

const filePath = path.resolve(`${process.cwd()}/public/static/cover`)

type pathType = (string | undefined)[] | undefined

async function readFilePath(filePath: string): Promise<pathType> {
  try {
    const dirs = await fsPromises.readdir(filePath)
    return await Promise.all(
      dirs.map(async (filename) => {
        const filedir = path.join(filePath, filename)
        const stats = await fsPromises.stat(filedir)
        const isFile = stats.isFile()

        if (isFile) {
          return Promise.resolve(filedir)
        }
        return (await readFilePath(filedir)) as unknown as string
      })
    )
  } catch (err) {
    console.error('獲取檔案失敗!', err)
  }
}

const tranfromToMap = (fullPath: pathType) => {
  const pathObject: Record<string, string[]> = {}
  const pathMaps = fullPath?.flatMap((path) => path) as string[]
  const splitPaths = pathMaps.map((path) => {
    const splitSymbol = path.includes('\\') ? '\\' : '/'
    const splitName = path.split(splitSymbol)
    const coverIndex = splitName.indexOf('cover')
    return splitName.slice(coverIndex + 1, splitName.length)
  })

  splitPaths.forEach((arr) => {
    const path = `/static/cover/${arr[0]}/${arr[1]}`

    if (arr[0] in pathObject) {
      pathObject[arr[0]].push(path)
    } else {
      pathObject[arr[0]] = [path]
    }
  })
  return pathObject
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'GET') {
      const paths = await readFilePath(filePath)
      const pathMap = tranfromToMap(paths)
      res.status(200).json({ status: 'success', path: pathMap })
    } else res.status(400).json({ status: 'fail', message: 'Bad request' })
  } catch (error) {
    console.log(error)
  }
}
