import path from 'path'
import fs from 'fs'

export default async function sendImage(req, res) {
  try {
    const filePath = path.join(
      process.cwd(),
      '/public/static/cover/nasa_archive/nasa_adam_miller.webp'
    )
    const imageBuffer = fs.createReadStream(filePath)
    await new Promise(function (resolve) {
      res.setHeader('Content-Type', 'image/webp')
      res.setHeader('Cache-Control', 's-maxage=86400')
      imageBuffer.pipe(res)
      imageBuffer.on('end', resolve)
      imageBuffer.on('error', function (err) {
        if (err.code === 'ENOENT') {
          res.status(400).json({
            error: true,
            message: 'Sorry we could not find the file you requested!',
          })
          res.end()
        } else {
          res
            .status(500)
            .json({ error: true, message: 'Sorry, something went wrong!' })
          res.end()
        }
      })
    })
  } catch (err) {
    console.log(err)
  }
  res.send()
}
