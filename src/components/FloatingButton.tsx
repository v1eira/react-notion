import { ComponentProps, ReactNode } from "react"

export interface FloatingButtonProps extends ComponentProps<'button'> {
  imgURL: string;
  name: string;
  description: string;
}

export function FloatingButton(props: FloatingButtonProps): ReactNode {
  return (
    <button
      className="flex items-center gap-2 p-1 rounded min-w-[280px] hover:bg-zinc-600"
      {...props}
    >
      <img
        src={props.imgURL}
        alt={props.name}
        className="w-12 border border-zinc-600 rounded"
      />
      <div className="flex flex-col text-left">
        <span className="text-sm">{props.name}</span>
        <span className="text-xs text-zinc-400">{props.description}</span>
      </div>
    </button>
  )
}