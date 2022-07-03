import { FC } from "react"
import { IconName, IconProps as IconServiceProps } from "../../services/contracts"
import { iconsServiceInstance } from "../../services/icons"

type IconProps = {
  type: IconName
} & IconServiceProps

export const Icon: FC<IconProps> = ({ type, ...rest }) => iconsServiceInstance.setIcon(type, rest)
