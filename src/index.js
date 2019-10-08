import { version } from '../package.json'

import gridRollIndex from '@/components/grid-roll'
export default {
  version,
  ...gridRollIndex
}
export let gridRoll = gridRollIndex.gridRoll
export let gridStart = gridRollIndex.gridStart
export let gridPrize = gridRollIndex.gridPrize
