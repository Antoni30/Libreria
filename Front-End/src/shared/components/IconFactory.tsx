import {
  FaEdit,
  FaPlus,
  FaShoppingCart,
  FaSignOutAlt,
  FaTrash,
} from 'react-icons/fa'
import { Icon } from '../enums/icon.enum'
import { GrStatusUnknown } from 'react-icons/gr'
import { CgSpinner } from 'react-icons/cg'
import { IoEyeSharp } from "react-icons/io5";

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

    case Icon.CREATE:
      return <FaPlus size={ICON_SIZE} />

    case Icon.DELETE:
      return <FaTrash size={ICON_SIZE} />

    case Icon.EDIT:
      return <FaEdit size={ICON_SIZE} />

    case Icon.LOADING:
      return (
        <CgSpinner className="animate-spin inline-block" size={ICON_SIZE} />
      )
      case Icon.DETAILS:
        return (
          <IoEyeSharp  size={ICON_SIZE}/>
        )

    default:
      return <GrStatusUnknown size={ICON_SIZE} />
  }
}
