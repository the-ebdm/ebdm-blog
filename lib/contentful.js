export async function fetchGraphQL(query) {
  const response = await fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({ query }),
    }
  )
  return await response.json()
}

export async function getAllPosts() {
  try {
    const query = `
      query {
        blogPostCollection {
          items {
            sys {
              id
            }
            title
            description
            slug
            post {
              json
            }
          }
        }
      }
    `
    const { data } = await fetchGraphQL(query)

    console.log(data)
  
    return data.blogPostCollection.items
  } catch (error) {
    console.log(error)
  }
}