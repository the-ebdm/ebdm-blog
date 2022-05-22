// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const authKey = process.env.AUTH_KEY

export default async function handler(req, res) {
  if(req.headers.authkey === authKey) {
    const payload = JSON.parse(req.body);
    const slug = payload.fields.slug['en-US']
  
    try {
      console.log(`Invalidating: /blog/${slug}`)
      await res.unstable_revalidate(`/blog/${slug}`)
      return res.json({ revalidated: true })
    } catch (err) {
      return res.status(500).send('Error revalidating')
    }
  } else {
    res.status(401).json({ message: 'Invalid Token' })
  }
}
