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
        const classNames = [];
        if(data.marks.length > 0) {
          let isCode = false;
          for(let i=0;i<data.marks.length;i++) {
            if(data.marks[i].type === 'code') {
              isCode = true;
            }
          }
          if(isCode) {
            return <pre><code>{data.value}</code></pre>
          }
          return <span>{data.value}</span>
        }
        return data.value
    
      default:
        return null;
    }
  }
}

export default ContentBlock;