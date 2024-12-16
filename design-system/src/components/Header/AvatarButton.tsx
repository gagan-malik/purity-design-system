import React from "react"
import headerAvatar from "../../assets/images/headerAvatar.svg"

interface IPropsAvatarButton {
  avatarUrl: string
}
const AvatarButton = (props: IPropsAvatarButton) => {
  const { avatarUrl = headerAvatar } = props
  return (
    <button>
      <img src={avatarUrl} alt="" className="h-7 w-7" />
    </button>
  )
}

export default AvatarButton
