import { FaShoppingCart, FaSignOutAlt } from 'react-icons/fa'
import { Icon } from '../enums/icon.enum'
import { GrStatusUnknown } from 'react-icons/gr'

interface IconFactoryProps {
  icon: Icon
}

const ICON_SIZE = 24

export function IconFactory({ icon }: IconFactoryProps) {
  switch (icon) {
    case Icon.SHOPPING_CART:
      return <FaShoppingCart size={ICON_SIZE} />

    case Icon.SIGN_OUT:
      return <FaSignOutAlt size={ICON_SIZE} />

    default:
      return <GrStatusUnknown size={ICON_SIZE} />
  }
}
