import { NextApiRequest, NextApiResponse } from "next"
import formidable, { File } from "formidable"
import fs from "fs"

export const config = {
  api: {
    bodyParser: false
  }
}

const saveFile = async (file: File) => {
  const { filepath, newFilename, mimetype } = file
  const data = fs.readFileSync(filepath)
  fs.writeFileSync(`./public/uploads/${newFilename}.jpg`, data)
  await fs.unlinkSync(filepath)
  return newFilename
}

const uploadImage = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const form = new formidable.IncomingForm()
    await form.parse(req, async function (err, fields, files) {
      const filename = await saveFile(files.file as File)
      return res.status(200).json({ filename })
    })
    
  } catch (error) {
    return res.status(400).json({ error })
  }
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    return uploadImage(req, res)
  }
}

export default handler
