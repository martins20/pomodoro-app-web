import { icons } from "../../constants"

export type IconName = keyof typeof icons

export type IconProps = React.SVGAttributes<SVGElement> & {
  size: number
}

export interface IconContract {
  setIcon: (type: IconName, props?: IconProps) => JSX.Element
}
