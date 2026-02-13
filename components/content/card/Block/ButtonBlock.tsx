import React from 'react'
import { useStyles } from '@/store/useStyles'
import { shadowMap } from '@/components/display/Header'

type Props = {
  type: "url" | "email"
  title?: string | null,
  url: string | null,
}
const ButtonBlock = ({ title, url, type }: Props) => {
  const { styles } = useStyles()

  const href =
    type === "email"
      ? `mailto:${url ?? "support@example.com"}`
      : url ?? "https://www.example.com"

  const isExternal = (type === "url")

  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="flex justify-center items-center w-[90%] h-10"
      style={{
        borderStyle: "solid",
        borderWidth: styles?.cardBorder ?? 0,
        boxShadow: shadowMap[styles?.cardShadow ?? 2],
        borderColor: styles?.cardBorderColor || "white",
        borderRadius: styles?.cardCorner ?? 5,
        backgroundColor: styles?.cardColor || "navy"
      }}
    >
      <h1>{title ?? ""}</h1>
    </a>
  )
}

export default ButtonBlock