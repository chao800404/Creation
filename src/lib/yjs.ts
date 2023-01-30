import { WebrtcProvider } from 'y-webrtc'
import * as Y from 'yjs'
import { ResDataType } from '../hook/useListSWR'

type FavTagMapType = {
  open?: boolean
  favHeight?: number
}

const ydoc = new Y.Doc()

const listMap = ydoc.getMap('list_map')
const pageMap: Y.Map<FavTagMapType> = ydoc.getMap('page_map')

export { ydoc, listMap, Y, pageMap }
