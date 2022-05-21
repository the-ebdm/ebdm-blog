export default function EmbeddedAsset({ data }) {
  if(data.fields.hasOwnProperty('file')) {
    if(data.fields.file.contentType === "image/png") {
      return <img src={data.fields.file.url}/>
    }
  }
  return JSON.stringify(data)
}