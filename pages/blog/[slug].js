import ContentBlock from "../../components/content-block";
import { fetchRestAPI, getAllItems, getAllPosts, getSpecificItem } from "../../lib/contentful"

export default function Post({ data }) {
  return (
    <div className="px-4 lg:px-8">
      <div className="relative px-4 sm:px-6 lg:px-8 bg-white/70 py-16 rounded-xl">
        <div className="text-lg max-w-prose mx-auto">
          <h1>
            <span className="block text-base text-center text-indigo-600 font-semibold tracking-wide uppercase">
              Introducing
            </span>
            <span className="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              {data.item.fields.title}
            </span>
          </h1>
        </div>
        <div className="mt-6 prose prose-indigo prose-lg text-gray-500 mx-auto">
          <ContentBlock data={data.item.fields.post} context={data} />
        </div>
      </div>
    </div>
  )
}

export async function getStaticProps({ params }) {
  const post = await getSpecificItem({
    type: 'blogPost',
    slug: params.slug
  })

  return {
    props: {
      data: post
    }
  }
}

export async function getStaticPaths({ }) {
  const posts = await getAllItems({ type: 'blogPost' })
  const paths = posts.items.map(post => {
    return ({
      params: {
        slug: post.fields.slug,
        id: post.sys.id
      }
    })
  })
  return {
    paths: paths,
    fallback: false
  }
}