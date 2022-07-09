import { CgTrashEmpty } from "react-icons/cg"
import { BiAddToQueue } from "react-icons/bi"

import { IconContract, IconName, IconProps } from "../../contracts/icon"

export class ReactIcons implements IconContract {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static INSTANCE: ReactIcons

  static getInstance(): ReactIcons {
    if (!ReactIcons.INSTANCE) this.INSTANCE = new ReactIcons()

    return ReactIcons.INSTANCE
  }

  setIcon(icon_name: IconName, props?: IconProps): JSX.Element {
    switch (icon_name) {
      case "trash":
        return <CgTrashEmpty {...props} />

      case "add":
        return <BiAddToQueue {...props} />

      default:
        throw new Error("Icon name does not exist")
    }
  }
}
