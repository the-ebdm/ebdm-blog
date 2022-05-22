import EmbeddedAsset from "./embedded-asset"

const ContentBlock = ({ data, context }) => {
  if(data.hasOwnProperty('content') && data.content.length > 0) {
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
                  return <ContentBlock key={index} data={item} context={context}/>
                })}
              </p>
            )
          }
          break;
        
        case 'embedded-asset-block':
          const asset = context.includes.Asset.filter(item => item.sys.id == block.data.target.sys.id)[0]
          return <EmbeddedAsset data={asset}/>
      
        default:
          break;
      }
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