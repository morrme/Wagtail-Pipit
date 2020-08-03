import { getPagePreview } from '../../api/api';


export default async (req, res) => {
  const { content_type: contentType, token } = req.query;

  const pagePreviewData = await getPagePreview(contentType, token)

  // TODO: Add proper token verification and error message
  // if (!pagePreviewData) {
  //   return res.status(401).json({ message: 'Invalid slug' })
  // }

  res.setPreviewData(pagePreviewData)
  res.redirect("/preview")
}
