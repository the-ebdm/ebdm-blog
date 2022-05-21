import EmbeddedAsset from "./embedded-asset"

const ContentBlock = ({ data }) => {
  if(data.hasOwnProperty('content') && data.content.length > 0) {
    console.log(data.content.length)
    return data.content.map(block => {
      switch (block.nodeType) {
        case 'paragraph':
          if (block.content.length > 0) {
            return (
              <p>
                {block.content.map((item, index) => {
                  // return (
                  //   <>Test</>
                  // )
                  return <ContentBlock key={index} data={item} />
                })}
              </p>
            )
          }
          break;
        
        case 'embedded-asset-block':
          return <EmbeddedAsset data={block.data}/>
      
        default:
          break;
      }
      if(block.nodeType === 'paragraph') {
        
      }
      console.log(block)
      return null
    })
  } else {
    switch (data.nodeType) {
      case 'text':
        return data.value
    
      default:
        return null;
    }
  }
}

export default ContentBlock;